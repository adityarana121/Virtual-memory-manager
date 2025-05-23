import express from "express";
import cors from "cors";
import memoryRoutes from "./routes/memoryRoutes";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api", memoryRoutes);

export default app;
