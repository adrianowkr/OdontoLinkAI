import React from 'react';
import DashboardIcon from './icons/DashboardIcon';
import UsersIcon from './icons/UsersIcon';
import CalendarIcon from './icons/CalendarIcon';
import BeakerIcon from './icons/BeakerIcon';
import SparklesIcon from './icons/SparklesIcon';
import DollarIcon from './icons/DollarIcon';
import BriefcaseIcon from './icons/BriefcaseIcon';
import CogIcon from './icons/CogIcon';
// FIX: Corrected import path for UserRole type.
import { UserRole } from '../types';

type ViewKey = 'dashboard' | 'patients' | 'agenda' | 'labs' | 'finance' | 'marketplace' | 'settings';

type NavItemType = {
  key: ViewKey;
  label: string;
  icon: React.ElementType;
  roles: UserRole[];
};

const navItems: NavItemType[] = [
  { key: 'dashboard', label: 'Dashboard', icon: DashboardIcon, roles: ['dentist'] },
  { key: 'patients', label: 'Pacientes', icon: UsersIcon, roles: ['dentist'] },
  { key: 'agenda', label: 'Agenda', icon: CalendarIcon, roles: ['dentist'] },
  { key: 'labs', label: 'Laboratórios', icon: BeakerIcon, roles: ['dentist', 'lab'] },
  { key: 'finance', label: 'Financeiro', icon: DollarIcon, roles: ['dentist'] },
  { key: 'marketplace', label: 'Marketplace', icon: BriefcaseIcon, roles: ['dentist', 'designer'] },
  { key: 'settings', label: 'Configurações', icon: CogIcon, roles: ['dentist', 'lab', 'designer'] },
];

interface SidebarProps {
  currentView: string;
  setCurrentView: (view: any) => void;
  onOpenChat: () => void;
  userRole: UserRole;
}

const NavItem: React.FC<{ item: NavItemType, isActive: boolean, onClick: () => void }> = ({ item, isActive, onClick }) => {
  const Icon = item.icon;
  return (
    <li>
      <button
        onClick={onClick}
        className={`w-full flex items-center px-4 py-2.5 text-sm font-medium rounded-lg transition-colors duration-200 ${
          isActive
            ? 'bg-primary-500 text-white shadow-lg'
            : 'text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
        }`}
      >
        <Icon className="w-5 h-5 mr-3" />
        <span>{item.label}</span>
      </button>
    </li>
  );
};


const Sidebar: React.FC<SidebarProps> = ({ currentView, setCurrentView, onOpenChat, userRole }) => {
  const visibleNavItems = navItems.filter(item => item.roles.includes(userRole));
  
  return (
    <aside className="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col flex-shrink-0">
      <div className="h-16 flex items-center justify-center border-b border-gray-200 dark:border-gray-700 flex-shrink-0">
        <SparklesIcon className="w-7 h-7 text-primary-500" />
        <h1 className="ml-2 text-xl font-bold text-gray-800 dark:text-white">OdontoLink</h1>
      </div>
      <nav className="flex-1 px-4 py-6 space-y-2">
        <ul>
            {visibleNavItems.map(item => (
                <NavItem 
                    key={item.key} 
                    item={item} 
                    isActive={currentView === item.key} 
                    onClick={() => setCurrentView(item.key)} 
                />
            ))}
        </ul>
      </nav>
      <div className="px-4 py-6 border-t border-gray-200 dark:border-gray-700">
        <button onClick={onOpenChat} className="w-full flex items-center justify-center px-4 py-3 text-sm font-semibold text-white bg-gradient-to-r from-primary-500 to-blue-500 rounded-lg shadow-md hover:from-primary-600 hover:to-blue-600 transform hover:scale-105 transition-all duration-300">
          <SparklesIcon className="w-5 h-5 mr-2" />
          Dr. Link Assistente
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;