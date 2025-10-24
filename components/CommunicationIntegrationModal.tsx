import React, { useState, useEffect } from 'react';
import type { CommunicationIntegration } from '../types';
import WhatsAppIcon from './icons/WhatsAppIcon';
import ChatBubbleOvalLeftIcon from './icons/ChatBubbleOvalLeftIcon';

interface CommunicationIntegrationModalProps {
    integration: CommunicationIntegration;
    onClose: () => void;
    onSave: (integration: CommunicationIntegration) => void;
}

const Toggle: React.FC<{ enabled: boolean; onChange: (enabled: boolean) => void }> = ({ enabled, onChange }) => (
    <button
        onClick={() => onChange(!enabled)}
        className={`relative inline-flex items-center h-6 rounded-full w-11 transition-colors ${enabled ? 'bg-primary-500' : 'bg-gray-300 dark:bg-gray-600'}`}
    >
        <span className={`inline-block w-4 h-4 transform bg-white rounded-full transition-transform ${enabled ? 'translate-x-6' : 'translate-x-1'}`} />
    </button>
);


const CommunicationIntegrationModal: React.FC<CommunicationIntegrationModalProps> = ({ integration, onClose, onSave }) => {
    const [localIntegration, setLocalIntegration] = useState(integration);
    const [phoneNumber, setPhoneNumber] = useState('+55 11 91234-5678');

    const handleSettingChange = (key: keyof CommunicationIntegration['settings'], value: boolean) => {
        setLocalIntegration(prev => ({
            ...prev,
            settings: {
                ...prev.settings,
                [key]: value
            }
        }));
    };
    
    const handleConnect = () => {
        setLocalIntegration(prev => ({ ...prev, connected: true }));
    }
    
    const handleDisconnect = () => {
         setLocalIntegration(prev => ({ ...prev, connected: false }));
    }

    const IntegrationIcon = ({ id }: {id: 'whatsapp' | 'sms'}) => {
        if (id === 'whatsapp') return <WhatsAppIcon className="w-10 h-10 text-green-500" />;
        return <ChatBubbleOvalLeftIcon className="w-10 h-10 text-blue-500" />;
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center p-4">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-lg flex flex-col transform transition-all duration-300 scale-95 opacity-0 animate-fade-in-scale">
                <div className="flex items-start justify-between p-6 border-b border-gray-200 dark:border-gray-700">
                    <div className="flex items-center gap-4">
                        <IntegrationIcon id={localIntegration.id} />
                        <div>
                            <h2 className="text-xl font-bold text-gray-800 dark:text-white">Gerenciar {localIntegration.name}</h2>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Configure suas automações de mensagens.</p>
                        </div>
                    </div>
                    <button onClick={onClose} className="p-2 -mt-2 -mr-2 rounded-full text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                </div>
                
                <div className="flex-1 p-6 overflow-y-auto space-y-6">
                    {!localIntegration.connected ? (
                        <div className="p-6 text-center bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                            <h3 className="font-semibold text-gray-800 dark:text-white">Conectar sua conta</h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Para habilitar as automações, conecte sua conta.</p>
                            <div className="mt-4">
                                <label htmlFor="phone" className="sr-only">Número de Telefone</label>
                                <input 
                                    type="tel"
                                    id="phone"
                                    value={phoneNumber}
                                    onChange={(e) => setPhoneNumber(e.target.value)}
                                    className="w-full max-w-xs mx-auto px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm"
                                    placeholder="Seu número de telefone"
                                />
                            </div>
                            <button onClick={handleConnect} className="mt-4 px-6 py-2 text-sm font-semibold text-white bg-primary-500 rounded-lg shadow-md hover:bg-primary-600">
                                Conectar
                            </button>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            <div className="flex justify-between items-center p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                                <div>
                                    <p className="font-medium text-gray-800 dark:text-gray-200">Lembretes de Consulta</p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">Enviar lembretes 24h antes da consulta.</p>
                                </div>
                                <Toggle enabled={localIntegration.settings.appointmentReminders} onChange={(val) => handleSettingChange('appointmentReminders', val)} />
                            </div>
                             <div className="flex justify-between items-center p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                                <div>
                                    <p className="font-medium text-gray-800 dark:text-gray-200">Acompanhamento Pós-Consulta</p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">Enviar mensagem de acompanhamento 48h após a consulta.</p>
                                </div>
                                <Toggle enabled={localIntegration.settings.followUps} onChange={(val) => handleSettingChange('followUps', val)} />
                            </div>
                             <div className="text-center pt-4">
                                <button onClick={handleDisconnect} className="text-sm font-medium text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300">
                                    Desconectar conta
                                </button>
                            </div>
                        </div>
                    )}
                </div>
                
                <div className="p-4 bg-gray-50 dark:bg-gray-900/50 border-t border-gray-200 dark:border-gray-700 flex justify-end space-x-3">
                    <button onClick={onClose} className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600 dark:hover:bg-gray-600">
                        Cancelar
                    </button>
                    <button onClick={() => onSave(localIntegration)} className="px-4 py-2 text-sm font-semibold text-white bg-primary-500 rounded-lg shadow-md hover:bg-primary-600">
                        Salvar Alterações
                    </button>
                </div>
                <style>{`
                    @keyframes fade-in-scale {
                    from { opacity: 0; transform: scale(0.95); }
                    to { opacity: 1; transform: scale(1); }
                    }
                    .animate-fade-in-scale { animation: fade-in-scale 0.3s forwards cubic-bezier(0.16, 1, 0.3, 1); }
                `}</style>
            </div>
        </div>
    );
};

export default CommunicationIntegrationModal;
