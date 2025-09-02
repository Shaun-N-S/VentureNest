import { Request, Response } from "express";
import { HTTPStatus } from "../../../shared/constants/httpStatus";
import { ICreateUserUseCase } from "domain/interfaces/useCases/ICreateUser";
import { registerUserSchema } from "@shared/validations/registerUserValidator";
import { emailSchema } from "@shared/validations/emailValidator";
import { ISendOtpUseCase } from "domain/interfaces/useCases/ISendOtp";
import { IVerifyOtpUseCase } from "domain/interfaces/useCases/IVerifyOtp";
import { ITokenCreationUseCase } from "domain/interfaces/useCases/ICreateToken";
import { IUserLoginUseCase } from "domain/interfaces/useCases/IUserLogin";
import { UserRole } from "domain/enums/userRole";
import { ICacheUserUseCase } from "domain/interfaces/useCases/ICacheUser";
import { IForgetPasswordSendOtpUseCase } from "domain/interfaces/useCases/IForgetPasswordSentOtp";
import { Errors } from "@shared/constants/errors";
import { IForgetPasswordVerifyOtpUseCase } from "domain/interfaces/useCases/IForgetPasswordVerifyOtp";
import { IResetPasswordUseCase } from "domain/interfaces/useCases/IResetPassword";
import { ICreateInvestorUseCase } from "domain/interfaces/useCases/ICreateInvestor";
// import { BaseUser } from "domain/entities/user/baseUserEntity";

export class AuthController {
  constructor(
    private _registerUseCase: ICreateUserUseCase,
    private _registerInvestor: ICreateInvestorUseCase,
    private _sentOtpUseCase: ISendOtpUseCase,
    private _investorSentOtpUseCase: ISendOtpUseCase,
    private _verifyOtpUseCase: IVerifyOtpUseCase,
    private _tokenCreateUseCase: ITokenCreationUseCase,
    private _userloginUseCase: IUserLoginUseCase,
    private _cacheUserUseCase: ICacheUserUseCase,
    private _forgetPasswordUseCase: IForgetPasswordSendOtpUseCase,
    private _forgetPasswordVerifyOtpUseCase: IForgetPasswordVerifyOtpUseCase,
    private _resetPasswordUseCase: IResetPasswordUseCase
  ) {}

  // UserRegister controller
  async registerUser(req: Request, res: Response): Promise<void> {
    try {
      console.log("reached registerUser", req.body);

      const validatedData = registerUserSchema.parse(req.body);
      // const validatedData = req.body;
      const { otp } = req.body;

      console.log(otp);

      const otpVerified = await this._verifyOtpUseCase.verifyOtp(validatedData.email, otp);
      console.log("otpVerified :", otpVerified);
      if (!otpVerified) {
        res.status(HTTPStatus.BAD_REQUEST).json({ message: "Invalid OTP " });
      }

      const user = await this._registerUseCase.createUser(validatedData);
      console.log(user);
      res.status(HTTPStatus.CREATED).json({ success: true, data: user });
    } catch (error) {
      if (error instanceof Error) {
        console.log(error);

        res.status(HTTPStatus.BAD_REQUEST).json({
          success: false,
          message: "Validation failed",
          errors: (error as any).issues,
        });
      } else {
        res.status(HTTPStatus.BAD_REQUEST).json({
          success: false,
          message: error instanceof Error ? error.message : "server error",
        });
      }
    }
  }

  async registerInvestor(req: Request, res: Response): Promise<void> {
    try {
      const validatedData = req.body; //please add validation after completing
      const { otp } = req.body;
      console.log(otp);

      const otpVerified = await this._verifyOtpUseCase.verifyOtp(validatedData.email, otp);
      console.log("otpVerified :", otpVerified);
      if (!otpVerified) {
        res.status(HTTPStatus.BAD_REQUEST).json({ message: "Invalid Otp" });
      }

      const investor = await this._registerInvestor.createInvestor(validatedData);
      console.log(investor);
      res.status(HTTPStatus.CREATED).json({ success: true, data: investor });
    } catch (error) {
      if (error instanceof Error) {
        console.log(error);

        res.status(HTTPStatus.BAD_REQUEST).json({
          success: false,
          message: "Validation failed",
          errors: (error as any).issues,
        });
      } else {
        res.status(HTTPStatus.BAD_REQUEST).json({
          success: false,
          message: error instanceof Error ? error.message : "server error",
        });
      }
    }
  }

