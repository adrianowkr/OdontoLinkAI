// FIX: Created this file to provide the ManageSubscriptionModal component.
import React from 'react';
import StarIcon from './icons/StarIcon';
import CheckIcon from './icons/CheckIcon';

interface ManageSubscriptionModalProps {
    onClose: () => void;
}

const ManageSubscriptionModal: React.FC<ManageSubscriptionModalProps> = ({ onClose }) => {
    const plans = [
        {
            name: "Básico",
            price: "R$ 99",
            features: ["Até 500 pacientes", "Agenda Inteligente", "Prontuário Digital"],
            isCurrent: false,
        },
        {
            name: "Pro",
            price: "R$ 199",
            features: ["Pacientes Ilimitados", "Todas as funções do Básico", "Dr. Link Assistente de IA", "Análise de Imagens com IA"],
            isCurrent: true,
        },
        {
            name: "Enterprise",
            price: "Contato",
            features: ["Todas as funções do Pro", "Suporte Dedicado", "Integrações Personalizadas", "White Label"],
            isCurrent: false,
        }
    ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-4xl flex flex-col transform transition-all duration-300 scale-95 opacity-0 animate-fade-in-scale">
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center">
            <StarIcon className="w-6 h-6 text-primary-500" />
            <h2 className="ml-2 text-lg font-bold text-gray-800 dark:text-white">Gerenciar Assinatura</h2>
          </div>
          <button onClick={onClose} className="p-2 rounded-full text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700">
             <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>
        
        <div className="flex-1 p-6 overflow-y-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {plans.map(plan => (
                    <div key={plan.name} className={`p-6 border rounded-lg flex flex-col ${plan.isCurrent ? 'border-primary-500 bg-primary-50 dark:bg-gray-700/50' : 'border-gray-200 dark:border-gray-700'}`}>
                        <h3 className="text-xl font-bold text-gray-800 dark:text-white">{plan.name}</h3>
                        <p className="mt-2 text-3xl font-extrabold text-gray-900 dark:text-white">{plan.price}<span className="text-base font-medium text-gray-500 dark:text-gray-400">/mês</span></p>
                        <ul className="mt-6 space-y-3 text-sm text-gray-600 dark:text-gray-300 flex-1">
                            {plan.features.map(feature => (
                                <li key={feature} className="flex items-start">
                                    <CheckIcon className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" />
                                    <span>{feature}</span>
                                </li>
                            ))}
                        </ul>
                         <button 
                            disabled={plan.isCurrent}
                            className="mt-8 w-full px-4 py-2 text-sm font-semibold text-white rounded-lg shadow-md transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed bg-primary-500 hover:bg-primary-600">
                            {plan.isCurrent ? 'Plano Atual' : (plan.name === 'Enterprise' ? 'Entrar em Contato' : 'Selecionar Plano')}
                        </button>
                    </div>
                ))}
            </div>
        </div>
        
        <div className="p-4 border-t border-gray-200 dark:border-gray-700 flex justify-end">
            <button onClick={onClose} className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600 dark:hover:bg-gray-600">
                Fechar
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

export default ManageSubscriptionModal;
