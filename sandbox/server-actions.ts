/* 1ST APPROACH - ZOD SCHEMA */

"use server";

import { createSnippetSchema } from "@/zod/snippets-schemas";
import { z } from "zod";
import { db } from "@/db";
import { redirect } from "next/navigation";

export const createSnippetAction = async (formData: FormData) => {
  // const title = formData.get("title") as string;
  // const code = formData.get("code") as string;
  const prevData = Object.fromEntries(formData);
  const snippet = await db.snippet.create({
    data: prevData as z.infer<typeof createSnippetSchema>,
  });
  console.log(snippet);

  redirect("/");
};

// create-snippet-action.ts
const onSubmit = async (values: z.infer<typeof createSnippetSchema>) => {
  await createSnippetAction(values);
};
