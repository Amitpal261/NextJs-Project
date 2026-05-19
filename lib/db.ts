
import mongoose from "mongoose";

export async function connectDB() {
  try {
    if(mongoose.connection.readyState === 1){
      console.log("Already Connected")
    }
    console.log("Conecting...")

    await mongoose.connect(process.env.MONGODB_URI!)
  } catch (error) {
    console.log("DB error : ",error)
  }
  
}