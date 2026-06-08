import { z } from "zod";

export const PublicationCreateSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  slug: z.string().min(3, "Slug must be at least 3 characters").regex(/^[a-z0-9-]+$/, "Slug must contain only lowercase letters, numbers, and hyphens"),
  category: z.enum(["NOTES", "RESEARCH_PAPER", "LEGAL_ARTICLE", "MOOT_COURT"], { required_error: "Category is required" }),
  abstract: z.string().min(20, "Abstract must be at least 20 characters"),
  authorName: z.string().min(2, "Author name is required"),
  status: z.enum(["DRAFT", "PUBLISHED"], { required_error: "Status is required" }),
  isPublic: z.boolean().default(true),
});
