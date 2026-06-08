import { z } from "zod";

export const EventRegistrationSchema = z.object({
  eventId: z.string().min(1, "Event ID is required"),
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Valid email is required"),
  phone: z.string().min(10, "Valid phone number is required"),
  college: z.string().min(2, "College/University name is required"),
});

export const EventCreateSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  slug: z.string().min(3, "Slug must be at least 3 characters").regex(/^[a-z0-9-]+$/, "Slug must contain only lowercase letters, numbers, and hyphens"),
  category: z.string().min(1, "Category is required"),
  shortDescription: z.string().min(10, "Short description must be at least 10 characters"),
  description: z.string().min(20, "Full description must be at least 20 characters"),
  startDate: z.coerce.date({ message: "Start date is required" }),
  endDate: z.coerce.date().optional().nullable(),
  location: z.string().min(3, "Location is required"),
  status: z.enum(["DRAFT", "PUBLISHED", "COMPLETED", "CANCELLED"], { message: "Status is required" }),
  registrationRequired: z.boolean().default(false),
  registrationDeadline: z.coerce.date().optional().nullable(),
  maxParticipants: z.coerce.number().positive("Must be positive").optional().nullable(),
}).refine((data) => {
  if (data.endDate && data.startDate) {
    return data.endDate > data.startDate;
  }
  return true;
}, {
  message: "End date must be strictly after the start date.",
  path: ["endDate"],
}).refine((data) => {
  if (data.registrationDeadline && data.startDate) {
    return data.registrationDeadline < data.startDate;
  }
  return true;
}, {
  message: "Registration deadline must be before the event starts.",
  path: ["registrationDeadline"],
}).refine((data) => {
  if (data.registrationDeadline && data.endDate) {
    return data.registrationDeadline < data.endDate;
  }
  return true;
}, {
  message: "Registration deadline must be before the event ends.",
  path: ["registrationDeadline"],
});
