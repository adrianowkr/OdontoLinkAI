

import React, { useState } from 'react';
import Card from '../components/Card';
// FIX: Added Patient to props interface, although not directly used in render, it fixes parent prop passing error.
import type { AgendaEvent, Patient } from '../types';
import ClockIcon from '../components/icons/ClockIcon';
import PlusCircleIcon from '../components/icons/PlusCircleIcon';

// FIX: Corrected 'id' to be a string and added 'patientId' to match AgendaEvent type.
const mockAgenda: AgendaEvent[] = [
    { id: '1', time: "09:00", patientName: "Carlos Souza", patientId: 1, procedure: "Consulta de Rotina", status: 'confirmed' },
    { id: '2', time: "10:30", patientName: "Fernanda Lima", patientId: 2, procedure: "Restauração", status: 'confirmed' },
    { id: '3', time: "11:30", patientName: "Sofia Andrade", patientId: 4, procedure: "Avaliação", status: 'pending' },
    { id: '4', time: "14:00", patientName: "Ricardo Alves", patientId: 3, procedure: "Limpeza", status: 'confirmed' },
    { id: '5', time: "15:00", patientName: "Juliana Paiva", patientId: 5, procedure: "Clareamento", status: 'confirmed' },
    { id: '6', time: "16:30", patientName: "Beatriz Lima", patientId: 6, procedure: "Extração de Siso", status: 'confirmed' },
];

// FIX: Added props interface to accept props passed from App.tsx.
interface AgendaProps {
    patients: Patient[];
    onNavigateToPatientChart: (patientId: number) => void;
}


const Agenda: React.FC<AgendaProps> = ({ onNavigateToPatientChart }) => {
    const [events, setEvents] = useState(mockAgenda);

    const statusConfig: Record<AgendaEvent['status'], { label: string, color: string }> = {
        confirmed: { label: 'Confirmado', color: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' },
        pending: { label: 'A Confirmar', color: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300' },
        cancelled: { label: 'Cancelado', color: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300' }
    };
    
    return (
        <div className="space-y-6 animate-fade-in">
             <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-3xl font-bold text-gray-800 dark:text-white">Agenda do Dia</h2>
                    <p className="text-gray-500 dark:text-gray-400 mt-1">Veja e gerencie seus compromissos de hoje.</p>
                </div>
                <button className="flex items-center px-4 py-2 text-sm font-semibold text-white bg-primary-500 rounded-lg shadow-md hover:bg-primary-600 transition-colors">
                    <PlusCircleIcon className="w-5 h-5 mr-2" />
                    Novo Agendamento
                </button>
            </div>
            
            <Card title={`Compromissos - ${new Date().toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' })}`}>
                <div className="space-y-4">
                    {events.map(event => (
                        <div key={event.id} className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg flex items-center justify-between">
                            <div className="flex items-center">
                                <ClockIcon className="w-6 h-6 text-gray-400 mr-4"/>
                                <div>
                                    <p className="font-bold text-gray-800 dark:text-white">{event.time}</p>
                                    <p className="text-sm text-gray-600 dark:text-gray-300">{event.patientName}</p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">{event.procedure}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <span className={`px-2 py-1 text-xs font-semibold rounded-full ${statusConfig[event.status].color}`}>
                                    {statusConfig[event.status].label}
                                </span>
                                {/* FIX: Used onNavigateToPatientChart prop for navigation. */}
                                <button onClick={() => onNavigateToPatientChart(event.patientId)} className="text-xs font-medium text-primary-600 dark:text-primary-400 hover:underline">Detalhes</button>
                            </div>
                        </div>
                    ))}
                </div>
            </Card>

            <style>{`
               @keyframes fade-in {
                  from { opacity: 0; transform: translateY(10px); }
                  to { opacity: 1; transform: translateY(0); }
              }
              .animate-fade-in { animation: fade-in 0.5s ease-out forwards; }
            `}</style>
        </div>
    );
};

export default Agenda;