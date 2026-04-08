import { z } from "zod";
export const signUpSchema = z
  .object({
    email: z.email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
    confirmPassword: z
      .string()
      .min(6, "Confirm password must be at least 6 characters long"),
    fullName: z.string().min(3, "Full name must be at least 3 characters long"),
    universityId: z.coerce
      .number()
      .positive("University ID must be a positive number"),
    universityCard: z
      .string()
      .nonempty("University card is required")
      .min(1, "University card is required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const signInSchema = z.object({
  email: z.email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});
