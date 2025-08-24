import { UserRepository } from "../repositories/userRepository";
import { HashPassword } from "../service/hashPasswordService";
import { RegisterUserUseCase } from "../../application/useCases/auth/registerUserUseCase";
import { AuthController } from "../../interfaceAdapters/controllers/authController";
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
import { ForgetPasswordUseCase } from "application/useCases/auth/forgetPasswordUseCase";

// Repositories & Services
const userRepository = new UserRepository();
const hashService = new HashPassword();
const otpService = new OtpService();
const otpContentGenerator = new OtpEmailContentGenerator();
const emailService = new EmailService();
const cacheStorage = new KeyValueTTLCaching();
const jwtService = new JWTService();

// Use Case
const registerUserUseCase = new RegisterUserUseCase(userRepository, hashService);
const sentOtpUseCase = new SentOtpUseCase(
  otpService,
  otpContentGenerator,
  emailService,
  userRepository,
  cacheStorage
);
const verifyOtpUseCase = new VerifyOtpUseCase(cacheStorage);
const userLoginUseCase = new UserLoginUseCase(userRepository, hashService);
const tokenCreateUseCase = new TokenCreateUseCase(jwtService);
const cacheUserUseCase = new CacheUserUseCase(cacheStorage);
const forgetPasswordOtp = new ForgetPasswordUseCase(
  userRepository,
  otpService,
  emailService,
  cacheStorage
);

// Controller
export const injectedRegisterUserController = new AuthController(
  registerUserUseCase,
  sentOtpUseCase,
  verifyOtpUseCase,
  tokenCreateUseCase,
  userLoginUseCase,
  cacheUserUseCase,
  forgetPasswordOtp
);
