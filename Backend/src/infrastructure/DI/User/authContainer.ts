import { UserRepository } from "../../repositories/userRepository";
import { HashPassword } from "../../service/hashPasswordService";
import { RegisterUserUseCase } from "../../../application/useCases/auth/registerUserUseCase";
import { AuthController } from "../../../interfaceAdapters/controllers/Auth/userAuthController";
import { OtpService } from "@infrastructure/service/otpService";
import { SentOtpUseCase } from "application/useCases/auth/sentOtp";
import { OtpEmailContentGenerator } from "@infrastructure/service/emailContentGenerator/otpEmailContentGenerator";
import { EmailService } from "@infrastructure/service/emailService";
import { KeyValueTTLCaching } from "@infrastructure/cache/redis/KeyValueTTLCaching";
import { VerifyOtpUseCase } from "application/useCases/auth/verifyOtp";
import { UserLoginUseCase } from "application/useCases/auth/loginUseCase";
import { TokenCreateUseCase } from "application/useCases/auth/TokenCreation";
import { JWTService } from "@infrastructure/service/JWTService";
import { CacheUserUseCase } from "application/useCases/auth/cacheUserUseCase";
import { ForgetPasswordSentOtpUseCase } from "application/useCases/auth/forgetPasswordSentOtpUseCase";
import { userModel } from "@infrastructure/db/models/userModel";
import { ForgetPasswordVerifyOtpUseCase } from "application/useCases/auth/forgetPasswordVerifyOtpUseCase";
import { ResetPasswordUseCase } from "application/useCases/auth/resetPasswordUseCase";
import { InvestorRepository } from "@infrastructure/repositories/investorRepository";
import { investorModel } from "@infrastructure/db/models/investorModel";
import { RegisterInvestorUseCase } from "application/useCases/Investor/Authentication/registerInvestorUseCase";

// Repositories & Services
const userRepository = new UserRepository(userModel);
const investorRepository = new InvestorRepository(investorModel);
const hashService = new HashPassword();
const otpService = new OtpService();
const otpContentGenerator = new OtpEmailContentGenerator();
const emailService = new EmailService();
const cacheStorage = new KeyValueTTLCaching();
const jwtService = new JWTService();

// Use Case
const registerUserUseCase = new RegisterUserUseCase(userRepository, hashService);
const registerInvestorUseCase = new RegisterInvestorUseCase(investorRepository, hashService);
const userSentOtpUseCase = new SentOtpUseCase(
  otpService,
  otpContentGenerator,
  emailService,
  userRepository,
  cacheStorage
);
const investorSentOtpUseCase = new SentOtpUseCase(
  otpService,
  otpContentGenerator,
  emailService,
  investorRepository,
  cacheStorage
);
const verifyOtpUseCase = new VerifyOtpUseCase(cacheStorage);
const userLoginUseCase = new UserLoginUseCase(userRepository, hashService);
const tokenCreateUseCase = new TokenCreateUseCase(jwtService);
const cacheUserUseCase = new CacheUserUseCase(cacheStorage);
const forgetPasswordSentOtp = new ForgetPasswordSentOtpUseCase(
  userRepository,
  otpService,
  emailService,
  cacheStorage
);
const forgetPasswordVerifyOtp = new ForgetPasswordVerifyOtpUseCase(cacheStorage);
const resetPassword = new ResetPasswordUseCase(userRepository, hashService);

// Controller
export const injectedRegisterUserController = new AuthController(
  registerUserUseCase,
  registerInvestorUseCase,
  userSentOtpUseCase,
  investorSentOtpUseCase,
  verifyOtpUseCase,
  tokenCreateUseCase,
  userLoginUseCase,
  cacheUserUseCase,
  forgetPasswordSentOtp,
  forgetPasswordVerifyOtp,
  resetPassword
);
