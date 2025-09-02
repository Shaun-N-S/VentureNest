import { IUserRepository } from "domain/interfaces/repositories/IUserRepository";
import { BaseUser } from "domain/entities/user/baseUserEntity";
import { userModel } from "@infrastructure/db/models/userModel";
import { Model } from "mongoose";
import { BaseRepository } from "./baseRepository";
import { CreateUserDTO, CreateUserResponseDTO } from "application/dtos/User/createUserDTO";

export class UserRepository extends BaseRepository<BaseUser> implements IUserRepository {
  constructor(protected _userModel: Model<BaseUser>) {
    super(_userModel);
  }

  async createUser(user: CreateUserDTO): Promise<CreateUserResponseDTO> {
    const createdUser = await userModel.create(user);
    return createdUser.toObject<CreateUserResponseDTO>();
  }

  async updatePassword(email: string, password: string): Promise<void> {
    await this._userModel.updateOne({ email }, { $set: { password } });
  }
  // async findByEmail(email: string): Promise<BaseUser | null> {
  //   return await userModel.findOne({ email });
  // }
  // async findById(id: ObjectId): Promise<BaseUser | null> {
  //   return await userModel.findById(id);
  // }
}
