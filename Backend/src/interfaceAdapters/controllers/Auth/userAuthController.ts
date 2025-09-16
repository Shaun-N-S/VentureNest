// src/interfaceAdapters/controllers/Auth/UserAuthController.ts
import { Errors } from "@shared/constants/errors";
import { HTTPStatus } from "@shared/constants/httpStatus";
import { messages } from "@shared/constants/messages";
import { setRefreshTokenCookie } from "@shared/utils/setRefreshTokenCookie";
import { emailSchema } from "@shared/validations/emailValidator";
import { UserRole } from "domain/enums/userRole";
import { ICacheUserUseCase } from "domain/interfaces/useCases/ICacheUser";
import { ITokenCreationUseCase } from "domain/interfaces/useCases/ICreateToken";
import { ISendOtpUseCase } from "domain/interfaces/useCases/ISendOtp";
import { IUserLoginUseCase } from "domain/interfaces/useCases/IUserLogin";
import { IVerifyOtpUseCase } from "domain/interfaces/useCases/IVerifyOtp";
import { ICreateUserUseCase } from "domain/interfaces/useCases/user/ICreateUser";
import { Request, Response } from "express";

export class UserAuthController {
  constructor(
    private _registerUseCase: ICreateUserUseCase,
    private _sendOtpUseCase: ISendOtpUseCase,
    private _verifyOtpUseCase: IVerifyOtpUseCase,
    private _userLoginUseCase: IUserLoginUseCase,
    private _tokenCreationUseCase: ITokenCreationUseCase,
    private _cacheUserUseCase: ICacheUserUseCase
  ) {}

  async sendOtp(req: Request, res: Response): Promise<void> {
    try {
      const validatedEmail = emailSchema.safeParse(req.body.email);
      if (!validatedEmail.success) {
        throw new Error(Errors.INVALID_EMAIL);
      }
      const result = await this._sendOtpUseCase.sendOtp(validatedEmail.data!);
      console.log("result that returns ,", result);
      res.status(HTTPStatus.OK).json({ message: messages.Otp.OTP_SUCCESSFULL });
    } catch (error) {
      res.status(HTTPStatus.BAD_REQUEST).json({
        message: Errors.OTP_ERROR,
        error: error instanceof Error ? error.message : Errors.OTP_ERROR,
      });
    }
  }

  async registerUser(req: Request, res: Response): Promise<void> {
    try {
      // const validatedData = req.body;
      const { otp, email, userName, password } = req.body;

      const otpVerified = await this._verifyOtpUseCase.verifyOtp(email, otp);
      if (!otpVerified) {
        res.status(HTTPStatus.BAD_REQUEST).json({ message: "Invalid OTP" });
        return;
      }

      const user = await this._registerUseCase.createUser({ email, userName, password });
      res.status(HTTPStatus.CREATED).json({ success: true, data: user });
    } catch (error) {
      res.status(HTTPStatus.BAD_REQUEST).json({
        success: false,
        message: error instanceof Error ? error.message : "Server error",
      });
    }
  }

  async userLogin(req: Request, res: Response): Promise<void> {
    try {
      const { email, password } = req.body;
      console.log(email, password);

      const validatedEmail = emailSchema.parse(email);
      console.log(validatedEmail);
      if (!password) {
        throw new Error(Errors.PASSWORD_REQUIRED);
      }

      const user = await this._userLoginUseCase.userLogin(email, password);
      console.log(user);
      const token = this._tokenCreationUseCase.createAccessTokenAndRefreshToken({
        userId: user._id.toString(),
        role: UserRole.USER,
      });

      setRefreshTokenCookie(res, token.refreshToken);

      await this._cacheUserUseCase.cacheUser(user);

      res.status(HTTPStatus.OK).json({
        success: true,
        message: "Login successful",
        data: {
          user,
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
