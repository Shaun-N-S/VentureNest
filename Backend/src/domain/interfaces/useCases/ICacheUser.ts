import { LoginUserDTO } from "application/dtos/loginUserDTO";

export interface ICacheUserUseCase {
  cacheUser(user: LoginUserDTO): void;
}
