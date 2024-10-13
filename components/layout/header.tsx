import Link from "next/link";
import { Input } from "@/components/ui/input";
import DarkMode from "@/components/shared/dark-mode";
import { Search } from "lucide-react";

const Header = () => {
  return (
    <header className="mx-auto bg-muted/40 border-b">
      <div className="flex h-14 max-w-6xl items-center gap-4  px-4 mx-auto h-[60px]">
        <div className="flex items-center flex-1">
          {/* LOGO */}
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <span className="">Snippet Center</span>
          </Link>
        </div>
        <div className="w-full flex-1 flex justify-center">
          <form className="w-full">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search snippet..."
                className="w-full appearance-none bg-background pl-8 shadow-none"
              />
            </div>
          </form>
        </div>
        <div className="flex items-center justify-end gap-4  flex-1">
          <DarkMode />
        </div>
      </div>
    </header>
  );
};

export default Header;
