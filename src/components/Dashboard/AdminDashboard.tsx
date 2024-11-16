import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import Analytics from './Admin/Analytics';
import DoctorManagement from './Admin/DoctorManagement';
import AffiliateManagement from './Admin/AffiliateManagement';
import BulkImport from './Admin/BulkImport';
import PendingDoctors from './Admin/PendingDoctors';
import { Home, Users, BarChart2, UserPlus, Clock, DollarSign } from 'lucide-react';
import { Doctor } from '../../types';
import { initialDoctors } from '../../data/mockDoctors';

export default function AdminDashboard() {
  const { t } = useTranslation();
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [doctors, setDoctors] = useState<Doctor[]>(() => {
    const savedDoctors = localStorage.getItem('doctors');
    return savedDoctors ? JSON.parse(savedDoctors) : initialDoctors;
  });

  const handleHomeClick = async () => {
    await logout();
    navigate('/');
  };

  const handleUpdateVisibility = (doctorId: number, visible: boolean) => {
    const updatedDoctors = doctors.map(doc => 
      doc.id === doctorId ? { ...doc, approved: visible } : doc
    );
    setDoctors(updatedDoctors);
    localStorage.setItem('doctors', JSON.stringify(updatedDoctors));
  };

  const handleApprovePending = (doctorId: number) => {
    const updatedDoctors = doctors.map(doc =>
      doc.id === doctorId ? { ...doc, approved: true } : doc
    );
    setDoctors(updatedDoctors);
    localStorage.setItem('doctors', JSON.stringify(updatedDoctors));
  };

  const handleRejectPending = (doctorId: number) => {
    const updatedDoctors = doctors.filter(doc => doc.id !== doctorId);
    setDoctors(updatedDoctors);
    localStorage.setItem('doctors', JSON.stringify(updatedDoctors));
  };

  const handleBulkImport = (newDoctors: Doctor[]) => {
    const updatedDoctors = [...doctors, ...newDoctors];
    setDoctors(updatedDoctors);
    localStorage.setItem('doctors', JSON.stringify(updatedDoctors));
  };

  const pendingDoctors = doctors.filter(doc => !doc.approved);
  const approvedDoctors = doctors.filter(doc => doc.approved);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">
          Dashboard Administrateur
        </h1>
        <button 
          onClick={handleHomeClick}
          className="flex items-center px-4 py-2 text-sm font-medium text-emerald-600 bg-emerald-50 rounded-lg hover:bg-emerald-100"
        >
          <Home className="w-4 h-4 mr-2" />
          Retour à l'accueil
        </button>
      </div>
      
      <Tabs defaultValue="doctors" className="space-y-6">
        <TabsList>
          <TabsTrigger value="doctors">
            <Users className="w-4 h-4 mr-2" />
            Médecins
          </TabsTrigger>
          <TabsTrigger value="analytics">
            <BarChart2 className="w-4 h-4 mr-2" />
            Statistiques
          </TabsTrigger>
          <TabsTrigger value="affiliates">
            <DollarSign className="w-4 h-4 mr-2" />
            Programme Ambassadeur
          </TabsTrigger>
          <TabsTrigger value="pending">
            <Clock className="w-4 h-4 mr-2" />
            En attente
            {pendingDoctors.length > 0 && (
              <span className="ml-2 px-2 py-0.5 text-xs bg-red-100 text-red-600 rounded-full">
                {pendingDoctors.length}
              </span>
            )}
          </TabsTrigger>
          <TabsTrigger value="import">
            <UserPlus className="w-4 h-4 mr-2" />
            Import
          </TabsTrigger>
        </TabsList>

        <TabsContent value="doctors">
          <DoctorManagement 
            doctors={approvedDoctors}
            onUpdateVisibility={handleUpdateVisibility}
          />
        </TabsContent>

        <TabsContent value="analytics">
          <Analytics doctors={approvedDoctors} />
        </TabsContent>

        <TabsContent value="affiliates">
          <AffiliateManagement />
        </TabsContent>

        <TabsContent value="pending">
          <PendingDoctors
            doctors={pendingDoctors}
            onApprove={handleApprovePending}
            onReject={handleRejectPending}
          />
        </TabsContent>

        <TabsContent value="import">
          <BulkImport onImport={handleBulkImport} />
        </TabsContent>
      </Tabs>
    </div>
  );
}