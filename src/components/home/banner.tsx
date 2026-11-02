import Link from "next/link";
import { CalendarPlus, HandHeart, Snowflake } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";

export function Banner() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-blue-950 via-blue-900 to-blue-700 text-white">
      {/* Decorative snowflakes */}
      <Snowflake className="absolute left-[6%] top-10 h-10 w-10 text-white/10" />
      <Snowflake className="absolute right-[10%] top-16 h-16 w-16 text-white/10" />
      <Snowflake className="absolute bottom-12 left-[28%] h-8 w-8 text-white/10" />
      <Snowflake className="absolute bottom-20 right-[24%] h-12 w-12 text-white/10" />
      <div className="absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-orange-500/20 blur-3xl" />

      <div className="relative mx-auto flex max-w-7xl flex-col items-center px-4 pb-28 pt-20 text-center sm:pt-28">
        <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-sm font-medium backdrop-blur">
          <HandHeart className="h-4 w-4 text-orange-300" />
          Winter is here. Someone needs your warmth.
        </span>

        <h1 className="max-w-3xl text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
          Give a hand, <span className="text-orange-400">warm a heart</span>{" "}
          this winter
        </h1>

        <p className="mt-5 max-w-2xl text-base leading-7 text-blue-100 sm:text-lg">
          Join or organize winter clothes drives, blanket distributions and
          community events, and bring comfort to families who need it most
          across your city.
        </p>

        <div className="mt-8 flex w-full flex-col justify-center gap-3 sm:w-auto sm:flex-row">
          <Link
            href="/events"
            className={`${buttonVariants({ size: "lg" })} bg-accent text-accent-foreground hover:bg-accent/90`}
          >
            Upcoming Events
          </Link>
          <Link
            href="/create-event"
            className={`${buttonVariants({ size: "lg", variant: "outline" })} border-white/40 bg-transparent text-white hover:bg-white/10 hover:text-white`}
          >
            <CalendarPlus className="mr-2 h-4 w-4" />
            Create Event
          </Link>
        </div>
      </div>
    </section>
  );
}
