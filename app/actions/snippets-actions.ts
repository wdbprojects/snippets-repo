"use server";

import { z } from "zod";
import { db } from "@/db";
import { redirect } from "next/navigation";
import { createSnippetSchemaServer } from "@/zod/snippets-schemas";
import { revalidatePath } from "next/cache";

type SnippetSchemaType = z.infer<typeof createSnippetSchemaServer>;

/* CREATE SNIPPET ACTION */
export const createSnippetAction = async (
  formState: {
    message: string;
    snippet?: SnippetSchemaType;
    issues?: string[];
  },
  formData: FormData,
) => {
  const prevData = Object.fromEntries(formData);
  const parsed = await createSnippetSchemaServer.safeParse(prevData);

  if (parsed.success) {
    try {
      const snippet = await db.snippet.create({
        data: parsed.data,
      });
      console.log("Snippet created successfully by SAFD");
      console.log(snippet);
    } catch (err: unknown) {
      if (err instanceof Error) {
        return { message: err.message };
      } else {
        return { message: "Something went wrong, try again later." };
      }
    }
  } else {
    return {
      message: "Invalid data",
      issues: parsed.error.issues.map((issue) => {
        return issue.message;
      }),
    };
  }
  revalidatePath("/");
  redirect("/");

  // const snippet = await db.snippet.create({
  //   data: prevData as z.infer<typeof createSnippetSchema>,
  // });
  // console.log(snippet);
  // redirect("/");
};

/* UPDATE SNIPPET ACTION */
export const updateSnippetAction = async (id: number, formData: FormData) => {
  const prevData = Object.fromEntries(formData);
  const snippet = await db.snippet.update({
    where: { id: id },
    data: prevData as z.infer<typeof createSnippetSchemaServer>,
  });
  console.log(snippet);
  redirect(`/snippets/${id}`);
};

/* DELETE SNIPPET ACTION */
export const deleteSnippetAction = async (id: number) => {
  const deletedSnippet = await db.snippet.delete({
    where: { id: id },
  });
  console.log(deletedSnippet);
  revalidatePath("/");
  redirect("/");
};
