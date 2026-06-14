# ⚽ FIFA World Cup 2026 Predictor

Live scores · Match predictions · Tournament bracket · Real multiplayer leaderboard

---

## 🚀 Quick Deploy (Netlify — recommended)

1. Push this project to GitHub
2. Go to [netlify.com](https://netlify.com) → **Add new site → Import from Git**
3. Set build command: `npm run build` · Publish dir: `dist`
4. Add these **Environment Variables** in Netlify dashboard:

| Variable | Value |
|---|---|
| `FOOTBALL_API_KEY` | Your football-data.org API key |
| `VITE_SUPABASE_URL` | Your Supabase project URL |
| `VITE_SUPABASE_ANON_KEY` | Your Supabase anon public key |

5. Deploy — done ✅

---

## 🗄️ Supabase Setup (for user accounts + leaderboard)

### Step 1 — Create free account
Go to [supabase.com](https://supabase.com) → New project (free tier)

### Step 2 — Run this SQL in the Supabase SQL Editor

```sql
-- Profiles table
create table public.profiles (
  id uuid references auth.users on delete cascade primary key,
  username text unique not null check (length(username) between 2 and 20),
  avatar text not null default '⚽',
  created_at timestamptz default now()
);

-- Predictions
create table public.predictions (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles on delete cascade not null,
  match_id text not null,
  home_score smallint not null,
  away_score smallint not null,
  saved_at timestamptz default now(),
  unique(user_id, match_id)
);

-- Bracket picks
create table public.bracket_picks (
  user_id uuid references public.profiles on delete cascade primary key,
  picks jsonb not null default '{}',
  third_picks jsonb not null default '{}',
  updated_at timestamptz default now()
);

-- Row Level Security
alter table public.profiles     enable row level security;
alter table public.predictions  enable row level security;
alter table public.bracket_picks enable row level security;

create policy "Anyone can read profiles"     on public.profiles      for select using (true);
create policy "Users manage own profile"     on public.profiles      for all    using (auth.uid() = id);
create policy "Anyone can read predictions"  on public.predictions   for select using (true);
create policy "Users manage own predictions" on public.predictions   for all    using (auth.uid() = user_id);
create policy "Anyone can read brackets"     on public.bracket_picks for select using (true);
create policy "Users manage own bracket"     on public.bracket_picks for all    using (auth.uid() = user_id);
```

### Step 3 — Disable email confirmation (so users register instantly)
Supabase dashboard → **Authentication → Email** → Turn OFF **"Confirm email"**

### Step 4 — Get your keys
Supabase dashboard → **Project Settings → API** → copy:
- `Project URL` → `VITE_SUPABASE_URL`
- `anon public` key → `VITE_SUPABASE_ANON_KEY`

---

## 📺 Live Scores API Setup

1. Sign up free at [football-data.org/client/register](https://www.football-data.org/client/register)
2. Copy your API token
3. Add as `FOOTBALL_API_KEY` environment variable in Netlify/Vercel
4. **Never put this key in the frontend code** — it runs server-side only

---

## 🧑‍💻 Local Development

```bash
npm install
cp .env.example .env       # fill in your keys
npm run dev                # or: netlify dev (recommended)
```

For local dev with live scores, run:
```bash
npm install -g netlify-cli
netlify dev                # runs app + serverless functions locally
```

---

## 👑 Admin — View All Users & Data
Go to your **Supabase dashboard → Table Editor**:
- `profiles` → all registered users
- `predictions` → every prediction made
- `bracket_picks` → full tournament brackets

---

## ✨ Features
| | |
|---|---|
| 🔐 Login / Register | Username + password · stays logged in · auto-restores session |
| 📺 Live Scores | Real-time from football-data.org · API key hidden server-side · Today tab shows today's matches |
| 🎯 Predictions | Editable until match kicks off · 5 pts exact · 3 pts diff · 2 pts result |
| 🏆 Bracket | Groups → R32 → R16 → QF → SF → Final · Locks June 17 midnight |
| 🥇 Leaderboard | All real users ranked by actual prediction scores |
| 🤖 AI Analysis | Local engine — no API key needed — full tactical breakdown for every match |
