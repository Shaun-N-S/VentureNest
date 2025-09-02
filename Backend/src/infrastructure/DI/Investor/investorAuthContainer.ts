// import { KeyValueTTLCaching } from "@infrastructure/cache/redis/KeyValueTTLCaching";
// import { investorModel } from "@infrastructure/db/models/investorModel";
// import { InvestorRepository } from "@infrastructure/repositories/investorRepository";
// import { OtpEmailContentGenerator } from "@infrastructure/service/emailContentGenerator/otpEmailContentGenerator";
// import { EmailService } from "@infrastructure/service/emailService";
// import { HashPassword } from "@infrastructure/service/hashPasswordService";
// import { JWTService } from "@infrastructure/service/JWTService";
// import { OtpService } from "@infrastructure/service/otpService";
// import { SentOtpUseCase } from "application/useCases/auth/sentOtp";
// import { TokenCreateUseCase } from "application/useCases/auth/TokenCreation";
// import { VerifyOtpUseCase } from "application/useCases/auth/verifyOtp";
// import { RegisterInvestorUseCase } from "application/useCases/Investor/SignUp/registerInvestorUseCase";
// import { InvestorAuthController } from "interfaceAdapters/controllers/Investor/investorAuthController";

// //Repository & Services
// const investorRepository = new InvestorRepository(investorModel);
// const hashService = new HashPassword();
// const otpService = new OtpService();
// const otpContentGenerator = new OtpEmailContentGenerator();
// const emailService = new EmailService();
// const cacheStorage = new KeyValueTTLCaching();
// const jwtService = new JWTService();

// //useCase
// const _registerInvestorUseCase = new RegisterInvestorUseCase(investorRepository, hashService);
// const sentOtpUseCase = new SentOtpUseCase(
//   otpService,
//   otpContentGenerator,
//   emailService,
//   investorRepository,
//   cacheStorage
// );
// const verifyOtpUseCase = new VerifyOtpUseCase(cacheStorage);
// // const InvestorLoginUseCase = new InvestorLoginUseCase()
// const tokenCreateUseCase = new TokenCreateUseCase(jwtService);
// // const cacheInvestorUseCase = new CacheInvestorUseCase(cacheStorage);

// export const injectedInvestorAuthController = new InvestorAuthController(
//   RegisterInvestorUseCase,
//   sentOtpUseCase,
//   token
// );
