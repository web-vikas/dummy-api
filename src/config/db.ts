import mongoose from "mongoose";

export const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI!);
    const connection = mongoose.connection;

    connection.on("connect", () => {
      console.log("Connect Successfully.");
    });

    connection.on("error", (error) => {
      console.log("Failed to connect !.", error);
      process.exit();
    });
  } catch (error) {
    console.log("Somethings Went Wrong !");
    console.log(error);
  }
};
