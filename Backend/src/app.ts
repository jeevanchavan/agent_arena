import express from 'express';
import runGraph from "./ai/graph.ai.js";
import cors from "cors";
import cookieParser from 'cookie-parser';
import config from './config/config.js';
import { connectDB } from './db.js';
import { authMiddleware } from './authMiddleware.js';
import authRouter from './authRoutes.js';
import path from "path";

// Connect to MongoDB
connectDB();

const app = express();
app.use(express.json());
app.use(cookieParser());

app.use(express.static(path.join(process.cwd(), "public")));

app.use(cors({
    origin: config.FRONTEND_URL,
    methods: ["GET", "POST"],
    credentials: true,
}));

// Mount Authentication & OAuth Routes
app.use('/auth', authRouter);

// Root check endpoint
app.get('/', async (req, res) => {
    res.json({ message: "Agent Arena API is healthy" });
});

// Invoke graph execution endpoint
app.post("/invoke", authMiddleware, async (req, res) => {
    const { input } = req.body;
    
    if (!input || typeof input !== 'string') {
        res.status(400).json({
            success: false,
            error: 'Bad Request',
            message: 'Input is required and must be a string'
        });
        return;
    }

    const start = Date.now();
    try {
        const result = await runGraph(input);
        const duration = Date.now() - start;

        res.status(200).json({
            message: "Graph executed successfully",
            success: true,
            result,
            duration // duration in milliseconds
        });
    } catch (error: any) {
        console.error("Invoke error:", error);
        res.status(500).json({
            success: false,
            error: 'Something Went Wrong',
            message: error.message || 'An error occurred during agent execution.'
        });
    }
});

app.get("*name", (_, res) => {
  res.sendFile(path.join(process.cwd(), "public", "index.html"));
});

export default app;