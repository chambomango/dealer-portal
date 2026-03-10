# Dealer Performance Analytics Portal

- Injests SQL data into raw transactions DB (simulated with seed script) →
- SQL-based ELT transformations
- Dashboard to display mart data and insights.

## Stack

- **Database:** PostgreSQL (hosted on Neon)
- **API:** Python FastAPI
- **Portal:** Next.js + TypeScript + Tailwind

## Running Locally

### Database

SQL files are in `database/`. Run them against your Neon instance
via the SQL Editor or psql.

### API

```bash
cd api
source venv/bin/activate
uvicorn main:app --reload --port 8000
```

### Portal

```bash
cd portal
npm run dev
```

Portal runs on http://localhost:3000, API on http://localhost:8000.
