export interface IForgetPasswordVerifyOtpUseCase {
  verifyOtp(email: string, otp: string): Promise<boolean>;
}
