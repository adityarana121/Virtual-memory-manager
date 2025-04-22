import express from 'express';
import memoryRoutes from './routes/memoryRoutes';

const app = express();
app.use(express.json());

// Use memory routes
app.use('/api', memoryRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
