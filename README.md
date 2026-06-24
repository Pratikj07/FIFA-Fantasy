# ⚽ FIFA World Cup 2026 Predictor

Live scores · Match predictions · Tournament bracket · Real multiplayer leaderboard

---

## 🚀 Deploy on Vercel (via GitHub)

1. Push this repo to GitHub
2. Go to [vercel.com](https://vercel.com) → **Add New Project → Import Git Repository**
3. Framework: **Vite** is auto-detected
4. Add these **Environment Variables** in Vercel project settings:

| Variable | Where to get it |
|---|---|
| `FOOTBALL_API_KEY` | [football-data.org/client/register](https://www.football-data.org/client/register) (free) |
| `VITE_SUPABASE_URL` | Supabase → Project Settings → API → Project URL |
| `VITE_SUPABASE_ANON_KEY` | Supabase → Project Settings → API → anon public key |

5. Click **Deploy** — done ✅

> After adding env vars, trigger a redeploy from Vercel dashboard so they take effect.

---

## 🗄️ Supabase Setup

### Step 1 — Create free account
[supabase.com](https://supabase.com) → New project (free tier)

### Step 2 — Run this SQL in SQL Editor

```sql
create table public.profiles (
  id uuid references auth.users on delete cascade primary key,
  username text unique not null check (length(username) between 2 and 20),
  avatar text not null default '⚽',
  created_at timestamptz default now()
);

create table public.predictions (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles on delete cascade not null,
  match_id text not null,
  home_score smallint not null,
  away_score smallint not null,
  saved_at timestamptz default now(),
  unique(user_id, match_id)
);

create table public.bracket_picks (
  user_id uuid references public.profiles on delete cascade primary key,
  picks jsonb not null default '{}',
  third_picks jsonb not null default '{}',
  updated_at timestamptz default now()
);

alter table public.profiles      enable row level security;
alter table public.predictions   enable row level security;
alter table public.bracket_picks enable row level security;

create policy "Anyone reads profiles"     on public.profiles      for select using (true);
create policy "Own profile"               on public.profiles      for all    using (auth.uid() = id);
create policy "Anyone reads predictions"  on public.predictions   for select using (true);
create policy "Own predictions"           on public.predictions   for all    using (auth.uid() = user_id);
create policy "Anyone reads brackets"     on public.bracket_picks for select using (true);
create policy "Own bracket"               on public.bracket_picks for all    using (auth.uid() = user_id);
```

### Step 3 — Disable email confirmation
Supabase → **Authentication → Email** → turn OFF **"Confirm email"**

---

## 🧑‍💻 Local Development

```bash
npm install
cp .env.example .env    # fill in your 3 keys
npm run dev             # http://localhost:3000
```

The dev server proxies `/api/scores` to football-data.org using your local `FOOTBALL_API_KEY`.

---

## 👑 Admin — View All User Data
Supabase dashboard → **Table Editor**:
- `profiles` — all registered users + avatars
- `predictions` — every prediction by every user
- `bracket_picks` — full tournament brackets

---

## ✨ Features

| | |
|---|---|
| 🔐 Auth | Register + Login with username & password · auto login on return |
| 📺 Live Scores | Real-time scores · Today tab respects your local timezone |
| 🎯 Predictions | Today / Upcoming / All · sorted by schedule (Matchday 1→2→3) |
| 🏆 Bracket | Groups → R32 → R16 → QF → SF → Final · locks June 17 midnight ET |
| 🥇 Leaderboard | All real users ranked by actual prediction scores from Supabase |
| 🤖 AI Analysis | Full tactical breakdown per match · no API key needed |

## Points
| | pts |
|---|---|
| Exact score | 5 |
| Correct goal difference | 3 |
| Correct result | 2 |
| Wrong | 0 |
