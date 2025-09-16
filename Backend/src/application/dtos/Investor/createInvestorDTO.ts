export interface CreateInvestorDTO {
  userName: string;
  email: string;
  password: string;
}

export interface CreateInvestorResponseDTO {
  id: string;
  userName: string;
  email: string;
  role: string;
  status: string;
  isFirstLogin: boolean;
  updatedAt: Date;
}
