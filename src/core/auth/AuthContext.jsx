'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { finlyDB } from '../database/finlyDB.js';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadSession = async () => {
      try {
        const storedUserRaw = sessionStorage.getItem('finly_user') || localStorage.getItem('finly_user');
        if (storedUserRaw) {
          setUser(JSON.parse(storedUserRaw));
        } else {
          setUser(null);
        }
      } catch (err) {
        console.error('Failed to load session:', err);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    loadSession();
  }, []);

  const login = async (email, remember = false) => {
    let name = 'Alex Morgan';
    if (email && email.includes('@')) {
      const handle = email.split('@')[0];
      name = handle.split(/[._-]/).map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
    }

    let initials = 'AM';
    const parts = name.split(' ');
    if (parts.length > 1) {
      initials = parts[0][0].toUpperCase() + parts[parts.length - 1][0].toUpperCase();
    }

    const userData = {
      id: 'usr_1',
      name,
      email,
      role: 'Financial Analyst',
      avatarInitials: initials,
      balance: user ? user.balance : 24568.32,
      isBalanceHidden: user ? user.isBalanceHidden : false
    };

    await finlyDB.put('user', userData);
    setUser(userData);

    const strData = JSON.stringify(userData);
    sessionStorage.setItem('finly_user', strData);
    sessionStorage.setItem('finly_logged_in', 'true');

    if (remember) {
      localStorage.setItem('finly_user', strData);
      localStorage.setItem('finly_logged_in', 'true');
    }
    return userData;
  };

  const register = async (name, email) => {
    let initials = 'AM';
    const parts = name.split(' ');
    if (parts.length > 1) {
      initials = parts[0][0].toUpperCase() + parts[parts.length - 1][0].toUpperCase();
    }

    const userData = {
      id: 'usr_1',
      name,
      email,
      role: 'Business Owner',
      avatarInitials: initials,
      balance: 1000.00,
      isBalanceHidden: false
    };

    await finlyDB.put('user', userData);
    setUser(userData);

    const strData = JSON.stringify(userData);
    sessionStorage.setItem('finly_user', strData);
    sessionStorage.setItem('finly_logged_in', 'true');
    localStorage.setItem('finly_user', strData);
    localStorage.setItem('finly_logged_in', 'true');

    return userData;
  };

  const logout = () => {
    sessionStorage.removeItem('finly_logged_in');
    sessionStorage.removeItem('finly_user');
    localStorage.removeItem('finly_logged_in');
    localStorage.removeItem('finly_user');
    setUser(null);
  };

  const updateUserBalance = async (newBalance) => {
    if (!user) return;
    const updated = { ...user, balance: newBalance };
    setUser(updated);
    await finlyDB.put('user', updated);
    const strData = JSON.stringify(updated);
    if (sessionStorage.getItem('finly_user')) sessionStorage.setItem('finly_user', strData);
    if (localStorage.getItem('finly_user')) localStorage.setItem('finly_user', strData);
  };

  const toggleBalancePrivacy = async () => {
    if (!user) return;
    const updated = { ...user, isBalanceHidden: !user.isBalanceHidden };
    setUser(updated);
    await finlyDB.put('user', updated);
    const strData = JSON.stringify(updated);
    if (sessionStorage.getItem('finly_user')) sessionStorage.setItem('finly_user', strData);
    if (localStorage.getItem('finly_user')) localStorage.setItem('finly_user', strData);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, updateUserBalance, toggleBalancePrivacy }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
