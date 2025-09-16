import { UserRole } from "../../enums/userRole";
import { UserStatus } from "../../enums/userStatus";
import { PreferredSector } from "domain/enums/preferredSectors";

export class User {
  private _id: string;
  private _userName: string;
  private _email: string;
  private _password: string;
  private _isFirstLogin: boolean;
  private _linkedInUrl: string;
  private _profileImg: string;
  private _website: string;
  private _bio: string;
  private _interestedTopics: PreferredSector[];
  private _role: UserRole;
  private _status: UserStatus;
  private _adminVerified: boolean;
  private _dateOfBirth: Date;
  private _phoneNumber: string;
  private _address: string;
  private _aadharImg: string;
  private _selfieImg: string;
  private _verifiedAt: Date;
  private _createdAt: Date;
  private _updatedAt: Date;

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
    role: UserRole = UserRole.USER,
    status: UserStatus = UserStatus.ACTIVE,
    interestedTopics: PreferredSector[] = [],
    adminVerified: boolean = false,
    isFirstLogin: boolean = true,
    website: string = "",
    bio: string = "",
    verifiedAt: Date = new Date(0),
    createdAt: Date = new Date(),
    updatedAt: Date = new Date()
  ) {
    this._id = id;
    this._userName = userName;
    this._email = email;
    this._password = password;
    this._linkedInUrl = linkedInUrl;
    this._profileImg = profileImg;
    this._website = website;
    this._bio = bio;
    this._interestedTopics = interestedTopics;
    this._role = role;
    this._status = status;
    this._adminVerified = adminVerified;
    this._dateOfBirth = dateOfBirth;
    this._phoneNumber = phoneNumber;
    this._address = address;
    this._aadharImg = aadharImg;
    this._selfieImg = selfieImg;
    this._isFirstLogin = isFirstLogin;
    this._verifiedAt = verifiedAt;
    this._createdAt = createdAt;
    this._updatedAt = updatedAt;
  }

  // Getter
  public get id(): string {
    return this._id;
  }

  public get userName(): string {
    return this._userName;
  }

  public get email(): string {
    return this._email;
  }

  public get password(): string {
    return this._password;
  }

  public get isFirstLogin(): boolean {
    return this._isFirstLogin;
  }

  public get linkedInUrl(): string {
    return this._linkedInUrl;
  }

  public get profileImg(): string {
    return this._profileImg;
  }

  public get website(): string {
    return this._website;
  }

  public get bio(): string {
    return this._bio;
  }

  public get interestedTopics(): PreferredSector[] {
    return [...this._interestedTopics];
  }

  public get role(): UserRole {
    return this._role;
  }

  public get status(): UserStatus {
    return this._status;
  }

  public get adminVerified(): boolean {
    return this._adminVerified;
  }

  public get dateOfBirth(): Date {
    return this._dateOfBirth;
  }

  public get phoneNumber(): string {
    return this._phoneNumber;
  }

  public get address(): string {
    return this._address;
  }

  public get aadharImg(): string {
    return this._aadharImg;
  }

  public get selfieImg(): string {
    return this._selfieImg;
  }

  public get verifiedAt(): Date {
    return this._verifiedAt;
  }

  public get createdAt(): Date {
    return this._createdAt;
  }

  public get updatedAt(): Date {
    return this._updatedAt;
  }

  // Business Logic
  public updateProfile(updates: {
    userName?: string;
    linkedInUrl?: string;
    website?: string;
    bio?: string;
    profileImg?: string;
  }): void {
    if (updates.userName) this._userName = updates.userName;
    if (updates.linkedInUrl) this._linkedInUrl = updates.linkedInUrl;
    if (updates.website) this._website = updates.website;
    if (updates.bio) this._bio = updates.bio;
    if (updates.profileImg) this._profileImg = updates.profileImg;

    this._updatedAt = new Date();
  }

  public changePassword(newPassword: string): void {
    if (!newPassword) {
      throw new Error("Password not found");
    }
    this._password = newPassword;
    this._updatedAt = new Date();
  }

  public addInterestedTopics(topic: PreferredSector): void {
    if (!Object.values(PreferredSector).includes(topic)) {
      throw new Error("Invalid preferred sector");
    }
    if (!this._interestedTopics.includes(topic)) {
      this._interestedTopics.push(topic);
      this._updatedAt = new Date();
    }
  }

  public verifyByAdmin(): void {
    if (this._adminVerified) {
      throw new Error("User already verified by admin");
    }
    this._adminVerified = true;
    this._verifiedAt = new Date();
    this._updatedAt = new Date();
  }

  public completeFirstLogin(): void {
    if (!this._isFirstLogin) {
      throw new Error("First login already completed");
    }
    this._isFirstLogin = false;
    this._updatedAt = new Date();
  }

  public updateStatus(status: UserStatus): void {
    if (!Object.values(UserStatus).includes(status)) {
      throw new Error("Invalid user status");
    }
    this._status = status;
    this._updatedAt = new Date();
  }
}
