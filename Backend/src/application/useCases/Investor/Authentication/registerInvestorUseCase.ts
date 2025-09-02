import { Errors, USER_ERRORS } from "@shared/constants/errors";
import { CreateInvestorResponseDTO } from "application/dtos/Investor/createInvestorDTO";
import { Investor } from "domain/entities/investor/investorEntity";
import { IInvestorRepository } from "domain/interfaces/repositories/IInvestorRepository";
import { IHashPasswordService } from "domain/interfaces/services/IHashPasswordService";
import { ICreateInvestorUseCase } from "domain/interfaces/useCases/ICreateInvestor";

export class RegisterInvestorUseCase implements ICreateInvestorUseCase {
  constructor(
    private _investorRepository: IInvestorRepository,
    private _hashService: IHashPasswordService
  ) {}

  async createInvestor(investor: Investor): Promise<CreateInvestorResponseDTO> {
    console.log(investor);

    const existing = await this._investorRepository.findByEmail(investor.email);

    if (existing) {
      throw new Error(USER_ERRORS.USER_ALREADY_EXISTS);
    }

    investor.password = await this._hashService.hashPassword(investor.password);

    const saved = await this._investorRepository.create(investor);
    const response: CreateInvestorResponseDTO = {
      _id: saved._id!,
      userName: saved.userName,
      email: saved.email,
      linkedInUrl: saved.linkedInUrl,
      profileImg: saved.profileImg,
      bio: saved.bio,
      website: saved.website,
      role: saved.role,
      status: saved.status,
      location: saved.location,
      companyName: saved.companyName,
      experience: saved.experience,
      preferredSector: saved.preferredSector,
      preferredStartupStage: saved.preferredStartupStage,
      isFirstLogin: saved.isFirstLogin,
      updatedAt: saved.updatedAt,
      createdAt: saved.createdAt,
    };
    console.log("response:", response);
    console.log("saved", saved);
    return response;
  }
}
