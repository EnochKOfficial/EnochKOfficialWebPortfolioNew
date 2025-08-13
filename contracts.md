# API Contracts and Integration Plan (Portfolio)

Scope: Replace frontend mock data with FastAPI + MongoDB. Keep graceful fallback to mock when backend is empty/unavailable. Contact form: submit to Formspree AND store a copy in DB.

Base URL
- Frontend: process.env.REACT_APP_BACKEND_URL
- All backend routes are prefixed with /api

Data Shapes
- Profile (not used heavily yet in UI)
  {
    name: string,
    tagline?: string,
    location?: string,
    summary?: string,
    socials?: [{ label: string, href: string }]
  }
- Project
  {
    id: string,
    title: string,
    category?: string,
    blurb?: string,
    details?: string,
    tags?: string[]
  }
- Writing
  { worksInProgress: [{ id: string, title: string, type?: string, status?: string, notes?: string }] }
- Education
  { current: { institution: string, standard?: string, year?: string, notes?: string } }
- ContactMessage (DB only)
  { id: string, name: string, email: string, message: string, created_at: ISOString }

Endpoints
- GET /api/profile → 200 { ...Profile } | 204 empty body when none
- GET /api/projects → 200 Project[] | []
- GET /api/writing → 200 { ...Writing } | { worksInProgress: [] }
- GET /api/education → 200 { ...Education } | { current: null }
- POST /api/contact-messages
  - Req: { name: string, email: string, message: string }
  - Res: 201 { id: string }
- GET /api/contact-messages (optional, admin later) → 200 ContactMessage[]

Frontend Integration
- File: src/lib/api.js
  - getProfile(), getProjects(), getWriting(), getEducation()
  - postContactMessage(payload)
- File: src/components/Portfolio.jsx
  - On mount: fetch profile/projects/writing/education; if any fails/empty, keep existing mock for that section.
  - Contact form: submit to Formspree first, then fire-and-forget postContactMessage. On network failure: fallback to localStorage.

Notes
- No URLs or ports are hardcoded; use REACT_APP_BACKEND_URL.
- Mongo connection uses MONGO_URL (from backend/.env) and DB_NAME already present in env.
- CORS is permissive for frontend.
- We intentionally avoid seeding DB; empty DB returns harmless defaults and UI falls back to mock.