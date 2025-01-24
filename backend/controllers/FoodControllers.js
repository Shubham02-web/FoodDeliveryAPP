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

// delete food list

const deleteFood = async (req, res) => {
  try {
    const food = await FoodModel.findById(req.body.id);
    if (!food)
      return res
        .status(404)
        .json({ success: false, message: "food not found for these id" });
    fs.unlink(`uploads/${food.image}`, () => {
      console.log("Image Delted Succefully");
    });
    await FoodModel.findByIdAndDelete({ _id: food._id });
    return res.status(200).json({
      success: true,
      message: "Food Item Deleted Succefully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error while deleting Food",
    });
  }
};
export { addFood, listFood, deleteFood };
