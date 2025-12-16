"""
Appointment Service (appointment_service.py)

This Python module handles appointment scheduling and queue management.
In production:
- This would be a Lambda function
- Data would be fetched from Aurora PostgreSQL
- AppSync/GraphQL would handle the API layer
"""

from datetime import datetime, date
from typing import List, Dict, Optional
from dataclasses import dataclass, field
from enum import Enum
import uuid


class AppointmentStatus(Enum):
    CONFIRMED = "Confirmed"
    SCHEDULED = "Scheduled"
    UPCOMING = "Upcoming"
    CANCELLED = "Cancelled"


class AppointmentMode(Enum):
    IN_PERSON = "In-Person"
    VIDEO = "Video"
    PHONE = "Phone"


@dataclass
class Appointment:
    id: str
    name: str
    date: str  # YYYY-MM-DD format
    time: str  # HH:MM format
    duration: int  # minutes
    doctor_name: str
    status: AppointmentStatus
    mode: AppointmentMode
    reason: Optional[str] = None


# ============================================================================
# MOCK DATA - Simulating Aurora PostgreSQL fetch
# In production: SELECT * FROM appointments WHERE clinic_id = ?
# ============================================================================
mock_appointments: List[Appointment] = [
    Appointment(
        id="apt-001",
        name="Sarah Johnson",
        date="2024-12-13",
        time="09:00",
        duration=30,
        doctor_name="Dr. Emily Chen",
        status=AppointmentStatus.CONFIRMED,
        mode=AppointmentMode.IN_PERSON,
        reason="Annual checkup"
    ),
    Appointment(
        id="apt-002",
        name="Michael Brown",
        date="2024-12-13",
        time="10:30",
        duration=45,
        doctor_name="Dr. James Wilson",
        status=AppointmentStatus.SCHEDULED,
        mode=AppointmentMode.VIDEO,
        reason="Follow-up consultation"
    ),
    Appointment(
        id="apt-003",
        name="Emma Davis",
        date="2024-12-13",
        time="14:00",
        duration=30,
        doctor_name="Dr. Emily Chen",
        status=AppointmentStatus.UPCOMING,
        mode=AppointmentMode.IN_PERSON,
        reason="Vaccination"
    ),
    Appointment(
        id="apt-004",
        name="Robert Martinez",
        date="2024-12-14",
        time="09:30",
        duration=60,
        doctor_name="Dr. Sarah Kim",
        status=AppointmentStatus.SCHEDULED,
        mode=AppointmentMode.IN_PERSON,
        reason="Physical therapy session"
    ),
    Appointment(
        id="apt-005",
        name="Lisa Anderson",
        date="2024-12-14",
        time="11:00",
        duration=30,
        doctor_name="Dr. James Wilson",
        status=AppointmentStatus.UPCOMING,
        mode=AppointmentMode.PHONE,
        reason="Prescription renewal"
    ),
    Appointment(
        id="apt-006",
        name="David Thompson",
        date="2024-12-12",
        time="15:00",
        duration=45,
        doctor_name="Dr. Emily Chen",
        status=AppointmentStatus.CONFIRMED,
        mode=AppointmentMode.VIDEO,
        reason="Mental health check-in"
    ),
    Appointment(
        id="apt-007",
        name="Jennifer White",
        date="2024-12-11",
        time="10:00",
        duration=30,
        doctor_name="Dr. Sarah Kim",
        status=AppointmentStatus.CANCELLED,
        mode=AppointmentMode.IN_PERSON,
        reason="Dermatology consultation"
    ),
    Appointment(
        id="apt-008",
        name="Christopher Lee",
        date="2024-12-15",
        time="13:30",
        duration=45,
        doctor_name="Dr. James Wilson",
        status=AppointmentStatus.SCHEDULED,
        mode=AppointmentMode.IN_PERSON,
        reason="Cardiology checkup"
    ),
    Appointment(
        id="apt-009",
        name="Amanda Garcia",
        date="2024-12-16",
        time="09:00",
        duration=30,
        doctor_name="Dr. Emily Chen",
        status=AppointmentStatus.UPCOMING,
        mode=AppointmentMode.VIDEO,
        reason="Lab results review"
    ),
    Appointment(
        id="apt-010",
        name="Kevin Robinson",
        date="2024-12-10",
        time="16:00",
        duration=60,
        doctor_name="Dr. Sarah Kim",
        status=AppointmentStatus.CONFIRMED,
        mode=AppointmentMode.IN_PERSON,
        reason="Surgery follow-up"
    ),
    Appointment(
        id="apt-011",
        name="Michelle Taylor",
        date="2024-12-13",
        time="16:30",
        duration=30,
        doctor_name="Dr. James Wilson",
        status=AppointmentStatus.SCHEDULED,
        mode=AppointmentMode.PHONE,
        reason="Test results discussion"
    ),
    Appointment(
        id="apt-012",
        name="Daniel Harris",
        date="2024-12-17",
        time="11:30",
        duration=45,
        doctor_name="Dr. Emily Chen",
        status=AppointmentStatus.UPCOMING,
        mode=AppointmentMode.IN_PERSON,
        reason="Orthopedic evaluation"
    ),
    # Additional dummy data
    Appointment(
        id="apt-013",
        name="Patricia Moore",
        date="2024-12-13",
        time="08:00",
        duration=30,
        doctor_name="Dr. Sarah Kim",
        status=AppointmentStatus.CONFIRMED,
        mode=AppointmentMode.IN_PERSON,
        reason="Routine blood work"
    ),
    Appointment(
        id="apt-014",
        name="William Clark",
        date="2024-12-14",
        time="14:30",
        duration=45,
        doctor_name="Dr. Emily Chen",
        status=AppointmentStatus.SCHEDULED,
        mode=AppointmentMode.VIDEO,
        reason="Diabetes management"
    ),
    Appointment(
        id="apt-015",
        name="Nancy Lewis",
        date="2024-12-15",
        time="10:00",
        duration=30,
        doctor_name="Dr. James Wilson",
        status=AppointmentStatus.UPCOMING,
        mode=AppointmentMode.IN_PERSON,
        reason="Allergy consultation"
    ),
    Appointment(
        id="apt-016",
        name="Thomas Walker",
        date="2024-12-16",
        time="15:30",
        duration=60,
        doctor_name="Dr. Sarah Kim",
        status=AppointmentStatus.SCHEDULED,
        mode=AppointmentMode.IN_PERSON,
        reason="Physical examination"
    ),
    Appointment(
        id="apt-017",
        name="Elizabeth Hall",
        date="2024-12-17",
        time="09:30",
        duration=30,
        doctor_name="Dr. Emily Chen",
        status=AppointmentStatus.UPCOMING,
        mode=AppointmentMode.PHONE,
        reason="Medication review"
    ),
    Appointment(
        id="apt-018",
        name="James Young",
        date="2024-12-10",
        time="11:00",
        duration=45,
        doctor_name="Dr. James Wilson",
        status=AppointmentStatus.CONFIRMED,
        mode=AppointmentMode.VIDEO,
        reason="Gastroenterology follow-up"
    ),
    Appointment(
        id="apt-019",
        name="Barbara King",
        date="2024-12-11",
        time="14:00",
        duration=30,
        doctor_name="Dr. Sarah Kim",
        status=AppointmentStatus.CANCELLED,
        mode=AppointmentMode.IN_PERSON,
        reason="ENT consultation"
    ),
    Appointment(
        id="apt-020",
        name="Richard Wright",
        date="2024-12-18",
        time="10:30",
        duration=45,
        doctor_name="Dr. Emily Chen",
        status=AppointmentStatus.SCHEDULED,
        mode=AppointmentMode.IN_PERSON,
        reason="Neurology assessment"
    ),
]


