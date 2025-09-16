import { BaseUser } from "domain/entities/user/userEntity";

export interface UpdateUserDTO
  extends Pick<BaseUser, "userName" | "bio" | "linkedInUrl" | "profileImg" | "website"> {}
