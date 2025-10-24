import React, { useState } from 'react';
import ArrowRightOnRectangleIcon from './icons/ArrowRightOnRectangleIcon';
import BellIcon from './icons/BellIcon';
import NotificationPanel from './NotificationPanel';
// FIX: Corrected import path for UserRole type.
import { UserRole } from '../types';
import UsersIcon from './icons/UsersIcon';
import BeakerIcon from './icons/BeakerIcon';
import BriefcaseIcon from './icons/BriefcaseIcon';


interface HeaderProps {
  toggleDarkMode: () => void;
  isDarkMode: boolean;
  onLogout: () => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  userRole: UserRole;
  setUserRole: (role: UserRole) => void;
}

const SunIcon: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.95-4.243l-1.59-1.591M5.25 12H3m4.243-4.95l-1.59-1.591M12 9a3 3 0 100 6 3 3 0 000-6z" />
    </svg>
);

const MoonIcon: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
    </svg>
);

const SearchIcon: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
    </svg>
);

const roleConfig = {
    dentist: { name: 'Dr. Ana Oliveira', role: 'Dentista', icon: UsersIcon },
    lab: { name: 'Lab ProArt', role: 'Laboratório', icon: BeakerIcon },
    designer: { name: 'Lucas Mendes', role: 'CAD Designer', icon: BriefcaseIcon },
    patient_portal: { name: 'Paciente', role: 'Portal do Paciente', icon: UsersIcon },
}

const Header: React.FC<HeaderProps> = ({ toggleDarkMode, isDarkMode, onLogout, searchTerm, setSearchTerm, userRole, setUserRole }) => {
    const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
    const currentUser = roleConfig[userRole];
    const UserIcon = currentUser.icon;

  return (
    <header className="h-16 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between px-6 flex-shrink-0">
      <div className="relative w-full max-w-xs">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <SearchIcon className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          placeholder="Buscar paciente, projeto..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-transparent rounded-lg bg-gray-100 dark:bg-gray-700 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition"
        />
      </div>

      <div className="flex items-center space-x-4">
        <button onClick={toggleDarkMode} className="p-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700">
          {isDarkMode ? <SunIcon className="w-6 h-6" /> : <MoonIcon className="w-6 h-6" />}
        </button>
        <div className="relative">
             <button onClick={() => setIsNotificationsOpen(prev => !prev)} className="p-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700">
                <BellIcon className="w-6 h-6" />
                <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
            </button>
            {isNotificationsOpen && <NotificationPanel onClose={() => setIsNotificationsOpen(false)} />}
        </div>
        
        <div className="relative">
            <button onClick={() => setIsUserMenuOpen(prev => !prev)} className="flex items-center space-x-3 p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
                <div className="text-right hidden sm:block">
                    <p className="text-sm font-semibold text-gray-800 dark:text-white">{currentUser.name}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{currentUser.role}</p>
                </div>
                 <div className="w-10 h-10 rounded-full bg-primary-100 dark:bg-primary-800/50 flex items-center justify-center">
                    <UserIcon className="w-6 h-6 text-primary-600 dark:text-primary-300"/>
                </div>
            </button>
            {isUserMenuOpen && (
                <div 
                    className="absolute right-0 mt-2 w-64 bg-white dark:bg-gray-800 rounded-md shadow-lg border border-gray-200 dark:border-gray-700 z-20 animate-fade-in-scale-dropdown"
                    onMouseLeave={() => setIsUserMenuOpen(false)}
                >
                    <div className="p-3 border-b border-gray-200 dark:border-gray-700">
                        <p className="text-sm font-semibold text-gray-800 dark:text-white">{currentUser.name}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{currentUser.role}</p>
                    </div>
                    <div className="p-2 border-b border-gray-200 dark:border-gray-700">
                        <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 px-2 mb-1">Simular como:</p>
                        {(Object.keys(roleConfig) as UserRole[]).filter(r => r !== 'patient_portal').map(role => (
                            <button key={role} onClick={() => setUserRole(role)} className={`w-full flex items-center px-3 py-2 text-sm text-left rounded-md ${userRole === role ? 'bg-primary-100 dark:bg-primary-900/50 text-primary-700 dark:text-primary-200' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'}`}>
                                {React.createElement(roleConfig[role].icon, { className: 'w-5 h-5 mr-2' })}
                                {roleConfig[role].role}
                            </button>
                        ))}
                    </div>
                    <div className="p-2">
                         <button onClick={onLogout} className="w-full flex items-center px-3 py-2 text-sm text-left text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md">
                            <ArrowRightOnRectangleIcon className="w-5 h-5 mr-2" />
                            Sair
                        </button>
                    </div>
                </div>
            )}
        </div>
      </div>
      <style>{`
        @keyframes fade-in-scale-dropdown {
          from { opacity: 0; transform: scale(0.98) translateY(-5px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
        .animate-fade-in-scale-dropdown { animation: fade-in-scale-dropdown 0.1s ease-out forwards; }
      `}</style>
    </header>
  );
};

export default Header;