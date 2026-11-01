"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { CalendarX2, Search } from "lucide-react";
import { publicFetch } from "@/lib/api";
import type { EventItem, EventTypeCount } from "@/lib/types";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { EventCard, EventCardSkeleton } from "@/components/event-card";

type Result = { key: string; events: EventItem[]; error: boolean };

const selectClass =
  "h-9 rounded-md border border-input bg-background px-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring";

function EventsView() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const type = searchParams.get("type") ?? "";
  const search = searchParams.get("search") ?? "";
  const order = searchParams.get("order") === "desc" ? "desc" : "asc";

  const [searchInput, setSearchInput] = useState(search);

  const [types, setTypes] = useState<EventTypeCount[]>([]);

  const [result, setResult] = useState<Result | null>(null);

  const key = `${type}|${search}|${order}`;
  const loading = result?.key !== key;

  const updateParams = (changes: Record<string, string>) => {
    const params = new URLSearchParams(searchParams.toString());
    Object.entries(changes).forEach(([name, value]) => {
      if (value) params.set(name, value);
      else params.delete(name);
    });
    const query = params.toString();
    router.replace(query ? `/events?${query}` : "/events", { scroll: false });
  };

  // Filter buttons Dynamic (types come => database)
  useEffect(() => {
    let cancelled = false;
    publicFetch("/event-types")
      .then((res) => (res.ok ? res.json() : []))
      .then((data: EventTypeCount[]) => {
        if (!cancelled) setTypes(data);
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, []);

  // Events list
  useEffect(() => {
    let cancelled = false;
    const params = new URLSearchParams();
    if (type) params.set("type", type);
    if (search) params.set("search", search);
    params.set("order", order);

    publicFetch(`/events?${params.toString()}`)
      .then((res) => {
        if (!res.ok) throw new Error("Request failed");
        return res.json();
      })
      .then((data: EventItem[]) => {
        if (!cancelled) setResult({ key, events: data, error: false });
      })
      .catch(() => {
        if (!cancelled) setResult({ key, events: [], error: true });
      });

    return () => {
      cancelled = true;
    };
  }, [key, type, search, order]);

  // Debounced search input
  useEffect(() => {
    const trimmed = searchInput.trim();
    if (trimmed === search) return;
    const timer = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());
      if (trimmed) params.set("search", trimmed);
      else params.delete("search");
      const query = params.toString();
      router.replace(query ? `/events?${query}` : "/events", { scroll: false });
    }, 400);
    return () => clearTimeout(timer);
  }, [searchInput, search, searchParams, router]);

  const totalCount = types.reduce((sum, item) => sum + item.count, 0);
  const hasFilters = Boolean(type || search);

  const filterButton = (active: boolean) =>
    `rounded-full border px-4 py-1.5 text-sm font-medium transition-colors ${
      active
        ? "border-primary bg-primary text-primary-foreground"
        : "border-border text-muted-foreground hover:border-primary hover:text-primary"
    }`;

  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Upcoming Events
        </h1>
        <p className="mx-auto mt-2 max-w-2xl text-muted-foreground">
          Find a winter clothes drive, a blanket distribution or any community
          event near you and be part of something good.
        </p>
      </div>

      {/* Search & sort */}
      <div className="mb-5 flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Search events by title"
            className="pl-9"
            aria-label="Search events"
          />
        </div>
        <select
          aria-label="Sort events"
          className={selectClass}
          value={order}
          onChange={(e) =>
            updateParams({ order: e.target.value === "desc" ? "desc" : "" })
          }
        >
          <option value="asc">Earliest first</option>
          <option value="desc">Latest first</option>
        </select>
      </div>

      {/* Dynamic filter buttons */}
      <div className="mb-8 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => updateParams({ type: "" })}
          className={filterButton(!type)}
        >
          All{totalCount > 0 ? ` (${totalCount})` : ""}
        </button>
        {types.map((item) => (
          <button
            key={item.type}
            type="button"
            onClick={() => updateParams({ type: item.type })}
            className={filterButton(type === item.type)}
          >
            {item.type} ({item.count})
          </button>
        ))}
      </div>

      {/* Results */}
      {loading ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <EventCardSkeleton key={i} />
          ))}
        </div>
      ) : result?.error ? (
        <div className="rounded-xl border border-dashed py-16 text-center">
          <p className="text-lg font-semibold">Could not load events</p>
          <p className="mt-1 text-sm text-muted-foreground">
            Please check your connection and try again.
          </p>
          <Button className="mt-4" onClick={() => router.refresh()}>
            Try again
          </Button>
        </div>
      ) : result && result.events.length === 0 ? (
        <div className="flex flex-col items-center rounded-xl border border-dashed py-16 text-center">
          <CalendarX2 className="mb-3 h-10 w-10 text-muted-foreground" />
          <p className="text-lg font-semibold">No events found</p>
          <p className="mt-1 text-sm text-muted-foreground">
            {hasFilters
              ? "Try a different search or filter."
              : "No upcoming events yet. Be the first to create one!"}
          </p>
          {hasFilters && (
            <Button
              variant="outline"
              className="mt-4"
              onClick={() => {
                setSearchInput("");
                router.replace("/events", { scroll: false });
              }}
            >
              Clear filters
            </Button>
          )}
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {result?.events.map((event) => (
            <EventCard key={event._id} event={event} />
          ))}
        </div>
      )}
    </div>
  );
}

export default function EventsPage() {
  return (
    <Suspense
      fallback={
        <div className="mx-auto grid max-w-7xl gap-6 px-4 py-10 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <EventCardSkeleton key={i} />
          ))}
        </div>
      }
    >
      <EventsView />
    </Suspense>
  );
}
