import { Errors, USER_ERRORS } from "@shared/constants/errors";
import { LoginUserDTO } from "application/dtos/User/loginUserDTO";
import { UserMapper } from "application/mappers/userMappers";
import { UserStatus } from "domain/enums/userStatus";
import { IInvestorRepository } from "domain/interfaces/repositories/IInvestorRepository";
import { IHashPasswordService } from "domain/interfaces/services/IHashPasswordService";
import { IInvestorLoginUseCase } from "domain/interfaces/useCases/IInvestorLogin";

export class InvestorLoginUseCase implements IInvestorLoginUseCase {
  private _investorRepository;
  private _hashService;
  constructor(investorRepository: IInvestorRepository, hashService: IHashPasswordService) {
    ((this._investorRepository = investorRepository), (this._hashService = hashService));
  }

  async investorLogin(email: string, password: string): Promise<LoginUserDTO> {
    const investor = await this._investorRepository.findByEmail(email);

    if (!investor) {
      throw new Error(USER_ERRORS.USER_NOT_FOUND);
    }

    if (investor.status === UserStatus.BLOCKED) {
      throw new Error(USER_ERRORS.USER_BLOCKED);
    }

    const verifyPassword = await this._hashService.compare(password, investor.password);

    if (!verifyPassword) {
      throw new Error(Errors.INVALID_CREDENTIALS);
    }

    const response: LoginUserDTO = UserMapper.toLoginUserResponseDTO(investor);
    return response;
  }
}
