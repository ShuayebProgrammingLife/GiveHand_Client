"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";

import {
  ArrowLeft,
  CalendarDays,
  CalendarX2,
  CheckCircle2,
  Clock,
  Mail,
  MapPin,
} from "lucide-react";

import { authClient } from "@/lib/auth-client";
import { apiFetch, publicFetch } from "@/lib/api";
import type { EventItem } from "@/lib/types";
import { formatEventDate, formatEventTime } from "@/lib/format";
import { Button, buttonVariants } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

type Result = {
  id: string;
  event: EventItem | null;
  ended: boolean;
  error: "notfound" | "network" | null;
};

type JoinState = { key: string; joined: boolean };

function DetailsSkeleton() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <Skeleton className="mb-6 h-5 w-32" />
      <Skeleton className="h-72 w-full rounded-xl sm:h-96" />
      <div className="mt-8 grid gap-8 lg:grid-cols-3">
        <div className="space-y-4 lg:col-span-2">
          <Skeleton className="h-6 w-24" />
          <Skeleton className="h-10 w-3/4" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-2/3" />
        </div>
        <Skeleton className="h-64 w-full rounded-xl" />
      </div>
    </div>
  );
}

export default function EventDetailsPage() {
  const params = useParams<{ id: string }>();
  const id = params.id;
  const router = useRouter();
  const { data: session, isPending: sessionPending } = authClient.useSession();
  const userEmail = session?.user.email;

  const [result, setResult] = useState<Result | null>(null);
  const [joinState, setJoinState] = useState<JoinState | null>(null);
  const [busy, setBusy] = useState(false);

  const loading = result?.id !== id;
  const joinKey = `${id}|${userEmail}`;
  const joined = joinState?.key === joinKey ? joinState.joined : false;
  const statusLoading =
    sessionPending || (Boolean(userEmail) && joinState?.key !== joinKey);

  // Load event : public
  useEffect(() => {
    let cancelled = false;
    publicFetch(`/events/${id}`)
      .then(async (res) => {
        if (res.status === 404 || res.status === 400) {
          return { id, event: null, ended: false, error: "notfound" } as Result;
        }
        if (!res.ok) throw new Error("Request failed");
        const event: EventItem = await res.json();
        const ended = new Date(event.eventDate).getTime() < Date.now();
        return { id, event, ended, error: null } as Result;
      })
      .catch(
        () => ({ id, event: null, ended: false, error: "network" }) as Result,
      )
      .then((data) => {
        if (!cancelled) setResult(data);
      });
    return () => {
      cancelled = true;
    };
  }, [id]);


  // Load join status => only when logged in
  useEffect(() => {
    if (!userEmail) return;
    let cancelled = false;
    apiFetch(`/join/${id}`)
      .then((res) => (res.ok ? res.json() : { joined: false }))
      .catch(() => ({ joined: false }))
      .then((data: { joined: boolean }) => {
        if (!cancelled) setJoinState({ key: joinKey, joined: data.joined });
      });
    return () => {
      cancelled = true;
    };
  }, [id, userEmail, joinKey]);

  const handleJoin = async () => {
    if (!userEmail) {
      toast.error("Please login to join this event");
      router.push(`/login?next=/events/${id}`);
      return;
    }
    setBusy(true);
    try {
      const res = await apiFetch("/join", {
        method: "POST",
        body: JSON.stringify({ eventId: id }),
      });
      const data = await res.json();
      if (!res.ok) {
        if (res.status === 409) {
          setJoinState({ key: joinKey, joined: true });
        }
        toast.error(data.message || "Could not join the event");
        return;
      }
      setJoinState({ key: joinKey, joined: true });
      toast.success("You have joined this event. See you there!");
    } catch {
      toast.error("Cannot reach the server. Please try again.");
    } finally {
      setBusy(false);
    }
  };

  const handleCancel = async () => {
    setBusy(true);
    try {
      const res = await apiFetch(`/join/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (!res.ok) {
        toast.error(data.message || "Could not cancel your participation");
        return;
      }
      setJoinState({ key: joinKey, joined: false });
      toast.success("Your participation has been cancelled");
    } catch {
      toast.error("Cannot reach the server. Please try again.");
    } finally {
      setBusy(false);
    }
  };

  if (loading) return <DetailsSkeleton />;

  if (!result?.event) {
    return (
      <div className="mx-auto flex max-w-xl flex-col items-center px-4 py-24 text-center">
        <CalendarX2 className="mb-4 h-12 w-12 text-muted-foreground" />
        <h1 className="font-display text-2xl font-bold">
          {result?.error === "network"
            ? "Could not load this event"
            : "Event not found"}
        </h1>
        <p className="mt-2 text-muted-foreground">
          {result?.error === "network"
            ? "Please check your connection and try again."
            : "This event may have been removed or the link is incorrect."}
        </p>
        <Link
          href="/events"
          className={cn(buttonVariants(), "mt-6 font-semibold shadow-xs")}
        >
          Browse upcoming events
        </Link>
      </div>
    );
  }

  const { event, ended } = result;

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <Link
        href="/events"
        className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-[#934B00] dark:hover:text-primary"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to events
      </Link>

      <div className="relative h-72 w-full overflow-hidden rounded-xl border border-border bg-muted sm:h-96">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={event.thumbnail}
          alt={event.title}
          className="h-full w-full object-cover"
        />
        <span className="absolute left-4 top-4 rounded-[4px] bg-[#0E1E33] px-3 py-1.5 text-xs font-semibold text-white shadow">
          {event.eventType}
        </span>
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-3">
        {/* Left: title and description */}
        <div className="lg:col-span-2">
          <h1 className="font-display text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl lg:text-5xl sm:leading-tight">
            {event.title}
          </h1>
          <h2 className="font-display mb-2 mt-6 text-xl font-bold">About this event</h2>
          <p className="whitespace-pre-line leading-7 text-muted-foreground">
            {event.description}
          </p>
        </div>

        {/* Right: details and join */}
        <aside className="h-fit rounded-xl border border-border bg-card p-5 shadow-xs lg:sticky lg:top-24">
          <h2 className="font-display mb-4 text-lg font-bold">Event details</h2>
          <ul className="space-y-4 text-sm">
            <li className="flex gap-3">
              <CalendarDays className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
              <div>
                <p className="text-xs text-muted-foreground">Date</p>
                <p className="font-medium">
                  {formatEventDate(event.eventDate)}
                </p>
              </div>
            </li>
            <li className="flex gap-3">
              <Clock className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
              <div>
                <p className="text-xs text-muted-foreground">Time</p>
                <p className="font-medium">
                  {formatEventTime(event.eventDate)}
                </p>
              </div>
            </li>
            <li className="flex gap-3">
              <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
              <div>
                <p className="text-xs text-muted-foreground">Location</p>
                <p className="font-medium">{event.location}</p>
              </div>
            </li>
            <li className="flex gap-3">
              <Mail className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
              <div className="min-w-0">
                <p className="text-xs text-muted-foreground">Organizer</p>
                <p className="truncate font-medium">{event.creatorEmail}</p>
              </div>
            </li>
          </ul>

          <div className="mt-6">
            {ended ? (
              <Button className="h-10 w-full font-semibold" disabled>
                This event has ended
              </Button>
            ) : statusLoading ? (
              <Skeleton className="h-10 w-full" />
            ) : joined ? (
              <div className="space-y-3">
                <p className="flex items-center justify-center gap-2 rounded-md bg-primary/10 py-2.5 text-sm font-medium text-primary">
                  <CheckCircle2 className="h-4 w-4" />
                  You have joined this event
                </p>
                <Button
                  variant="outline"
                  className="h-10 w-full border-destructive/40 text-destructive font-semibold transition-colors hover:border-destructive hover:bg-destructive/10 hover:text-destructive dark:border-destructive/40 dark:hover:border-destructive dark:hover:bg-destructive/20"
                  onClick={handleCancel}
                  disabled={busy}
                >
                  {busy ? "Please wait..." : "Cancel Join"}
                </Button>
              </div>
            ) : (
              <Button
                className="h-10 w-full font-semibold shadow-xs"
                onClick={handleJoin}
                disabled={busy}
              >
                {busy ? "Please wait..." : "Join Event"}
              </Button>
            )}
            {!userEmail && !sessionPending && !ended && (
              <p className="mt-2 text-center text-xs text-muted-foreground">
                You need to login to join this event.
              </p>
            )}
          </div>
        </aside>
      </div>
    </div>
  );
}
