"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { createSnippetSchema } from "@/zod/snippets-schemas";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { type Snippet } from "@prisma/client";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Editor from "@monaco-editor/react";
import { updateSnippetAction } from "@/app/actions/snippets-actions";
import Link from "next/link";

interface EditPropSnippet {
  snippet: Snippet;
  id: number;
}

const EditSnippetForm = ({ snippet, id }: EditPropSnippet) => {
  const [codeState, setCodeState] = useState(snippet.code);

  const form = useForm<z.infer<typeof createSnippetSchema>>({
    resolver: zodResolver(createSnippetSchema),
    defaultValues: {
      title: "",
      code: "",
    },
  });
  const { /* handleSubmit, */ control, setValue } = form;
  const { title, code } = snippet;

  // const onSubmit = async (values: z.infer<typeof createSnippetSchema>) => {
  //   const formData = new FormData();
  //   formData.append("title", values.title);
  //   formData.append("code", codeState);
  //   await updateSnippetAction(id, formData);
  //   console.log(formData);
  // };

  const handleEditorChange = (value: string = "") => {
    setCodeState(value);
  };

  useEffect(() => {
    setValue("title", title);
    setValue("code", code);
  }, []);

  //const handleFormSubmit = updateSnippetAction2.bind(null, id, codeState);

  const handleFormSubmit = async (formData: FormData) => {
    formData.append("code", codeState);
    await updateSnippetAction(id, formData);
  };

  return (
    <Form {...form}>
      <form
        //onSubmit={handleSubmit(onSubmit)}
        action={handleFormSubmit}
        className="space-y-8 min-w-[400px] max-w-[550px] mt-8 border p-4 rounded-sm shadow-sm mx-auto"
      >
        <FormField
          control={control}
          name="title"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="Snippet title" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />

        <Editor
          height="300px"
          defaultLanguage="javascript"
          theme="vs-light"
          defaultValue={codeState}
          options={{ minimap: { enabled: false } }}
          onChange={handleEditorChange}
        />

        <div className="mt-4 flex justify-between align-center w-full gap-4">
          <Button variant="secondary" asChild className="flex-1">
            <Link href={`/snippets/${id}`}>Cancel</Link>
          </Button>
          <Button variant="default" type="submit" className="flex-1">
            Save changes
          </Button>
        </div>
      </form>
    </Form>
  );
};
export default EditSnippetForm;

{
  /* <FormField
  control={control}
  name="code"
  render={({ field }) => {
    return (
      <FormItem>
        <FormLabel>Code Snippet</FormLabel>
        <FormControl>
          <Textarea placeholder="Write your code snippet here" {...field} />
        </FormControl>
        <FormMessage />
      </FormItem>
    );
  }}
/>; */
}
