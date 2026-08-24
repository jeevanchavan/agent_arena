import mongoose from 'mongoose';
import config from './config/config.js';

export interface IUser {
    googleId: string;
    email: string;
    name: string;
    picture: string;
    createdAt: Date;
}

const userSchema = new mongoose.Schema<IUser>({
    googleId: { type: String, required: true, unique: true },
    email: { type: String, required: true },
    name: { type: String, required: true },
    picture: { type: String, default: '' },
    createdAt: { type: Date, default: Date.now },
});

export const User = mongoose.model<IUser>('User', userSchema);

let isConnected = false;

export async function connectDB() {
    if (isConnected) {
        return;
    }

    try {
        await mongoose.connect(config.MONGODB_URI);
        isConnected = true;
        console.log('Successfully connected to MongoDB.');
    } catch (error) {
        console.error('[DATABASE CONNECTOR ERROR] Failed to connect to MongoDB URI:', config.MONGODB_URI);
        console.error('[DATABASE CONNECTOR DETAILS]:', error);
        console.warn('[DATABASE CONNECTOR WARNING] Operations requiring database persistence will fail until MongoDB connection is restored.');
    }
}
