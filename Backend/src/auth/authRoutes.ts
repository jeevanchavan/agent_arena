import { Router } from 'express';
import jwt from 'jsonwebtoken';
import config from '../config/config.js';
import { User } from '../db.js';
import { authMiddleware, type AuthRequest } from './authMiddleware.js';
import { getGoogleAuthUrl, getGoogleUserProfile } from './oauth.service.js';

const router = Router();

const authCookieOptions = {
    httpOnly: true,
    // Make the session cookie available to every backend route, including /auth/me and /invoke.
    path: '/',
    // Netlify frontend and Render backend are different sites, so deployed cookies must be HTTPS-only.
    secure: config.USE_SECURE_COOKIES,
    // Cross-site cookies require SameSite=None; localhost keeps Lax so local HTTP development still works.
    sameSite: config.USE_SECURE_COOKIES ? 'none' as const : 'lax' as const,
    maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
};

// Google OAuth redirect endpoint
router.get('/google', (req, res) => {
    const authUrl = getGoogleAuthUrl();
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
        const userProfile = await getGoogleUserProfile(code);

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
        path: '/',
        secure: authCookieOptions.secure,
        sameSite: authCookieOptions.sameSite
    });
    res.status(200).json({
        success: true,
        message: 'Logged out successfully'
    });
});

export default router;
