import { useMutation } from "@tanstack/react-query";

interface signup {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export const useUserSignupMutation = () => {
  return useMutation({
    mutationFn: (values: signup) => userSignup(values),
  });
};
