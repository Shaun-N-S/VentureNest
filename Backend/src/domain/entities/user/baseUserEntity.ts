import { ObjectId } from "mongoose";
import { UserRole } from "../../enums/userRole";
import { UserStatus } from "../../enums/userStatus";

export interface BaseUser {
  _id: ObjectId | string;
  userName: string;
  email: string;
  password: string;
  linkedInUrl: string;
  profileImg: string;
  website?: string | undefined;
  bio?: string | undefined;
  interestedTopics: string[];
  role: UserRole;
  status: UserStatus;
  adminVerified: boolean;
  dateOfBirth: Date;
  phoneNumber: string;
  address: string;
  aadharImg: string;
  selfieImg: string;
  verifiedAt: Date;
  createdAt: Date;
  updatedAt: Date;
}
