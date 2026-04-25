<div align="center">

<img src="Logo.jpeg" width="120" height="120" style="border-radius: 20px;" alt="ReguVigil Logo"/>

# ReguVigil
### *Regulatory Intelligence. In Real Time.*

**Built at Xypheria Hackathon 2026 · Team: Regu Vigil**

[![Python](https://img.shields.io/badge/Python-3.11-3776AB?style=for-the-badge&logo=python&logoColor=white)](https://python.org)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.110-009688?style=for-the-badge&logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com)
[![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15-336791?style=for-the-badge&logo=postgresql&logoColor=white)](https://postgresql.org)
[![Docker](https://img.shields.io/badge/Docker-Compose-2496ED?style=for-the-badge&logo=docker&logoColor=white)](https://docker.com)
[![Gemini](https://img.shields.io/badge/Gemini-2.5_Flash-4285F4?style=for-the-badge&logo=google&logoColor=white)](https://ai.google.dev)
[![LangGraph](https://img.shields.io/badge/LangGraph-Agentic_Pipeline-FF6B6B?style=for-the-badge)](https://langchain.com)
[![SendGrid](https://img.shields.io/badge/SendGrid-Email_Alerts-1A82E2?style=for-the-badge&logo=twilio&logoColor=white)](https://sendgrid.com)

---

> **The problem:** When the FDA publishes a new safety guideline, pharmaceutical sponsors must manually review PDFs, update their monitoring systems, re-evaluate hundreds of patients, and notify doctors — a process that takes days and is error-prone.
>
> **ReguVigil does it in under 90 seconds. Automatically. With zero human error.**

</div>

---

## 🎬 What It Does

ReguVigil is a **multi-agent AI pharmacovigilance platform** that:

1. **Monitors** FDA, EMA, ICH, CDSCO for new regulatory guideline PDFs — automatically, every 6 hours
2. **Parses** the PDF using Gemini 2.5 Flash and extracts structured monitoring rules (biomarker, threshold, operator) with Pydantic validation
3. **Evaluates** all 500 enrolled trial patients against the new rule in under 60 seconds using async batch processing
4. **Alerts** every responsible doctor and data manager with a rich HTML email listing their flagged patients — automatically, the moment the pipeline completes

---

## ⚡ One-Command Launch

```bash
# Clone and launch the entire stack
git clone https://github.com/akshithjk/reguvigil-xypheria-2026.git
cd reguvigil-xypheria-2026

# Configure environment
cp .env.example .env
# Edit .env with your GEMINI_API_KEY and SENDGRID_API_KEY

# Launch everything (PostgreSQL + FastAPI + React + Scheduler)
docker-compose up -d

# Open the app
open http://localhost:3000
```

That's it. One command. Four containers. Full pharmacovigilance AI system running.

---

## 🤖 The AI Pipeline — 4 Agents, < 90 Seconds

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                        LANGGRAPH AGENTIC PIPELINE                          │
├──────────────┬──────────────┬──────────────────────┬────────────────────────┤
│   AGENT 1    │   AGENT 2    │       AGENT 3        │        AGENT 4         │
│  < 15 sec    │  < 5 sec     │      < 60 sec        │       < 20 sec         │
│              │              │                      │                        │
│ PDF Parser   │ Rule         │ Biomarker            │ PV Escalation          │
│              │ Extractor    │ Sentinel             │ Reporter               │
│ PyMuPDF +    │              │                      │                        │
│ Gemini 2.5   │ Versions old │ Evaluates 500        │ Groups by site →       │
│ Flash        │ rule SUPER-  │ patients in async    │ Emails each doctor     │
│              │ SEDED, inserts│ batches of 50       │ only their patients    │
│ Pydantic     │ new ACTIVE   │ via asyncio.gather   │ via SendGrid           │
│ validation   │ rule to DB   │                      │                        │
│              │              │                      │                        │
│ → extracted_ │ → new_rule_  │ → flagged_patients[] │ → report_id            │
│   rule JSON  │   id (int)   │   [{patient_id,      │   pipeline_status:     │
│   confidence │              │    site_id, value}]  │   COMPLETE             │
│   score      │              │                      │                        │
└──────────────┴──────────────┴──────────────────────┴────────────────────────┘
       ↕               ↕               ↕                       ↕
                   PostgreSQL 15 — Central Data Layer
         patients · biomarker_readings · monitoring_rules · evaluations
                    pipeline_runs · audit_logs · pv_reports
```

**Confidence Guardrail:** If Agent 1 scores < 0.70 confidence on a document (ambiguous thresholds, draft status), it routes to a **Human Review Queue** where Priya manually approves before the pipeline continues. This prevents ambiguous regulatory drafts from automatically changing monitoring rules for 500 patients.

---

## 👥 Role-Based Access — 3 Personas

| Persona | Role | Access | Dashboard |
|---|---|---|---|
| **Priya S.** | Regulatory Affairs | Upload PDFs, trigger pipeline, approve/reject rules | Regulatory Dashboard + Live Pipeline View |
| **Arjun M.** | Data Manager | View all 500 patients, export CSV, site analytics | Data Manager Dashboard + Globe Visualization |
| **Dr. Ramesh K.** | Principal Investigator | Site 3 patients only, HRV trends, safety reports | Doctor Dashboard + 30-day Biomarker Charts |

---

## 🛠️ Tech Stack

| Layer | Technology | Purpose |
|---|---|---|
| **AI/LLM** | Google Gemini 2.5 Flash | PDF rule extraction with structured JSON output |
| **Orchestration** | LangGraph | Multi-agent pipeline state machine |
| **Validation** | Pydantic v2 | Strict schema enforcement on Gemini output |
| **PDF Parsing** | PyMuPDF (fitz) | Extract raw text from uploaded guideline PDFs |
| **Backend** | FastAPI + Uvicorn | Async REST API with JWT authentication |
| **Database** | PostgreSQL 15 + SQLAlchemy Async | 13-table schema, asyncpg connection pool |
| **Frontend** | React 18 + TypeScript + Vite | Role-based dashboards with real-time updates |
| **UI** | Tailwind CSS + Framer Motion | Animated components, glassmorphism |
| **Data Viz** | Recharts + react-globe.gl | HRV trend charts + 3D world site globe |
| **Notifications** | SendGrid API | Automated site-scoped HTML email alerts |
| **Containerization** | Docker Compose | 4-service stack with health checks |
| **State Management** | React Query (TanStack) | Auto-polling pipeline status every 1.5s |

---

## 📁 Project Structure

```
reguvigil-xypheria-2026/
├── backend/
│   ├── main.py                    # FastAPI app, middleware, background tasks
│   ├── core/
│   │   ├── auth.py                # JWT creation & verification (HS256)
│   │   └── middleware.py          # JWT + SiteScope + Audit middleware
│   ├── db/
│   │   ├── database.py            # Async SQLAlchemy engine + session factory
│   │   └── models.py              # 13 table definitions
│   ├── api/
│   │   ├── auth.py                # POST /auth/login
│   │   ├── guidelines.py          # POST /guidelines/upload → triggers pipeline
│   │   ├── patients.py            # GET /patients + CSV export + stats
│   │   ├── pipeline.py            # GET /pipeline/status, /runs, /run/:id
│   │   ├── rules.py               # Rule approve/reject + history
│   │   ├── reports.py             # PV report + PDF download
│   │   └── admin.py               # POST /demo/reset
│   ├── agents/
│   │   ├── pipeline.py            # LangGraph graph definition
│   │   ├── agent1_parser.py       # PyMuPDF + Gemini + Pydantic validation
│   │   ├── agent2_rule_extractor.py  # DB rule versioning
│   │   ├── agent3_sentinel.py     # Async batch patient evaluation
│   │   └── agent4_reporter.py     # SendGrid email + PV report
│   ├── scripts/seed.py            # Seeds 500 patients + 15k biomarker readings
│   └── scheduler/                 # Background regulatory monitoring loop
├── frontend/
│   ├── src/
│   │   ├── App.tsx                # Routes + PrivateRoute guard
│   │   ├── api/
│   │   │   ├── client.ts          # Axios + JWT interceptor + auto-logout
│   │   │   └── queries.ts         # All React Query hooks
│   │   ├── pages/                 # 13 page components
│   │   └── components/            # TopBar, RoleSwitcher
│   └── public/logo.jpeg
├── docker-compose.yml             # 4 services: postgres, backend, frontend, scheduler
├── .env.example                   # Environment variable template
├── CHANGELOG.md                   # Full version history
└── SECURITY.md                    # Security policy
```

---

## 🔐 Environment Variables

```env
# Database
DATABASE_URL=postgresql+asyncpg://postgres:postgres@postgres:5432/reguvigil

# AI
GEMINI_API_KEY=your_gemini_api_key_here

# Authentication
JWT_SECRET_KEY=your_jwt_secret_key_here

# Email Notifications
SENDGRID_API_KEY=your_sendgrid_api_key_here
SENDGRID_FROM_EMAIL=your_verified_sender@email.com
SENDGRID_TO_DOCTOR=doctor@email.com
SENDGRID_TO_DATAMANAGER=datamanager@email.com
```

---

## 🏥 Clinical Context

**Trial:** GlucoZen Phase III — Novel oral hypoglycemic agent
**Patients:** 500 enrolled across 5 hospital sites in India
**Biomarkers Monitored:** HRV_SDNN (ms) · Heart_Rate (bpm) · SpO2 (%)
**Regulatory Sources:** FDA CDER · EMA CHMP · ICH · CDSCO

---

## 📧 Automated Alert System

When patients are flagged AT_RISK, ReguVigil automatically sends:

- **Doctor Alert** — scoped to their hospital site only. Dr. Ramesh K. sees only Apollo Chennai patients, not patients from other hospitals.
- **Data Manager Alert** — full cross-site summary for regulatory compliance.

Both emails arrive within seconds of Agent 4 completing, with no manual trigger required.

---

## 📊 Demo Credentials

| Username | Role | Dashboard URL |
|---|---|---|
| `priya` | Regulatory Affairs | `/dashboard/regulatory` |
| `arjun` | Data Manager | `/dashboard/datamanager` |
| `ramesh` | Doctor / PI | `/dashboard/doctor` |

> No password required — this is a demo environment.

---

## 🔄 Reset Demo

Click the **RESET DEMO** button in the top navigation bar to instantly wipe and re-seed all 500 patients, biomarker readings, rules, and pipeline state. Uses `TRUNCATE CASCADE` (not DROP) to preserve asyncpg connection pool OID cache.

---

<div align="center">

**Built with ❤️ for Xypheria Hackathon 2026**

*ReguVigil — From Guideline Published to Patient Protected in < 90 Seconds*

</div>
