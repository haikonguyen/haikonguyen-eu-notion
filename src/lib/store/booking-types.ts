export enum BookingStatus {
  Confirmed = 'confirmed',
  Pending = 'pending',
  InReview = 'in_review',
  Cancelled = 'cancelled',
  Completed = 'completed',
}

export enum BookingKind {
  Consultation = 'consultation',
  Service = 'service',
}

export interface ClientBooking {
  id: string;
  title: string;
  kind: BookingKind;
  startIso: string;
  endIso?: string;
  status: BookingStatus;
  notes?: string;
  meetingUrl?: string;
  invoiceUrl?: string;
}
