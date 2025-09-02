import { LoginUserDTO } from "application/dtos/User/loginUserDTO";

export interface IInvestorLoginUseCase {
  investorLogin(email: string, password: string): Promise<LoginUserDTO>;
}
