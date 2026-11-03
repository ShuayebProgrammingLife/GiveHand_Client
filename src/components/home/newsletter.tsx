"use client";

import { toast } from "sonner";
import { z } from "zod";
import { cn } from "@/lib/utils";
import { primaryHeroBtn } from "@/lib/ui";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const emailSchema = z.string().email("Please enter a valid email address");

export function Newsletter() {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const email = String(new FormData(form).get("email") ?? "").trim();

    const parsed = emailSchema.safeParse(email);
    if (!parsed.success) {
      toast.error(parsed.error.issues[0].message);
      return;
    }
    toast.success("You are subscribed. Watch your inbox for the next drive.");
    form.reset();
  };

  return (
    <section className="w-full border-t bg-muted py-16">
      <div className="mx-auto grid max-w-[1280px] items-center gap-8 px-6 lg:grid-cols-2 lg:px-12">
        <div className="flex max-w-xl flex-col gap-2">
          <h2 className="font-display text-[28px] font-bold leading-8 tracking-[-0.02em] sm:text-4xl sm:leading-10 sm:tracking-[-0.03em]">
            Hear about the next drive first
          </h2>
          <p className="leading-6 text-muted-foreground">
            One short email when a new event goes live. Nothing else.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          noValidate
          className="flex flex-col gap-3 sm:flex-row"
        >
          <Input
            name="email"
            type="email"
            placeholder="Your email address"
            aria-label="Email address"
            className="h-11 bg-card text-base"
          />
          <Button type="submit" className={cn(primaryHeroBtn, "shrink-0")}>
            Subscribe
          </Button>
        </form>
      </div>
    </section>
  );
}
