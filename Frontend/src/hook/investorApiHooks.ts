import { investorVerifyOtp, loginInvestor, signupInvestor } from "@/services/ApiServiceInvestor";
import { LoginPayload, SignupPayload } from "@/services/ApiServiceUser";
import { useMutation } from "@tanstack/react-query";

export const useInvestorSignup = () => {
  return useMutation({
    mutationFn: (data: SignupPayload) => signupInvestor(data),
  });
};

export const useInvestorLogin = () => {
  return useMutation({
    mutationFn: (data: LoginPayload) => loginInvestor(data),
  });
};


export const useInvestorVerifyOtp = () => {
    return useMutation({
        mutationFn:({otp,values}:{otp:string,values:SignupPayload})=>
            investorVerifyOtp({otp,values})
    })
}