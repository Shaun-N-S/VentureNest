import { IKeyValueTTLCaching } from "domain/interfaces/services/ICache/IKeyValueTTLCaching";
import { IVerifyOtpUseCase } from "domain/interfaces/useCases/IVerifyOtp";

export class VerifyOtpUseCase implements IVerifyOtpUseCase {
  private _cacheStorage: IKeyValueTTLCaching;

  constructor(cacheStorage: IKeyValueTTLCaching) {
    this._cacheStorage = cacheStorage;
  }

  async verifyOtp(email: string, otp: string): Promise<boolean> {
    const cachedOtp = await this._cacheStorage.getData(`otp/${email}`);
    console.log(cachedOtp);
    if (!cachedOtp) {
      throw new Error("OTP expired or OTP not required");
    }
    const otpVerified = otp === cachedOtp;
    if (otpVerified) {
      await this._cacheStorage.deleteData(`otp/${email}`);
    }
    return otpVerified;
  }
}
