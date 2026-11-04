<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# GiveHand client

## Commands

- `npm run dev` — dev server at http://localhost:3000 (Turbopack; `experimental.agentFeedback` is on).
- `npm run lint` — ESLint only (no auto-fix). `npx tsc --noEmit` for typecheck — there is no typecheck script.
- `npm run build` / `npm start` — production build/serve.
- No tests, test runner, or CI configured.

## Environment

- `.env.local` (gitignored) is required: `MONGODB_URI`, `BETTER_AUTH_SECRET`, `BETTER_AUTH_URL`, `NEXT_PUBLIC_API_URL`, and optionally `GOOGLE_CLIENT_ID`/`GOOGLE_CLIENT_SECRET` (Google login is only enabled when both are set). Never commit or print their values.
- `NEXT_PUBLIC_API_URL` points to the backend; defaults to `http://localhost:3005` in `.env.local`.

## Client / server split

- This repo is **frontend only**. The Express + MongoDB API is a separate repo in the sibling directory: `../communitykit-server` (run `npm run dev` there for a full-stack setup; it serves on port 3005).
- All backend calls go through `src/lib/api.ts`: use `apiFetch()` (attaches the better-auth JWT as a Bearer token) or `publicFetch()` for unauthenticated endpoints — don't call the backend with raw `fetch`.

## Auth

- better-auth with the MongoDB adapter (database `givehand`) and the JWT plugin. Server-side instance: `src/lib/auth.ts`; client-side: `src/lib/auth-client.ts`. Route handlers live under `src/app/api/auth/[...all]/route.ts`.
- Route protection is in `src/proxy.ts` — in Next.js 16, middleware is named **Proxy** and uses `src/proxy.ts`, not `middleware.ts`. New protected pages must be added to its `config.matcher` (currently `/create-event`, `/manage-events`, `/joined-events`); redirects carry a `?next=` param resolved safely by `src/lib/redirect.ts`.

## UI conventions

- shadcn with the `base-nova` style (see `components.json`): components are built on `@base-ui/react` (Base UI), **not** Radix. Generate components with `npx shadcn add <name>` instead of hand-writing them; aliases are `@/components`, `@/components/ui`, `@/lib`, `@/hooks`.
- Tailwind v4 with zero config file — all theming is CSS-first in `src/app/globals.css` plus `tw-animate-css`.
- React Compiler is enabled (`reactCompiler: true` in `next.config.ts`) — do not add manual `useMemo`/`useCallback` memoization.
- Path alias `@/*` maps to `src/*`.
