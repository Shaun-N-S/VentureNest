import { UserRole } from "domain/enums/userRole";

export type JWTPayloadType = {
  userId: string;
  role: UserRole;
};
