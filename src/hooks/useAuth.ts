import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, UserRole } from '../types/auth';

export function useAuth() {
  const [user, setUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const navigate = useNavigate();

  const login = async (identifier: string, password: string): Promise<boolean> => {
    try {
      // Admin login
      if (identifier === 'admin' && password === 'admin') {
        const adminUser = {
          id: 'admin',
          email: 'admin@example.com',
          name: 'Admin',
          role: 'admin' as UserRole
        };
        localStorage.setItem('user', JSON.stringify(adminUser));
        setUser(adminUser);
        navigate('/admin');
        return true;
      }

      // Check affiliate credentials
      const affiliates = JSON.parse(localStorage.getItem('affiliates') || '[]');
      const affiliate = affiliates.find((aff: any) => 
        aff.email === identifier && aff.password === password
      );

      if (affiliate) {
        const userData = {
          id: affiliate.id,
          email: affiliate.email,
          name: affiliate.name,
          role: 'affiliate' as UserRole,
          affiliateId: affiliate.id
        };
        localStorage.setItem('user', JSON.stringify(userData));
        setUser(userData);
        navigate('/affiliate');
        return true;
      }

      // Check doctor credentials
      const doctorCredentials = JSON.parse(localStorage.getItem('doctorCredentials') || '[]');
      const doctorCred = doctorCredentials.find((cred: any) => 
        cred.email === identifier && cred.password === password
      );

      if (doctorCred) {
        const doctors = JSON.parse(localStorage.getItem('doctors') || '[]');
        const doctor = doctors.find((d: any) => d.id === doctorCred.doctorId);
        
        if (doctor) {
          const userData = {
            id: doctor.id.toString(),
            email: doctorCred.email,
            name: doctor.name,
            role: 'doctor' as UserRole,
            doctorId: doctor.id
          };
          localStorage.setItem('user', JSON.stringify(userData));
          setUser(userData);
          navigate('/doctor');
          return true;
        }
      }

      // Guest/Patient login
      if (identifier === 'guest' && password === 'guest') {
        const guestUser = {
          id: 'guest',
          email: 'guest@example.com',
          name: 'Patient',
          role: 'guest' as UserRole
        };
        localStorage.setItem('user', JSON.stringify(guestUser));
        setUser(guestUser);
        navigate('/guest');
        return true;
      }

      return false;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
    navigate('/');
  };

  return { user, login, logout };
}