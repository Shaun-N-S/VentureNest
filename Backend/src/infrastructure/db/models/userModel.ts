import mongoose, { Document, ObjectId } from "mongoose";
import userSchema from "../schema/userSchema";
import { PreferredSector } from "domain/enums/preferredSectors";
import { UserRole } from "domain/enums/userRole";
import { UserStatus } from "domain/enums/userStatus";

export interface IuserModel extends Document {
  _id: ObjectId;
  userName: string;
  email: string;
  password: string;
  isFirstLogin: boolean;
  linkedInUrl: string;
  profileImg: string;
  website: string;
  bio: string;
  dateOfBirth: Date;
  phoneNumber: string;
  address: string;
  interestedTopics: PreferredSector[];
  aadharImg: string;
  selfieImg: string;
  adminVerified: boolean;
  verifiedAt: Date;
  role: UserRole;
  status: UserStatus;
}

export const userModel = mongoose.model<IuserModel>("User", userSchema);
