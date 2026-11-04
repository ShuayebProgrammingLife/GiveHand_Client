"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { TicketX } from "lucide-react";
import { apiFetch } from "@/lib/api";
import type { JoinedItem } from "@/lib/types";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { EventCard, EventCardSkeleton } from "@/components/event-card";

const selectClass =
  "h-9 rounded-md border border-input bg-background px-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring";

export default function JoinedEventsPage() {
  const [items, setItems] = useState<JoinedItem[] | null>(null);
  const [error, setError] = useState(false);
  const [order, setOrder] = useState<"asc" | "desc">("asc");
  const [busyId, setBusyId] = useState<string | null>(null);
  const [currentTime] = useState<number>(() => Date.now());

  useEffect(() => {
    let cancelled = false;
    apiFetch("/joined")
      .then((res) => {
        if (!res.ok) throw new Error("Request failed");
        return res.json();
      })
      .then((data: JoinedItem[]) => {
        if (!cancelled) setItems(data);
      })
      .catch(() => {
        if (!cancelled) {
          setError(true);
          setItems([]);
        }
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const handleCancel = async (eventId: string) => {
    setBusyId(eventId);
    try {
      const res = await apiFetch(`/join/${eventId}`, { method: "DELETE" });
      const data = await res.json();
      if (!res.ok) {
        toast.error(data.message || "Could not cancel your participation");
        return;
      }
      setItems((current) =>
        current ? current.filter((item) => item.eventId !== eventId) : current,
      );
      toast.success("Your participation has been cancelled");
    } catch {
      toast.error("Cannot reach the server. Please try again.");
    } finally {
      setBusyId(null);
    }
  };

  const sorted = items
    ? [...items].sort((a, b) => {
        const diff =
          new Date(a.event.eventDate).getTime() -
          new Date(b.event.eventDate).getTime();
        return order === "asc" ? diff : -diff;
      })
    : [];

  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="font-display text-3xl font-extrabold tracking-tight sm:text-4xl sm:leading-tight">
            Joined Events
          </h1>
          <p className="mt-2 text-muted-foreground">
            {items && items.length > 0
              ? `You have joined ${items.length} ${
                  items.length === 1 ? "event" : "events"
                }. Thank you for making a difference.`
              : "Events you join will appear here."}
          </p>
        </div>

        {items && items.length > 1 && (
          <select
            aria-label="Sort joined events"
            className={selectClass}
            value={order}
            onChange={(e) =>
              setOrder(e.target.value === "desc" ? "desc" : "asc")
            }
          >
            <option value="asc">Earliest first</option>
            <option value="desc">Latest first</option>
          </select>
        )}
      </div>

      {items === null ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <EventCardSkeleton key={i} />
          ))}
        </div>
      ) : error ? (
        <div className="rounded-xl border border-dashed py-16 text-center">
          <p className="text-lg font-semibold">Could not load your events</p>
          <p className="mt-1 text-sm text-muted-foreground">
            Please check your connection and try again.
          </p>
          <Button className="mt-4" onClick={() => window.location.reload()}>
            Try again
          </Button>
        </div>
      ) : sorted.length === 0 ? (
        <div className="flex flex-col items-center rounded-xl border border-dashed py-16 text-center">
          <TicketX className="mb-3 h-10 w-10 text-muted-foreground" />
          <p className="text-lg font-semibold">
            You have not joined any event yet
          </p>
          <p className="mt-1 text-sm text-muted-foreground">
            Find an event you care about and join it.
          </p>
          <Link
            href="/events"
            className={cn(buttonVariants(), "mt-4 font-semibold shadow-xs")}
          >
            Browse upcoming events
          </Link>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {sorted.map((item) => {
            const ended =
              currentTime !== null &&
              new Date(item.event.eventDate).getTime() < currentTime;
            return (
              <EventCard
                key={item._id}
                event={item.event}
                ended={ended}
                action={
                  !ended && (
                    <Button
                      variant="outline"
                      className="w-full border-destructive/40 text-destructive font-medium shadow-none transition-colors hover:border-destructive hover:bg-destructive/10 hover:text-destructive dark:border-destructive/40 dark:hover:border-destructive dark:hover:bg-destructive/20"
                      onClick={() => handleCancel(item.eventId)}
                      disabled={busyId === item.eventId}
                    >
                      {busyId === item.eventId
                        ? "Please wait..."
                        : "Cancel Join"}
                    </Button>
                  )
                }
              />
            );
          })}
        </div>
      )}
    </div>
  );
}
