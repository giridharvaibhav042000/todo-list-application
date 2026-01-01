import express from "express";
import cors from "cors";
import todoRoutes from "./routes/todo.routes";

const app = express();

app.use(cors());
app.use(express.json());
// app.get("/todos", (req, res) => {
//   res.json({ message: "todo route started" });
// });

app.use("/todos", todoRoutes);

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});
