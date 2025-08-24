import { z } from "zod";
import { UserRole } from "domain/enums/userRole";
import { UserStatus } from "domain/enums/userStatus";

export const registerUserSchema = z.object({
  userName: z.string().min(3, "Username must be at least 3 characters"),
  password: z.string().min(6).max(20),
  email: z.string().email("Invalid email"),
  linkedInUrl: z.string().url("Invalid LinkedIn URL"),
  profileImg: z.string().url("Profile image must be a valid URL"),
  website: z.string().url("Website must be a valid URL").optional(),
  bio: z.string().max(200).optional(),
  interestedTopics: z.array(z.string()).nonempty("At least one topic required"),
  role: z.enum(UserRole),
  status: z.enum(UserStatus),
  otp: z.string(),
});

export type RegisterUserDTO = z.infer<typeof registerUserSchema>;
