"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";
import { apiFetch } from "@/lib/api";
import type { EventFormData } from "@/lib/validations";
import { EventForm } from "@/components/event-form";
import { Skeleton } from "@/components/ui/skeleton";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function CreateEventPage() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const [loading, setLoading] = useState(false);

  const handleCreate = async (data: EventFormData) => {
    setLoading(true);
    try {
      const res = await apiFetch("/events", {
        method: "POST",
        body: JSON.stringify({
          ...data,
          eventDate: new Date(data.eventDate).toISOString(),
        }),
      });
      const result = await res.json();

      if (!res.ok) {
        toast.error(result.message || "Could not publish the event");
        return;
      }
      toast.success("Event published successfully!");
      router.push("/events");
    }
    catch {
      toast.error("Cannot reach the server. Please try again.");
    }
    finally {
      setLoading(false);
    }
  };

  return (
    
    <div className="mx-auto max-w-3xl px-4 py-10">
      <Card className="border border-border shadow-xs">
        <CardHeader>
          <CardTitle className="font-display text-2xl font-bold tracking-tight">
            Create a new event
          </CardTitle>
          <CardDescription>
            Organize a relief drive, a tree plantation, a cleanup or any
            community event and invite people to join.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isPending ? (
            <div className="space-y-4">
              <Skeleton className="h-9 w-full" />
              <Skeleton className="h-9 w-full" />
              <Skeleton className="h-32 w-full" />
            </div>
          ) : (
            <EventForm
              ownerEmail={session?.user.email ?? ""}
              submitLabel="Publish event"
              loading={loading}
              onSubmit={handleCreate}
            />
          )}
        </CardContent>
      </Card>
    </div>
  );
}
