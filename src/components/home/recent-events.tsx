"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { CalendarX2 } from "lucide-react";
import { publicFetch } from "@/lib/api";
import type { EventItem, EventTypeCount } from "@/lib/types";
import { cn } from "@/lib/utils";
import { primaryHeroBtn } from "@/lib/ui";
import { SectionHeading } from "@/components/section-heading";
import { EventCard, EventCardSkeleton } from "@/components/event-card";
import { buttonVariants } from "@/components/ui/button";

type Result = { key: string; events: EventItem[]; error: boolean };

export function RecentEvents() {
  const [type, setType] = useState("");
  const [types, setTypes] = useState<EventTypeCount[]>([]);
  const [result, setResult] = useState<Result | null>(null);

  const loading = result?.key !== type;

  // Dynamic filter tabs (from the database)
  useEffect(() => {
    let cancelled = false;
    publicFetch("/event-types")
      .then((res) => (res.ok ? res.json() : []))
      .catch(() => [])
      .then((data: EventTypeCount[]) => {
        if (!cancelled) setTypes(data.slice(0, 5));
      });
    return () => {
      cancelled = true;
    };
  }, []);

  // 6 recent upcoming events (.limit(6) on the server)
  useEffect(() => {
    let cancelled = false;
    const params = new URLSearchParams({ limit: "6", order: "asc" });
    if (type) params.set("type", type);

    publicFetch(`/events?${params.toString()}`)
      .then((res) => {
        if (!res.ok) throw new Error("Request failed");
        return res.json();
      })
      .then((data: EventItem[]) => {
        if (!cancelled) setResult({ key: type, events: data, error: false });
      })
      .catch(() => {
        if (!cancelled) setResult({ key: type, events: [], error: true });
      });

    return () => {
      cancelled = true;
    };
  }, [type]);

  const tab = (active: boolean) =>
    cn(
      "rounded-md border px-4 py-2 text-sm font-medium transition-colors",
      active
        ? "border-foreground bg-foreground text-background"
        : "bg-card text-foreground hover:bg-muted",
    );

  return (
    <section className="w-full bg-background py-16 lg:py-24">
      <div className="mx-auto flex max-w-[1280px] flex-col gap-10 px-6 lg:px-12">
        <SectionHeading
          title="Recent upcoming events"
          subtitle="Every event is created by a community member and open for anyone to join."
        />

        <div className="flex flex-wrap items-center gap-2 border-b pb-4">
          <button
            type="button"
            className={tab(type === "")}
            onClick={() => setType("")}
          >
            All events
          </button>
          {types.map((item) => (
            <button
              key={item.type}
              type="button"
              className={tab(type === item.type)}
              onClick={() => setType(item.type)}
            >
              {item.type}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <EventCardSkeleton key={i} />
            ))}
          </div>
        ) : result?.error ? (
          <div className="rounded-md border border-dashed py-12 text-center">
            <p className="text-lg font-semibold">Could not load events</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Please check your connection and refresh the page.
            </p>
          </div>
        ) : result && result.events.length === 0 ? (
          <div className="flex flex-col items-center rounded-md border border-dashed py-12 text-center">
            <CalendarX2 className="mb-3 h-10 w-10 text-muted-foreground" />
            <p className="text-lg font-semibold">No upcoming events here yet</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Be the first to organize one for your community.
            </p>
            <Link
              href="/create-event"
              className={cn(buttonVariants(), primaryHeroBtn, "mt-4")}
            >
              Create an event
            </Link>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {result?.events.map((event) => (
              <EventCard key={event._id} event={event} />
            ))}
          </div>
        )}

        <div className="flex justify-center pt-4">
          <Link
            href="/events"
            className={cn(buttonVariants(), primaryHeroBtn, "px-8")}
          >
            View all upcoming events
          </Link>
        </div>
      </div>
    </section>
  );
}
