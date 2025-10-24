import React, { useState } from 'react';
import SparklesIcon from '../components/icons/SparklesIcon';
import ArrowLeftOnRectangleIcon from '../components/icons/ArrowLeftOnRectangleIcon';
import QuestionMarkCircleIcon from '../components/icons/QuestionMarkCircleIcon';
import { getPatientExplanation } from '../services/geminiService';
import type { Patient, Consultation } from '../types';

interface PatientPortalProps {
  patient: Patient;
  onExit: () => void;
}

const mockConsultations: Consultation[] = [
    { id: 1, date: '15/05/2024', doctor: 'Dr. Ana Oliveira', procedure: 'Manutenção Ortodôntica', notes: 'Ajuste realizado no arco superior. Paciente relata bom progresso.'},
    { id: 2, date: '10/03/2024', doctor: 'Dr. Ana Oliveira', procedure: 'Avaliação Inicial', notes: 'Identificada necessidade de tratamento ortodôntico e duas restaurações.'},
    { id: 3, date: '20/01/2024', doctor: 'Dr. Ana Oliveira', procedure: 'Restauração Dente 24', notes: 'Restauração em resina composta realizada com sucesso.'},
];

const PatientPortal: React.FC<PatientPortalProps> = ({ patient, onExit }) => {
    const [selectedConsultation, setSelectedConsultation] = useState<Consultation | null>(null);
    const [explanation, setExplanation] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleExplainClick = async (consultation: Consultation) => {
        if (selectedConsultation?.id === consultation.id) {
            setSelectedConsultation(null);
            setExplanation('');
            return;
        }

        setSelectedConsultation(consultation);
        setIsLoading(true);
        setError('');
        setExplanation('');
        try {
            const result = await getPatientExplanation(consultation.procedure);
            setExplanation(result);
        } catch (err) {
            setError('Não foi possível carregar a explicação. Tente novamente.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="bg-gray-50 dark:bg-gray-900 min-h-screen p-4 sm:p-6 lg:p-8 font-sans text-gray-800 dark:text-gray-200">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <header className="flex justify-between items-center mb-8">
                    <div className="flex items-center">
                        <SparklesIcon className="w-8 h-8 text-primary-500" />
                        <h1 className="ml-2 text-2xl font-bold">Portal do Paciente</h1>
                    </div>
                    <button onClick={onExit} className="flex items-center px-3 py-2 text-sm font-medium text-gray-600 bg-white dark:bg-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
                        <ArrowLeftOnRectangleIcon className="w-5 h-5 mr-2" />
                        Sair do Portal
                    </button>
                </header>

                {/* Welcome Card */}
                <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md mb-8">
                    <h2 className="text-2xl font-bold">Olá, {patient.name.split(' ')[0]}!</h2>
                    <p className="text-gray-500 dark:text-gray-400 mt-1">Bem-vindo(a) ao seu portal de acompanhamento.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Main Content: History */}
                    <div className="md:col-span-2 space-y-6">
                        <h3 className="text-xl font-bold">Histórico de Tratamento</h3>
                        <ul className="space-y-4">
                            {mockConsultations.map(c => (
                                <li key={c.id} className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm transition-shadow hover:shadow-md">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <p className="font-semibold text-primary-600 dark:text-primary-400">{c.procedure}</p>
                                            <p className="text-sm text-gray-500 dark:text-gray-400">{c.date}</p>
                                        </div>
                                        <button 
                                            onClick={() => handleExplainClick(c)}
                                            className="flex items-center text-xs font-semibold text-primary-500 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-200"
                                        >
                                            <QuestionMarkCircleIcon className="w-4 h-4 mr-1" />
                                            Entender
                                        </button>
                                    </div>
                                    {selectedConsultation?.id === c.id && (
                                        <div className="mt-4 p-4 bg-primary-50 dark:bg-gray-700/50 border-l-4 border-primary-400 rounded-md">
                                            {isLoading && <p className="text-sm text-gray-600 dark:text-gray-300 animate-pulse">Dr. Link está explicando...</p>}
                                            {error && <p className="text-sm text-red-500">{error}</p>}
                                            {explanation && <p className="text-sm text-gray-700 dark:text-gray-200">{explanation}</p>}
                                        </div>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Sidebar: Next Appointment */}
                    <div className="md:col-span-1 space-y-6">
                         <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md">
                             <h3 className="text-lg font-bold mb-4">Próxima Consulta</h3>
                             {patient.nextAppointment ? (
                                <>
                                    <p className="text-3xl font-extrabold text-primary-500">{new Date(patient.nextAppointment).toLocaleDateString('pt-BR', { day: '2-digit' })}</p>
                                    <p className="text-lg font-semibold text-gray-600 dark:text-gray-300 -mt-1">{new Date(patient.nextAppointment).toLocaleDateString('pt-BR', { month: 'long' })}</p>
                                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">com Dr. Ana Oliveira</p>
                                    <button className="mt-4 w-full px-4 py-2 text-sm font-semibold text-white bg-primary-500 rounded-lg shadow-md hover:bg-primary-600 transition-colors">
                                        Ver Detalhes
                                    </button>
                                </>
                             ) : (
                                <p className="text-sm text-gray-500 dark:text-gray-400">Nenhuma consulta agendada. Entre em contato para marcar seu retorno.</p>
                             )}
                         </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PatientPortal;
