"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { CalendarPlus, Pencil, Trash2 } from "lucide-react";
import { apiFetch } from "@/lib/api";
import type { EventItem } from "@/lib/types";
import { Button, buttonVariants } from "@/components/ui/button";
import { EventCard, EventCardSkeleton } from "@/components/event-card";


import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function ManageEventsPage() {
  const [events, setEvents] = useState<EventItem[] | null>(null);
  const [error, setError] = useState(false);
  const [toDelete, setToDelete] = useState<EventItem | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [now] = useState(() => Date.now());

  useEffect(() => {
    let cancelled = false;
    apiFetch("/my-events")
      .then((res) => {
        if (!res.ok) throw new Error("Request failed");
        return res.json();
      })
      .then((data: EventItem[]) => {
        if (!cancelled) setEvents(data);
      })
      .catch(() => {
        if (!cancelled) {
          setError(true);
          setEvents([]);
        }
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const confirmDelete = async () => {
    if (!toDelete) return;
    setDeleting(true);
    try {
      const res = await apiFetch(`/events/${toDelete._id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (!res.ok) {
        toast.error(data.message || "Could not delete the event");
        return;
      }
      setEvents((current) =>
        current ? current.filter((e) => e._id !== toDelete._id) : current,
      );
      toast.success("Event deleted successfully");
      setToDelete(null);
    } catch {
      toast.error("Cannot reach the server. Please try again.");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Manage Events
          </h1>
          <p className="mt-2 text-muted-foreground">
            View, update or delete the events you have created.
          </p>
        </div>
        <Link href="/create-event" className={buttonVariants()}>
          <CalendarPlus className="mr-2 h-4 w-4" />
          Create new event
        </Link>
      </div>

      {events === null ? (
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
      ) : events.length === 0 ? (
        <div className="flex flex-col items-center rounded-xl border border-dashed py-16 text-center">
          <CalendarPlus className="mb-3 h-10 w-10 text-muted-foreground" />
          <p className="text-lg font-semibold">
            You have not created any event yet
          </p>
          <p className="mt-1 text-sm text-muted-foreground">
            Start a winter clothes drive or any community event today.
          </p>
          <Link href="/create-event" className={`${buttonVariants()} mt-4`}>
            Create your first event
          </Link>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {events.map((event) => {
            const ended =
              now !== null && new Date(event.eventDate).getTime() < now;
            return (
              <EventCard
                key={event._id}
                event={event}
                ended={ended}
                action={
                  <div className="grid grid-cols-2 gap-2">
                    <Link
                      href={`/manage-events/${event._id}/edit`}
                      className={buttonVariants({ variant: "outline" })}
                    >
                      <Pencil className="mr-2 h-4 w-4" />
                      Edit
                    </Link>
                    <Button
                      variant="outline"
                      className="border-destructive text-destructive hover:bg-destructive/10 hover:text-destructive"
                      onClick={() => setToDelete(event)}
                    >
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete
                    </Button>
                  </div>
                }
              />
            );
          })}
        </div>
      )}

      {/* Delete confirmation */}
      <Dialog
        open={toDelete !== null}
        onOpenChange={(open) => {
          if (!open && !deleting) setToDelete(null);
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete this event?</DialogTitle>
            <DialogDescription>
              &quot;{toDelete?.title}&quot; will be permanently removed, and
              everyone who joined it will lose their registration. This cannot
              be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setToDelete(null)}
              disabled={deleting}
            >
              Keep event
            </Button>
            <Button
              variant="destructive"
              onClick={confirmDelete}
              disabled={deleting}
            >
              {deleting ? "Deleting..." : "Yes, delete"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
