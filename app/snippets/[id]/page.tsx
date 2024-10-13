import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { db } from "@/db";
import Link from "next/link";
import { notFound } from "next/navigation";

interface IPageProps {
  params: {
    id: string;
  };
}

const SnippetDetails = async ({ params }: IPageProps) => {
  /* await new Promise((arg) => {
    return setTimeout(arg, 3000);
  }); */

  const snippet = await db.snippet.findUnique({
    where: { id: Number(params.id) },
  });

  if (!snippet) return notFound();
  const { title, code } = snippet;

  return (
    <div className="w-full">
      <div className="max-w-[760px] mx-auto mb-8 flex items-center gap-4 justify-between">
        <Link href="/">
          <Button variant="default">Back to snippets</Button>
        </Link>
        <div className="flex gap-4 items-center">
          <Button asChild variant="outline">
            <Link href={`/snippets/${params.id}/edit`}>Edit</Link>
          </Button>
          <Button variant="destructive">Delete</Button>
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
