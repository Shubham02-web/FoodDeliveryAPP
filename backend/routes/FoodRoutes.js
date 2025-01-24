import express from "express";
import { addFood, listFood } from "../controllers/FoodControllers.js";
import multer from "multer";
const foodRouter = express.Router();

// Image Storage Enginee
const storage = multer.diskStorage({
  destination: "uploads",
  filename: (req, file, cb) => {
    return cb(null, `${Date.now()}${file.originalname}`);
  },
});
const upload = multer({ storage: storage });

foodRouter.post("/add", upload.single("image"), addFood);
foodRouter.get("/foodlist", listFood);
export default foodRouter;
