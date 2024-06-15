import express from "express";
import dotenv from "dotenv";
import cors from "cors";
dotenv.config();
import connectDB from "./lib/db.js";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/userRoutes.js";
import courseRoutes from "./routes/course.js";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
connectDB();

app.use(cookieParser());

app.use("/api/users", userRoutes);
app.use("/api/courses", courseRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
