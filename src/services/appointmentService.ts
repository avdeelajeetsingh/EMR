/**
 * Appointment Service (appointment_service.py simulation)
 * 
 * This TypeScript module simulates the Python backend service that would
 * handle appointment scheduling and queue management.
 * 
 * In a real implementation:
 * - This would be a Python Lambda function
 * - Data would be fetched from Aurora PostgreSQL
 * - AppSync/GraphQL would handle the API layer
 */

import { Appointment, AppointmentFilters, AppointmentStatus, AppointmentMode } from '@/types/appointment';

// Mock data simulating Aurora PostgreSQL fetch
// In production: SELECT * FROM appointments WHERE clinic_id = ?
let mockAppointments: Appointment[] = [
  {
    id: 'apt-001',
    name: 'Sarah Johnson',
    date: '2024-12-13',
    time: '09:00',
    duration: 30,
    doctorName: 'Dr. Emily Chen',
    status: 'Confirmed',
    mode: 'In-Person',
    reason: 'Annual checkup'
  },
  {
    id: 'apt-002',
    name: 'Michael Brown',
    date: '2024-12-13',
    time: '10:30',
    duration: 45,
    doctorName: 'Dr. James Wilson',
    status: 'Scheduled',
    mode: 'Video',
    reason: 'Follow-up consultation'
  },
  {
    id: 'apt-003',
    name: 'Emma Davis',
    date: '2024-12-13',
    time: '14:00',
    duration: 30,
    doctorName: 'Dr. Emily Chen',
    status: 'Upcoming',
    mode: 'In-Person',
    reason: 'Vaccination'
  },
  {
    id: 'apt-004',
    name: 'Robert Martinez',
    date: '2024-12-14',
    time: '09:30',
    duration: 60,
    doctorName: 'Dr. Sarah Kim',
    status: 'Scheduled',
    mode: 'In-Person',
    reason: 'Physical therapy session'
  },
  {
    id: 'apt-005',
    name: 'Lisa Anderson',
    date: '2024-12-14',
    time: '11:00',
    duration: 30,
    doctorName: 'Dr. James Wilson',
    status: 'Upcoming',
    mode: 'Phone',
    reason: 'Prescription renewal'
  },
  {
    id: 'apt-006',
    name: 'David Thompson',
    date: '2024-12-12',
    time: '15:00',
    duration: 45,
    doctorName: 'Dr. Emily Chen',
    status: 'Confirmed',
    mode: 'Video',
    reason: 'Mental health check-in'
  },
  {
    id: 'apt-007',
    name: 'Jennifer White',
    date: '2024-12-11',
    time: '10:00',
    duration: 30,
    doctorName: 'Dr. Sarah Kim',
    status: 'Cancelled',
    mode: 'In-Person',
    reason: 'Dermatology consultation'
  },
  {
    id: 'apt-008',
    name: 'Christopher Lee',
    date: '2024-12-15',
    time: '13:30',
    duration: 45,
    doctorName: 'Dr. James Wilson',
    status: 'Scheduled',
    mode: 'In-Person',
    reason: 'Cardiology checkup'
  },
  {
    id: 'apt-009',
    name: 'Amanda Garcia',
    date: '2024-12-16',
    time: '09:00',
    duration: 30,
    doctorName: 'Dr. Emily Chen',
    status: 'Upcoming',
    mode: 'Video',
    reason: 'Lab results review'
  },
  {
    id: 'apt-010',
    name: 'Kevin Robinson',
    date: '2024-12-10',
    time: '16:00',
    duration: 60,
    doctorName: 'Dr. Sarah Kim',
    status: 'Confirmed',
    mode: 'In-Person',
    reason: 'Surgery follow-up'
  },
  {
    id: 'apt-011',
    name: 'Michelle Taylor',
    date: '2024-12-13',
    time: '16:30',
    duration: 30,
    doctorName: 'Dr. James Wilson',
    status: 'Scheduled',
    mode: 'Phone',
    reason: 'Test results discussion'
  },
  {
    id: 'apt-012',
    name: 'Daniel Harris',
    date: '2024-12-17',
    time: '11:30',
    duration: 45,
    doctorName: 'Dr. Emily Chen',
    status: 'Upcoming',
    mode: 'In-Person',
    reason: 'Orthopedic evaluation'
  },
  // Additional dummy data
  {
    id: 'apt-013',
    name: 'Patricia Moore',
    date: '2024-12-13',
    time: '08:00',
    duration: 30,
    doctorName: 'Dr. Sarah Kim',
    status: 'Confirmed',
    mode: 'In-Person',
    reason: 'Routine blood work'
  },
  {
    id: 'apt-014',
    name: 'William Clark',
    date: '2024-12-14',
    time: '14:30',
    duration: 45,
    doctorName: 'Dr. Emily Chen',
    status: 'Scheduled',
    mode: 'Video',
    reason: 'Diabetes management'
  },
  {
    id: 'apt-015',
    name: 'Nancy Lewis',
    date: '2024-12-15',
    time: '10:00',
    duration: 30,
    doctorName: 'Dr. James Wilson',
    status: 'Upcoming',
    mode: 'In-Person',
    reason: 'Allergy consultation'
  },
  {
    id: 'apt-016',
    name: 'Thomas Walker',
    date: '2024-12-16',
    time: '15:30',
    duration: 60,
    doctorName: 'Dr. Sarah Kim',
    status: 'Scheduled',
    mode: 'In-Person',
    reason: 'Physical examination'
  },
  {
    id: 'apt-017',
    name: 'Elizabeth Hall',
    date: '2024-12-17',
    time: '09:30',
    duration: 30,
    doctorName: 'Dr. Emily Chen',
    status: 'Upcoming',
    mode: 'Phone',
    reason: 'Medication review'
  },
  {
    id: 'apt-018',
    name: 'James Young',
    date: '2024-12-10',
    time: '11:00',
    duration: 45,
    doctorName: 'Dr. James Wilson',
    status: 'Confirmed',
    mode: 'Video',
    reason: 'Gastroenterology follow-up'
  },
  {
    id: 'apt-019',
    name: 'Barbara King',
    date: '2024-12-11',
    time: '14:00',
    duration: 30,
    doctorName: 'Dr. Sarah Kim',
    status: 'Cancelled',
    mode: 'In-Person',
    reason: 'ENT consultation'
  },
  {
    id: 'apt-020',
    name: 'Richard Wright',
    date: '2024-12-18',
    time: '10:30',
    duration: 45,
    doctorName: 'Dr. Emily Chen',
    status: 'Scheduled',
    mode: 'In-Person',
    reason: 'Neurology assessment'
  },
];

