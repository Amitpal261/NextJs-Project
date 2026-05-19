import {z} from "zod";

export const loginSchema = z.object({  
    email: z.string().email({ message: "Please provide a valid email address" }).regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, { message: "email must be like example@example.com" }) ,
    password: z.string().min(6, { message: "Password must be at least 6 characters long" }).max(100, { message: "Password must be less than 100 characters long" }).regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d!@#$%^&*()_+={}\[\]:;"'<>,.?\/\\|`~\-]{6,}$/, { message: "Password must contain at least one letter and one number" })   
});