import EditSnippetForm from "@/components/forms/edit-snippet-form";
import { Button } from "@/components/ui/button";
import { db } from "@/db";
import Link from "next/link";
import { notFound } from "next/navigation";

interface SnippetEditPageProps {
  params: {
    id: string;
  };
}

export default async function SnippetEditPage({
  params,
}: SnippetEditPageProps) {
  const { id } = await params;
  /* await new Promise((arg) => {
    return setTimeout(arg, 3000);
  }); */

  const snippet = await db.snippet.findFirst({
    where: { id: parseInt(id) },
  });

  if (!snippet) return notFound();
  const { title } = snippet;

  return (
    <div className="w-full">
      <div className="max-w-[760px] mx-auto mb-8 text-2xl font-semibold text-muted-foreground">
        <h2 className="text-center">Editing snippet: {title}</h2>
      </div>
      <div className="max-w-[550px] mx-auto mb-8 flex items-center gap-4 justify-between">
        <Link href="/">
          <Button variant="default">Back to snippets</Button>
        </Link>
        <div className="flex gap-4 items-center">
          <Link href={`/snippets/${id}`}>
            <Button variant="outline">Back to current snippet</Button>
          </Link>
        </div>
      </div>
      <EditSnippetForm snippet={snippet} id={parseInt(id)} />
    </div>
  );
}
