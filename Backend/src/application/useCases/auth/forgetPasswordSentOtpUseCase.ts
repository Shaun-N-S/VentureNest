import { IUserRepository } from "domain/interfaces/repositories/IUserRepository";
import { IKeyValueTTLCaching } from "domain/interfaces/services/ICache/IKeyValueTTLCaching";
import { IBaseEmailTemplate } from "domain/interfaces/services/IEmail/IBaseEmailTemplate";
import { IEmailService } from "domain/interfaces/services/IEmail/IEmailService";
import { IOtpEmailTemplate } from "domain/interfaces/services/IEmail/IOtpEmailTemplate";
import { IOtpService } from "domain/interfaces/services/IOtp/IOtpService";
import { IForgetPasswordSendOtpUseCase } from "domain/interfaces/useCases/IForgetPasswordSentOtp";

export class ForgetPasswordSentOtpUseCase implements IForgetPasswordSendOtpUseCase {
  constructor(
    private _userRepository: IUserRepository,
    private _otpService: IOtpService,
    private _emailService: IEmailService,
    private _cacheService: IKeyValueTTLCaching
  ) {}

  async sendOtp(email: string): Promise<void> {
    const user = await this._userRepository.findByEmail(email);
    console.log(user);

    if (!user) {
      throw new Error("User this email doesn't exists");
    }

    const OTP = this._otpService.generateOtp();
    console.log(OTP);

    const Mail: IOtpEmailTemplate = {
      receiverEmail: email,
      otp: OTP,
      subject: "This is the otp for forget password",
    };

    this._cacheService.setData(`forgetPasswordOtp/${email}`, 5 * 60, OTP);
    this._emailService.sendEmail(Mail as Required<IBaseEmailTemplate>);
  }
}
