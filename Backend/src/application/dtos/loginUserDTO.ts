import { BaseUser } from "domain/entities/user/baseUserEntity";

export type LoginUserDTO = Omit<
  BaseUser,
  | "password"
  | "verifiedAt"
  | "adminVerified"
  | "dateOfBirth"
  | "phoneNumber"
  | "address"
  | "aadharImg"
  | "selfieImg"
>;
