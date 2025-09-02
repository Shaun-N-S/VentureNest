import mongoose from "mongoose";
import { UserRole } from "../../../domain/enums/userRole";
import { UserStatus } from "../../../domain/enums/userStatus";
import { PreferredSector } from "../../../domain/enums/preferredSectors";
import { BaseUser } from "domain/entities/user/baseUserEntity";

const userSchema = new mongoose.Schema<BaseUser>(
  {
    userName: { type: String, required: true },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: { type: String, required: true },
    isFirstLogin: { type: Boolean, default: true },

    linkedInUrl: { type: String },
    profileImg: { type: String },
    website: { type: String },
    bio: { type: String },
    dateOfBirth: { type: Date },
    phoneNumber: { type: String, index: true },
    address: { type: String },

    interestedTopics: [
      {
        type: String,
        enum: Object.values(PreferredSector),
      },
    ],

    aadharImg: { type: String },
    selfieImg: { type: String },
    adminVerified: { type: Boolean, default: false },
    verifiedAt: { type: Date },

    role: {
      type: String,
      enum: Object.values(UserRole),
      default: UserRole.USER,
    },
    status: {
      type: String,
      enum: Object.values(UserStatus),
      default: UserStatus.ACTIVE,
    },
  },
  { timestamps: true }
);

export default userSchema;
