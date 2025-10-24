import React, { useState, useEffect } from 'react';
import type { Patient } from '../types';
import UserPlusIcon from './icons/UserPlusIcon';

interface PatientFormModalProps {
    patient: Patient | null;
    onClose: () => void;
    onSave: (patient: Patient) => void;
}

const PatientFormModal: React.FC<PatientFormModalProps> = ({ patient, onClose, onSave }) => {
    const [formData, setFormData] = useState<Partial<Patient>>({
        name: '',
        email: '',
        status: 'active',
        lastVisit: new Date().toISOString().split('T')[0],
        nextAppointment: '',
    });

    useEffect(() => {
        if (patient) {
            setFormData({
                ...patient,
                lastVisit: patient.lastVisit ? new Date(patient.lastVisit.split('/').reverse().join('-')).toISOString().split('T')[0] : '',
                nextAppointment: patient.nextAppointment ? new Date(patient.nextAppointment.split('/').reverse().join('-')).toISOString().split('T')[0] : '',
            });
        } else {
             setFormData({
                name: '',
                email: '',
                status: 'active',
                lastVisit: new Date().toISOString().split('T')[0],
                nextAppointment: '',
            });
        }
    }, [patient]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        const formattedData = {
            ...formData,
            lastVisit: formData.lastVisit ? new Date(formData.lastVisit).toLocaleDateString('pt-BR') : '',
            nextAppointment: formData.nextAppointment ? new Date(formData.nextAppointment).toLocaleDateString('pt-BR') : null,
        };

        onSave(formattedData as Patient);
    };
    
    const isEditing = patient !== null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center p-4">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-lg flex flex-col transform transition-all duration-300 scale-95 opacity-0 animate-fade-in-scale">
                <form onSubmit={handleSubmit}>
                    <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
                        <div className="flex items-center">
                            <UserPlusIcon className="w-6 h-6 text-primary-500" />
                            <h2 className="ml-2 text-lg font-bold text-gray-800 dark:text-white">
                                {isEditing ? 'Editar Paciente' : 'Adicionar Novo Paciente'}
                            </h2>
                        </div>
                        <button type="button" onClick={onClose} className="p-2 rounded-full text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                        </button>
                    </div>

                    <div className="p-6 space-y-4">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Nome Completo</label>
                            <input type="text" name="name" id="name" value={formData.name} onChange={handleChange} required className="mt-1 w-full input-style" />
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
                            <input type="email" name="email" id="email" value={formData.email} onChange={handleChange} required className="mt-1 w-full input-style" />
                        </div>
                         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="lastVisit" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Última Visita</label>
                                <input type="date" name="lastVisit" id="lastVisit" value={formData.lastVisit} onChange={handleChange} required className="mt-1 w-full input-style" />
                            </div>
                             <div>
                                <label htmlFor="nextAppointment" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Próxima Consulta</label>
                                <input type="date" name="nextAppointment" id="nextAppointment" value={formData.nextAppointment || ''} onChange={handleChange} className="mt-1 w-full input-style" />
                            </div>
                         </div>
                         <div>
                            <label htmlFor="status" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Status</label>
                            <select name="status" id="status" value={formData.status} onChange={handleChange} className="mt-1 w-full input-style">
                                <option value="active">Em Tratamento</option>
                                <option value="maintenance">Manutenção</option>
                                <option value="inactive">Inativo</option>
                            </select>
                         </div>
                    </div>

                    <div className="p-4 bg-gray-50 dark:bg-gray-900/50 border-t border-gray-200 dark:border-gray-700 flex justify-end space-x-3">
                        <button type="button" onClick={onClose} className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600 dark:hover:bg-gray-600">
                            Cancelar
                        </button>
                        <button type="submit" className="px-4 py-2 text-sm font-semibold text-white bg-primary-500 rounded-lg shadow-md hover:bg-primary-600">
                            {isEditing ? 'Salvar Alterações' : 'Adicionar Paciente'}
                        </button>
                    </div>
                </form>
            </div>
            <style>{`
                @keyframes fade-in-scale {
                    from { opacity: 0; transform: scale(0.95); }
                    to { opacity: 1; transform: scale(1); }
                }
                .animate-fade-in-scale { animation: fade-in-scale 0.3s forwards cubic-bezier(0.16, 1, 0.3, 1); }
                .input-style {
                    display: block;
                    width: 100%;
                    padding: 0.5rem 0.75rem;
                    background-color: white;
                    border: 1px solid #d1d5db;
                    border-radius: 0.375rem;
                    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
                }
                .dark .input-style {
                    background-color: #374151;
                    border-color: #4b5563;
                }
                .input-style:focus {
                    outline: none;
                    --tw-ring-color: #3b82f6;
                    --tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);
                    --tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color);
                    box-shadow: var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow, 0 0 #0000);
                    border-color: #3b82f6;
                }
            `}</style>
        </div>
    );
};

export default PatientFormModal;