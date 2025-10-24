import React, { useState } from 'react';
import Card from '../components/Card';
import type { LabOrder, Patient } from '../types';
import PlusCircleIcon from '../components/icons/PlusCircleIcon';
import FileUploadModal from '../components/FileUploadModal';
import ChatBubbleLeftEllipsisIcon from '../components/icons/ChatBubbleLeftEllipsisIcon';
import IntegratedChatModal from '../components/IntegratedChatModal';

interface LabsProps {
    labOrders: LabOrder[];
    patients: Patient[];
    onNewOrder: () => void;
    onNavigateToPatientChart: (patientId: number) => void;
}

const Labs: React.FC<LabsProps> = ({ labOrders, patients, onNewOrder, onNavigateToPatientChart }) => {
    const [isFileUploadModalOpen, setIsFileUploadModalOpen] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState<LabOrder | null>(null);
    const [isChatModalOpen, setIsChatModalOpen] = useState(false);
    const [chatContext, setChatContext] = useState<LabOrder | null>(null);
    
    const handleOpenFileUpload = (order: LabOrder) => {
        setSelectedOrder(order);
        setIsFileUploadModalOpen(true);
    };

    const handleOpenChat = (order: LabOrder) => {
        setChatContext(order);
        setIsChatModalOpen(true);
    };

    const getPatientName = (patientId: number) => {
        return patients.find(p => p.id === patientId)?.name || 'Paciente não encontrado';
    }

    const statusConfig: Record<LabOrder['status'], { label: string, color: string }> = {
        sent: { label: 'Enviado', color: 'bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300' },
        in_production: { label: 'Em Produção', color: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300' },
        completed: { label: 'Concluído', color: 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300' },
        on_hold: { label: 'Pendente', color: 'bg-gray-200 text-gray-700 dark:bg-gray-600 dark:text-gray-200' }
    };

    return (
        <div className="space-y-6 animate-fade-in">
             <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-3xl font-bold text-gray-800 dark:text-white">Pedidos Laboratoriais</h2>
                    <p className="text-gray-500 dark:text-gray-400 mt-1">Acompanhe seus pedidos e envie novos projetos.</p>
                </div>
                <button onClick={onNewOrder} className="flex items-center px-4 py-2 text-sm font-semibold text-white bg-primary-500 rounded-lg shadow-md hover:bg-primary-600 transition-colors">
                    <PlusCircleIcon className="w-5 h-5 mr-2" />
                    Novo Pedido
                </button>
            </div>
            
            <Card title="Acompanhamento de Pedidos">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                        <thead className="bg-gray-50 dark:bg-gray-700/50">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Pedido</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Paciente</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Item</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Status</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Prazo</th>
                                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Ações</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                            {labOrders.map(order => (
                                <tr key={order.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                                    <td onClick={() => onNavigateToPatientChart(order.patientId)} className="px-6 py-4 whitespace-nowrap text-sm font-medium text-primary-600 dark:text-primary-400 cursor-pointer">{order.id}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">{getPatientName(order.patientId)}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">{order.item}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${statusConfig[order.status].color}`}>
                                            {statusConfig[order.status].label}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">{order.dueDate}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                                        <button onClick={() => handleOpenFileUpload(order)} className="text-primary-600 hover:text-primary-900 dark:text-primary-400 dark:hover:text-primary-200">Analisar Arquivo</button>
                                        <button onClick={() => handleOpenChat(order)} className="text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-white p-1" title="Chat com Laboratório"><ChatBubbleLeftEllipsisIcon className="w-5 h-5"/></button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Card>

            {/* FIX: Passed patientName along with the order to FileUploadModal. */}
            {isFileUploadModalOpen && selectedOrder && <FileUploadModal order={{...selectedOrder, patientName: getPatientName(selectedOrder.patientId)}} onClose={() => setIsFileUploadModalOpen(false)} />}
            {isChatModalOpen && chatContext && <IntegratedChatModal context={{...chatContext, patientName: getPatientName(chatContext.patientId)}} onClose={() => setIsChatModalOpen(false)} />}

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

export default Labs;