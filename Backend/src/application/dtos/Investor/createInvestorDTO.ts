import { Investor } from "domain/entities/investor/investorEntity";

export interface CreateInvestorDTO
  extends Omit<
    Investor,
    | "_id"
    | "createdAt"
    | "updatedAt"
    | "verifiedAt"
    | "adminVerified"
    | "dateOfBirth"
    | "phoneNumber"
    | "address"
    | "aadharImg"
    | "selfieImg"
  > {}

export interface CreateInvestorResponseDTO
  extends Omit<
    Investor,
    | "password"
    | "interestedTopics"
    | "portfolioPdf"
    | "investmentMin"
    | "investmentMax"
    | "verifiedAt"
    | "adminVerified"
    | "dateOfBirth"
    | "phoneNumber"
    | "address"
    | "aadharImg"
    | "selfieImg"
    | "cretedAt"
  > {}
