import express from 'express';
import cors from 'cors';
import memoryRoutes from './routes/memory.routes'; // adjust path as needed

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Make sure this is here:
app.use('/memory', memoryRoutes);

// OR if routes are prefixed:
app.use('/api', memoryRoutes); // then frontend must call /api/memory
