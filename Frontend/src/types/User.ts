import { UserRole } from "./UserRole";
import { StatusTypes } from "./StatusTypes";

export interface User {
  userId?: string;
  userName: string;
  email: string;
  isFirstLogin: boolean;
  linkedInUrl?: string;
  profileImg?: string;
  website?: string | undefined;
  bio?: string | undefined;
  interestedTopics: string[];
  role: UserRole;
  status: StatusTypes;
  adminVerified?: boolean;
  dateOfBirth?: Date;
  phoneNumber?: string;
  address?: string;
  aadharImg?: string;
  selfieImg?: string;
  verifiedAt?: Date;
  createdAt?: Date;
  updatedAt: Date;
}
