import { LoginUserDTO } from "application/dtos/User/loginUserDTO";
import { IKeyValueTTLCaching } from "domain/interfaces/services/ICache/IKeyValueTTLCaching";
import { ICacheUserUseCase } from "domain/interfaces/useCases/ICacheUser";

export class CacheUserUseCase implements ICacheUserUseCase {
  constructor(private _cacheDataBase: IKeyValueTTLCaching) {}

  cacheUser(user: LoginUserDTO): void {
    this._cacheDataBase.setData(`user/${user._id}`, 15 * 60, JSON.stringify(user));
  }
}
