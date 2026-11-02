import Link from "next/link";
import { CalendarDays, Clock, MapPin } from "lucide-react";
import type { EventItem } from "@/lib/types";
import { formatEventDate, formatEventTime } from "@/lib/format";
import { buttonVariants } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

export function EventCard({
  event,
  ended = false,
  action,
}: {
  event: EventItem;
  ended?: boolean;
  action?: React.ReactNode;
}) {
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-xl border bg-card text-card-foreground shadow-sm transition-shadow hover:shadow-md">
      <div className="relative h-48 w-full shrink-0 bg-muted">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={event.thumbnail}
          alt={event.title}
          loading="lazy"
          className={`h-full w-full object-cover ${ended ? "grayscale" : ""}`}
        />
        <span className="absolute left-3 top-3 rounded-full bg-accent px-3 py-1 text-xs font-semibold text-accent-foreground shadow">
          {event.eventType}
        </span>
        {ended && (
          <span className="absolute right-3 top-3 rounded-full bg-foreground px-3 py-1 text-xs font-semibold text-background shadow">
            Ended
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-3 p-4">
        <h3 className="line-clamp-2 min-h-[3.5rem] text-lg font-semibold leading-7">
          {event.title}
        </h3>

        <ul className="space-y-1.5 text-sm text-muted-foreground">
          <li className="flex items-center gap-2">
            <MapPin className="h-4 w-4 shrink-0 text-primary" />
            <span className="line-clamp-1">{event.location}</span>
          </li>
          <li className="flex items-center gap-2">
            <CalendarDays className="h-4 w-4 shrink-0 text-primary" />
            {formatEventDate(event.eventDate)}
          </li>
          <li className="flex items-center gap-2">
            <Clock className="h-4 w-4 shrink-0 text-primary" />
            {formatEventTime(event.eventDate)}
          </li>
        </ul>

        <div className="mt-auto space-y-2">
          <Link
            href={`/events/${event._id}`}
            className={`${buttonVariants()} w-full`}
          >
            View Event
          </Link>
          {action}
        </div>
      </div>
    </article>
  );
}

export function EventCardSkeleton() {
  return (
    <div className="flex h-full flex-col overflow-hidden rounded-xl border bg-card shadow-sm">
      <Skeleton className="h-48 w-full rounded-none" />
      <div className="space-y-3 p-4">
        <Skeleton className="h-6 w-full" />
        <Skeleton className="h-6 w-2/3" />
        <Skeleton className="h-4 w-1/2" />
        <Skeleton className="h-4 w-1/3" />
        <Skeleton className="h-9 w-full" />
      </div>
    </div>
  );
}
