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

  const showToast = useCallback((msg) => {
    setToastMessage(msg);
  }, []);

  const clearToast = useCallback(() => {
    setToastMessage(null);
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
      loading,
      toastMessage,
      showToast,
      clearToast,
      addTransaction,
      addCard,
      toggleFreezeCard,
      updateCardLimit,
      removeCard,
      payBill,
      updateGoalFunds,
      addGoal,
      addBudget,
      buyInvestment,
      saveSettings,
      refreshAllData
    }}>
      {children}
    </DbContext.Provider>
  );
};

export const useDb = () => useContext(DbContext);
