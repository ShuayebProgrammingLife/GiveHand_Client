import { Banner } from "@/components/home/banner";
import { StatsSection } from "@/components/home/stats-section";
import { WhatWeDo } from "@/components/home/what-we-do";
import { RecentEvents } from "@/components/home/recent-events";
import { Gallery } from "@/components/home/gallery";
import { Newsletter } from "@/components/home/newsletter";

export default function Home() {
  return (
    <>
      <Banner />
      <StatsSection />
      <WhatWeDo />
      <RecentEvents />
      <Gallery />
      <Newsletter />
    </>
  );
}
