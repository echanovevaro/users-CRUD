import { z } from "zod"
export const LoginSchema = z.object({
  email: z
    .string()
    .min(1, "Please enter your email")
    .email("Invalid email address"),
  password: z
    .string()
    .min(6, "Please enter a password of 6 characters at least")
    .max(100),
})
export const SignupSchema = LoginSchema.extend({
  password2: z
    .string()
    .min(6, "Please enter a password of 6 characters at least")
    .max(100),
}).refine((data) => data.password === data.password2, {
  message: "Passwords don't match",
  path: ["password2"],
})
