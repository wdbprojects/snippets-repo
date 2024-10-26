"use client";

import { startTransition, useActionState, useEffect, useRef } from "react";
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
import { toast } from "sonner";

const CreateSnippet = () => {
  const [formState, formAction] = useActionState(createSnippetAction, {
    message: "",
    issues: [],
  });

  const form = useForm<z.infer<typeof createSnippetSchema>>({
    resolver: zodResolver(createSnippetSchema),
    defaultValues: {
      title: "",
      code: "",
    },
  });
  const { handleSubmit, control, reset } = form;

  // const onSubmit = async (values: z.infer<typeof createSnippetSchema>) => {
  //   const formData = new FormData();
  //   formData.append("title", values.title);
  //   formData.append("code", values.code);
  //   await createSnippetAction(formData);
  // };

  // const handleCreateAction = async (formData: FormData) => {
  //   const newSnippet = await formAction(formData);
  //   console.log(newSnippet);
  // };

  useEffect(() => {
    if (formState.issues) {
      formState.issues.forEach((issue) => {
        toast.error(issue);
      });
    }
    if (formState.message) {
      toast.error(formState.message);
    }
  }, [formState]);

  const formRef = useRef<HTMLFormElement>(null);

  return (
    <Form {...form}>
      <form
        ref={formRef}
        action={formAction}
        className="min-w-[400px] mt-8 border p-4 rounded-sm shadow-sm"
        onSubmit={(event) => {
          event.preventDefault();
          handleSubmit(() => {
            startTransition(() => {
              formAction(new FormData(formRef.current!));
            });
          })(event);
        }}
      >
        <FormField
          control={control}
          name="title"
          render={({ field }) => {
            return (
              <FormItem className="mb-4">
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
              <FormItem className="mb-8">
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
