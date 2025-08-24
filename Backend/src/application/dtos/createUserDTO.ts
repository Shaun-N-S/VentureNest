import { BaseUser } from "domain/entities/user/baseUserEntity";

export type CreateUserDTO = Omit<
  BaseUser,
  | "_id"
  | "createdAt"
  | "updatedAt"
  | "verifiedAt"
  | "adminVerified"
  | "dateOfBirth"
  | "phoneNumber"
  | "address"
  | "aadharImg"
  | "selfieImg"
>;

export type CreateUserResponseDTO = Omit<
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
