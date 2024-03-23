import express from "express";
import dotenv from "dotenv";
dotenv.config();
const app = express();
import userRoutes from "./routes/users.js";
import authRoutes from "./routes/auth.js";
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

app.listen(8800, () => {
  console.log("server started");
});
