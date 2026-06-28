import dotenv from 'dotenv';

dotenv.config();


const config = {
    GEMINI_API_KEY: process.env.GEMINI_API_KEY || '',
    MISTRAL_API_KEY: process.env.MISTRAL_API_KEY || '',
    COHERE_API_KEY: process.env.COHERE_API_KEY || '',
    MONGODB_URI: process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/agent-arena',
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID || '',
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET || '',
    GOOGLE_REDIRECT_URI: process.env.GOOGLE_REDIRECT_URI || 'http://localhost:3000/auth/google/callback',
    JWT_SECRET: process.env.JWT_SECRET || 'super-secret-key-agent-arena-redesign-2026',
    FRONTEND_URL: process.env.FRONTEND_URL || 'http://localhost:5173',
}


export default config;