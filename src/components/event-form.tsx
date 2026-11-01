"use client";

import { useState } from "react";
import { toast } from "sonner";
import { eventSchema, type EventFormData } from "@/lib/validations";

import {
  EVENT_TYPES,
  OTHERS,
  PHOTO_PRESETS,
  normalizeType,
} from "@/lib/constants";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";


type EventFormProps = {
  ownerEmail: string;
  submitLabel: string;
  loading: boolean;
  onSubmit: (data: EventFormData) => void;
  defaultValues?: Partial<EventFormData>;
};

const selectClass =
  "h-9 w-full rounded-md border border-input bg-background px-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring";

const getMinDate = () =>
  new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
    .toISOString()
    .slice(0, 16);

export function EventForm({
  ownerEmail,
  submitLabel,
  loading,
  onSubmit,
  defaultValues,
}: EventFormProps) {
  const initialType = defaultValues?.eventType ?? "";
  const isCustomInitial =
    initialType !== "" &&
    !EVENT_TYPES.includes(initialType as (typeof EVENT_TYPES)[number]);

  const [typeSelect, setTypeSelect] = useState(
    isCustomInitial ? OTHERS : initialType,
  );

  const [customType, setCustomType] = useState(
    isCustomInitial ? initialType : "",
  );

  const [thumbnail, setThumbnail] = useState(defaultValues?.thumbnail ?? "");

  const [imageBroken, setImageBroken] = useState(false);

  const [minDate] = useState(getMinDate);

  const presets = PHOTO_PRESETS.filter((preset) => preset.url);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = new FormData(e.currentTarget);

    if (!typeSelect) {
      toast.error("Please select an event type");
      return;
    }
    if (typeSelect === OTHERS && !customType.trim()) {
      toast.error("Please enter your custom event type");
      return;
    }

    const finalType =
      typeSelect === OTHERS ? normalizeType(customType) : typeSelect;

    const parsed = eventSchema.safeParse({
      title: form.get("title"),
      eventType: finalType,
      eventDate: form.get("eventDate"),
      location: form.get("location"),
      thumbnail,
      description: form.get("description"),
    });

    if (!parsed.success) {
      toast.error(parsed.error.issues[0].message);
      return;
    }
    onSubmit(parsed.data);
  };

  return (

    <form 
      onSubmit={handleSubmit} 
      className="space-y-5" noValidate>
        <div className="space-y-2">
          <Label htmlFor="title">Event title</Label>
            <Input
              id="title"
              name="title"
              placeholder="Winter Clothes Distribution at Mirpur 10"
              defaultValue={defaultValues?.title}
            />
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="eventType">Event type</Label>
            <select
              id="eventType"
              className={selectClass}
              value={typeSelect}
              onChange={(e) => setTypeSelect(e.target.value)}
            >
              <option value="" disabled>
                Select event type
              </option>
              {EVENT_TYPES.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>

            {typeSelect === OTHERS && (
              <div className="space-y-1 pt-1">
                <Input
                  id="customType"
                  placeholder="e.g. Blood Donation"
                  maxLength={30}
                  value={customType}
                  onChange={(e) => setCustomType(e.target.value)}
                />
                <p className="text-xs text-muted-foreground">
                  Your type will appear as a filter on the Upcoming Events page.
                </p>
              </div>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="eventDate">Event date and time</Label>
            <Input
              id="eventDate"
              name="eventDate"
              type="datetime-local"
              min={minDate}
              defaultValue={defaultValues?.eventDate}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="location">Location</Label>
          <Input
            id="location"
            name="location"
            placeholder="Mirpur 10, Dhaka"
            defaultValue={defaultValues?.location}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="thumbnail">Thumbnail image URL</Label>
          <Input
            id="thumbnail"
            name="thumbnail"
            placeholder="https://example.com/event-photo.jpg"
            value={thumbnail}
            onChange={(e) => {
              setThumbnail(e.target.value);
              setImageBroken(false);
            }}
          />

          {presets.length > 0 && (
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <span className="text-xs text-muted-foreground">Quick photos:</span>
              {presets.map((preset) => (
                <button
                  key={preset.label}
                  type="button"
                  onClick={() => {
                    setThumbnail(preset.url);
                    setImageBroken(false);
                  }}
                  className={`rounded-full border px-3 py-1 text-xs transition-colors hover:border-primary hover:text-primary ${
                    thumbnail === preset.url
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-border text-muted-foreground"
                  }`}
                >
                  {preset.label}
                </button>
              ))}
            </div>
          )}

          {thumbnail && !imageBroken && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={thumbnail}
              alt="Thumbnail preview"
              onError={() => setImageBroken(true)}
              className="mt-2 h-40 w-full rounded-lg border object-cover sm:w-72"
            />
          )}
          {thumbnail && imageBroken && (
            <p className="text-xs text-destructive">
              This image could not be loaded. Please check the URL.
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            name="description"
            rows={5}
            placeholder="Tell people what this event is about, who it helps and what volunteers should bring."
            defaultValue={defaultValues?.description}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="ownerEmail">Organizer email</Label>
          <Input id="ownerEmail" value={ownerEmail} readOnly disabled />
        </div>

        <Button type="submit" className="w-full sm:w-auto" disabled={loading}>
          {loading ? "Please wait..." : submitLabel}
        </Button>
    </form>
  );
}
