import mongoose from "mongoose";
import { CONFIG } from "config/config";

export class mongoConnect {
  public static async connect() {
    try {
      if (CONFIG.MONGO_URL) {
        await mongoose.connect(CONFIG.MONGO_URL);
        console.log("mongodb connected");
      } else {
        throw new Error("Invalid mongodb url or url not found in env");
      }
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }
    }
  }
}
