"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ImageOff, Navigation, Users } from "lucide-react";
import { publicFetch } from "@/lib/api";
import type { EventItem } from "@/lib/types";
import { formatEventDate } from "@/lib/format";
import { cn } from "@/lib/utils";
import { darkOutlineBtn, primaryHeroBtn } from "@/lib/ui";
import { buttonVariants } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { QuiltStrip } from "@/components/quilt-strip";

type Stats = {
  upcomingEvents: number;
  completedEvents: number;
  totalParticipants: number;
};

function HeroImage() {
  const [failed, setFailed] = useState(false);
  return (
    <div className="overflow-hidden rounded-lg border border-[#1E3A5F] bg-[#14253D]">
      {failed ? (
        <div className="flex aspect-[16/11] items-center justify-center text-[#8DB1DE]">
          <ImageOff className="h-10 w-10" />
        </div>
      ) : (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src="/hero.jpg"
          alt="Volunteers packing warm blankets for winter distribution in Dhaka"
          onError={() => setFailed(true)}
          className="block aspect-[16/11] w-full object-cover"
        />
      )}
    </div>
  );
}

function NextDrive({ event }: { event: EventItem | null | undefined }) {
  const box =
    "flex items-center gap-2 rounded-[4px] border border-[#1E3A5F] bg-[#14253D] p-3 text-sm text-[#F7F9FC]";

  if (event === undefined) {
    return <Skeleton className="h-12 w-full bg-[#14253D]" />;
  }
  if (event === null) {
    return (
      <Link href="/create-event" className={cn(box, "hover:border-[#8DB1DE]")}>
        <Navigation className="h-[18px] w-[18px] shrink-0 text-primary" />
        <span>No drive is scheduled yet. Start one in your area.</span>
      </Link>
    );
  }
  return (
    <Link
      href={`/events/${event._id}`}
      className={cn(box, "hover:border-[#8DB1DE]")}
    >
      <Navigation className="h-[18px] w-[18px] shrink-0 text-primary" />
      <span className="truncate">
        {event.title}, {event.location} on {formatEventDate(event.eventDate)}
      </span>
    </Link>
  );
}

export function HeroSection() {
  const [nextEvent, setNextEvent] = useState<EventItem | null | undefined>(
    undefined,
  );
  const [stats, setStats] = useState<Stats | null>(null);
  const [statsFailed, setStatsFailed] = useState(false);

  useEffect(() => {
    let cancelled = false;

    publicFetch("/events?limit=1&order=asc")
      .then((res) => (res.ok ? res.json() : []))
      .catch(() => [])
      .then((data: EventItem[]) => {
        if (!cancelled) setNextEvent(data[0] ?? null);
      });

    publicFetch("/stats")
      .then((res) => {
        if (!res.ok) throw new Error("Request failed");
        return res.json();
      })
      .then((data: Stats) => {
        if (!cancelled) setStats(data);
      })
      .catch(() => {
        if (!cancelled) setStatsFailed(true);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const metrics = stats
    ? [
        {
          label: "Events created",
          value: stats.upcomingEvents + stats.completedEvents,
        },
        { label: "Upcoming events", value: stats.upcomingEvents },
        { label: "Events completed", value: stats.completedEvents },
        { label: "People joined", value: stats.totalParticipants },
      ]
    : null;

  return (
    <>
      <section className="w-full bg-[#0E1E33] text-[#F7F9FC]">
        <div className="mx-auto max-w-[1280px] px-6 py-16 lg:px-12 lg:py-24">
          <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12 lg:gap-16">
            {/* Left */}
            <div className="flex flex-col gap-6 lg:col-span-7">
              <p className="inline-flex w-fit items-center gap-2 rounded-[4px] border border-[#1E3A5F] bg-[#14253D] px-3 py-1.5 text-sm font-medium text-[#8DB1DE]">
                <span className="h-2 w-2 rounded-[2px] bg-primary" />
                Dhaka winter relief network
              </p>

              <h1 className="font-display text-4xl font-extrabold leading-10 tracking-[-0.04em] text-[#F7F9FC] sm:text-5xl sm:leading-[56px] lg:text-[64px] lg:leading-[68px]">
                Bringing warmth to every corner of Dhaka this winter.
              </h1>

              <p className="max-w-xl text-lg leading-8 text-[#8DB1DE]">
                Join grassroots volunteers and neighborhood organizers
                distributing blankets, heavy sweaters, hot meals and primary
                health checks to rough sleepers and families in need.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link
                  href="/events"
                  className={cn(buttonVariants(), primaryHeroBtn)}
                >
                  Explore winter events
                </Link>
                <Link
                  href="/create-event"
                  className={cn(
                    buttonVariants({ variant: "outline" }),
                    darkOutlineBtn,
                  )}
                >
                  Start a drive in your area
                </Link>
              </div>

              <div className="mt-4 border-t border-[#1E3A5F] pt-6">
                <p className="mb-2 text-sm text-[#8DB1DE]">Next drive</p>
                <NextDrive event={nextEvent} />
              </div>
            </div>

            {/* Right */}
            <div className="flex flex-col gap-4 lg:col-span-5">
              <HeroImage />
              <div className="flex items-start gap-4 rounded-md border border-[#1E3A5F] bg-[#0E1E33] p-5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[4px] border border-[#1E3A5F] bg-[#14253D] text-primary">
                  <Users className="h-6 w-6" />
                </div>
                <div>
                  {stats ? (
                    <p className="font-display text-xl font-bold text-[#F7F9FC]">
                      {stats.totalParticipants.toLocaleString()} people joined
                    </p>
                  ) : (
                    <Skeleton className="h-6 w-40 bg-[#14253D]" />
                  )}
                  <p className="mt-1 text-sm text-[#8DB1DE]">
                    Every sign-up on GiveHand is tied to a real event created by
                    a community member.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <QuiltStrip />

      {/* Live metrics */}
      <section className="w-full border-b bg-background">
        <div className="mx-auto max-w-[1280px] px-6 py-10 lg:px-12">
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4 md:gap-0 md:divide-x md:divide-border">
            {(
              metrics ??
              Array.from({ length: 4 }, (_, i) => ({ label: "", value: i }))
            ).map((item, i) => (
              <div key={i} className="flex flex-col md:pl-8 md:first:pl-0">
                {metrics ? (
                  <>
                    <span className="font-display text-4xl font-bold leading-10 tracking-[-0.03em]">
                      {item.value.toLocaleString()}
                    </span>
                    <span className="mt-1 text-base font-medium text-muted-foreground">
                      {item.label}
                    </span>
                  </>
                ) : statsFailed ? (
                  <span className="font-display text-4xl font-bold leading-10 text-muted-foreground">
                    -
                  </span>
                ) : (
                  <>
                    <Skeleton className="h-10 w-20" />
                    <Skeleton className="mt-2 h-5 w-32" />
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
