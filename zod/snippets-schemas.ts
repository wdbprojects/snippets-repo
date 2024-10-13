import { z } from "zod";

export const createSnippetSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  code: z.string().min(1, { message: "Title is required" }),
});
