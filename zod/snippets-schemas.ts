import { z } from "zod";

export const createSnippetSchema = z.object({
  title: z.string(),
  code: z.string().min(1, { message: "Code is required" }),
});

export const createSnippetSchemaServer = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  code: z.string().min(1, { message: "Code is required" }),
});
