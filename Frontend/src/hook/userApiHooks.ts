import {
  LoginPayload,
  loginUser,
  resendOtp,
  SignupPayload,
  signupUser,
  verifyOtp,
} from "@/services/ApiServiceUser";
import { useMutation } from "@tanstack/react-query";

export const useSignup = () => {
  return useMutation({
    mutationFn: (data: SignupPayload) => signupUser(data),
  });
};

export const useVerifyOtp = () => {
  return useMutation({
    mutationFn: ({ otp, values }: { otp: string; values: SignupPayload }) =>
      verifyOtp({ otp, values }),
  });
};

export const useResendOpt = () => {
  return useMutation({
    mutationFn: (otp: string) => resendOtp(otp),
  });
};

export const useLogin = () => {
  return useMutation({
    mutationFn: (data: LoginPayload) => loginUser(data),
  });
};
