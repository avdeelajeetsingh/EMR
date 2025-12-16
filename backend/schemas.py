from pydantic import BaseModel
from datetime import datetime

class AppointmentCreate(BaseModel):
    patient_name: str
    doctor_name: str
    time_slot: datetime
    status: str = "waiting"
    

class AppointmentOut(BaseModel):
    id: str
    patient_name: str
    doctor_name: str
    time_slot: datetime
    queue_number: int
    status: str

    class Config:
        from_attributes = True

class SettingsOut(BaseModel):
    clinic_name: str
    timezone: str
    email_notifications: bool
    sms_reminders: bool
    push_notifications: bool
    business_start: str
    business_end: str
    appointment_duration: int
    two_factor_auth: bool
    session_timeout: bool

    class Config:
        from_attributes = True


class SettingsUpdate(SettingsOut):
    pass
