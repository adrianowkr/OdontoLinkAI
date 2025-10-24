import React from 'react';

interface NotificationPanelProps {
    onClose: () => void;
}

const NotificationPanel: React.FC<NotificationPanelProps> = ({ onClose }) => {
    const notifications = [
        { id: 1, text: "A consulta de 'Sofia Andrade' foi confirmada.", time: "5 min atrás" },
        { id: 2, text: "O pedido laboratorial ODL-8432 foi atualizado para 'Em Produção'.", time: "1 hora atrás" },
        { id: 3, text: "Lembrete: Ligar para o laboratório sobre o caso de Fernanda Lima.", time: "3 horas atrás" },
    ];
    return (
        <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-20">
            <div className="p-4 flex justify-between items-center border-b dark:border-gray-700">
                <h3 className="font-semibold text-gray-800 dark:text-white">Notificações</h3>
                <button onClick={onClose} className="text-sm text-primary-500 hover:underline">Fechar</button>
            </div>
            <ul className="divide-y dark:divide-gray-700 max-h-80 overflow-y-auto">
                {notifications.map(notif => (
                    <li key={notif.id} className="p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50">
                        <p className="text-sm text-gray-700 dark:text-gray-300">{notif.text}</p>
                        <p className="text-xs text-gray-400 mt-1">{notif.time}</p>
                    </li>
                ))}
            </ul>
             <div className="p-2 text-center border-t dark:border-gray-700">
                <button className="text-sm font-medium text-primary-500 hover:underline">Ver todas</button>
            </div>
        </div>
    );
};

export default NotificationPanel;
