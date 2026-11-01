import {z} from "zod";

export const passwordSchema = z
  .string()
  .min(6, "Password must be at least 6 characters")
  .regex(/[A-Z]/, "Password must contain an uppercase letter")
  .regex(/[a-z]/, "Password must contain a lowercase letter");

export const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(1, "Password is required"),
});

export const registerSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  photoURL: z.string().url("Please enter a valid photo URl"),
  password: passwordSchema,
});




export const eventSchema = z.object({
  title: z.string().trim().min(5, "Title must be at least 5 characters"),
  eventType: z
    .string()
    .trim()
    .min(3, "Event type must be at least 3 characters")
    .max(30, "Event type must be 30 characters or less"),
  eventDate: z
    .string()
    .min(1, "Please select the event date and time")
    .refine(
      (value) => new Date(value).getTime() > Date.now(),
      "Event date must be in the future"
    ),
  location: z.string().trim().min(3, "Please enter the event location"),
  thumbnail: z.string().url("Please enter a valid thumbnail image URL"),
  description: z
    .string()
    .trim()
    .min(20, "Description must be at least 20 characters"),
});

export type EventFormData = z.infer<typeof eventSchema>;