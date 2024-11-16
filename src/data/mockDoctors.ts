import { Doctor } from '../types';

export const initialDoctors: Doctor[] = [
  {
    id: 1,
    name: "Dr. Sarah Khoury",
    specialty: "Cardiology",
    location: "Paris, 16ème",
    languages: ["Arabic", "French", "English"],
    phone: "+33 1 XX XX XX XX",
    email: "sarah.khoury@example.com",
    website: "https://example.com",
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80",
    clicks: { phone: 0, email: 0, website: 0, profile: 0 },
    approved: true,
    submittedBy: "admin",
    submittedAt: "2024-01-01T00:00:00.000Z",
    subscription: {
      active: true,
      plan: 'monthly',
      startDate: "2024-01-01T00:00:00.000Z",
      endDate: "2024-02-01T00:00:00.000Z",
      memberSince: "2024-01-01T00:00:00.000Z"
    }
  },
  {
    id: 2,
    name: "Dr. Michel Haddad",
    specialty: "Pediatrics",
    location: "Brussels, Ixelles",
    languages: ["Arabic", "French"],
    phone: "+32 2 XXX XX XX",
    email: "michel.haddad@example.com",
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80",
    clicks: { phone: 0, email: 0, website: 0, profile: 0 },
    approved: true,
    submittedBy: "admin",
    submittedAt: "2024-01-01T00:00:00.000Z",
    subscription: {
      active: true,
      plan: 'monthly',
      startDate: "2024-01-01T00:00:00.000Z",
      endDate: "2024-02-01T00:00:00.000Z",
      memberSince: "2024-01-01T00:00:00.000Z"
    }
  },
  {
    id: 3,
    name: "Dr. Nadia Gemayel",
    specialty: "Dermatology",
    location: "Paris, 8ème",
    languages: ["Arabic", "French", "English"],
    phone: "+33 1 XX XX XX XX",
    email: "nadia.gemayel@example.com",
    website: "https://example.com",
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&q=80",
    clicks: { phone: 0, email: 0, website: 0, profile: 0 },
    approved: true,
    submittedBy: "admin",
    submittedAt: "2024-01-01T00:00:00.000Z",
    subscription: {
      active: true,
      plan: 'yearly',
      startDate: "2024-01-01T00:00:00.000Z",
      endDate: "2025-01-01T00:00:00.000Z",
      memberSince: "2024-01-01T00:00:00.000Z"
    }
  },
  {
    id: 4,
    name: "Dr. Karim Abboud",
    specialty: "Orthopedics",
    location: "Paris, 15ème",
    languages: ["Arabic", "French"],
    phone: "+33 1 XX XX XX XX",
    email: "karim.abboud@example.com",
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80",
    clicks: { phone: 0, email: 0, website: 0, profile: 0 },
    approved: false,
    submittedBy: "affiliate",
    submittedAt: "2024-03-15T00:00:00.000Z"
  },
  {
    id: 5,
    name: "Dr. Maya Khalil",
    specialty: "Gynecology",
    location: "Brussels, Uccle",
    languages: ["Arabic", "French", "English"],
    phone: "+32 2 XXX XX XX",
    email: "maya.khalil@example.com",
    website: "https://example.com",
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1527613426441-4da17471b66d?auto=format&fit=crop&q=80",
    clicks: { phone: 0, email: 0, website: 0, profile: 0 },
    approved: false,
    submittedBy: "affiliate",
    submittedAt: "2024-03-14T00:00:00.000Z"
  }
];