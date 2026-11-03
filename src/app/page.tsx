import { HeroSection } from "@/components/home/hero-section";
import { RecentEvents } from "@/components/home/recent-events";
import { HowItWorks } from "@/components/home/how-it-works";
import { Gallery } from "@/components/home/gallery";
import { OrganizerCta } from "@/components/home/organizer-cta";
import { Newsletter } from "@/components/home/newsletter";
import { QuiltStrip } from "@/components/quilt-strip";

export default function Home() {
  return (
    <>
      <HeroSection />
      <RecentEvents />
      <QuiltStrip />
      <HowItWorks />
      <Gallery />
      <OrganizerCta />
      <Newsletter />
    </>
  );
}
