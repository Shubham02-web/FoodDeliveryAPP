import mongoose from "mongoose";
export const ConnectMongo = async () => {
  await mongoose
    .connect(process.env.MONGODBLINK)
    .then(() => {
      console.log("DataBase Connected Succefully");
    })
    .catch(() => {
      "error while connecting mongoDB";
    });
};
