# HEMA Longsword Tracker — Project Summary

## What This Is
A mobile-first PWA (Progressive Web App) for a HEMA longsword training client to track his daily workouts on his iPhone. Built as a companion to a structured training program designed around his specific bottleneck: upper body muscular endurance (grip, shoulders, forearms) — not cardio.

## Client Profile
- 44 years old, 5'7", ~145 lbs, desk job
- Low upper body strength — winded after 3-4 min of sword work (localized fatigue, not cardiovascular)
- Intermittent lower back pain from sitting (weak glutes, tight hip flexors)
- Has a 4.5-year-old son (integrated into training)
- Attends 1-hour HEMA longsword class most Sundays
- Trains daily, needs efficient workouts

## Program Structure
- **C-B-C-A-B-C weekly schedule** (Mon-Sat), Sunday is class day
- **Day A:** Grip, shoulders, sword cardio (primary focus — morning strength + evening sword intervals)
- **Day B:** Posterior chain, core, back pain prevention (morning strength + evening carries/stretching)
- **Day C:** Active recovery & mobility (single block, great with son)
- **Sunday:** Class day (prehab only before class) or full Day A if no class
- 3 recovery days/week, every strength day sandwiched by recovery
- Grip loading pattern: heavy on Day A + Sunday, light on Day C, rest on Day B

## App Architecture
All files in `~/Documents/hema/app/`:

| File | Purpose |
|------|---------|
| `index.html` | Shell — loads CSS and JS |
| `style.css` | Mobile-first dark theme UI |
| `data.js` | Exercise definitions, schedule, progression targets, descriptions |
| `store.js` | localStorage CRUD, date utilities, stats calculations, export/summary generation |
| `app.js` | UI rendering (home, workout, history, share pages), event binding, navigation |
| `manifest.json` | PWA manifest for Add to Home Screen |
| `sw.js` | Service worker for offline caching |
| `icon-192.png` | PWA icon (192×192) |
| `icon-512.png` | PWA icon (512×512) |

## Key Design Decisions
- **No backend/server** — all data in localStorage on the client's phone
- **No framework** — vanilla JS, single-page app with manual routing
- **Exercises expand on tap** — shows input fields (sets, reps, seconds, weight)
- **Quick-complete circles** — tap the checkmark circle to auto-fill recommended values from the target string; tap again to clear (undo)
- **"How to do this" toggle** — expandable description with form cues for each exercise
- **Auto-save** — every input change writes to localStorage immediately
- **Sunday attend toggle** — "Yes" shows prehab exercises with individual tracking + class log; "No" shows full Day A workout
- **Share page** — generates human-readable progress summary, exports JSON or CSV via iOS share sheet
- **Date strings use `T12:00:00` suffix** — prevents timezone bugs where UTC midnight shifts the day backward in western timezones
- **Workout renderer uses helper functions** — `renderExerciseList()` and `renderMetaBlock()` are reused for normal days and Sunday's conditional Day A rendering
- **Dead bugs replace McGill curl-up** — neck strain protection, tracked per-side (L/R)
- **Energy tracked as before/after** — two fields instead of one, to measure session drain
- **Neck soreness tracking** — added to all session notes and home page weekly stats

## Hosting
Hosted on GitHub Pages. Client opens the link in Safari → Share → Add to Home Screen. Works offline after first load.

## Source Training Documents
All in `~/Documents/hema/`:

| File | Purpose |
|------|---------|
| `HEMA_session_notes.md` | Full session notes — client profile, program design rationale, version history, reassessment plan |
| `HEMA_Day_A.md` | Printable Day A sheet with exercise descriptions |
| `HEMA_Day_B.md` | Printable Day B sheet with exercise descriptions |
| `HEMA_Day_C.md` | Printable Day C sheet with exercise descriptions, Sunday protocol, weekly schedule, progression guide |
| `HEMA_Track_Day_A.md` | 2-week paper tracking sheet for Day A |
| `HEMA_Track_Day_B.md` | 2-week paper tracking sheet for Day B |
| `HEMA_Track_Day_C.md` | 2-week paper tracking sheet for Day C + Sunday class log |

## Next Steps / Known TODOs
- **Progression charts** — visual graphs of sword interval duration, dead hang times, push-up progression over weeks
- **Timer integration** — built-in countdown timer for sword intervals, dead hangs, plank holds
- **Program update mechanism** — when the program changes at reassessment (next session ~April 18), update `data.js` with new exercises/targets
- **Notification/reminder** — could add push notification reminders for morning/evening blocks
- **Week-over-week comparison** — show trends on the home page (this week vs last week)
- **Dark/light theme toggle** — currently dark only
- **Better icons** — the generated PNG icons are minimal; could replace with designed assets

## Session History
- **April 4, 2026:** Initial build. Created full PWA with 4 pages (home, workout, history, share). Fixed timezone bug where `new Date('YYYY-MM-DD')` parsed as UTC and showed wrong day in Pacific time. Deployed to GitHub Pages.
- **April 5, 2026:** v9 program update. Replaced McGill curl-up with dead bugs (neck strain from Day 1). Reduced all starting volumes across every day type. Energy tracking changed from single number to before/after. Added neck soreness tracking to all session notes and home page stats. Foam rolling made optional on Day C. Sword intervals reduced to 3 rounds. Service worker updated to v2 with cache purge for auto-update. All "work up to" targets added to exercise descriptions. Refactored workout renderer into `renderExerciseList()` and `renderMetaBlock()` helpers. Sunday (Day S) now shows attend/no-attend toggle — "Yes" renders prehab exercises with individual tracking, "No" renders full Day A workout. Added quick-complete: tapping the circle checkmark auto-fills recommended sets/reps/seconds from the target string (parsed via `parseTarget()`). Tapping again clears the data (undo accidental taps). Grip strong field now shows for both Day A and Sunday.
