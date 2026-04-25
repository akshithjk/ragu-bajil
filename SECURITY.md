# Security Policy

## Overview

ReguVigil handles simulated clinical trial patient data in a pharmacovigilance context.
This security policy describes how sensitive data is handled and how to report vulnerabilities.

## Data Classification

| Data Type | Sensitivity | Handling |
|---|---|---|
| Patient biomarker readings | HIGH — simulated PHI | Scoped by `site_id`, never exposed cross-role |
| JWT tokens | HIGH | HS256 signed, 8hr expiry, localStorage only |
| SendGrid API key | HIGH | `.env` only, never committed to repository |
| Gemini API key | HIGH | `.env` only, never committed to repository |
| Pipeline logs | MEDIUM | Internal only, not exposed via public API |
| Audit logs | MEDIUM | Retained for all POST/PUT/DELETE actions |

## Access Control Design

### Role Enforcement

ReguVigil implements a three-layer access control stack:

1. **JWTMiddleware** — validates Bearer token on every request, attaches decoded user payload to `request.state`
2. **SiteScopeMiddleware** — for `DOCTOR` role, attaches `site_id` to request state so patient queries are automatically filtered
3. **AuditMiddleware** — logs every mutating request (POST/PUT/PATCH/DELETE) with the acting user's identity

### Data Isolation

- `DOCTOR` users can ONLY access patients where `patient.site_id == user.site_id`
- `DATA_MANAGER` users can access all patients but cannot access doctor profiles or site-specific PII
- `REGULATORY_AFFAIRS` users can access guidelines and pipeline state but have no access to individual patient PHI

## Environment Variables

**Never commit the following to version control:**

```
GEMINI_API_KEY
SENDGRID_API_KEY
SENDGRID_FROM_EMAIL
SENDGRID_TO_DOCTOR
SENDGRID_TO_DATAMANAGER
JWT_SECRET_KEY
DATABASE_URL
```

All secrets are managed via `.env` which is listed in `.gitignore`.
The `.env.example` file contains placeholder values only and is safe to commit.

## Demo Environment Notice

This repository is a **hackathon demonstration**. All patient data is synthetically generated.
No real patient data, PHI, or clinical trial data is stored in this system.

## Reporting a Vulnerability

If you discover a security vulnerability in this codebase, please contact the team directly
rather than opening a public GitHub issue.

**Contact:** Team ReguVigil · Xypheria Hackathon 2026

---

*This security policy is aligned with HIPAA data handling principles and FDA 21 CFR Part 11 audit trail requirements, implemented as a demonstration of regulatory-grade system design.*
