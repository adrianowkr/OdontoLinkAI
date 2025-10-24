import React, { useState } from 'react';
import Card from '../components/Card';
import ManageSubscriptionModal from '../components/ManageSubscriptionModal';
import CommunicationIntegrationModal from '../components/CommunicationIntegrationModal';
import type { CommunicationIntegration } from '../types';
import WhatsAppIcon from '../components/icons/WhatsAppIcon';
import ChatBubbleOvalLeftIcon from '../components/icons/ChatBubbleOvalLeftIcon';

const initialIntegrations: CommunicationIntegration[] = [
    { id: 'whatsapp', name: 'WhatsApp Business', connected: true, settings: { appointmentReminders: true, followUps: false }},
    { id: 'sms', name: 'Gateway de SMS', connected: false, settings: { appointmentReminders: false, followUps: false }}
];

interface SettingsProps {
    onOpenEditProfile: () => void;
    onOpenNotificationSettings: () => void;
}

const Settings: React.FC<SettingsProps> = ({ onOpenEditProfile, onOpenNotificationSettings }) => {
    const [isSubModalOpen, setIsSubModalOpen] = useState(false);
    const [isIntegrationModalOpen, setIsIntegrationModalOpen] = useState(false);
    const [selectedIntegration, setSelectedIntegration] = useState<CommunicationIntegration | null>(null);
    const [integrations, setIntegrations] = useState(initialIntegrations);

    const handleOpenIntegrationModal = (integration: CommunicationIntegration) => {
        setSelectedIntegration(integration);
        setIsIntegrationModalOpen(true);
    };

    const handleSaveIntegration = (updatedIntegration: CommunicationIntegration) => {
        setIntegrations(prev => prev.map(i => i.id === updatedIntegration.id ? updatedIntegration : i));
        setIsIntegrationModalOpen(false);
    }
    
    const IntegrationIcon = ({ id }: {id: 'whatsapp' | 'sms'}) => {
        if (id === 'whatsapp') return <WhatsAppIcon className="w-8 h-8 text-green-500" />;
        return <ChatBubbleOvalLeftIcon className="w-8 h-8 text-blue-500" />;
    };

    return (
        <div className="space-y-6 animate-fade-in">
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white">Configurações</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                 <Card title="Perfil">
                    <p className="text-sm text-gray-500 dark:text-gray-400">Gerencie suas informações pessoais e de perfil.</p>
                    <button 
                        onClick={onOpenEditProfile}
                        className="mt-4 w-full px-4 py-2 text-sm font-semibold text-white bg-primary-500 rounded-lg shadow-md hover:bg-primary-600 transition-colors">
                        Editar Perfil
                    </button>
                </Card>
                <Card title="Notificações">
                    <p className="text-sm text-gray-500 dark:text-gray-400">Escolha como você recebe as notificações.</p>
                     <button 
                        onClick={onOpenNotificationSettings}
                        className="mt-4 w-full px-4 py-2 text-sm font-semibold text-gray-700 bg-gray-200 dark:bg-gray-700 dark:text-gray-200 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors">
                        Gerenciar Notificações
                    </button>
                </Card>
                <Card title="Assinatura">
                    <p className="text-sm text-gray-500 dark:text-gray-400">Veja detalhes do seu plano e gerencie sua assinatura.</p>
                    <button 
                        onClick={() => setIsSubModalOpen(true)}
                        className="mt-4 w-full px-4 py-2 text-sm font-semibold text-white bg-primary-500 rounded-lg shadow-md hover:bg-primary-600 transition-colors">
                        Gerenciar Assinatura
                    </button>
                </Card>

                <Card title="Integrações de Comunicação" className="md:col-span-2">
                    <div className="space-y-4">
                        {integrations.map(integration => (
                            <div key={integration.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                                <div className="flex items-center gap-4">
                                    <IntegrationIcon id={integration.id} />
                                    <div>
                                        <p className="font-semibold text-gray-800 dark:text-white">{integration.name}</p>
                                        <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${integration.connected ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' : 'bg-gray-200 text-gray-700 dark:bg-gray-600 dark:text-gray-200'}`}>
                                            {integration.connected ? 'Conectado' : 'Desconectado'}
                                        </span>
                                    </div>
                                </div>
                                <button
                                    onClick={() => handleOpenIntegrationModal(integration)}
                                    className="px-4 py-2 text-sm font-semibold text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600 dark:hover:bg-gray-600 transition-colors">
                                    Gerenciar
                                </button>
                            </div>
                        ))}
                    </div>
                </Card>
            </div>

            {isSubModalOpen && <ManageSubscriptionModal onClose={() => setIsSubModalOpen(false)} />}
            {isIntegrationModalOpen && selectedIntegration && (
                <CommunicationIntegrationModal 
                    integration={selectedIntegration}
                    onClose={() => setIsIntegrationModalOpen(false)}
                    onSave={handleSaveIntegration}
                />
            )}

            <style>{`
                @keyframes fade-in {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fade-in { animation: fade-in 0.5s ease-out forwards; }
            `}</style>
        </div>
    );
}

export default Settings;