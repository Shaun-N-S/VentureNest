import { BaseUser } from "domain/entities/user/baseUserEntity";

export interface LoginUserDTO
  extends Omit<
    BaseUser,
    | "password"
    | "verifiedAt"
    | "adminVerified"
    | "dateOfBirth"
    | "phoneNumber"
    | "address"
    | "aadharImg"
    | "selfieImg"
  > {}
