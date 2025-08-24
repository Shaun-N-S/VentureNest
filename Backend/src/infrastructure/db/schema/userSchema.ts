import mongoose from "mongoose";
import { UserRole } from "../../../domain/enums/userRole";
import { UserStatus } from "../../../domain/enums/userStatus";

const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  linkedInUrl: {
    type: String,
  },
  profileImg: {
    type: String,
  },
  website: {
    type: String,
  },
  bio: {
    type: String,
  },
  interestedTopics: [
    {
      type: String,
    },
  ],
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
  adminVerified: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

export default userSchema;
