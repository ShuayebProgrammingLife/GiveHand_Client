"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";
import { ArrowLeft, ShieldAlert } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { apiFetch, publicFetch } from "@/lib/api";
import type { EventItem } from "@/lib/types";
import type { EventFormData } from "@/lib/validations";
import { toLocalInput } from "@/lib/format";
import { EventForm } from "@/components/event-form";
import { buttonVariants } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";


import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type Result = { id: string; event: EventItem | null };

export default function EditEventPage() {
  const params = useParams<{ id: string }>();
  const id = params.id;
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  const [result, setResult] = useState<Result | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let cancelled = false;
    publicFetch(`/events/${id}`)
      .then((res) => (res.ok ? res.json() : null))
      .catch(() => null)
      .then((event: EventItem | null) => {
        if (!cancelled) setResult({ id, event });
      });
    return () => {
      cancelled = true;
    };
  }, [id]);

  const handleUpdate = async (data: EventFormData) => {
    setLoading(true);
    try {
      const res = await apiFetch(`/events/${id}`, {
        method: "PUT",
        body: JSON.stringify({
          ...data,
          eventDate: new Date(data.eventDate).toISOString(),
        }),
      });
      const response = await res.json();
      if (!res.ok) {
        toast.error(response.message || "Could not update the event");
        return;
      }
      toast.success("Event updated successfully!");
      router.push("/manage-events");
    } catch {
      toast.error("Cannot reach the server. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const stillLoading = isPending || result?.id !== id;
  const event = result?.event ?? null;
  const isOwner = event && session?.user.email === event.creatorEmail;

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <Link
        href="/manage-events"
        className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to manage events
      </Link>

      {stillLoading ? (
        <Card>
          <CardContent className="space-y-4 pt-6">
            <Skeleton className="h-9 w-full" />
            <Skeleton className="h-9 w-full" />
            <Skeleton className="h-9 w-full" />
            <Skeleton className="h-32 w-full" />
          </CardContent>
        </Card>
      ) : !event ? (
        <div className="flex flex-col items-center py-20 text-center">
          <ShieldAlert className="mb-3 h-10 w-10 text-muted-foreground" />
          <h1 className="text-2xl font-bold">Event not found</h1>
          <p className="mt-2 text-muted-foreground">
            This event may have been deleted.
          </p>
          <Link href="/manage-events" className={`${buttonVariants()} mt-5`}>
            Go to my events
          </Link>
        </div>
      ) : !isOwner ? (
        <div className="flex flex-col items-center py-20 text-center">
          <ShieldAlert className="mb-3 h-10 w-10 text-destructive" />
          <h1 className="text-2xl font-bold">You cannot edit this event</h1>
          <p className="mt-2 text-muted-foreground">
            Only the person who created an event can update it.
          </p>
          <Link href="/manage-events" className={`${buttonVariants()} mt-5`}>
            Go to my events
          </Link>
        </div>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Update event</CardTitle>
            <CardDescription>
              Change the details below and save. People who joined will see the
              updated information.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <EventForm
              ownerEmail={event.creatorEmail}
              submitLabel="Save changes"
              loading={loading}
              onSubmit={handleUpdate}
              defaultValues={{
                title: event.title,
                eventType: event.eventType,
                eventDate: toLocalInput(event.eventDate),
                location: event.location,
                thumbnail: event.thumbnail,
                description: event.description,
              }}
            />
          </CardContent>
        </Card>
      )}
    </div>
  );
}
