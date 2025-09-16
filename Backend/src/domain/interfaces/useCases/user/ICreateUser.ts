import { CreateUserDTO } from "../../../../application/dtos/User/createUserDTO";

export interface ICreateUserUseCase {
  createUser(user: CreateUserDTO): Promise<void>;
}
