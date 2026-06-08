import { z } from "zod";

export const PublicationCreateSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  slug: z.string().min(3, "Slug must be at least 3 characters").regex(/^[a-z0-9-]+$/, "Slug must contain only lowercase letters, numbers, and hyphens"),
  type: z.enum(["NOTES", "RESEARCH_PAPER", "LEGAL_ARTICLE", "MOOT_COURT", "REPORT", "NOTICE"], { required_error: "Type is required" }),
  summary: z.string().min(10, "Summary must be at least 10 characters"),
  content: z.string().min(20, "Content must be at least 20 characters"),
  author: z.string().min(2, "Author name is required"),
  publishedDate: z.coerce.date({ required_error: "Published date is required" }),
  // Takes a comma-separated string from the form and converts to string[]
  tags: z.string().transform(str => str.split(",").map(s => s.trim()).filter(s => s.length > 0)),
  status: z.enum(["DRAFT", "PUBLISHED", "ARCHIVED"], { required_error: "Status is required" }),
});
