import { IUserRepository } from "domain/interfaces/repositories/IUserRepository";
import { User } from "domain/entities/user/userEntity";
import { Model } from "mongoose";
import { UserMapper } from "application/mappers/userMappers";
import { IuserModel } from "@infrastructure/db/models/userModel";

export class UserRepository implements IUserRepository {
  constructor(protected _userModel: Model<IuserModel>) {}

  async save(user: User): Promise<User> {
    const userData = UserMapper.toMongooseDocument(user);
    const doc = await this._userModel.create(userData);
    return UserMapper.fromMongooseDocument(doc);
  }

  async findByEmail(email: string): Promise<User | null> {
    const doc = await this._userModel.findOne({ email });
    if (!doc) return null;
    return UserMapper.fromMongooseDocument(doc);
  }

  async findById(id: string): Promise<User | null> {
    const doc = await this._userModel.findById(id);
    if (!doc) return null;
    return UserMapper.fromMongooseDocument(doc);
  }

  async updatePassword(email: string, password: string): Promise<void> {
    await this._userModel.updateOne({ email }, { $set: { password } });
  }
}
