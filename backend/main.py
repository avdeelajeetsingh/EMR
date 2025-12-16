from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI, Depends
from sqlalchemy.orm import Session
from datetime import datetime
from database import Base, engine, SessionLocal
from models import Appointment
from schemas import AppointmentCreate, AppointmentOut
from sqlalchemy import func


app = FastAPI(title="EMR Appointment Service")

# -------------------------
# CORS
# -------------------------
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:8080",
        "http://127.0.0.1:8080",
        "http://localhost:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

Base.metadata.create_all(bind=engine)

# -------------------------
# DB Dependency
# -------------------------
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# -------------------------
# Health Check
# -------------------------
@app.get("/")
def health_check():
    return {"status": "Backend running"}

# -------------------------
# Create Appointment
# -------------------------
@app.post("/appointments", response_model=AppointmentOut)
def create_appointment(
    appointment: AppointmentCreate,
    db: Session = Depends(get_db)
):
    appointment_date = appointment.time_slot.date()

    queue_count = db.query(Appointment).filter(
        Appointment.doctor_name == appointment.doctor_name,
        Appointment.time_slot.between(
            datetime.fromisoformat(f"{appointment_date}T00:00:00"),
            datetime.fromisoformat(f"{appointment_date}T23:59:59"),
        )
    ).count()

    new_appointment = Appointment(
        patient_name=appointment.patient_name,
        doctor_name=appointment.doctor_name,
        time_slot=appointment.time_slot,
        queue_number=queue_count + 1,
        status=appointment.status,
    )

    db.add(new_appointment)
    db.commit()
    db.refresh(new_appointment)

    return new_appointment

@app.get("/appointments/all")
def get_all_appointments(db: Session = Depends(get_db)):
    return db.query(Appointment).all()

# -------------------------
# Get appointments by doctor + date
# -------------------------
@app.get("/appointments/{doctor_name}", response_model=list[AppointmentOut])
def get_appointments_by_doctor(
    doctor_name: str,
    date_str: str,
    db: Session = Depends(get_db)
):
    day_start = datetime.fromisoformat(f"{date_str}T00:00:00")
    day_end = datetime.fromisoformat(f"{date_str}T23:59:59")

    return db.query(Appointment).filter(
        Appointment.doctor_name == doctor_name,
        Appointment.time_slot.between(day_start, day_end)
    ).order_by(Appointment.queue_number).all()

# -------------------------
# Update appointment status
# -------------------------
@app.patch("/appointments/{appointment_id}/status")
def update_status(
    appointment_id: str,
    status: str,
    db: Session = Depends(get_db)
):
    appointment = db.query(Appointment).filter(
        Appointment.id == appointment_id
    ).first()

    if not appointment:
        return {"error": "Appointment not found"}

    appointment.status = status
    db.commit()

    return {"message": "Status updated"}

@app.get("/appointments/dates/{doctor_name}")
def get_appointment_dates(doctor_name: str, db: Session = Depends(get_db)):
    dates = db.query(Appointment.time_slot).filter(
        Appointment.doctor_name == doctor_name
    ).all()

    return list({d[0].date().isoformat() for d in dates})

# -------------------------
# Get ALL appointments (for dashboard, reports, etc.)
# -------------------------
@app.get("/appointments")
def get_all_appointments(db: Session = Depends(get_db)):
    return db.query(Appointment).all()

# -------------------------
# Get all patients (derived from appointments)
# -------------------------
@app.get("/patients")
def get_patients(db: Session = Depends(get_db)):
    rows = db.query(
        Appointment.patient_name,
        func.count(Appointment.id).label("visits"),
        func.max(Appointment.time_slot).label("last_visit")
    ).group_by(Appointment.patient_name).all()

    return [
        {
            "name": r.patient_name,
            "visits": r.visits,
            "last_visit": r.last_visit.date()
        }
        for r in rows
    ]


# -------------------------
# Get patient details
# -------------------------
@app.get("/patients/{patient_name}")
def get_patient_details(patient_name: str, db: Session = Depends(get_db)):
    appointments = db.query(Appointment).filter(
        Appointment.patient_name == patient_name
    ).order_by(Appointment.time_slot.desc()).all()

    return {
        "patient_name": patient_name,
        "total_visits": len(appointments),
        "appointments": appointments
    }

# =========================
# REPORTS
# =========================

@app.get("/reports/daily")
def daily_report(date: str, db: Session = Depends(get_db)):
    day_start = datetime.fromisoformat(f"{date}T00:00:00")
    day_end = datetime.fromisoformat(f"{date}T23:59:59")

    appointments = db.query(Appointment).filter(
        Appointment.time_slot.between(day_start, day_end)
    ).all()

    return {
        "date": date,
        "total_appointments": len(appointments),
        "by_status": {
            "scheduled": sum(a.status == "waiting" for a in appointments),
            "confirmed": sum(a.status == "completed" for a in appointments),
            "cancelled": sum(a.status == "cancelled" for a in appointments),
        },
        "appointments": appointments,
    }


@app.get("/reports/weekly")
def weekly_report(start_date: str, db: Session = Depends(get_db)):
    start = datetime.fromisoformat(f"{start_date}T00:00:00")
    end = start.replace(day=start.day + 6, hour=23, minute=59, second=59)

    rows = db.query(
        Appointment.status,
        func.count(Appointment.id)
    ).filter(
        Appointment.time_slot.between(start, end)
    ).group_by(Appointment.status).all()

    return {
        "start_date": start_date,
        "summary": {status: count for status, count in rows},
    }


@app.get("/reports/doctor-workload")
def doctor_workload(db: Session = Depends(get_db)):
    rows = db.query(
        Appointment.doctor_name,
        func.count(Appointment.id)
    ).group_by(Appointment.doctor_name).all()

    return [{"doctor": d, "appointments": c} for d, c in rows]


@app.get("/reports/cancellations")
def cancellation_report(db: Session = Depends(get_db)):
    rows = db.query(
        Appointment.doctor_name,
        func.count(Appointment.id)
    ).filter(Appointment.status == "cancelled") \
     .group_by(Appointment.doctor_name).all()

    return [{"doctor": d, "cancelled": c} for d, c in rows]

from models import AppSettings
from schemas import SettingsOut, SettingsUpdate

@app.get("/settings", response_model=SettingsOut)
def get_settings(db: Session = Depends(get_db)):
    settings = db.query(AppSettings).first()
    if not settings:
        settings = AppSettings()
        db.add(settings)
        db.commit()
        db.refresh(settings)
    return settings


@app.put("/settings", response_model=SettingsOut)
def update_settings(payload: SettingsUpdate, db: Session = Depends(get_db)):
    settings = db.query(AppSettings).first()
    if not settings:
        settings = AppSettings()
        db.add(settings)

    for key, value in payload.dict().items():
        setattr(settings, key, value)

    db.commit()
    db.refresh(settings)
    return settings
