import React from "react";
import { Loader2 } from "lucide-react";

const SnippetLoadingPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="2xl text-blue-800 flex items-center justify-center translate-y-[-60px]">
        <Loader2 className="mr-2 h-8 w-8 animate-spin" />
        Loading...
      </h1>
    </div>
  );
};

export default SnippetLoadingPage;
