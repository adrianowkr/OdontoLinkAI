import React from 'react';
import UserCircleIcon from './icons/UserCircleIcon';

interface EditProfileModalProps {
    onClose: () => void;
}

const EditProfileModal: React.FC<EditProfileModalProps> = ({ onClose }) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center p-4">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-md flex flex-col transform transition-all duration-300 scale-95 opacity-0 animate-fade-in-scale">
                <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
                    <div className="flex items-center">
                        <UserCircleIcon className="w-6 h-6 text-primary-500" />
                        <h2 className="ml-2 text-lg font-bold text-gray-800 dark:text-white">Editar Perfil</h2>
                    </div>
                    <button onClick={onClose} className="p-2 rounded-full text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                </div>

                <div className="p-6 text-center">
                    <p className="text-gray-600 dark:text-gray-300">A funcionalidade completa de edição de perfil estaria aqui.</p>
                </div>

                <div className="p-4 bg-gray-50 dark:bg-gray-900/50 border-t border-gray-200 dark:border-gray-700 flex justify-end">
                    <button onClick={onClose} className="px-4 py-2 text-sm font-semibold text-white bg-primary-500 rounded-lg shadow-md hover:bg-primary-600">
                        OK
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

export default EditProfileModal;