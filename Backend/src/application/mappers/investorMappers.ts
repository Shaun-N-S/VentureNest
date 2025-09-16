import {
  CreateInvestorDTO,
  CreateInvestorResponseDTO,
} from "application/dtos/Investor/createInvestorDTO";
import { Investor } from "domain/entities/investor/investorEntity";
import { UserRole } from "domain/enums/userRole";
import { UserStatus } from "domain/enums/userStatus";
import mongoose from "mongoose";

export class InvestorMapper {
  static toEntity(dto: CreateInvestorDTO): Investor {
    return new Investor(
      new mongoose.Types.ObjectId().toString(),
      dto.userName,
      dto.email,
      dto.password
    );
  }

  static toCreateInvestorResponseDTO(investor: Investor): CreateInvestorResponseDTO {
    return {
      id: investor.id,
      userName: investor.userName,
      email: investor.email,
      role: investor.role,
      status: investor.status,
      isFirstLogin: investor.isFirstLogin,
      updatedAt: investor.updatedAt,
    };
  }

  static fromMongooseDocument(doc: any): Investor {
    return new Investor(
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
      doc.role || UserRole.INVESTOR,
      doc.status || UserStatus.ACTIVE,
      doc.interestedTopics || [],
      doc.adminVerified || false,
      doc.isFirstLogin !== undefined ? doc.isFirstLogin : true,
      doc.website || "",
      doc.bio || "",
      doc.verifiedAt || new Date(),
      doc.createdAt || new Date(),
      doc.updatedAt || new Date(),
      doc.location || "",
      doc.companyName || "",
      doc.experience || 0,
      doc.preferredSector || [],
      doc.preferredStartupStage || [],
      doc.investmentMin || 0,
      doc.investmentMax || 0,
      doc.portfolioPdf || ""
    );
  }

  static toMongooseDocument(investor: Investor): any {
    return {
      _id: new mongoose.Types.ObjectId(investor.id),
      userName: investor.userName,
      email: investor.email,
      password: investor.password,
      linkedInUrl: investor.linkedInUrl,
      profileImg: investor.profileImg,
      website: investor.website,
      bio: investor.bio,
      interestedTopics: investor.interestedTopics,
      role: investor.role,
      status: investor.status,
      adminVerified: investor.adminVerified,
      dateOfBirth: investor.dateOfBirth,
      phoneNumber: investor.phoneNumber,
      address: investor.address,
      aadharImg: investor.aadharImg,
      selfieImg: investor.selfieImg,
      isFirstLogin: investor.isFirstLogin,
      verifiedAt: investor.verifiedAt,
      createdAt: investor.createdAt,
      updatedAt: investor.updatedAt,
      location: investor.location,
      companyName: investor.companyName,
      experience: investor.experience,
      preferredSector: investor.preferredSector,
      preferredStartupStage: investor.preferredStartupStage,
      investmentMin: investor.investmentMin,
      investmentMax: investor.investmentMax,
      portfolioPdf: investor.portfolioPdf,
    };
  }
}
