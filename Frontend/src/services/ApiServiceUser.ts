// services/authService.ts
import AxiosInstance from "@/axios/axios";

export type SignupPayload = {
  fullName: string;
  email: string;
  password: string;
};

export type OtpPayload = {
  email: string;
  otp: string;
};

export type LoginPayload = {
  email: string;
  password: string;
};

export const signupUser = async (data: SignupPayload) => {
  const response = await AxiosInstance.post("/auth/users", data);
  return response.data;
};

export const verifyOtp = async ({
  otp,
  values,
}: {
  otp: string;
  values: SignupPayload;
}) => {
  const response = await AxiosInstance.post("/auth/users/verify-otp", {
    otp,
    ...values,
    userName: values.fullName,
  });
  return response.data;
};

export const resendOtp = async (email: string) => {
  const response = await AxiosInstance.post("/auth/users/resend-otp", {
    email,
  });
  return response.data;
};

export const loginUser = async (data: LoginPayload) => {
  const response = await AxiosInstance.post("/auth/users/login", data);
  return response.data;
};