// List of available doctors
export const doctors = [
  'Dr. Emily Chen',
  'Dr. James Wilson',
  'Dr. Sarah Kim',
  'Dr. Michael Brown',
  'Dr. Lisa Anderson'
];

/**
 * Query Function: get_appointments(filters)
 */
export function getAppointments(filters?: AppointmentFilters): Appointment[] {
  let result = [...mockAppointments];

  if (filters?.date) {
    result = result.filter(apt => apt.date === filters.date);
  }

  if (filters?.status) {
    result = result.filter(apt => apt.status === filters.status);
  }

  // Sort by date and time
  result.sort((a, b) => {
    const dateCompare = a.date.localeCompare(b.date);
    if (dateCompare !== 0) return dateCompare;
    return a.time.localeCompare(b.time);
  });

  return result;
}

/**
 * Mutation Function: update_appointment_status(id, new_status)
 * 
 * In production:
 * 1. Aurora transactional write with audit logging
 * 2. AppSync Subscription trigger for real-time updates
 */
export function updateAppointmentStatus(
  id: string,
  newStatus: AppointmentStatus
): Appointment | null {
  const index = mockAppointments.findIndex(apt => apt.id === id);
  
  if (index === -1) {
    return null;
  }

  mockAppointments[index] = {
    ...mockAppointments[index],
    status: newStatus
  };

  return mockAppointments[index];
}

/**
 * Mutation Function: create_appointment(data)
 * 
 * In production:
 * 1. Aurora INSERT with RETURNING
 * 2. AppSync Subscription trigger (onAppointmentCreated)
 */
export function createAppointment(data: Omit<Appointment, 'id'>): Appointment {
  const newId = `apt-${Date.now().toString(36)}`;
  
  const newAppointment: Appointment = {
    id: newId,
    ...data
  };
  
  mockAppointments.push(newAppointment);
  
  return newAppointment;
}

/**
 * Mutation Function: update_appointment(id, data)
 * 
 * In production:
 * 1. Aurora UPDATE with audit logging
 * 2. AppSync Subscription trigger (onAppointmentUpdated)
 */
export function updateAppointment(
  id: string,
  data: Partial<Omit<Appointment, 'id'>>
): Appointment | null {
  const index = mockAppointments.findIndex(apt => apt.id === id);
  
  if (index === -1) {
    return null;
  }

  mockAppointments[index] = {
    ...mockAppointments[index],
    ...data
  };

  return mockAppointments[index];
}

/**
 * Mutation Function: delete_appointment(id)
 * 
 * In production:
 * 1. Aurora soft delete (UPDATE deleted_at = NOW())
 * 2. AppSync Subscription trigger (onAppointmentDeleted)
 */
export function deleteAppointment(id: string): boolean {
  const index = mockAppointments.findIndex(apt => apt.id === id);
  
  if (index === -1) {
    return false;
  }

  mockAppointments.splice(index, 1);
  return true;
}

/**
 * Get appointment by ID
 */
export function getAppointmentById(id: string): Appointment | null {
  return mockAppointments.find(apt => apt.id === id) || null;
}

/**
 * Helper function to get appointments by tab category
 */
export function getAppointmentsByTab(
  tab: 'upcoming' | 'today' | 'past',
  referenceDate: string = new Date().toISOString().split('T')[0]
): Appointment[] {
  const allAppointments = getAppointments();

  switch (tab) {
    case 'today':
      return allAppointments.filter(apt => apt.date === referenceDate);
    case 'upcoming':
      return allAppointments.filter(apt => apt.date > referenceDate);
    case 'past':
      return allAppointments.filter(apt => apt.date < referenceDate);
    default:
      return allAppointments;
  }
}

/**
 * Get unique dates that have appointments (for calendar highlighting)
 */
export function getAppointmentDates(): string[] {
  const dates = new Set(mockAppointments.map(apt => apt.date));
  return Array.from(dates).sort();
}

/**
 * Get list of available doctors
 */
export function getDoctors(): string[] {
  return doctors;
}
