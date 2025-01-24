import FoodModel from "../models/FoodModels.js";
import fs from "fs";

// Add Foood Item

const addFood = async (req, res) => {
  let image_filename = `${req.file.filename}`;

  const food = new FoodModel({
    Name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    category: req.body.category,
    image: image_filename,
  });
  try {
    await food.save();
    res.json({ success: true, message: "Food Added" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error while Adding Food " });
  }
};

// all food list
const listFood = async (req, res) => {
  try {
    const foods = await FoodModel.find({});
    res.status(200).json({ success: true, data: foods });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ success: false, message: "Error in food list API" });
  }
};
export { addFood, listFood };
