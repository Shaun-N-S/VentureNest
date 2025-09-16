// src/application/mappers/userMappers.ts
import { User } from "domain/entities/user/userEntity";
import { CreateUserDTO, CreateUserResponseDTO } from "application/dtos/User/createUserDTO";
import mongoose from "mongoose";
import { UserRole } from "domain/enums/userRole";
import { UserStatus } from "domain/enums/userStatus";
import { IuserModel } from "@infrastructure/db/models/userModel";
import { LoginUserDTO } from "application/dtos/User/loginUserDTO";

export class UserMapper {
  static toEntity(dto: CreateUserDTO): User {
    return new User(
      new mongoose.Types.ObjectId().toString(),
      dto.userName,
      dto.email,
      dto.password,
      "",
      "",
      "",
      "",
      "",
      "",
      new Date(0),
      UserRole.USER,
      UserStatus.ACTIVE,
      [],
      false,
      true,
      "",
      "",
      new Date(),
      new Date(),
      new Date()
    );
  }

  static toCreateUserResponseDTO(user: User): CreateUserResponseDTO {
    return {
      _id: user.id,
      userName: user.userName,
      email: user.email,
      role: user.role,
      status: user.status,
      isFirstLogin: user.isFirstLogin,
      updatedAt: user.updatedAt,
      linkedInUrl: user.linkedInUrl,
      profileImg: user.profileImg,
      website: user.website,
      bio: user.bio,
      interestedTopics: user.interestedTopics,
      adminVerified: user.adminVerified,
      dateOfBirth: user.dateOfBirth,
      phoneNumber: user.phoneNumber,
      address: user.address,
      aadharImg: user.aadharImg,
      selfieImg: user.selfieImg,
      verifiedAt: user.verifiedAt,
      createdAt: user.createdAt,
    };
  }

  static toLoginUserResponseDTO(user: User): LoginUserDTO {
    return {
      _id: user.id,
      userName: user.userName,
      email: user.email,
      role: user.role,
      status: user.status,
      isFirstLogin: user.isFirstLogin,
      updatedAt: user.updatedAt,
    };
  }

  static fromMongooseDocument(doc: IuserModel): User {
    return new User(
      doc._id.toString(),
      doc.userName,
      doc.email,
      doc.password,
      doc.linkedInUrl || "",
      doc.profileImg || "",
      doc.aadharImg || "",
      doc.selfieImg || "",
      doc.phoneNumber || "",
      doc.address || "",
      doc.dateOfBirth || new Date(0),
      doc.role || UserRole.USER,
      doc.status || UserStatus.ACTIVE,
      doc.interestedTopics || [],
      doc.adminVerified || false,
      doc.isFirstLogin || true,
      doc.website || "",
      doc.bio || ""
      // doc.verifiedAt || new Date(0),
      // doc.createdAt || new Date(),
      // doc.updatedAt || new Date()
    );
  }

  static toMongooseDocument(user: User) {
    return {
      _id: new mongoose.Types.ObjectId(user.id),
      userName: user.userName,
      email: user.email,
      password: user.password,
      linkedInUrl: user.linkedInUrl,
      profileImg: user.profileImg,
      website: user.website,
      bio: user.bio,
      interestedTopics: user.interestedTopics,
      role: user.role,
      status: user.status,
      adminVerified: user.adminVerified,
      dateOfBirth: user.dateOfBirth,
      phoneNumber: user.phoneNumber,
      address: user.address,
      aadharImg: user.aadharImg,
      selfieImg: user.selfieImg,
      isFirstLogin: user.isFirstLogin,
      verifiedAt: user.verifiedAt,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }
}
