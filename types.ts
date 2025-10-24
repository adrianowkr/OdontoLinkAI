
export type UserRole = 'dentist' | 'lab' | 'designer' | 'patient_portal';

export interface ChatMessage {
  sender: 'user' | 'ai';
  text: string;
}

export interface IntegratedChatMessage {
    sender: 'Dentist' | 'Lab' | 'Patient' | 'AI';
    text: string;
    timestamp: string;
}

export interface AgendaEvent {
  id: string; // Changed to string for consistency
  time: string;
  patientName: string;
  patientId: number;
  procedure: string;
  status: 'confirmed' | 'pending' | 'cancelled';
}

export interface TreatmentPlanItem {
  description: string;
  price: number;
}
export interface TreatmentPlan {
    id: string;
    items: TreatmentPlanItem[];
    total: number;
    status: 'Proposed' | 'Approved' | 'Completed' | 'Rejected';
}

export interface Transaction {
  id: string;
  date: string;
  description: string;
  type: 'debit' | 'credit';
  amount: number;
}

export interface MedicalImage {
  id: number;
  thumbnailUrl: string;
  fullUrl: string;
  description: string;
  date: string;
  type: 'Radiografia Panorâmica' | 'Tomografia Computadorizada' | 'Escaneamento Intraoral' | 'Foto Clínica';
}

// FIX: Added Consultation type for use in PatientPortal.
export interface Consultation {
    id: number;
    date: string;
    doctor: string;
    procedure: string;
    notes: string;
}

export interface ClinicalCase {
    id: string;
    patientId: number;
    procedure: string;
    status: 'Planning' | 'In Progress' | 'Completed';
    creationDate: string;
    labOrderIds: string[];
}

export interface Patient {
    id: number;
    name: string;
    email: string;
    status: 'active' | 'maintenance' | 'inactive';
    lastVisit: string; // "dd/mm/yyyy"
    nextAppointment: string | null; // "yyyy-mm-dd"
    avatarUrl: string;
    // Patient-centric data
    clinicalCases: ClinicalCase[];
    treatmentPlans: TreatmentPlan[];
    transactions: Transaction[];
    images: MedicalImage[];
    medicalAlerts?: string[];
}

export interface LabOrder {
  id: string;
  patientId: number;
  caseId: string;
  item: string;
  dueDate: string;
  status: 'sent' | 'in_production' | 'completed' | 'on_hold';
  labName: string;
}

export interface AnalysisResult {
    fileName: string;
    overallStatus: 'success' | 'warning';
    results: {
        check: string;
        status: 'success' | 'warning';
        message: string;
    }[];
}

export interface MarketplaceJob {
    id: number;
    title: string;
    type: string;
    budget: string;
    postedDate: string;
    skills: string[];
    description: string;
}

export interface CadDesigner {
    id: number;
    name: string;
    avatarUrl: string;
    rating: number;
    aiMatchReason: string;
}

export interface CommunicationIntegration {
    id: 'whatsapp' | 'sms';
    name: string;
    connected: boolean;
    settings: {
        appointmentReminders: boolean;
        followUps: boolean;
    };
}