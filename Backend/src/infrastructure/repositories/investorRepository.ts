import { investorModel } from "@infrastructure/db/models/investorModel";
import { CreateInvestorDTO } from "application/dtos/Investor/createInvestorDTO";
import { Investor } from "domain/entities/investor/investorEntity";
import { IInvestorRepository } from "domain/interfaces/repositories/IInvestorRepository";
import { BaseRepository } from "./baseRepository";
import { Model } from "mongoose";

export class InvestorRepository extends BaseRepository<Investor> implements IInvestorRepository {
  constructor(protected _investorModel: Model<Investor>) {
    super(_investorModel);
  }
  async createInvestor(investor: CreateInvestorDTO): Promise<Investor> {
    const createdInvestor = await investorModel.create(investor);
    return createdInvestor.toObject<Investor>();
  }

  // async findByEmail(email: string): Promise<Investor | null> {
  //   return await investorModel.findOne({ email });
  // }

  // async findById(id: string): Promise<Investor | null> {
  //   return await investorModel.findById(id);
  // }
}
