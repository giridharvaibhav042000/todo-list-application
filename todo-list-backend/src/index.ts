import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";

import connectDB from "./config/db";
import todoRoutes from "./routes/todo.routes";
import authRoutes from "./routes/auth.routes";
const app = express();
connectDB();


// app.use(cors());
app.use(cors({
  origin: [
      "http://localhost:3000",
      "https://todo-application-front.netlify.app"
    ],
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());
// app.get("/todos", (req, res) => {
//   res.json({ message: "todo route started" });
// });

app.use("/auth", authRoutes); 
app.use("/todos", todoRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
