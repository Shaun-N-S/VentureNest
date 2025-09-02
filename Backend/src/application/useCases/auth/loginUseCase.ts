import { Errors, USER_ERRORS } from "@shared/constants/errors";
import { LoginUserDTO } from "application/dtos/User/loginUserDTO";
import { UserStatus } from "domain/enums/userStatus";
import { IUserRepository } from "domain/interfaces/repositories/IUserRepository";
import { IHashPasswordService } from "domain/interfaces/services/IHashPasswordService";
import { IUserLoginUseCase } from "domain/interfaces/useCases/IUserLogin";

export class UserLoginUseCase implements IUserLoginUseCase {
  private _userRepository;
  private _hashService;

  constructor(userRepository: IUserRepository, hashService: IHashPasswordService) {
    this._userRepository = userRepository;
    this._hashService = hashService;
  }

  async userLogin(email: string, password: string): Promise<LoginUserDTO> {
    const user = await this._userRepository.findByEmail(email);

    if (!user) {
      throw new Error(USER_ERRORS.USER_NOT_FOUND);
    }

    if (user.status === UserStatus.BLOCKED) {
      throw new Error(USER_ERRORS.USER_BLOCKED);
    }

    const verifyPassword = await this._hashService.compare(password, user.password);

    if (!verifyPassword) {
      throw new Error(Errors.INVALID_CREDENTIALS);
    }

    const responseData: LoginUserDTO = {
      _id: user._id!,
      email: user.email,
      userName: user.userName,
      interestedTopics: user.interestedTopics,
      role: user.role,
      status: user.status,
      isFirstLogin: user.isFirstLogin,
      linkedInUrl: user.linkedInUrl,
      profileImg: user.profileImg,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };

    return responseData;
  }
}
