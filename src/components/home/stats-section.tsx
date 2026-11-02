"use client";

import { useEffect, useState } from "react";
import { CalendarDays, CheckCircle2, Users } from "lucide-react";
import { publicFetch } from "@/lib/api";
import { Skeleton } from "@/components/ui/skeleton";

type Stats = {
  upcomingEvents: number;
  completedEvents: number;
  totalParticipants: number;
};

const items = [
  { key: "upcomingEvents", label: "Upcoming Events", icon: CalendarDays },
  { key: "completedEvents", label: "Events Completed", icon: CheckCircle2 },
  { key: "totalParticipants", label: "Total Participants", icon: Users },
] as const;

export function StatsSection() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let cancelled = false;
    publicFetch("/stats")
      .then((res) => {
        if (!res.ok) throw new Error("Request failed");
        return res.json();
      })
      .then((data: Stats) => {
        if (!cancelled) setStats(data);
      })
      .catch(() => {
        if (!cancelled) setFailed(true);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section className="relative z-10 mx-auto -mt-14 max-w-5xl px-4">
      <div className="grid gap-4 sm:grid-cols-3">
        {items.map(({ key, label, icon: Icon }) => (
          <div
            key={key}
            className="flex items-center gap-4 rounded-xl border bg-card p-5 shadow-lg"
          >
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
              <Icon className="h-6 w-6" />
            </span>
            <div>
              {stats ? (
                <p className="text-3xl font-bold leading-none">
                  {stats[key].toLocaleString()}
                </p>
              ) : failed ? (
                <p className="text-3xl font-bold leading-none text-muted-foreground">
                  -
                </p>
              ) : (
                <Skeleton className="h-8 w-16" />
              )}
              <p className="mt-1 text-sm text-muted-foreground">{label}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
