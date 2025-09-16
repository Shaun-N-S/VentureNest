import { USER_ERRORS } from "@shared/constants/errors";
import {
  CreateInvestorDTO,
  CreateInvestorResponseDTO,
} from "application/dtos/Investor/createInvestorDTO";
import { IInvestorRepository } from "domain/interfaces/repositories/IInvestorRepository";
import { IHashPasswordService } from "domain/interfaces/services/IHashPasswordService";
import { ICreateInvestorUseCase } from "domain/interfaces/useCases/investor/ICreateInvestor";
import { InvestorMapper } from "application/mappers/investorMappers";

export class RegisterInvestorUseCase implements ICreateInvestorUseCase {
  constructor(
    private _investorRepository: IInvestorRepository,
    private _hashService: IHashPasswordService
  ) {}

  async createInvestor(dto: CreateInvestorDTO): Promise<CreateInvestorResponseDTO> {
    const existing = await this._investorRepository.findByEmail(dto.email);

    if (existing) {
      throw new Error(USER_ERRORS.USER_ALREADY_EXISTS);
    }

    const hashedPassword = await this._hashService.hashPassword(dto.password);
    const investorEntity = InvestorMapper.toEntity({ ...dto, password: hashedPassword });

    const saved = await this._investorRepository.save(investorEntity);
    return InvestorMapper.toCreateInvestorResponseDTO(saved);
  }
}
