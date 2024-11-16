import { 
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where
} from 'firebase/firestore';
import { db } from '../config/firebase';
import { Doctor } from '../types';

// Doctors collection reference
const doctorsRef = collection(db, 'doctors');

// Get all doctors
export const getAllDoctors = async () => {
  const snapshot = await getDocs(doctorsRef);
  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));
};

// Get doctor by ID
export const getDoctorById = async (id: string) => {
  const docRef = doc(db, 'doctors', id);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return { id: docSnap.id, ...docSnap.data() };
  }
  return null;
};

// Add new doctor
export const addDoctor = async (doctorData: Partial<Doctor>) => {
  return addDoc(doctorsRef, {
    ...doctorData,
    createdAt: new Date().toISOString(),
    approved: false
  });
};

// Update doctor
export const updateDoctor = async (id: string, data: Partial<Doctor>) => {
  const docRef = doc(db, 'doctors', id);
  return updateDoc(docRef, {
    ...data,
    updatedAt: new Date().toISOString()
  });
};

// Delete doctor
export const deleteDoctor = async (id: string) => {
  const docRef = doc(db, 'doctors', id);
  return deleteDoc(docRef);
};

// Get doctors by affiliate ID
export const getDoctorsByAffiliate = async (affiliateId: string) => {
  const q = query(doctorsRef, where('submittedBy', '==', affiliateId));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));
};