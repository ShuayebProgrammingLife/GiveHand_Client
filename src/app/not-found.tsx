import Link from "next/link";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-xl flex-col items-center justify-center px-4 py-20 text-center">
      <p className="font-display text-8xl font-extrabold text-primary">404</p>
      <h1 className="font-display mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
        Page not found
      </h1>
      <p className="mt-2 text-muted-foreground">
        The page you are looking for does not exist or has been moved.
      </p>
      <div className="mt-6 flex flex-wrap justify-center gap-3">
        <Link href="/" className={cn(buttonVariants(), "font-semibold shadow-xs")}>
          Go home
        </Link>
        <Link
          href="/events"
          className={cn(
            buttonVariants({ variant: "outline" }),
            "font-semibold shadow-none",
          )}
        >
          Browse events
        </Link>
      </div>
    </div>
  );
}
