import bcrypt from "bcrypt";
import { CONFIG } from "../../config/config";
import { IHashPasswordService } from "../../domain/interfaces/services/IHashPasswordService";

export class HashPassword implements IHashPasswordService {
  async hashPassword(password: string): Promise<string> {
    console.log(CONFIG.BCRYPT_SALT_ROUNDS);
    return bcrypt.hash(password, CONFIG.BCRYPT_SALT_ROUNDS);
  }

  async compare(password: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
  }
}
