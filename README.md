# Profile-X

Analyze any X (Twitter) profile — see what they talk about, who they interact with, and how their content performs. A sleek, dark-themed analytics dashboard inspired by X's native analytics and Grok's UI.

> **Demo app** — currently uses mock data. Designed to be extended with the X API.

## Preview

### Landing Page
Minimalist Grok-inspired front page with animated star field, centered search bar, and quick-access example handles.

### Analytics Dashboard
X Analytics-style dashboard with impression charts, follower trends, post/reply breakdowns, and metric cards showing engagement stats with percentage changes.

## Features

- **Grok-style landing** — dark background, star field animation, pill-shaped search input
- **X Analytics dashboard** — bar charts, mini charts, metric cards with ↑↓ change indicators
- **Content categories** — horizontal bar breakdown of post topics
- **Top interactions** — ranked list of most-engaged accounts
- **Time period selector** — 7D / 2W / 4W / 3M / 1Y toggle
- **Responsive** — works on desktop and mobile
- **Fast** — Vite + React 19, sub-100ms builds

## Getting Started

```bash
git clone https://github.com/eryigitsin/profile-x.git
cd profile-x
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) and enter any X handle (e.g. `elonmusk`, `NASA`, `karpathy`).

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server |
| `npm run build` | Type-check + production build |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |

## Tech Stack

- **React 19** + TypeScript
- **Vite 8** — fast HMR and builds
- **Tailwind CSS v4** — utility-first styling via `@tailwindcss/vite`
- CSS custom properties for theming

## Project Structure

```
src/
  App.tsx       — main app (landing page + dashboard)
  index.css     — Tailwind import + CSS variables + animations
  main.tsx      — entry point
```

## License

MIT
