# Vespera SAT — Setup & Configuration Guide

This internal configuration manual details environment provisioning, database management, and development workflows for the **Vespera SAT** platform.

---

## 📋 System Prerequisites

* **Runtime:** Node.js `>= 20.0.0` (Tested on Node.js v24 LTS)
* **Package Manager:** `npm` `>= 10.0.0`
* **Database:** PostgreSQL `>= 15.0` (Production runs on serverless [Neon PostgreSQL](https://neon.tech))
* **Environment:** Compatible with Windows (PowerShell/CMD), macOS (Zsh/Bash), and Linux

---

## ⚙️ Environment Variables Configuration

Create a `.env` file in the project root (`C:\dev\vespera\.env`):

```env
# Production / Serverless Neon PostgreSQL Database
DATABASE_URL="postgresql://<user>:<password>@<neon-host>/neondb?sslmode=require"

# Local Fallback Connection (Optional for offline dev)
# DATABASE_URL="postgresql://postgres:postgres@localhost:5432/vespera"

# Google Gemini AI Copilot & Mentor Key
GEMINI_API_KEY="your-google-gemini-api-key"
GOOGLE_API_KEY="your-google-gemini-api-key"

# Production & Local Canonical URL
NEXT_PUBLIC_SITE_URL="http://localhost:3000"
```

> [!IMPORTANT]
> The database connection string must include `sslmode=require` when connecting to Neon cloud endpoints.

---

## 🗄️ Database Architecture & Prisma 7 Setup

Vespera uses **Prisma 7** with direct configuration via `prisma.config.ts` and `prisma/schema.prisma`.

### 1. Validate Prisma Schema
```bash
node ./node_modules/prisma/build/index.js validate
```

### 2. Generate Prisma Client
```bash
node ./node_modules/prisma/build/index.js generate
```

### 3. Verify Database Integrity & Audits
Run the automated question bank verification suite to ensure all 1,847 questions and relations are intact:
```bash
node scripts/verify_audit_fixes.js
```

---

## 🚀 Development & Build Workflows

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```
The server will boot with **Turbopack** and be accessible at:
👉 **[http://localhost:3000](http://localhost:3000)**

### 3. Production Build & Static Generation
```bash
npm run build
```
Generates 43 pre-rendered static (SSG) and dynamic server-rendered (SSR) routes.

### 4. Run Production Server
```bash
npm run start
```

---

## 📂 Key Project Directories

```
vespera/
├── prisma/
│   └── schema.prisma        # Database models (User, Question, Topic, ErrorLog, MockExam)
├── prisma.config.ts         # Prisma 7 configuration file
├── public/
│   └── materials/           # 61 SATashkent physical PDF textbooks (7,000+ pgs)
├── scripts/
│   ├── apply_question_fixes_and_svgs.js  # Precision vector SVG and answer patcher
│   ├── comprehensive_question_audit.js   # 1,847 questions audit engine
│   └── verify_audit_fixes.js             # QA and schema integrity validator
└── src/
    ├── app/                 # Next.js App Router (Dashboard, Math, Verbal, Mock, Profile)
    │   ├── api/             # REST endpoints (Copilot, Progress, Error Log, Stats, Auth)
    │   ├── globals.css      # Design tokens, keyframe animations, shimmer skeletons
    │   └── loading.tsx      # Global route transition skeleton loader
    ├── components/
    │   ├── skeletons/       # Comprehensive shimmer skeleton components
    │   ├── analytics/       # Student radar & domain mastery charts
    │   ├── mock/            # 1:1 Bluebook exam simulator & results analyzer
    │   ├── QuestionCard.tsx # Core SAT question interactive card
    │   ├── KaTeXMath.tsx    # High-performance KaTeX math formula renderer
    │   └── DesmosCalculator.tsx # Official Desmos Graphing Calculator API wrapper
    └── lib/
        ├── prisma.ts        # Singleton Prisma Client instance
        ├── curriculum-data.ts # Official College Board 4-domain taxonomy
        └── mock-storage.ts  # Client-side session and offline progress cache
```

---

## 🧪 Maintenance & Troubleshooting

* **Neon Connection Timeouts:** Serverless Neon databases pause after periods of inactivity. The connection pooling configuration (`ep-...-pooler`) includes automatic wake-up retries.
* **Math Delimiter Rendering:** When authoring new questions, ensure literal currency amounts are escaped as `\$` (e.g. `\$45.00`) to prevent collision with KaTeX inline formula delimiters (`$...$`).
