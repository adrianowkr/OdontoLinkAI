import React from 'react';
import Card from '../components/Card';
import UsersIcon from '../components/icons/UsersIcon';
import BeakerIcon from '../components/icons/BeakerIcon';
import CheckCircleIcon from '../components/icons/CheckCircleIcon';
import type { Patient, ClinicalCase } from '../types';

interface DashboardProps {
    patients: Patient[];
    onNavigateToPatientChart: (patientId: number) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ patients, onNavigateToPatientChart }) => {
    const allCases = patients.flatMap(p => p.clinicalCases);
    const activeCases = allCases.filter(c => c.status === 'In Progress').length;
    const completedToday = 1; // mock
    const newPatientsToday = patients.filter(p => p.lastVisit === new Date().toLocaleDateString('pt-BR')).length;

    return (
        <div className="space-y-6 animate-fade-in">
            <div>
                <h2 className="text-3xl font-bold text-gray-800 dark:text-white">Dashboard</h2>
                <p className="text-gray-500 dark:text-gray-400 mt-1">Bem-vindo(a) de volta, Dr(a). Ana!</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                 <Card title="Agenda de Hoje">
                    <div className="text-4xl font-extrabold text-primary-500 dark:text-primary-400">
                      {patients.filter(p => p.nextAppointment === new Date().toISOString().split('T')[0]).length}
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Pacientes agendados</p>
                </Card>
                <Card title="Casos Ativos">
                    <div className="text-4xl font-extrabold text-gray-800 dark:text-white">{activeCases}</div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Em andamento</p>
                </Card>
                 <Card title="Concluídos Hoje" showAiInsight>
                    <div className="text-4xl font-extrabold text-green-600 dark:text-green-500">{completedToday}</div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Procedimentos finalizados</p>
                </Card>
                <Card title="Novos Pacientes">
                     <div className="text-4xl font-extrabold text-gray-800 dark:text-white">{newPatientsToday}</div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Registrados hoje</p>
                </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                    <Card title="Casos Clínicos Recentes">
                        <ul className="space-y-3">
                            {allCases.slice(0, 4).map(c => {
                                const patient = patients.find(p => p.id === c.patientId);
                                return (
                                <li 
                                    key={c.id} 
                                    onClick={() => onNavigateToPatientChart(c.patientId)}
                                    className="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg flex items-center justify-between cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700"
                                >
                                    <div className="flex items-center">
                                        {c.status === 'Completed' ? <CheckCircleIcon className="w-6 h-6 text-green-500 mr-3" /> : <BeakerIcon className="w-6 h-6 text-blue-500 mr-3" />}
                                        <div>
                                            <p className="font-semibold text-gray-800 dark:text-white">{patient?.name}</p>
                                            <p className="text-sm text-gray-500 dark:text-gray-400">{c.procedure}</p>
                                        </div>
                                    </div>
                                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${c.status === 'Completed' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}`}>{c.status}</span>
                                </li>
                            )})}
                        </ul>
                    </Card>
                </div>
                 <div>
                    <Card title="Acesso Rápido">
                         <div className="space-y-3">
                           {/* These are now available in the sidebar */}
                           <p className="text-sm text-gray-500 dark:text-gray-400">Use a barra lateral para navegação rápida entre os módulos.</p>
                        </div>
                    </Card>
                </div>
            </div>
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

export default Dashboard;
