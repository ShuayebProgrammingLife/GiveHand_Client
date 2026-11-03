import Link from "next/link";
import { CalendarDays, MapPin } from "lucide-react";
import type { EventItem } from "@/lib/types";
import { formatEventDate, formatEventTime } from "@/lib/format";
import { cn } from "@/lib/utils";
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
    <article className="flex h-full flex-col overflow-hidden rounded-md border bg-card text-card-foreground transition-colors hover:border-foreground/60">
      <div className="relative aspect-[16/10] w-full shrink-0 overflow-hidden bg-muted">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={event.thumbnail}
          alt={event.title}
          loading="lazy"
          className={cn("h-full w-full object-cover", ended && "grayscale")}
        />
        <span className="absolute left-3 top-3 rounded-[2px] bg-[#0E1E33] px-2.5 py-1 text-xs font-semibold text-white">
          {event.eventType}
        </span>
        {ended && (
          <span className="absolute right-3 top-3 rounded-[2px] bg-[#E2E8F0] px-2.5 py-1 text-xs font-semibold text-[#1E293B]">
            Ended
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-4 p-5">
        <div>
          <h3 className="line-clamp-2 min-h-14 font-display text-xl font-bold leading-7">
            {event.title}
          </h3>
          <ul className="mt-2 space-y-1.5 text-sm text-muted-foreground">
            <li className="flex items-start gap-2">
              <CalendarDays className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
              <span>
                {formatEventDate(event.eventDate)} at{" "}
                {formatEventTime(event.eventDate)}
              </span>
            </li>
            <li className="flex items-start gap-2">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
              <span className="line-clamp-1">{event.location}</span>
            </li>
          </ul>
        </div>

        <p className="line-clamp-2 rounded-sm border bg-muted/60 p-3 text-sm leading-5">
          {event.description}
        </p>

        <div className="mt-auto flex items-center justify-between gap-3 border-t pt-3">
          <div className="min-w-0">
            <p className="text-xs text-muted-foreground">Organized by</p>
            <p className="truncate text-sm font-medium">{event.creatorEmail}</p>
          </div>
          <Link
            href={`/events/${event._id}`}
            className={cn(
              buttonVariants({ variant: "outline", size: "sm" }),
              "shrink-0 shadow-none",
            )}
          >
            View Event
          </Link>
        </div>

        {action}
      </div>
    </article>
  );
}

export function EventCardSkeleton() {
  return (
    <div className="flex h-full flex-col overflow-hidden rounded-md border bg-card">
      <Skeleton className="aspect-[16/10] w-full rounded-none" />
      <div className="space-y-3 p-5">
        <Skeleton className="h-6 w-full" />
        <Skeleton className="h-6 w-2/3" />
        <Skeleton className="h-4 w-1/2" />
        <Skeleton className="h-4 w-1/3" />
        <Skeleton className="h-14 w-full" />
        <Skeleton className="h-9 w-full" />
      </div>
    </div>
  );
}