  async sendOtp(req: Request, res: Response): Promise<void> {
    try {
      const validatedEmail = emailSchema.safeParse(req.body.email);
      console.log(validatedEmail, "email ");
      if (!validatedEmail) {
        throw new Error("Email not recieved");
      }
      console.log(req.body);
      const email = validatedEmail.data;

      await this._sentOtpUseCase.sendOtp(email!);
      res.status(HTTPStatus.OK).json({ message: "OTP send successfully " });
    } catch (error) {
      console.error("Error while senting otp");
      res.status(HTTPStatus.BAD_REQUEST).json({
        message: "Error while senting otp",
        error: error instanceof Error ? error.message : "otp error",
      });
    }
  }

  async login(req: Request, res: Response): Promise<void> {
    try {
      const { email, password } = req.body;
      console.log(email, password);

      const validatedEmail = emailSchema.parse(email);
      console.log(validatedEmail);
      if (!password) {
        throw new Error("Enter password");
      }

      const user = await this._userloginUseCase.userLogin(email, password);
      console.log(user);
      const token = this._tokenCreateUseCase.createAccessTokenAndRefreshToken({
        userId: user._id.toString(),
        role: UserRole.USER,
      });

      res.cookie("RefreshToken", token.refreshToken, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000,
      });

      await this._cacheUserUseCase.cacheUser(user);

      res.status(HTTPStatus.OK).json({
        message: "Login Successful",
        user,
        accessToken: token.accessToken,
      });
    } catch (error) {
      res.status(HTTPStatus.BAD_REQUEST).json({
        message: Errors.INVALID_CREDENTIALS,
        error: error instanceof Error ? error.message : "Error while validating user",
      });
    }
  }

  // async loginInvestor(req: Request, res: Response) {
  //   try {
  //     const {email,password} = req.body;
  //     console.log(email,password);
  //     if(!email || !password){
  //       throw new Error("All fields are required");
  //     }
  //     const validatedEmail = emailSchema.parse(email);

  //     const investor = await this.investorLoginUseCase
  //   } catch (error) {}
  // }

  async forgetPassword(req: Request, res: Response): Promise<void> {
    try {
      const { email } = req.body;
      console.log(email);
      await this._forgetPasswordUseCase.sendOtp(email);
      res.status(HTTPStatus.OK).json({ message: "OTP sent successfully" });
      return;
    } catch (error) {
      console.log("Error while sending otp");
      res.status(HTTPStatus.BAD_REQUEST).json({
        Errors: "Error while sending otp ",
        error: error instanceof Error ? error.message : "otp error",
      });
    }
  }

  async verifyOtp(req: Request, res: Response): Promise<void> {
    try {
      const { email, otp } = req.body;

      if (!email || !otp) {
        res.status(HTTPStatus.BAD_REQUEST).json({ message: "Email and OTP is required" });
        return;
      }

      const verifiedUser = await this._verifyOtpUseCase.verifyOtp(email, otp);

      res
        .status(HTTPStatus.OK)
        .json({ success: true, message: "OTP Verified Successfully", data: verifiedUser });
    } catch (error) {
      console.error("OTP verification error", error);
      res
        .status(HTTPStatus.BAD_REQUEST)
        .json({ success: false, message: "OTP Verification failed" });
    }
  }

  async forgetPasswordVerifyOtp(req: Request, res: Response): Promise<void> {
    try {
      const { email, otp } = req.body;

      if (!email || !otp) {
        res.status(HTTPStatus.BAD_REQUEST).json({ message: "email and otp is required" });
        return;
      }

      const verifiedUser = await this._forgetPasswordVerifyOtpUseCase.verifyOtp(email, otp);
      console.log(verifiedUser);
      res
        .status(HTTPStatus.OK)
        .json({ success: true, message: "OTP Verified successfully and password updated" });
    } catch (error) {
      console.error("Error while verifying forget password otp", error);
      res
        .status(HTTPStatus.BAD_REQUEST)
        .json({ success: false, message: Errors.OTP_VERIFICATION_FAILED });
    }
  }

  async resetPassword(req: Request, res: Response): Promise<void> {
    try {
      const { email, newPassword } = req.body;
      if (!email || !newPassword) {
        res.status(HTTPStatus.BAD_REQUEST).json({ message: "email and password is required" });
      }

      const updatedPassword = await this._resetPasswordUseCase.resetPassword(email, newPassword);
      console.log(updatedPassword);
      res.status(HTTPStatus.OK).json({ success: true, message: "Password updated successfully" });
    } catch (error) {
      console.error("Error while updating password", error);
      res
        .status(HTTPStatus.BAD_REQUEST)
        .json({ success: false, message: "Error while updating password" });
    }
  }
}
