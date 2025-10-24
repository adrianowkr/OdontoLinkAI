
import React, { useState } from 'react';
import Card from '../components/Card';
import type { MarketplaceJob } from '../types';
import PostProjectModal from '../components/PostJobModal';
import ProjectDetailModal from '../components/ProjectDetailModal';
import PlusCircleIcon from '../components/icons/PlusCircleIcon';
import BriefcaseIcon from '../components/icons/BriefcaseIcon';

const initialJobs: MarketplaceJob[] = [
    { id: 1, title: 'Guia Cirúrgico para Implante (Dente 16)', type: 'Guia Cirúrgico', budget: 'R$ 150-250', postedDate: '2 dias atrás', skills: ['ExoCAD', 'Planejamento de Implante'], description: '...' },
    { id: 2, title: 'Design de Coroas Anatômicas (4 elementos)', type: 'Prótese Fixa', budget: 'R$ 300-450', postedDate: '5 dias atrás', skills: ['3Shape', 'Morfologia Dental'], description: '...' },
    { id: 3, title: 'Planejamento de Alinhadores Ortodônticos', type: 'Ortodontia', budget: 'R$ 500+', postedDate: '1 semana atrás', skills: ['NemoStudio', 'Setup Ortodôntico'], description: '...' },
];

interface MarketplaceProps {
    jobs: MarketplaceJob[];
    setJobs: React.Dispatch<React.SetStateAction<MarketplaceJob[]>>;
}

const Marketplace: React.FC<MarketplaceProps> = ({ jobs: userJobs, setJobs: setUserJobs }) => {
    const [jobs, setJobs] = useState(initialJobs);
    const [isPostJobModalOpen, setIsPostJobModalOpen] = useState(false);
    const [selectedJob, setSelectedJob] = useState<MarketplaceJob | null>(null);

    return (
        <div className="space-y-6 animate-fade-in">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-3xl font-bold text-gray-800 dark:text-white">Marketplace de Design</h2>
                    <p className="text-gray-500 dark:text-gray-400 mt-1">Encontre designers CAD/CAM para seus projetos ou publique uma nova vaga.</p>
                </div>
                <button onClick={() => setIsPostJobModalOpen(true)} className="flex items-center px-4 py-2 text-sm font-semibold text-white bg-primary-500 rounded-lg shadow-md hover:bg-primary-600 transition-colors">
                    <PlusCircleIcon className="w-5 h-5 mr-2" />
                    Publicar Projeto
                </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {jobs.map(job => (
                    <Card key={job.id} title={job.type}>
                        <div className="flex flex-col h-full">
                            <h4 className="font-bold text-gray-800 dark:text-white flex-grow">{job.title}</h4>
                            <div className="mt-2 text-sm text-gray-500 dark:text-gray-400 space-y-1">
                                <p><strong>Orçamento:</strong> {job.budget}</p>
                                <p><strong>Publicado:</strong> {job.postedDate}</p>
                            </div>
                            <div className="mt-3 flex flex-wrap gap-1">
                                {job.skills.slice(0, 2).map(skill => (
                                    <span key={skill} className="px-2 py-0.5 text-xs font-medium rounded-full bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-200">{skill}</span>
                                ))}
                            </div>
                            <button onClick={() => setSelectedJob(job)} className="mt-4 w-full px-3 py-2 text-sm font-semibold text-primary-700 bg-primary-100 dark:bg-primary-900/50 dark:text-primary-200 rounded-lg hover:bg-primary-200 dark:hover:bg-primary-900 transition-colors">
                                Ver Detalhes
                            </button>
                        </div>
                    </Card>
                ))}
                 <div className="bg-gray-50 dark:bg-gray-800/50 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl flex flex-col items-center justify-center p-6 text-center hover:border-primary-400 transition-colors">
                    <BriefcaseIcon className="w-10 h-10 text-gray-400" />
                    <p className="mt-2 font-semibold text-gray-700 dark:text-gray-300">Tem um novo projeto?</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Publique para nossa rede de designers.</p>
                    <button onClick={() => setIsPostJobModalOpen(true)} className="mt-4 px-4 py-2 text-sm font-semibold text-white bg-primary-500 rounded-lg shadow-md hover:bg-primary-600">
                        Publicar Agora
                    </button>
                </div>
            </div>

            {isPostJobModalOpen && <PostProjectModal onClose={() => setIsPostJobModalOpen(false)} />}
            {selectedJob && <ProjectDetailModal project={selectedJob} onClose={() => setSelectedJob(null)} />}
            
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

export default Marketplace;
