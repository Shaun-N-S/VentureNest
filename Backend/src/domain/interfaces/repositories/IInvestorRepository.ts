import { Investor } from "domain/entities/investor/investorEntity";

export interface IInvestorRepository {
  save(data: Investor): Promise<Investor>;
  // findById(id: string): Promise<>;
  findByEmail(email: string): Promise<Investor | null>;
  // deleteById(id: string): Promise<void>;
  updatePassword(email: string, password: string): Promise<void>;
}
