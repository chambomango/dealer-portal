# Dealer Performance Analytics Portal

Transaction ingestion →
SQL-based ELT transformations →
executive dashboard with AI insights.

## Stack

- **Database:** PostgreSQL (Neon)
- **API:** Python FastAPI
- **Portal:** Next.js + TypeScript + Tailwind
- **AI:** OpenAI API

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
