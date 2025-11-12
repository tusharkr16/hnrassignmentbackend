import mongoose from "mongoose";

const DB = "mongodb+srv://tusharkumar9871:XUT934rimcNC2WOq@cluster0.hmpr2hk.mongodb.net/mernt?retryWrites=true&w=majority";

export const connectDB = async () => {
  try {
    await mongoose.connect(DB);
    console.log("Connection successful with DB");
  } catch (err) {
    console.error("Error in connection with DB", err);
    process.exit(1);
  }
};