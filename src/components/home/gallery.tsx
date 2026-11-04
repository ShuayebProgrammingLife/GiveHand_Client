"use client";

import { useState } from "react";
import { ImageOff } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";

const photos = [
  {
    src: "/gallery/winter_clothing_drive.png",
    title: "Winter clothes drive",
    place: "Mirpur 10, Dhaka",
  },
  {
    src: "/gallery/blanket_distribution.png",
    title: "Blanket distribution",
    place: "Mohammadpur, Dhaka",
  },
  {
    src: "/gallery/hot_meals.png",
    title: "Hot meals for families",
    place: "Kamalapur, Dhaka",
  },
  {
    src: "/gallery/free_health_camp.jpg",
    title: "Free health camp",
    place: "Uttara, Dhaka",
  },
  {
    src: "/gallery/books_supplies.jpg",
    title: "Books and school supplies",
    place: "Dhanmondi, Dhaka",
  },
  {
    src: "/gallery/tree_plantation.jpeg",
    title: "Tree plantation day",
    place: "Hatirjheel, Dhaka",
  },
];

function GalleryItem({
  src,
  title,
  place,
}: {
  src: string;
  title: string;
  place: string;
}) {
  const [failed, setFailed] = useState(false);
  return (
    <figure className="rounded-md transition-all duration-200 hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/10">
      <div className="aspect-[4/3] overflow-hidden rounded-md border border-border bg-muted transition-colors hover:border-primary/60">
        {failed ? (
          <div className="flex h-full w-full items-center justify-center bg-[#0E1E33] text-[#8DB1DE]">
            <ImageOff className="h-10 w-10" />
          </div>
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={src}
            alt={title}
            loading="lazy"
            onError={() => setFailed(true)}
            className="h-full w-full object-cover"
          />
        )}
      </div>
      <figcaption className="mt-3">
        <p className="font-semibold">{title}</p>
        <p className="text-sm text-muted-foreground">{place}</p>
      </figcaption>
    </figure>
  );
}

export function Gallery() {
  return (
    <section className="w-full bg-background py-16 lg:py-24">
      <div className="mx-auto flex max-w-[1280px] flex-col gap-10 px-6 lg:px-12">
        <SectionHeading
          title="Moments from past drives"
          subtitle="A look back at events our community has already completed together."
        />
        <div className="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {photos.map((photo) => (
            <GalleryItem key={photo.src} {...photo} />
          ))}
        </div>
      </div>
    </section>
  );
}
