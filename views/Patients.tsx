import React, { useState } from 'react';
import Card from '../components/Card';
import type { Patient } from '../types';
import UserPlusIcon from '../components/icons/UserPlusIcon';
import PencilSquareIcon from '../components/icons/PencilSquareIcon';
import EyeIcon from '../components/icons/EyeIcon';

interface PatientsProps {
    patients: Patient[];
    onSelectPatient: (patient: Patient) => void;
    onAddPatient: () => void;
    onEditPatient: (patient: Patient) => void;
}

const Patients: React.FC<PatientsProps> = ({ patients, onSelectPatient, onAddPatient, onEditPatient }) => {
    const [filter, setFilter] = useState('all');

    const statusConfig: Record<Patient['status'], { label: string, color: string }> = {
        active: { label: 'Em Tratamento', color: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' },
        maintenance: { label: 'Manutenção', color: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300' },
        inactive: { label: 'Inativo', color: 'bg-gray-200 text-gray-700 dark:bg-gray-600 dark:text-gray-200' }
    };

    const filteredPatients = patients.filter(p => filter === 'all' || p.status === filter);

    return (
        <div className="space-y-6 animate-fade-in">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-3xl font-bold text-gray-800 dark:text-white">Pacientes</h2>
                    <p className="text-gray-500 dark:text-gray-400 mt-1">Gerencie sua base de pacientes.</p>
                </div>
                <button onClick={onAddPatient} className="flex items-center px-4 py-2 text-sm font-semibold text-white bg-primary-500 rounded-lg shadow-md hover:bg-primary-600 transition-colors">
                    <UserPlusIcon className="w-5 h-5 mr-2" />
                    Novo Paciente
                </button>
            </div>
            
            <Card title="Lista de Pacientes">
                <div className="mb-4 flex items-center gap-2">
                    <button onClick={() => setFilter('all')} className={`px-3 py-1 text-sm rounded-full ${filter === 'all' ? 'bg-primary-500 text-white' : 'bg-gray-200 dark:bg-gray-700'}`}>Todos</button>
                    <button onClick={() => setFilter('active')} className={`px-3 py-1 text-sm rounded-full ${filter === 'active' ? 'bg-primary-500 text-white' : 'bg-gray-200 dark:bg-gray-700'}`}>Em Tratamento</button>
                    <button onClick={() => setFilter('maintenance')} className={`px-3 py-1 text-sm rounded-full ${filter === 'maintenance' ? 'bg-primary-500 text-white' : 'bg-gray-200 dark:bg-gray-700'}`}>Manutenção</button>
                </div>
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                        <thead className="bg-gray-50 dark:bg-gray-700/50">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Nome</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Status</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Última Visita</th>
                                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Ações</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                            {filteredPatients.map((patient) => (
                                <tr key={patient.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <div className="flex-shrink-0 h-10 w-10">
                                                <img className="h-10 w-10 rounded-full" src={patient.avatarUrl} alt={patient.name} />
                                            </div>
                                            <div className="ml-4">
                                                <div className="text-sm font-medium text-gray-900 dark:text-white">{patient.name}</div>
                                                <div className="text-sm text-gray-500 dark:text-gray-400">{patient.email}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${statusConfig[patient.status].color}`}>
                                            {statusConfig[patient.status].label}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{patient.lastVisit}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                                        <button onClick={() => onSelectPatient(patient)} className="text-primary-600 hover:text-primary-900 dark:text-primary-400 dark:hover:text-primary-200 p-1" title="Ver Prontuário"><EyeIcon className="w-5 h-5"/></button>
                                        <button onClick={() => onEditPatient(patient)} className="text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-white p-1" title="Editar Paciente"><PencilSquareIcon className="w-5 h-5"/></button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
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

export default Patients;
