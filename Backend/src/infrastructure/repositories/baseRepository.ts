import { IBaseRepository } from "domain/interfaces/repositories/IBaseRepository";
import { Model } from "mongoose";

export abstract class BaseRepository<T> implements IBaseRepository<T> {
  constructor(protected _model: Model<T>) {}

  async create(data: T): Promise<T> {
    return (await this._model.create(data)) as T;
  }

  async findByEmail(email: string): Promise<T | null> {
    return await this._model.findOne({ email });
  }

  async findById(id: string): Promise<T | null> {
    return await this._model.findById(id);
  }

  async deleteById(id: string): Promise<void> {
    await this._model.findByIdAndDelete(id);
  }

  // async updatePassword(email: string, password: string): Promise<void> {
  //   await this._model.updateOne({ email }, { $set: { password } });
  // }
}
