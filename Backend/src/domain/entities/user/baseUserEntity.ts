import { ObjectId } from "mongoose";
import { UserRole } from "../../enums/userRole";
import { UserStatus } from "../../enums/userStatus";
import { PreferredSector } from "domain/enums/preferredSectors";

export interface BaseUser {
  _id: ObjectId | string;
  userName: string;
  email: string;
  password: string;
  isFirstLogin: boolean;
  linkedInUrl: string;
  profileImg: string;
  website?: string | undefined;
  bio?: string | undefined;
  interestedTopics: PreferredSector[];
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
