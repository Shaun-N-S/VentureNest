import { BaseUser } from "domain/entities/user/baseUserEntity";

export interface UpdateUserDTO
  extends Pick<BaseUser, "userName" | "bio" | "linkedInUrl" | "profileImg" | "website"> {}
