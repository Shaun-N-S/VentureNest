import { USER_ERRORS } from "@shared/constants/errors";
import { BaseUser } from "domain/entities/user/baseUserEntity";
import { IBaseRepository } from "domain/interfaces/repositories/IBaseRepository";
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
  private _baseRepository: IBaseRepository<BaseUser>;
  private _cacheStorage: IKeyValueTTLCaching;

  constructor(
    otpService: IOtpService,
    otpTemplateGenerator: IOtpEmailContentGenerator,
    emailService: IEmailService,
    baseRepository: IBaseRepository<BaseUser>,
    cacheStorage: IKeyValueTTLCaching
  ) {
    this._otpService = otpService;
    this._otpTemplateGenerator = otpTemplateGenerator;
    this._emailService = emailService;
    this._baseRepository = baseRepository;
    this._cacheStorage = cacheStorage;
  }

  async sendOtp(email: string): Promise<void> {
    const existingEmail = await this._baseRepository.findByEmail(email);
    if (existingEmail) {
      throw new Error(USER_ERRORS.USER_ALREADY_EXISTS);
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
