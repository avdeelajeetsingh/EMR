# 🏥 EMR & Appointment Management System

A full-stack **Electronic Medical Records (EMR) and Appointment Management System** designed to manage patient records, appointment scheduling, live queue display, dashboards, and report generation.

---

## 🚀 Features

- 📅 Appointment Scheduling & Management
- 🧑‍⚕️ Patient Records Management
- ⏱ Live Queue Display
- 📊 Analytics Dashboard (appointments, status, modes, doctors)
- 📄 Report Generation (daily, weekly, workload, cancellations)
- 🎨 Modern UI with Tailwind CSS
- ⚡ Real-time UI state updates

---

## 🧱 Tech Stack

### Frontend
- **React (Vite)**
- **TypeScript**
- **Tailwind CSS**
- Lucide Icons

### Backend (Local Environment)
- **Python (FastAPI)**
- **PostgreSQL**
- SQLAlchemy / psycopg2

### Deployment
- **Frontend:** Vercel
- **Backend:** Local (FastAPI + PostgreSQL)

---

## 🗂 Project Structure

```
EMR-MAIN/
├── api/ # Vercel serverless API routes (Node.js)
│ ├── appointments.js
│ ├── patients.js
│ ├── queue.js
│ ├── health.js
│ └── reports/
├── backend/ # FastAPI backend (local execution)
│ ├── main.py
│ ├── database.py
│ ├── models.py
│ ├── schemas.py
│ └── requirements.txt
├── src/
│ ├── components/
│ ├── pages/
│ ├── services/
│ ├── types/
│ └── App.tsx
└── README.md
```

---

## 🧪 Local Setup (Fully Functional)

### 1️Backend (FastAPI + PostgreSQL)

```bash
cd backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
uvicorn main:app --reload
```
### 2 Frontend

```bash
npm install
npm run dev
```

➡️ When running locally, the application successfully connects to PostgreSQL and displays live data across:

Dashboard
Appointments
Queue Display
Patients
Reports


🌐 Deployment Notes (Important)

The project frontend is deployed on Vercel to meet the assessment requirement:

🔗 Live URL:
https://emr-seven-pi.vercel.app/

⚠️ Backend Limitation on Vercel

Vercel primarily supports serverless Node.js functions and does not natively support long-running Python services (FastAPI) or persistent PostgreSQL connections.
As a result:
The FastAPI + PostgreSQL backend cannot be hosted directly on Vercel
Live database data is not rendered in the deployed version
All backend logic and database functionality has been fully verified locally
If required, the application can be deployed on alternative platforms (e.g., Railway, Render, Fly.io, VPS) to provide a fully functional, database-backed live version.