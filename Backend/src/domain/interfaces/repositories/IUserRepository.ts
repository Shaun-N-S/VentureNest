import { ObjectId } from "mongoose";
import { BaseUser } from "domain/entities/user/baseUserEntity";
import { CreateUserDTO, CreateUserResponseDTO } from "application/dtos/User/createUserDTO";
import { IBaseRepository } from "./IBaseRepository";

export interface IUserRepository extends IBaseRepository<CreateUserDTO> {
  updatePassword(email: string, password: string): Promise<void>;
  createUser(user: CreateUserDTO): Promise<CreateUserResponseDTO>;
  findByEmail(email: string): Promise<BaseUser | null>;
  // findById(id: ObjectId): Promise<BaseUser | null>;
}
