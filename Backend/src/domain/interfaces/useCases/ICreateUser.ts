import { CreateUserDTO, CreateUserResponseDTO } from "../../../application/dtos/User/createUserDTO";

export interface ICreateUserUseCase {
  createUser(user: CreateUserDTO): Promise<CreateUserResponseDTO>;
}
