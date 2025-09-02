import { LoginUserDTO } from "application/dtos/User/loginUserDTO";

export interface IUserLoginUseCase {
  userLogin(email: string, password: string): Promise<LoginUserDTO>;
}
