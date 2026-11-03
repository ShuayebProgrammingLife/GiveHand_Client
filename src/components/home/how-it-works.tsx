import { SectionHeading } from "@/components/section-heading";

const steps = [
  {
    title: "List an event",
    text: "Post a drive with a date, a place and a photo. It appears on the events page right away.",
    note: "Future dates only, with your email attached",
  },
  {
    title: "Rally volunteers",
    text: "People sign in and join with one click. Changed plans? They can cancel from the same page.",
    note: "One spot per person for each event",
  },
  {
    title: "Show up and deliver",
    text: "Everything you joined sits on one page, sorted by date, so you always know what is next.",
    note: "Joined events listed by date",
  },
];

export function HowItWorks() {
  return (
    <section className="w-full border-b bg-muted py-16 lg:py-24">
      <div className="mx-auto flex max-w-[1280px] flex-col gap-12 px-6 lg:px-12">
        <SectionHeading
          title="How grassroots winter drives happen"
          subtitle="Three steps from wanting to help to showing up."
        />
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {steps.map((step, index) => (
            <div
              key={step.title}
              className="flex flex-col gap-4 rounded-md border bg-card p-6"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-[4px] bg-[#0E1E33] font-display text-xl font-bold text-[#F7F9FC]">
                {index + 1}
              </div>
              <h3 className="font-display text-xl font-bold">{step.title}</h3>
              <p className="leading-6 text-muted-foreground">{step.text}</p>
              <p className="mt-auto border-t pt-4 text-sm">{step.note}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
