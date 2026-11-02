# Classgrid ERP — Repo Summary

**What it is:** The Classgrid school-management platform (the ERP). It handles organizations (schools/colleges), users, roles, classrooms, and the full admin/faculty/student experience. Note: the ERP is currently paused — Classgrid is shipping only its AI agent right now.

## Roles
- **Super Admin** — runs the whole platform (`/superadmin/login` → `/super-admin-dashboard`).
- **Org Admin** — runs one school (`/admin/login` → `/org/:name/admin`).
- **Faculty** — teachers (`/login` faculty tab → `/faculty/dashboard`).
- **Student** — learners (`/login` → `/student/dashboard` or `/classroom`).

## Architecture
- **Frontend:** static HTML/JS pages served from Vercel, with a single `/(.*) → /api/index.js` catch-all rewrite.
- **Backend:** Node.js + Express + MongoDB (Mongoose), with Supabase for chat/classroom data.
- **Auth:** JWT in an httpOnly cookie; email/password plus Google, GitHub, Facebook, LinkedIn OAuth.

## Key areas
- **Auth flow** — signup (init → verify token → complete), login, logout, forgot/reset password, force reset, OAuth callbacks.
- **Admin API** — approve/reject/suspend/block/reactivate organizations, manage users, faculty limits, reset admin passwords.
- **Org API** — apply, verify code, add/remove faculty, reset faculty passwords.
- **Database** — `Organization` (code, honorCode, status, owner) and `User` (status enum incl. `blocked`, resetPasswordToken) models, with indexes on the hot fields.
- **Supabase migrations** — `INIT_SUPABASE_NEW_PROJECT.sql`, chat and classroom migrations, user avatar.

## Environment (`.env`)
```
MONGO_URI, JWT_SECRET, FRONTEND_URL, BACKEND_URL,
BREVO_API_KEY, SUPER_ADMIN_EMAIL,
GOOGLE_CLIENT_ID/SECRET, NODE_ENV
```

## Golden rules
- Never hardcode production domains — always `process.env.FRONTEND_URL` with a `classgrid.in` fallback.
- `localhost` is only a dev shortcut inside `getApiBase()`; production always falls through to `origin + '/api'`.
- Keep tenant/institutional pages separate from the marketing site; block legacy pages via `redirects`.
- Never delete env vars; production-first.

---

*This is a human-readable overview. See `STABILITY_AUDIT.md` for the full role-by-role and route-by-route audit.*