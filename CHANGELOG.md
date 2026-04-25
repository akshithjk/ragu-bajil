# Changelog

All notable changes to ReguVigil are documented here.
Format follows [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

---

## [v1.0.0] — 2026-04-25 · Xypheria Hackathon Release 🏆

### 🚀 Added — Core AI Pipeline
- **LangGraph multi-agent orchestration** — 4 agents chained via typed state graph
- **Agent 1 (Regulatory Parser):** PyMuPDF + Gemini 2.5 Flash with dual Pydantic schema validation (`_GeminiSchema` strict + `GuidelineExtraction` flexible)
- **Agent 2 (Rule Extractor):** Semantic versioning of monitoring rules (Minor/Major), automatic SUPERSEDED status on old rules, full audit trail
- **Agent 3 (Biomarker Sentinel):** Async evaluation of 500 patients in batches of 50 via `asyncio.gather` — evaluates HRV_SDNN, Heart_Rate, SpO2 against live rule threshold
- **Agent 4 (PV Escalation Reporter):** Site-scoped automated SendGrid email alerts — doctors receive only their hospital's flagged patients

### 🔐 Added — Authentication & Authorization
- JWT HS256 authentication with 8-hour token expiry
- Three-layer middleware: JWTMiddleware → SiteScopeMiddleware → AuditMiddleware
- Role-based route protection: REGULATORY_AFFAIRS · DATA_MANAGER · DOCTOR
- Doctor site-scoping: Dr. Ramesh can only access `site-3` patient data

### 🗄️ Added — Database
- PostgreSQL 15 with SQLAlchemy Async ORM + asyncpg driver
- 13-table normalized schema: users, trials, trial_sites, patients, biomarker_readings, monitoring_rules, guidelines, patient_evaluations, pv_reports, pipeline_runs, pipeline_agent_status, pipeline_logs, audit_logs
- Seed script: 500 patients + ~15,000 biomarker readings seeded via `TRUNCATE CASCADE` (safe for asyncpg OID cache)

### 🎨 Added — Frontend
- React 18 + TypeScript + Vite + Tailwind CSS + Framer Motion
- **Login page:** Staggered card entrance animations, logo.jpeg with spring physics, animated radial background accents
- **Regulatory Dashboard:** PDF upload, live pipeline agent status (polling every 1.5s), human review queue, auto-fetch strip with real-time ticking timer
- **Pipeline Live View:** Full-screen animated 4-agent status with terminal log stream
- **Data Manager Dashboard:** Paginated 500-patient table, CSV export, react-globe.gl site visualization, flagged patient counts per site
- **Doctor Dashboard:** 30-day HRV + Heart Rate trend chart (Recharts), patient detail panel, PDF safety report download
- **Rule History:** Complete version history of all monitoring rules with diff view

### 📧 Added — Notification System
- Automated SendGrid HTML email alerts triggered by Agent 4 completion
- Site-scoped routing: each doctor receives only their hospital's flagged patients
- Data Manager receives cross-site summary
- Rich HTML template with patient table, HRV values, and dashboard deep-link

### 🐳 Added — Infrastructure
- Docker Compose 4-service stack: postgres + backend + frontend (nginx) + scheduler
- Background regulatory polling loop simulating FDA/EMA/ICH/CDSCO monitoring (6hr cycle, logged every 2min)
- Pre-baked Gemini fallback results for 5 demo PDFs — pipeline never fails during demo
- One-command launch: `docker-compose up -d`

### 🔧 Fixed
- Replaced `DROP TABLE` + `CREATE TABLE` with `TRUNCATE CASCADE` in reset flow to prevent `asyncpg.exceptions.InvalidCachedStatementError`
- Used `window.history.replaceState` in Reset Demo to strip URL query params before reload — prevents ghost patient ID re-selection
- Removed blocking `window.confirm` from Reset Demo button for smooth presentation flow
- Featured badge repositioned from floating `absolute` to inline card banner — no layout overflow

---

## Development Timeline

| Date | Milestone |
|---|---|
| 2026-04-21 | Project scaffolded — FastAPI + PostgreSQL + SQLAlchemy schema |
| 2026-04-22 | Backend agents complete — LangGraph pipeline functional |
| 2026-04-22 | Frontend screens built — all 8 dashboards implemented |
| 2026-04-23 | Docker containerization — full stack launches with one command |
| 2026-04-24 | Landing page, pipeline animations, pre-baked fallback system |
| 2026-04-25 | SendGrid auto-alerts, login redesign, repo polished for submission |

---

*ReguVigil v1.0.0 · Xypheria Hackathon 2026*
