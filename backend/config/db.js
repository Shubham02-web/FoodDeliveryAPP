import mongoose from "mongoose";
export const ConnectMongo = async () => {
  await mongoose
    .connect("mongodb://localhost:27017/FoodDelivery")
    .then(() => {
      console.log("DataBase Connected Succefully");
    })
    .catch(() => {
      "error while connecting mongoDB";
    });
};
