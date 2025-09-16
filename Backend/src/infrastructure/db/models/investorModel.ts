import mongoose, { Document, ObjectId } from "mongoose";
import investorSchema from "../schema/investorSchema";
import { PreferredSector } from "domain/enums/preferredSectors";
import { UserRole } from "domain/enums/userRole";
import { UserStatus } from "domain/enums/userStatus";
import { StartupStage } from "domain/enums/startupStages";

export interface IInvestorModel extends Document {
  _id: ObjectId;
  userName: string;
  email: string;
  password: string;
  linkedInUrl?: string;
  profileImg?: string;
  website?: string;
  bio?: string;
  interestedTopics: PreferredSector[];
  role: UserRole;
  status: UserStatus;
  adminVerified: boolean;
  dateOfBirth: Date;
  phoneNumber?: string;
  address?: string;
  aadharImg?: string;
  selfieImg?: string;
  isFirstLogin: boolean;
  verifiedAt: Date;
  createdAt: Date;
  updatedAt: Date;

  // Investor-specific
  location?: string;
  companyName?: string;
  experience?: number;
  preferredSector: PreferredSector[];
  preferredStartupStage: StartupStage[];
  investmentMin?: number;
  investmentMax?: number;
  portfolioPdf?: string;
}

export const investorModel = mongoose.model<IInvestorModel>("Investor", investorSchema);
