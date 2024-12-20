import express from 'express';
import cors from 'cors';
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.js";

dotenv.config();

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());
app.use(cookieParser());

// Routes
app.use("/api/auth", authRoutes);

app.get('/', (req, res) => {
    res.json({ message: "Price Hunter API" })
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
});