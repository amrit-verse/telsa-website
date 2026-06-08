import { z } from "zod";

export const MembershipApplicationSchema = z.object({
  // Personal Info
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Valid email is required"),
  phone: z.string().min(10, "Valid phone number is required"),
  
  // Academic Info
  college: z.string().min(2, "College name is required"),
  course: z.string().min(2, "Course name is required"),
  academicLevel: z.string().min(2, "Academic level is required"),
  
  // Eligibility
  district: z.string().min(2, "District is required"),
  category: z.string().min(2, "Category is required (Select 'General' if not applicable)"),
  
  // Membership Details
  type: z.enum(["ORDINARY", "LIFETIME"], { required_error: "Membership type is required" }),
  
  // We don't validate the File objects heavily in this text schema
  // because FormData parsing is handled directly in the Server Action,
  // but we ensure the client requires them.
});

export const MembershipStatusUpdateSchema = z.object({
  membershipId: z.string(),
  status: z.enum(["PENDING", "ACTIVE", "REJECTED", "EXPIRED"]),
});
