"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "../ui/textarea";
import { z } from "zod";
import { createSnippetSchema } from "@/zod/snippets-schemas";
import { createSnippetAction } from "@/app/actions/snippets-actions";

const CreateSnippet = () => {
  const form = useForm<z.infer<typeof createSnippetSchema>>({
    resolver: zodResolver(createSnippetSchema),
    defaultValues: {
      title: "",
      code: "",
    },
  });
  const { handleSubmit, control, reset } = form;

  const onSubmit = async (values: z.infer<typeof createSnippetSchema>) => {
    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("code", values.code);
    await createSnippetAction(formData);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        //action={createSnippetAction}
        className="space-y-8 min-w-[400px] mt-8 border p-4 rounded-sm shadow-sm"
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
        <FormField
          control={control}
          name="code"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>Code Snippet</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Write your code snippet here"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />
        <div className="mt-4 flex justify-between align-center w-full gap-4">
          <Button
            variant="secondary"
            type="reset"
            className="flex-1"
            onClick={() => {
              reset();
            }}
          >
            Reset form
          </Button>
          <Button variant="default" type="submit" className="flex-1">
            Submit form
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default CreateSnippet;
