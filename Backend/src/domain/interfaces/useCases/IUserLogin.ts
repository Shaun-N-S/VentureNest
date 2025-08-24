import { LoginUserDTO } from "application/dtos/loginUserDTO";

export interface IUserLoginUseCase {
  userLogin(email: string, password: string): Promise<LoginUserDTO>;
}
