import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Home, Gift, TrendingUp, Users, DollarSign, Share2 } from 'lucide-react';
import { Doctor } from '../../types';

export default function AffiliateDashboard() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [referredDoctors, setReferredDoctors] = useState<Doctor[]>([]);
  const [totalEarnings, setTotalEarnings] = useState(0);
  const [monthlyEarnings, setMonthlyEarnings] = useState(0);
  const [referralLink, setReferralLink] = useState('');

  useEffect(() => {
    // Load referred doctors from localStorage
    const savedDoctors = localStorage.getItem('doctors');
    const doctors = savedDoctors ? JSON.parse(savedDoctors) : [];
    
    // Filter doctors referred by this affiliate
    const referred = doctors.filter((doc: Doctor) => doc.submittedBy === user?.affiliateId);
    setReferredDoctors(referred);

    // Calculate earnings
    const monthlyPerDoctor = 49 * 0.2; // 20% of 49€
    const yearlyPerDoctor = 499 * 0.2; // 20% of 499€

    const monthly = referred.reduce((acc, doc) => {
      if (doc.subscription?.active) {
        return acc + (doc.subscription.plan === 'monthly' ? monthlyPerDoctor : yearlyPerDoctor / 12);
      }
      return acc;
    }, 0);

    const total = referred.reduce((acc, doc) => {
      if (doc.subscription?.active) {
        const monthsSinceStart = Math.floor(
          (new Date().getTime() - new Date(doc.subscription.startDate).getTime()) / 
          (1000 * 60 * 60 * 24 * 30)
        );
        return acc + (doc.subscription.plan === 'monthly' 
          ? monthlyPerDoctor * monthsSinceStart 
          : yearlyPerDoctor
        );
      }
      return acc;
    }, 0);

    setMonthlyEarnings(monthly);
    setTotalEarnings(total);
    setReferralLink(`https://example.com/register?ref=${user?.affiliateId}`);
  }, [user?.affiliateId]);

  const handleHomeClick = () => {
    navigate('/');
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">
            Programme Ambassadeur
          </h1>
          <p className="text-gray-600 mt-1">
            Gagnez 20% sur chaque abonnement de médecin parrainé
          </p>
        </div>
        <button 
          onClick={handleHomeClick}
          className="flex items-center px-4 py-2 text-sm font-medium text-emerald-600 bg-emerald-50 rounded-lg hover:bg-emerald-100"
        >
          <Home className="w-4 h-4 mr-2" />
          Retour à l'accueil
        </button>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Médecins référés</p>
              <p className="text-2xl font-bold">{referredDoctors.length}</p>
            </div>
            <Users className="w-8 h-8 text-emerald-600" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Médecins actifs</p>
              <p className="text-2xl font-bold">
                {referredDoctors.filter(d => d.subscription?.active).length}
              </p>
            </div>
            <TrendingUp className="w-8 h-8 text-emerald-600" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Gains mensuels</p>
              <p className="text-2xl font-bold text-emerald-600">
                {monthlyEarnings.toFixed(2)}€
              </p>
            </div>
            <DollarSign className="w-8 h-8 text-emerald-600" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Gains totaux</p>
              <p className="text-2xl font-bold text-emerald-600">
                {totalEarnings.toFixed(2)}€
              </p>
            </div>
            <Gift className="w-8 h-8 text-emerald-600" />
          </div>
        </div>
      </div>

      {/* Referral Link */}
      <div className="bg-white p-6 rounded-lg shadow mb-6">
        <h2 className="text-lg font-medium mb-4">Votre lien de parrainage</h2>
        <div className="flex items-center gap-4">
          <input
            type="text"
            value={referralLink}
            readOnly
            className="flex-1 px-4 py-2 border rounded-lg bg-gray-50"
          />
          <button
            onClick={() => navigator.clipboard.writeText(referralLink)}
            className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700"
          >
            <Share2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Referred Doctors List */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b">
          <h2 className="text-lg font-medium">Médecins référés</h2>
        </div>
        <div className="divide-y">
          {referredDoctors.map(doctor => (
            <div key={doctor.id} className="p-6 flex items-center justify-between">
              <div className="flex items-center">
                <img 
                  src={doctor.image} 
                  alt={doctor.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="ml-4">
                  <h3 className="font-medium">{doctor.name}</h3>
                  <p className="text-sm text-gray-500">{doctor.specialty}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className={`px-2 py-1 text-sm rounded-full ${
                  doctor.subscription?.active
                    ? 'bg-green-100 text-green-800'
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  {doctor.subscription?.active ? 'Actif' : 'En attente'}
                </span>
                <span className="text-sm text-gray-500">
                  {new Date(doctor.submittedAt).toLocaleDateString()}
                </span>
              </div>
            </div>
          ))}
          {referredDoctors.length === 0 && (
            <div className="p-6 text-center text-gray-500">
              Vous n'avez pas encore référé de médecins
            </div>
          )}
        </div>
      </div>
    </div>
  );
}