def get_appointments(filters: Optional[Dict] = None) -> List[Appointment]:
    """
    Query Function: get_appointments(filters)
    
    Fetches appointments with optional filtering by date and status.
    
    In production, this would execute:
    ```sql
    SELECT * FROM appointments WHERE 1=1
        AND (date = :date OR :date IS NULL)
        AND (status = :status OR :status IS NULL)
    ORDER BY date, time
    ```
    
    Args:
        filters: Optional dict with 'date' (str) and/or 'status' (str)
    
    Returns:
        Filtered and sorted list of appointments
    """
    result = list(mock_appointments)
    
    if filters:
        if filters.get('date'):
            result = [apt for apt in result if apt.date == filters['date']]
        
        if filters.get('status'):
            result = [apt for apt in result if apt.status.value == filters['status']]
    
    # Sort by date and time
    result.sort(key=lambda x: (x.date, x.time))
    
    return result


def update_appointment_status(appointment_id: str, new_status: str) -> Optional[Appointment]:
    """
    Mutation Function: update_appointment_status(id, new_status)
    
    Updates the status of an appointment.
    
    In production, this would:
    1. Execute Aurora transactional write:
        ```sql
        BEGIN TRANSACTION;
        
        -- Get current status for audit
        SELECT status INTO old_status FROM appointments WHERE id = :id;
        
        -- Update appointment
        UPDATE appointments 
        SET status = :new_status, updated_at = NOW() 
        WHERE id = :id;
        
        -- Log audit trail
        INSERT INTO appointment_audit_log 
            (appointment_id, old_status, new_status, changed_at)
        VALUES (:id, :old_status, :new_status, NOW());
        
        COMMIT;
        ```
    
    2. Trigger AppSync Subscription for real-time updates:
        ```python
        # After successful DB write, publish to AppSync subscription
        appsync_client.publish(
            channel='onAppointmentUpdated',
            data={
                'appointmentId': id,
                'newStatus': new_status,
                'updatedAt': datetime.now().isoformat()
            }
        )
        ```
        
        This subscription would notify all connected clients (other staff members,
        the patient portal, queue displays) about the status change in real-time.
    
    Args:
        appointment_id: The ID of the appointment to update
        new_status: The new status value
    
    Returns:
        Updated appointment or None if not found
    """
    for apt in mock_appointments:
        if apt.id == appointment_id:
            # Convert string to enum
            apt.status = AppointmentStatus(new_status)
            
            # In production:
            # - This is where the AppSync subscription would be triggered
            # - All connected clients would receive the update via WebSocket
            # - The queue management display would update in real-time
            # - Notification service would send SMS/email to patient if applicable
            
            return apt
    
    return None


