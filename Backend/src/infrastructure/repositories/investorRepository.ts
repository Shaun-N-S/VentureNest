import { Investor } from "domain/entities/investor/investorEntity";
import { IInvestorRepository } from "domain/interfaces/repositories/IInvestorRepository";
import { Model } from "mongoose";
import { InvestorMapper } from "application/mappers/investorMappers";
import { IInvestorModel } from "@infrastructure/db/models/investorModel";

export class InvestorRepository implements IInvestorRepository {
  constructor(protected _investorModel: Model<IInvestorModel>) {}

  async save(data: Investor): Promise<Investor> {
    const investorData = InvestorMapper.toMongooseDocument(data);
    const doc = await this._investorModel.create(investorData);
    return InvestorMapper.fromMongooseDocument(doc);
  }

  async findByEmail(email: string): Promise<Investor | null> {
    const doc = await this._investorModel.findOne({ email });
    if (!doc) return null;
    return InvestorMapper.fromMongooseDocument(doc);
  }

  async findById(id: string): Promise<Investor | null> {
    const doc = await this._investorModel.findById(id);
    if (!doc) return null;
    return InvestorMapper.fromMongooseDocument(doc);
  }

  async updatePassword(email: string, password: string): Promise<void> {
    await this._investorModel.updateOne({ email }, { $set: { password } });
  }
}
