import React, { useState } from 'react';
import BriefcaseIcon from './icons/BriefcaseIcon';
import SparklesIcon from './icons/SparklesIcon';
import StarIcon from './icons/StarIcon';
import { getDesignerMatch } from '../services/geminiService';
import type { CadDesigner } from '../types';

interface PostProjectModalProps {
    onClose: () => void;
}

type ModalStep = 'form' | 'matching' | 'results';

const PostProjectModal: React.FC<PostProjectModalProps> = ({ onClose }) => {
  const [step, setStep] = useState<ModalStep>('form');
  const [description, setDescription] = useState('');
  const [matchedDesigners, setMatchedDesigners] = useState<CadDesigner[]>([]);

  const handleFindDesigners = async (e: React.FormEvent) => {
      e.preventDefault();
      if (!description.trim()) return;

      setStep('matching');
      const results = await getDesignerMatch(description);
      setMatchedDesigners(results);
      setStep('results');
  };

  const renderContent = () => {
      switch (step) {
          case 'matching':
              return (
                  <div className="text-center py-16 space-y-4">
                      <div className="relative w-24 h-24 mx-auto">
                          <div className="absolute inset-0 border-4 border-gray-200 dark:border-gray-600 rounded-full"></div>
                          <div className="absolute inset-0 border-4 border-t-primary-500 rounded-full animate-spin"></div>
                          <div className="absolute inset-0 flex items-center justify-center">
                              <SparklesIcon className="w-10 h-10 text-primary-500" />
                          </div>
                      </div>
                      <h3 className="text-xl font-bold mt-4 text-gray-800 dark:text-white">Buscando Talentos...</h3>
                      <p className="text-gray-500 dark:text-gray-400 max-w-sm mx-auto">Dr. Link está analisando nossa rede de designers para encontrar a combinação perfeita para o seu projeto.</p>
                  </div>
              );
          case 'results':
              return (
                  <div className="p-6 space-y-4">
                      <h3 className="text-xl font-bold text-center text-gray-800 dark:text-white">Designers Recomendados pela IA</h3>
                       <div className="space-y-4">
                          {matchedDesigners.map(designer => (
                              <div key={designer.id} className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg flex items-center gap-4">
                                  <img src={designer.avatarUrl} alt={designer.name} className="w-16 h-16 rounded-full object-cover" />
                                  <div className="flex-1">
                                      <div className="flex justify-between items-start">
                                        <div>
                                            <h4 className="font-bold text-gray-800 dark:text-white">{designer.name}</h4>
                                            <div className="flex items-center gap-1 text-sm text-yellow-500">
                                                <StarIcon className="w-4 h-4" />
                                                <span>{designer.rating.toFixed(1)}</span>
                                            </div>
                                        </div>
                                         <button className="px-3 py-1 text-xs font-semibold text-white bg-primary-500 rounded-full hover:bg-primary-600">Contratar</button>
                                      </div>
                                      <p className="mt-2 text-xs text-gray-600 dark:text-gray-300 bg-primary-50 dark:bg-gray-700 p-2 rounded-md border-l-2 border-primary-400" dangerouslySetInnerHTML={{ __html: designer.aiMatchReason }}></p>
                                  </div>
                              </div>
                          ))}
                      </div>
                  </div>
              );
          case 'form':
          default:
              return (
                   <form id="project-form" onSubmit={handleFindDesigners} className="flex-1 p-6 overflow-y-auto space-y-4">
                      <div>
                          <label htmlFor="job-title" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Título do Projeto</label>
                          <input type="text" id="job-title" className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500" placeholder="Ex: Guia Cirúrgico para Implante" required/>
                      </div>
                       <div>
                          <label htmlFor="job-description" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Descrição Detalhada do Projeto</label>
                          <textarea 
                            id="job-description" 
                            rows={5} 
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500" placeholder="Descreva os detalhes do caso, o software desejado, e o prazo." required></textarea>
                      </div>
                       <div>
                          <label htmlFor="job-budget" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Orçamento (Opcional)</label>
                          <input type="text" id="job-budget" className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500" placeholder="Ex: R$ 400 - R$ 600" />
                      </div>
                  </form>
              );
      }
  }

  const renderFooter = () => {
      switch (step) {
          case 'results':
              return (
                <>
                    <button onClick={() => setStep('form')} className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600 dark:hover:bg-gray-600">
                        Voltar
                    </button>
                    <button onClick={onClose} className="px-4 py-2 text-sm font-semibold text-white bg-primary-500 rounded-lg shadow-md hover:bg-primary-600">
                        Concluir
                    </button>
                </>
              );
          case 'form':
              return (
                 <>
                    <button onClick={onClose} className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600 dark:hover:bg-gray-600">
                        Cancelar
                    </button>
                    <button type="submit" form="project-form" className="flex items-center justify-center px-4 py-2 text-sm font-semibold text-white bg-primary-500 rounded-lg shadow-md hover:bg-primary-600">
                        <SparklesIcon className="w-5 h-5 mr-2" />
                        Publicar e Encontrar Designer
                    </button>
                </>
              );
            case 'matching':
            default:
                return null; // No footer during matching
      }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-2xl flex flex-col transform transition-all duration-300 scale-95 opacity-0 animate-fade-in-scale min-h-[60vh]">
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center">
            <BriefcaseIcon className="w-6 h-6 text-primary-500" />
            <h2 className="ml-2 text-lg font-bold text-gray-800 dark:text-white">Publicar Novo Projeto</h2>
          </div>
          <button onClick={onClose} className="p-2 rounded-full text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700">
             <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>
        
        {renderContent()}
        
        <div className="p-4 border-t border-gray-200 dark:border-gray-700 flex justify-end space-x-3">
            {renderFooter()}
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

export default PostProjectModal;