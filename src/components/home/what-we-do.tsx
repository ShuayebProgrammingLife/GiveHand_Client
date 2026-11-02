import Link from "next/link";
import {
  BedDouble,
  GraduationCap,
  HeartPulse,
  Shirt,
  Soup,
  Sprout,
} from "lucide-react";
import { SectionHeading } from "@/components/section-heading";

const causes = [
  {
    icon: Shirt,
    title: "Winter Clothes Drives",
    text: "Collect and distribute sweaters, jackets and warm clothes to people who cannot afford them.",
    type: "Donation",
  },
  {
    icon: BedDouble,
    title: "Blanket Distribution",
    text: "Reach street dwellers and low-income families with blankets on the coldest nights.",
    type: "Donation",
  },
  {
    icon: GraduationCap,
    title: "Education Support",
    text: "Give books, school supplies and free coaching to children so winter never stops their learning.",
    type: "Education",
  },
  {
    icon: HeartPulse,
    title: "Health Camps",
    text: "Free checkups and medicine for cold-related illnesses, with volunteer doctors and helpers.",
    type: "Health Camp",
  },
  {
    icon: Soup,
    title: "Food Distribution",
    text: "Serve hot meals and share food packs with families who struggle to get through the season.",
    type: "Food Distribution",
  },
  {
    icon: Sprout,
    title: "Plantation and Cleanup",
    text: "Plant trees and clean your neighborhood together, so the whole community grows greener.",
    type: "Plantation",
  },
];

export function WhatWeDo() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-20">
      <SectionHeading
        title="What We Do"
        subtitle="GiveHand brings volunteers and organizers together around causes that matter, so every act of kindness reaches the right hands."
      />

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {causes.map(({ icon: Icon, title, text, type }) => (
          <Link
            key={title}
            href={`/events?type=${encodeURIComponent(type)}`}
            className="group flex h-full flex-col rounded-xl border bg-card p-6 shadow-sm transition-all hover:-translate-y-1 hover:border-primary hover:shadow-md"
          >
            <span className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-accent/20 text-accent-foreground transition-colors group-hover:bg-accent group-hover:text-accent-foreground">
              <Icon className="h-6 w-6" />
            </span>
            <h3 className="text-lg font-semibold">{title}</h3>
            <p className="mt-2 flex-1 text-sm leading-6 text-muted-foreground">
              {text}
            </p>
            <span className="mt-4 text-sm font-medium text-primary">
              Find events &rarr;
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
