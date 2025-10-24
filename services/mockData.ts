// FIX: Imported LabOrder type to resolve typing error.
import { Patient, LabOrder } from './types';

export const mockPatients: Patient[] = [
    { 
        id: 1, 
        name: 'Carlos Souza', 
        email: 'carlos.s@email.com', 
        status: 'active', 
        lastVisit: '15/07/2024', 
        nextAppointment: '2024-09-15', 
        avatarUrl: `https://i.pravatar.cc/150?u=carlos`,
        medicalAlerts: ['Alergia a Penicilina'],
        clinicalCases: [
            { id: '1-16256', patientId: 1, procedure: 'Implante (Dente 16)', status: 'In Progress', creationDate: '10/07/2024', labOrderIds: ['ODL-8433'] }
        ],
        treatmentPlans: [
            { id: 'TP-002', items: [{description: 'Implante Dentário', price: 4500}], total: 4500, status: 'Approved' }
        ],
        transactions: [
             { id: 'T002', date: '11/07/2024', description: 'Plano Aprovado: Implante Dentário', type: 'debit', amount: 4500 },
             { id: 'T003', date: '11/07/2024', description: 'Pagamento (Entrada)', type: 'credit', amount: 2000 },
        ],
        images: [
            { id: 2, thumbnailUrl: 'https://picsum.photos/seed/tomo/200/150', fullUrl: 'https://picsum.photos/seed/tomo/800/600', description: 'Tomografia Computadorizada', date: '11/03/2024', type: 'Tomografia Computadorizada' },
        ],
    },
    { 
        id: 2, 
        name: 'Fernanda Lima', 
        email: 'fernanda.l@email.com', 
        status: 'active', 
        lastVisit: '10/07/2024', 
        nextAppointment: '2024-08-01', 
        avatarUrl: `https://i.pravatar.cc/150?u=fernanda`,
        clinicalCases: [
             { id: '2-58963', patientId: 2, procedure: 'Coroas (x2)', status: 'Completed', creationDate: '01/07/2024', labOrderIds: ['ODL-8432'] }
        ],
        treatmentPlans: [
            { id: 'TP-001', items: [{description: 'Coroa de Zircônia', price: 1200}, {description: 'Coroa de Zircônia', price: 1200}], total: 2400, status: 'Completed' }
        ],
        transactions: [
            { id: 'T001', date: '02/07/2024', description: 'Plano Aprovado: Coroa de Zircônia (x2)', type: 'debit', amount: 2400 },
            { id: 'T004', date: '15/07/2024', description: 'Pagamento (Final)', type: 'credit', amount: 2400 },
        ],
        images: [
            { id: 1, thumbnailUrl: 'https://picsum.photos/seed/pano/200/150', fullUrl: 'https://picsum.photos/seed/pano/800/600', description: 'Radiografia Panorâmica', date: '10/03/2024', type: 'Radiografia Panorâmica'},
            { id: 3, thumbnailUrl: 'https://picsum.photos/seed/scan/200/150', fullUrl: 'https://picsum.photos/seed/scan/800/600', description: 'Escaneamento Intraoral', date: '12/03/2024', type: 'Escaneamento Intraoral'},
        ],
    },
    { 
        id: 3, 
        name: 'Ricardo Alves', 
        email: 'ricardo.a@email.com', 
        status: 'maintenance', 
        lastVisit: '01/06/2024', 
        nextAppointment: '2024-12-01', 
        avatarUrl: `https://i.pravatar.cc/150?u=ricardo`,
        clinicalCases: [],
        treatmentPlans: [],
        transactions: [],
        images: [],
    },
];

export const mockLabs: LabOrder[] = [
    { id: 'ODL-8432', patientId: 2, caseId: '2-58963', item: 'Coroa de Zircônia', dueDate: '25/07/2024', status: 'completed', labName: 'ProArt Lab' },
    { id: 'ODL-8433', patientId: 1, caseId: '1-16256', item: 'Guia Cirúrgico', dueDate: '22/07/2024', status: 'sent', labName: 'Digital Smile' },
];