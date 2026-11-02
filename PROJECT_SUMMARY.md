# Classgrid – Project Summary

Classgrid is an education / classroom management platform (multi-organization SaaS) for institutes. It serves four roles: Super Admin, Org Admin, Faculty and Student.

## Tech Stack

- Backend: Node.js (ES modules) + Express 4
- Database: MongoDB via Mongoose (serverless-safe cached connection in `config/db.js`), plus Supabase (chat / classroom messages, SQL migrations in root `SUPABASE_*.sql`)
- Auth: JWT (httpOnly cookie), Passport (local, Google, GitHub, Facebook, LinkedIn OAuth), email verification, forgot / reset / force-reset password, device verification
- Storage: AWS S3 + CloudFront (`src/services/s3-storage.service.js`)
- Email: AWS SES / Nodemailer / Resend with a queued email job system (`src/services/email-queue.service.js`)
- Payments: Razorpay (webhook at `/api/payments/webhook`, raw body for signature check)
- Notifications: Firebase Admin (push / FCM)
- AI: OpenAI, Anthropic, Google GenAI, Groq, Hugging Face SDKs (notes summarisation, chat)
- Frontend: static HTML / CSS / JS pages in `public/`
- Mobile: Android WebView wrapper in `android-wrapper/`

## Project Structure

```
api/index.js        Express app (routes, middleware, page routing) – Vercel entry
server.js           Local / PM2 entry (loads env.js, starts app on PORT)
config/db.js        MongoDB connection
src/config/         Plan config, Supabase client
src/controllers/    auth, googleAuth, admin, admin-analytics, organization, payment, demo
src/middleware/     auth, classroom, plan limits, rate limiter, validation, metrics
src/models/         User, Organization, Classroom, Attendance, Quiz, Marks, Exam, Notification, logs, etc.
src/routes/         API route modules (see below)
src/services/       email, S3, Firebase, Google, GPS, marks, notes AI, payments, audit log, file parser
public/             Frontend pages (login, dashboards, classrooms, notes, attendance, marks, settings)
scripts/, scratch/  Seeding, maintenance and test scripts
```

## API Routes

`/api/auth`, `/api/user`, `/api/chat`, `/api/notifications`, `/api/notes`, `/api/classrooms` (alias `/api/classroom`), `/api/activity`, `/api/messages`, `/api/classroom-chat`, `/api/organization` (alias `/api/org`), `/api/admin`, `/api/demo`, `/api/digest`, `/api/payments`, `/api/attendance`, `/api/cron`, `/api/quiz`, `/api/marks`, plus `/api/health` and `/api/config`.

## Main Features

- Organization onboarding, org codes, plans (free / pro) with plan-limit middleware
- Classrooms with membership, classroom chat and announcements
- Attendance sessions with GPS / device checks and monthly reports
- Quizzes, marks / exam records and student performance views
- Notes upload with AI summaries
- Notifications (push + email digest)
- Super Admin dashboard with analytics, audit logs and impersonation logs

## Deployment

- `vercel.json`: builds `api/index.js` with `@vercel/node`, rewrites all paths to it, and includes `src/`, `config/`, `public/`, `env.js`.
- Vercel crons: classroom chat cleanup (daily 00:00), daily digest (06:00), email queue processing (06:30).
- Alternative: PM2 cluster mode via `ecosystem.config.cjs` (`npm start` runs `server.js`).

## Environment Variables (names only)

`MONGO_URI`, `JWT_SECRET`, `COOKIE_SECRET`, `FRONTEND_URL`, `BACKEND_URL`, `NODE_ENV`, `PORT`, `SUPER_ADMIN_EMAIL`, `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, `AWS_SES_SMTP_HOST`, `AWS_SES_SMTP_USER`, `AWS_SES_SMTP_PASS`, `AWS_SES_SENDER_EMAIL`, `AWS_SES_SENDER_NAME`, `AWS_S3_ERP_ACCESS_KEY`, `AWS_S3_ERP_SECRET_KEY`, `AWS_S3_ERP_BUCKET_NAME`, `AWS_CLOUDFRONT_ERP_DOMAIN`, `BREVO_API_KEY`, `NEXT_PUBLIC_RECAPTCHA_SITE_KEY`

Values live only in `.env` (git-ignored) and the hosting environment settings.

## Run Locally

```
npm install
npm start
```
