import React from 'react';
import type { MarketplaceJob } from '../types';
import BriefcaseIcon from './icons/BriefcaseIcon';

interface ProjectDetailModalProps {
    project: MarketplaceJob;
    onClose: () => void;
}

const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({ project, onClose }) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center p-4">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-lg flex flex-col transform transition-all duration-300 scale-95 opacity-0 animate-fade-in-scale">
                <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
                    <div className="flex items-center">
                        <BriefcaseIcon className="w-6 h-6 text-primary-500" />
                        <h2 className="ml-2 text-lg font-bold text-gray-800 dark:text-white">Detalhes do Projeto</h2>
                    </div>
                    <button onClick={onClose} className="p-2 rounded-full text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                </div>

                <div className="p-6 space-y-4">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">{project.title}</h3>
                    <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-gray-500 dark:text-gray-400">
                        <span><strong>Tipo:</strong> {project.type}</span>
                        <span><strong>Orçamento:</strong> {project.budget}</span>
                        <span><strong>Publicado:</strong> {project.postedDate}</span>
                    </div>
                     <div>
                        <h4 className="font-semibold text-gray-700 dark:text-gray-300">Habilidades Necessárias</h4>
                        <div className="mt-2 flex flex-wrap gap-2">
                           {project.skills.map(skill => (
                               <span key={skill} className="px-2 py-1 text-xs font-medium rounded-full bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-200">{skill}</span>
                           ))}
                       </div>
                    </div>
                    <div>
                        <h4 className="font-semibold text-gray-700 dark:text-gray-300">Descrição</h4>
                        <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
                            Descrição detalhada do projeto estaria aqui. Precisamos de um designer experiente para criar um guia cirúrgico preciso para um caso de implante na região do dente 16. O arquivo de tomografia será fornecido.
                        </p>
                    </div>
                </div>

                <div className="p-4 bg-gray-50 dark:bg-gray-900/50 border-t border-gray-200 dark:border-gray-700 flex justify-end space-x-3">
                    <button onClick={onClose} className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600 dark:hover:bg-gray-600">
                        Fechar
                    </button>
                    <button className="px-4 py-2 text-sm font-semibold text-white bg-primary-500 rounded-lg shadow-md hover:bg-primary-600">
                        Enviar Proposta
                    </button>
                </div>
            </div>
            <style>{`
                @keyframes fade-in-scale {
                    from { opacity: 0; transform: scale(0.95); }
                    to { opacity: 1; transform: scale(1); }
                }
                .animate-fade-in-scale { animation: fade-in-scale 0.3s forwards cubic-bezier(0.16, 1, 0.3, 1); }
            `}</style>
        </div>
    );
};

export default ProjectDetailModal;