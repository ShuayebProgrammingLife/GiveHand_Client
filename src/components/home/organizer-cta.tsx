import Link from "next/link";
import { cn } from "@/lib/utils";
import { darkOutlineBtn, primaryHeroBtn } from "@/lib/ui";
import { buttonVariants } from "@/components/ui/button";

export function OrganizerCta() {
  return (
    <section className="w-full bg-background pb-16 lg:pb-24">
      <div className="mx-auto max-w-[1280px] px-6 lg:px-12">
        <div className="flex flex-col justify-between gap-8 rounded-lg border border-border bg-card p-8 text-card-foreground lg:flex-row lg:items-center lg:p-14">
          <div className="flex max-w-2xl flex-col gap-4">
            <h2 className="font-display text-[28px] font-bold leading-8 tracking-[-0.02em] sm:text-4xl sm:leading-10 sm:tracking-[-0.03em]">
              Are you organizing a clothing drive or soup kitchen in your
              neighborhood?
            </h2>
            <p className="leading-6 text-muted-foreground">
              GiveHand gives you a page for your event, one-click sign-ups and a
              list of everyone who joined, so you can focus on the work on the
              ground.
            </p>
          </div>
          <div className="flex shrink-0 flex-col gap-4 sm:flex-row sm:items-center">
            <Link
              href="/create-event"
              className={cn(buttonVariants(), primaryHeroBtn)}
            >
              Create your event
            </Link>
            <Link
              href="/events"
              className={cn(
                buttonVariants({ variant: "outline" }),
                darkOutlineBtn,
              )}
            >
              Browse events
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
