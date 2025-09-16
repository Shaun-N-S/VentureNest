import { LoginUserDTO } from "application/dtos/User/loginUserDTO";

export interface ICacheUserUseCase {
  cacheUser(user: LoginUserDTO): void;
}
