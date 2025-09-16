import {
  CreateInvestorDTO,
  CreateInvestorResponseDTO,
} from "application/dtos/Investor/createInvestorDTO";

export interface ICreateInvestorUseCase {
  createInvestor(investor: CreateInvestorDTO): Promise<CreateInvestorResponseDTO>;
}
