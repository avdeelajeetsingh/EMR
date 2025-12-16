from sqlalchemy import Column, String, DateTime, Integer
from database import Base
import uuid
from datetime import datetime

class Appointment(Base):
    __tablename__ = "appointments"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    patient_name = Column(String, nullable=False)
    doctor_name = Column(String, nullable=False)
    time_slot = Column(DateTime, nullable=False)
    queue_number = Column(Integer, nullable=False)
    status = Column(String, default="waiting")
    created_at = Column(DateTime, default=datetime.utcnow)

from sqlalchemy import Column, String, Boolean, Integer
from database import Base

class AppSettings(Base):
    __tablename__ = "app_settings"

    id = Column(Integer, primary_key=True, default=1)
    clinic_name = Column(String, default="Healthcare Clinic")
    timezone = Column(String, default="America/New_York")

    email_notifications = Column(Boolean, default=True)
    sms_reminders = Column(Boolean, default=True)
    push_notifications = Column(Boolean, default=False)

    business_start = Column(String, default="08:00")
    business_end = Column(String, default="18:00")
    appointment_duration = Column(Integer, default=30)

    two_factor_auth = Column(Boolean, default=False)
    session_timeout = Column(Boolean, default=True)
