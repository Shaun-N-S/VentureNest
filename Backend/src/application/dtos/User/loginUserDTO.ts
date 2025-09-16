import { UserRole } from "domain/enums/userRole";
import { UserStatus } from "domain/enums/userStatus";

export interface LoginUserDTO {
  _id: string;
  userName: string;
  email: string;
  role: UserRole;
  status: UserStatus;
  isFirstLogin: boolean;
  updatedAt: Date;
}
