"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { CalendarX2 } from "lucide-react";
import { publicFetch } from "@/lib/api";
import type { EventItem } from "@/lib/types";
import { SectionHeading } from "@/components/section-heading";
import { EventCard, EventCardSkeleton } from "@/components/event-card";
import { buttonVariants } from "@/components/ui/button";

type State = { events: EventItem[]; error: boolean };

export function RecentEvents() {
  const [state, setState] = useState<State | null>(null);

  useEffect(() => {
    let cancelled = false;
    publicFetch("/events?limit=6&order=asc")
      .then((res) => {
        if (!res.ok) throw new Error("Request failed");
        return res.json();
      })
      .then((data: EventItem[]) => {
        if (!cancelled) setState({ events: data, error: false });
      })
      .catch(() => {
        if (!cancelled) setState({ events: [], error: true });
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section className="bg-muted/40 py-20">
      <div className="mx-auto max-w-7xl px-4">
        <SectionHeading
          title="Recent Upcoming Events"
          subtitle="These events are happening soon. Pick one, join it and be there for someone who needs you."
        />

        {state === null ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <EventCardSkeleton key={i} />
            ))}
          </div>
        ) : state.error ? (
          <div className="rounded-xl border border-dashed bg-background py-12 text-center">
            <p className="text-lg font-semibold">Could not load events</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Please check your connection and refresh the page.
            </p>
          </div>
        ) : state.events.length === 0 ? (
          <div className="flex flex-col items-center rounded-xl border border-dashed bg-background py-12 text-center">
            <CalendarX2 className="mb-3 h-10 w-10 text-muted-foreground" />
            <p className="text-lg font-semibold">No upcoming events yet</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Be the first to organize one for your community.
            </p>
            <Link href="/create-event" className={`${buttonVariants()} mt-4`}>
              Create an event
            </Link>
          </div>
        ) : (
          <>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {state.events.map((event) => (
                <EventCard key={event._id} event={event} />
              ))}
            </div>
            <div className="mt-10 text-center">
              <Link
                href="/events"
                className={buttonVariants({ variant: "outline", size: "lg" })}
              >
                View all events
              </Link>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
