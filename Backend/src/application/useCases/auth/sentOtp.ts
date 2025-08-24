import { IUserRepository } from "domain/interfaces/repositories/IUserRepository";
import { IKeyValueTTLCaching } from "domain/interfaces/services/ICache/IKeyValueTTLCaching";
import { IOtpEmailContentGenerator } from "domain/interfaces/services/IEmail/IEmailContentGenerator";
import { IEmailService } from "domain/interfaces/services/IEmail/IEmailService";
import { IOtpEmailTemplate } from "domain/interfaces/services/IEmail/IOtpEmailTemplate";
import { IOtpService } from "domain/interfaces/services/IOtp/IOtpService";
import { ISendOtpUseCase } from "domain/interfaces/useCases/ISendOtp";

export class SentOtpUseCase implements ISendOtpUseCase {
  private _otpService: IOtpService;
  private _otpTemplateGenerator: IOtpEmailContentGenerator;
  private _emailService: IEmailService;
  private _userPresistance: IUserRepository;
  private _cacheStorage: IKeyValueTTLCaching;

  constructor(
    otpService: IOtpService,
    otpTemplateGenerator: IOtpEmailContentGenerator,
    emailService: IEmailService,
    userPresistance: IUserRepository,
    cacheStorage: IKeyValueTTLCaching
  ) {
    this._otpService = otpService;
    this._otpTemplateGenerator = otpTemplateGenerator;
    this._emailService = emailService;
    this._userPresistance = userPresistance;
    this._cacheStorage = cacheStorage;
  }

  async sendOtp(email: string): Promise<void> {
    const existingEmail = await this._userPresistance.findByEmail(email);
    if (existingEmail) {
      throw new Error("Email is already used by another user");
    }

    const OTP = this._otpService.generateOtp();
    console.log("OTP : ", OTP, email);
    const emailTemplate: IOtpEmailTemplate = {
      receiverEmail: email,
      subject: "Your VentureNest OTP",
      otp: OTP,
    };

    emailTemplate.content = this._otpTemplateGenerator.generateTemplate(OTP);
    this._emailService.sendEmail(emailTemplate as Required<IOtpEmailTemplate>);
    this._cacheStorage.setData(`otp/${email}`, 5 * 60, OTP);
  }
}
