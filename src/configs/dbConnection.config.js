import mongoose from "mongoose";
import { config } from "./config.js";

export const dbConnection = async () => {
    try{
        await mongoose.connect(config.monogodb)
        console.log("Database connected successfully");
    }catch(err){
        console.error(err);
    }
}