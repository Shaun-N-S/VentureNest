import { BaseUser } from "domain/entities/user/baseUserEntity";

// export interface CreateUserDTO
//   extends Omit<
//     BaseUser,
//     | "_id"
//     | "createdAt"
//     | "updatedAt"
//     | "verifiedAt"
//     | "adminVerified"
//     | "dateOfBirth"
//     | "phoneNumber"
//     | "address"
//     | "aadharImg"
//     | "selfieImg"
//   > {}

export interface CreateUserDTO extends Pick<BaseUser, "userName" | "email" | "password"> {}

export interface CreateUserResponseDTO
  extends Pick<
    BaseUser,
    "_id" | "userName" | "email" | "role" | "status" | "updatedAt" | "isFirstLogin"
  > {}

// export interface CreateUserResponseDTO
//   extends Omit<
//     BaseUser,
//     | "password"
//     | "interestedTopics"
//     | "createdAt"
//     | "verifiedAt"
//     | "adminVerified"
//     | "dateOfBirth"
//     | "phoneNumber"
//     | "address"
//     | "aadharImg"
//     | "selfieImg"
//   > {}
