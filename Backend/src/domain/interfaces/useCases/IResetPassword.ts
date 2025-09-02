export interface IResetPasswordUseCase {
  resetPassword(email: string, password: string): Promise<boolean>;
}
