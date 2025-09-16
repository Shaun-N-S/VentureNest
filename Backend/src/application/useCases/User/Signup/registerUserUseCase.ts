import { USER_ERRORS } from "@shared/constants/errors";
import { CreateUserDTO } from "application/dtos/User/createUserDTO";
import { UserMapper } from "application/mappers/userMappers";
import { IUserRepository } from "domain/interfaces/repositories/IUserRepository";
import { IHashPasswordService } from "domain/interfaces/services/IHashPasswordService";
import { ICreateUserUseCase } from "domain/interfaces/useCases/user/ICreateUser";

export class RegisterUserUseCase implements ICreateUserUseCase {
  constructor(
    private _userRepository: IUserRepository,
    private _hashService: IHashPasswordService
  ) {}

  async createUser(dto: CreateUserDTO): Promise<void> {
    const existing = await this._userRepository.findByEmail(dto.email);
    if (existing) {
      throw new Error(USER_ERRORS.USER_ALREADY_EXISTS);
    }

    const hashedPassword = await this._hashService.hashPassword(dto.password);
    const userEntity = UserMapper.toEntity({ ...dto, password: hashedPassword });

    await this._userRepository.save(userEntity);
  }
}
