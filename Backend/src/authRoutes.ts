import { Router } from 'express';
import jwt from 'jsonwebtoken';
import config from './config/config.js';
import { User } from './db.js';
import { authMiddleware, type AuthRequest } from './authMiddleware.js';

const router = Router();

const useSecureCookies = process.env.USE_SECURE_COOKIES === 'true';
const authCookieOptions = {
    httpOnly: true,
    // Netlify frontend and Render backend are different sites, so deployed cookies must be HTTPS-only.
    secure: useSecureCookies,
    // Cross-site cookies require SameSite=None; localhost keeps Lax so local HTTP development still works.
    sameSite: useSecureCookies ? 'none' as const : 'lax' as const,
    maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
};

// Google OAuth redirect endpoint
router.get('/google', (req, res) => {
    const hasGoogleConfig = config.GOOGLE_CLIENT_ID && 
                            config.GOOGLE_CLIENT_SECRET && 
                            !config.GOOGLE_CLIENT_ID.startsWith('YOUR_');

    if (!hasGoogleConfig) {
        // Developer fallback bypass - redirect directly to callback with a mock code
        console.log('Google OAuth credentials not configured. Using developer bypass.');
        res.redirect(`${config.GOOGLE_REDIRECT_URI}?code=mock_developer_code`);
        return;
    }

    const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?` +
        `response_type=code` +
        `&client_id=${encodeURIComponent(config.GOOGLE_CLIENT_ID)}` +
        `&redirect_uri=${encodeURIComponent(config.GOOGLE_REDIRECT_URI)}` +
        `&scope=openid%20profile%20email` +
        `&state=arena_oauth_state`;

    res.redirect(authUrl);
});

// Google OAuth callback endpoint
router.get('/google/callback', async (req, res) => {
    const { code } = req.query;

    if (!code || typeof code !== 'string') {
        res.redirect(`${config.FRONTEND_URL}/?error=no_code_provided`);
        return;
    }

    try {
        let userProfile = {
            id: 'mock_dev_user_123',
            email: 'developer@agentarena.com',
            name: 'Agent Arena Dev',
            picture: 'https://lh3.googleusercontent.com/a/default-user',
        };

        const isMockFlow = code === 'mock_developer_code' || 
                           !config.GOOGLE_CLIENT_ID || 
                           config.GOOGLE_CLIENT_ID.startsWith('YOUR_');

        if (!isMockFlow) {
            // Real OAuth flow - exchange code for token
            const tokenUrl = 'https://oauth2.googleapis.com/token';
            const tokenResponse = await fetch(tokenUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    code,
                    client_id: config.GOOGLE_CLIENT_ID,
                    client_secret: config.GOOGLE_CLIENT_SECRET,
                    redirect_uri: config.GOOGLE_REDIRECT_URI,
                    grant_type: 'authorization_code'
                })
            });

            if (!tokenResponse.ok) {
                const errText = await tokenResponse.text();
                throw new Error(`Failed to exchange authorization code: ${errText}`);
            }

            const tokenData = await tokenResponse.json() as any;
            const accessToken = tokenData.access_token;

            // Fetch user profile from Google
            const profileResponse = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
                headers: { Authorization: `Bearer ${accessToken}` }
            });

            if (!profileResponse.ok) {
                throw new Error('Failed to fetch user profile from Google');
            }

            const googleProfile = await profileResponse.json() as any;
            userProfile = {
                id: googleProfile.sub,
                email: googleProfile.email,
                name: googleProfile.name,
                picture: googleProfile.picture || '',
            };
        }

        // Find or create user in MongoDB (if connected)
        try {
            let dbUser = await User.findOne({ googleId: userProfile.id });
            if (!dbUser) {
                dbUser = new User({
                    googleId: userProfile.id,
                    email: userProfile.email,
                    name: userProfile.name,
                    picture: userProfile.picture,
                });
                await dbUser.save();
            } else if (dbUser.name !== userProfile.name || dbUser.picture !== userProfile.picture) {
                // Update user details if changed
                dbUser.name = userProfile.name;
                dbUser.picture = userProfile.picture;
                await dbUser.save();
            }
        } catch (dbErr) {
            console.error('Database user save failed (continuing with JWT fallback):', dbErr);
        }

        // Generate JWT token
        const jwtPayload = {
            id: userProfile.id,
            email: userProfile.email,
            name: userProfile.name,
            picture: userProfile.picture,
        };

        const token = jwt.sign(jwtPayload, config.JWT_SECRET, { expiresIn: '7d' });

        // Set HttpOnly cookie for the browser session.
        res.cookie('token', token, authCookieOptions);

        // Redirect back to frontend dashboard
        res.redirect(config.FRONTEND_URL);

    } catch (err: any) {
        console.error('OAuth callback error:', err);
        res.redirect(`${config.FRONTEND_URL}/?error=${encodeURIComponent(err.message || 'auth_failed')}`);
    }
});

// Profile route
router.get('/me', authMiddleware, (req: AuthRequest, res) => {
    res.status(200).json({
        success: true,
        user: req.user
    });
});

// Logout route
router.post('/logout', (req, res) => {
    res.clearCookie('token', {
        httpOnly: true,
        // Clear using the same production-aware flags used when setting the cookie.
        secure: authCookieOptions.secure,
        sameSite: authCookieOptions.sameSite
    });
    res.status(200).json({
        success: true,
        message: 'Logged out successfully'
    });
});

export default router;
