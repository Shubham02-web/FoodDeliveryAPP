import express from "express";
import cors from "cors";
import { ConnectMongo } from "./config/db.js";
import foodRouter from "./routes/FoodRoutes.js";
// app config
const app = express();
const port = 4000;

// middlewares
app.use(express.json());
app.use(cors());

// Db Connection
ConnectMongo();

// api endpoints
app.use("/api/food", foodRouter);

app.get("/", (req, res) => {
  res.send("API Working");
});
app.listen(port, () => {
  console.log(`server started on http://localhost:${port}`);
});
