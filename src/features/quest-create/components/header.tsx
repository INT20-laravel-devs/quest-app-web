import { Badge } from "@/components/ui/badge";
import { FC } from "react"

const Header: FC = () => {
    return (
        <div className="mb-12 flex flex-col items-center gap-6 text-center">
          <Badge variant="outline" className="animate-fade-in">
            Start your adventure
          </Badge>
          <h1 className="text-4xl font-semibold lg:text-5xl bg-gradient-to-r from-[#7c3aed] via-purple-400 to-[#7c3aed] bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient">
            Create New Quest
          </h1>
          <p className="text-muted-foreground max-w-xl">
            Begin your journey by creating an exciting quest. Fill in the
            details below to get started.
          </p>
        </div>
    );
}

export default Header;