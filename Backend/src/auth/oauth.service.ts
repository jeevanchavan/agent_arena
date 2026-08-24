import config from '../config/config.js';

export interface UserProfile {
    id: string;
    email: string;
    name: string;
    picture: string;
}

export function getGoogleAuthUrl(): string {
    const hasGoogleConfig = config.GOOGLE_CLIENT_ID && 
                            config.GOOGLE_CLIENT_SECRET && 
                            !config.GOOGLE_CLIENT_ID.startsWith('YOUR_');

    if (!hasGoogleConfig) {
        console.log('Google OAuth credentials not configured. Using developer bypass.');
        return `${config.GOOGLE_REDIRECT_URI}?code=mock_developer_code`;
    }

    return `https://accounts.google.com/o/oauth2/v2/auth?` +
        `response_type=code` +
        `&client_id=${encodeURIComponent(config.GOOGLE_CLIENT_ID)}` +
        `&redirect_uri=${encodeURIComponent(config.GOOGLE_REDIRECT_URI)}` +
        `&scope=openid%20profile%20email` +
        `&state=arena_oauth_state`;
}

export async function getGoogleUserProfile(code: string): Promise<UserProfile> {
    const isMockFlow = code === 'mock_developer_code' || 
                       !config.GOOGLE_CLIENT_ID || 
                       config.GOOGLE_CLIENT_ID.startsWith('YOUR_');

    if (isMockFlow) {
        return {
            id: 'mock_dev_user_123',
            email: 'developer@agentarena.com',
            name: 'Agent Arena Dev',
            picture: 'https://lh3.googleusercontent.com/a/default-user',
        };
    }

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

    const profileResponse = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
        headers: { Authorization: `Bearer ${accessToken}` }
    });

    if (!profileResponse.ok) {
        throw new Error('Failed to fetch user profile from Google');
    }

    const googleProfile = await profileResponse.json() as any;
    return {
        id: googleProfile.sub,
        email: googleProfile.email,
        name: googleProfile.name,
        picture: googleProfile.picture || '',
    };
}
