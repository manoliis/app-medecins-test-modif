import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Home, Star, Clock, MessageCircle, Share2 } from 'lucide-react';
import { Doctor, Review } from '../../types';

interface Activity {
  id: string;
  type: 'view' | 'contact' | 'review' | 'share';
  doctorId: number;
  doctorName: string;
  date: string;
  details?: string;
}

interface Message {
  id: string;
  doctorId: number;
  doctorName: string;
  content: string;
  date: string;
  isRead: boolean;
}

export default function GuestDashboard() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [activities, setActivities] = useState<Activity[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [sharedDoctors, setSharedDoctors] = useState<Doctor[]>([]);

  useEffect(() => {
    if (!user?.id) return;

    // Load activities
    const savedActivities = localStorage.getItem(`activities_${user.id}`);
    if (savedActivities) {
      setActivities(JSON.parse(savedActivities));
    }

    // Load reviews
    const allReviews: Review[] = [];
    const doctors = JSON.parse(localStorage.getItem('doctors') || '[]');
    doctors.forEach((doctor: Doctor) => {
      const doctorReviews = JSON.parse(localStorage.getItem(`reviews_${doctor.id}`) || '[]');
      allReviews.push(...doctorReviews.filter((r: Review) => r.userId === user.id));
    });
    setReviews(allReviews);

    // Load messages
    const savedMessages = localStorage.getItem(`messages_${user.id}`);
    if (savedMessages) {
      setMessages(JSON.parse(savedMessages));
    }

    // Load shared doctors
    const savedShares = localStorage.getItem(`shares_${user.id}`);
    if (savedShares) {
      setSharedDoctors(JSON.parse(savedShares));
    }
  }, [user?.id]);

  const handleHomeClick = () => {
    navigate('/');
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">
            Bienvenue, {user?.name}
          </h1>
          <p className="text-gray-600 mt-1">
            Gérez vos interactions avec les médecins
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
              <p className="text-sm text-gray-500">Avis donnés</p>
              <p className="text-2xl font-bold">{reviews.length}</p>
            </div>
            <Star className="w-8 h-8 text-emerald-600" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Messages envoyés</p>
              <p className="text-2xl font-bold">{messages.length}</p>
            </div>
            <MessageCircle className="w-8 h-8 text-emerald-600" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Activités récentes</p>
              <p className="text-2xl font-bold">{activities.length}</p>
            </div>
            <Clock className="w-8 h-8 text-emerald-600" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Médecins partagés</p>
              <p className="text-2xl font-bold">{sharedDoctors.length}</p>
            </div>
            <Share2 className="w-8 h-8 text-emerald-600" />
          </div>
        </div>
      </div>

      <Tabs defaultValue="activities" className="space-y-6">
        <TabsList>
          <TabsTrigger value="activities">
            <Clock className="w-4 h-4 mr-2" />
            Activités récentes
          </TabsTrigger>
          <TabsTrigger value="reviews">
            <Star className="w-4 h-4 mr-2" />
            Mes avis
          </TabsTrigger>
          <TabsTrigger value="messages">
            <MessageCircle className="w-4 h-4 mr-2" />
            Messages
          </TabsTrigger>
        </TabsList>

        <TabsContent value="activities">
          <div className="space-y-4">
            {activities.length === 0 ? (
              <div className="text-center py-12 bg-gray-50 rounded-lg">
                <Clock className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">Aucune activité récente</p>
              </div>
            ) : (
              activities.map(activity => (
                <div key={activity.id} className="bg-white p-6 rounded-lg shadow">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Dr. {activity.doctorName}</p>
                      <p className="text-sm text-gray-500">
                        {activity.type === 'view' && 'Profil consulté'}
                        {activity.type === 'contact' && 'Message envoyé'}
                        {activity.type === 'review' && 'Avis donné'}
                        {activity.type === 'share' && 'Profil partagé'}
                      </p>
                    </div>
                    <span className="text-sm text-gray-500">
                      {formatDate(activity.date)}
                    </span>
                  </div>
                  {activity.details && (
                    <p className="mt-2 text-gray-600">{activity.details}</p>
                  )}
                </div>
              ))
            )}
          </div>
        </TabsContent>

        <TabsContent value="reviews">
          <div className="space-y-4">
            {reviews.length === 0 ? (
              <div className="text-center py-12 bg-gray-50 rounded-lg">
                <Star className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">Vous n'avez pas encore donné d'avis</p>
              </div>
            ) : (
              reviews.map(review => (
                <div key={review.id} className="bg-white p-6 rounded-lg shadow">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium">Dr. {review.doctorName}</p>
                      <div className="flex items-center mt-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < review.rating
                                ? 'text-yellow-400 fill-yellow-400'
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                        <span className="text-sm text-gray-500 ml-2">
                          {formatDate(review.createdAt)}
                        </span>
                      </div>
                    </div>
                  </div>
                  <p className="mt-3 text-gray-600">{review.comment}</p>
                  {review.response && (
                    <div className="mt-4 pl-4 border-l-2 border-emerald-200">
                      <p className="text-sm text-gray-500">
                        Réponse du médecin - {formatDate(review.response.createdAt)}
                      </p>
                      <p className="mt-1 text-gray-600">{review.response.text}</p>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </TabsContent>

        <TabsContent value="messages">
          <div className="space-y-4">
            {messages.length === 0 ? (
              <div className="text-center py-12 bg-gray-50 rounded-lg">
                <MessageCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">Aucun message</p>
              </div>
            ) : (
              messages.map(message => (
                <div key={message.id} className="bg-white p-6 rounded-lg shadow">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Dr. {message.doctorName}</p>
                      <p className="text-sm text-gray-500">{formatDate(message.date)}</p>
                    </div>
                    {!message.isRead && (
                      <span className="px-2 py-1 text-xs bg-emerald-100 text-emerald-600 rounded-full">
                        Nouveau
                      </span>
                    )}
                  </div>
                  <p className="mt-3 text-gray-600">{message.content}</p>
                </div>
              ))
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}