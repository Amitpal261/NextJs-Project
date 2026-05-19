import {z} from "zod";

export const signUpSchema = z.object({
  username: z.string({ message: "Username must be between 3 and 20 characters" }).min(3, { message: "Username must be at least 3 characters long" }).max(20, { message: "Username must be less than 20 characters long" }).regex(/^[a-zA-Z0-9_]+$/, { message: "Username can only contain letters, numbers, and underscores" }),
  email: z.string().email({ message: "invalid email address (e.g., example@example.com)" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters long " }).max(100, { message: "Password must be less than 100 characters long" }).regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d!@#$%^&*()_+={}\[\]:;"'<>,.?\/\\|`~\-]{6,}$/, { message: "Password must contain at least one letter and one number" })
});