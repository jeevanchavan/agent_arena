import type { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import config from '../config/config.js';

export interface AuthRequest extends Request {
    user?: {
        id: string;
        email: string;
        name: string;
        picture: string;
    };
}

export function authMiddleware(req: AuthRequest, res: Response, next: NextFunction) {
    // Check for token in cookies or Authorization header
    const token = req.cookies?.token || req.headers.authorization?.split(' ')[1];

    if (!token) {
        res.status(401).json({
            success: false,
            error: 'Authentication Expired',
            message: 'No session token found. Please log in again.'
        });
        return;
    }

    try {
        const decoded = jwt.verify(token, config.JWT_SECRET) as {
            id: string;
            email: string;
            name: string;
            picture: string;
        };
        req.user = decoded;
        next();
    } catch (err) {
        res.status(401).json({
            success: false,
            error: 'Authentication Expired',
            message: 'Session is invalid or expired. Please log in again.'
        });
    }
}
