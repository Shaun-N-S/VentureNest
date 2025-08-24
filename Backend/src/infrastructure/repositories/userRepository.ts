import { IUserRepository } from "domain/interfaces/repositories/IUserRepository";
import { BaseUser } from "domain/entities/user/baseUserEntity";
import { userModel } from "@infrastructure/db/models/userModel";
import { ObjectId } from "mongoose";

export class UserRepository implements IUserRepository {
  async createUser(user: BaseUser): Promise<BaseUser> {
    const createdUser = await userModel.create(user);
    return createdUser.toObject<BaseUser>();
  }

  async findByEmail(email: string): Promise<BaseUser | null> {
    return await userModel.findOne({ email });
  }

  async findById(id: ObjectId): Promise<BaseUser | null> {
    return await userModel.findById(id);
  }
}
