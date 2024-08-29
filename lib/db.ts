import mongoose from "mongoose";

let connect: boolean = false;

export const connectToDB = async () => {
    mongoose.set('strictQuery', true);
  if (!process.env.MONGODB_URI) {
    console.log("MISSING MONGODB URI");
  }
  if (connect) {
    return true;
  }
  try {
    await mongoose.connect(process.env.MONGODB_URI!, {
      dbName: "devPost",
    });
    connect = true;
    console.log(connect);
    
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};
