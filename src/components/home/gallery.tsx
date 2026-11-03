"use client";

import { useState } from "react";
import { ImageOff } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";

const photos = [
  {
    src: "/gallery/gallery-1.jpg",
    title: "Winter Clothes Drive",
    place: "Mirpur 10, Dhaka",
  },
  {
    src: "/gallery/gallery-2.jpg",
    title: "Blanket Distribution",
    place: "Mohammadpur, Dhaka",
  },
  {
    src: "/gallery/gallery-3.jpg",
    title: "Hot Meals for Families",
    place: "Kamalapur, Dhaka",
  },
  {
    src: "/gallery/gallery-4.jpg",
    title: "Free Health Camp",
    place: "Uttara, Dhaka",
  },
  {
    src: "/gallery/gallery-5.jpg",
    title: "Book and School Supplies",
    place: "Dhanmondi, Dhaka",
  },
  {
    src: "/gallery/gallery-6.jpg",
    title: "Tree Plantation Day",
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
    <figure className="group relative aspect-[4/3] overflow-hidden rounded-xl border bg-muted">
      {failed ? (
        <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-blue-900 to-blue-700 text-white/40">
          <ImageOff className="h-10 w-10" />
        </div>
      ) : (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt={title}
          loading="lazy"
          onError={() => setFailed(true)}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      )}
      <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-4 text-white">
        <p className="font-semibold">{title}</p>
        <p className="text-xs text-white/80">{place}</p>
      </figcaption>
    </figure>
  );
}

export function Gallery() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-20">
      <SectionHeading
        title="Moments of Kindness"
        subtitle="A look back at some of the events our community has already completed together."
      />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {photos.map((photo) => (
          <GalleryItem key={photo.src} {...photo} />
        ))}
      </div>
    </section>
  );
}
