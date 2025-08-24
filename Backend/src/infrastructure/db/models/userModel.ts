import mongoose, { Document, ObjectId } from "mongoose";
import userSchema from "../schema/userSchema";
import { BaseUser } from "domain/entities/user/baseUserEntity";

export interface IuserModel extends Omit<BaseUser, "_id">, Document {
  _id: ObjectId;
}

export const userModel = mongoose.model("User", userSchema);
