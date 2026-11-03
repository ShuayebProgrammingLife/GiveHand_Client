import { cn } from "@/lib/utils";

const patches = ["#F28A30", "#0E1E33", "#8DB1DE", "#F7F9FC", "#C47024"];

export function QuiltStrip({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn("flex h-3 w-full overflow-hidden", className)}
    >
      {Array.from({ length: 24 }).map((_, i) => (
        <div
          key={i}
          className="flex-1"
          style={{ backgroundColor: patches[i % patches.length] }}
        />
      ))}
    </div>
  );
}
