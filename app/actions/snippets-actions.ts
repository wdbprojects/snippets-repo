"use server";

import { createSnippetSchema } from "@/zod/snippets-schemas";
import { z } from "zod";
import { db } from "@/db";
import { redirect } from "next/navigation";

export const createSnippetAction = async (formData: FormData) => {
  const prevData = Object.fromEntries(formData);
  const snippet = await db.snippet.create({
    data: prevData as z.infer<typeof createSnippetSchema>,
  });
  console.log(snippet);
  redirect("/");
};

export const updateSnippetAction = async (id: number, formData: FormData) => {
  const prevData = Object.fromEntries(formData);
  const snippet = await db.snippet.update({
    where: { id: id },
    data: prevData as z.infer<typeof createSnippetSchema>,
  });
  console.log(snippet);
  redirect(`/snippets/${id}`);
};
