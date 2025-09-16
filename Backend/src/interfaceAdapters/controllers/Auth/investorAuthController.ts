import { Errors } from "@shared/constants/errors";
import { HTTPStatus } from "@shared/constants/httpStatus";
import { messages } from "@shared/constants/messages";
import { setRefreshTokenCookie } from "@shared/utils/setRefreshTokenCookie";
import { emailSchema } from "@shared/validations/emailValidator";
import { UserRole } from "domain/enums/userRole";
import { ICacheUserUseCase } from "domain/interfaces/useCases/ICacheUser";
import { ITokenCreationUseCase } from "domain/interfaces/useCases/ICreateToken";
import { IInvestorLoginUseCase } from "domain/interfaces/useCases/IInvestorLogin";
import { ICreateInvestorUseCase } from "domain/interfaces/useCases/investor/ICreateInvestor";
import { ISendOtpUseCase } from "domain/interfaces/useCases/ISendOtp";
import { IVerifyOtpUseCase } from "domain/interfaces/useCases/IVerifyOtp";
import { Request, Response } from "express";

export class InvestorAuthController {
  constructor(
    private _registerInvestorUseCase: ICreateInvestorUseCase,
    private _sentOtpUseCase: ISendOtpUseCase,
    private _verifyOtpUseCase: IVerifyOtpUseCase,
    private _tokenCreationUseCase: ITokenCreationUseCase,
    private _investorLoginUseCase: IInvestorLoginUseCase,
    private _cacheInvestorUseCase: ICacheUserUseCase
  ) {}

  async sendOtp(req: Request, res: Response): Promise<void> {
    try {
      const validatedEmail = emailSchema.safeParse(req.body.email);
      if (!validatedEmail.success) {
        throw new Error(Errors.INVALID_EMAIL);
      }
      const result = await this._sentOtpUseCase.sendOtp(validatedEmail.data!);
      console.log("result that returns ,", result);
      res.status(HTTPStatus.OK).json({ message: messages.Otp.OTP_SUCCESSFULL });
    } catch (error) {
      res.status(HTTPStatus.BAD_REQUEST).json({
        message: Errors.OTP_ERROR,
        error: error instanceof Error ? error.message : Errors.OTP_ERROR,
      });
    }
  }

  async registerInvestor(req: Request, res: Response): Promise<void> {
    try {
      const { otp, email, userName, password } = req.body;

      const otpVerified = await this._verifyOtpUseCase.verifyOtp(email, otp);
      if (!otpVerified) {
        res.status(HTTPStatus.BAD_REQUEST).json({ message: "Invalid OTP" });
        return;
      }

      const user = await this._registerInvestorUseCase.createInvestor({
        email,
        userName,
        password,
      });
      res.status(HTTPStatus.CREATED).json({ success: true, data: user });
    } catch (error) {
      res.status(HTTPStatus.BAD_REQUEST).json({
        success: false,
        message: error instanceof Error ? error.message : "Server error",
      });
    }
  }

  async investorLogin(req: Request, res: Response): Promise<void> {
    try {
      const { email, password } = req.body;
      console.log(email, password);
      const validatedEmail = emailSchema.parse(email);
      console.log(validatedEmail);
      if (!password) {
        throw new Error(Errors.PASSWORD_REQUIRED);
      }
      const investor = await this._investorLoginUseCase.investorLogin(email, password);
      console.log(investor);
      const token = this._tokenCreationUseCase.createAccessTokenAndRefreshToken({
        userId: investor._id.toString(),
        role: UserRole.INVESTOR,
      });

      setRefreshTokenCookie(res, token.refreshToken);

      await this._cacheInvestorUseCase.cacheUser(investor);

      res.status(HTTPStatus.OK).json({
        success: true,
        message: "Login successful",
        data: {
          investor,
          accessToken: token.accessToken,
        },
      });
    } catch (error) {
      res.status(HTTPStatus.BAD_REQUEST).json({
        message: Errors.INVALID_CREDENTIALS,
        error: error instanceof Error ? error.message : "Error while validating user",
      });
    }
  }
}
