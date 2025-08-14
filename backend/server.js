import express from "express";
import { connectDB } from "./config/db.js";
import todoRoutes from "./routes/todo.route.js";
import "dotenv/config";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/todos", todoRoutes);

const __dirname = path.resolve();

if(process.env.NODE_ENV === "production"){
  app.use(express.static(path.join(__dirname, "/frontend/dist")));
  app.get('*', (req, res)=>{
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
  });
}

const port = process.env.PORT || 3000;
app.listen(port, () => {
  connectDB();
  console.log(`server is listening on ${port} at http://localhost:${port}`);
});
