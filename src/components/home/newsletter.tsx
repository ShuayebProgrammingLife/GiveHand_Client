"use client";

import { toast } from "sonner";
import { Mail } from "lucide-react";
import { z } from "zod";
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
    toast.success("Thank you for subscribing to the GiveHand newsletter!");
    form.reset();
  };

  return (
    <section className="px-4 pb-4">
      <div className="relative mx-auto max-w-5xl overflow-hidden rounded-2xl bg-gradient-to-br from-blue-950 via-blue-900 to-blue-700 px-6 py-14 text-center text-white">
        <div className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-orange-500/20 blur-3xl" />

        <div className="relative">
          <span className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-white/10">
            <Mail className="h-6 w-6 text-orange-300" />
          </span>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Stay in the loop
          </h2>
          <div className="mx-auto mt-3 h-1 w-16 rounded-full bg-orange-400" />
          <p className="mx-auto mt-4 max-w-xl text-blue-100">
            Get updates about new events, volunteer calls and stories from the
            community, straight to your inbox.
          </p>

          <form
            onSubmit={handleSubmit}
            noValidate
            className="mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row"
          >
            <Input
              name="email"
              type="email"
              placeholder="Enter your email address"
              aria-label="Email address"
              className="h-10 border-white/20 bg-white/10 text-white placeholder:text-blue-200"
            />
            <Button
              type="submit"
              size="lg"
              className="bg-accent text-accent-foreground hover:bg-accent/90"
            >
              Subscribe
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
}
