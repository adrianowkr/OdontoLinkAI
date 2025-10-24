import React, { useState } from 'react';
import type { Patient, TreatmentPlan, Transaction, MedicalImage, ClinicalCase } from '../types';
import Card from '../components/Card';
import UserCircleIcon from '../components/icons/UserCircleIcon';
import ClipboardDocumentListIcon from '../components/icons/ClipboardDocumentListIcon';
import BanknotesIcon from '../components/icons/BanknotesIcon';
import PhotoIcon from '../components/icons/PhotoIcon';
import ImageAnalysisModal from '../components/ImageAnalysisModal';
import { generateTreatmentPlan } from '../services/geminiService';
import SparklesIcon from '../components/icons/SparklesIcon';
import PrinterIcon from '../components/icons/PrinterIcon';

interface PatientChartProps {
    patient: Patient;
    onUpdatePatient: (patient: Patient) => void;
}

type ChartTab = 'overview' | 'treatment' | 'financial' | 'images';

const PatientChart: React.FC<PatientChartProps> = ({ patient, onUpdatePatient }) => {
    const [activeTab, setActiveTab] = useState<ChartTab>('overview');
    const [selectedImage, setSelectedImage] = useState<MedicalImage | null>(null);
    const [budgetPrompt, setBudgetPrompt] = useState('');
    const [isGeneratingBudget, setIsGeneratingBudget] = useState(false);
    
    const handleGenerateBudget = async () => {
        if (!budgetPrompt.trim()) return;
        setIsGeneratingBudget(true);
        try {
            const newPlan = await generateTreatmentPlan(budgetPrompt);
            const updatedPatient = {
                ...patient,
                treatmentPlans: [...patient.treatmentPlans, newPlan],
            };
            onUpdatePatient(updatedPatient);
            setBudgetPrompt('');
        } catch (error) {
            console.error("Failed to generate budget:", error);
        } finally {
            setIsGeneratingBudget(false);
        }
    };
    
     const handleUpdatePlanStatus = (planId: string, status: TreatmentPlan['status']) => {
        const updatedPlans = patient.treatmentPlans.map(p => p.id === planId ? { ...p, status } : p);
        let updatedTransactions = patient.transactions;

        if (status === 'Approved') {
            const plan = patient.treatmentPlans.find(p => p.id === planId);
            if (plan) {
                const newTransaction: Transaction = {
                    id: `T${Date.now()}`,
                    date: new Date().toLocaleDateString('pt-BR'),
                    description: `Plano Aprovado: ${plan.items.map(i => i.description).join(', ')}`,
                    type: 'debit',
                    amount: plan.total,
                };
                updatedTransactions = [...updatedTransactions, newTransaction];
            }
        }
        
        onUpdatePatient({ ...patient, treatmentPlans: updatedPlans, transactions: updatedTransactions });
    };

    const financialBalance = patient.transactions.reduce((acc, t) => {
        return acc + (t.type === 'credit' ? t.amount : -t.amount);
    }, 0);

    const TabButton: React.FC<{ tabId: ChartTab; label: string; icon: React.ElementType; }> = ({ tabId, label, icon: Icon }) => (
        <button
            onClick={() => setActiveTab(tabId)}
            className={`flex items-center px-4 py-2 text-sm font-medium rounded-md ${activeTab === tabId ? 'bg-primary-100 text-primary-700 dark:bg-primary-900/50 dark:text-primary-200' : 'text-gray-500 hover:bg-gray-200/50 dark:text-gray-400 dark:hover:bg-gray-700/50'}`}
        >
            <Icon className="w-5 h-5 mr-2" />
            {label}
        </button>
    );

    const renderContent = () => {
        switch (activeTab) {
            case 'treatment':
                return (
                     <div className="space-y-6">
                        <Card title="Gerador de Plano de Tratamento com IA">
                            <div className="space-y-4">
                                <textarea
                                    value={budgetPrompt}
                                    onChange={(e) => setBudgetPrompt(e.target.value)}
                                    placeholder="Digite os procedimentos desejados. Ex: 1 coroa de cerâmica no dente 16, 2 restaurações, clareamento..."
                                    className="w-full h-24 p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
                                />
                                <button
                                    onClick={handleGenerateBudget}
                                    disabled={isGeneratingBudget || !budgetPrompt.trim()}
                                    className="flex items-center justify-center w-full px-4 py-2 font-semibold text-white bg-primary-500 rounded-lg shadow-md hover:bg-primary-600 disabled:bg-gray-400"
                                >
                                    <SparklesIcon className="w-5 h-5 mr-2" />
                                    {isGeneratingBudget ? 'Gerando...' : 'Gerar Plano'}
                                </button>
                            </div>
                        </Card>
                        {patient.treatmentPlans.map(plan => (
                             <Card key={plan.id} title={`Plano de Tratamento - ${plan.status}`}>
                                <ul className="divide-y dark:divide-gray-700">
                                    {plan.items.map((item, index) => (
                                        <li key={index} className="flex justify-between py-2">
                                            <span>{item.description}</span>
                                            <span>{item.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
                                        </li>
                                    ))}
                                </ul>
                                <div className="mt-4 pt-2 border-t dark:border-gray-700 flex justify-between font-bold">
                                    <span>Total</span>
                                    <span>{plan.total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
                                </div>
                                {plan.status === 'Proposed' && (
                                     <div className="flex justify-end gap-2 mt-4">
                                        <button onClick={() => handleUpdatePlanStatus(plan.id, 'Rejected')} className="px-3 py-1 text-xs text-red-700 bg-red-100 rounded-full">Rejeitar</button>
                                        <button onClick={() => handleUpdatePlanStatus(plan.id, 'Approved')} className="px-3 py-1 text-xs text-white bg-green-500 rounded-full">Aprovar Plano</button>
                                     </div>
                                )}
                            </Card>
                        ))}
                    </div>
                );
            case 'financial':
                 return (
                    <Card title="Livro-Razão Financeiro">
                        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                            <thead>
                                <tr>
                                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300">Data</th>
                                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300">Descrição</th>
                                    <th className="px-4 py-2 text-right text-xs font-medium text-gray-500 dark:text-gray-300">Valor</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                                {patient.transactions.map(t => (
                                    <tr key={t.id}>
                                        <td className="px-4 py-2 text-sm">{t.date}</td>
                                        <td className="px-4 py-2 text-sm">{t.description}</td>
                                        <td className={`px-4 py-2 text-sm text-right font-medium ${t.type === 'credit' ? 'text-green-600' : 'text-red-600'}`}>
                                            {t.type === 'credit' ? '+' : '-'} {t.amount.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                             <tfoot className="bg-gray-50 dark:bg-gray-700/50">
                                <tr>
                                    <td colSpan={2} className="px-4 py-2 text-right font-bold">Saldo Devedor:</td>
                                    <td className="px-4 py-2 text-right font-bold">{Math.abs(financialBalance).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
                                </tr>
                            </tfoot>
                        </table>
                    </Card>
                );
            case 'images':
                return (
                    <Card title="Imagens e Arquivos">
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            {patient.images.map(image => (
                                <div key={image.id} className="group relative cursor-pointer" onClick={() => setSelectedImage(image)}>
                                    <img src={image.thumbnailUrl} alt={image.description} className="rounded-lg w-full h-32 object-cover" />
                                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all flex items-center justify-center">
                                        <PhotoIcon className="w-8 h-8 text-white opacity-0 group-hover:opacity-100" />
                                    </div>
                                    <p className="text-xs text-center mt-1 text-gray-600 dark:text-gray-400">{image.description}</p>
                                </div>
                            ))}
                        </div>
                    </Card>
                );
            default: // overview
                return (
                     <div className="space-y-6">
                        <Card title="Resumo do Paciente">
                             <p><strong>Status:</strong> {patient.status}</p>
                             <p><strong>Última Visita:</strong> {patient.lastVisit}</p>
                             <p><strong>Próxima Consulta:</strong> {patient.nextAppointment || 'N/A'}</p>
                             {patient.medicalAlerts && <p className="mt-2 p-2 bg-red-100 text-red-800 rounded-md"><strong>Alerta:</strong> {patient.medicalAlerts.join(', ')}</p>}
                        </Card>
                        <Card title="Casos Clínicos">
                           <ul className="space-y-2">
                               {patient.clinicalCases.map(c => (
                                   <li key={c.id} className="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                                       <p className="font-semibold">{c.procedure}</p>
                                       <p className="text-sm">Status: {c.status} | Criado em: {c.creationDate}</p>
                                   </li>
                               ))}
                           </ul>
                        </Card>
                    </div>
                );
        }
    }

    return (
        <div className="space-y-6 animate-fade-in">
            <div className="flex items-center">
                <img className="h-16 w-16 rounded-full" src={patient.avatarUrl} alt={patient.name} />
                <div className="ml-4">
                    <h2 className="text-3xl font-bold text-gray-800 dark:text-white">{patient.name}</h2>
                    <p className="text-gray-500 dark:text-gray-400">{patient.email}</p>
                </div>
            </div>

            <div className="bg-white dark:bg-gray-800 p-2 rounded-lg shadow-sm flex items-center gap-2">
                <TabButton tabId="overview" label="Visão Geral" icon={UserCircleIcon} />
                <TabButton tabId="treatment" label="Planos de Tratamento" icon={ClipboardDocumentListIcon} />
                <TabButton tabId="financial" label="Financeiro" icon={BanknotesIcon} />
                <TabButton tabId="images" label="Imagens" icon={PhotoIcon} />
            </div>

            {renderContent()}

            {selectedImage && <ImageAnalysisModal image={selectedImage} onClose={() => setSelectedImage(null)} />}
            
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

export default PatientChart;
