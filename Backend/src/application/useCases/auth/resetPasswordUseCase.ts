import { IUserRepository } from "domain/interfaces/repositories/IUserRepository";
import { IHashPasswordService } from "domain/interfaces/services/IHashPasswordService";
import { IResetPasswordUseCase } from "domain/interfaces/useCases/IResetPassword";

export class ResetPasswordUseCase implements IResetPasswordUseCase {
  constructor(
    private _userRepository: IUserRepository,
    private _hashService: IHashPasswordService
  ) {}

  async resetPassword(email: string, password: string): Promise<boolean> {
    const existing = await this._userRepository.findByEmail(email);
    if (!existing) {
      throw new Error("Email not found");
    }

    password = await this._hashService.hashPassword(password);

    await this._userRepository.updatePassword(email, password);
    return true;
  }
}
