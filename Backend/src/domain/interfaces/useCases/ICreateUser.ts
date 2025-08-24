import { CreateUserDTO, CreateUserResponseDTO } from "../../../application/dtos/createUserDTO";

export interface ICreateUserUseCase {
  createUser(user: CreateUserDTO): Promise<CreateUserResponseDTO>;
}
