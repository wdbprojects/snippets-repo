"use server";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { db } from "@/db";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";

export default async function Home() {
  const snippets = await db.snippet.findMany();

  return (
    <div className="w-full">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl text-center font-semibold">
          Welcome to abundance
        </h2>
        <div className="mt-4 flex justify-center">
          <Button asChild>
            <Link href="/snippets/new">Create new snippet</Link>
          </Button>
        </div>
      </div>

      <div className="responsive-grid mt-8">
        {snippets.map((snippet) => {
          const { id, title } = snippet;
          return (
            <Card className="max-w-[500px] pb-4 px-4" key={id}>
              <CardHeader className="mb-0">
                <CardTitle>{title}</CardTitle>
              </CardHeader>
              <Link href={`/snippets/${id}`}>
                <Button variant="outline" className="block w-full">
                  Go to snippet
                </Button>
              </Link>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
