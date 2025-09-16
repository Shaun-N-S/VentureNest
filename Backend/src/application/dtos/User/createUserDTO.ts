import { UserRole } from "domain/enums/userRole";
import { UserStatus } from "domain/enums/userStatus";

export interface CreateUserDTO {
  userName: string;
  email: string;
  password: string;
}

export interface CreateUserResponseDTO {
  _id: string;
  userName: string;
  email: string;
  isFirstLogin: boolean;
  linkedInUrl?: string;
  profileImg?: string;
  website?: string | undefined;
  bio?: string | undefined;
  interestedTopics: string[];
  role: UserRole;
  status: UserStatus;
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
