import Link from "next/link";
import { HandHeart, Mail, MapPin } from "lucide-react";

const WHATSAPP_NUMBER = "+8801330546984";
const WHATSAPP_MESSAGE =
  "Hello GiveHand team! I would like to know more about your events.";

const socialLinks = [
  {
    name: "X",
    href: "https://x.com/ShuayebHossain1",
    path: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z",
  },
  {
    name: "Facebook",
    href: "https://www.facebook.com/shuayeb.hossain.2024/",
    path: "M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036 26.805 26.805 0 0 0-.733-.009c-.707 0-1.259.096-1.675.309a1.686 1.686 0 0 0-.679.622c-.258.42-.374.995-.374 1.752v1.297h3.919l-.386 2.103-.287 1.564h-3.246v8.245C19.396 23.238 24 18.179 24 12.044c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.628 3.874 10.35 9.101 11.647Z",
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/shuayeb-hossain-3329b03ab/",
    path: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z",
  },
  {
    name: "WhatsApp",
    href: `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`,
    path: "M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z",
  },
];

const exploreLinks = [
  {href: "/events", label:"Upcoming Events"},
  {href: "/create-events", label:"Create Event"},
  {href: "/manage-events", label:"Manage Events"},
  {href: "/joined-events", label:"Joined Events"},
];

const causeLinks = [
  {type: "Donation", label: "Winter Clothes and Blankets"},
  {type: "Education", label: "Education Support"},
  {type: "Health Camp", label: "Health Camps"},
  {type: "Food Distribution", label: "Food Distribution"},
];

const linkClass =
  "text-sm text-slate-700 transition-colors hover:text-orange-600 dark:text-slate-300 dark:hover:text-orange-400";

  const socialClass =
    "flex h-9 w-9 items-center justify-center rounded-full border border-slate-300 text-slate-700 transition-all duration-200 hover:-translate-y-0.5 hover:border-orange-500 hover:bg-orange-500 hover:text-white dark:border-slate-700 dark:text-slate-300 dark:hover:border-orange-500 dark:hover:bg-orange-500 dark:hover:text-white";

const headingClass =
  "mb-3 text-base font-semibold text-slate-900 dark:text-white";

export function Footer (){
  return (
    <footer className="mt-8 border-t-4 border-orange-500 bg-slate-100 text-slate-700 dark:bg-slate-950 dark:text-slate-300">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:grid-cols-2 lg:grid-cols-4">
        {/* 1. Brand */}
        <div
          className="rounded-xl
        border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900/60 "
        >
          <Link href="/" className="mb-3 flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600 text-white">
              <HandHeart className="h-5 w-5" />
            </span>
            <span className="text-xl font-bold text-slate-900 dark:text-white">
              Give<span className="text-orange-400">Hand</span>
            </span>
          </Link>
          <p className="text-sm leading-6 text-slate-600 dark:text-slate-400">
            GiveHand connects kind-hearted people with those in need. Organize
            winter clothes drives, join community events and spread warmth
            across your city.
          </p>
          <div className="mt-4 flex items-center gap-3">
  {socialLinks.map((social) => (
    <a
      key={social.name}
      href={social.href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`GiveHand on ${social.name}`}
      className={socialClass}
    >
      <svg
        viewBox="0 0 24 24"
        aria-hidden="true"
        className="h-4 w-4"
        fill="currentColor"
      >
        <path d={social.path} />
      </svg>
    </a>
  ))}

  {/* Email */}
  <a
    href="mailto:shuayebhossaineng@gmail.com"
    aria-label="Email GiveHand"
    className={socialClass}
  >
    <Mail className="h-4 w-4" />
  </a>
</div>
        </div>

        {/* 2. Explore Platform */}
        <div className="rounded-xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900/60 p-5">
          <h3 className={headingClass}>Explore Platform</h3>
          <p className="mb-3 text-sm leading-6 text-slate-400">
            Find events near you, host your own and track everything you joined.
          </p>
          <ul className="space-y-2">
            {exploreLinks.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className={linkClass}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* 3. Active Causes */}
        <div className="rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900/60">
          <h3 className={headingClass}>Active Causes</h3>
          <p className="mb-3 text-sm leading-6 text-slate-400">
            Every season brings new needs. Pick a cause that matters to you.
          </p>
          <ul className="space-y-2">
            {causeLinks.map((item) => (
              <li key={item.type}>
                <Link
                  href={`/events?type=${encodeURIComponent(item.type)}`}
                  className={linkClass}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* 4. Community Spirit */}
        <div className="rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900/60">
          <h3 className={headingClass}>Community Spirit</h3>
          <p className="mb-3 text-sm leading-6 text-slate-400">
            Small acts of kindness add up. Together we can make every winter
            warmer for families who need it most.
          </p>
          <ul className="space-y-2 text-sm text-slate-700 dark:text-slate-300">
            <li className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-orange-400" />
              Dhaka, Bangladesh
            </li>
            <li className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-orange-400" />
              shuayebhossaineng@gmail.com
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-slate-200 dark:border-slate-800 py-4 text-center text-xs text-slate-500">
        &copy; {new Date().getFullYear()} GiveHand. Give a hand, warm a heart.
      </div>
    </footer>
  );
}