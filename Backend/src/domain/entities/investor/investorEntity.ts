import { PreferredSector } from "domain/enums/preferredSectors";
import { BaseUser } from "../user/baseUserEntity";
import { StartupStage } from "domain/enums/startupStages";

export interface Investor extends BaseUser {
  location: string;
  companyName: string;
  experience: number;
  preferredSector: PreferredSector;
  preferredStartupStage: StartupStage;
  investmentMin: number;
  investmentMax: number;
  portfolioPdf: string;
}
