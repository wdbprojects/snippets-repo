import { deleteSnippetAction } from "@/app/actions/snippets-actions";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { db } from "@/db";
import Link from "next/link";
import { notFound } from "next/navigation";

interface SnippetShowPageProps {
  params: {
    id: string;
  };
}

const SnippetDetails = async ({ params }: SnippetShowPageProps) => {
  /* await new Promise((arg) => {
    return setTimeout(arg, 3000);
  }); */

  const { id } = await params;

  const snippet = await db.snippet.findUnique({
    where: { id: parseInt(id) },
  });

  if (!snippet) return notFound();
  const { title, code } = snippet;

  const handleDeleteSnippet = async () => {
    "use server";
    await deleteSnippetAction(Number(id));
  };

  return (
    <div className="w-full">
      <div className="max-w-[760px] mx-auto mb-8 flex items-center gap-4 justify-between">
        <Link href="/">
          <Button variant="default">Back to snippets</Button>
        </Link>
        <div className="flex gap-4 items-center">
          <Button asChild variant="outline">
            <Link href={`/snippets/${id}/edit`}>Edit</Link>
          </Button>
          <form action={handleDeleteSnippet}>
            <Button variant="destructive" type="submit">
              Delete
            </Button>
          </form>
        </div>
      </div>

      <Card className="max-w-[760px] mx-auto">
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="p-3 border rounded bg-muted">
            <code>{code}</code>
          </p>
        </CardContent>
      </Card>
    </div>
  );
};
export default SnippetDetails;

/* ONLY FOR PRODUCTION: GENERATE CACHING */
export async function generateStaticParams() {
  const snippets = await db.snippet.findMany();
  return snippets.map((item) => {
    return { id: item.id.toString() };
  });
}
