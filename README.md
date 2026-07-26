# Jays Central

A Toronto Blue Jays website built on the MLB Stats API. Features include live game tracking, a full season schedule, 40-man roster, and American League standings.

**[Live Site](https://jays.kcgbarbosa.dev)** · **[Code](https://github.com/kcgbarbosa/jays-central)**

<img width="800" alt="desktop view, game results, player statistics and american league standings table" src="https://github.com/user-attachments/assets/5d8d2f84-4835-42d5-bcfb-6423a59afd77" />

---

## Stack

React 19 + TypeScript | React Router v7 | Vite | Tailwind CSS v4 | Motion | Vitest

---

## Pages

**Home** — featured game card that switches between pre-game, live, and post-game states. Also has stat leaders, standings, and recent results.

**Schedule** — full season schedule, filterable by remaining, completed, spring training, and postseason.

**Roster** — the 40-man roster with search, position filters, sortable columns, additional player profile information.

---

## Architecture

API responses are handled as DTOs (`src/types/dto/`), mapped to flattened domain models (`src/utils/dtoToModelMappers.ts`), and distributed to components through React Context (`src/store/`).

---

## Local Setup

```bash
git clone https://github.com/kcgbarbosa/jays-central.git
cd jays-central
npm install
```

Create a `.env` in the project root:

```
VITE_MLB_BASE_URL=https://statsapi.mlb.com/api/v1
VITE_MLB_MEDIA_BASE_URL=https://www.mlbstatic.com/team-logos
VITE_BLUEJAYS_TEAMID=141
```

Then:

```bash
npm run dev
```

`npm run build` type-checks and builds, `npm test` runs Vitest, `npm run lint` runs ESLint and Prettier.

---

## Connect With Me

**Kevin-Christian Giraldo-Barbosa**

[![LinkedIn](https://img.shields.io/badge/linkedin-%230077B5.svg?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/kcgbarbosa/)
[![Email](https://img.shields.io/badge/Email-D14836?style=for-the-badge&logo=gmail&logoColor=white)](mailto:kcgbarbosa@gmail.com)
