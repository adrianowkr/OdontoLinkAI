import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './views/Dashboard';
import Patients from './views/Patients';
import Agenda from './views/Agenda';
import Labs from './views/Labs';
import Finance from './views/Finance';
import Marketplace from './views/Marketplace';
import Settings from './views/Settings';
import DrLinkChat from './components/DrLinkChat';
import Login from './views/Login';
import Register from './views/Register';
import PatientChart from './views/PatientChart';
import PatientPortal from './views/PatientPortal';
import { UserRole, Patient, ClinicalCase, LabOrder, MarketplaceJob, TreatmentPlan } from './types';
import EditProfileModal from './components/EditProfileModal';
import NotificationSettingsModal from './components/NotificationSettingsModal';
import { mockPatients as initialMockPatients, mockLabs as initialMockLabs } from './services/mockData';
import NewLabOrderModal from './components/NewLabOrderModal';
import PatientFormModal from './components/PatientFormModal';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [currentView, setCurrentView] = useState('dashboard');
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [userRole, setUserRole] = useState<UserRole>('dentist');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authScreen, setAuthScreen] = useState<'login' | 'register'>('login');
  const [selectedPatientId, setSelectedPatientId] = useState<number | null>(null);
  
  // Modals
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const [isNotificationSettingsOpen, setIsNotificationSettingsOpen] = useState(false);
  const [isNewLabOrderModalOpen, setIsNewLabOrderModalOpen] = useState(false);
  const [isPatientFormModalOpen, setIsPatientFormModalOpen] = useState(false);
  const [editingPatient, setEditingPatient] = useState<Patient | null>(null);

  // DYNAMIC STATE
  const [patients, setPatients] = useState<Patient[]>(initialMockPatients);
  const [labOrders, setLabOrders] = useState<LabOrder[]>(initialMockLabs);
  const [jobs, setJobs] = useState<MarketplaceJob[]>([]);

  const handleSetCurrentView = (view: string) => {
    setSelectedPatientId(null);
    setCurrentView(view);
  };

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const handleNavigateToPatientChart = (patientId: number) => {
      setSelectedPatientId(patientId);
      setCurrentView('patient-chart');
  };
  
  const handleUpdatePatient = (updatedPatient: Patient) => {
      setPatients(prev => prev.map(p => p.id === updatedPatient.id ? updatedPatient : p));
  };

  const handleSavePatient = (patientData: Omit<Patient, 'id' | 'avatarUrl' | 'clinicalCases' | 'treatmentPlans' | 'transactions' | 'images'>) => {
    if (editingPatient) {
        // Edit
        const updatedPatient = { ...editingPatient, ...patientData };
        handleUpdatePatient(updatedPatient);
    } else {
        // Add
        const newPatient: Patient = {
            ...patientData,
            id: Date.now(),
            avatarUrl: `https://i.pravatar.cc/150?u=${Date.now()}`,
            clinicalCases: [],
            treatmentPlans: [],
            transactions: [],
            images: [],
        };
        setPatients(prev => [newPatient, ...prev]);
    }
    setEditingPatient(null);
    setIsPatientFormModalOpen(false);
  };
  
  const handleSaveLabOrder = (orderData: { patientId: number; item: string; dueDate: string; labName: string }) => {
    const caseId = `${orderData.patientId}-${Date.now()}`;
    const newOrder: LabOrder = {
        id: `ODL-${Math.floor(Math.random() * 9000) + 1000}`,
        patientId: orderData.patientId,
        caseId: caseId,
        item: orderData.item,
        dueDate: new Date(orderData.dueDate).toLocaleDateString('pt-BR'),
        status: 'sent',
        labName: orderData.labName,
    };
    const newCase: ClinicalCase = {
        id: caseId,
        patientId: orderData.patientId,
        procedure: orderData.item,
        status: 'Planning',
        creationDate: new Date().toLocaleDateString('pt-BR'),
        labOrderIds: [newOrder.id],
    };

    setLabOrders(prev => [newOrder, ...prev]);
    
    const patientToUpdate = patients.find(p => p.id === orderData.patientId);
    if (patientToUpdate) {
        const updatedPatient = {
            ...patientToUpdate,
            clinicalCases: [...patientToUpdate.clinicalCases, newCase],
        };
        handleUpdatePatient(updatedPatient);
        handleNavigateToPatientChart(orderData.patientId);
    }
    
    setIsNewLabOrderModalOpen(false);
  };


  const renderView = () => {
    const selectedPatient = patients.find(p => p.id === selectedPatientId);

    if (currentView === 'patient-chart' && selectedPatient) {
        return <PatientChart patient={selectedPatient} onUpdatePatient={handleUpdatePatient} />;
    }
    
    switch (currentView) {
      case 'dashboard':
        return <Dashboard patients={patients} onNavigateToPatientChart={handleNavigateToPatientChart} />;
      case 'patients':
        return <Patients 
            patients={patients} 
            onSelectPatient={(p) => handleNavigateToPatientChart(p.id)}
            onAddPatient={() => { setEditingPatient(null); setIsPatientFormModalOpen(true); }}
            onEditPatient={(p) => { setEditingPatient(p); setIsPatientFormModalOpen(true); }}
        />;
      case 'agenda':
        return <Agenda patients={patients} onNavigateToPatientChart={handleNavigateToPatientChart} />;
      case 'labs':
        return <Labs labOrders={labOrders} patients={patients} onNewOrder={() => setIsNewLabOrderModalOpen(true)} onNavigateToPatientChart={handleNavigateToPatientChart} />;
      case 'finance':
        return <Finance patients={patients} />;
      case 'marketplace':
        return <Marketplace jobs={jobs} setJobs={setJobs} />;
      case 'settings':
        return <Settings onOpenEditProfile={() => setIsEditProfileOpen(true)} onOpenNotificationSettings={() => setIsNotificationSettingsOpen(true)} />;
      default:
        return <Dashboard patients={patients} onNavigateToPatientChart={handleNavigateToPatientChart} />;
    }
  };

  if (!isAuthenticated) {
    if (authScreen === 'login') {
      return <Login onLogin={() => setIsAuthenticated(true)} onSwitchToRegister={() => setAuthScreen('register')} />;
    }
    return <Register onRegister={() => setIsAuthenticated(true)} onSwitchToLogin={() => setAuthScreen('login')} />;
  }

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900 font-sans">
      <Sidebar 
        currentView={currentView} 
        setCurrentView={handleSetCurrentView}
        onOpenChat={() => setIsChatOpen(true)}
        userRole={userRole}
      />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header 
          toggleDarkMode={() => setIsDarkMode(!isDarkMode)}
          isDarkMode={isDarkMode}
          onLogout={() => setIsAuthenticated(false)}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          userRole={userRole}
          setUserRole={setUserRole}
        />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 dark:bg-gray-900 p-6">
          {renderView()}
        </main>
      </div>
      {isChatOpen && <DrLinkChat onClose={() => setIsChatOpen(false)} />}
      {isNewLabOrderModalOpen && <NewLabOrderModal patients={patients} onClose={() => setIsNewLabOrderModalOpen(false)} onSave={handleSaveLabOrder} />}
      {isPatientFormModalOpen && <PatientFormModal patient={editingPatient} onClose={() => { setEditingPatient(null); setIsPatientFormModalOpen(false); }} onSave={handleSavePatient} />}
      {isEditProfileOpen && <EditProfileModal onClose={() => setIsEditProfileOpen(false)} />}
      {isNotificationSettingsOpen && <NotificationSettingsModal onClose={() => setIsNotificationSettingsOpen(false)} />}
    </div>
  );
}

export default App;
