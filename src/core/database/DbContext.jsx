'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { finlyDB } from './finlyDB.js';
import { useAuth } from '../auth/AuthContext.jsx';

const DbContext = createContext();

export const DbProvider = ({ children }) => {
  const { updateUserBalance } = useAuth();

  const [transactions, setTransactions] = useState([]);
  const [cards, setCards] = useState([]);
  const [bills, setBills] = useState([]);
  const [goals, setGoals] = useState([]);
  const [budgets, setBudgets] = useState([]);
  const [investments, setInvestments] = useState([]);
  const [settings, setSettings] = useState({});
  const [loading, setLoading] = useState(true);
  const [toastMessage, setToastMessage] = useState(null);
  
  const [notifications, setNotifications] = useState([
    { id: 'n1', title: 'Dividend Payout', desc: 'Received $42.50 from VOO', time: '10m ago', unread: true, icon: 'ph-trend-up', color: '#10b981' },
    { id: 'n2', title: 'Bill Reminder', desc: 'Adobe CC due in 3 days ($54.99)', time: '1h ago', unread: true, icon: 'ph-receipt', color: '#f59e0b' },
    { id: 'n3', title: 'Security Alert', desc: 'New sign-in from Chrome on Windows', time: '3h ago', unread: false, icon: 'ph-shield-check', color: '#2563eb' }
  ]);

  const addNotification = useCallback((title, desc, type = 'info') => {
    const newN = {
      id: `n-${Date.now()}`,
      title,
      desc,
      time: 'Just now',
      unread: true,
      icon: type === 'success' ? 'ph-check-circle' : type === 'warning' ? 'ph-warning' : 'ph-bell',
      color: type === 'success' ? '#10b981' : type === 'warning' ? '#ef4444' : '#2563eb'
    };
    setNotifications(prev => [newN, ...prev]);
  }, []);

  const showToast = useCallback((msg) => {
    setToastMessage(msg);
    addNotification('Activity Alert', msg, 'info');
  }, [addNotification]);

  const clearToast = useCallback(() => {
    setToastMessage(null);
  }, []);

  const markAllNotificationsRead = useCallback(() => {
    setNotifications(prev => prev.map(n => ({ ...n, unread: false })));
  }, []);

  const removeNotification = useCallback((id) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  }, []);

  const clearAllNotifications = useCallback(() => {
    setNotifications([]);
  }, []);

  const refreshAllData = useCallback(async () => {
    try {
      const txs = await finlyDB.getAll('transactions');
      const crds = await finlyDB.getAll('cards');
      const bls = await finlyDB.getAll('bills');
      const gls = await finlyDB.getAll('goals');
      const bdg = await finlyDB.getAll('budgets');
      const inv = await finlyDB.getAll('investments');
      const stg = await finlyDB.get('settings', 'app_settings');

      setTransactions(txs.sort((a, b) => b.id.localeCompare(a.id)));
      setCards(crds);
      setBills(bls);
      setGoals(gls);
      setBudgets(bdg);
      setInvestments(inv);
      if (stg) setSettings(stg);
    } catch (err) {
      console.error('Error reading IndexedDB data:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshAllData();
  }, [refreshAllData]);

  // Transaction Operations
  const addTransaction = async ({ merchant, category, amount, isPositive = false, status = 'Completed', date = 'Today' }) => {
    const newTx = {
      id: `tx_${Date.now()}`,
      merchant,
      category,
      date,
      status,
      amount: parseFloat(amount),
      type: isPositive ? 'credit' : 'debit',
      icon: isPositive ? 'ph-bank' : (category === 'Food' ? 'ph-shopping-bag' : (category === 'Bills' ? 'ph-lightning' : 'ph-arrow-up-right'))
    };

    await finlyDB.put('transactions', newTx);
    await refreshAllData();

    // Update global balance
    const user = await finlyDB.get('user', 'usr_1');
    if (user) {
      const currentBal = parseFloat(user.balance || 0);
      const newBal = isPositive ? currentBal + parseFloat(amount) : currentBal - parseFloat(amount);
      await updateUserBalance(newBal);
    }
  };

  // Card Operations
  const addCard = async ({ holder, number, expires }) => {
    const newCard = {
      id: `card-${Date.now()}`,
      number,
      holder: holder.toUpperCase(),
      expires,
      balance: 2500.00,
      isFrozen: false,
      monthlyLimit: 5000.00,
      brand: 'visa',
      bg: 'linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%)'
    };
    await finlyDB.put('cards', newCard);
    await refreshAllData();
    showToast('New card added successfully!');
  };

  const toggleFreezeCard = async (cardId) => {
    const card = cards.find(c => c.id === cardId);
    if (!card) return;
    const updated = { ...card, isFrozen: !card.isFrozen };
    await finlyDB.put('cards', updated);
    await refreshAllData();
    showToast(`Card ${card.number.slice(-4)} is now ${updated.isFrozen ? 'frozen' : 'unfrozen'}.`);
  };

  const updateCardLimit = async (cardId, newLimit) => {
    const card = cards.find(c => c.id === cardId);
    if (!card) return;
    const updated = { ...card, monthlyLimit: parseFloat(newLimit) };
    await finlyDB.put('cards', updated);
    await refreshAllData();
    showToast(`Monthly limit updated to $${parseFloat(newLimit).toLocaleString('en-US', { minimumFractionDigits: 2 })}.`);
  };

  const removeCard = async (cardId) => {
    await finlyDB.delete('cards', cardId);
    await refreshAllData();
    showToast('Card successfully removed.');
  };

  // Bill Operations
  const payBill = async (billId) => {
    const bill = bills.find(b => b.id === billId);
    if (!bill || bill.status === 'Paid') return;
    const updated = { ...bill, status: 'Paid' };
    await finlyDB.put('bills', updated);
    await refreshAllData();
    showToast(`Paid ${bill.title} (${bill.price})`);
  };

  // Goal Operations
  const updateGoalFunds = async (goalId, deltaAmount) => {
    const goal = goals.find(g => g.id === goalId);
    if (!goal) return;
    const updated = { ...goal, current: Math.max(0, goal.current + deltaAmount) };
    await finlyDB.put('goals', updated);
    await refreshAllData();
    showToast(`${deltaAmount > 0 ? 'Added' : 'Removed'} $${Math.abs(deltaAmount)}.00 for ${goal.title}`);
  };

  const addGoal = async (title, target, category = 'Savings') => {
    const newGoal = {
      id: `goal-${Date.now()}`,
      title,
      current: 0,
      target: parseFloat(target),
      category
    };
    await finlyDB.put('goals', newGoal);
    await refreshAllData();
    showToast(`Created new savings goal: ${title}`);
  };

  // Budget Operations
  const addBudget = async (category, target, color = '#3b82f6') => {
    const newBgt = {
      id: `bgt-${Date.now()}`,
      category,
      spent: 0,
      target: parseFloat(target),
      color
    };
    await finlyDB.put('budgets', newBgt);
    await refreshAllData();
    showToast(`Created budget for ${category}`);
  };

  // Investment Operations
  const buyInvestment = async (assetId, amount) => {
    const inv = investments.find(i => i.id === assetId);
    if (!inv) return;
    const addedShares = amount / inv.currentPrice;
    const updated = {
      ...inv,
      holdings: Math.round((inv.holdings + addedShares) * 100) / 100,
      value: (inv.holdings + addedShares) * inv.currentPrice
    };
    await finlyDB.put('investments', updated);
    await refreshAllData();
    showToast(`Purchased $${amount} worth of ${inv.symbol}`);
  };

  const sellInvestment = async (assetId, amount) => {
    const inv = investments.find(i => i.id === assetId);
    if (!inv) return;
    const soldShares = amount / inv.currentPrice;
    const newHoldings = Math.max(0, inv.holdings - soldShares);
    const updated = {
      ...inv,
      holdings: Math.round(newHoldings * 100) / 100,
      value: newHoldings * inv.currentPrice
    };
    await finlyDB.put('investments', updated);
    await refreshAllData();
    showToast(`Sold $${amount} worth of ${inv.symbol}`);
  };

  const deleteGoal = async (goalId) => {
    await finlyDB.delete('goals', goalId);
    await refreshAllData();
    showToast('Goal removed');
  };

  const saveSettings = async (newSettings) => {
    const updated = { id: 'app_settings', ...newSettings };
    await finlyDB.put('settings', updated);
    setSettings(updated);
    showToast('Settings saved successfully');
  };

  return (
    <DbContext.Provider value={{
      transactions,
      cards,
      bills,
      goals,
      budgets,
      investments,
      settings,
      notifications,
      loading,
      toastMessage,
      showToast,
      clearToast,
      addNotification,
      markAllNotificationsRead,
      removeNotification,
      clearAllNotifications,
      addTransaction,
      addCard,
      toggleFreezeCard,
      updateCardLimit,
      removeCard,
      payBill,
      updateGoalFunds,
      addGoal,
      deleteGoal,
      addBudget,
      buyInvestment,
      sellInvestment,
      saveSettings,
      refreshAllData
    }}>
      {children}
    </DbContext.Provider>
  );
};

export const useDb = () => useContext(DbContext);
