import CreateSnippet from "@/components/forms/create-snippet";

const NewSnippet = () => {
  return (
    <div>
      <h2 className="text-2xl font-semibold text-foreground">
        Create new snippet
      </h2>
      <CreateSnippet />
    </div>
  );
};

export default NewSnippet;