def create_appointment(data: Dict) -> Appointment:
    """
    Mutation Function: create_appointment(data)
    
    Creates a new appointment.
    
    In production, this would:
    1. Execute Aurora INSERT:
        ```sql
        INSERT INTO appointments 
            (id, name, date, time, duration, doctor_name, status, mode, reason, created_at)
        VALUES 
            (:id, :name, :date, :time, :duration, :doctor_name, :status, :mode, :reason, NOW())
        RETURNING *;
        ```
    
    2. Trigger AppSync Subscription:
        ```python
        appsync_client.publish(
            channel='onAppointmentCreated',
            data=new_appointment.to_dict()
        )
        ```
    
    Args:
        data: Dict containing appointment fields
    
    Returns:
        Newly created appointment
    """
    new_id = f"apt-{str(uuid.uuid4())[:8]}"
    
    new_appointment = Appointment(
        id=new_id,
        name=data['name'],
        date=data['date'],
        time=data['time'],
        duration=data['duration'],
        doctor_name=data['doctor_name'],
        status=AppointmentStatus(data.get('status', 'Scheduled')),
        mode=AppointmentMode(data['mode']),
        reason=data.get('reason')
    )
    
    mock_appointments.append(new_appointment)
    
    # In production: AppSync subscription would be triggered here
    
    return new_appointment


