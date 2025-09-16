import AxiosInstance from "@/axios/axios";
import { LoginPayload, SignupPayload } from "./ApiServiceUser";

export const signupInvestor = async (data: SignupPayload) => {
  const response = await AxiosInstance.post("/auth/investors/signup", data);
  return response.data;
};

export const loginInvestor = async (data: LoginPayload) => {
  const response = await AxiosInstance.post("/auth/investors/login", data);
  return response.data;
};

export const investorVerifyOtp = async ({
  otp,
  values,
}: {
  otp: string;
  values: SignupPayload;
}) => {
  const response = await AxiosInstance.post("/auth/investors/verify-otp", {
    otp,
    ...values,
    userName: values.fullName,
  });
  return response.data;
};
