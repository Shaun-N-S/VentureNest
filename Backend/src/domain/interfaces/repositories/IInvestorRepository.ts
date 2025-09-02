import { CreateInvestorDTO } from "application/dtos/Investor/createInvestorDTO";
import { Investor } from "domain/entities/investor/investorEntity";
import { IBaseRepository } from "./IBaseRepository";

export interface IInvestorRepository extends IBaseRepository<Investor> {
  createInvestor(investor: CreateInvestorDTO): Promise<Investor>;
  // findByEmail(email: string): Promise<Investor | null>;
  // findById(id: ObjectId): Promise<Investor | null>;
}
