import { ObjectId } from "mongoose";
import { BaseUser } from "domain/entities/user/baseUserEntity";
import { CreateUserDTO } from "application/dtos/createUserDTO";

export interface IUserRepository {
  createUser(user: CreateUserDTO): Promise<BaseUser>;
  findByEmail(email: string): Promise<BaseUser | null>;
  findById(id: ObjectId): Promise<BaseUser | null>;
}
