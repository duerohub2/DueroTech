# DueroHub User

Public catalog for Roblox scripts. Read-only, no login.

## Features

- Grid of script cards (2 columns on mobile, up to 4 on desktop)
- Filter by game + search scripts
- Pagination
- Click card -> modal popup with code + copy button
- Keyless/Verified badge on each card
- Dark mode toggle

## Setup

1. Push repo to GitHub
2. Import to Vercel
3. Add environment variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   (same values as admin repo)
4. Deploy

## Tech

- Next.js 14 App Router
- TypeScript strict
- Tailwind CSS
- Supabase (reads from same DB as admin)
