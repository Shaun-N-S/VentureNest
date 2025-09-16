import { UserRole } from "../../enums/userRole";
import { UserStatus } from "../../enums/userStatus";
import { PreferredSector } from "domain/enums/preferredSectors";
import { StartupStage } from "domain/enums/startupStages";
import { User } from "../user/userEntity";

export class Investor extends User {
  private _location: string;
  private _companyName: string;
  private _experience: number;
  private _preferredSector: PreferredSector[];
  private _preferredStartupStage: StartupStage[];
  private _investmentMin: number;
  private _investmentMax: number;
  private _portfolioPdf: string;

  constructor(
    id: string,
    userName: string,
    email: string,
    password: string,
    linkedInUrl: string = "",
    profileImg: string = "",
    aadharImg: string = "",
    selfieImg: string = "",
    phoneNumber: string = "",
    address: string = "",
    dateOfBirth: Date = new Date(0),
    role: UserRole = UserRole.INVESTOR,
    status: UserStatus = UserStatus.ACTIVE,
    interestedTopics: PreferredSector[] = [],
    adminVerified: boolean = false,
    isFirstLogin: boolean = true,
    website: string = "",
    bio: string = "",
    verifiedAt: Date = new Date(),
    createdAt: Date = new Date(),
    updatedAt: Date = new Date(),
    location: string = "",
    companyName: string = "",
    experience: number = 0,
    preferredSector: PreferredSector[] = [],
    preferredStartupStage: StartupStage[] = [],
    investmentMin: number = 0,
    investmentMax: number = 0,
    portfolioPdf: string = ""
  ) {
    super(
      id,
      userName,
      email,
      password,
      linkedInUrl,
      profileImg,
      aadharImg,
      selfieImg,
      phoneNumber,
      address,
      dateOfBirth,
      role,
      status,
      interestedTopics,
      adminVerified,
      isFirstLogin,
      website,
      bio,
      verifiedAt,
      createdAt,
      updatedAt
    );
    this._location = location;
    this._companyName = companyName;
    this._experience = experience;
    this._preferredSector = preferredSector;
    this._preferredStartupStage = preferredStartupStage;
    this._investmentMin = investmentMin;
    this._investmentMax = investmentMax;
    this._portfolioPdf = portfolioPdf;
  }

  // Additional Getters
  public get location(): string {
    return this._location;
  }

  public get companyName(): string {
    return this._companyName;
  }

  public get experience(): number {
    return this._experience;
  }

  public get preferredSector(): PreferredSector[] {
    return [...this._preferredSector];
  }

  public get preferredStartupStage(): StartupStage[] {
    return [...this._preferredStartupStage];
  }

  public get investmentMin(): number {
    return this._investmentMin;
  }

  public get investmentMax(): number {
    return this._investmentMax;
  }

  public get portfolioPdf(): string {
    return this._portfolioPdf;
  }

  // Extended Business Logic
  public updateProfile(updates: {
    userName?: string;
    linkedInUrl?: string;
    website?: string;
    bio?: string;
    profileImg?: string;
    location?: string;
    companyName?: string;
    experience?: number;
    portfolioPdf?: string;
  }): void {
    if (updates.location) this._location = updates.location;
    if (updates.companyName) this._companyName = updates.companyName;
    if (updates.experience !== undefined) this._experience = updates.experience;
    if (updates.portfolioPdf) this._portfolioPdf = updates.portfolioPdf;

    // this.updatedAt = new Date();
  }

  public addPreferredSector(sector: PreferredSector): void {
    if (!Object.values(PreferredSector).includes(sector)) {
      throw new Error("Invalid preferred sector");
    }
    if (!this._preferredSector.includes(sector)) {
      this._preferredSector.push(sector);
      // this._updatedAt = new Date();
    }
  }

  public addPreferredStartupStage(stage: StartupStage): void {
    if (!Object.values(StartupStage).includes(stage)) {
      throw new Error("Invalid preferred startup stage");
    }
    if (!this._preferredStartupStage.includes(stage)) {
      this._preferredStartupStage.push(stage);
      // this._updatedAt = new Date();
    }
  }

  public updateInvestmentRange(min: number, max: number): void {
    if (min < 0 || max < 0) {
      throw new Error("Investment amounts cannot be negative");
    }
    if (min > max) {
      throw new Error("Minimum investment cannot exceed maximum");
    }
    this._investmentMin = min;
    this._investmentMax = max;
    // this._updatedAt = new Date();
  }
}
