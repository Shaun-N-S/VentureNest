import { Errors } from "@shared/constants/errors";
import { IKeyValueTTLCaching } from "domain/interfaces/services/ICache/IKeyValueTTLCaching";
import { IForgetPasswordVerifyOtpUseCase } from "domain/interfaces/useCases/IForgetPasswordVerifyOtp";

export class ForgetPasswordVerifyOtpUseCase implements IForgetPasswordVerifyOtpUseCase {
  private _cacheStorage: IKeyValueTTLCaching;

  constructor(cacheStorage: IKeyValueTTLCaching) {
    this._cacheStorage = cacheStorage;
  }

  async verifyOtp(email: string, otp: string): Promise<boolean> {
    const cachedOtp = await this._cacheStorage.getData(`forgetPasswordOtp/${email}`);
    console.log(cachedOtp);
    if (!cachedOtp) {
      throw new Error(Errors.OTP_MISSING);
    }

    const otpVerified = otp === cachedOtp;
    if (otpVerified) {
      await this._cacheStorage.deleteData(`forgetPasswordOtp/${email}`);
    }
    return otpVerified;
  }
}
