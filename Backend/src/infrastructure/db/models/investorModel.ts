import mongoose, { Document, ObjectId } from "mongoose";
import { Investor } from "domain/entities/investor/investorEntity";
import investorSchema from "../schema/investorSchema";

export interface IInvestorModel extends Omit<Investor, "_id">, Document {
  _id: ObjectId;
}

export const investorModel = mongoose.model("Investor", investorSchema);
