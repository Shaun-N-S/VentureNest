import { ICreateUserUseCase } from "../../../domain/interfaces/useCases/ICreateUser";
import { IUserRepository } from "../../../domain/interfaces/repositories/IUserRepository";
import { CreateUserDTO, CreateUserResponseDTO } from "../../dtos/createUserDTO";
import { IHashPasswordService } from "../../../domain/interfaces/services/IHashPasswordService";
import { messages } from "../../../shared/constants/messages";

export class RegisterUserUseCase implements ICreateUserUseCase {
  constructor(
    private _userRepository: IUserRepository,
    private _hashService: IHashPasswordService
  ) {}

  async createUser(user: CreateUserDTO): Promise<CreateUserResponseDTO> {
    // console.log(user);
    const existing = await this._userRepository.findByEmail(user.email);
    if (existing) {
      throw new Error(messages.USER_ALREADY_EXISTS);
    }

    user.password = await this._hashService.hashPassword(user.password);

    const saved = await this._userRepository.createUser(user);
    const response: CreateUserResponseDTO = {
      _id: saved._id!,
      userName: saved.userName,
      email: saved.email,
      interestedTopics: saved.interestedTopics,
      linkedInUrl: saved.linkedInUrl,
      profileImg: saved.profileImg,
      role: saved.role,
      status: saved.status,
      createdAt: saved.createdAt,
      updatedAt: saved.updatedAt,
    };
    console.log(response);
    return response;
  }
}
