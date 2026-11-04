"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "sonner";

import {
  CalendarPlus,
  HandHeart,
  LayoutList,
  LogOut,
  TicketCheck,
} from "lucide-react";

import { cn } from "@/lib/utils";

import { authClient } from "@/lib/auth-client";
import { ThemeToggle } from "@/components/theme-toggle";
import { QuiltStrip } from "@/components/quilt-strip";
import { Button, buttonVariants } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const menuItems = [
  { href: "/create-event", label: "Create Event", icon: CalendarPlus },
  { href: "/manage-events", label: "Manage Events", icon: LayoutList },
  { href: "/joined-events", label: "Joined Events", icon: TicketCheck },
];

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  const handleLogout = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          toast.success("Logged out successfully");
          router.push("/");
          router.refresh();
        },
        onError: () => {
          toast.error("Logout failed. Please try again.");
        },
      },
    });
  };

  const initials = (user?.name ?? "U")
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <header className="sticky top-0 z-50 w-full bg-background">
      <nav className="mx-auto grid h-20 max-w-7xl grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-2 px-4 lg:px-12">
        {/* Left: logo */}
        <Link
          href="/"
          className="group flex cursor-pointer items-center gap-2 justify-self-start transition-colors hover:text-primary"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-md bg-[#0E1E33] text-primary transition-transform duration-200 group-hover:scale-105">
            <HandHeart className="h-5 w-5" />
          </span>
          <span className="hidden font-display text-2xl font-bold tracking-tight sm:inline">
            GiveHand
          </span>
        </Link>

        {/* Middle: navlink */}
        <Link
          href="/events"
          className={`cursor-pointer px-2 py-2 text-sm transition-colors sm:text-base ${pathname.startsWith("/events")
            ? "font-semibold text-foreground underline decoration-primary decoration-2 underline-offset-8 hover:text-primary"
            : "font-medium text-muted-foreground hover:text-primary"
            }`}
        >
          Upcoming Events
        </Link>

        {/* Right: theme toggle + auth */}
        <div className="flex items-center gap-1 justify-self-end sm:gap-2">
          <ThemeToggle />

          {isPending ? (
            <Skeleton className="h-9 w-9 rounded-full" />
          ) : user ? (
            <>
              <DropdownMenu>
                <div className="group relative">
                  <DropdownMenuTrigger
                    className="rounded-full outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                    aria-label="Open profile menu"
                  >
                    <Avatar className="h-9 w-9">
                      <AvatarImage
                        src={user.image ?? undefined}
                        alt={user.name}
                      />
                      <AvatarFallback>{initials}</AvatarFallback>
                    </Avatar>
                  </DropdownMenuTrigger>

                  {/* Hover tooltip with display name */}
                  <span className="pointer-events-none absolute right-0 top-full mt-2 whitespace-nowrap rounded-sm bg-foreground px-2 py-1 text-xs text-background opacity-0 transition-opacity group-hover:opacity-100">
                    {user.name}
                  </span>
                </div>

                <DropdownMenuContent align="end" className="w-64">
                  <div className="px-2 py-1.5">
                    <p className="truncate text-sm font-semibold">
                      {user.name}
                    </p>
                    <p className="truncate text-xs text-muted-foreground">
                      {user.email}
                    </p>
                  </div>
                  <DropdownMenuSeparator />
                  {menuItems.map(({ href, label, icon: Icon }) => (
                    <DropdownMenuItem
                      key={href}
                      className="cursor-pointer"
                      onClick={() => router.push(href)}
                    >
                      <Icon className="mr-2 h-4 w-4" />
                      {label}
                    </DropdownMenuItem>
                  ))}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    className="cursor-pointer text-destructive focus:text-destructive dark:focus:text-white"
                    onClick={handleLogout}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Separate Logout button next to the profile picture */}
              <Button
                variant="outline"
                size="sm"
                className="border-destructive/40 text-destructive shadow-none transition-colors hover:border-destructive hover:bg-destructive/10 hover:text-destructive dark:border-destructive/40 dark:hover:border-destructive dark:hover:bg-destructive/20 dark:hover:text-primary"
                onClick={handleLogout}
                aria-label="Logout"
              >
                <LogOut className="h-4 w-4 sm:mr-2" />
                <span className="hidden sm:inline">Logout</span>
              </Button>
            </>
          ) : (
            <Link
              href="/login"
              className={cn(
                buttonVariants({ variant: "outline" }),
                "shadow-none transition-colors",
              )}
            >
              Login
            </Link>
          )}
        </div>
      </nav>
      <QuiltStrip className="h-1.5" />
    </header>
  );
}
