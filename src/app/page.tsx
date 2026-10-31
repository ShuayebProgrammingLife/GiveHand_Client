import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/navbar";

export default function Home() {
  return (
    <div className="flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center gap-4">
      <h1 className="text-3xl font-bold">GiveHand</h1>
      <p className="text-muted-foreground">Give a hand, warm a heart.</p>
    </div>
  );
}