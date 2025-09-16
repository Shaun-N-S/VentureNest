import { CreateUserDTO, CreateUserResponseDTO } from "application/dtos/User/createUserDTO";
import { User } from "domain/entities/user/userEntity";

export interface IUserRepository {
  save(data: User): Promise<User>;
  // findById(id: string): Promise<>;
  findByEmail(email: string): Promise<User | null>;
  // deleteById(id: string): Promise<void>;
  updatePassword(email: string, password: string): Promise<void>;
}