def update_appointment(appointment_id: str, data: Dict) -> Optional[Appointment]:
    """
    Mutation Function: update_appointment(id, data)
    
    Updates an appointment's details.
    
    In production, this would:
    1. Execute Aurora UPDATE with audit logging:
        ```sql
        UPDATE appointments 
        SET name = :name, date = :date, time = :time, 
            duration = :duration, doctor_name = :doctor_name,
            mode = :mode, reason = :reason, updated_at = NOW()
        WHERE id = :id
        RETURNING *;
        ```
    
    2. Trigger AppSync Subscription for real-time updates
    
    Args:
        appointment_id: The ID of the appointment to update
        data: Dict containing fields to update
    
    Returns:
        Updated appointment or None if not found
    """
    for apt in mock_appointments:
        if apt.id == appointment_id:
            if 'name' in data:
                apt.name = data['name']
            if 'date' in data:
                apt.date = data['date']
            if 'time' in data:
                apt.time = data['time']
            if 'duration' in data:
                apt.duration = data['duration']
            if 'doctor_name' in data:
                apt.doctor_name = data['doctor_name']
            if 'mode' in data:
                apt.mode = AppointmentMode(data['mode'])
            if 'reason' in data:
                apt.reason = data['reason']
            if 'status' in data:
                apt.status = AppointmentStatus(data['status'])
            
            # In production: AppSync subscription would be triggered here
            
            return apt
    
    return None


def delete_appointment(appointment_id: str) -> bool:
    """
    Mutation Function: delete_appointment(id)
    
    Deletes an appointment (soft delete in production).
    
    In production, this would:
    1. Execute Aurora soft delete:
        ```sql
        UPDATE appointments 
        SET deleted_at = NOW(), status = 'Cancelled'
        WHERE id = :id;
        ```
    
    2. Trigger AppSync Subscription:
        ```python
        appsync_client.publish(
            channel='onAppointmentDeleted',
            data={'appointmentId': id}
        )
        ```
    
    Args:
        appointment_id: The ID of the appointment to delete
    
    Returns:
        True if deleted, False if not found
    """
    global mock_appointments
    original_length = len(mock_appointments)
    mock_appointments = [apt for apt in mock_appointments if apt.id != appointment_id]
    
    # In production: AppSync subscription would be triggered here
    
    return len(mock_appointments) < original_length


def get_appointments_by_tab(tab: str, reference_date: str) -> List[Appointment]:
    """
    Helper function to get appointments by tab category.
    
    Args:
        tab: 'upcoming', 'today', or 'past'
        reference_date: Reference date string (YYYY-MM-DD)
    
    Returns:
        Filtered list of appointments
    """
    all_appointments = get_appointments()
    
    if tab == 'today':
        return [apt for apt in all_appointments if apt.date == reference_date]
    elif tab == 'upcoming':
        return [apt for apt in all_appointments if apt.date > reference_date]
    elif tab == 'past':
        return [apt for apt in all_appointments if apt.date < reference_date]
    
    return all_appointments


def get_appointment_dates() -> List[str]:
    """
    Get unique dates that have appointments (for calendar highlighting).
    
    Returns:
        Sorted list of date strings
    """
    dates = set(apt.date for apt in mock_appointments)
    return sorted(list(dates))


def get_doctors() -> List[str]:
    """
    Get unique list of doctors.
    
    Returns:
        List of doctor names
    """
    doctors = set(apt.doctor_name for apt in mock_appointments)
    return sorted(list(doctors))


# ============================================================================
# Example usage (for testing)
# ============================================================================
if __name__ == "__main__":
    # Test get_appointments
    print("All appointments:")
    for apt in get_appointments():
        print(f"  {apt.name} - {apt.date} {apt.time} - {apt.status.value}")
    
    # Test filtering
    print("\nAppointments for 2024-12-13:")
    for apt in get_appointments({'date': '2024-12-13'}):
        print(f"  {apt.name} - {apt.time} - {apt.status.value}")
    
    # Test status update
    print("\nUpdating apt-001 to Cancelled:")
    updated = update_appointment_status('apt-001', 'Cancelled')
    if updated:
        print(f"  {updated.name} is now {updated.status.value}")
    
    # Test create
    print("\nCreating new appointment:")
    new_apt = create_appointment({
        'name': 'New Patient',
        'date': '2024-12-20',
        'time': '10:00',
        'duration': 30,
        'doctor_name': 'Dr. Emily Chen',
        'mode': 'In-Person',
        'reason': 'Initial consultation'
    })
    print(f"  Created: {new_apt.name} - {new_apt.id}")
