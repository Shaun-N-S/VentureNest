import mongoose from "mongoose";
import { UserRole } from "domain/enums/userRole";
import { UserStatus } from "domain/enums/userStatus";
import { PreferredSector } from "domain/enums/preferredSectors";
import { StartupStage } from "domain/enums/startupStages";
import { Investor } from "domain/entities/investor/investorEntity";

const investorSchema = new mongoose.Schema<Investor>(
  {
    userName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    linkedInUrl: { type: String },
    profileImg: { type: String },
    website: { type: String },
    bio: { type: String },

    interestedTopics: [{ type: String, enum: Object.values(PreferredSector) }],

    role: {
      type: String,
      enum: Object.values(UserRole),
      default: UserRole.INVESTOR,
    },

    status: {
      type: String,
      enum: Object.values(UserStatus),
      default: UserStatus.ACTIVE,
    },

    location: { type: String },
    companyName: { type: String },
    experience: { type: Number },

    preferredSector: [{ type: String, enum: Object.values(PreferredSector) }],

    preferredStartupStage: [{ type: String, enum: Object.values(StartupStage) }],

    investmentMin: { type: Number },
    investmentMax: { type: Number },

    portfolioPdf: { type: String },

    adminVerified: { type: Boolean, default: false },
    aadharImg: { type: String },
    address: { type: String },
    dateOfBirth: { type: Date },
    phoneNumber: { type: String },
    selfieImg: { type: String },
    verifiedAt: { type: Date },
  },
  { timestamps: true }
);

export default investorSchema;
