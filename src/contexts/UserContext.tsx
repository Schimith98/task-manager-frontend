import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import Cookies from 'js-cookie';
import { User, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase/config';
import { toast } from 'react-toastify';

interface UserContextType {
  user: User | null
  setUser: React.Dispatch<React.SetStateAction<User | null>>
  login:  (email: string, pass: string) => Promise<void>
  register: (displayName:string, email: string, pass: string) => Promise<void>
  logout: () => void
  loading: boolean
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true)
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = Cookies.get('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const register = async (displayName:string, email: string, pass: string) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, pass);
      let user = userCredential.user as User;
      await updateProfile(user, { displayName });
      setUser(user);
      toast.success('Usuário criado com sucesso!');
  } catch (error: any) {
      alert(error.message);
      toast.success('Falha ao criar usuário!');
  }
}

  const login = async (email: string, pass: string) => {
      try {
        const userCredential = await signInWithEmailAndPassword(auth, email, pass);
        const user = userCredential.user as User;
        navigate('/matriz')
        setUser(user);
        Cookies.set('user', JSON.stringify(user))
        toast.success('Bem vindo!');
    } catch (error: any) {
        alert(error.message);
    }
  }

  const logout = () => {
    if(user){
      Cookies.remove('user');
      setUser(null)
    }
  }

  return (
    <UserContext.Provider value={{ user, setUser, login, logout, register, loading, setLoading }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
