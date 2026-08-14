// src/main.jsx
import React23 from "react";
import ReactDOM from "react-dom/client";

// src/app/providers.jsx
import React4 from "react";

// src/core/theme/ThemeContext.jsx
import React, { createContext, useContext, useState, useEffect } from "react";
var ThemeContext = createContext();
var ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("light");
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedTheme = localStorage.getItem("finly-theme") || "light";
      setTheme(savedTheme);
      document.documentElement.setAttribute("data-theme", savedTheme);
    }
  }, []);
  useEffect(() => {
    if (typeof window !== "undefined") {
      document.documentElement.setAttribute("data-theme", theme);
      localStorage.setItem("finly-theme", theme);
    }
  }, [theme]);
  const toggleTheme = () => {
    setTheme((prev) => prev === "dark" ? "light" : "dark");
  };
  return /* @__PURE__ */ React.createElement(ThemeContext.Provider, { value: { theme, toggleTheme } }, children);
};
var useTheme = () => useContext(ThemeContext);

// src/core/auth/AuthContext.jsx
import React2, { createContext as createContext2, useContext as useContext2, useState as useState2, useEffect as useEffect2 } from "react";

// src/core/database/finlyDB.js
var DB_NAME = "FinlyDB";
var DB_VERSION = 1;
var INITIAL_USER = {
  id: "usr_1",
  name: "Alex Morgan",
  email: "alex@finly.app",
  role: "Pro Member",
  avatarInitials: "AM",
  balance: 24568.32,
  isBalanceHidden: false
};
var INITIAL_TRANSACTIONS = [
  { id: "tx_1", merchant: "Apple Store", category: "Shopping", date: "Jul 19, 2026", status: "Completed", amount: 1290, type: "debit", icon: "ph-apple-logo" },
  { id: "tx_2", merchant: "Whole Foods", category: "Food", date: "Jul 18, 2026", status: "Completed", amount: 84.32, type: "debit", icon: "ph-shopping-bag" },
  { id: "tx_3", merchant: "Salary &mdash; Acme Inc", category: "Income", date: "Jul 16, 2026", status: "Completed", amount: 8420.5, type: "credit", icon: "ph-bank" },
  { id: "tx_4", merchant: "Netflix", category: "Entertainment", date: "Jul 17, 2026", status: "Completed", amount: 15.99, type: "debit", icon: "ph-film-strip" },
  { id: "tx_5", merchant: "Uber", category: "Transportation", date: "Jul 17, 2026", status: "Pending", amount: 22.4, type: "debit", icon: "ph-car" },
  { id: "tx_6", merchant: "Con Edison", category: "Bills", date: "Jul 16, 2026", status: "Completed", amount: 142, type: "debit", icon: "ph-lightning" },
  { id: "tx_7", merchant: "Spotify", category: "Entertainment", date: "Jul 15, 2026", status: "Failed", amount: 8.99, type: "debit", icon: "ph-music-notes" },
  { id: "tx_8", merchant: "CVS Pharmacy", category: "Healthcare", date: "Jul 14, 2026", status: "Completed", amount: 38.5, type: "debit", icon: "ph-first-aid-kit" }
];
var INITIAL_CARDS = [
  { id: "card-1", number: "0818 7183 0713 2514", holder: "Alex Morgan", expires: "08/28", balance: 12480.5, isFrozen: false, monthlyLimit: 15e3, brand: "visa", bg: "#14171f" },
  { id: "card-2", number: "4021 9902 8412 8830", holder: "Alex Morgan", expires: "04/27", balance: 4820.1, isFrozen: false, monthlyLimit: 1e4, brand: "mastercard", bg: "linear-gradient(135deg, #1d4ed8 0%, #3b82f6 100%)" }
];
var INITIAL_BILLS = [
  { id: "bill-1", title: "Adobe Creative Cloud", price: "$54.99", dueDate: "Due in 3 days", status: "Unpaid", category: "Software", icon: "ph-layout" },
  { id: "bill-2", title: "AWS Cloud Hosting Services", price: "$210.40", dueDate: "Due in 5 days", status: "Unpaid", category: "Infrastructure", icon: "ph-cloud" },
  { id: "bill-3", title: "Spotify Family Subscription", price: "$16.99", dueDate: "Due in 12 days", status: "Unpaid", category: "Entertainment", icon: "ph-music-notes" }
];
var INITIAL_GOALS = [
  { id: "goal-1", title: "New Car Fund", current: 12500, target: 3e4, category: "Savings" },
  { id: "goal-2", title: "Emergency Reserve", current: 18e3, target: 2e4, category: "Emergency" },
  { id: "goal-3", title: "Vacation to Japan", current: 4500, target: 6e3, category: "Travel" }
];
var INITIAL_BUDGETS = [
  { id: "bgt-1", category: "Food", spent: 780, target: 800, color: "#3b82f6" },
  { id: "bgt-2", category: "Shopping", spent: 1400, target: 1200, color: "#ef4444", isOver: true, overAmount: 200 },
  { id: "bgt-3", category: "Entertainment", spent: 435, target: 500, color: "#3b82f6" },
  { id: "bgt-4", category: "Travel", spent: 320, target: 800, color: "#3b82f6" },
  { id: "bgt-5", category: "Bills", spent: 952, target: 900, color: "#3b82f6" }
];
var INITIAL_INVESTMENTS = [
  { id: "inv-1", name: "Apple Inc.", symbol: "AAPL", holdings: 70, currentPrice: 178.28, value: 12480, returnPct: "+1.2%", isPositive: true, pctShare: 38, color: "#f97316" },
  { id: "inv-2", name: "Microsoft", symbol: "MSFT", holdings: 21, currentPrice: 411.42, value: 8640, returnPct: "+0.8%", isPositive: true, pctShare: 26, color: "#a855f7" },
  { id: "inv-3", name: "Bitcoin", symbol: "BTC", holdings: 0.1, currentPrice: 64200, value: 6420, returnPct: "-2.1%", isPositive: false, pctShare: 20, color: "#06b6d4" },
  { id: "inv-4", name: "Vanguard S&P 500", symbol: "VOO", holdings: 12.7, currentPrice: 412.6, value: 5240, returnPct: "+0.4%", isPositive: true, pctShare: 16, color: "#3b82f6" }
];
var INITIAL_SETTINGS = {
  theme: "light",
  currency: "USD",
  notifications: { email: true, push: true, sms: false, marketing: false },
  security: { twoFactor: true, biometric: false }
};
var FinlyDatabase = class {
  constructor() {
    this.db = null;
  }
  async init() {
    if (typeof window === "undefined" || typeof indexedDB === "undefined") {
      return null;
    }
    if (this.db) return this.db;
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(DB_NAME, DB_VERSION);
      request.onupgradeneeded = (e) => {
        const db = e.target.result;
        if (!db.objectStoreNames.contains("user")) db.createObjectStore("user", { keyPath: "id" });
        if (!db.objectStoreNames.contains("transactions")) db.createObjectStore("transactions", { keyPath: "id" });
        if (!db.objectStoreNames.contains("cards")) db.createObjectStore("cards", { keyPath: "id" });
        if (!db.objectStoreNames.contains("bills")) db.createObjectStore("bills", { keyPath: "id" });
        if (!db.objectStoreNames.contains("goals")) db.createObjectStore("goals", { keyPath: "id" });
        if (!db.objectStoreNames.contains("budgets")) db.createObjectStore("budgets", { keyPath: "id" });
        if (!db.objectStoreNames.contains("investments")) db.createObjectStore("investments", { keyPath: "id" });
        if (!db.objectStoreNames.contains("settings")) db.createObjectStore("settings", { keyPath: "id" });
      };
      request.onsuccess = async (e) => {
        this.db = e.target.result;
        await this.seedIfEmpty();
        resolve(this.db);
      };
      request.onerror = (e) => {
        console.error("IndexedDB Error:", e.target.error);
        reject(e.target.error);
      };
    });
  }
  async seedIfEmpty() {
    const user = await this.get("user", "usr_1");
    if (!user) {
      await this.put("user", INITIAL_USER);
      for (const item of INITIAL_TRANSACTIONS) await this.put("transactions", item);
      for (const item of INITIAL_CARDS) await this.put("cards", item);
      for (const item of INITIAL_BILLS) await this.put("bills", item);
      for (const item of INITIAL_GOALS) await this.put("goals", item);
      for (const item of INITIAL_BUDGETS) await this.put("budgets", item);
      for (const item of INITIAL_INVESTMENTS) await this.put("investments", item);
      await this.put("settings", { id: "app_settings", ...INITIAL_SETTINGS });
    }
  }
  async getAll(storeName) {
    if (typeof window === "undefined") return [];
    const db = await this.init();
    if (!db) return [];
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction(storeName, "readonly");
      const store = transaction.objectStore(storeName);
      const req = store.getAll();
      req.onsuccess = () => resolve(req.result || []);
      req.onerror = () => reject(req.error);
    });
  }
  async get(storeName, key) {
    if (typeof window === "undefined") return null;
    const db = await this.init();
    if (!db) return null;
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction(storeName, "readonly");
      const store = transaction.objectStore(storeName);
      const req = store.get(key);
      req.onsuccess = () => resolve(req.result);
      req.onerror = () => reject(req.error);
    });
  }
  async put(storeName, value) {
    if (typeof window === "undefined") return null;
    const db = await this.init();
    if (!db) return null;
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction(storeName, "readwrite");
      const store = transaction.objectStore(storeName);
      const req = store.put(value);
      req.onsuccess = () => resolve(req.result);
      req.onerror = () => reject(req.error);
    });
  }
  async delete(storeName, key) {
    if (typeof window === "undefined") return null;
    const db = await this.init();
    if (!db) return null;
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction(storeName, "readwrite");
      const store = transaction.objectStore(storeName);
      const req = store.delete(key);
      req.onsuccess = () => resolve(req.result);
      req.onerror = () => reject(req.error);
    });
  }
};
var finlyDB = new FinlyDatabase();

// src/core/auth/AuthContext.jsx
var AuthContext = createContext2();
var AuthProvider = ({ children }) => {
  const [user, setUser] = useState2(null);
  const [loading, setLoading] = useState2(true);
  useEffect2(() => {
    const loadSession = async () => {
      try {
        if (typeof window !== "undefined") {
          const isLoggedIn = sessionStorage.getItem("finly_logged_in") === "true" || localStorage.getItem("finly_logged_in") === "true";
          const storedUserRaw = sessionStorage.getItem("finly_user") || localStorage.getItem("finly_user");
          if (isLoggedIn && storedUserRaw) {
            setUser(JSON.parse(storedUserRaw));
          } else {
            setUser(null);
          }
        }
      } catch (err) {
        console.error("Failed to load session:", err);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    loadSession();
  }, []);
  const login = async (email, remember = false) => {
    let name = "Alex Morgan";
    if (email && email.includes("@")) {
      const handle = email.split("@")[0];
      name = handle.split(/[._-]/).map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
    }
    let initials = "AM";
    const parts = name.split(" ");
    if (parts.length > 1) {
      initials = parts[0][0].toUpperCase() + parts[parts.length - 1][0].toUpperCase();
    }
    const userData = {
      id: "usr_1",
      name,
      email,
      role: "Financial Analyst",
      avatarInitials: initials,
      balance: user ? user.balance : 24568.32,
      isBalanceHidden: user ? user.isBalanceHidden : false
    };
    await finlyDB.put("user", userData);
    setUser(userData);
    if (typeof window !== "undefined") {
      const strData = JSON.stringify(userData);
      sessionStorage.setItem("finly_user", strData);
      sessionStorage.setItem("finly_logged_in", "true");
      if (remember) {
        localStorage.setItem("finly_user", strData);
        localStorage.setItem("finly_logged_in", "true");
      }
    }
    return userData;
  };
  const register = async (name, email) => {
    let initials = "AM";
    const parts = name.split(" ");
    if (parts.length > 1) {
      initials = parts[0][0].toUpperCase() + parts[parts.length - 1][0].toUpperCase();
    }
    const userData = {
      id: "usr_1",
      name,
      email,
      role: "Business Owner",
      avatarInitials: initials,
      balance: 1e3,
      isBalanceHidden: false
    };
    await finlyDB.put("user", userData);
    setUser(userData);
    if (typeof window !== "undefined") {
      const strData = JSON.stringify(userData);
      sessionStorage.setItem("finly_user", strData);
      sessionStorage.setItem("finly_logged_in", "true");
      localStorage.setItem("finly_user", strData);
      localStorage.setItem("finly_logged_in", "true");
    }
    return userData;
  };
  const logout = () => {
    if (typeof window !== "undefined") {
      sessionStorage.removeItem("finly_logged_in");
      sessionStorage.removeItem("finly_user");
      localStorage.removeItem("finly_logged_in");
      localStorage.removeItem("finly_user");
    }
    setUser(null);
  };
  const updateUserBalance = async (newBalance) => {
    if (!user) return;
    const updated = { ...user, balance: newBalance };
    setUser(updated);
    await finlyDB.put("user", updated);
    if (typeof window !== "undefined") {
      const strData = JSON.stringify(updated);
      if (sessionStorage.getItem("finly_user")) sessionStorage.setItem("finly_user", strData);
      if (localStorage.getItem("finly_user")) localStorage.setItem("finly_user", strData);
    }
  };
  const toggleBalancePrivacy = async () => {
    if (!user) return;
    const updated = { ...user, isBalanceHidden: !user.isBalanceHidden };
    setUser(updated);
    await finlyDB.put("user", updated);
    if (typeof window !== "undefined") {
      const strData = JSON.stringify(updated);
      if (sessionStorage.getItem("finly_user")) sessionStorage.setItem("finly_user", strData);
      if (localStorage.getItem("finly_user")) localStorage.setItem("finly_user", strData);
    }
  };
  return /* @__PURE__ */ React2.createElement(AuthContext.Provider, { value: { user, loading, login, register, logout, updateUserBalance, toggleBalancePrivacy } }, children);
};
var useAuth = () => useContext2(AuthContext);

// src/core/database/DbContext.jsx
import React3, { createContext as createContext3, useContext as useContext3, useState as useState3, useEffect as useEffect3, useCallback } from "react";
var DbContext = createContext3();
var DbProvider = ({ children }) => {
  const { updateUserBalance } = useAuth();
  const [transactions, setTransactions] = useState3([]);
  const [cards, setCards] = useState3([]);
  const [bills, setBills] = useState3([]);
  const [goals, setGoals] = useState3([]);
  const [budgets, setBudgets] = useState3([]);
  const [investments, setInvestments] = useState3([]);
  const [settings, setSettings] = useState3({});
  const [loading, setLoading] = useState3(true);
  const [toastMessage, setToastMessage] = useState3(null);
  const [notifications, setNotifications] = useState3([
    { id: "n1", title: "Dividend Payout", desc: "Received $42.50 from VOO", time: "10m ago", unread: true, icon: "ph-trend-up", color: "#10b981" },
    { id: "n2", title: "Bill Reminder", desc: "Adobe CC due in 3 days ($54.99)", time: "1h ago", unread: true, icon: "ph-receipt", color: "#f59e0b" },
    { id: "n3", title: "Security Alert", desc: "New sign-in from Chrome on Windows", time: "3h ago", unread: false, icon: "ph-shield-check", color: "#2563eb" }
  ]);
  const addNotification = useCallback((title, desc, type = "info") => {
    const newN = {
      id: `n-${Date.now()}`,
      title,
      desc,
      time: "Just now",
      unread: true,
      icon: type === "success" ? "ph-check-circle" : type === "warning" ? "ph-warning" : "ph-bell",
      color: type === "success" ? "#10b981" : type === "warning" ? "#ef4444" : "#2563eb"
    };
    setNotifications((prev) => [newN, ...prev]);
  }, []);
  const showToast = useCallback((msg) => {
    setToastMessage(msg);
    addNotification("Activity Alert", msg, "info");
  }, [addNotification]);
  const clearToast = useCallback(() => {
    setToastMessage(null);
  }, []);
  const markAllNotificationsRead = useCallback(() => {
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));
  }, []);
  const removeNotification = useCallback((id) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  }, []);
  const clearAllNotifications = useCallback(() => {
    setNotifications([]);
  }, []);
  const refreshAllData = useCallback(async () => {
    try {
      const txs = await finlyDB.getAll("transactions");
      const crds = await finlyDB.getAll("cards");
      const bls = await finlyDB.getAll("bills");
      const gls = await finlyDB.getAll("goals");
      const bdg = await finlyDB.getAll("budgets");
      const inv = await finlyDB.getAll("investments");
      const stg = await finlyDB.get("settings", "app_settings");
      setTransactions(txs.sort((a, b) => b.id.localeCompare(a.id)));
      setCards(crds);
      setBills(bls);
      setGoals(gls);
      setBudgets(bdg);
      setInvestments(inv);
      if (stg) setSettings(stg);
    } catch (err) {
      console.error("Error reading IndexedDB data:", err);
    } finally {
      setLoading(false);
    }
  }, []);
  useEffect3(() => {
    refreshAllData();
  }, [refreshAllData]);
  const addTransaction = async ({ merchant, category, amount, isPositive = false, status = "Completed", date = "Today" }) => {
    const newTx = {
      id: `tx_${Date.now()}`,
      merchant,
      category,
      date,
      status,
      amount: parseFloat(amount),
      type: isPositive ? "credit" : "debit",
      icon: isPositive ? "ph-bank" : category === "Food" ? "ph-shopping-bag" : category === "Bills" ? "ph-lightning" : "ph-arrow-up-right"
    };
    await finlyDB.put("transactions", newTx);
    await refreshAllData();
    const user = await finlyDB.get("user", "usr_1");
    if (user) {
      const currentBal = parseFloat(user.balance || 0);
      const newBal = isPositive ? currentBal + parseFloat(amount) : currentBal - parseFloat(amount);
      await updateUserBalance(newBal);
    }
  };
  const addCard = async ({ holder, number, expires }) => {
    const newCard = {
      id: `card-${Date.now()}`,
      number,
      holder: holder.toUpperCase(),
      expires,
      balance: 2500,
      isFrozen: false,
      monthlyLimit: 5e3,
      brand: "visa",
      bg: "linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%)"
    };
    await finlyDB.put("cards", newCard);
    await refreshAllData();
    showToast("New card added successfully!");
  };
  const toggleFreezeCard = async (cardId) => {
    const card = cards.find((c) => c.id === cardId);
    if (!card) return;
    const updated = { ...card, isFrozen: !card.isFrozen };
    await finlyDB.put("cards", updated);
    await refreshAllData();
    showToast(`Card ${card.number.slice(-4)} is now ${updated.isFrozen ? "frozen" : "unfrozen"}.`);
  };
  const updateCardLimit = async (cardId, newLimit) => {
    const card = cards.find((c) => c.id === cardId);
    if (!card) return;
    const updated = { ...card, monthlyLimit: parseFloat(newLimit) };
    await finlyDB.put("cards", updated);
    await refreshAllData();
    showToast(`Monthly limit updated to $${parseFloat(newLimit).toLocaleString("en-US", { minimumFractionDigits: 2 })}.`);
  };
  const removeCard = async (cardId) => {
    await finlyDB.delete("cards", cardId);
    await refreshAllData();
    showToast("Card successfully removed.");
  };
  const payBill = async (billId) => {
    const bill = bills.find((b) => b.id === billId);
    if (!bill || bill.status === "Paid") return;
    const updated = { ...bill, status: "Paid" };
    await finlyDB.put("bills", updated);
    await refreshAllData();
    showToast(`Paid ${bill.title} (${bill.price})`);
  };
  const updateGoalFunds = async (goalId, deltaAmount) => {
    const goal = goals.find((g) => g.id === goalId);
    if (!goal) return;
    const updated = { ...goal, current: Math.max(0, goal.current + deltaAmount) };
    await finlyDB.put("goals", updated);
    await refreshAllData();
    showToast(`${deltaAmount > 0 ? "Added" : "Removed"} $${Math.abs(deltaAmount)}.00 for ${goal.title}`);
  };
  const addGoal = async (title, target, category = "Savings") => {
    const newGoal = {
      id: `goal-${Date.now()}`,
      title,
      current: 0,
      target: parseFloat(target),
      category
    };
    await finlyDB.put("goals", newGoal);
    await refreshAllData();
    showToast(`Created new savings goal: ${title}`);
  };
  const addBudget = async (category, target, color = "#3b82f6") => {
    const newBgt = {
      id: `bgt-${Date.now()}`,
      category,
      spent: 0,
      target: parseFloat(target),
      color
    };
    await finlyDB.put("budgets", newBgt);
    await refreshAllData();
    showToast(`Created budget for ${category}`);
  };
  const buyInvestment = async (assetId, amount) => {
    const inv = investments.find((i) => i.id === assetId);
    if (!inv) return;
    const addedShares = amount / inv.currentPrice;
    const updated = {
      ...inv,
      holdings: Math.round((inv.holdings + addedShares) * 100) / 100,
      value: (inv.holdings + addedShares) * inv.currentPrice
    };
    await finlyDB.put("investments", updated);
    await refreshAllData();
    showToast(`Purchased $${amount} worth of ${inv.symbol}`);
  };
  const sellInvestment = async (assetId, amount) => {
    const inv = investments.find((i) => i.id === assetId);
    if (!inv) return;
    const soldShares = amount / inv.currentPrice;
    const newHoldings = Math.max(0, inv.holdings - soldShares);
    const updated = {
      ...inv,
      holdings: Math.round(newHoldings * 100) / 100,
      value: newHoldings * inv.currentPrice
    };
    await finlyDB.put("investments", updated);
    await refreshAllData();
    showToast(`Sold $${amount} worth of ${inv.symbol}`);
  };
  const deleteGoal = async (goalId) => {
    await finlyDB.delete("goals", goalId);
    await refreshAllData();
    showToast("Goal removed");
  };
  const saveSettings = async (newSettings) => {
    const updated = { id: "app_settings", ...newSettings };
    await finlyDB.put("settings", updated);
    setSettings(updated);
    showToast("Settings saved successfully");
  };
  return /* @__PURE__ */ React3.createElement(DbContext.Provider, { value: {
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
  } }, children);
};
var useDb = () => useContext3(DbContext);

// src/app/providers.jsx
function Providers({ children }) {
  return /* @__PURE__ */ React4.createElement(ThemeProvider, null, /* @__PURE__ */ React4.createElement(AuthProvider, null, /* @__PURE__ */ React4.createElement(DbProvider, null, children)));
}

// src/App.jsx
import React22, { useState as useState19 } from "react";

// src/design-system/Layout.jsx
import React6, { useState as useState4, useEffect as useEffect5 } from "react";

// src/design-system/components/Toast.jsx
import React5, { useEffect as useEffect4 } from "react";
var ToastContainer = ({ message, onClose }) => {
  useEffect4(() => {
    if (!message) return;
    const timer = setTimeout(() => {
      onClose();
    }, 3800);
    return () => clearTimeout(timer);
  }, [message, onClose]);
  if (!message) return null;
  return /* @__PURE__ */ React5.createElement("div", { id: "toast-container", style: { position: "fixed", bottom: "24px", right: "24px", zIndex: 99999 } }, /* @__PURE__ */ React5.createElement(
    "div",
    {
      className: "toast-popup",
      style: {
        display: "flex",
        alignItems: "center",
        gap: "12px",
        background: "var(--bg-card)",
        border: "1px solid var(--border-color)",
        padding: "14px 22px",
        borderRadius: "16px",
        boxShadow: "0 15px 35px -5px rgba(0,0,0,0.25), 0 5px 15px rgba(0,0,0,0.1)",
        color: "var(--text-main)",
        animation: "toastSlideIn 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        maxWidth: "380px"
      }
    },
    /* @__PURE__ */ React5.createElement("div", { style: { width: "28px", height: "28px", borderRadius: "50%", background: "rgba(16, 185, 129, 0.15)", color: "#10b981", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 } }, /* @__PURE__ */ React5.createElement("i", { className: "ph ph-bell-simple-ringing", style: { fontSize: "1.1rem" } })),
    /* @__PURE__ */ React5.createElement("span", { style: { fontSize: "0.88rem", fontWeight: 500, flex: 1, lineHeight: 1.3 } }, message),
    /* @__PURE__ */ React5.createElement(
      "button",
      {
        onClick: onClose,
        style: { background: "none", border: "none", color: "var(--text-subtle)", cursor: "pointer", display: "flex", padding: "4px", fontSize: "1rem" },
        title: "Dismiss toast"
      },
      /* @__PURE__ */ React5.createElement("i", { className: "ph ph-x" })
    )
  ));
};

// src/design-system/Layout.jsx
var Layout = ({ activeTab, setActiveTab, children, searchQuery, setSearchQuery }) => {
  const { user, logout, toggleBalancePrivacy } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const {
    toastMessage,
    clearToast,
    notifications = [],
    markAllNotificationsRead,
    removeNotification,
    clearAllNotifications
  } = useDb();
  const unreadCount = notifications.filter((n) => n.unread).length;
  const [showNotifications, setShowNotifications] = useState4(false);
  const [showUserDropdown, setShowUserDropdown] = useState4(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState4(false);
  useEffect5(() => {
    if (typeof window === "undefined") return;
    const timer = setTimeout(() => {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("scroll-in-view");
          }
        });
      }, { threshold: 0.05, rootMargin: "0px 0px -20px 0px" });
      const targets = document.querySelectorAll(".card, .card-box, .hero-card, .hero-balance-card, .kpi-sparkline-card");
      targets.forEach((el) => observer.observe(el));
      return () => observer.disconnect();
    }, 50);
    return () => clearTimeout(timer);
  }, [activeTab, children]);
  const formattedBalance = user ? user.isBalanceHidden ? "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022" : `$${(user.balance || 0).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` : "$0.00";
  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: "ph-squares-four" },
    { id: "wallet", label: "Wallet", icon: "ph-wallet" },
    { id: "cards", label: "Cards", icon: "ph-credit-card" },
    { id: "transactions", label: "Transactions", icon: "ph-arrows-left-right" },
    { id: "analytics", label: "Analytics", icon: "ph-chart-line" },
    { id: "investments", label: "Investments", icon: "ph-trend-up" },
    { id: "budgets", label: "Budgets", icon: "ph-piggy-bank" },
    { id: "reports", label: "Reports", icon: "ph-file-text" },
    { id: "settings", label: "Settings", icon: "ph-gear" }
  ];
  return /* @__PURE__ */ React6.createElement("div", { className: "app-container" }, /* @__PURE__ */ React6.createElement(
    "div",
    {
      className: `sidebar-overlay ${mobileSidebarOpen ? "active" : ""}`,
      onClick: () => setMobileSidebarOpen(false)
    }
  ), /* @__PURE__ */ React6.createElement("aside", { className: `sidebar ${mobileSidebarOpen ? "mobile-open" : ""}` }, /* @__PURE__ */ React6.createElement("div", { style: { display: "flex", flexDirection: "column", height: "100%", justifyContent: "space-between" } }, /* @__PURE__ */ React6.createElement("div", null, /* @__PURE__ */ React6.createElement("div", { className: "sidebar-brand", style: { cursor: "pointer", marginBottom: "28px", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "4px 0" } }, /* @__PURE__ */ React6.createElement("div", { style: { display: "flex", alignItems: "center", gap: "12px" }, onClick: () => {
    setActiveTab("dashboard");
    setMobileSidebarOpen(false);
  } }, /* @__PURE__ */ React6.createElement("div", { className: "brand-icon", style: { background: "#14171f", color: "#ffffff", borderRadius: "50%", width: "36px", height: "36px", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: "1.2rem", boxShadow: "0 2px 8px rgba(0,0,0,0.15)" } }, /* @__PURE__ */ React6.createElement("i", { className: "ph ph-sparkle" })), /* @__PURE__ */ React6.createElement("span", { className: "brand-name", style: { fontSize: "1.35rem", fontWeight: 800, color: "var(--text-main)", letterSpacing: "-0.02em" } }, "Finly")), mobileSidebarOpen && /* @__PURE__ */ React6.createElement("button", { onClick: () => setMobileSidebarOpen(false), style: { background: "none", border: "none", fontSize: "1.2rem", color: "var(--text-muted)", cursor: "pointer" } }, /* @__PURE__ */ React6.createElement("i", { className: "ph ph-x" }))), /* @__PURE__ */ React6.createElement("nav", { className: "sidebar-nav" }, /* @__PURE__ */ React6.createElement("ul", { style: { listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "6px" } }, navItems.map((item) => {
    const isActive = activeTab === item.id;
    return /* @__PURE__ */ React6.createElement(
      "li",
      {
        key: item.id,
        className: `nav-item ${isActive ? "active" : ""}`,
        onClick: (e) => {
          e.preventDefault();
          setActiveTab(item.id);
          setMobileSidebarOpen(false);
        }
      },
      /* @__PURE__ */ React6.createElement(
        "a",
        {
          href: `#${item.id}`,
          onClick: (e) => e.preventDefault(),
          style: {
            display: "flex",
            alignItems: "center",
            gap: "14px",
            padding: "10px 16px",
            borderRadius: "12px",
            fontSize: "0.9rem",
            fontWeight: isActive ? 600 : 500,
            color: isActive ? "var(--text-main)" : "var(--text-muted)",
            background: isActive ? "var(--bg-app)" : "transparent",
            transition: "all 0.2s ease"
          }
        },
        /* @__PURE__ */ React6.createElement("i", { className: `ph ${item.icon}`, style: { fontSize: "1.25rem", color: isActive ? "var(--text-main)" : "var(--text-muted)" } }),
        /* @__PURE__ */ React6.createElement("span", null, item.label)
      )
    );
  })))), /* @__PURE__ */ React6.createElement("div", { className: "upgrade-card-box", style: { background: "var(--bg-app)", border: "1px solid var(--border-color)", borderRadius: "18px", padding: "16px", marginTop: "auto" } }, /* @__PURE__ */ React6.createElement("p", { style: { fontSize: "0.8rem", color: "var(--text-muted)", margin: "0 0 12px 0", lineHeight: 1.4 } }, "Upgrade to ", /* @__PURE__ */ React6.createElement("strong", null, "Finly Pro"), " for unlimited insights."), /* @__PURE__ */ React6.createElement("button", { className: "btn btn-primary btn-upgrade-pro", style: { width: "100%", padding: "10px", fontSize: "0.85rem", borderRadius: "24px", background: "#2563eb", color: "#fff", border: "none", fontWeight: 600, cursor: "pointer", boxShadow: "0 4px 12px rgba(37,99,235,0.25)" }, onClick: () => alert("Finly Pro Activated!") }, "Upgrade")))), /* @__PURE__ */ React6.createElement("div", { className: "dashboard-layout" }, /* @__PURE__ */ React6.createElement("header", { className: "top-navbar", style: { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px 28px", background: "var(--bg-card)", borderBottom: "1px solid var(--border-color)" } }, /* @__PURE__ */ React6.createElement("div", { style: { display: "flex", alignItems: "center", gap: "12px" } }, /* @__PURE__ */ React6.createElement(
    "button",
    {
      className: "icon-btn mobile-hamburger-btn",
      onClick: () => setMobileSidebarOpen(!mobileSidebarOpen),
      style: { display: "none", background: "none", border: "1px solid var(--border-color)", borderRadius: "10px", fontSize: "1.25rem", color: "var(--text-main)", cursor: "pointer", padding: "6px 10px" },
      title: "Open Navigation"
    },
    /* @__PURE__ */ React6.createElement("i", { className: "ph ph-list" })
  ), /* @__PURE__ */ React6.createElement("div", { className: "header-greeting" }, /* @__PURE__ */ React6.createElement("h1", { style: { fontSize: "1.25rem", fontWeight: 700, margin: 0, color: "var(--text-main)" } }, activeTab === "wallet" ? "Wallet" : activeTab === "cards" ? "Cards" : activeTab === "transactions" ? "Transactions" : activeTab === "analytics" ? "Analytics" : activeTab === "investments" ? "Investments" : activeTab === "budgets" ? "Budgets" : activeTab === "reports" ? "Reports" : activeTab === "settings" ? "Settings" : `Good morning, ${user ? user.name ? user.name.split(" ")[0] : "Alex" : "Alex"}`), /* @__PURE__ */ React6.createElement("p", { className: "subtitle", style: { fontSize: "0.8rem", color: "var(--text-muted)", margin: "2px 0 0 0" } }, activeTab === "wallet" ? "Balances, bills, cards, and transfers \u2014 in one calm view." : activeTab === "cards" ? "Your physical and virtual cards." : activeTab === "transactions" ? "A quiet ledger of everything moving." : activeTab === "analytics" ? "Financial insights and growth analytics." : activeTab === "investments" ? "Stock portfolio and asset performance." : activeTab === "budgets" ? "Monthly category spending limits." : activeTab === "reports" ? "Financial statements and tax exports." : activeTab === "settings" ? "Account preferences and security." : "Here's your snapshot."))), /* @__PURE__ */ React6.createElement("div", { className: "header-actions", style: { display: "flex", alignItems: "center", gap: "12px" } }, /* @__PURE__ */ React6.createElement("div", { className: "search-box-wrapper", style: { position: "relative", width: "280px" } }, /* @__PURE__ */ React6.createElement("i", { className: "ph ph-magnifying-glass", style: { position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)" } }), /* @__PURE__ */ React6.createElement(
    "input",
    {
      type: "text",
      id: "global-search",
      placeholder: "Search transactions, cards...",
      value: searchQuery || "",
      onChange: (e) => setSearchQuery && setSearchQuery(e.target.value),
      style: { width: "100%", padding: "8px 48px 8px 36px", borderRadius: "20px", border: "1px solid var(--border-color)", background: "var(--bg-app)", fontSize: "0.82rem", outline: "none", color: "var(--text-main)" }
    }
  ), /* @__PURE__ */ React6.createElement("span", { className: "search-cmd-badge", style: { position: "absolute", right: "10px", top: "50%", transform: "translateY(-50%)", background: "var(--bg-card)", border: "1px solid var(--border-color)", borderRadius: "6px", padding: "2px 6px", fontSize: "0.68rem", color: "var(--text-muted)", fontWeight: 600 } }, "\u2318K")), /* @__PURE__ */ React6.createElement(
    "button",
    {
      className: "btn-icon",
      id: "theme-toggle",
      title: "Toggle Theme",
      onClick: toggleTheme,
      style: { width: "36px", height: "36px", borderRadius: "50%", border: "1px solid var(--border-color)", background: "var(--bg-app)", color: "var(--text-main)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }
    },
    /* @__PURE__ */ React6.createElement("i", { className: `ph ${theme === "dark" ? "ph-sun" : "ph-moon"}` })
  ), /* @__PURE__ */ React6.createElement("div", { className: "dropdown-wrapper", style: { position: "relative" } }, /* @__PURE__ */ React6.createElement(
    "button",
    {
      className: "btn-icon btn-notifications",
      title: "Notifications",
      onClick: () => setShowNotifications(!showNotifications),
      style: { width: "36px", height: "36px", borderRadius: "50%", border: "1px solid var(--border-color)", background: "var(--bg-app)", color: "var(--text-main)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", position: "relative" }
    },
    /* @__PURE__ */ React6.createElement("i", { className: "ph ph-bell" }),
    unreadCount > 0 && /* @__PURE__ */ React6.createElement("span", { className: "notification-dot", style: { position: "absolute", top: "4px", right: "4px", width: "8px", height: "8px", background: "#ef4444", borderRadius: "50%" } })
  ), showNotifications && /* @__PURE__ */ React6.createElement("div", { className: "dropdown-menu shadow-lg", style: { position: "absolute", right: 0, top: "48px", width: "330px", background: "var(--bg-card)", border: "1px solid var(--border-color)", borderRadius: "18px", padding: "16px", zIndex: 1e3, boxShadow: "0 12px 35px rgba(0,0,0,0.2)" } }, /* @__PURE__ */ React6.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "14px" } }, /* @__PURE__ */ React6.createElement("div", { style: { display: "flex", alignItems: "center", gap: "8px" } }, /* @__PURE__ */ React6.createElement("h4", { style: { margin: 0, fontSize: "0.95rem", fontWeight: 700, color: "var(--text-main)" } }, "Notifications"), unreadCount > 0 && /* @__PURE__ */ React6.createElement("span", { style: { background: "#ef4444", color: "#fff", fontSize: "0.68rem", fontWeight: 700, padding: "2px 8px", borderRadius: "99px" } }, unreadCount, " new")), unreadCount > 0 && /* @__PURE__ */ React6.createElement("button", { onClick: markAllNotificationsRead, style: { background: "none", border: "none", color: "var(--accent-blue)", fontSize: "0.75rem", fontWeight: 600, cursor: "pointer" } }, "Mark read")), notifications.length === 0 ? /* @__PURE__ */ React6.createElement("div", { style: { textAlign: "center", padding: "24px 0", color: "var(--text-muted)", fontSize: "0.82rem" } }, "No notifications yet") : /* @__PURE__ */ React6.createElement("div", { style: { display: "flex", flexDirection: "column", gap: "10px", maxHeight: "300px", overflowY: "auto" } }, notifications.map((n) => /* @__PURE__ */ React6.createElement("div", { key: n.id, style: { display: "flex", alignItems: "flex-start", gap: "12px", padding: "10px 12px", background: n.unread ? "var(--hover-bg)" : "var(--bg-app)", borderRadius: "12px", border: "1px solid var(--border-color)", position: "relative" } }, /* @__PURE__ */ React6.createElement("div", { style: { width: "32px", height: "32px", borderRadius: "50%", background: `${n.color || "#2563eb"}18`, color: n.color || "#2563eb", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1rem", flexShrink: 0 } }, /* @__PURE__ */ React6.createElement("i", { className: `ph ${n.icon || "ph-bell"}` })), /* @__PURE__ */ React6.createElement("div", { style: { flex: 1 } }, /* @__PURE__ */ React6.createElement("div", { style: { fontSize: "0.85rem", fontWeight: 700, color: "var(--text-main)", marginBottom: "2px" } }, n.title), /* @__PURE__ */ React6.createElement("div", { style: { fontSize: "0.78rem", color: "var(--text-muted)", lineHeight: 1.35 } }, n.desc), /* @__PURE__ */ React6.createElement("div", { style: { fontSize: "0.68rem", color: "var(--text-subtle)", marginTop: "4px" } }, n.time)), /* @__PURE__ */ React6.createElement("button", { onClick: () => removeNotification(n.id), style: { background: "none", border: "none", color: "var(--text-subtle)", cursor: "pointer", fontSize: "0.85rem", padding: "2px" }, title: "Dismiss" }, /* @__PURE__ */ React6.createElement("i", { className: "ph ph-x" }))))), notifications.length > 0 && /* @__PURE__ */ React6.createElement("div", { style: { marginTop: "12px", paddingTop: "10px", borderTop: "1px solid var(--border-color)", textAlign: "center" } }, /* @__PURE__ */ React6.createElement("button", { onClick: clearAllNotifications, style: { background: "none", border: "none", color: "var(--text-muted)", fontSize: "0.75rem", fontWeight: 600, cursor: "pointer" } }, "Clear all notifications")))), /* @__PURE__ */ React6.createElement("div", { className: "dropdown-wrapper", style: { position: "relative" } }, /* @__PURE__ */ React6.createElement(
    "div",
    {
      className: "avatar-badge",
      style: { cursor: "pointer", width: "36px", height: "36px", borderRadius: "50%", background: "var(--accent-blue)", color: "#fff", fontWeight: 700, fontSize: "0.85rem", display: "flex", alignItems: "center", justifyContent: "center" },
      onClick: () => setShowUserDropdown(!showUserDropdown)
    },
    user ? user.avatarInitials || "AM" : "AM"
  ), showUserDropdown && /* @__PURE__ */ React6.createElement("div", { className: "dropdown-menu shadow-lg", style: { position: "absolute", right: 0, top: "48px", width: "180px", background: "var(--bg-card)", border: "1px solid var(--border-color)", borderRadius: "12px", padding: "8px", zIndex: 1e3 } }, /* @__PURE__ */ React6.createElement(
    "button",
    {
      style: { width: "100%", textAlign: "left", padding: "8px 12px", border: "none", background: "none", color: "var(--text-main)", cursor: "pointer", borderRadius: "6px" },
      onClick: () => {
        setActiveTab("settings");
        setShowUserDropdown(false);
      }
    },
    /* @__PURE__ */ React6.createElement("i", { className: "ph ph-gear", style: { marginRight: "8px" } }),
    " Settings"
  ), /* @__PURE__ */ React6.createElement(
    "button",
    {
      style: { width: "100%", textAlign: "left", padding: "8px 12px", border: "none", background: "none", color: "#ef4444", cursor: "pointer", borderRadius: "6px" },
      onClick: logout
    },
    /* @__PURE__ */ React6.createElement("i", { className: "ph ph-sign-out", style: { marginRight: "8px" } }),
    " Logout"
  ))))), /* @__PURE__ */ React6.createElement("main", { className: "dashboard-body" }, children)), /* @__PURE__ */ React6.createElement(ToastContainer, { message: toastMessage, onClose: clearToast }));
};

// src/features/dashboard/DashboardPage.jsx
import React11, { useState as useState9 } from "react";

// src/design-system/components/Modal.jsx
import React7, { useEffect as useEffect6, useState as useState5 } from "react";
var Modal = ({ isOpen, onClose, title, subtitle, children, icon, size = "md" }) => {
  const [shouldRender, setShouldRender] = useState5(isOpen);
  const [isAnimatingOut, setIsAnimatingOut] = useState5(false);
  useEffect6(() => {
    if (isOpen) {
      setShouldRender(true);
      setIsAnimatingOut(false);
      document.body.style.overflow = "hidden";
    } else if (shouldRender) {
      setIsAnimatingOut(true);
      const timer = setTimeout(() => {
        setShouldRender(false);
        setIsAnimatingOut(false);
        document.body.style.overflow = "";
      }, 220);
      return () => clearTimeout(timer);
    }
  }, [isOpen, shouldRender]);
  useEffect6(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);
  useEffect6(() => {
    return () => {
      document.body.style.overflow = "";
    };
  }, []);
  if (!shouldRender) return null;
  return /* @__PURE__ */ React7.createElement(
    "div",
    {
      className: `modal-backdrop ${isOpen && !isAnimatingOut ? "active" : ""} ${isAnimatingOut ? "exiting" : ""}`,
      onClick: (e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }
    },
    /* @__PURE__ */ React7.createElement(
      "div",
      {
        className: `modal-container modal-${size} ${isAnimatingOut ? "exiting" : ""}`,
        role: "dialog",
        "aria-modal": "true",
        onClick: (e) => e.stopPropagation()
      },
      /* @__PURE__ */ React7.createElement("div", { className: "modal-header" }, /* @__PURE__ */ React7.createElement("div", { className: "modal-header-content" }, icon && /* @__PURE__ */ React7.createElement("div", { className: "modal-header-icon" }, /* @__PURE__ */ React7.createElement("i", { className: `ph ${icon}` })), /* @__PURE__ */ React7.createElement("div", null, /* @__PURE__ */ React7.createElement("h3", null, title), subtitle && /* @__PURE__ */ React7.createElement("p", { className: "modal-subtitle" }, subtitle))), /* @__PURE__ */ React7.createElement("button", { type: "button", className: "btn-close-modal", onClick: onClose, "aria-label": "Close modal" }, /* @__PURE__ */ React7.createElement("i", { className: "ph ph-x" }))),
      /* @__PURE__ */ React7.createElement("div", { className: "modal-body" }, children)
    )
  );
};

// src/design-system/components/SendModal.jsx
import React8, { useState as useState6 } from "react";
var RECIPIENTS = [
  { name: "Sarah Connor", email: "sarah@finly.app", avatar: "S", bg: "#f59e0b" },
  { name: "Michael Scott", email: "michael@dunder.com", avatar: "M", bg: "#6366f1" },
  { name: "Ana de Armas", email: "ana@cinema.org", avatar: "A", bg: "#10b981" },
  { name: "Priya Sharma", email: "priya@health.org", avatar: "P", bg: "#ec4899" },
  { name: "Joshua Lee", email: "joshua@dev.io", avatar: "J", bg: "#3b82f6" }
];
var PRESET_AMOUNTS = [10, 25, 50, 100, 250, 500];
var SendModal = ({ isOpen, onClose }) => {
  const { addTransaction, showToast } = useDb();
  const { user } = useAuth();
  const [recipient, setRecipient] = useState6("");
  const [selectedAvatar, setSelectedAvatar] = useState6(null);
  const [amount, setAmount] = useState6("50");
  const [sourceAccount, setSourceAccount] = useState6("Main Checking (**** 2514)");
  const [category, setCategory] = useState6("Transfer");
  const [note, setNote] = useState6("");
  const [isSubmitting, setIsSubmitting] = useState6(false);
  const handleSelectRecipient = (rec) => {
    setRecipient(rec.name);
    setSelectedAvatar(rec);
  };
  const parsedAmt = parseFloat(amount) || 0;
  const currentBalance = user?.balance || 14250.8;
  const isInsufficient = parsedAmt > currentBalance;
  const balanceAfter = Math.max(0, currentBalance - parsedAmt);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isNaN(parsedAmt) || parsedAmt <= 0) {
      showToast("Please enter a valid amount");
      return;
    }
    if (!recipient.trim()) {
      showToast("Please specify a recipient");
      return;
    }
    if (isInsufficient) {
      showToast("Insufficient funds for this transaction");
      return;
    }
    setIsSubmitting(true);
    try {
      const noteText = note.trim() ? ` \u2014 "${note.trim()}"` : "";
      await addTransaction({
        merchant: `Send Payment to ${recipient.trim()}${noteText}`,
        category,
        amount: parsedAmt,
        isPositive: false,
        status: "Completed",
        date: "Today"
      });
      showToast(`Successfully sent $${parsedAmt.toLocaleString("en-US", { minimumFractionDigits: 2 })} to ${recipient.trim()}!`);
      onClose();
      setRecipient("");
      setNote("");
      setSelectedAvatar(null);
    } catch (err) {
      showToast("Payment failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };
  return /* @__PURE__ */ React8.createElement(
    Modal,
    {
      isOpen,
      onClose,
      title: "Send Money / Instant Payment",
      subtitle: "Send instant payments to contacts or external accounts with zero transfer fee",
      icon: "ph-paper-plane-tilt",
      size: "md"
    },
    /* @__PURE__ */ React8.createElement("form", { onSubmit: handleSubmit, style: { display: "flex", flexDirection: "column", gap: "14px" } }, /* @__PURE__ */ React8.createElement("div", null, /* @__PURE__ */ React8.createElement("label", { className: "form-label", style: { fontSize: "0.78rem", fontWeight: 600, marginBottom: "8px", display: "block", color: "var(--text-main)" } }, "Quick Contacts"), /* @__PURE__ */ React8.createElement("div", { style: { display: "flex", gap: "10px", overflowX: "auto", paddingBottom: "6px", scrollbarWidth: "thin" } }, RECIPIENTS.map((rec) => {
      const isSelected = selectedAvatar?.email === rec.email || recipient.toLowerCase() === rec.name.toLowerCase();
      return /* @__PURE__ */ React8.createElement(
        "button",
        {
          key: rec.email,
          type: "button",
          onClick: () => handleSelectRecipient(rec),
          style: {
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "6px",
            background: isSelected ? "rgba(59, 130, 246, 0.15)" : "var(--bg-app)",
            border: `1.5px solid ${isSelected ? "var(--accent-blue)" : "var(--border-color)"}`,
            borderRadius: "14px",
            padding: "10px 14px",
            cursor: "pointer",
            minWidth: "76px",
            transition: "all 0.18s cubic-bezier(0.16, 1, 0.3, 1)",
            transform: isSelected ? "translateY(-2px)" : "none",
            boxShadow: isSelected ? "0 4px 12px rgba(37, 99, 235, 0.2)" : "none"
          }
        },
        /* @__PURE__ */ React8.createElement(
          "div",
          {
            style: {
              width: "34px",
              height: "34px",
              borderRadius: "50%",
              background: rec.bg,
              color: "#fff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: 700,
              fontSize: "0.85rem",
              boxShadow: isSelected ? "0 0 0 2px var(--accent-blue)" : "none"
            }
          },
          rec.avatar
        ),
        /* @__PURE__ */ React8.createElement("span", { style: { fontSize: "0.74rem", color: "var(--text-main)", fontWeight: isSelected ? 700 : 500, whiteSpace: "nowrap" } }, rec.name.split(" ")[0])
      );
    }))), /* @__PURE__ */ React8.createElement("div", { className: "form-group" }, /* @__PURE__ */ React8.createElement("label", { className: "form-label", style: { fontSize: "0.78rem", fontWeight: 600, color: "var(--text-main)" } }, "Recipient Name / Email / Phone"), /* @__PURE__ */ React8.createElement(
      "input",
      {
        type: "text",
        className: "form-control",
        placeholder: "e.g. Sarah Connor, sarah@gmail.com",
        value: recipient,
        onChange: (e) => {
          setRecipient(e.target.value);
          setSelectedAvatar(null);
        },
        required: true
      }
    )), /* @__PURE__ */ React8.createElement("div", null, /* @__PURE__ */ React8.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "6px" } }, /* @__PURE__ */ React8.createElement("label", { className: "form-label", style: { fontSize: "0.78rem", fontWeight: 600, color: "var(--text-main)", margin: 0 } }, "Amount ($)"), /* @__PURE__ */ React8.createElement("span", { style: { fontSize: "0.74rem", color: isInsufficient ? "#ef4444" : "var(--text-muted)", fontWeight: isInsufficient ? 700 : 500 } }, isInsufficient ? "Insufficient Funds! " : "", "Available: $", currentBalance.toLocaleString("en-US", { minimumFractionDigits: 2 }))), /* @__PURE__ */ React8.createElement(
      "input",
      {
        type: "number",
        step: "0.01",
        className: "form-control",
        placeholder: "0.00",
        value: amount,
        onChange: (e) => setAmount(e.target.value),
        required: true,
        style: {
          fontSize: "1.25rem",
          fontWeight: 700,
          border: `1.5px solid ${isInsufficient ? "#ef4444" : "var(--border-color)"}`,
          marginBottom: "8px"
        }
      }
    ), /* @__PURE__ */ React8.createElement("div", { style: { display: "flex", gap: "8px", flexWrap: "wrap" } }, PRESET_AMOUNTS.map((val) => /* @__PURE__ */ React8.createElement(
      "button",
      {
        key: val,
        type: "button",
        onClick: () => setAmount(val.toString()),
        style: {
          background: parsedAmt === val ? "var(--accent-blue)" : "var(--bg-app)",
          color: parsedAmt === val ? "#fff" : "var(--text-main)",
          border: `1px solid ${parsedAmt === val ? "var(--accent-blue)" : "var(--border-color)"}`,
          borderRadius: "10px",
          padding: "5px 14px",
          fontSize: "0.78rem",
          fontWeight: 600,
          cursor: "pointer",
          transition: "all 0.15s ease"
        }
      },
      "+$",
      val
    )))), /* @__PURE__ */ React8.createElement("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" } }, /* @__PURE__ */ React8.createElement("div", { className: "form-group" }, /* @__PURE__ */ React8.createElement("label", { className: "form-label", style: { fontSize: "0.78rem", fontWeight: 600, color: "var(--text-main)" } }, "From Account"), /* @__PURE__ */ React8.createElement(
      "select",
      {
        className: "form-control",
        value: sourceAccount,
        onChange: (e) => setSourceAccount(e.target.value)
      },
      /* @__PURE__ */ React8.createElement("option", { value: "Main Checking (**** 2514)" }, "Main Checking (**** 2514)"),
      /* @__PURE__ */ React8.createElement("option", { value: "Visa Platinum (**** 8821)" }, "Visa Platinum (**** 8821)"),
      /* @__PURE__ */ React8.createElement("option", { value: "Cash Wallet" }, "Cash Wallet")
    )), /* @__PURE__ */ React8.createElement("div", { className: "form-group" }, /* @__PURE__ */ React8.createElement("label", { className: "form-label", style: { fontSize: "0.78rem", fontWeight: 600, color: "var(--text-main)" } }, "Category"), /* @__PURE__ */ React8.createElement(
      "select",
      {
        className: "form-control",
        value: category,
        onChange: (e) => setCategory(e.target.value)
      },
      /* @__PURE__ */ React8.createElement("option", { value: "Transfer" }, "Personal Transfer"),
      /* @__PURE__ */ React8.createElement("option", { value: "Services" }, "Services & Supplies"),
      /* @__PURE__ */ React8.createElement("option", { value: "Rent" }, "Rent & Utilities"),
      /* @__PURE__ */ React8.createElement("option", { value: "Food & Dining" }, "Food & Split Bill"),
      /* @__PURE__ */ React8.createElement("option", { value: "Shopping" }, "Shopping")
    ))), /* @__PURE__ */ React8.createElement("div", { className: "form-group" }, /* @__PURE__ */ React8.createElement("label", { className: "form-label", style: { fontSize: "0.78rem", fontWeight: 600, color: "var(--text-main)" } }, "Note / Memo (Optional)"), /* @__PURE__ */ React8.createElement(
      "input",
      {
        type: "text",
        className: "form-control",
        placeholder: "e.g. Dinner split \u{1F355}, Freelance work...",
        value: note,
        onChange: (e) => setNote(e.target.value)
      }
    )), /* @__PURE__ */ React8.createElement("div", { style: { background: "var(--bg-app)", border: "1px solid var(--border-color)", borderRadius: "14px", padding: "12px 16px", fontSize: "0.8rem" } }, /* @__PURE__ */ React8.createElement("div", { style: { display: "flex", justifyContent: "space-between", marginBottom: "6px" } }, /* @__PURE__ */ React8.createElement("span", { style: { color: "var(--text-muted)" } }, "Transfer Fee:"), /* @__PURE__ */ React8.createElement("span", { style: { color: "#10b981", fontWeight: 600 } }, "$0.00 (Instant Free)")), /* @__PURE__ */ React8.createElement("div", { style: { display: "flex", justifyContent: "space-between", marginBottom: "6px" } }, /* @__PURE__ */ React8.createElement("span", { style: { color: "var(--text-muted)" } }, "Delivery Time:"), /* @__PURE__ */ React8.createElement("span", { style: { color: "var(--text-main)", fontWeight: 600 } }, "Instant Settlement \u26A1")), /* @__PURE__ */ React8.createElement("div", { style: { display: "flex", justifyContent: "space-between", borderTop: "1px dashed var(--border-color)", paddingTop: "8px", marginTop: "6px" } }, /* @__PURE__ */ React8.createElement("span", { style: { color: "var(--text-muted)" } }, "Balance After:"), /* @__PURE__ */ React8.createElement("span", { style: { color: isInsufficient ? "#ef4444" : "var(--text-main)", fontWeight: 700 } }, "$", balanceAfter.toLocaleString("en-US", { minimumFractionDigits: 2 })))), /* @__PURE__ */ React8.createElement(
      "button",
      {
        type: "submit",
        disabled: isSubmitting || isInsufficient || parsedAmt <= 0,
        className: "btn btn-primary",
        style: {
          width: "100%",
          padding: "12px",
          fontSize: "0.92rem",
          fontWeight: 700,
          borderRadius: "12px",
          background: isSubmitting || isInsufficient ? "var(--text-muted)" : "var(--accent-blue)",
          color: "#fff",
          border: "none",
          cursor: isSubmitting || isInsufficient ? "not-allowed" : "pointer",
          display: "flex",
          alignItems: "center",
          justify: "center",
          gap: "8px",
          boxShadow: "0 4px 16px rgba(37, 99, 235, 0.3)",
          transition: "all 0.2s ease",
          marginTop: "4px"
        }
      },
      isSubmitting ? /* @__PURE__ */ React8.createElement(React8.Fragment, null, /* @__PURE__ */ React8.createElement("i", { className: "ph ph-spinner spin" }), " Processing Payment...") : /* @__PURE__ */ React8.createElement(React8.Fragment, null, /* @__PURE__ */ React8.createElement("i", { className: "ph ph-paper-plane-tilt" }), " Send $", parsedAmt.toLocaleString("en-US", { minimumFractionDigits: 2 }), " Now")
    ))
  );
};

// src/design-system/components/TransferModal.jsx
import React9, { useState as useState7 } from "react";
var PRESET_AMOUNTS2 = [50, 100, 250, 500, 1e3];
var TransferModal = ({ isOpen, onClose }) => {
  const { addTransaction, showToast } = useDb();
  const { user } = useAuth();
  const [fromAccount, setFromAccount] = useState7("Main Checking (**** 2514)");
  const [toAccount, setToAccount] = useState7("Emergency Savings Vault");
  const [amount, setAmount] = useState7("250");
  const [schedule, setSchedule] = useState7("instant");
  const [note, setNote] = useState7("");
  const [isSubmitting, setIsSubmitting] = useState7(false);
  const [isSwapping, setIsSwapping] = useState7(false);
  const handleSwap = () => {
    setIsSwapping(true);
    const temp = fromAccount;
    setFromAccount(toAccount);
    setToAccount(temp);
    setTimeout(() => setIsSwapping(false), 300);
  };
  const parsedAmt = parseFloat(amount) || 0;
  const currentBalance = user?.balance || 14250.8;
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isNaN(parsedAmt) || parsedAmt <= 0) {
      showToast("Please enter a valid transfer amount");
      return;
    }
    if (fromAccount === toAccount) {
      showToast("Source and destination accounts must be different");
      return;
    }
    setIsSubmitting(true);
    try {
      const noteText = note.trim() ? ` \u2014 "${note.trim()}"` : "";
      const schedText = schedule !== "instant" ? ` (${schedule.toUpperCase()})` : "";
      await addTransaction({
        merchant: `Transfer (${fromAccount} \u2794 ${toAccount})${schedText}${noteText}`,
        category: "Transfer",
        amount: parsedAmt,
        isPositive: false,
        status: "Completed",
        date: "Today"
      });
      showToast(`Transferred $${parsedAmt.toLocaleString("en-US", { minimumFractionDigits: 2 })} from ${fromAccount} to ${toAccount}`);
      onClose();
      setNote("");
    } catch (err) {
      showToast("Transfer failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };
  return /* @__PURE__ */ React9.createElement(
    Modal,
    {
      isOpen,
      onClose,
      title: "Internal Transfer / Vault Move",
      subtitle: "Move funds seamlessly between your checking, savings, and investment accounts",
      icon: "ph-arrows-left-right",
      size: "md"
    },
    /* @__PURE__ */ React9.createElement("form", { onSubmit: handleSubmit, style: { display: "flex", flexDirection: "column", gap: "14px" } }, /* @__PURE__ */ React9.createElement("div", { style: { background: "var(--bg-app)", border: "1px solid var(--border-color)", borderRadius: "16px", padding: "16px", position: "relative" } }, /* @__PURE__ */ React9.createElement("div", { className: "form-group", style: { marginBottom: "10px" } }, /* @__PURE__ */ React9.createElement("label", { className: "form-label", style: { fontSize: "0.74rem", fontWeight: 700, color: "var(--text-muted)", marginBottom: "4px", display: "block", letterSpacing: "0.04em" } }, "TRANSFER FROM"), /* @__PURE__ */ React9.createElement(
      "select",
      {
        className: "form-control",
        value: fromAccount,
        onChange: (e) => setFromAccount(e.target.value),
        style: { fontWeight: 600 }
      },
      /* @__PURE__ */ React9.createElement("option", { value: "Main Checking (**** 2514)" }, "Main Checking (**** 2514)"),
      /* @__PURE__ */ React9.createElement("option", { value: "Visa Platinum (**** 8821)" }, "Visa Platinum (**** 8821)"),
      /* @__PURE__ */ React9.createElement("option", { value: "Investment Portfolio" }, "Investment Portfolio Account"),
      /* @__PURE__ */ React9.createElement("option", { value: "Emergency Savings Vault" }, "Emergency Savings Vault")
    )), /* @__PURE__ */ React9.createElement("div", { style: { display: "flex", justifyContent: "center", margin: "-6px 0 6px 0", position: "relative", zIndex: 2 } }, /* @__PURE__ */ React9.createElement(
      "button",
      {
        type: "button",
        onClick: handleSwap,
        title: "Swap From and To accounts",
        style: {
          background: "var(--bg-card)",
          border: "1px solid var(--border-color)",
          borderRadius: "50%",
          width: "36px",
          height: "36px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "var(--accent-blue)",
          cursor: "pointer",
          boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
          transition: "transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
          transform: isSwapping ? "rotate(180deg)" : "rotate(0deg)"
        }
      },
      /* @__PURE__ */ React9.createElement("i", { className: "ph ph-arrows-down-up", style: { fontSize: "1.1rem" } })
    )), /* @__PURE__ */ React9.createElement("div", { className: "form-group" }, /* @__PURE__ */ React9.createElement("label", { className: "form-label", style: { fontSize: "0.74rem", fontWeight: 700, color: "var(--text-muted)", marginBottom: "4px", display: "block", letterSpacing: "0.04em" } }, "TRANSFER TO"), /* @__PURE__ */ React9.createElement(
      "select",
      {
        className: "form-control",
        value: toAccount,
        onChange: (e) => setToAccount(e.target.value),
        style: { fontWeight: 600 }
      },
      /* @__PURE__ */ React9.createElement("option", { value: "Emergency Savings Vault" }, "Emergency Savings Vault"),
      /* @__PURE__ */ React9.createElement("option", { value: "Japan 2027 Goal" }, "Japan 2027 Goal Vault"),
      /* @__PURE__ */ React9.createElement("option", { value: "Crypto Investment Account" }, "Crypto Investment Account"),
      /* @__PURE__ */ React9.createElement("option", { value: "Main Checking (**** 2514)" }, "Main Checking (**** 2514)"),
      /* @__PURE__ */ React9.createElement("option", { value: "Visa Platinum (**** 8821)" }, "Visa Platinum (**** 8821)")
    ))), /* @__PURE__ */ React9.createElement("div", null, /* @__PURE__ */ React9.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "6px" } }, /* @__PURE__ */ React9.createElement("label", { className: "form-label", style: { fontSize: "0.78rem", fontWeight: 600, color: "var(--text-main)", margin: 0 } }, "Transfer Amount ($)"), /* @__PURE__ */ React9.createElement("span", { style: { fontSize: "0.74rem", color: "var(--text-muted)" } }, "Source Balance: $", currentBalance.toLocaleString("en-US", { minimumFractionDigits: 2 }))), /* @__PURE__ */ React9.createElement(
      "input",
      {
        type: "number",
        step: "0.01",
        className: "form-control",
        placeholder: "0.00",
        value: amount,
        onChange: (e) => setAmount(e.target.value),
        required: true,
        style: {
          fontSize: "1.25rem",
          fontWeight: 700,
          marginBottom: "8px"
        }
      }
    ), /* @__PURE__ */ React9.createElement("div", { style: { display: "flex", gap: "8px", flexWrap: "wrap" } }, PRESET_AMOUNTS2.map((val) => /* @__PURE__ */ React9.createElement(
      "button",
      {
        key: val,
        type: "button",
        onClick: () => setAmount(val.toString()),
        style: {
          background: parsedAmt === val ? "var(--accent-blue)" : "var(--bg-app)",
          color: parsedAmt === val ? "#fff" : "var(--text-main)",
          border: `1px solid ${parsedAmt === val ? "var(--accent-blue)" : "var(--border-color)"}`,
          borderRadius: "10px",
          padding: "5px 14px",
          fontSize: "0.78rem",
          fontWeight: 600,
          cursor: "pointer",
          transition: "all 0.15s ease"
        }
      },
      "+$",
      val
    )), /* @__PURE__ */ React9.createElement(
      "button",
      {
        type: "button",
        onClick: () => setAmount(currentBalance.toFixed(2)),
        style: {
          background: "rgba(16, 185, 129, 0.15)",
          color: "#10b981",
          border: "1px solid rgba(16, 185, 129, 0.3)",
          borderRadius: "10px",
          padding: "5px 14px",
          fontSize: "0.78rem",
          fontWeight: 700,
          cursor: "pointer"
        }
      },
      "MAX"
    ))), /* @__PURE__ */ React9.createElement("div", null, /* @__PURE__ */ React9.createElement("label", { className: "form-label", style: { fontSize: "0.78rem", fontWeight: 600, color: "var(--text-main)", marginBottom: "6px", display: "block" } }, "Transfer Frequency"), /* @__PURE__ */ React9.createElement("div", { style: { display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "8px" } }, [
      { id: "instant", label: "Instant \u26A1" },
      { id: "weekly", label: "Weekly \u{1F5D3}\uFE0F" },
      { id: "monthly", label: "Monthly \u{1F4C5}" }
    ].map((item) => /* @__PURE__ */ React9.createElement(
      "button",
      {
        key: item.id,
        type: "button",
        onClick: () => setSchedule(item.id),
        style: {
          background: schedule === item.id ? "rgba(59, 130, 246, 0.15)" : "var(--bg-app)",
          border: `1.5px solid ${schedule === item.id ? "var(--accent-blue)" : "var(--border-color)"}`,
          color: schedule === item.id ? "var(--accent-blue)" : "var(--text-main)",
          borderRadius: "10px",
          padding: "9px 8px",
          fontSize: "0.78rem",
          fontWeight: 600,
          cursor: "pointer",
          transition: "all 0.15s ease"
        }
      },
      item.label
    )))), /* @__PURE__ */ React9.createElement("div", { className: "form-group" }, /* @__PURE__ */ React9.createElement("label", { className: "form-label", style: { fontSize: "0.78rem", fontWeight: 600, color: "var(--text-main)" } }, "Memo / Purpose (Optional)"), /* @__PURE__ */ React9.createElement(
      "input",
      {
        type: "text",
        className: "form-control",
        placeholder: "e.g. Monthly savings contribution, vacation fund...",
        value: note,
        onChange: (e) => setNote(e.target.value)
      }
    )), /* @__PURE__ */ React9.createElement("div", { style: { background: "var(--bg-app)", border: "1px solid var(--border-color)", borderRadius: "14px", padding: "12px 16px", fontSize: "0.8rem" } }, /* @__PURE__ */ React9.createElement("div", { style: { display: "flex", justifyContent: "space-between", marginBottom: "6px" } }, /* @__PURE__ */ React9.createElement("span", { style: { color: "var(--text-muted)" } }, "From Account (", fromAccount.split(" ")[0], "):"), /* @__PURE__ */ React9.createElement("span", { style: { color: "var(--text-main)", fontWeight: 600 } }, "-$", parsedAmt.toLocaleString("en-US", { minimumFractionDigits: 2 }))), /* @__PURE__ */ React9.createElement("div", { style: { display: "flex", justifyContent: "space-between", marginBottom: "6px" } }, /* @__PURE__ */ React9.createElement("span", { style: { color: "var(--text-muted)" } }, "To Vault (", toAccount.split(" ")[0], "):"), /* @__PURE__ */ React9.createElement("span", { style: { color: "#10b981", fontWeight: 600 } }, "+$", parsedAmt.toLocaleString("en-US", { minimumFractionDigits: 2 }))), /* @__PURE__ */ React9.createElement("div", { style: { display: "flex", justifyContent: "space-between", borderTop: "1px dashed var(--border-color)", paddingTop: "8px", marginTop: "6px" } }, /* @__PURE__ */ React9.createElement("span", { style: { color: "var(--text-muted)" } }, "Execution:"), /* @__PURE__ */ React9.createElement("span", { style: { color: "var(--text-main)", fontWeight: 700 } }, schedule === "instant" ? "Immediate Settlement" : `Auto-recurring (${schedule})`))), /* @__PURE__ */ React9.createElement(
      "button",
      {
        type: "submit",
        disabled: isSubmitting || parsedAmt <= 0,
        className: "btn btn-primary",
        style: {
          width: "100%",
          padding: "12px",
          fontSize: "0.92rem",
          fontWeight: 700,
          borderRadius: "12px",
          background: isSubmitting ? "var(--text-muted)" : "var(--accent-blue)",
          color: "#fff",
          border: "none",
          cursor: isSubmitting ? "not-allowed" : "pointer",
          display: "flex",
          alignItems: "center",
          justify: "center",
          gap: "8px",
          boxShadow: "0 4px 16px rgba(37, 99, 235, 0.3)",
          transition: "all 0.2s ease",
          marginTop: "4px"
        }
      },
      isSubmitting ? /* @__PURE__ */ React9.createElement(React9.Fragment, null, /* @__PURE__ */ React9.createElement("i", { className: "ph ph-spinner spin" }), " Processing Transfer...") : /* @__PURE__ */ React9.createElement(React9.Fragment, null, /* @__PURE__ */ React9.createElement("i", { className: "ph ph-arrows-left-right" }), " Confirm Internal Transfer ($", parsedAmt.toLocaleString("en-US", { minimumFractionDigits: 2 }), ")")
    ))
  );
};

// src/design-system/components/TopUpModal.jsx
import React10, { useState as useState8 } from "react";
var METHODS = [
  { id: "card", name: "Debit Card (**** 4092)", icon: "ph-credit-card", badge: "Instant \u2022 $0 Fee" },
  { id: "bank", name: "Direct Bank Transfer (Chase)", icon: "ph-bank", badge: "1-2 Days \u2022 $0 Fee" },
  { id: "apple", name: "Apple Pay Instant", icon: "ph-apple-logo", badge: "Instant \u2022 $0 Fee" },
  { id: "wire", name: "Wire Deposit", icon: "ph-lightning", badge: "Instant \u2022 $0 Fee" },
  { id: "crypto", name: "Crypto Deposit (USDC/USDT)", icon: "ph-currency-btc", badge: "Instant \u2022 0.1% Rebate" }
];
var PRESET_AMOUNTS3 = [50, 100, 200, 500, 1e3, 2500];
var TopUpModal = ({ isOpen, onClose }) => {
  const { addTransaction, showToast } = useDb();
  const { user } = useAuth();
  const [selectedMethod, setSelectedMethod] = useState8(METHODS[0].name);
  const [amount, setAmount] = useState8("500");
  const [autoTopUp, setAutoTopUp] = useState8(false);
  const [isSubmitting, setIsSubmitting] = useState8(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const amt = parseFloat(amount);
    if (isNaN(amt) || amt <= 0) {
      showToast("Please enter a valid deposit amount");
      return;
    }
    setIsSubmitting(true);
    try {
      await addTransaction({
        merchant: `Top Up \u2014 ${selectedMethod}`,
        category: "Income",
        amount: amt,
        isPositive: true,
        status: "Completed",
        date: "Today"
      });
      const autoMsg = autoTopUp ? " (Auto Top-Up Enabled)" : "";
      showToast(`Top up +$${amt.toLocaleString("en-US", { minimumFractionDigits: 2 })} successful via ${selectedMethod}${autoMsg}`);
      onClose();
    } catch (err) {
      showToast("Failed to complete top up. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };
  const parsedAmt = parseFloat(amount) || 0;
  const currentBalance = user?.balance || 14250.8;
  const balanceAfter = currentBalance + parsedAmt;
  return /* @__PURE__ */ React10.createElement(
    Modal,
    {
      isOpen,
      onClose,
      title: "Top Up Balance / Deposit",
      subtitle: "Instantly deposit funds into your Finly checking or vault balance",
      icon: "ph-plus-circle",
      size: "md"
    },
    /* @__PURE__ */ React10.createElement("form", { onSubmit: handleSubmit, style: { display: "flex", flexDirection: "column", gap: "14px" } }, /* @__PURE__ */ React10.createElement("div", null, /* @__PURE__ */ React10.createElement("label", { className: "form-label", style: { fontSize: "0.78rem", fontWeight: 600, color: "var(--text-main)", marginBottom: "8px", display: "block" } }, "Select Payment / Funding Method"), /* @__PURE__ */ React10.createElement("div", { style: { display: "flex", flexDirection: "column", gap: "8px", maxHeight: "180px", overflowY: "auto", paddingRight: "4px", scrollbarWidth: "thin" } }, METHODS.map((method) => {
      const isSelected = selectedMethod === method.name;
      return /* @__PURE__ */ React10.createElement(
        "div",
        {
          key: method.id,
          onClick: () => setSelectedMethod(method.name),
          style: {
            display: "flex",
            alignItems: "center",
            justify: "space-between",
            padding: "10px 14px",
            borderRadius: "12px",
            background: isSelected ? "rgba(16, 185, 129, 0.12)" : "var(--bg-app)",
            border: `1.5px solid ${isSelected ? "#10b981" : "var(--border-color)"}`,
            cursor: "pointer",
            transition: "all 0.15s ease",
            boxShadow: isSelected ? "0 4px 12px rgba(16, 185, 129, 0.15)" : "none"
          }
        },
        /* @__PURE__ */ React10.createElement("div", { style: { display: "flex", alignItems: "center", gap: "12px" } }, /* @__PURE__ */ React10.createElement(
          "div",
          {
            style: {
              width: "36px",
              height: "36px",
              borderRadius: "10px",
              background: isSelected ? "#10b981" : "rgba(255,255,255,0.06)",
              color: isSelected ? "#fff" : "var(--text-main)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "1.1rem",
              flexShrink: 0
            }
          },
          /* @__PURE__ */ React10.createElement("i", { className: `ph ${method.icon}` })
        ), /* @__PURE__ */ React10.createElement("div", null, /* @__PURE__ */ React10.createElement("strong", { style: { display: "block", fontSize: "0.84rem", color: "var(--text-main)", fontWeight: 600 } }, method.name), /* @__PURE__ */ React10.createElement("span", { style: { fontSize: "0.72rem", color: "var(--text-muted)" } }, method.badge))),
        isSelected && /* @__PURE__ */ React10.createElement("i", { className: "ph ph-check-circle-fill", style: { color: "#10b981", fontSize: "1.25rem" } })
      );
    }))), /* @__PURE__ */ React10.createElement("div", null, /* @__PURE__ */ React10.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "6px" } }, /* @__PURE__ */ React10.createElement("label", { className: "form-label", style: { fontSize: "0.78rem", fontWeight: 600, color: "var(--text-main)", margin: 0 } }, "Top Up Amount ($)"), /* @__PURE__ */ React10.createElement("span", { style: { fontSize: "0.74rem", color: "var(--text-muted)" } }, "Current: $", currentBalance.toLocaleString("en-US", { minimumFractionDigits: 2 }))), /* @__PURE__ */ React10.createElement(
      "input",
      {
        type: "number",
        step: "0.01",
        className: "form-control",
        placeholder: "0.00",
        value: amount,
        onChange: (e) => setAmount(e.target.value),
        required: true,
        style: {
          fontSize: "1.25rem",
          fontWeight: 700,
          marginBottom: "8px"
        }
      }
    ), /* @__PURE__ */ React10.createElement("div", { style: { display: "flex", gap: "8px", flexWrap: "wrap" } }, PRESET_AMOUNTS3.map((val) => /* @__PURE__ */ React10.createElement(
      "button",
      {
        key: val,
        type: "button",
        onClick: () => setAmount(val.toString()),
        style: {
          background: parsedAmt === val ? "#10b981" : "var(--bg-app)",
          color: parsedAmt === val ? "#fff" : "var(--text-main)",
          border: `1px solid ${parsedAmt === val ? "#10b981" : "var(--border-color)"}`,
          borderRadius: "10px",
          padding: "5px 14px",
          fontSize: "0.78rem",
          fontWeight: 600,
          cursor: "pointer",
          transition: "all 0.15s ease"
        }
      },
      "+$",
      val
    )))), /* @__PURE__ */ React10.createElement("div", { style: { display: "flex", alignItems: "center", justifyContent: "space-between", background: "var(--bg-app)", border: "1px solid var(--border-color)", borderRadius: "12px", padding: "10px 14px" } }, /* @__PURE__ */ React10.createElement("div", null, /* @__PURE__ */ React10.createElement("strong", { style: { display: "block", fontSize: "0.82rem", color: "var(--text-main)", fontWeight: 600 } }, "Auto Top-Up Rule"), /* @__PURE__ */ React10.createElement("span", { style: { fontSize: "0.72rem", color: "var(--text-muted)" } }, "Automatically top up when balance drops below $100")), /* @__PURE__ */ React10.createElement("label", { style: { position: "relative", display: "inline-block", width: "42px", height: "24px" } }, /* @__PURE__ */ React10.createElement(
      "input",
      {
        type: "checkbox",
        checked: autoTopUp,
        onChange: (e) => setAutoTopUp(e.target.checked),
        style: { opacity: 0, width: 0, height: 0 }
      }
    ), /* @__PURE__ */ React10.createElement(
      "span",
      {
        style: {
          position: "absolute",
          cursor: "pointer",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: autoTopUp ? "#10b981" : "var(--border-color)",
          borderRadius: "24px",
          transition: "0.2s"
        }
      },
      /* @__PURE__ */ React10.createElement(
        "span",
        {
          style: {
            position: "absolute",
            content: '""',
            height: "18px",
            width: "18px",
            left: autoTopUp ? "20px" : "3px",
            bottom: "3px",
            backgroundColor: "#fff",
            borderRadius: "50%",
            transition: "0.2s"
          }
        }
      )
    ))), /* @__PURE__ */ React10.createElement("div", { style: { background: "var(--bg-app)", border: "1px solid var(--border-color)", borderRadius: "14px", padding: "12px 16px", fontSize: "0.8rem" } }, /* @__PURE__ */ React10.createElement("div", { style: { display: "flex", justifyContent: "space-between", marginBottom: "6px" } }, /* @__PURE__ */ React10.createElement("span", { style: { color: "var(--text-muted)" } }, "Deposit Amount:"), /* @__PURE__ */ React10.createElement("span", { style: { color: "var(--text-main)", fontWeight: 600 } }, "+$", parsedAmt.toLocaleString("en-US", { minimumFractionDigits: 2 }))), /* @__PURE__ */ React10.createElement("div", { style: { display: "flex", justifyContent: "space-between", marginBottom: "6px" } }, /* @__PURE__ */ React10.createElement("span", { style: { color: "var(--text-muted)" } }, "Processing Fee:"), /* @__PURE__ */ React10.createElement("span", { style: { color: "#10b981", fontWeight: 600 } }, "$0.00 (Waived)")), /* @__PURE__ */ React10.createElement("div", { style: { display: "flex", justifyContent: "space-between", borderTop: "1px dashed var(--border-color)", paddingTop: "8px", marginTop: "6px" } }, /* @__PURE__ */ React10.createElement("span", { style: { color: "var(--text-muted)" } }, "New Total Balance:"), /* @__PURE__ */ React10.createElement("span", { style: { color: "#10b981", fontWeight: 800, fontSize: "0.9rem" } }, "$", balanceAfter.toLocaleString("en-US", { minimumFractionDigits: 2 })))), /* @__PURE__ */ React10.createElement(
      "button",
      {
        type: "submit",
        disabled: isSubmitting || parsedAmt <= 0,
        className: "btn btn-primary",
        style: {
          width: "100%",
          padding: "12px",
          fontSize: "0.92rem",
          fontWeight: 700,
          borderRadius: "12px",
          background: isSubmitting ? "var(--text-muted)" : "#10b981",
          color: "#fff",
          border: "none",
          cursor: isSubmitting ? "not-allowed" : "pointer",
          display: "flex",
          alignItems: "center",
          justify: "center",
          gap: "8px",
          boxShadow: "0 4px 16px rgba(16, 185, 129, 0.3)",
          transition: "all 0.2s ease",
          marginTop: "4px"
        }
      },
      isSubmitting ? /* @__PURE__ */ React10.createElement(React10.Fragment, null, /* @__PURE__ */ React10.createElement("i", { className: "ph ph-spinner spin" }), " Processing Deposit...") : /* @__PURE__ */ React10.createElement(React10.Fragment, null, /* @__PURE__ */ React10.createElement("i", { className: "ph ph-plus-circle" }), " Confirm Top Up (+$", parsedAmt.toLocaleString("en-US", { minimumFractionDigits: 2 }), ")")
    ))
  );
};

// src/features/dashboard/DashboardPage.jsx
var DashboardPage = ({ setActiveTab }) => {
  const { user, toggleBalancePrivacy } = useAuth();
  const {
    transactions,
    cards,
    budgets,
    investments,
    addTransaction,
    addCard,
    showToast
  } = useDb();
  const [isTopUpOpen, setIsTopUpOpen] = useState9(false);
  const [isSendOpen, setIsSendOpen] = useState9(false);
  const [isTransferOpen, setIsTransferOpen] = useState9(false);
  const [isAddCardOpen, setIsAddCardOpen] = useState9(false);
  const [topUpAmount, setTopUpAmount] = useState9("500");
  const [topUpMethod, setTopUpMethod] = useState9("Debit Card (**** 4092)");
  const [sendRecipient, setSendRecipient] = useState9("");
  const [sendAmount, setSendAmount] = useState9("");
  const [sendCategory, setSendCategory] = useState9("Transfer");
  const [transferFrom, setTransferFrom] = useState9("Main Account (**** 2514)");
  const [transferTo, setTransferTo] = useState9("Savings Vault");
  const [transferAmount, setTransferAmount] = useState9("250");
  const [quickRecipient, setQuickRecipient] = useState9("Sarah");
  const [quickAmount, setQuickAmount] = useState9("");
  const [quickNote, setQuickNote] = useState9("Dinner split");
  const [statusFilter, setStatusFilter] = useState9("all");
  const [txSearch, setTxSearch] = useState9("");
  const [analyticsPeriod, setAnalyticsPeriod] = useState9("Monthly");
  const [investTab, setInvestTab] = useState9("buy");
  const recipients = [
    { name: "Sarah", avatar: "S", bg: "#f59e0b" },
    { name: "Michael", avatar: "M", bg: "#6366f1" },
    { name: "Ana", avatar: "A", bg: "#10b981" },
    { name: "Priya", avatar: "P", bg: "#ec4899" },
    { name: "Joshua", avatar: "J", bg: "#3b82f6" }
  ];
  const handleTopUpSubmit = (e) => {
    e.preventDefault();
    const amt = parseFloat(topUpAmount);
    if (isNaN(amt) || amt <= 0) return;
    addTransaction({ merchant: `Top Up &mdash; ${topUpMethod}`, category: "Income", amount: amt, isPositive: true });
    setIsTopUpOpen(false);
    showToast(`Top up +$${amt.toLocaleString("en-US", { minimumFractionDigits: 2 })} successful via ${topUpMethod}`);
  };
  const handleSendSubmit = (e) => {
    e.preventDefault();
    const amt = parseFloat(sendAmount);
    if (isNaN(amt) || amt <= 0 || !sendRecipient) return;
    addTransaction({ merchant: `Send Payment to ${sendRecipient}`, category: sendCategory, amount: amt, isPositive: false });
    setIsSendOpen(false);
    setSendRecipient("");
    setSendAmount("");
    showToast(`Sent $${amt.toLocaleString("en-US", { minimumFractionDigits: 2 })} to ${sendRecipient}`);
  };
  const handleTransferSubmit = (e) => {
    e.preventDefault();
    const amt = parseFloat(transferAmount);
    if (isNaN(amt) || amt <= 0) return;
    addTransaction({ merchant: `Transfer (${transferFrom} \u2794 ${transferTo})`, category: "Transfer", amount: amt, isPositive: false });
    setIsTransferOpen(false);
    showToast(`Transferred $${amt.toLocaleString("en-US", { minimumFractionDigits: 2 })} from ${transferFrom} to ${transferTo}`);
  };
  const handleQuickTransfer = (e) => {
    e.preventDefault();
    const amt = parseFloat(quickAmount);
    if (isNaN(amt) || amt <= 0) return;
    addTransaction({ merchant: `Transfer to ${quickRecipient}`, category: "Transfer", amount: amt, isPositive: false });
    setQuickAmount("");
    setQuickNote("");
    showToast(`Transferred $${amt.toLocaleString("en-US", { minimumFractionDigits: 2 })} to ${quickRecipient}`);
  };
  const exportCSV = () => {
    let csvContent = "Merchant,Category,Date,Status,Amount\n";
    filteredTxs.forEach((tx) => {
      const cleanMerchant = tx.merchant.replace(/&mdash;/g, "-").replace(/<[^>]*>?/gm, "");
      const formattedAmt = `${tx.type === "credit" ? "+" : "-"}$${tx.amount.toFixed(2)}`;
      csvContent += `"${cleanMerchant}","${tx.category}","${tx.date}","${tx.status}","${formattedAmt}"
`;
    });
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `Finly_Transactions_${(/* @__PURE__ */ new Date()).toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast("Exported CSV transaction report");
  };
  const filteredTxs = transactions.filter((tx) => {
    const matchStatus = statusFilter === "all" || tx.status.toLowerCase() === statusFilter.toLowerCase();
    const q = txSearch.toLowerCase().trim();
    const matchQuery = !q || `${tx.merchant} ${tx.category} ${tx.date}`.toLowerCase().includes(q);
    return matchStatus && matchQuery;
  });
  const formattedBalance = user && user.isBalanceHidden ? "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022" : "$24,568.32";
  return /* @__PURE__ */ React11.createElement("div", { className: "dashboard-redesign-container", style: { width: "100%", maxWidth: "100%", boxSizing: "border-box", paddingBottom: "40px" } }, /* @__PURE__ */ React11.createElement("div", { className: "dashboard-grid-layout", style: { display: "grid", gridTemplateColumns: "minmax(0, 1fr) 340px", gap: "24px", width: "100%", maxWidth: "100%", boxSizing: "border-box" } }, /* @__PURE__ */ React11.createElement("div", { className: "dashboard-left-col", style: { display: "flex", flexDirection: "column", gap: "24px", minWidth: 0, width: "100%" } }, /* @__PURE__ */ React11.createElement("div", { className: "hero-balance-card", style: { background: "#14171f", borderRadius: "20px", padding: "24px 28px", color: "#fff", boxShadow: "0 10px 30px rgba(0,0,0,0.15)" } }, /* @__PURE__ */ React11.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" } }, /* @__PURE__ */ React11.createElement("span", { style: { fontSize: "0.78rem", color: "#94a3b8", letterSpacing: "0.5px" } }, "Total Balance"), /* @__PURE__ */ React11.createElement("div", { style: { display: "flex", gap: "10px" } }, /* @__PURE__ */ React11.createElement("select", { style: { background: "rgba(255,255,255,0.08)", color: "#cbd5e1", border: "1px solid rgba(255,255,255,0.12)", borderRadius: "8px", padding: "4px 10px", fontSize: "0.75rem", outline: "none" } }, /* @__PURE__ */ React11.createElement("option", null, "USD \u2022 WAM")), /* @__PURE__ */ React11.createElement("select", { style: { background: "rgba(255,255,255,0.08)", color: "#cbd5e1", border: "1px solid rgba(255,255,255,0.12)", borderRadius: "8px", padding: "4px 10px", fontSize: "0.75rem", outline: "none" } }, /* @__PURE__ */ React11.createElement("option", null, "\u2022\u2022\u2022\u2022 2514")))), /* @__PURE__ */ React11.createElement("div", { style: { display: "flex", alignItems: "baseline", gap: "14px", marginBottom: "8px" } }, /* @__PURE__ */ React11.createElement("h2", { style: { fontSize: "2.4rem", fontWeight: 800, margin: 0, letterSpacing: "-0.02em", color: "#ffffff" } }, formattedBalance), /* @__PURE__ */ React11.createElement("button", { onClick: toggleBalancePrivacy, style: { background: "none", border: "none", color: "#94a3b8", cursor: "pointer", fontSize: "1.2rem" } }, /* @__PURE__ */ React11.createElement("i", { className: `ph ${user && user.isBalanceHidden ? "ph-eye-slash" : "ph-eye"}` }))), /* @__PURE__ */ React11.createElement("div", { style: { display: "flex", alignItems: "center", gap: "6px", fontSize: "0.8rem", color: "#94a3b8", marginBottom: "24px" } }, /* @__PURE__ */ React11.createElement("span", { style: { background: "rgba(239, 68, 68, 0.2)", color: "#f87171", padding: "2px 8px", borderRadius: "12px", fontSize: "0.72rem", fontWeight: 600 } }, "\u2197 -12.4%"), /* @__PURE__ */ React11.createElement("span", null, "vs. last month")), /* @__PURE__ */ React11.createElement("div", { style: { display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "12px" } }, /* @__PURE__ */ React11.createElement("button", { onClick: () => setIsSendOpen(true), className: "action-pill-btn" }, /* @__PURE__ */ React11.createElement("i", { className: "ph ph-paper-plane-tilt" }), " Send"), /* @__PURE__ */ React11.createElement("button", { onClick: () => setIsTransferOpen(true), className: "action-pill-btn" }, /* @__PURE__ */ React11.createElement("i", { className: "ph ph-arrows-left-right" }), " Transfer"), /* @__PURE__ */ React11.createElement("button", { onClick: () => setIsTopUpOpen(true), className: "action-pill-btn" }, /* @__PURE__ */ React11.createElement("i", { className: "ph ph-plus" }), " Top up"), /* @__PURE__ */ React11.createElement("button", { onClick: () => setActiveTab("cards"), className: "action-pill-btn" }, /* @__PURE__ */ React11.createElement("i", { className: "ph ph-credit-card" }), " Add card"))), /* @__PURE__ */ React11.createElement("div", { style: { display: "grid", gridTemplateColumns: "repeat(4, minmax(0, 1fr))", gap: "16px", width: "100%" } }, /* @__PURE__ */ React11.createElement("div", { className: "kpi-sparkline-card", style: { background: "var(--bg-card)", border: "1px solid var(--border-color)", borderRadius: "18px", padding: "18px 20px", display: "flex", flexDirection: "column", justifyContent: "space-between", position: "relative", overflow: "hidden", boxShadow: "var(--shadow-sm)" } }, /* @__PURE__ */ React11.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" } }, /* @__PURE__ */ React11.createElement("div", { style: { display: "flex", alignItems: "center", gap: "8px" } }, /* @__PURE__ */ React11.createElement("div", { style: { width: "34px", height: "34px", borderRadius: "10px", background: "rgba(59, 130, 246, 0.12)", color: "#3b82f6", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.05rem" } }, /* @__PURE__ */ React11.createElement("i", { className: "ph ph-wallet" })), /* @__PURE__ */ React11.createElement("span", { style: { fontSize: "0.8rem", color: "var(--text-muted)", fontWeight: 500 } }, "Income")), /* @__PURE__ */ React11.createElement("span", { style: { fontSize: "0.72rem", color: "#10b981", background: "rgba(16, 185, 129, 0.12)", padding: "3px 8px", borderRadius: "12px", fontWeight: 600 } }, "\u2197 +6.2%")), /* @__PURE__ */ React11.createElement("div", { style: { marginBottom: "10px" } }, /* @__PURE__ */ React11.createElement("h3", { style: { fontSize: "1.35rem", fontWeight: 800, margin: 0, color: "var(--text-main)", letterSpacing: "-0.02em" } }, "$8,420.50"), /* @__PURE__ */ React11.createElement("span", { style: { fontSize: "0.7rem", color: "var(--text-muted)" } }, "+$490.00 this week")), /* @__PURE__ */ React11.createElement("div", { style: { height: "28px", width: "100%", marginTop: "auto" } }, /* @__PURE__ */ React11.createElement("svg", { viewBox: "0 0 100 25", preserveAspectRatio: "none", style: { width: "100%", height: "100%", display: "block" } }, /* @__PURE__ */ React11.createElement("defs", null, /* @__PURE__ */ React11.createElement("linearGradient", { id: "incomeGrad", x1: "0", y1: "0", x2: "0", y2: "1" }, /* @__PURE__ */ React11.createElement("stop", { offset: "0%", stopColor: "#3b82f6", stopOpacity: "0.35" }), /* @__PURE__ */ React11.createElement("stop", { offset: "100%", stopColor: "#3b82f6", stopOpacity: "0.0" }))), /* @__PURE__ */ React11.createElement("path", { d: "M0,20 Q25,5 50,14 T100,6 L100,25 L0,25 Z", fill: "url(#incomeGrad)" }), /* @__PURE__ */ React11.createElement("path", { d: "M0,20 Q25,5 50,14 T100,6", fill: "none", stroke: "#3b82f6", strokeWidth: "2.5", strokeLinecap: "round" })))), /* @__PURE__ */ React11.createElement("div", { className: "kpi-sparkline-card", style: { background: "var(--bg-card)", border: "1px solid var(--border-color)", borderRadius: "18px", padding: "18px 20px", display: "flex", flexDirection: "column", justifyContent: "space-between", position: "relative", overflow: "hidden", boxShadow: "var(--shadow-sm)" } }, /* @__PURE__ */ React11.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" } }, /* @__PURE__ */ React11.createElement("div", { style: { display: "flex", alignItems: "center", gap: "8px" } }, /* @__PURE__ */ React11.createElement("div", { style: { width: "34px", height: "34px", borderRadius: "10px", background: "rgba(239, 68, 68, 0.12)", color: "#ef4444", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.05rem" } }, /* @__PURE__ */ React11.createElement("i", { className: "ph ph-arrow-up-right" })), /* @__PURE__ */ React11.createElement("span", { style: { fontSize: "0.8rem", color: "var(--text-muted)", fontWeight: 500 } }, "Expenses")), /* @__PURE__ */ React11.createElement("span", { style: { fontSize: "0.72rem", color: "#10b981", background: "rgba(16, 185, 129, 0.12)", padding: "3px 8px", borderRadius: "12px", fontWeight: 600 } }, "\u2197 +3.1%")), /* @__PURE__ */ React11.createElement("div", { style: { marginBottom: "10px" } }, /* @__PURE__ */ React11.createElement("h3", { style: { fontSize: "1.35rem", fontWeight: 800, margin: 0, color: "var(--text-main)", letterSpacing: "-0.02em" } }, "$1,602.21"), /* @__PURE__ */ React11.createElement("span", { style: { fontSize: "0.7rem", color: "var(--text-muted)" } }, "-$52.10 vs last week")), /* @__PURE__ */ React11.createElement("div", { style: { height: "28px", width: "100%", marginTop: "auto" } }, /* @__PURE__ */ React11.createElement("svg", { viewBox: "0 0 100 25", preserveAspectRatio: "none", style: { width: "100%", height: "100%", display: "block" } }, /* @__PURE__ */ React11.createElement("defs", null, /* @__PURE__ */ React11.createElement("linearGradient", { id: "expensesGrad", x1: "0", y1: "0", x2: "0", y2: "1" }, /* @__PURE__ */ React11.createElement("stop", { offset: "0%", stopColor: "#ef4444", stopOpacity: "0.35" }), /* @__PURE__ */ React11.createElement("stop", { offset: "100%", stopColor: "#ef4444", stopOpacity: "0.0" }))), /* @__PURE__ */ React11.createElement("path", { d: "M0,10 Q30,22 60,8 T100,16 L100,25 L0,25 Z", fill: "url(#expensesGrad)" }), /* @__PURE__ */ React11.createElement("path", { d: "M0,10 Q30,22 60,8 T100,16", fill: "none", stroke: "#ef4444", strokeWidth: "2.5", strokeLinecap: "round" })))), /* @__PURE__ */ React11.createElement("div", { className: "kpi-sparkline-card", style: { background: "var(--bg-card)", border: "1px solid var(--border-color)", borderRadius: "18px", padding: "18px 20px", display: "flex", flexDirection: "column", justifyContent: "space-between", position: "relative", overflow: "hidden", boxShadow: "var(--shadow-sm)" } }, /* @__PURE__ */ React11.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" } }, /* @__PURE__ */ React11.createElement("div", { style: { display: "flex", alignItems: "center", gap: "8px" } }, /* @__PURE__ */ React11.createElement("div", { style: { width: "34px", height: "34px", borderRadius: "10px", background: "rgba(16, 185, 129, 0.12)", color: "#10b981", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.05rem" } }, /* @__PURE__ */ React11.createElement("i", { className: "ph ph-vault" })), /* @__PURE__ */ React11.createElement("span", { style: { fontSize: "0.8rem", color: "var(--text-muted)", fontWeight: 500 } }, "Savings")), /* @__PURE__ */ React11.createElement("span", { style: { fontSize: "0.72rem", color: "#10b981", background: "rgba(16, 185, 129, 0.12)", padding: "3px 8px", borderRadius: "12px", fontWeight: 600 } }, "\u2197 +8.1%")), /* @__PURE__ */ React11.createElement("div", { style: { marginBottom: "10px" } }, /* @__PURE__ */ React11.createElement("h3", { style: { fontSize: "1.35rem", fontWeight: 800, margin: 0, color: "var(--text-main)", letterSpacing: "-0.02em" } }, "$6,818.29"), /* @__PURE__ */ React11.createElement("span", { style: { fontSize: "0.7rem", color: "var(--text-muted)" } }, "+$310.00 saved")), /* @__PURE__ */ React11.createElement("div", { style: { height: "28px", width: "100%", marginTop: "auto" } }, /* @__PURE__ */ React11.createElement("svg", { viewBox: "0 0 100 25", preserveAspectRatio: "none", style: { width: "100%", height: "100%", display: "block" } }, /* @__PURE__ */ React11.createElement("defs", null, /* @__PURE__ */ React11.createElement("linearGradient", { id: "savingsGrad", x1: "0", y1: "0", x2: "0", y2: "1" }, /* @__PURE__ */ React11.createElement("stop", { offset: "0%", stopColor: "#10b981", stopOpacity: "0.35" }), /* @__PURE__ */ React11.createElement("stop", { offset: "100%", stopColor: "#10b981", stopOpacity: "0.0" }))), /* @__PURE__ */ React11.createElement("path", { d: "M0,20 Q25,8 50,15 T100,4 L100,25 L0,25 Z", fill: "url(#savingsGrad)" }), /* @__PURE__ */ React11.createElement("path", { d: "M0,20 Q25,8 50,15 T100,4", fill: "none", stroke: "#10b981", strokeWidth: "2.5", strokeLinecap: "round" })))), /* @__PURE__ */ React11.createElement("div", { className: "kpi-sparkline-card", style: { background: "var(--bg-card)", border: "1px solid var(--border-color)", borderRadius: "18px", padding: "18px 20px", display: "flex", flexDirection: "column", justifyContent: "space-between", position: "relative", overflow: "hidden", boxShadow: "var(--shadow-sm)" } }, /* @__PURE__ */ React11.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" } }, /* @__PURE__ */ React11.createElement("div", { style: { display: "flex", alignItems: "center", gap: "8px" } }, /* @__PURE__ */ React11.createElement("div", { style: { width: "34px", height: "34px", borderRadius: "10px", background: "rgba(139, 92, 246, 0.12)", color: "#8b5cf6", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.05rem" } }, /* @__PURE__ */ React11.createElement("i", { className: "ph ph-chart-line-up" })), /* @__PURE__ */ React11.createElement("span", { style: { fontSize: "0.8rem", color: "var(--text-muted)", fontWeight: 500 } }, "Investments")), /* @__PURE__ */ React11.createElement("span", { style: { fontSize: "0.72rem", color: "#10b981", background: "rgba(16, 185, 129, 0.12)", padding: "3px 8px", borderRadius: "12px", fontWeight: 600 } }, "\u2197 +0.33%")), /* @__PURE__ */ React11.createElement("div", { style: { marginBottom: "10px" } }, /* @__PURE__ */ React11.createElement("h3", { style: { fontSize: "1.35rem", fontWeight: 800, margin: 0, color: "var(--text-main)", letterSpacing: "-0.02em" } }, "$32,780.00"), /* @__PURE__ */ React11.createElement("span", { style: { fontSize: "0.7rem", color: "var(--text-muted)" } }, "+$108.70 today")), /* @__PURE__ */ React11.createElement("div", { style: { height: "28px", width: "100%", marginTop: "auto" } }, /* @__PURE__ */ React11.createElement("svg", { viewBox: "0 0 100 25", preserveAspectRatio: "none", style: { width: "100%", height: "100%", display: "block" } }, /* @__PURE__ */ React11.createElement("defs", null, /* @__PURE__ */ React11.createElement("linearGradient", { id: "investGrad", x1: "0", y1: "0", x2: "0", y2: "1" }, /* @__PURE__ */ React11.createElement("stop", { offset: "0%", stopColor: "#8b5cf6", stopOpacity: "0.35" }), /* @__PURE__ */ React11.createElement("stop", { offset: "100%", stopColor: "#8b5cf6", stopOpacity: "0.0" }))), /* @__PURE__ */ React11.createElement("path", { d: "M0,15 Q30,20 60,8 T100,12 L100,25 L0,25 Z", fill: "url(#investGrad)" }), /* @__PURE__ */ React11.createElement("path", { d: "M0,15 Q30,20 60,8 T100,12", fill: "none", stroke: "#8b5cf6", strokeWidth: "2.5", strokeLinecap: "round" }))))), /* @__PURE__ */ React11.createElement("div", { style: { background: "var(--bg-card)", border: "1px solid var(--border-color)", borderRadius: "20px", padding: "20px 24px", boxShadow: "var(--shadow-sm)" } }, /* @__PURE__ */ React11.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "16px", flexWrap: "wrap", gap: "12px" } }, /* @__PURE__ */ React11.createElement("div", null, /* @__PURE__ */ React11.createElement("h3", { style: { fontSize: "1.05rem", fontWeight: 700, margin: 0, color: "var(--text-main)" } }, "Financial Analytics"), /* @__PURE__ */ React11.createElement("p", { style: { fontSize: "0.78rem", color: "var(--text-muted)", margin: "2px 0 0 0" } }, "Income, expenses, and savings over time")), /* @__PURE__ */ React11.createElement("div", { style: { display: "flex", background: "var(--bg-app)", padding: "3px", borderRadius: "20px", border: "1px solid var(--border-color)" } }, ["Weekly", "Monthly", "Yearly"].map((period) => /* @__PURE__ */ React11.createElement(
    "button",
    {
      key: period,
      onClick: () => setAnalyticsPeriod(period),
      style: { padding: "5px 14px", fontSize: "0.72rem", fontWeight: 600, border: "none", borderRadius: "16px", background: analyticsPeriod === period ? "var(--bg-card)" : "transparent", color: analyticsPeriod === period ? "var(--text-main)" : "var(--text-muted)", cursor: "pointer", boxShadow: analyticsPeriod === period ? "var(--shadow-sm)" : "none" }
    },
    period
  )))), /* @__PURE__ */ React11.createElement("div", { style: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "14px", marginBottom: "20px" } }, /* @__PURE__ */ React11.createElement("div", { style: {
    background: "var(--bg-app)",
    border: "1px solid var(--border-color)",
    borderRadius: "16px",
    padding: "14px 16px",
    display: "flex",
    flexDirection: "column",
    gap: "4px"
  } }, /* @__PURE__ */ React11.createElement("div", { style: { display: "flex", alignItems: "center", gap: "6px" } }, /* @__PURE__ */ React11.createElement("div", { style: { width: "6px", height: "6px", borderRadius: "50%", background: "#3b82f6" } }), /* @__PURE__ */ React11.createElement("span", { style: { fontSize: "0.68rem", color: "var(--text-muted)", fontWeight: 700, letterSpacing: "0.05em" } }, "PEAK INCOME")), /* @__PURE__ */ React11.createElement("strong", { style: { fontSize: "1.05rem", color: "#3b82f6", fontWeight: 800 } }, "$8,420.50 ", /* @__PURE__ */ React11.createElement("span", { style: { fontSize: "0.75rem", fontWeight: 500, color: "var(--text-muted)" } }, "(Jul)"))), /* @__PURE__ */ React11.createElement("div", { style: {
    background: "var(--bg-app)",
    border: "1px solid var(--border-color)",
    borderRadius: "16px",
    padding: "14px 16px",
    display: "flex",
    flexDirection: "column",
    gap: "4px"
  } }, /* @__PURE__ */ React11.createElement("div", { style: { display: "flex", alignItems: "center", gap: "6px" } }, /* @__PURE__ */ React11.createElement("div", { style: { width: "6px", height: "6px", borderRadius: "50%", background: "#ef4444" } }), /* @__PURE__ */ React11.createElement("span", { style: { fontSize: "0.68rem", color: "var(--text-muted)", fontWeight: 700, letterSpacing: "0.05em" } }, "AVG EXPENSES")), /* @__PURE__ */ React11.createElement("strong", { style: { fontSize: "1.05rem", color: "#ef4444", fontWeight: 800 } }, "$1,602.21 ", /* @__PURE__ */ React11.createElement("span", { style: { fontSize: "0.75rem", fontWeight: 500, color: "var(--text-muted)" } }, "(Monthly)"))), /* @__PURE__ */ React11.createElement("div", { style: {
    background: "var(--bg-app)",
    border: "1px solid var(--border-color)",
    borderRadius: "16px",
    padding: "14px 16px",
    display: "flex",
    flexDirection: "column",
    gap: "4px"
  } }, /* @__PURE__ */ React11.createElement("div", { style: { display: "flex", alignItems: "center", gap: "6px" } }, /* @__PURE__ */ React11.createElement("div", { style: { width: "6px", height: "6px", borderRadius: "50%", background: "#10b981" } }), /* @__PURE__ */ React11.createElement("span", { style: { fontSize: "0.68rem", color: "var(--text-muted)", fontWeight: 700, letterSpacing: "0.05em" } }, "NET SAVINGS")), /* @__PURE__ */ React11.createElement("strong", { style: { fontSize: "1.05rem", color: "#10b981", fontWeight: 800 } }, "+$6,818.29 ", /* @__PURE__ */ React11.createElement("span", { style: { fontSize: "0.75rem", fontWeight: 600, color: "#10b981" } }, "(+12.4%)")))), /* @__PURE__ */ React11.createElement("div", { style: { display: "flex", gap: "20px", marginBottom: "14px", fontSize: "0.78rem" } }, /* @__PURE__ */ React11.createElement("div", { style: { display: "flex", alignItems: "center", gap: "6px" } }, /* @__PURE__ */ React11.createElement("span", { style: { width: "10px", height: "10px", borderRadius: "50%", background: "#3b82f6" } }), /* @__PURE__ */ React11.createElement("span", { style: { color: "var(--text-main)", fontWeight: 600 } }, "Income")), /* @__PURE__ */ React11.createElement("div", { style: { display: "flex", alignItems: "center", gap: "6px" } }, /* @__PURE__ */ React11.createElement("span", { style: { width: "10px", height: "10px", borderRadius: "50%", background: "#ef4444" } }), /* @__PURE__ */ React11.createElement("span", { style: { color: "var(--text-main)", fontWeight: 600 } }, "Expenses")), /* @__PURE__ */ React11.createElement("div", { style: { display: "flex", alignItems: "center", gap: "6px" } }, /* @__PURE__ */ React11.createElement("span", { style: { width: "10px", height: "10px", borderRadius: "50%", background: "#10b981" } }), /* @__PURE__ */ React11.createElement("span", { style: { color: "var(--text-main)", fontWeight: 600 } }, "Savings"))), /* @__PURE__ */ React11.createElement("div", { style: { width: "100%", height: "220px", position: "relative", display: "flex", gap: "12px" } }, /* @__PURE__ */ React11.createElement("div", { style: { display: "flex", flexDirection: "column", justifyContent: "space-between", fontSize: "0.68rem", color: "var(--text-muted)", paddingBottom: "20px", fontWeight: 500, textAlign: "right", minWidth: "38px" } }, /* @__PURE__ */ React11.createElement("span", null, "$10.0k"), /* @__PURE__ */ React11.createElement("span", null, "$7.5k"), /* @__PURE__ */ React11.createElement("span", null, "$5.0k"), /* @__PURE__ */ React11.createElement("span", null, "$2.5k"), /* @__PURE__ */ React11.createElement("span", null, "$0.0k")), /* @__PURE__ */ React11.createElement("div", { style: { flex: 1, position: "relative", height: "100%" } }, /* @__PURE__ */ React11.createElement("svg", { viewBox: "0 0 700 200", preserveAspectRatio: "none", style: { width: "100%", height: "170px", overflow: "visible" } }, /* @__PURE__ */ React11.createElement("defs", null, /* @__PURE__ */ React11.createElement("linearGradient", { id: "chartIncomeGrad", x1: "0", y1: "0", x2: "0", y2: "1" }, /* @__PURE__ */ React11.createElement("stop", { offset: "0%", stopColor: "#3b82f6", stopOpacity: "0.4" }), /* @__PURE__ */ React11.createElement("stop", { offset: "100%", stopColor: "#3b82f6", stopOpacity: "0.02" })), /* @__PURE__ */ React11.createElement("linearGradient", { id: "chartSavingsGrad", x1: "0", y1: "0", x2: "0", y2: "1" }, /* @__PURE__ */ React11.createElement("stop", { offset: "0%", stopColor: "#10b981", stopOpacity: "0.3" }), /* @__PURE__ */ React11.createElement("stop", { offset: "100%", stopColor: "#10b981", stopOpacity: "0.02" })), /* @__PURE__ */ React11.createElement("linearGradient", { id: "chartExpensesGrad", x1: "0", y1: "0", x2: "0", y2: "1" }, /* @__PURE__ */ React11.createElement("stop", { offset: "0%", stopColor: "#ef4444", stopOpacity: "0.25" }), /* @__PURE__ */ React11.createElement("stop", { offset: "100%", stopColor: "#ef4444", stopOpacity: "0.02" }))), /* @__PURE__ */ React11.createElement("line", { x1: "0", y1: "10", x2: "700", y2: "10", stroke: "var(--border-color)", strokeDasharray: "4 4", opacity: "0.6" }), /* @__PURE__ */ React11.createElement("line", { x1: "0", y1: "50", x2: "700", y2: "50", stroke: "var(--border-color)", strokeDasharray: "4 4", opacity: "0.6" }), /* @__PURE__ */ React11.createElement("line", { x1: "0", y1: "90", x2: "700", y2: "90", stroke: "var(--border-color)", strokeDasharray: "4 4", opacity: "0.6" }), /* @__PURE__ */ React11.createElement("line", { x1: "0", y1: "130", x2: "700", y2: "130", stroke: "var(--border-color)", strokeDasharray: "4 4", opacity: "0.6" }), /* @__PURE__ */ React11.createElement("line", { x1: "0", y1: "170", x2: "700", y2: "170", stroke: "var(--border-color)", opacity: "0.8" }), /* @__PURE__ */ React11.createElement("line", { x1: "385", y1: "10", x2: "385", y2: "170", stroke: "#3b82f6", strokeDasharray: "3 3", strokeWidth: "1.5", opacity: "0.8" }), /* @__PURE__ */ React11.createElement("path", { d: "M0,110 C80,70 160,85 240,65 C320,45 385,25 450,35 C520,45 610,30 700,38 L700,170 L0,170 Z", fill: "url(#chartIncomeGrad)" }), /* @__PURE__ */ React11.createElement("path", { d: "M0,110 C80,70 160,85 240,65 C320,45 385,25 450,35 C520,45 610,30 700,38", fill: "none", stroke: "#3b82f6", strokeWidth: "3", strokeLinecap: "round" }), /* @__PURE__ */ React11.createElement("path", { d: "M0,135 C80,110 160,120 240,105 C320,90 385,75 450,85 C520,80 610,70 700,75 L700,170 L0,170 Z", fill: "url(#chartSavingsGrad)" }), /* @__PURE__ */ React11.createElement("path", { d: "M0,135 C80,110 160,120 240,105 C320,90 385,75 450,85 C520,80 610,70 700,75", fill: "none", stroke: "#10b981", strokeWidth: "2.5", strokeLinecap: "round" }), /* @__PURE__ */ React11.createElement("path", { d: "M0,155 C80,140 160,145 240,138 C320,130 385,120 450,128 C520,122 610,115 700,118 L700,170 L0,170 Z", fill: "url(#chartExpensesGrad)" }), /* @__PURE__ */ React11.createElement("path", { d: "M0,155 C80,140 160,145 240,138 C320,130 385,120 450,128 C520,122 610,115 700,118", fill: "none", stroke: "#ef4444", strokeWidth: "2", strokeLinecap: "round" }), /* @__PURE__ */ React11.createElement("circle", { cx: "385", cy: "25", r: "6", fill: "#3b82f6", stroke: "#ffffff", strokeWidth: "2.5", style: { filter: "drop-shadow(0 0 6px rgba(59, 130, 246, 0.8))" } })), /* @__PURE__ */ React11.createElement("div", { style: { position: "absolute", top: "-12px", left: "55%", transform: "translateX(-50%)", background: "#14171f", color: "#fff", padding: "6px 12px", borderRadius: "10px", fontSize: "0.72rem", boxShadow: "0 4px 14px rgba(0,0,0,0.25)", border: "1px solid rgba(255,255,255,0.15)", pointerEvents: "none", zIndex: 10 } }, /* @__PURE__ */ React11.createElement("div", { style: { fontWeight: 700, color: "#60a5fa", marginBottom: "2px" } }, "Jul 2026 Peak"), /* @__PURE__ */ React11.createElement("div", null, "Income: ", /* @__PURE__ */ React11.createElement("strong", null, "$8,420.50")), /* @__PURE__ */ React11.createElement("div", null, "Savings: ", /* @__PURE__ */ React11.createElement("strong", null, "$6,818.29"))), /* @__PURE__ */ React11.createElement("div", { style: { display: "flex", justifyContent: "space-between", fontSize: "0.7rem", color: "var(--text-muted)", marginTop: "8px", fontWeight: 500 } }, /* @__PURE__ */ React11.createElement("span", null, "Jan"), /* @__PURE__ */ React11.createElement("span", null, "Feb"), /* @__PURE__ */ React11.createElement("span", null, "Mar"), /* @__PURE__ */ React11.createElement("span", null, "Apr"), /* @__PURE__ */ React11.createElement("span", null, "May"), /* @__PURE__ */ React11.createElement("span", null, "Jun"), /* @__PURE__ */ React11.createElement("span", { style: { color: "var(--accent-blue)", fontWeight: 700 } }, "Jul"), /* @__PURE__ */ React11.createElement("span", null, "Aug"), /* @__PURE__ */ React11.createElement("span", null, "Sep"), /* @__PURE__ */ React11.createElement("span", null, "Oct"), /* @__PURE__ */ React11.createElement("span", null, "Nov"), /* @__PURE__ */ React11.createElement("span", null, "Dec"))))), /* @__PURE__ */ React11.createElement("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" } }, /* @__PURE__ */ React11.createElement("div", { style: { background: "var(--bg-card)", border: "1px solid var(--border-color)", borderRadius: "20px", padding: "20px" } }, /* @__PURE__ */ React11.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" } }, /* @__PURE__ */ React11.createElement("div", null, /* @__PURE__ */ React11.createElement("h4", { style: { margin: 0, fontSize: "0.98rem", fontWeight: 700, color: "var(--text-main)" } }, "Spending"), /* @__PURE__ */ React11.createElement("span", { style: { fontSize: "0.75rem", color: "var(--text-muted)" } }, "By category, this month")), /* @__PURE__ */ React11.createElement("button", { onClick: () => setActiveTab("analytics"), style: { background: "none", border: "none", color: "var(--accent-blue)", fontSize: "0.75rem", fontWeight: 600, cursor: "pointer" } }, "View all")), /* @__PURE__ */ React11.createElement("div", { style: { display: "flex", justifyContent: "center", alignItems: "center", margin: "16px 0", position: "relative" } }, /* @__PURE__ */ React11.createElement("svg", { width: "140", height: "140", viewBox: "0 0 140 140" }, /* @__PURE__ */ React11.createElement("circle", { cx: "70", cy: "70", r: "54", fill: "none", stroke: "#3b82f6", strokeWidth: "16", strokeDasharray: "180 160", strokeDashoffset: "0" }), /* @__PURE__ */ React11.createElement("circle", { cx: "70", cy: "70", r: "54", fill: "none", stroke: "#ef4444", strokeWidth: "16", strokeDasharray: "70 270", strokeDashoffset: "-180" }), /* @__PURE__ */ React11.createElement("circle", { cx: "70", cy: "70", r: "54", fill: "none", stroke: "#10b981", strokeWidth: "16", strokeDasharray: "50 290", strokeDashoffset: "-250" }), /* @__PURE__ */ React11.createElement("circle", { cx: "70", cy: "70", r: "54", fill: "none", stroke: "#f59e0b", strokeWidth: "16", strokeDasharray: "30 310", strokeDashoffset: "-300" })), /* @__PURE__ */ React11.createElement("div", { style: { position: "absolute", textAlign: "center" } }, /* @__PURE__ */ React11.createElement("span", { style: { fontSize: "0.68rem", color: "var(--text-muted)", display: "block" } }, "Total"), /* @__PURE__ */ React11.createElement("strong", { style: { fontSize: "1.05rem", color: "var(--text-main)", fontWeight: 800 } }, "$1,602.21"))), /* @__PURE__ */ React11.createElement("div", { style: { display: "flex", flexDirection: "column", gap: "8px", fontSize: "0.78rem" } }, /* @__PURE__ */ React11.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center" } }, /* @__PURE__ */ React11.createElement("span", { style: { display: "flex", alignItems: "center", gap: "8px", color: "var(--text-main)" } }, /* @__PURE__ */ React11.createElement("span", { style: { width: "8px", height: "8px", borderRadius: "50%", background: "#8b5cf6" } }), " Shopping"), /* @__PURE__ */ React11.createElement("strong", { style: { color: "var(--text-main)" } }, "$1,250.00")), /* @__PURE__ */ React11.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center" } }, /* @__PURE__ */ React11.createElement("span", { style: { display: "flex", alignItems: "center", gap: "8px", color: "var(--text-main)" } }, /* @__PURE__ */ React11.createElement("span", { style: { width: "8px", height: "8px", borderRadius: "50%", background: "#3b82f6" } }), " Bills"), /* @__PURE__ */ React11.createElement("strong", { style: { color: "var(--text-main)" } }, "$142.00")), /* @__PURE__ */ React11.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center" } }, /* @__PURE__ */ React11.createElement("span", { style: { display: "flex", alignItems: "center", gap: "8px", color: "var(--text-main)" } }, /* @__PURE__ */ React11.createElement("span", { style: { width: "8px", height: "8px", borderRadius: "50%", background: "#10b981" } }), " Food"), /* @__PURE__ */ React11.createElement("strong", { style: { color: "var(--text-main)" } }, "$84.32")), /* @__PURE__ */ React11.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center" } }, /* @__PURE__ */ React11.createElement("span", { style: { display: "flex", alignItems: "center", gap: "8px", color: "var(--text-main)" } }, /* @__PURE__ */ React11.createElement("span", { style: { width: "8px", height: "8px", borderRadius: "50%", background: "#ef4444" } }), " Healthcare"), /* @__PURE__ */ React11.createElement("strong", { style: { color: "var(--text-main)" } }, "$38.50")), /* @__PURE__ */ React11.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center" } }, /* @__PURE__ */ React11.createElement("span", { style: { display: "flex", alignItems: "center", gap: "8px", color: "var(--text-main)" } }, /* @__PURE__ */ React11.createElement("span", { style: { width: "8px", height: "8px", borderRadius: "50%", background: "#f59e0b" } }), " Transportation"), /* @__PURE__ */ React11.createElement("strong", { style: { color: "var(--text-main)" } }, "$22.40")))), /* @__PURE__ */ React11.createElement("div", { style: { background: "var(--bg-card)", border: "1px solid var(--border-color)", borderRadius: "20px", padding: "20px" } }, /* @__PURE__ */ React11.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" } }, /* @__PURE__ */ React11.createElement("div", null, /* @__PURE__ */ React11.createElement("h4", { style: { margin: 0, fontSize: "0.98rem", fontWeight: 700, color: "var(--text-main)" } }, "Budget progress"), /* @__PURE__ */ React11.createElement("span", { style: { fontSize: "0.75rem", color: "var(--text-muted)" } }, "This month")), /* @__PURE__ */ React11.createElement("button", { onClick: () => setActiveTab("budgets"), style: { background: "none", border: "none", color: "var(--accent-blue)", fontSize: "0.75rem", fontWeight: 600, cursor: "pointer" } }, "Manage")), /* @__PURE__ */ React11.createElement("div", { style: { display: "flex", flexDirection: "column", gap: "14px" } }, /* @__PURE__ */ React11.createElement("div", null, /* @__PURE__ */ React11.createElement("div", { style: { display: "flex", justifyContent: "space-between", fontSize: "0.78rem", marginBottom: "4px" } }, /* @__PURE__ */ React11.createElement("span", { style: { fontWeight: 600, color: "var(--text-main)" } }, "Food"), /* @__PURE__ */ React11.createElement("span", { style: { color: "var(--text-muted)" } }, "$780.00 / $800.00")), /* @__PURE__ */ React11.createElement("div", { style: { height: "6px", background: "var(--bg-app)", borderRadius: "3px", overflow: "hidden" } }, /* @__PURE__ */ React11.createElement("div", { style: { width: "97.5%", height: "100%", background: "#3b82f6" } }))), /* @__PURE__ */ React11.createElement("div", null, /* @__PURE__ */ React11.createElement("div", { style: { display: "flex", justifyContent: "space-between", fontSize: "0.78rem", marginBottom: "4px" } }, /* @__PURE__ */ React11.createElement("span", { style: { fontWeight: 600, color: "var(--text-main)" } }, "Shopping"), /* @__PURE__ */ React11.createElement("span", { style: { color: "var(--text-muted)" } }, "$1,400.00 / $1,200.00")), /* @__PURE__ */ React11.createElement("div", { style: { height: "6px", background: "var(--bg-app)", borderRadius: "3px", overflow: "hidden", marginBottom: "4px" } }, /* @__PURE__ */ React11.createElement("div", { style: { width: "100%", height: "100%", background: "#ef4444" } })), /* @__PURE__ */ React11.createElement("span", { style: { fontSize: "0.68rem", color: "#ef4444", fontWeight: 600 } }, "Over by $200.00")), /* @__PURE__ */ React11.createElement("div", null, /* @__PURE__ */ React11.createElement("div", { style: { display: "flex", justifyContent: "space-between", fontSize: "0.78rem", marginBottom: "4px" } }, /* @__PURE__ */ React11.createElement("span", { style: { fontWeight: 600, color: "var(--text-main)" } }, "Entertainment"), /* @__PURE__ */ React11.createElement("span", { style: { color: "var(--text-muted)" } }, "$435.00 / $500.00")), /* @__PURE__ */ React11.createElement("div", { style: { height: "6px", background: "var(--bg-app)", borderRadius: "3px", overflow: "hidden" } }, /* @__PURE__ */ React11.createElement("div", { style: { width: "87%", height: "100%", background: "#3b82f6" } }))), /* @__PURE__ */ React11.createElement("div", null, /* @__PURE__ */ React11.createElement("div", { style: { display: "flex", justifyContent: "space-between", fontSize: "0.78rem", marginBottom: "4px" } }, /* @__PURE__ */ React11.createElement("span", { style: { fontWeight: 600, color: "var(--text-main)" } }, "Travel"), /* @__PURE__ */ React11.createElement("span", { style: { color: "var(--text-muted)" } }, "$320.00 / $800.00")), /* @__PURE__ */ React11.createElement("div", { style: { height: "6px", background: "var(--bg-app)", borderRadius: "3px", overflow: "hidden" } }, /* @__PURE__ */ React11.createElement("div", { style: { width: "40%", height: "100%", background: "#3b82f6" } }))), /* @__PURE__ */ React11.createElement("div", null, /* @__PURE__ */ React11.createElement("div", { style: { display: "flex", justifyContent: "space-between", fontSize: "0.78rem", marginBottom: "4px" } }, /* @__PURE__ */ React11.createElement("span", { style: { fontWeight: 600, color: "var(--text-main)" } }, "Bills"), /* @__PURE__ */ React11.createElement("span", { style: { color: "var(--text-muted)" } }, "$952.00 / $900.00")), /* @__PURE__ */ React11.createElement("div", { style: { height: "6px", background: "var(--bg-app)", borderRadius: "3px", overflow: "hidden" } }, /* @__PURE__ */ React11.createElement("div", { style: { width: "100%", height: "100%", background: "#3b82f6" } })))))), /* @__PURE__ */ React11.createElement("div", { style: { background: "var(--bg-card)", border: "1px solid var(--border-color)", borderRadius: "20px", padding: "20px 24px" } }, /* @__PURE__ */ React11.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px", flexWrap: "wrap", gap: "12px" } }, /* @__PURE__ */ React11.createElement("div", null, /* @__PURE__ */ React11.createElement("h3", { style: { margin: 0, fontSize: "1.05rem", fontWeight: 700, color: "var(--text-main)" } }, "Recent transactions"), /* @__PURE__ */ React11.createElement("span", { style: { fontSize: "0.78rem", color: "var(--text-muted)" } }, filteredTxs.length, " results")), /* @__PURE__ */ React11.createElement("div", { style: { display: "flex", alignItems: "center", gap: "12px", flexWrap: "wrap" } }, /* @__PURE__ */ React11.createElement("div", { className: "search-box", style: { width: "200px", position: "relative" } }, /* @__PURE__ */ React11.createElement("i", { className: "ph ph-magnifying-glass", style: { position: "absolute", left: "10px", top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)" } }), /* @__PURE__ */ React11.createElement(
    "input",
    {
      type: "text",
      placeholder: "Search...",
      value: txSearch,
      onChange: (e) => setTxSearch(e.target.value),
      style: { width: "100%", padding: "6px 12px 6px 32px", borderRadius: "16px", border: "1px solid var(--border-color)", background: "var(--bg-app)", fontSize: "0.78rem", outline: "none", color: "var(--text-main)" }
    }
  )), /* @__PURE__ */ React11.createElement("div", { style: { display: "flex", gap: "4px", background: "var(--bg-app)", padding: "2px", borderRadius: "16px", border: "1px solid var(--border-color)" } }, ["all", "completed", "pending", "failed"].map((st) => /* @__PURE__ */ React11.createElement(
    "button",
    {
      key: st,
      onClick: () => setStatusFilter(st),
      style: { padding: "4px 10px", fontSize: "0.72rem", fontWeight: 600, border: "none", borderRadius: "14px", background: statusFilter === st ? "var(--bg-card)" : "transparent", color: statusFilter === st ? "var(--text-main)" : "var(--text-muted)", cursor: "pointer", textTransform: "capitalize" }
    },
    st
  ))), /* @__PURE__ */ React11.createElement("select", { style: { background: "var(--bg-app)", border: "1px solid var(--border-color)", color: "var(--text-main)", borderRadius: "14px", padding: "4px 10px", fontSize: "0.75rem", outline: "none" } }, /* @__PURE__ */ React11.createElement("option", null, "Recent \u25BE")), /* @__PURE__ */ React11.createElement("button", { onClick: exportCSV, style: { background: "var(--bg-app)", border: "1px solid var(--border-color)", color: "var(--text-main)", borderRadius: "14px", padding: "4px 12px", fontSize: "0.75rem", fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", gap: "6px" } }, /* @__PURE__ */ React11.createElement("i", { className: "ph ph-download-simple" }), " CSV"))), /* @__PURE__ */ React11.createElement("div", { className: "table-responsive-wrapper", style: { overflowX: "auto" } }, /* @__PURE__ */ React11.createElement("table", { style: { width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: "0.82rem" } }, /* @__PURE__ */ React11.createElement("thead", null, /* @__PURE__ */ React11.createElement("tr", { style: { borderBottom: "1px solid var(--border-color)", color: "var(--text-muted)", textTransform: "uppercase", fontSize: "0.68rem", letterSpacing: "0.5px" } }, /* @__PURE__ */ React11.createElement("th", { style: { padding: "10px 12px" } }, "MERCHANT"), /* @__PURE__ */ React11.createElement("th", { style: { padding: "10px 12px" } }, "CATEGORY"), /* @__PURE__ */ React11.createElement("th", { style: { padding: "10px 12px" } }, "DATE"), /* @__PURE__ */ React11.createElement("th", { style: { padding: "10px 12px" } }, "STATUS"), /* @__PURE__ */ React11.createElement("th", { style: { padding: "10px 12px", textAlign: "right" } }, "AMOUNT"), /* @__PURE__ */ React11.createElement("th", { style: { padding: "10px 12px", width: "40px" } }))), /* @__PURE__ */ React11.createElement("tbody", null, filteredTxs.map((tx) => /* @__PURE__ */ React11.createElement("tr", { key: tx.id, style: { borderBottom: "1px solid var(--border-color)" } }, /* @__PURE__ */ React11.createElement("td", { style: { padding: "12px" } }, /* @__PURE__ */ React11.createElement("div", { style: { display: "flex", alignItems: "center", gap: "10px", fontWeight: 600, color: "var(--text-main)" } }, /* @__PURE__ */ React11.createElement("div", { style: { width: "28px", height: "28px", borderRadius: "50%", background: "var(--bg-app)", border: "1px solid var(--border-color)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.9rem" } }, /* @__PURE__ */ React11.createElement("i", { className: `ph ${tx.icon}` })), /* @__PURE__ */ React11.createElement("span", { dangerouslySetInnerHTML: { __html: tx.merchant } }))), /* @__PURE__ */ React11.createElement("td", { style: { padding: "12px", color: "var(--text-muted)" } }, tx.category), /* @__PURE__ */ React11.createElement("td", { style: { padding: "12px", color: "var(--text-muted)" } }, tx.date), /* @__PURE__ */ React11.createElement("td", { style: { padding: "12px" } }, /* @__PURE__ */ React11.createElement("span", { style: { padding: "3px 10px", borderRadius: "12px", fontSize: "0.7rem", fontWeight: 600, background: tx.status === "Completed" ? "rgba(16, 185, 129, 0.12)" : tx.status === "Pending" ? "rgba(245, 158, 11, 0.12)" : "rgba(239, 68, 68, 0.12)", color: tx.status === "Completed" ? "#10b981" : tx.status === "Pending" ? "#f59e0b" : "#ef4444" } }, tx.status)), /* @__PURE__ */ React11.createElement("td", { style: { padding: "12px", textAlign: "right", fontWeight: 700, color: tx.type === "credit" ? "#10b981" : "var(--text-main)" } }, tx.type === "credit" ? "+" : "-", "$", Math.abs(tx.amount).toLocaleString("en-US", { minimumFractionDigits: 2 })), /* @__PURE__ */ React11.createElement("td", { style: { padding: "12px", textAlign: "center", color: "var(--text-muted)", cursor: "pointer" } }, /* @__PURE__ */ React11.createElement("i", { className: "ph ph-dots-three" }))))))))), /* @__PURE__ */ React11.createElement("div", { className: "dashboard-right-col", style: { display: "flex", flexDirection: "column", gap: "24px" } }, /* @__PURE__ */ React11.createElement("div", { style: { background: "var(--bg-card)", border: "1px solid var(--border-color)", borderRadius: "20px", padding: "20px" } }, /* @__PURE__ */ React11.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" } }, /* @__PURE__ */ React11.createElement("h3", { style: { margin: 0, fontSize: "0.98rem", fontWeight: 700, color: "var(--text-main)" } }, "My cards"), /* @__PURE__ */ React11.createElement("button", { onClick: () => setActiveTab("cards"), style: { padding: "5px 12px", fontSize: "0.72rem", fontWeight: 600, borderRadius: "16px", background: "var(--accent-blue)", color: "#fff", border: "none", cursor: "pointer" } }, "+ Add card")), /* @__PURE__ */ React11.createElement("div", { style: { display: "flex", flexDirection: "column", gap: "14px" } }, cards.map((card) => /* @__PURE__ */ React11.createElement("div", { key: card.id, style: { background: card.bg, borderRadius: "16px", padding: "16px 20px", color: "#fff", boxShadow: "0 4px 16px rgba(0,0,0,0.1)" } }, /* @__PURE__ */ React11.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" } }, /* @__PURE__ */ React11.createElement("div", null, /* @__PURE__ */ React11.createElement("span", { style: { fontSize: "0.62rem", letterSpacing: "1px", opacity: 0.7 } }, "BALANCE"), /* @__PURE__ */ React11.createElement("div", { style: { fontSize: "1.25rem", fontWeight: 800 } }, "$", card.balance.toLocaleString("en-US", { minimumFractionDigits: 2 }))), /* @__PURE__ */ React11.createElement("i", { className: "ph ph-wifi-high", style: { fontSize: "1.1rem", opacity: 0.8 } })), /* @__PURE__ */ React11.createElement("div", { style: { fontSize: "0.95rem", letterSpacing: "2px", fontFamily: "monospace", marginBottom: "14px", opacity: 0.9 } }, card.number), /* @__PURE__ */ React11.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "flex-end", fontSize: "0.7rem" } }, /* @__PURE__ */ React11.createElement("div", null, /* @__PURE__ */ React11.createElement("span", { style: { opacity: 0.7, display: "block", fontSize: "0.58rem" } }, "CARDHOLDER"), /* @__PURE__ */ React11.createElement("strong", { style: { fontWeight: 600 } }, card.holder)), /* @__PURE__ */ React11.createElement("div", null, /* @__PURE__ */ React11.createElement("span", { style: { opacity: 0.7, display: "block", fontSize: "0.58rem" } }, "EXPIRES"), /* @__PURE__ */ React11.createElement("strong", { style: { fontWeight: 600 } }, card.expires)), /* @__PURE__ */ React11.createElement("strong", { style: { fontStyle: "italic", fontWeight: 800 } }, card.brand.toUpperCase())))))), /* @__PURE__ */ React11.createElement("div", { style: { background: "var(--bg-card)", border: "1px solid var(--border-color)", borderRadius: "20px", padding: "20px" } }, /* @__PURE__ */ React11.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "14px" } }, /* @__PURE__ */ React11.createElement("h3", { style: { margin: 0, fontSize: "0.98rem", fontWeight: 700, color: "var(--text-main)" } }, "Quick transfer"), /* @__PURE__ */ React11.createElement("button", { style: { background: "none", border: "none", color: "var(--accent-blue)", fontSize: "0.75rem", fontWeight: 600, cursor: "pointer" } }, "See all")), /* @__PURE__ */ React11.createElement("div", { style: { display: "flex", gap: "8px", marginBottom: "16px" } }, recipients.map((r) => /* @__PURE__ */ React11.createElement(
    "div",
    {
      key: r.name,
      onClick: () => setQuickRecipient(r.name),
      style: { width: "36px", height: "36px", borderRadius: "50%", background: r.bg, color: "#fff", fontWeight: 700, fontSize: "0.85rem", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", border: quickRecipient === r.name ? "2px solid var(--text-main)" : "none", opacity: quickRecipient === r.name ? 1 : 0.8 },
      title: r.name
    },
    r.avatar
  )), /* @__PURE__ */ React11.createElement("div", { style: { width: "36px", height: "36px", borderRadius: "50%", border: "1px dashed var(--border-color)", color: "var(--text-muted)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", fontSize: "1rem" } }, "+")), /* @__PURE__ */ React11.createElement("form", { onSubmit: handleQuickTransfer, style: { display: "flex", flexDirection: "column", gap: "12px" } }, /* @__PURE__ */ React11.createElement("div", null, /* @__PURE__ */ React11.createElement("label", { style: { fontSize: "0.72rem", color: "var(--text-muted)", display: "block", marginBottom: "4px" } }, "NOTE (OPTIONAL)"), /* @__PURE__ */ React11.createElement(
    "input",
    {
      type: "text",
      placeholder: "Dinner split",
      value: quickNote,
      onChange: (e) => setQuickNote(e.target.value),
      style: { width: "100%", padding: "8px 12px", borderRadius: "10px", border: "1px solid var(--border-color)", background: "var(--bg-app)", fontSize: "0.8rem", color: "var(--text-main)", outline: "none" }
    }
  )), /* @__PURE__ */ React11.createElement("div", null, /* @__PURE__ */ React11.createElement("label", { style: { fontSize: "0.72rem", color: "var(--text-muted)", display: "block", marginBottom: "4px" } }, "AMOUNT"), /* @__PURE__ */ React11.createElement(
    "input",
    {
      type: "number",
      step: "0.01",
      placeholder: "$ 0.00",
      value: quickAmount,
      onChange: (e) => setQuickAmount(e.target.value),
      style: { width: "100%", padding: "8px 12px", borderRadius: "10px", border: "1px solid var(--border-color)", background: "var(--bg-app)", fontSize: "0.8rem", color: "var(--text-main)", outline: "none" }
    }
  )), /* @__PURE__ */ React11.createElement("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px", marginTop: "4px" } }, /* @__PURE__ */ React11.createElement(
    "button",
    {
      type: "button",
      onClick: () => showToast(`Saved draft transfer for ${quickRecipient}`),
      style: { padding: "8px", fontSize: "0.78rem", borderRadius: "16px", border: "1px solid var(--border-color)", background: "var(--bg-app)", color: "var(--text-main)", fontWeight: 600, cursor: "pointer" }
    },
    "Save as draft"
  ), /* @__PURE__ */ React11.createElement(
    "button",
    {
      type: "submit",
      style: { padding: "8px", fontSize: "0.78rem", borderRadius: "16px", border: "none", background: "var(--accent-blue)", color: "#fff", fontWeight: 600, cursor: "pointer" }
    },
    "Send money"
  )))), /* @__PURE__ */ React11.createElement("div", { style: { background: "var(--bg-card)", border: "1px solid var(--border-color)", borderRadius: "20px", padding: "20px" } }, /* @__PURE__ */ React11.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" } }, /* @__PURE__ */ React11.createElement("h3", { style: { margin: 0, fontSize: "0.98rem", fontWeight: 700, color: "var(--text-main)" } }, "Investments"), /* @__PURE__ */ React11.createElement("span", { style: { fontSize: "0.72rem", color: "#10b981", background: "rgba(16, 185, 129, 0.12)", padding: "2px 8px", borderRadius: "12px", fontWeight: 600 } }, "+0.33% today")), /* @__PURE__ */ React11.createElement("div", { style: { marginBottom: "14px" } }, /* @__PURE__ */ React11.createElement("span", { style: { fontSize: "0.68rem", color: "var(--text-muted)", display: "block" } }, "Total portfolio value"), /* @__PURE__ */ React11.createElement("h3", { style: { fontSize: "1.4rem", fontWeight: 800, margin: "2px 0 0 0", color: "var(--text-main)" } }, "$32,780.00"), /* @__PURE__ */ React11.createElement("span", { style: { fontSize: "0.72rem", color: "#10b981" } }, "+$108.70 today")), /* @__PURE__ */ React11.createElement("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px", marginBottom: "14px" } }, /* @__PURE__ */ React11.createElement(
    "button",
    {
      onClick: () => setInvestTab("buy"),
      style: { padding: "6px", fontSize: "0.78rem", fontWeight: 600, borderRadius: "8px", border: "none", background: investTab === "buy" ? "var(--accent-blue)" : "var(--bg-app)", color: investTab === "buy" ? "#fff" : "var(--text-muted)", cursor: "pointer" }
    },
    "Buy"
  ), /* @__PURE__ */ React11.createElement(
    "button",
    {
      onClick: () => setInvestTab("sell"),
      style: { padding: "6px", fontSize: "0.78rem", fontWeight: 600, borderRadius: "8px", border: "1px solid var(--border-color)", background: investTab === "sell" ? "var(--bg-card)" : "transparent", color: investTab === "sell" ? "var(--text-main)" : "var(--text-muted)", cursor: "pointer" }
    },
    "Sell"
  )), /* @__PURE__ */ React11.createElement("div", { style: { height: "8px", borderRadius: "4px", overflow: "hidden", display: "flex", marginBottom: "10px" } }, /* @__PURE__ */ React11.createElement("div", { style: { width: "38%", background: "#f97316" } }), /* @__PURE__ */ React11.createElement("div", { style: { width: "26%", background: "#a855f7" } }), /* @__PURE__ */ React11.createElement("div", { style: { width: "20%", background: "#06b6d4" } }), /* @__PURE__ */ React11.createElement("div", { style: { width: "16%", background: "#3b82f6" } })), /* @__PURE__ */ React11.createElement("div", { style: { display: "flex", justifyContent: "space-between", fontSize: "0.68rem", color: "var(--text-muted)", marginBottom: "16px" } }, /* @__PURE__ */ React11.createElement("span", null, /* @__PURE__ */ React11.createElement("span", { style: { color: "#f97316" } }, "\u25CF"), " AAPL 38%"), /* @__PURE__ */ React11.createElement("span", null, /* @__PURE__ */ React11.createElement("span", { style: { color: "#a855f7" } }, "\u25CF"), " MSFT 26%"), /* @__PURE__ */ React11.createElement("span", null, /* @__PURE__ */ React11.createElement("span", { style: { color: "#06b6d4" } }, "\u25CF"), " BTC 20%"), /* @__PURE__ */ React11.createElement("span", null, /* @__PURE__ */ React11.createElement("span", { style: { color: "#3b82f6" } }, "\u25CF"), " VOO 16%")), /* @__PURE__ */ React11.createElement("div", { style: { display: "flex", flexDirection: "column", gap: "10px", fontSize: "0.78rem" } }, investments.map((inv) => /* @__PURE__ */ React11.createElement("div", { key: inv.id, style: { display: "flex", justifyContent: "space-between", alignItems: "center" } }, /* @__PURE__ */ React11.createElement("div", null, /* @__PURE__ */ React11.createElement("strong", { style: { display: "block", color: "var(--text-main)" } }, inv.symbol), /* @__PURE__ */ React11.createElement("span", { style: { fontSize: "0.7rem", color: "var(--text-muted)" } }, inv.name)), /* @__PURE__ */ React11.createElement("div", { style: { textAlign: "right" } }, /* @__PURE__ */ React11.createElement("strong", { style: { display: "block", color: "var(--text-main)" } }, "$", inv.value.toLocaleString("en-US", { minimumFractionDigits: 2 })), /* @__PURE__ */ React11.createElement("span", { style: { fontSize: "0.7rem", color: inv.isPositive ? "#10b981" : "#ef4444", fontWeight: 600 } }, inv.returnPct)))))))), /* @__PURE__ */ React11.createElement(SendModal, { isOpen: isSendOpen, onClose: () => setIsSendOpen(false) }), /* @__PURE__ */ React11.createElement(TransferModal, { isOpen: isTransferOpen, onClose: () => setIsTransferOpen(false) }), /* @__PURE__ */ React11.createElement(TopUpModal, { isOpen: isTopUpOpen, onClose: () => setIsTopUpOpen(false) }));
};

// src/features/transactions/TransactionsPage.jsx
import React12, { useState as useState10 } from "react";
var TransactionsPage = ({ searchQuery }) => {
  const { transactions, addTransaction, showToast } = useDb();
  const [activeStatusFilter, setActiveStatusFilter] = useState10("all");
  const [localSearch, setLocalSearch] = useState10("");
  const [visibleLimit, setVisibleLimit] = useState10(8);
  const [isTopUpOpen, setIsTopUpOpen] = useState10(false);
  const [isSendOpen, setIsSendOpen] = useState10(false);
  const [topUpAmount, setTopUpAmount] = useState10("500");
  const [sendRecipient, setSendRecipient] = useState10("");
  const [sendAmount, setSendAmount] = useState10("");
  const query = (localSearch || searchQuery || "").toLowerCase().trim();
  const fullTxList = [
    { id: 1, merchant: "Sell AAPL", category: "Investments", date: "Aug 6, 2026", status: "Completed", amount: 500, type: "credit", icon: "ph-trend-up" },
    { id: 2, merchant: "Sell AAPL", category: "Investments", date: "Aug 6, 2026", status: "Completed", amount: 300, type: "credit", icon: "ph-trend-up" },
    { id: 3, merchant: "iCloud+ 2TB", category: "Bills", date: "Aug 6, 2026", status: "Completed", amount: -9.99, type: "debit", icon: "ph-cloud" },
    { id: 4, merchant: "Spotify Family", category: "Bills", date: "Aug 6, 2026", status: "Completed", amount: -16.99, type: "debit", icon: "ph-music-notes" },
    { id: 5, merchant: "Con Edison", category: "Bills", date: "Aug 6, 2026", status: "Completed", amount: -142, type: "debit", icon: "ph-lightning" },
    { id: 6, merchant: "Verizon Fios", category: "Bills", date: "Aug 6, 2026", status: "Completed", amount: -79.99, type: "debit", icon: "ph-wifi-high" },
    { id: 7, merchant: "Rent &mdash; 88 Sullivan St.", category: "Bills", date: "Aug 6, 2026", status: "Completed", amount: -2400, type: "debit", icon: "ph-house" },
    { id: 8, merchant: "Savings &mdash; Singapore 2025", category: "Savings", date: "Aug 6, 2026", status: "Completed", amount: -1e3, type: "debit", icon: "ph-vault" },
    { id: 9, merchant: "Salary &mdash; Acme Inc", category: "Income", date: "Aug 1, 2026", status: "Completed", amount: 4200, type: "credit", icon: "ph-briefcase" },
    { id: 10, merchant: "Whole Foods Market", category: "Shopping", date: "Jul 31, 2026", status: "Completed", amount: -142.5, type: "debit", icon: "ph-shopping-cart" },
    { id: 11, merchant: "Apple Store", category: "Shopping", date: "Jul 30, 2026", status: "Completed", amount: -1250, type: "debit", icon: "ph-desktop" },
    { id: 12, merchant: "Netflix Subscription", category: "Entertainment", date: "Jul 29, 2026", status: "Pending", amount: -19.99, type: "debit", icon: "ph-film-strip" },
    { id: 13, merchant: "Uber Ride", category: "Transport", date: "Jul 28, 2026", status: "Completed", amount: -24.5, type: "debit", icon: "ph-car" },
    { id: 14, merchant: "Starbucks Coffee", category: "Food", date: "Jul 27, 2026", status: "Completed", amount: -6.75, type: "debit", icon: "ph-coffee" },
    { id: 15, merchant: "Gym Membership", category: "Health", date: "Jul 25, 2026", status: "Failed", amount: -45, type: "debit", icon: "ph-barbell" },
    { id: 16, merchant: "Freelance Design Payout", category: "Income", date: "Jul 24, 2026", status: "Completed", amount: 1220.5, type: "credit", icon: "ph-paint-brush" }
  ];
  const sourceData = transactions.length > 8 ? transactions : fullTxList;
  const filteredTransactions = sourceData.filter((tx) => {
    const statusMatch = activeStatusFilter === "all" || tx.status.toLowerCase() === activeStatusFilter.toLowerCase();
    const textContent = `${tx.merchant} ${tx.category} ${tx.date} ${tx.status}`.toLowerCase();
    const searchMatch = !query || textContent.includes(query);
    return statusMatch && searchMatch;
  });
  const displayedTxs = filteredTransactions.slice(0, visibleLimit);
  const remainingCount = filteredTransactions.length - visibleLimit;
  const exportCSV = () => {
    let csvContent = "Merchant,Category,Date,Status,Amount\n";
    filteredTransactions.forEach((tx) => {
      const cleanMerchant = tx.merchant.replace(/&mdash;/g, "-").replace(/<[^>]*>?/gm, "");
      const formattedAmt = `${tx.type === "credit" ? "+" : "-"}$${Math.abs(tx.amount).toFixed(2)}`;
      csvContent += `"${cleanMerchant}","${tx.category}","${tx.date}","${tx.status}","${formattedAmt}"
`;
    });
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `Finly_Transactions_${(/* @__PURE__ */ new Date()).toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast("Exported CSV transaction report");
  };
  const handleTopUp = (e) => {
    e.preventDefault();
    const amt = parseFloat(topUpAmount);
    if (isNaN(amt) || amt <= 0) return;
    addTransaction({ merchant: "Top Up &mdash; Deposit", category: "Income", amount: amt, isPositive: true });
    setIsTopUpOpen(false);
    showToast(`Deposited +$${amt.toLocaleString("en-US", { minimumFractionDigits: 2 })}`);
  };
  const handleSend = (e) => {
    e.preventDefault();
    const amt = parseFloat(sendAmount);
    if (isNaN(amt) || amt <= 0 || !sendRecipient) return;
    addTransaction({ merchant: sendRecipient, category: "Transfer", amount: amt, isPositive: false });
    setIsSendOpen(false);
    setSendRecipient("");
    setSendAmount("");
    showToast(`Paid $${amt.toLocaleString("en-US", { minimumFractionDigits: 2 })} to ${sendRecipient}`);
  };
  return /* @__PURE__ */ React12.createElement("div", { className: "transactions-redesign-container", style: { paddingBottom: "40px" } }, /* @__PURE__ */ React12.createElement("div", { style: { display: "grid", gridTemplateColumns: "repeat(4, minmax(0, 1fr))", gap: "16px", marginBottom: "24px", width: "100%" } }, /* @__PURE__ */ React12.createElement("div", { style: { background: "var(--bg-card)", border: "1px solid var(--border-color)", borderRadius: "18px", padding: "18px 20px", boxShadow: "var(--shadow-sm)" } }, /* @__PURE__ */ React12.createElement("div", { style: { display: "flex", alignItems: "center", gap: "8px", marginBottom: "12px" } }, /* @__PURE__ */ React12.createElement("div", { style: { width: "28px", height: "28px", borderRadius: "50%", background: "rgba(16, 185, 129, 0.12)", color: "#10b981", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.85rem" } }, /* @__PURE__ */ React12.createElement("i", { className: "ph ph-arrow-down-left" })), /* @__PURE__ */ React12.createElement("span", { style: { fontSize: "0.78rem", color: "var(--text-muted)", fontWeight: 500 } }, "Money in")), /* @__PURE__ */ React12.createElement("h2", { style: { fontSize: "1.5rem", fontWeight: 800, margin: 0, color: "var(--text-main)", letterSpacing: "-0.02em" } }, "$9,220.50")), /* @__PURE__ */ React12.createElement("div", { style: { background: "var(--bg-card)", border: "1px solid var(--border-color)", borderRadius: "18px", padding: "18px 20px", boxShadow: "var(--shadow-sm)" } }, /* @__PURE__ */ React12.createElement("div", { style: { display: "flex", alignItems: "center", gap: "8px", marginBottom: "12px" } }, /* @__PURE__ */ React12.createElement("div", { style: { width: "28px", height: "28px", borderRadius: "50%", background: "rgba(239, 68, 68, 0.12)", color: "#ef4444", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.85rem" } }, /* @__PURE__ */ React12.createElement("i", { className: "ph ph-arrow-up-right" })), /* @__PURE__ */ React12.createElement("span", { style: { fontSize: "0.78rem", color: "var(--text-muted)", fontWeight: 500 } }, "Money out")), /* @__PURE__ */ React12.createElement("h2", { style: { fontSize: "1.5rem", fontWeight: 800, margin: 0, color: "var(--text-main)", letterSpacing: "-0.02em" } }, "$5,251.18")), /* @__PURE__ */ React12.createElement("div", { style: { background: "var(--bg-card)", border: "1px solid var(--border-color)", borderRadius: "18px", padding: "18px 20px", boxShadow: "var(--shadow-sm)" } }, /* @__PURE__ */ React12.createElement("div", { style: { display: "flex", alignItems: "center", gap: "8px", marginBottom: "12px" } }, /* @__PURE__ */ React12.createElement("div", { style: { width: "28px", height: "28px", borderRadius: "50%", background: "rgba(245, 158, 11, 0.12)", color: "#f59e0b", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.85rem" } }, /* @__PURE__ */ React12.createElement("i", { className: "ph ph-clock" })), /* @__PURE__ */ React12.createElement("span", { style: { fontSize: "0.78rem", color: "var(--text-muted)", fontWeight: 500 } }, "Pending")), /* @__PURE__ */ React12.createElement("h2", { style: { fontSize: "1.5rem", fontWeight: 800, margin: 0, color: "var(--text-main)", letterSpacing: "-0.02em" } }, "1 tx")), /* @__PURE__ */ React12.createElement("div", { style: { background: "var(--bg-card)", border: "1px solid var(--border-color)", borderRadius: "18px", padding: "18px 20px", boxShadow: "var(--shadow-sm)" } }, /* @__PURE__ */ React12.createElement("div", { style: { display: "flex", alignItems: "center", gap: "8px", marginBottom: "12px" } }, /* @__PURE__ */ React12.createElement("div", { style: { width: "28px", height: "28px", borderRadius: "50%", background: "rgba(239, 68, 68, 0.12)", color: "#ef4444", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.85rem" } }, /* @__PURE__ */ React12.createElement("i", { className: "ph ph-x-circle" })), /* @__PURE__ */ React12.createElement("span", { style: { fontSize: "0.78rem", color: "var(--text-muted)", fontWeight: 500 } }, "Failed")), /* @__PURE__ */ React12.createElement("h2", { style: { fontSize: "1.5rem", fontWeight: 800, margin: 0, color: "var(--text-main)", letterSpacing: "-0.02em" } }, "1 tx"))), /* @__PURE__ */ React12.createElement("div", { style: { background: "var(--bg-card)", border: "1px solid var(--border-color)", borderRadius: "20px", padding: "24px", boxShadow: "var(--shadow-sm)" } }, /* @__PURE__ */ React12.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px", flexWrap: "wrap", gap: "14px" } }, /* @__PURE__ */ React12.createElement("div", null, /* @__PURE__ */ React12.createElement("h3", { style: { margin: 0, fontSize: "1.1rem", fontWeight: 700, color: "var(--text-main)" } }, "Recent transactions"), /* @__PURE__ */ React12.createElement("span", { style: { fontSize: "0.78rem", color: "var(--text-muted)" } }, filteredTransactions.length, " results")), /* @__PURE__ */ React12.createElement("div", { style: { display: "flex", alignItems: "center", gap: "12px", flexWrap: "wrap" } }, /* @__PURE__ */ React12.createElement("div", { className: "search-box", style: { width: "180px", position: "relative" } }, /* @__PURE__ */ React12.createElement("i", { className: "ph ph-magnifying-glass", style: { position: "absolute", left: "10px", top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)" } }), /* @__PURE__ */ React12.createElement(
    "input",
    {
      type: "text",
      placeholder: "Search...",
      value: localSearch,
      onChange: (e) => setLocalSearch(e.target.value),
      style: { width: "100%", padding: "6px 12px 6px 32px", borderRadius: "16px", border: "1px solid var(--border-color)", background: "var(--bg-app)", fontSize: "0.78rem", outline: "none", color: "var(--text-main)" }
    }
  )), /* @__PURE__ */ React12.createElement("div", { style: { display: "flex", gap: "4px", background: "var(--bg-app)", padding: "2px", borderRadius: "16px", border: "1px solid var(--border-color)" } }, ["all", "completed", "pending", "failed"].map((st) => /* @__PURE__ */ React12.createElement(
    "button",
    {
      key: st,
      onClick: () => setActiveStatusFilter(st),
      style: { padding: "4px 12px", fontSize: "0.72rem", fontWeight: 600, border: "none", borderRadius: "14px", background: activeStatusFilter === st ? "var(--bg-card)" : "transparent", color: activeStatusFilter === st ? "var(--text-main)" : "var(--text-muted)", cursor: "pointer", textTransform: "capitalize", boxShadow: activeStatusFilter === st ? "var(--shadow-sm)" : "none" }
    },
    st === "all" ? "All" : st
  ))), /* @__PURE__ */ React12.createElement("select", { style: { background: "var(--bg-app)", border: "1px solid var(--border-color)", color: "var(--text-main)", borderRadius: "14px", padding: "4px 10px", fontSize: "0.75rem", outline: "none" } }, /* @__PURE__ */ React12.createElement("option", null, "Recent \u25BE")), /* @__PURE__ */ React12.createElement("button", { onClick: exportCSV, style: { background: "var(--bg-app)", border: "1px solid var(--border-color)", color: "var(--text-main)", borderRadius: "14px", padding: "4px 14px", fontSize: "0.75rem", fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", gap: "6px" } }, /* @__PURE__ */ React12.createElement("i", { className: "ph ph-download-simple" }), " CSV"))), /* @__PURE__ */ React12.createElement("div", { className: "table-responsive-wrapper", style: { overflowX: "auto" } }, /* @__PURE__ */ React12.createElement("table", { style: { width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: "0.84rem" } }, /* @__PURE__ */ React12.createElement("thead", null, /* @__PURE__ */ React12.createElement("tr", { style: { borderBottom: "1px solid var(--border-color)", color: "var(--text-muted)", textTransform: "uppercase", fontSize: "0.68rem", letterSpacing: "0.5px" } }, /* @__PURE__ */ React12.createElement("th", { style: { padding: "12px 14px" } }, "MERCHANT"), /* @__PURE__ */ React12.createElement("th", { style: { padding: "12px 14px" } }, "CATEGORY"), /* @__PURE__ */ React12.createElement("th", { style: { padding: "12px 14px" } }, "DATE"), /* @__PURE__ */ React12.createElement("th", { style: { padding: "12px 14px" } }, "STATUS"), /* @__PURE__ */ React12.createElement("th", { style: { padding: "12px 14px", textAlign: "right" } }, "AMOUNT"), /* @__PURE__ */ React12.createElement("th", { style: { padding: "12px 14px", width: "40px" } }))), /* @__PURE__ */ React12.createElement("tbody", null, displayedTxs.map((tx) => /* @__PURE__ */ React12.createElement("tr", { key: tx.id, style: { borderBottom: "1px solid var(--border-color)" } }, /* @__PURE__ */ React12.createElement("td", { style: { padding: "14px" } }, /* @__PURE__ */ React12.createElement("div", { style: { display: "flex", alignItems: "center", gap: "12px", fontWeight: 600, color: "var(--text-main)" } }, /* @__PURE__ */ React12.createElement("div", { style: { width: "32px", height: "32px", borderRadius: "50%", background: "var(--bg-app)", border: "1px solid var(--border-color)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.95rem" } }, /* @__PURE__ */ React12.createElement("i", { className: `ph ${tx.icon || "ph-receipt"}` })), /* @__PURE__ */ React12.createElement("span", { dangerouslySetInnerHTML: { __html: tx.merchant } }))), /* @__PURE__ */ React12.createElement("td", { style: { padding: "14px", color: "var(--text-muted)" } }, tx.category), /* @__PURE__ */ React12.createElement("td", { style: { padding: "14px", color: "var(--text-muted)" } }, tx.date), /* @__PURE__ */ React12.createElement("td", { style: { padding: "14px" } }, /* @__PURE__ */ React12.createElement("span", { style: { padding: "4px 12px", borderRadius: "12px", fontSize: "0.7rem", fontWeight: 600, background: tx.status === "Completed" ? "rgba(16, 185, 129, 0.12)" : tx.status === "Pending" ? "rgba(245, 158, 11, 0.12)" : "rgba(239, 68, 68, 0.12)", color: tx.status === "Completed" ? "#10b981" : tx.status === "Pending" ? "#f59e0b" : "#ef4444" } }, tx.status)), /* @__PURE__ */ React12.createElement("td", { style: { padding: "14px", textAlign: "right", fontWeight: 700, color: tx.type === "credit" || tx.amount > 0 ? "#10b981" : "var(--text-main)" } }, tx.type === "credit" || tx.amount > 0 ? "+" : "-", "$", Math.abs(tx.amount).toLocaleString("en-US", { minimumFractionDigits: 2 })), /* @__PURE__ */ React12.createElement("td", { style: { padding: "14px", textAlign: "center", color: "var(--text-muted)", cursor: "pointer" } }, /* @__PURE__ */ React12.createElement("i", { className: "ph ph-dots-three" }))))))), filteredTransactions.length > 8 && /* @__PURE__ */ React12.createElement("div", { style: { textAlign: "center", marginTop: "20px" } }, /* @__PURE__ */ React12.createElement(
    "button",
    {
      onClick: () => setVisibleLimit(visibleLimit > 8 ? 8 : filteredTransactions.length),
      style: { width: "100%", padding: "10px", fontSize: "0.8rem", fontWeight: 600, borderRadius: "24px", border: "1px solid var(--border-color)", background: "var(--bg-app)", color: "var(--text-main)", cursor: "pointer" }
    },
    visibleLimit > 8 ? "Show less" : `Show more (${remainingCount} left)`
  ))), /* @__PURE__ */ React12.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "36px", paddingTop: "16px", borderTop: "1px solid var(--border-color)", fontSize: "0.72rem", color: "var(--text-muted)", flexWrap: "wrap", gap: "12px" } }, /* @__PURE__ */ React12.createElement("span", null, "\xA9 2026 Finly. Mock data \u2014 for demo purposes only."), /* @__PURE__ */ React12.createElement("span", null, "Designed with the calm of SF Pro and one Action Blue.")), /* @__PURE__ */ React12.createElement(TopUpModal, { isOpen: isTopUpOpen, onClose: () => setIsTopUpOpen(false) }), /* @__PURE__ */ React12.createElement(SendModal, { isOpen: isSendOpen, onClose: () => setIsSendOpen(false) }));
};

// src/features/analytics/AnalyticsPage.jsx
import React13, { useState as useState11, useMemo } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line
} from "recharts";
var sparklineDataIncome = Array.from({ length: 10 }, () => ({ value: Math.random() * 100 + 500 }));
var sparklineDataExpenses = Array.from({ length: 10 }, () => ({ value: Math.random() * 50 + 200 }));
var sparklineDataSavings = Array.from({ length: 10 }, () => ({ value: Math.random() * 100 + 300 }));
var sparklineDataNetWorth = Array.from({ length: 10 }, () => ({ value: Math.random() * 200 + 2e3 }));
var areaChartData = [
  { name: "Jan", income: 4e3, expenses: 2400, savings: 1600 },
  { name: "Feb", income: 4500, expenses: 2100, savings: 2400 },
  { name: "Mar", income: 4800, expenses: 2800, savings: 2e3 },
  { name: "Apr", income: 4600, expenses: 2600, savings: 2e3 },
  { name: "May", income: 5200, expenses: 2e3, savings: 3200 },
  { name: "Jun", income: 5400, expenses: 2300, savings: 3100 },
  { name: "Jul", income: 6e3, expenses: 2100, savings: 3900 },
  { name: "Aug", income: 5800, expenses: 2400, savings: 3400 },
  { name: "Sep", income: 6200, expenses: 2600, savings: 3600 },
  { name: "Oct", income: 7e3, expenses: 2800, savings: 4200 },
  { name: "Nov", income: 7200, expenses: 3100, savings: 4100 },
  { name: "Dec", income: 7500, expenses: 3500, savings: 4e3 }
];
var spendingData = [
  { name: "Bills", value: 2790.97, color: "#14b8a6" },
  { name: "Shopping", value: 1299, color: "#8b5cf6" },
  { name: "Savings", value: 1e3, color: "#94a3b8" },
  { name: "Food", value: 84.32, color: "#f59e0b" },
  { name: "Healthcare", value: 38.5, color: "#06b6d4" }
];
var highlights = [
  { id: 1, text: /* @__PURE__ */ React13.createElement(React13.Fragment, null, "Savings rate is ", /* @__PURE__ */ React13.createElement("strong", null, "43%"), " across the transactions in your ledger."), color: "#10b981" },
  { id: 2, text: /* @__PURE__ */ React13.createElement(React13.Fragment, null, /* @__PURE__ */ React13.createElement("strong", null, "Rent \u2014 88 Sullivan St."), " is your biggest merchant at ", /* @__PURE__ */ React13.createElement("strong", null, "$2,400.00"), "."), color: "#3b82f6" },
  { id: 3, text: /* @__PURE__ */ React13.createElement(React13.Fragment, null, "Investments moved ", /* @__PURE__ */ React13.createElement("strong", null, "+0.31%"), " today across 4 holdings."), color: "#10b981" },
  { id: 4, text: /* @__PURE__ */ React13.createElement(React13.Fragment, null, "1 payment failed \u2014 retry from ", /* @__PURE__ */ React13.createElement("a", { href: "#", style: { color: "var(--accent-blue)" } }, "Transactions"), "."), color: "#ef4444" }
];
var topMerchants = [
  { name: "Rent \u2014 88 Sullivan St.", category: "Bills", amount: 2400, percent: 46 },
  { name: "Apple Store", category: "Shopping", amount: 1299, percent: 25 },
  { name: "Savings \u2014 Singapore 2025", category: "Savings", amount: 1e3, percent: 19 },
  { name: "Con Edison", category: "Bills", amount: 284, percent: 5 },
  { name: "Whole Foods", category: "Food", amount: 84.32, percent: 2 },
  { name: "Verizon Fios", category: "Bills", amount: 79.99, percent: 2 }
];
var categoryLeaders = [
  { name: "Bills", amount: 2790.97, percent: 53, color: "#14b8a6" },
  { name: "Shopping", amount: 1299, percent: 25, color: "#8b5cf6" },
  { name: "Savings", amount: 1e3, percent: 19, color: "#94a3b8" },
  { name: "Food", amount: 84.32, percent: 2, color: "#f59e0b" },
  { name: "Healthcare", amount: 38.5, percent: 1, color: "#06b6d4" },
  { name: "Transportation", amount: 22.4, percent: 0, color: "#3b82f6" },
  { name: "Entertainment", amount: 15.99, percent: 0, color: "#ec4899" }
];
var formatCurrency = (val) => {
  return "$" + val.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
};
var Sparkline = ({ data, color }) => /* @__PURE__ */ React13.createElement("div", { style: { height: "40px", width: "100%", marginTop: "16px" } }, /* @__PURE__ */ React13.createElement(ResponsiveContainer, { width: "100%", height: "100%" }, /* @__PURE__ */ React13.createElement(LineChart, { data }, /* @__PURE__ */ React13.createElement(Line, { type: "monotone", dataKey: "value", stroke: color, strokeWidth: 2, dot: false, isAnimationActive: false }))));
var KPICard = ({ title, value, trend, isUp, color, sparklineData }) => /* @__PURE__ */ React13.createElement("div", { className: "card", style: { padding: "20px" } }, /* @__PURE__ */ React13.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "8px" } }, /* @__PURE__ */ React13.createElement("div", { style: { display: "flex", alignItems: "center", gap: "8px" } }, /* @__PURE__ */ React13.createElement("div", { style: { width: "12px", height: "12px", borderRadius: "50%", background: color, opacity: 0.2, display: "flex", alignItems: "center", justifyContent: "center" } }, /* @__PURE__ */ React13.createElement("div", { style: { width: "6px", height: "6px", borderRadius: "50%", background: color } }))), /* @__PURE__ */ React13.createElement("div", { style: { color: isUp ? "#10b981" : "#ef4444", fontSize: "0.85rem", fontWeight: 600, display: "flex", alignItems: "center", gap: "4px" } }, /* @__PURE__ */ React13.createElement("i", { className: isUp ? "ph ph-trend-up" : "ph ph-trend-down" }), " ", trend)), /* @__PURE__ */ React13.createElement("div", { style: { color: "var(--text-muted)", fontSize: "0.9rem", marginBottom: "4px" } }, title), /* @__PURE__ */ React13.createElement("div", { style: { fontSize: "1.75rem", fontWeight: 700, color: "var(--text-main)", letterSpacing: "-0.02em" } }, value), /* @__PURE__ */ React13.createElement(Sparkline, { data: sparklineData, color }));
var AnalyticsPage = () => {
  const { showToast } = useDb();
  const [timeRange, setTimeRange] = useState11("Monthly");
  const ranges = ["Weekly", "Monthly", "Yearly"];
  return /* @__PURE__ */ React13.createElement("div", { style: { display: "flex", flexDirection: "column", gap: "24px", paddingBottom: "40px" } }, /* @__PURE__ */ React13.createElement("div", null, /* @__PURE__ */ React13.createElement("h2", { style: { fontSize: "1.5rem", fontWeight: 700, marginBottom: "4px" } }, "Analytics"), /* @__PURE__ */ React13.createElement("p", { style: { color: "var(--text-muted)", fontSize: "0.9rem" } }, "Trends across income, expenses, and savings.")), /* @__PURE__ */ React13.createElement("div", { style: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "20px" } }, /* @__PURE__ */ React13.createElement(KPICard, { title: "Income", value: "$9,220.50", trend: "8.2%", isUp: true, color: "#3b82f6", sparklineData: sparklineDataIncome }), /* @__PURE__ */ React13.createElement(KPICard, { title: "Expenses", value: "$5,251.18", trend: "3.1%", isUp: false, color: "#ef4444", sparklineData: sparklineDataExpenses }), /* @__PURE__ */ React13.createElement(KPICard, { title: "Savings", value: "$3,969.32", trend: "43%", isUp: true, color: "#10b981", sparklineData: sparklineDataSavings }), /* @__PURE__ */ React13.createElement(KPICard, { title: "Net worth", value: "$21,719.35", trend: "2.4%", isUp: true, color: "#8b5cf6", sparklineData: sparklineDataNetWorth })), /* @__PURE__ */ React13.createElement("div", { className: "card", style: { padding: "24px" } }, /* @__PURE__ */ React13.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "24px", flexWrap: "wrap", gap: "16px" } }, /* @__PURE__ */ React13.createElement("div", null, /* @__PURE__ */ React13.createElement("h3", { style: { fontSize: "1.1rem", fontWeight: 600, marginBottom: "4px" } }, "Financial Analytics"), /* @__PURE__ */ React13.createElement("p", { style: { color: "var(--text-muted)", fontSize: "0.85rem" } }, "Income, expenses, and savings over time")), /* @__PURE__ */ React13.createElement("div", { style: { display: "flex", gap: "4px", background: "var(--hover-bg)", padding: "4px", borderRadius: "12px", border: "1px solid var(--border-color)" } }, ranges.map((r) => /* @__PURE__ */ React13.createElement(
    "button",
    {
      key: r,
      onClick: () => setTimeRange(r),
      style: {
        padding: "6px 14px",
        borderRadius: "8px",
        border: "none",
        background: timeRange === r ? "var(--bg-card)" : "transparent",
        color: timeRange === r ? "var(--text-main)" : "var(--text-muted)",
        fontWeight: timeRange === r ? 600 : 500,
        fontSize: "0.85rem",
        boxShadow: timeRange === r ? "0 1px 3px rgba(0,0,0,0.1)" : "none",
        cursor: "pointer",
        transition: "all 0.2s"
      }
    },
    r
  )))), /* @__PURE__ */ React13.createElement("div", { style: { display: "flex", gap: "16px", marginBottom: "24px" } }, /* @__PURE__ */ React13.createElement("div", { style: { display: "flex", alignItems: "center", gap: "6px", fontSize: "0.85rem", color: "var(--text-main)", background: "var(--hover-bg)", padding: "4px 10px", borderRadius: "99px" } }, /* @__PURE__ */ React13.createElement("div", { style: { width: 8, height: 8, borderRadius: "50%", background: "#3b82f6" } }), " Income"), /* @__PURE__ */ React13.createElement("div", { style: { display: "flex", alignItems: "center", gap: "6px", fontSize: "0.85rem", color: "var(--text-main)", background: "var(--hover-bg)", padding: "4px 10px", borderRadius: "99px" } }, /* @__PURE__ */ React13.createElement("div", { style: { width: 8, height: 8, borderRadius: "50%", background: "#ef4444" } }), " Expenses"), /* @__PURE__ */ React13.createElement("div", { style: { display: "flex", alignItems: "center", gap: "6px", fontSize: "0.85rem", color: "var(--text-main)", background: "var(--hover-bg)", padding: "4px 10px", borderRadius: "99px" } }, /* @__PURE__ */ React13.createElement("div", { style: { width: 8, height: 8, borderRadius: "50%", background: "#10b981" } }), " Savings")), /* @__PURE__ */ React13.createElement("div", { style: { height: "350px", width: "100%" } }, /* @__PURE__ */ React13.createElement(ResponsiveContainer, { width: "100%", height: "100%" }, /* @__PURE__ */ React13.createElement(AreaChart, { data: areaChartData, margin: { top: 10, right: 0, left: -20, bottom: 0 } }, /* @__PURE__ */ React13.createElement("defs", null, /* @__PURE__ */ React13.createElement("linearGradient", { id: "colorIncome", x1: "0", y1: "0", x2: "0", y2: "1" }, /* @__PURE__ */ React13.createElement("stop", { offset: "5%", stopColor: "#3b82f6", stopOpacity: 0.3 }), /* @__PURE__ */ React13.createElement("stop", { offset: "95%", stopColor: "#3b82f6", stopOpacity: 0 })), /* @__PURE__ */ React13.createElement("linearGradient", { id: "colorExpenses", x1: "0", y1: "0", x2: "0", y2: "1" }, /* @__PURE__ */ React13.createElement("stop", { offset: "5%", stopColor: "#ef4444", stopOpacity: 0.3 }), /* @__PURE__ */ React13.createElement("stop", { offset: "95%", stopColor: "#ef4444", stopOpacity: 0 })), /* @__PURE__ */ React13.createElement("linearGradient", { id: "colorSavings", x1: "0", y1: "0", x2: "0", y2: "1" }, /* @__PURE__ */ React13.createElement("stop", { offset: "5%", stopColor: "#10b981", stopOpacity: 0.3 }), /* @__PURE__ */ React13.createElement("stop", { offset: "95%", stopColor: "#10b981", stopOpacity: 0 }))), /* @__PURE__ */ React13.createElement(CartesianGrid, { strokeDasharray: "3 3", vertical: false, stroke: "var(--border-color)" }), /* @__PURE__ */ React13.createElement(XAxis, { dataKey: "name", axisLine: false, tickLine: false, tick: { fontSize: 12, fill: "var(--text-muted)" }, dy: 10 }), /* @__PURE__ */ React13.createElement(YAxis, { axisLine: false, tickLine: false, tick: { fontSize: 12, fill: "var(--text-muted)" }, tickFormatter: (val) => val === 0 ? "$0" : `$${val / 1e3}K` }), /* @__PURE__ */ React13.createElement(
    RechartsTooltip,
    {
      contentStyle: { borderRadius: "12px", border: "none", boxShadow: "var(--shadow-md)", background: "var(--bg-card)" },
      itemStyle: { fontSize: "0.9rem", fontWeight: 500 },
      labelStyle: { color: "var(--text-muted)", marginBottom: "4px" }
    }
  ), /* @__PURE__ */ React13.createElement(Area, { type: "monotone", dataKey: "income", stroke: "#3b82f6", strokeWidth: 2, fillOpacity: 1, fill: "url(#colorIncome)" }), /* @__PURE__ */ React13.createElement(Area, { type: "monotone", dataKey: "savings", stroke: "#10b981", strokeWidth: 2, fillOpacity: 1, fill: "url(#colorSavings)" }), /* @__PURE__ */ React13.createElement(Area, { type: "monotone", dataKey: "expenses", stroke: "#ef4444", strokeWidth: 2, fillOpacity: 1, fill: "url(#colorExpenses)" }))))), /* @__PURE__ */ React13.createElement("div", { style: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))", gap: "24px" } }, /* @__PURE__ */ React13.createElement("div", { className: "card", style: { padding: "24px", display: "flex", flexDirection: "column" } }, /* @__PURE__ */ React13.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" } }, /* @__PURE__ */ React13.createElement("h3", { style: { fontSize: "1.1rem", fontWeight: 600 } }, "Spending"), /* @__PURE__ */ React13.createElement("a", { href: "#", style: { fontSize: "0.85rem", fontWeight: 500 } }, "View all")), /* @__PURE__ */ React13.createElement("p", { style: { color: "var(--text-muted)", fontSize: "0.85rem", marginBottom: "24px" } }, "By category, this month"), /* @__PURE__ */ React13.createElement("div", { style: { position: "relative", height: "240px", display: "flex", justifyContent: "center", alignItems: "center", marginBottom: "24px" } }, /* @__PURE__ */ React13.createElement(ResponsiveContainer, { width: "100%", height: "100%" }, /* @__PURE__ */ React13.createElement(PieChart, null, /* @__PURE__ */ React13.createElement(
    Pie,
    {
      data: spendingData,
      cx: "50%",
      cy: "50%",
      innerRadius: 70,
      outerRadius: 100,
      paddingAngle: 2,
      dataKey: "value",
      stroke: "none"
    },
    spendingData.map((entry, index) => /* @__PURE__ */ React13.createElement(Cell, { key: `cell-${index}`, fill: entry.color }))
  ))), /* @__PURE__ */ React13.createElement("div", { style: { position: "absolute", textAlign: "center" } }, /* @__PURE__ */ React13.createElement("div", { style: { fontSize: "0.85rem", color: "var(--text-muted)" } }, "Total"), /* @__PURE__ */ React13.createElement("div", { style: { fontSize: "1.25rem", fontWeight: 700, color: "var(--text-main)" } }, "$5,251.18"))), /* @__PURE__ */ React13.createElement("div", { style: { display: "flex", flexDirection: "column", gap: "12px", flex: 1, justifyContent: "flex-end" } }, spendingData.map((item) => /* @__PURE__ */ React13.createElement("div", { key: item.name, style: { display: "flex", justifyContent: "space-between", alignItems: "center" } }, /* @__PURE__ */ React13.createElement("div", { style: { display: "flex", alignItems: "center", gap: "8px", fontSize: "0.9rem", color: "var(--text-main)" } }, /* @__PURE__ */ React13.createElement("div", { style: { width: "8px", height: "8px", borderRadius: "50%", background: item.color } }), item.name), /* @__PURE__ */ React13.createElement("div", { style: { fontSize: "0.9rem", fontWeight: 500 } }, formatCurrency(item.value)))))), /* @__PURE__ */ React13.createElement("div", { className: "card", style: { padding: "24px" } }, /* @__PURE__ */ React13.createElement("h3", { style: { fontSize: "1.1rem", fontWeight: 600, marginBottom: "4px" } }, "Highlights"), /* @__PURE__ */ React13.createElement("p", { style: { color: "var(--text-muted)", fontSize: "0.85rem", marginBottom: "24px" } }, "Auto-generated from your activity"), /* @__PURE__ */ React13.createElement("div", { style: { display: "flex", flexDirection: "column", gap: "20px" } }, highlights.map((item) => /* @__PURE__ */ React13.createElement("div", { key: item.id, style: { display: "flex", alignItems: "flex-start", gap: "12px" } }, /* @__PURE__ */ React13.createElement("div", { style: { width: "6px", height: "6px", borderRadius: "50%", background: item.color, marginTop: "8px", flexShrink: 0 } }), /* @__PURE__ */ React13.createElement("div", { style: { fontSize: "0.9rem", color: "var(--text-main)", lineHeight: 1.5 } }, item.text)))))), /* @__PURE__ */ React13.createElement("div", { style: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))", gap: "24px" } }, /* @__PURE__ */ React13.createElement("div", { className: "card", style: { padding: "24px" } }, /* @__PURE__ */ React13.createElement("h3", { style: { fontSize: "1.1rem", fontWeight: 600, marginBottom: "4px" } }, "Top merchants"), /* @__PURE__ */ React13.createElement("p", { style: { color: "var(--text-muted)", fontSize: "0.85rem", marginBottom: "24px" } }, "Sorted by spend - from your ledger"), /* @__PURE__ */ React13.createElement("div", { style: { display: "flex", flexDirection: "column" } }, topMerchants.map((item, idx) => /* @__PURE__ */ React13.createElement("div", { key: idx, style: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "16px 0",
    borderBottom: idx !== topMerchants.length - 1 ? "1px solid var(--border-color)" : "none"
  } }, /* @__PURE__ */ React13.createElement("div", null, /* @__PURE__ */ React13.createElement("div", { style: { fontSize: "0.95rem", fontWeight: 600, color: "var(--text-main)", marginBottom: "2px" } }, item.name), /* @__PURE__ */ React13.createElement("div", { style: { fontSize: "0.8rem", color: "var(--text-muted)" } }, item.category)), /* @__PURE__ */ React13.createElement("div", { style: { textAlign: "right" } }, /* @__PURE__ */ React13.createElement("div", { style: { fontSize: "0.95rem", fontWeight: 600, color: "var(--text-main)", marginBottom: "2px" } }, formatCurrency(item.amount)), /* @__PURE__ */ React13.createElement("div", { style: { fontSize: "0.8rem", color: "var(--text-muted)" } }, item.percent, "% of spend")))))), /* @__PURE__ */ React13.createElement("div", { className: "card", style: { padding: "24px" } }, /* @__PURE__ */ React13.createElement("h3", { style: { fontSize: "1.1rem", fontWeight: 600, marginBottom: "4px" } }, "Category leaders"), /* @__PURE__ */ React13.createElement("p", { style: { color: "var(--text-muted)", fontSize: "0.85rem", marginBottom: "24px" } }, "Where each dollar went"), /* @__PURE__ */ React13.createElement("div", { style: { display: "flex", flexDirection: "column", gap: "24px" } }, categoryLeaders.map((item, idx) => /* @__PURE__ */ React13.createElement("div", { key: idx, style: { display: "flex", flexDirection: "column", gap: "8px" } }, /* @__PURE__ */ React13.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center" } }, /* @__PURE__ */ React13.createElement("div", { style: { display: "flex", alignItems: "center", gap: "8px", fontSize: "0.9rem", fontWeight: 500 } }, /* @__PURE__ */ React13.createElement("div", { style: { width: "8px", height: "8px", borderRadius: "50%", background: item.color } }), item.name), /* @__PURE__ */ React13.createElement("div", { style: { fontSize: "0.85rem", color: "var(--text-muted)" } }, formatCurrency(item.amount), " ", /* @__PURE__ */ React13.createElement("span", { style: { margin: "0 4px" } }, "\xB7"), " ", item.percent, "%")), /* @__PURE__ */ React13.createElement("div", { style: { height: "6px", background: "var(--hover-bg)", borderRadius: "99px", overflow: "hidden" } }, /* @__PURE__ */ React13.createElement("div", { style: { width: `${item.percent}%`, height: "100%", background: item.color, borderRadius: "99px" } }))))))));
};

// src/features/cards/CardsPage.jsx
import React14, { useState as useState12 } from "react";
var CardsPage = () => {
  const { cards, addCard, toggleFreezeCard, updateCardLimit, removeCard, showToast } = useDb();
  const [isAddCardOpen, setIsAddCardOpen] = useState12(false);
  const [isLimitModalOpen, setIsLimitModalOpen] = useState12(false);
  const [holder, setHolder] = useState12("");
  const [number, setNumber] = useState12("");
  const [expires, setExpires] = useState12("");
  const [targetCardId, setTargetCardId] = useState12(null);
  const [newLimitInput, setNewLimitInput] = useState12("");
  const cardDetails = {
    1: { monthlyLimit: 5e3, spent: 3494.54, status: "Active", holder: "RAHIM ALI FAHRYAN", expires: "09/28" },
    2: { monthlyLimit: 7500, spent: 1349.63, status: "Active", holder: "RAHIM ALI FAHRYAN", expires: "04/27" }
  };
  const handleAddCardSubmit = (e) => {
    e.preventDefault();
    if (!number || !expires) return;
    addCard({
      holder: holder || "RAHIM ALI FAHRYAN",
      number: number || "4021 9902 6412 0000",
      expires: expires || "12/28"
    });
    setIsAddCardOpen(false);
    setHolder("");
    setNumber("");
    setExpires("");
    showToast("New card requested successfully!");
  };
  const handleOpenLimitModal = (card) => {
    setTargetCardId(card.id);
    const detail = cardDetails[card.id] || { monthlyLimit: card.monthlyLimit || 5e3 };
    setNewLimitInput(detail.monthlyLimit.toString());
    setIsLimitModalOpen(true);
  };
  const handleSaveLimit = (e) => {
    e.preventDefault();
    if (targetCardId && newLimitInput) {
      updateCardLimit(targetCardId, newLimitInput);
      setIsLimitModalOpen(false);
      showToast(`Updated monthly spending limit to $${parseFloat(newLimitInput).toLocaleString("en-US", { minimumFractionDigits: 2 })}`);
    }
  };
  const handleLockPin = (card) => {
    showToast(`PIN security locked for Card ${card.number.slice(-4)}.`);
  };
  const rewards = [
    { category: "Dining", rate: "3% cashback", amount: "+$48.20", icon: "ph-fork-knife" },
    { category: "Travel", rate: "2% cashback", amount: "+$112.40", icon: "ph-airplane-tilt" },
    { category: "Everything else", rate: "1% cashback", amount: "+$74.10", icon: "ph-shopping-bag" }
  ];
  const recentCardActivity = [
    { title: "Sell AAPL", sub: "Investments \xB7 Aug 6, 2026", amount: "+$500.00", isPositive: true },
    { title: "Sell AAPL", sub: "Investments \xB7 Aug 6, 2026", amount: "+$300.00", isPositive: true },
    { title: "iCloud+ 2TB", sub: "Bills \xB7 Aug 6, 2026", amount: "-$9.99", isPositive: false },
    { title: "Spotify Family", sub: "Bills \xB7 Aug 6, 2026", amount: "-$16.99", isPositive: false },
    { title: "Con Edison", sub: "Bills \xB7 Aug 6, 2026", amount: "-$142.00", isPositive: false },
    { title: "Verizon Fios", sub: "Bills \xB7 Aug 6, 2026", amount: "-$79.99", isPositive: false }
  ];
  const totalCardsBalance = cards.reduce((acc, c) => acc + c.balance, 0);
  return /* @__PURE__ */ React14.createElement("div", { className: "cards-redesign-container", style: { paddingBottom: "40px" } }, /* @__PURE__ */ React14.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px", flexWrap: "wrap", gap: "16px" } }, /* @__PURE__ */ React14.createElement("span", { style: { fontSize: "0.88rem", color: "var(--text-muted)" } }, cards.length, " active cards \u2022 $", totalCardsBalance.toLocaleString("en-US", { minimumFractionDigits: 2 }), " across cards"), /* @__PURE__ */ React14.createElement("button", { onClick: () => setIsAddCardOpen(true), style: { padding: "8px 20px", fontSize: "0.85rem", fontWeight: 600, borderRadius: "24px", background: "#2563eb", color: "#fff", border: "none", cursor: "pointer", boxShadow: "0 4px 12px rgba(37,99,235,0.25)", display: "flex", alignItems: "center", gap: "6px" } }, /* @__PURE__ */ React14.createElement("i", { className: "ph ph-plus" }), " Request new card")), /* @__PURE__ */ React14.createElement("div", { style: { display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: "24px", marginBottom: "28px", width: "100%" } }, cards.map((card, idx) => {
    const detail = cardDetails[card.id] || {
      monthlyLimit: 5e3,
      spent: 1200,
      status: "Active",
      holder: "RAHIM ALI FAHRYAN",
      expires: idx === 0 ? "09/28" : "04/27"
    };
    return /* @__PURE__ */ React14.createElement("div", { key: card.id, style: { background: "var(--bg-card)", border: "1px solid var(--border-color)", borderRadius: "20px", padding: "24px", boxShadow: "var(--shadow-sm)", opacity: card.isFrozen ? 0.8 : 1, transition: "all 0.3s ease" } }, /* @__PURE__ */ React14.createElement("div", { style: { background: card.bg, borderRadius: "18px", padding: "24px 28px", color: "#fff", marginBottom: "20px", boxShadow: "0 8px 24px rgba(0,0,0,0.14)" } }, /* @__PURE__ */ React14.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "16px" } }, /* @__PURE__ */ React14.createElement("div", null, /* @__PURE__ */ React14.createElement("span", { style: { fontSize: "0.65rem", letterSpacing: "1.5px", opacity: 0.7 } }, "BALANCE"), /* @__PURE__ */ React14.createElement("div", { style: { fontSize: "1.6rem", fontWeight: 800 } }, "$", card.balance.toLocaleString("en-US", { minimumFractionDigits: 2 }))), /* @__PURE__ */ React14.createElement("i", { className: "ph ph-wifi-high", style: { fontSize: "1.2rem", opacity: 0.8 } })), /* @__PURE__ */ React14.createElement("div", { style: { fontSize: "1.1rem", letterSpacing: "3px", fontFamily: "monospace", marginBottom: "20px", opacity: 0.95 } }, card.number), /* @__PURE__ */ React14.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "flex-end", fontSize: "0.72rem" } }, /* @__PURE__ */ React14.createElement("div", null, /* @__PURE__ */ React14.createElement("span", { style: { opacity: 0.7, display: "block", fontSize: "0.58rem" } }, "CARDHOLDER"), /* @__PURE__ */ React14.createElement("strong", { style: { fontWeight: 600, letterSpacing: "0.5px" } }, detail.holder)), /* @__PURE__ */ React14.createElement("div", null, /* @__PURE__ */ React14.createElement("span", { style: { opacity: 0.7, display: "block", fontSize: "0.58rem" } }, "EXPIRES"), /* @__PURE__ */ React14.createElement("strong", { style: { fontWeight: 600 } }, detail.expires)), /* @__PURE__ */ React14.createElement("strong", { style: { fontStyle: "italic", fontWeight: 800, fontSize: "0.9rem" } }, card.brand.toUpperCase()))), /* @__PURE__ */ React14.createElement("div", { style: { display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "10px", marginBottom: "20px" } }, /* @__PURE__ */ React14.createElement(
      "button",
      {
        onClick: () => toggleFreezeCard(card.id),
        style: { padding: "8px 12px", fontSize: "0.78rem", fontWeight: 600, borderRadius: "12px", border: "1px solid var(--border-color)", background: "var(--bg-app)", color: "var(--text-main)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "6px" }
      },
      /* @__PURE__ */ React14.createElement("i", { className: `ph ${card.isFrozen ? "ph-sun" : "ph-snowflake"}` }),
      " ",
      card.isFrozen ? "Unfreeze" : "Freeze"
    ), /* @__PURE__ */ React14.createElement(
      "button",
      {
        onClick: () => handleLockPin(card),
        style: { padding: "8px 12px", fontSize: "0.78rem", fontWeight: 600, borderRadius: "12px", border: "1px solid var(--border-color)", background: "var(--bg-app)", color: "var(--text-main)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "6px" }
      },
      /* @__PURE__ */ React14.createElement("i", { className: "ph ph-lock-key" }),
      " Lock PIN"
    ), /* @__PURE__ */ React14.createElement(
      "button",
      {
        onClick: () => handleOpenLimitModal(card),
        style: { padding: "8px 12px", fontSize: "0.78rem", fontWeight: 600, borderRadius: "12px", border: "1px solid var(--border-color)", background: "var(--bg-app)", color: "var(--text-main)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "6px" }
      },
      /* @__PURE__ */ React14.createElement("i", { className: "ph ph-sliders" }),
      " Limits"
    )), /* @__PURE__ */ React14.createElement("div", { style: { display: "flex", flexDirection: "column", gap: "10px", fontSize: "0.78rem", marginBottom: "20px", padding: "0 4px" } }, /* @__PURE__ */ React14.createElement("div", { style: { display: "flex", justifyContent: "space-between" } }, /* @__PURE__ */ React14.createElement("span", { style: { color: "var(--text-muted)" } }, "Monthly limit"), /* @__PURE__ */ React14.createElement("strong", { style: { color: "var(--text-main)" } }, "$", detail.monthlyLimit.toLocaleString("en-US", { minimumFractionDigits: 2 }))), /* @__PURE__ */ React14.createElement("div", { style: { display: "flex", justifyContent: "space-between" } }, /* @__PURE__ */ React14.createElement("span", { style: { color: "var(--text-muted)" } }, "Spent this month"), /* @__PURE__ */ React14.createElement("strong", { style: { color: "var(--text-main)" } }, "$", detail.spent.toLocaleString("en-US", { minimumFractionDigits: 2 }))), /* @__PURE__ */ React14.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center" } }, /* @__PURE__ */ React14.createElement("span", { style: { color: "var(--text-muted)" } }, "Status"), /* @__PURE__ */ React14.createElement("span", { style: { color: card.isFrozen ? "#ef4444" : "#10b981", fontWeight: 600, fontSize: "0.75rem" } }, card.isFrozen ? "Frozen" : "Active"))), /* @__PURE__ */ React14.createElement(
      "button",
      {
        onClick: () => {
          if (window.confirm("Are you sure you want to remove this card?")) removeCard(card.id);
        },
        style: { width: "100%", padding: "10px", fontSize: "0.78rem", fontWeight: 600, borderRadius: "12px", border: "1px solid rgba(239, 68, 68, 0.2)", background: "rgba(239, 68, 68, 0.04)", color: "#ef4444", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "6px" }
      },
      /* @__PURE__ */ React14.createElement("i", { className: "ph ph-trash" }),
      " Remove card"
    ));
  })), /* @__PURE__ */ React14.createElement("div", { style: { display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: "24px", width: "100%" } }, /* @__PURE__ */ React14.createElement("div", { style: { background: "var(--bg-card)", border: "1px solid var(--border-color)", borderRadius: "20px", padding: "24px", boxShadow: "var(--shadow-sm)" } }, /* @__PURE__ */ React14.createElement("div", { style: { display: "flex", alignItems: "center", gap: "8px", marginBottom: "16px" } }, /* @__PURE__ */ React14.createElement("i", { className: "ph ph-gift", style: { color: "#3b82f6", fontSize: "1.2rem" } }), /* @__PURE__ */ React14.createElement("h3", { style: { margin: 0, fontSize: "1.05rem", fontWeight: 700, color: "var(--text-main)" } }, "Rewards this month")), /* @__PURE__ */ React14.createElement("div", { style: { marginBottom: "20px" } }, /* @__PURE__ */ React14.createElement("h2", { style: { fontSize: "2rem", fontWeight: 800, margin: 0, color: "var(--text-main)", letterSpacing: "-0.02em" } }, "$234.70"), /* @__PURE__ */ React14.createElement("span", { style: { fontSize: "0.75rem", color: "var(--text-muted)" } }, "Earned across all cards - redeems for statement credit")), /* @__PURE__ */ React14.createElement("div", { style: { display: "flex", flexDirection: "column", gap: "14px" } }, rewards.map((rw) => /* @__PURE__ */ React14.createElement("div", { key: rw.category, style: { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0", borderTop: "1px solid var(--border-color)" } }, /* @__PURE__ */ React14.createElement("div", { style: { display: "flex", alignItems: "center", gap: "12px" } }, /* @__PURE__ */ React14.createElement("div", { style: { width: "34px", height: "34px", borderRadius: "50%", background: "var(--bg-app)", border: "1px solid var(--border-color)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1rem", color: "var(--text-main)" } }, /* @__PURE__ */ React14.createElement("i", { className: `ph ${rw.icon}` })), /* @__PURE__ */ React14.createElement("div", null, /* @__PURE__ */ React14.createElement("strong", { style: { display: "block", fontSize: "0.85rem", color: "var(--text-main)" } }, rw.category), /* @__PURE__ */ React14.createElement("span", { style: { fontSize: "0.7rem", color: "var(--text-muted)" } }, rw.rate))), /* @__PURE__ */ React14.createElement("strong", { style: { fontSize: "0.9rem", color: "#10b981" } }, rw.amount))))), /* @__PURE__ */ React14.createElement("div", { style: { background: "var(--bg-card)", border: "1px solid var(--border-color)", borderRadius: "20px", padding: "24px", boxShadow: "var(--shadow-sm)" } }, /* @__PURE__ */ React14.createElement("div", { style: { marginBottom: "16px" } }, /* @__PURE__ */ React14.createElement("h3", { style: { margin: 0, fontSize: "1.05rem", fontWeight: 700, color: "var(--text-main)" } }, "Recent card activity"), /* @__PURE__ */ React14.createElement("span", { style: { fontSize: "0.75rem", color: "var(--text-muted)" } }, "Across all cards, most recent first")), /* @__PURE__ */ React14.createElement("div", { style: { display: "flex", flexDirection: "column", gap: "10px" } }, recentCardActivity.map((act, index) => /* @__PURE__ */ React14.createElement("div", { key: index, style: { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 0", borderBottom: index < recentCardActivity.length - 1 ? "1px solid var(--border-color)" : "none" } }, /* @__PURE__ */ React14.createElement("div", null, /* @__PURE__ */ React14.createElement("strong", { style: { display: "block", fontSize: "0.85rem", color: "var(--text-main)" } }, act.title), /* @__PURE__ */ React14.createElement("span", { style: { fontSize: "0.7rem", color: "var(--text-muted)" } }, act.sub)), /* @__PURE__ */ React14.createElement("strong", { style: { fontSize: "0.88rem", color: act.isPositive ? "#10b981" : "var(--text-main)" } }, act.amount)))))), /* @__PURE__ */ React14.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "36px", paddingTop: "16px", borderTop: "1px solid var(--border-color)", fontSize: "0.72rem", color: "var(--text-muted)", flexWrap: "wrap", gap: "12px" } }, /* @__PURE__ */ React14.createElement("span", null, "\xA9 2026 Finly. Mock data \u2014 for demo purposes only."), /* @__PURE__ */ React14.createElement("span", null, "Designed with the calm of SF Pro and one Action Blue.")), /* @__PURE__ */ React14.createElement(
    Modal,
    {
      isOpen: isAddCardOpen,
      onClose: () => setIsAddCardOpen(false),
      title: "Request New Virtual / Physical Card",
      subtitle: "Issue a new payment card connected to your main account",
      icon: "ph-credit-card",
      size: "md"
    },
    /* @__PURE__ */ React14.createElement("form", { onSubmit: handleAddCardSubmit, style: { display: "flex", flexDirection: "column", gap: "14px" } }, /* @__PURE__ */ React14.createElement("div", { className: "form-group" }, /* @__PURE__ */ React14.createElement("label", { className: "form-label" }, "Cardholder Name"), /* @__PURE__ */ React14.createElement("input", { type: "text", className: "form-control", placeholder: "RAHIM ALI FAHRYAN", value: holder, onChange: (e) => setHolder(e.target.value), required: true })), /* @__PURE__ */ React14.createElement("div", { className: "form-group" }, /* @__PURE__ */ React14.createElement("label", { className: "form-label" }, "Card Number"), /* @__PURE__ */ React14.createElement("input", { type: "text", className: "form-control", placeholder: "4021 9902 6412 0000", value: number, onChange: (e) => setNumber(e.target.value), required: true })), /* @__PURE__ */ React14.createElement("div", { className: "form-group" }, /* @__PURE__ */ React14.createElement("label", { className: "form-label" }, "Expiration Date"), /* @__PURE__ */ React14.createElement("input", { type: "text", className: "form-control", placeholder: "12/28", value: expires, onChange: (e) => setExpires(e.target.value), required: true })), /* @__PURE__ */ React14.createElement("button", { type: "submit", className: "btn btn-primary", style: { width: "100%", padding: "12px", borderRadius: "12px", fontWeight: 700, marginTop: "4px" } }, /* @__PURE__ */ React14.createElement("i", { className: "ph ph-plus-circle" }), " Issue Card Now"))
  ), /* @__PURE__ */ React14.createElement(
    Modal,
    {
      isOpen: isLimitModalOpen,
      onClose: () => setIsLimitModalOpen(false),
      title: "Adjust Monthly Spending Limit",
      subtitle: "Set maximum card authorization threshold",
      icon: "ph-sliders",
      size: "md"
    },
    /* @__PURE__ */ React14.createElement("form", { onSubmit: handleSaveLimit, style: { display: "flex", flexDirection: "column", gap: "14px" } }, /* @__PURE__ */ React14.createElement("div", { className: "form-group" }, /* @__PURE__ */ React14.createElement("label", { className: "form-label" }, "New Monthly Limit ($)"), /* @__PURE__ */ React14.createElement("input", { type: "number", step: "100", className: "form-control", value: newLimitInput, onChange: (e) => setNewLimitInput(e.target.value), required: true })), /* @__PURE__ */ React14.createElement("button", { type: "submit", className: "btn btn-primary", style: { width: "100%", padding: "12px", borderRadius: "12px", fontWeight: 700, marginTop: "4px" } }, /* @__PURE__ */ React14.createElement("i", { className: "ph ph-check" }), " Save Limit"))
  ));
};

// src/features/wallet/WalletPage.jsx
import React15, { useState as useState13 } from "react";
var WalletPage = ({ setActiveTab }) => {
  const { user, toggleBalancePrivacy } = useAuth();
  const { cards, addTransaction, showToast } = useDb();
  const [isTopUpOpen, setIsTopUpOpen] = useState13(false);
  const [isSendOpen, setIsSendOpen] = useState13(false);
  const [isTransferOpen, setIsTransferOpen] = useState13(false);
  const [isAddGoalOpen, setIsAddGoalOpen] = useState13(false);
  const [topUpAmount, setTopUpAmount] = useState13("500");
  const [topUpMethod, setTopUpMethod] = useState13("Debit Card (**** 4092)");
  const [sendRecipient, setSendRecipient] = useState13("");
  const [sendAmount, setSendAmount] = useState13("");
  const [sendCategory, setSendCategory] = useState13("Transfer");
  const [transferFrom, setTransferFrom] = useState13("Main Account (**** 2514)");
  const [transferTo, setTransferTo] = useState13("Savings Vault");
  const [transferAmount, setTransferAmount] = useState13("250");
  const [quickRecipient, setQuickRecipient] = useState13("Sarah");
  const [quickAmount, setQuickAmount] = useState13("");
  const [quickNote, setQuickNote] = useState13("Dinner split");
  const [goals, setGoals] = useState13([
    { id: 1, name: "Emergency fund", current: 8200, target: 12e3, color: "#3b82f6" },
    { id: 2, name: "Japan 2027", current: 2400, target: 6e3, color: "#f97316" },
    { id: 3, name: "New MacBook Pro", current: 1750, target: 3500, color: "#10b981" },
    { id: 4, name: "Down payment", current: 14200, target: 6e4, color: "#8b5cf6" }
  ]);
  const [newGoalName, setNewGoalName] = useState13("");
  const [newGoalTarget, setNewGoalTarget] = useState13("");
  const [bills, setBills] = useState13([
    { id: 1, name: "Rent \u2014 88 Sullivan St.", due: "Due Jul 28 \xB7 Autopay on", amount: 2400, autopay: true, icon: "ph-house" },
    { id: 2, name: "Con Edison", due: "Due Jul 30 \xB7 Autopay on", amount: 142, autopay: true, icon: "ph-lightning" },
    { id: 3, name: "Verizon Fios", due: "Due Aug 02", amount: 79.99, autopay: false, icon: "ph-wifi-high" },
    { id: 4, name: "Spotify Family", due: "Due Aug 05 \xB7 Autopay on", amount: 16.99, autopay: true, icon: "ph-music-notes" },
    { id: 5, name: "iCloud+ 2TB", due: "Due Aug 07 \xB7 Autopay on", amount: 9.99, autopay: true, icon: "ph-cloud" }
  ]);
  const recipients = [
    { name: "Sarah", avatar: "S", bg: "#f59e0b" },
    { name: "Miguel", avatar: "M", bg: "#6366f1" },
    { name: "Aiko", avatar: "A", bg: "#10b981" },
    { name: "Priya", avatar: "P", bg: "#ec4899" },
    { name: "Jonas", avatar: "J", bg: "#3b82f6" }
  ];
  const handleTopUpSubmit = (e) => {
    e.preventDefault();
    const amt = parseFloat(topUpAmount);
    if (isNaN(amt) || amt <= 0) return;
    addTransaction({ merchant: `Top Up &mdash; ${topUpMethod}`, category: "Income", amount: amt, isPositive: true });
    setIsTopUpOpen(false);
    showToast(`Top up +$${amt.toLocaleString("en-US", { minimumFractionDigits: 2 })} successful via ${topUpMethod}`);
  };
  const handleSendSubmit = (e) => {
    e.preventDefault();
    const amt = parseFloat(sendAmount);
    if (isNaN(amt) || amt <= 0 || !sendRecipient) return;
    addTransaction({ merchant: `Send Payment to ${sendRecipient}`, category: sendCategory, amount: amt, isPositive: false });
    setIsSendOpen(false);
    setSendRecipient("");
    setSendAmount("");
    showToast(`Sent $${amt.toLocaleString("en-US", { minimumFractionDigits: 2 })} to ${sendRecipient}`);
  };
  const handleTransferSubmit = (e) => {
    e.preventDefault();
    const amt = parseFloat(transferAmount);
    if (isNaN(amt) || amt <= 0) return;
    addTransaction({ merchant: `Transfer (${transferFrom} \u2794 ${transferTo})`, category: "Transfer", amount: amt, isPositive: false });
    setIsTransferOpen(false);
    showToast(`Transferred $${amt.toLocaleString("en-US", { minimumFractionDigits: 2 })} from ${transferFrom} to ${transferTo}`);
  };
  const handleQuickTransfer = (e) => {
    e.preventDefault();
    const amt = parseFloat(quickAmount);
    if (isNaN(amt) || amt <= 0) return;
    addTransaction({ merchant: `Transfer to ${quickRecipient}`, category: "Transfer", amount: amt, isPositive: false });
    setQuickAmount("");
    setQuickNote("");
    showToast(`Transferred $${amt.toLocaleString("en-US", { minimumFractionDigits: 2 })} to ${quickRecipient}`);
  };
  const handlePayBill = (bill) => {
    addTransaction({ merchant: bill.name, category: "Bills", amount: bill.amount, isPositive: false });
    showToast(`Paid $${bill.amount.toFixed(2)} for ${bill.name}`);
  };
  const handleToggleAutopay = (billId) => {
    setBills(bills.map((b) => {
      if (b.id === billId) {
        const nextState = !b.autopay;
        const mainDue = b.due.split(" \xB7 ")[0];
        const newDue = nextState ? `${mainDue} \xB7 Autopay on` : mainDue;
        showToast(`Autopay ${nextState ? "enabled" : "disabled"} for ${b.name}`);
        return { ...b, autopay: nextState, due: newDue };
      }
      return b;
    }));
  };
  const handleAddGoalSubmit = (e) => {
    e.preventDefault();
    const targetAmt = parseFloat(newGoalTarget);
    if (!newGoalName || isNaN(targetAmt) || targetAmt <= 0) return;
    const colors = ["#3b82f6", "#10b981", "#f97316", "#8b5cf6", "#ec4899"];
    const randomColor = colors[goals.length % colors.length];
    setGoals([...goals, { id: Date.now(), name: newGoalName, current: 0, target: targetAmt, color: randomColor }]);
    setIsAddGoalOpen(false);
    setNewGoalName("");
    setNewGoalTarget("");
    showToast(`New savings goal '${newGoalName}' created!`);
  };
  const handleAddGoalFunds = (goalId) => {
    setGoals(goals.map((g) => g.id === goalId ? { ...g, current: Math.min(g.target, g.current + 250) } : g));
    showToast("Added +$250.00 to savings goal");
  };
  const handleRemoveGoalFunds = (goalId) => {
    setGoals(goals.map((g) => g.id === goalId ? { ...g, current: Math.max(0, g.current - 250) } : g));
    showToast("Withdrew $250.00 from savings goal");
  };
  const formattedBalance = user && user.isBalanceHidden ? "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022" : "$24,568.32";
  return /* @__PURE__ */ React15.createElement("div", { className: "wallet-redesign-container", style: { paddingBottom: "40px" } }, /* @__PURE__ */ React15.createElement("div", { className: "dashboard-grid-layout", style: { display: "grid", gridTemplateColumns: "minmax(0, 1fr) 340px", gap: "24px", width: "100%" } }, /* @__PURE__ */ React15.createElement("div", { className: "wallet-left-col", style: { display: "flex", flexDirection: "column", gap: "24px", minWidth: 0 } }, /* @__PURE__ */ React15.createElement("div", { className: "hero-balance-card", style: { background: "#14171f", borderRadius: "20px", padding: "24px 28px", color: "#fff", boxShadow: "0 10px 30px rgba(0,0,0,0.15)" } }, /* @__PURE__ */ React15.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" } }, /* @__PURE__ */ React15.createElement("span", { style: { fontSize: "0.78rem", color: "#94a3b8", letterSpacing: "0.5px" } }, "Total Balance"), /* @__PURE__ */ React15.createElement("div", { style: { display: "flex", gap: "10px" } }, /* @__PURE__ */ React15.createElement("select", { style: { background: "rgba(255,255,255,0.08)", color: "#cbd5e1", border: "1px solid rgba(255,255,255,0.12)", borderRadius: "8px", padding: "4px 10px", fontSize: "0.75rem", outline: "none" } }, /* @__PURE__ */ React15.createElement("option", null, "USD \u2022 MAIN")), /* @__PURE__ */ React15.createElement("select", { style: { background: "rgba(255,255,255,0.08)", color: "#cbd5e1", border: "1px solid rgba(255,255,255,0.12)", borderRadius: "8px", padding: "4px 10px", fontSize: "0.75rem", outline: "none" } }, /* @__PURE__ */ React15.createElement("option", null, "\u2022\u2022\u2022\u2022 2514")))), /* @__PURE__ */ React15.createElement("div", { style: { display: "flex", alignItems: "baseline", gap: "14px", marginBottom: "8px" } }, /* @__PURE__ */ React15.createElement("h2", { style: { fontSize: "2.4rem", fontWeight: 800, margin: 0, letterSpacing: "-0.02em", color: "#ffffff" } }, formattedBalance), /* @__PURE__ */ React15.createElement("button", { onClick: toggleBalancePrivacy, style: { background: "none", border: "none", color: "#94a3b8", cursor: "pointer", fontSize: "1.2rem" } }, /* @__PURE__ */ React15.createElement("i", { className: `ph ${user && user.isBalanceHidden ? "ph-eye-slash" : "ph-eye"}` }))), /* @__PURE__ */ React15.createElement("div", { style: { display: "flex", alignItems: "center", gap: "6px", fontSize: "0.8rem", color: "#94a3b8", marginBottom: "24px" } }, /* @__PURE__ */ React15.createElement("span", { style: { background: "rgba(16, 185, 129, 0.2)", color: "#34d399", padding: "2px 8px", borderRadius: "12px", fontSize: "0.72rem", fontWeight: 600 } }, "\u2197 +12.4%"), /* @__PURE__ */ React15.createElement("span", null, "vs. last month")), /* @__PURE__ */ React15.createElement("div", { style: { display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "12px" } }, /* @__PURE__ */ React15.createElement("button", { onClick: () => setIsSendOpen(true), className: "action-pill-btn" }, /* @__PURE__ */ React15.createElement("i", { className: "ph ph-paper-plane-tilt" }), " Send"), /* @__PURE__ */ React15.createElement("button", { onClick: () => setIsTransferOpen(true), className: "action-pill-btn" }, /* @__PURE__ */ React15.createElement("i", { className: "ph ph-arrows-left-right" }), " Transfer"), /* @__PURE__ */ React15.createElement("button", { onClick: () => setIsTopUpOpen(true), className: "action-pill-btn" }, /* @__PURE__ */ React15.createElement("i", { className: "ph ph-plus" }), " Top up"), /* @__PURE__ */ React15.createElement("button", { onClick: () => setActiveTab("cards"), className: "action-pill-btn" }, /* @__PURE__ */ React15.createElement("i", { className: "ph ph-credit-card" }), " Add card"))), /* @__PURE__ */ React15.createElement("div", { style: { display: "grid", gridTemplateColumns: "repeat(4, minmax(0, 1fr))", gap: "16px", width: "100%" } }, /* @__PURE__ */ React15.createElement("div", { className: "kpi-sparkline-card", style: { background: "var(--bg-card)", border: "1px solid var(--border-color)", borderRadius: "18px", padding: "18px 20px", display: "flex", flexDirection: "column", justifyContent: "space-between", position: "relative", overflow: "hidden", boxShadow: "var(--shadow-sm)" } }, /* @__PURE__ */ React15.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" } }, /* @__PURE__ */ React15.createElement("div", { style: { display: "flex", alignItems: "center", gap: "8px" } }, /* @__PURE__ */ React15.createElement("div", { style: { width: "10px", height: "10px", borderRadius: "50%", background: "#3b82f6" } }), /* @__PURE__ */ React15.createElement("span", { style: { fontSize: "0.78rem", color: "var(--text-muted)", fontWeight: 500 } }, "Income")), /* @__PURE__ */ React15.createElement("span", { style: { fontSize: "0.72rem", color: "#10b981", fontWeight: 600 } }, "\u2197 8.2%")), /* @__PURE__ */ React15.createElement("div", { style: { marginBottom: "10px" } }, /* @__PURE__ */ React15.createElement("h3", { style: { fontSize: "1.35rem", fontWeight: 800, margin: 0, color: "var(--text-main)", letterSpacing: "-0.02em" } }, "$8,420.50")), /* @__PURE__ */ React15.createElement("div", { style: { height: "24px", width: "100%", marginTop: "auto" } }, /* @__PURE__ */ React15.createElement("svg", { viewBox: "0 0 100 20", preserveAspectRatio: "none", style: { width: "100%", height: "100%", display: "block" } }, /* @__PURE__ */ React15.createElement("path", { d: "M0,15 Q25,5 50,12 T100,6", fill: "none", stroke: "#3b82f6", strokeWidth: "2", strokeLinecap: "round" })))), /* @__PURE__ */ React15.createElement("div", { className: "kpi-sparkline-card", style: { background: "var(--bg-card)", border: "1px solid var(--border-color)", borderRadius: "18px", padding: "18px 20px", display: "flex", flexDirection: "column", justifyContent: "space-between", position: "relative", overflow: "hidden", boxShadow: "var(--shadow-sm)" } }, /* @__PURE__ */ React15.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" } }, /* @__PURE__ */ React15.createElement("div", { style: { display: "flex", alignItems: "center", gap: "8px" } }, /* @__PURE__ */ React15.createElement("div", { style: { width: "10px", height: "10px", borderRadius: "50%", background: "#ef4444" } }), /* @__PURE__ */ React15.createElement("span", { style: { fontSize: "0.78rem", color: "var(--text-muted)", fontWeight: 500 } }, "Expenses")), /* @__PURE__ */ React15.createElement("span", { style: { fontSize: "0.72rem", color: "#10b981", fontWeight: 600 } }, "\u2198 3.1%")), /* @__PURE__ */ React15.createElement("div", { style: { marginBottom: "10px" } }, /* @__PURE__ */ React15.createElement("h3", { style: { fontSize: "1.35rem", fontWeight: 800, margin: 0, color: "var(--text-main)", letterSpacing: "-0.02em" } }, "$1,602.21")), /* @__PURE__ */ React15.createElement("div", { style: { height: "24px", width: "100%", marginTop: "auto" } }, /* @__PURE__ */ React15.createElement("svg", { viewBox: "0 0 100 20", preserveAspectRatio: "none", style: { width: "100%", height: "100%", display: "block" } }, /* @__PURE__ */ React15.createElement("path", { d: "M0,10 Q30,18 60,8 T100,14", fill: "none", stroke: "#ef4444", strokeWidth: "2", strokeLinecap: "round" })))), /* @__PURE__ */ React15.createElement("div", { className: "kpi-sparkline-card", style: { background: "var(--bg-card)", border: "1px solid var(--border-color)", borderRadius: "18px", padding: "18px 20px", display: "flex", flexDirection: "column", justifyContent: "space-between", position: "relative", overflow: "hidden", boxShadow: "var(--shadow-sm)" } }, /* @__PURE__ */ React15.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" } }, /* @__PURE__ */ React15.createElement("div", { style: { display: "flex", alignItems: "center", gap: "8px" } }, /* @__PURE__ */ React15.createElement("div", { style: { width: "10px", height: "10px", borderRadius: "50%", background: "#10b981" } }), /* @__PURE__ */ React15.createElement("span", { style: { fontSize: "0.78rem", color: "var(--text-muted)", fontWeight: 500 } }, "Savings")), /* @__PURE__ */ React15.createElement("span", { style: { fontSize: "0.72rem", color: "#10b981", fontWeight: 600 } }, "\u2197 8.1%")), /* @__PURE__ */ React15.createElement("div", { style: { marginBottom: "10px" } }, /* @__PURE__ */ React15.createElement("h3", { style: { fontSize: "1.35rem", fontWeight: 800, margin: 0, color: "var(--text-main)", letterSpacing: "-0.02em" } }, "$6,818.29")), /* @__PURE__ */ React15.createElement("div", { style: { height: "24px", width: "100%", marginTop: "auto" } }, /* @__PURE__ */ React15.createElement("svg", { viewBox: "0 0 100 20", preserveAspectRatio: "none", style: { width: "100%", height: "100%", display: "block" } }, /* @__PURE__ */ React15.createElement("path", { d: "M0,16 Q25,8 50,14 T100,4", fill: "none", stroke: "#10b981", strokeWidth: "2", strokeLinecap: "round" })))), /* @__PURE__ */ React15.createElement("div", { className: "kpi-sparkline-card", style: { background: "var(--bg-card)", border: "1px solid var(--border-color)", borderRadius: "18px", padding: "18px 20px", display: "flex", flexDirection: "column", justifyContent: "space-between", position: "relative", overflow: "hidden", boxShadow: "var(--shadow-sm)" } }, /* @__PURE__ */ React15.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" } }, /* @__PURE__ */ React15.createElement("div", { style: { display: "flex", alignItems: "center", gap: "8px" } }, /* @__PURE__ */ React15.createElement("div", { style: { width: "10px", height: "10px", borderRadius: "50%", background: "#8b5cf6" } }), /* @__PURE__ */ React15.createElement("span", { style: { fontSize: "0.78rem", color: "var(--text-muted)", fontWeight: 500 } }, "Investments")), /* @__PURE__ */ React15.createElement("span", { style: { fontSize: "0.72rem", color: "#10b981", fontWeight: 600 } }, "\u2197 1.78%")), /* @__PURE__ */ React15.createElement("div", { style: { marginBottom: "10px" } }, /* @__PURE__ */ React15.createElement("h3", { style: { fontSize: "1.35rem", fontWeight: 800, margin: 0, color: "var(--text-main)", letterSpacing: "-0.02em" } }, "$32,780.00")), /* @__PURE__ */ React15.createElement("div", { style: { height: "24px", width: "100%", marginTop: "auto" } }, /* @__PURE__ */ React15.createElement("svg", { viewBox: "0 0 100 20", preserveAspectRatio: "none", style: { width: "100%", height: "100%", display: "block" } }, /* @__PURE__ */ React15.createElement("path", { d: "M0,12 Q30,16 60,6 T100,10", fill: "none", stroke: "#8b5cf6", strokeWidth: "2", strokeLinecap: "round" }))))), /* @__PURE__ */ React15.createElement("div", { style: { background: "var(--bg-card)", border: "1px solid var(--border-color)", borderRadius: "20px", padding: "20px 24px", boxShadow: "var(--shadow-sm)" } }, /* @__PURE__ */ React15.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "18px" } }, /* @__PURE__ */ React15.createElement("div", null, /* @__PURE__ */ React15.createElement("h3", { style: { margin: 0, fontSize: "1.05rem", fontWeight: 700, color: "var(--text-main)" } }, "Upcoming bills"), /* @__PURE__ */ React15.createElement("span", { style: { fontSize: "0.78rem", color: "var(--text-muted)" } }, "5 unpaid \u2022 $2,648.97 scheduled")), /* @__PURE__ */ React15.createElement("button", { style: { background: "none", border: "none", color: "var(--accent-blue)", fontSize: "0.78rem", fontWeight: 600, cursor: "pointer" } }, "Autopay overview")), /* @__PURE__ */ React15.createElement("div", { style: { display: "flex", flexDirection: "column", gap: "14px" } }, bills.map((bill) => /* @__PURE__ */ React15.createElement("div", { key: bill.id, style: { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0", borderBottom: "1px solid var(--border-color)" } }, /* @__PURE__ */ React15.createElement("div", { style: { display: "flex", alignItems: "center", gap: "14px" } }, /* @__PURE__ */ React15.createElement("div", { style: { width: "38px", height: "38px", borderRadius: "50%", background: "var(--bg-app)", border: "1px solid var(--border-color)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.1rem", color: "var(--text-main)" } }, /* @__PURE__ */ React15.createElement("i", { className: `ph ${bill.icon}` })), /* @__PURE__ */ React15.createElement("div", null, /* @__PURE__ */ React15.createElement("strong", { style: { display: "block", fontSize: "0.88rem", color: "var(--text-main)" } }, bill.name), /* @__PURE__ */ React15.createElement("span", { style: { fontSize: "0.72rem", color: "var(--text-muted)" } }, bill.due))), /* @__PURE__ */ React15.createElement("div", { style: { display: "flex", alignItems: "center", gap: "16px" } }, /* @__PURE__ */ React15.createElement("strong", { style: { fontSize: "0.95rem", color: "var(--text-main)" } }, "$", bill.amount.toFixed(2)), /* @__PURE__ */ React15.createElement(
    "button",
    {
      onClick: () => handleToggleAutopay(bill.id),
      style: {
        padding: "4px 12px",
        borderRadius: "12px",
        fontSize: "0.72rem",
        fontWeight: 600,
        background: bill.autopay ? "rgba(16, 185, 129, 0.12)" : "var(--bg-app)",
        color: bill.autopay ? "#10b981" : "var(--text-muted)",
        border: bill.autopay ? "1px solid rgba(16, 185, 129, 0.3)" : "1px solid var(--border-color)",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        gap: "4px",
        transition: "all 0.2s ease"
      },
      title: "Click to toggle Autopay"
    },
    /* @__PURE__ */ React15.createElement("i", { className: `ph ${bill.autopay ? "ph-check-circle" : "ph-x-circle"}` }),
    bill.autopay ? "Autopay on" : "Autopay off"
  ), /* @__PURE__ */ React15.createElement("button", { onClick: () => handlePayBill(bill), style: { padding: "6px 16px", fontSize: "0.78rem", fontWeight: 600, borderRadius: "16px", background: "var(--accent-blue)", color: "#fff", border: "none", cursor: "pointer" } }, "Pay")))))), /* @__PURE__ */ React15.createElement("div", { style: { background: "var(--bg-card)", border: "1px solid var(--border-color)", borderRadius: "20px", padding: "24px" } }, /* @__PURE__ */ React15.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" } }, /* @__PURE__ */ React15.createElement("h3", { style: { margin: 0, fontSize: "1.05rem", fontWeight: 700, color: "var(--text-main)" } }, "My cards"), /* @__PURE__ */ React15.createElement("button", { onClick: () => setActiveTab("cards"), style: { padding: "6px 16px", fontSize: "0.78rem", fontWeight: 600, borderRadius: "18px", background: "var(--accent-blue)", color: "#fff", border: "none", cursor: "pointer" } }, "+ Add card")), /* @__PURE__ */ React15.createElement("div", { style: { display: "flex", flexDirection: "column", gap: "18px" } }, cards.map((card) => /* @__PURE__ */ React15.createElement("div", { key: card.id, style: { background: card.bg, borderRadius: "20px", padding: "24px 28px", color: "#fff", boxShadow: "0 8px 24px rgba(0,0,0,0.12)" } }, /* @__PURE__ */ React15.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" } }, /* @__PURE__ */ React15.createElement("div", null, /* @__PURE__ */ React15.createElement("span", { style: { fontSize: "0.65rem", letterSpacing: "1.5px", opacity: 0.7 } }, "BALANCE"), /* @__PURE__ */ React15.createElement("div", { style: { fontSize: "1.6rem", fontWeight: 800 } }, "$", card.balance.toLocaleString("en-US", { minimumFractionDigits: 2 }))), /* @__PURE__ */ React15.createElement("div", { style: { display: "flex", alignItems: "center", gap: "12px" } }, /* @__PURE__ */ React15.createElement("i", { className: "ph ph-wifi-high", style: { fontSize: "1.2rem", opacity: 0.8 } }), /* @__PURE__ */ React15.createElement("i", { className: "ph ph-dots-three-vertical", style: { fontSize: "1.2rem", opacity: 0.8, cursor: "pointer" } }))), /* @__PURE__ */ React15.createElement("div", { style: { fontSize: "1.1rem", letterSpacing: "3px", fontFamily: "monospace", marginBottom: "20px", opacity: 0.95 } }, card.number), /* @__PURE__ */ React15.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "flex-end", fontSize: "0.75rem" } }, /* @__PURE__ */ React15.createElement("div", null, /* @__PURE__ */ React15.createElement("span", { style: { opacity: 0.7, display: "block", fontSize: "0.6rem" } }, "CARDHOLDER"), /* @__PURE__ */ React15.createElement("strong", { style: { fontWeight: 600 } }, card.holder)), /* @__PURE__ */ React15.createElement("div", null, /* @__PURE__ */ React15.createElement("span", { style: { opacity: 0.7, display: "block", fontSize: "0.6rem" } }, "EXPIRES"), /* @__PURE__ */ React15.createElement("strong", { style: { fontWeight: 600 } }, card.expires)), /* @__PURE__ */ React15.createElement("strong", { style: { fontStyle: "italic", fontWeight: 800, fontSize: "0.95rem" } }, card.brand.toUpperCase()))))))), /* @__PURE__ */ React15.createElement("div", { className: "wallet-right-col", style: { display: "flex", flexDirection: "column", gap: "24px" } }, /* @__PURE__ */ React15.createElement("div", { style: { background: "var(--bg-card)", border: "1px solid var(--border-color)", borderRadius: "20px", padding: "20px" } }, /* @__PURE__ */ React15.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "14px" } }, /* @__PURE__ */ React15.createElement("h3", { style: { margin: 0, fontSize: "0.98rem", fontWeight: 700, color: "var(--text-main)" } }, "Quick transfer"), /* @__PURE__ */ React15.createElement("button", { style: { background: "none", border: "none", color: "var(--accent-blue)", fontSize: "0.75rem", fontWeight: 600, cursor: "pointer" } }, "See all")), /* @__PURE__ */ React15.createElement("div", { style: { display: "flex", gap: "8px", marginBottom: "16px" } }, recipients.map((r) => /* @__PURE__ */ React15.createElement(
    "div",
    {
      key: r.name,
      onClick: () => setQuickRecipient(r.name),
      style: { width: "36px", height: "36px", borderRadius: "50%", background: r.bg, color: "#fff", fontWeight: 700, fontSize: "0.85rem", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", border: quickRecipient === r.name ? "2px solid var(--text-main)" : "none", opacity: quickRecipient === r.name ? 1 : 0.8 },
      title: r.name
    },
    r.avatar
  )), /* @__PURE__ */ React15.createElement("div", { style: { width: "36px", height: "36px", borderRadius: "50%", border: "1px dashed var(--border-color)", color: "var(--text-muted)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", fontSize: "1rem" } }, "+")), /* @__PURE__ */ React15.createElement("form", { onSubmit: handleQuickTransfer, style: { display: "flex", flexDirection: "column", gap: "12px" } }, /* @__PURE__ */ React15.createElement("div", null, /* @__PURE__ */ React15.createElement("label", { style: { fontSize: "0.72rem", color: "var(--text-muted)", display: "block", marginBottom: "4px" } }, "NOTE (OPTIONAL)"), /* @__PURE__ */ React15.createElement(
    "input",
    {
      type: "text",
      placeholder: "Dinner split",
      value: quickNote,
      onChange: (e) => setQuickNote(e.target.value),
      style: { width: "100%", padding: "8px 12px", borderRadius: "10px", border: "1px solid var(--border-color)", background: "var(--bg-app)", fontSize: "0.8rem", color: "var(--text-main)", outline: "none" }
    }
  )), /* @__PURE__ */ React15.createElement("div", null, /* @__PURE__ */ React15.createElement("label", { style: { fontSize: "0.72rem", color: "var(--text-muted)", display: "block", marginBottom: "4px" } }, "AMOUNT"), /* @__PURE__ */ React15.createElement(
    "input",
    {
      type: "number",
      step: "0.01",
      placeholder: "$ 0.00",
      value: quickAmount,
      onChange: (e) => setQuickAmount(e.target.value),
      style: { width: "100%", padding: "8px 12px", borderRadius: "10px", border: "1px solid var(--border-color)", background: "var(--bg-app)", fontSize: "0.8rem", color: "var(--text-main)", outline: "none" }
    }
  )), /* @__PURE__ */ React15.createElement("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px", marginTop: "4px" } }, /* @__PURE__ */ React15.createElement(
    "button",
    {
      type: "button",
      onClick: () => showToast(`Saved draft transfer for ${quickRecipient}`),
      style: { padding: "8px", fontSize: "0.78rem", borderRadius: "16px", border: "1px solid var(--border-color)", background: "var(--bg-app)", color: "var(--text-main)", fontWeight: 600, cursor: "pointer" }
    },
    "Save as draft"
  ), /* @__PURE__ */ React15.createElement(
    "button",
    {
      type: "submit",
      style: { padding: "8px", fontSize: "0.78rem", borderRadius: "16px", border: "none", background: "var(--accent-blue)", color: "#fff", fontWeight: 600, cursor: "pointer" }
    },
    "Send money"
  )))), /* @__PURE__ */ React15.createElement("div", { style: { background: "var(--bg-card)", border: "1px solid var(--border-color)", borderRadius: "20px", padding: "20px" } }, /* @__PURE__ */ React15.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" } }, /* @__PURE__ */ React15.createElement("div", { style: { display: "flex", alignItems: "center", gap: "8px" } }, /* @__PURE__ */ React15.createElement("i", { className: "ph ph-vault", style: { color: "var(--accent-blue)", fontSize: "1.1rem" } }), /* @__PURE__ */ React15.createElement("h3", { style: { margin: 0, fontSize: "0.98rem", fontWeight: 700, color: "var(--text-main)" } }, "Savings goals"))), /* @__PURE__ */ React15.createElement("div", { style: { display: "flex", flexDirection: "column", gap: "16px" } }, goals.map((goal) => {
    const pct = Math.round(goal.current / goal.target * 100);
    return /* @__PURE__ */ React15.createElement("div", { key: goal.id }, /* @__PURE__ */ React15.createElement("div", { style: { display: "flex", justifyContent: "space-between", fontSize: "0.78rem", marginBottom: "4px" } }, /* @__PURE__ */ React15.createElement("strong", { style: { color: "var(--text-main)" } }, goal.name), /* @__PURE__ */ React15.createElement("span", { style: { color: "var(--text-muted)" } }, "$", goal.current.toLocaleString("en-US", { minimumFractionDigits: 2 }), " / $", goal.target.toLocaleString("en-US", { minimumFractionDigits: 2 }))), /* @__PURE__ */ React15.createElement("div", { style: { height: "6px", background: "var(--bg-app)", borderRadius: "3px", overflow: "hidden", marginBottom: "6px" } }, /* @__PURE__ */ React15.createElement("div", { style: { width: `${pct}%`, height: "100%", background: goal.color, transition: "width 0.3s ease" } })), /* @__PURE__ */ React15.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "0.7rem" } }, /* @__PURE__ */ React15.createElement("div", { style: { display: "flex", gap: "8px" } }, /* @__PURE__ */ React15.createElement("button", { onClick: () => handleAddGoalFunds(goal.id), style: { background: "none", border: "none", color: "var(--accent-blue)", padding: 0, cursor: "pointer", fontWeight: 600 } }, "Add funds"), /* @__PURE__ */ React15.createElement("span", { style: { color: "var(--text-muted)" } }, "\u2022"), /* @__PURE__ */ React15.createElement("button", { onClick: () => handleRemoveGoalFunds(goal.id), style: { background: "none", border: "none", color: "var(--text-muted)", padding: 0, cursor: "pointer" } }, "Remove")), /* @__PURE__ */ React15.createElement("span", { style: { color: "var(--text-muted)", fontWeight: 600 } }, pct, "%")));
  })), /* @__PURE__ */ React15.createElement(
    "button",
    {
      onClick: () => setIsAddGoalOpen(true),
      style: { width: "100%", marginTop: "16px", padding: "10px", fontSize: "0.78rem", fontWeight: 600, borderRadius: "14px", border: "1px dashed var(--border-color)", background: "transparent", color: "var(--text-main)", cursor: "pointer" }
    },
    "+ New savings goal"
  )))), /* @__PURE__ */ React15.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "36px", paddingTop: "16px", borderTop: "1px solid var(--border-color)", fontSize: "0.72rem", color: "var(--text-muted)", flexWrap: "wrap", gap: "12px" } }, /* @__PURE__ */ React15.createElement("span", null, "\xA9 2026 Finly. Mock data \u2014 for demo purposes only."), /* @__PURE__ */ React15.createElement("span", null, "Designed with the calm of SF Pro and one Action Blue.")), /* @__PURE__ */ React15.createElement(SendModal, { isOpen: isSendOpen, onClose: () => setIsSendOpen(false) }), /* @__PURE__ */ React15.createElement(TransferModal, { isOpen: isTransferOpen, onClose: () => setIsTransferOpen(false) }), /* @__PURE__ */ React15.createElement(TopUpModal, { isOpen: isTopUpOpen, onClose: () => setIsTopUpOpen(false) }), /* @__PURE__ */ React15.createElement(
    Modal,
    {
      isOpen: isAddGoalOpen,
      onClose: () => setIsAddGoalOpen(false),
      title: "Create New Savings Goal",
      subtitle: "Set up a dedicated target for your savings aspirations",
      icon: "ph-piggy-bank",
      size: "md"
    },
    /* @__PURE__ */ React15.createElement("form", { onSubmit: handleAddGoalSubmit, style: { display: "flex", flexDirection: "column", gap: "14px" } }, /* @__PURE__ */ React15.createElement("div", { className: "form-group" }, /* @__PURE__ */ React15.createElement("label", { className: "form-label" }, "Goal Name"), /* @__PURE__ */ React15.createElement("input", { type: "text", className: "form-control", placeholder: "e.g. Vacation 2027, Dream Home...", value: newGoalName, onChange: (e) => setNewGoalName(e.target.value), required: true })), /* @__PURE__ */ React15.createElement("div", { className: "form-group" }, /* @__PURE__ */ React15.createElement("label", { className: "form-label" }, "Target Amount ($)"), /* @__PURE__ */ React15.createElement("input", { type: "number", step: "0.01", className: "form-control", placeholder: "5000", value: newGoalTarget, onChange: (e) => setNewGoalTarget(e.target.value), required: true })), /* @__PURE__ */ React15.createElement("button", { type: "submit", className: "btn btn-primary", style: { width: "100%", padding: "12px", borderRadius: "12px", fontWeight: 700, marginTop: "4px" } }, /* @__PURE__ */ React15.createElement("i", { className: "ph ph-plus-circle" }), " Create Goal"))
  ));
};

// src/features/budgets/BudgetsPage.jsx
import React16, { useState as useState14 } from "react";
var defaultGoals = [
  { id: "goal-1", title: "Emergency fund", current: 8200, target: 12e3, date: "SEP 2026", color: "#2563eb" },
  { id: "goal-2", title: "Japan 2027", current: 2400, target: 6e3, date: "FEB 2027", color: "#f97316" },
  { id: "goal-3", title: "New MacBook Pro", current: 1750, target: 3500, date: "NOV 2026", color: "#10b981" },
  { id: "goal-4", title: "Down payment", current: 14200, target: 6e4, date: "2028", color: "#8b5cf6" }
];
var mockBudgets = [
  { id: "b1", category: "Food", spent: 780, target: 800, color: "#2563eb" },
  { id: "b2", category: "Shopping", spent: 1499, target: 1200, color: "#ef4444", isOver: true, overAmount: 299 },
  { id: "b3", category: "Entertainment", spent: 405, target: 500, color: "#2563eb" },
  { id: "b4", category: "Travel", spent: 320, target: 800, color: "#2563eb" },
  { id: "b5", category: "Bills", spent: 662, target: 900, color: "#2563eb" }
];
var BudgetsPage = () => {
  const { dbBudgets, addBudget, showToast } = useDb();
  const [budgetsList, setBudgetsList] = useState14(mockBudgets);
  const [goalsList, setGoalsList] = useState14(defaultGoals);
  const [isAddBudgetOpen, setIsAddBudgetOpen] = useState14(false);
  const [isAddGoalOpen, setIsAddGoalOpen] = useState14(false);
  const [budgetName, setBudgetName] = useState14("");
  const [budgetLimit, setBudgetLimit] = useState14("");
  const [goalTitle, setGoalTitle] = useState14("");
  const [goalTarget, setGoalTarget] = useState14("");
  const [goalDate, setGoalDate] = useState14("");
  const totalSpent = budgetsList.reduce((acc, b) => acc + b.spent, 0);
  const totalLimit = budgetsList.reduce((acc, b) => acc + b.target, 0);
  const overallPercentage = Math.round(totalSpent / totalLimit * 100);
  const underBudgetCount = budgetsList.filter((b) => b.spent <= b.target).length;
  const overBudgetCount = budgetsList.filter((b) => b.spent > b.target).length;
  const overBudgetItem = budgetsList.find((b) => b.spent > b.target);
  const handleCreateBudget = (e) => {
    e.preventDefault();
    if (!budgetName || !budgetLimit) return;
    const newB = {
      id: `b-${Date.now()}`,
      category: budgetName,
      spent: 0,
      target: parseFloat(budgetLimit),
      color: "#2563eb"
    };
    setBudgetsList([...budgetsList, newB]);
    setIsAddBudgetOpen(false);
    setBudgetName("");
    setBudgetLimit("");
    showToast(`Created budget for ${budgetName}`);
  };
  const handleCreateGoal = (e) => {
    e.preventDefault();
    if (!goalTitle || !goalTarget) return;
    const newG = {
      id: `goal-${Date.now()}`,
      title: goalTitle,
      current: 0,
      target: parseFloat(goalTarget),
      date: goalDate || "2027",
      color: "#2563eb"
    };
    setGoalsList([...goalsList, newG]);
    setIsAddGoalOpen(false);
    setGoalTitle("");
    setGoalTarget("");
    setGoalDate("");
    showToast(`Added new goal: ${goalTitle}`);
  };
  const handleAddGoalFunds = (goalId) => {
    setGoalsList(goalsList.map((g) => {
      if (g.id === goalId) {
        const added = 500;
        const newCurrent = Math.min(g.target, g.current + added);
        showToast(`Added $${added}.00 to ${g.title}`);
        return { ...g, current: newCurrent };
      }
      return g;
    }));
  };
  const handleRemoveGoal = (goalId) => {
    setGoalsList(goalsList.filter((g) => g.id !== goalId));
    showToast(`Goal removed`);
  };
  const formatCurrency2 = (val) => "$" + val.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  return /* @__PURE__ */ React16.createElement("div", { style: { display: "flex", flexDirection: "column", gap: "24px", paddingBottom: "40px" } }, /* @__PURE__ */ React16.createElement("div", null, /* @__PURE__ */ React16.createElement("h2", { style: { fontSize: "1.5rem", fontWeight: 700, marginBottom: "4px" } }, "Budgets"), /* @__PURE__ */ React16.createElement("p", { style: { color: "var(--text-muted)", fontSize: "0.9rem" } }, "Monthly limits and long-term goals, gently enforced.")), /* @__PURE__ */ React16.createElement("div", { style: { display: "flex", flexWrap: "wrap", gap: "24px" } }, /* @__PURE__ */ React16.createElement("div", { style: { flex: "1 1 380px", display: "flex", flexDirection: "column", gap: "24px" } }, /* @__PURE__ */ React16.createElement("div", { className: "card", style: { padding: "24px" } }, /* @__PURE__ */ React16.createElement("div", { style: { fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.05em", color: "var(--text-muted)", marginBottom: "8px" } }, "TOTAL THIS MONTH"), /* @__PURE__ */ React16.createElement("h1", { style: { fontSize: "2.5rem", fontWeight: 700, letterSpacing: "-0.03em", color: "var(--text-main)", marginBottom: "4px" } }, formatCurrency2(totalSpent)), /* @__PURE__ */ React16.createElement("p", { style: { color: "var(--text-muted)", fontSize: "0.85rem", marginBottom: "16px" } }, "of ", formatCurrency2(totalLimit), " - ", overallPercentage, "% used"), /* @__PURE__ */ React16.createElement("div", { style: { height: "8px", background: "var(--hover-bg)", borderRadius: "99px", overflow: "hidden", marginBottom: "24px" } }, /* @__PURE__ */ React16.createElement("div", { style: { width: `${overallPercentage}%`, height: "100%", background: "#2563eb", borderRadius: "99px" } })), /* @__PURE__ */ React16.createElement("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "20px" } }, /* @__PURE__ */ React16.createElement("div", { style: { background: "var(--hover-bg)", padding: "16px", borderRadius: "12px" } }, /* @__PURE__ */ React16.createElement("div", { style: { fontSize: "0.8rem", color: "var(--text-muted)", marginBottom: "6px" } }, "Under budget"), /* @__PURE__ */ React16.createElement("div", { style: { fontSize: "1.5rem", fontWeight: 700, color: "var(--text-main)" } }, underBudgetCount)), /* @__PURE__ */ React16.createElement("div", { style: { background: "var(--hover-bg)", padding: "16px", borderRadius: "12px" } }, /* @__PURE__ */ React16.createElement("div", { style: { fontSize: "0.8rem", color: "var(--text-muted)", marginBottom: "6px" } }, "Over budget"), /* @__PURE__ */ React16.createElement("div", { style: { fontSize: "1.5rem", fontWeight: 700, color: "#ef4444" } }, overBudgetCount))), overBudgetItem && /* @__PURE__ */ React16.createElement("div", { style: {
    background: "rgba(239, 68, 68, 0.08)",
    border: "1px solid rgba(239, 68, 68, 0.2)",
    borderRadius: "12px",
    padding: "12px 16px",
    display: "flex",
    alignItems: "center",
    gap: "10px",
    color: "#dc2626",
    fontSize: "0.85rem"
  } }, /* @__PURE__ */ React16.createElement("i", { className: "ph ph-warning", style: { fontSize: "1.1rem", flexShrink: 0 } }), /* @__PURE__ */ React16.createElement("div", null, "You're over budget in ", /* @__PURE__ */ React16.createElement("strong", null, overBudgetItem.category), " by ", /* @__PURE__ */ React16.createElement("strong", null, "$", (overBudgetItem.spent - overBudgetItem.target).toFixed(2)), ". Raise the limit from the panel on the right."))), /* @__PURE__ */ React16.createElement("div", { className: "card", style: { padding: "24px" } }, /* @__PURE__ */ React16.createElement("div", { style: { display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" } }, /* @__PURE__ */ React16.createElement("i", { className: "ph ph-trend-down", style: { color: "#10b981", fontSize: "1.1rem" } }), /* @__PURE__ */ React16.createElement("h3", { style: { fontSize: "1.1rem", fontWeight: 600 } }, "Spending pace")), /* @__PURE__ */ React16.createElement("p", { style: { color: "var(--text-muted)", fontSize: "0.85rem", marginBottom: "24px" } }, "You're ", /* @__PURE__ */ React16.createElement("strong", { style: { color: "var(--text-main)" } }, "running hot"), " \u2014 85% used with 77% of the month to go."), /* @__PURE__ */ React16.createElement("div", { style: { background: "var(--hover-bg)", height: "80px", borderRadius: "12px", position: "relative", overflow: "hidden", padding: "12px" } }, /* @__PURE__ */ React16.createElement("div", { style: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    width: "35%",
    background: "rgba(37, 99, 235, 0.15)",
    borderRight: "2px solid #2563eb"
  } }), /* @__PURE__ */ React16.createElement("div", { style: { position: "absolute", top: "8px", left: "12px", fontSize: "0.7rem", fontWeight: 700, color: "var(--text-muted)", letterSpacing: "0.05em" } }, "TODAY"), /* @__PURE__ */ React16.createElement("div", { style: { position: "absolute", bottom: "8px", right: "12px", fontSize: "0.75rem", color: "var(--text-muted)" } }, "End of month")))), /* @__PURE__ */ React16.createElement("div", { style: { flex: "2 1 500px", display: "flex", flexDirection: "column", gap: "24px" } }, /* @__PURE__ */ React16.createElement("div", { className: "card", style: { padding: "24px" } }, /* @__PURE__ */ React16.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "24px" } }, /* @__PURE__ */ React16.createElement("div", null, /* @__PURE__ */ React16.createElement("h3", { style: { fontSize: "1.1rem", fontWeight: 600, marginBottom: "2px" } }, "Budget progress"), /* @__PURE__ */ React16.createElement("p", { style: { color: "var(--text-muted)", fontSize: "0.85rem" } }, "This month")), /* @__PURE__ */ React16.createElement(
    "button",
    {
      style: { background: "none", border: "none", color: "#2563eb", fontSize: "0.85rem", fontWeight: 600, cursor: "pointer" },
      onClick: () => setIsAddBudgetOpen(true)
    },
    "Manage"
  )), /* @__PURE__ */ React16.createElement("div", { style: { display: "flex", flexDirection: "column", gap: "24px" } }, budgetsList.map((b) => {
    const isOver = b.spent > b.target;
    const overAmt = b.spent - b.target;
    const pct = Math.min(100, Math.round(b.spent / b.target * 100));
    return /* @__PURE__ */ React16.createElement("div", { key: b.id, style: { display: "flex", flexDirection: "column", gap: "8px" } }, /* @__PURE__ */ React16.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center" } }, /* @__PURE__ */ React16.createElement("div", { style: { fontSize: "0.9rem", fontWeight: 600, color: "var(--text-main)" } }, b.category), /* @__PURE__ */ React16.createElement("div", { style: { fontSize: "0.85rem", color: "var(--text-muted)" } }, /* @__PURE__ */ React16.createElement("span", { style: { fontWeight: 600, color: isOver ? "#ef4444" : "var(--text-main)" } }, formatCurrency2(b.spent)), /* @__PURE__ */ React16.createElement("span", { style: { margin: "0 4px" } }, "/"), formatCurrency2(b.target))), /* @__PURE__ */ React16.createElement("div", { style: { height: "6px", background: "var(--hover-bg)", borderRadius: "99px", overflow: "hidden" } }, /* @__PURE__ */ React16.createElement("div", { style: {
      width: `${pct}%`,
      height: "100%",
      background: isOver ? "#ef4444" : b.color || "#2563eb",
      borderRadius: "99px"
    } })), isOver && /* @__PURE__ */ React16.createElement("div", { style: { fontSize: "0.75rem", color: "#ef4444", fontWeight: 500 } }, "Over by ", formatCurrency2(overAmt)));
  }))), /* @__PURE__ */ React16.createElement("div", { className: "card", style: { padding: "24px" } }, /* @__PURE__ */ React16.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" } }, /* @__PURE__ */ React16.createElement("div", { style: { display: "flex", alignItems: "center", gap: "8px" } }, /* @__PURE__ */ React16.createElement("i", { className: "ph ph-target", style: { color: "#2563eb", fontSize: "1.2rem" } }), /* @__PURE__ */ React16.createElement("h3", { style: { fontSize: "1.1rem", fontWeight: 600 } }, "Savings goals")), /* @__PURE__ */ React16.createElement(
    "button",
    {
      style: { background: "none", border: "none", color: "#2563eb", fontSize: "0.85rem", fontWeight: 600, cursor: "pointer" },
      onClick: () => setIsAddGoalOpen(true)
    },
    "+ New goal"
  )), /* @__PURE__ */ React16.createElement("div", { style: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "16px" } }, goalsList.map((goal) => {
    const pct = Math.min(100, Math.round(goal.current / goal.target * 100));
    return /* @__PURE__ */ React16.createElement("div", { key: goal.id, style: {
      background: "var(--hover-bg)",
      borderRadius: "16px",
      padding: "20px",
      display: "flex",
      flexDirection: "column",
      justify: "space-between",
      minHeight: "170px"
    } }, /* @__PURE__ */ React16.createElement("div", null, /* @__PURE__ */ React16.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" } }, /* @__PURE__ */ React16.createElement("div", { style: { fontSize: "0.9rem", fontWeight: 600, color: "var(--text-main)" } }, goal.title), /* @__PURE__ */ React16.createElement("div", { style: { fontSize: "0.7rem", fontWeight: 600, color: "var(--text-muted)", letterSpacing: "0.05em" } }, goal.date || "GOAL")), /* @__PURE__ */ React16.createElement("div", { style: { fontSize: "1.35rem", fontWeight: 700, color: "var(--text-main)", marginBottom: "2px" } }, formatCurrency2(goal.current)), /* @__PURE__ */ React16.createElement("div", { style: { fontSize: "0.8rem", color: "var(--text-muted)", marginBottom: "12px" } }, "of ", formatCurrency2(goal.target), " \xB7 ", pct, "%"), /* @__PURE__ */ React16.createElement("div", { style: { height: "6px", background: "rgba(0,0,0,0.06)", borderRadius: "99px", overflow: "hidden", marginBottom: "16px" } }, /* @__PURE__ */ React16.createElement("div", { style: { width: `${pct}%`, height: "100%", background: goal.color || "#2563eb", borderRadius: "99px" } }))), /* @__PURE__ */ React16.createElement("div", { style: { display: "flex", gap: "16px", fontSize: "0.8rem" } }, /* @__PURE__ */ React16.createElement(
      "button",
      {
        style: { background: "none", border: "none", color: "#2563eb", fontWeight: 600, cursor: "pointer", padding: 0 },
        onClick: () => handleAddGoalFunds(goal.id)
      },
      "Add funds"
    ), /* @__PURE__ */ React16.createElement(
      "button",
      {
        style: { background: "none", border: "none", color: "var(--text-muted)", cursor: "pointer", padding: 0 },
        onClick: () => handleRemoveGoal(goal.id)
      },
      "Remove"
    )));
  }))))), /* @__PURE__ */ React16.createElement(
    Modal,
    {
      isOpen: isAddBudgetOpen,
      onClose: () => setIsAddBudgetOpen(false),
      title: "Create / Manage Budget",
      subtitle: "Set monthly spending limits for expense categories",
      icon: "ph-pie-chart",
      size: "md"
    },
    /* @__PURE__ */ React16.createElement("form", { onSubmit: handleCreateBudget, style: { display: "flex", flexDirection: "column", gap: "14px" } }, /* @__PURE__ */ React16.createElement("div", { className: "form-group" }, /* @__PURE__ */ React16.createElement("label", { className: "form-label" }, "Category Name"), /* @__PURE__ */ React16.createElement(
      "input",
      {
        type: "text",
        className: "form-control",
        placeholder: "e.g. Subscriptions, Groceries...",
        value: budgetName,
        onChange: (e) => setBudgetName(e.target.value),
        required: true
      }
    )), /* @__PURE__ */ React16.createElement("div", { className: "form-group" }, /* @__PURE__ */ React16.createElement("label", { className: "form-label" }, "Monthly Target ($)"), /* @__PURE__ */ React16.createElement(
      "input",
      {
        type: "number",
        className: "form-control",
        placeholder: "500",
        value: budgetLimit,
        onChange: (e) => setBudgetLimit(e.target.value),
        required: true
      }
    )), /* @__PURE__ */ React16.createElement(
      "button",
      {
        type: "submit",
        className: "btn btn-primary",
        style: { width: "100%", padding: "12px", borderRadius: "12px", fontWeight: 700, marginTop: "4px" }
      },
      /* @__PURE__ */ React16.createElement("i", { className: "ph ph-check" }),
      " Save Budget Rule"
    ))
  ), /* @__PURE__ */ React16.createElement(
    Modal,
    {
      isOpen: isAddGoalOpen,
      onClose: () => setIsAddGoalOpen(false),
      title: "Create New Savings Goal",
      subtitle: "Track target savings for major purchases or milestones",
      icon: "ph-target",
      size: "md"
    },
    /* @__PURE__ */ React16.createElement("form", { onSubmit: handleCreateGoal, style: { display: "flex", flexDirection: "column", gap: "14px" } }, /* @__PURE__ */ React16.createElement("div", { className: "form-group" }, /* @__PURE__ */ React16.createElement("label", { className: "form-label" }, "Goal Title"), /* @__PURE__ */ React16.createElement(
      "input",
      {
        type: "text",
        className: "form-control",
        placeholder: "e.g. New Laptop, Emergency Fund...",
        value: goalTitle,
        onChange: (e) => setGoalTitle(e.target.value),
        required: true
      }
    )), /* @__PURE__ */ React16.createElement("div", { className: "form-group" }, /* @__PURE__ */ React16.createElement("label", { className: "form-label" }, "Target Amount ($)"), /* @__PURE__ */ React16.createElement(
      "input",
      {
        type: "number",
        className: "form-control",
        placeholder: "2500",
        value: goalTarget,
        onChange: (e) => setGoalTarget(e.target.value),
        required: true
      }
    )), /* @__PURE__ */ React16.createElement("div", { className: "form-group" }, /* @__PURE__ */ React16.createElement("label", { className: "form-label" }, "Target Date / Year"), /* @__PURE__ */ React16.createElement(
      "input",
      {
        type: "text",
        className: "form-control",
        placeholder: "e.g. DEC 2026",
        value: goalDate,
        onChange: (e) => setGoalDate(e.target.value)
      }
    )), /* @__PURE__ */ React16.createElement(
      "button",
      {
        type: "submit",
        className: "btn btn-primary",
        style: { width: "100%", padding: "12px", borderRadius: "12px", fontWeight: 700, marginTop: "4px" }
      },
      /* @__PURE__ */ React16.createElement("i", { className: "ph ph-plus" }),
      " Create Savings Goal"
    ))
  ));
};

// src/features/investments/InvestmentsPage.jsx
import React17, { useState as useState15 } from "react";
var watchlist = [
  { symbol: "NVDA", name: "NVIDIA", price: 812.4, trend: "+3.4%", isUp: true },
  { symbol: "TSLA", name: "Tesla", price: 248.9, trend: "-1.2%", isUp: false },
  { symbol: "GOOGL", name: "Alphabet", price: 172.6, trend: "+0.8%", isUp: true },
  { symbol: "ETH", name: "Ethereum", price: 3480.2, trend: "-0.6%", isUp: false }
];
var news = [
  { source: "BLOOMBERG", time: "2H AGO", title: "Apple beats Q3 estimates on Services growth" },
  { source: "REUTERS", time: "4H AGO", title: "Fed signals two more cuts likely this year" },
  { source: "THE VERGE", time: "8H AGO", title: "Vision Pro 2 rumored for spring launch" },
  { source: "WSJ", time: "1D AGO", title: "S&P 500 closes at new high, led by tech" }
];
var InvestmentsPage = () => {
  const { investments, buyInvestment, sellInvestment, showToast } = useDb();
  const [isModalOpen, setIsModalOpen] = useState15(false);
  const [modalMode, setModalMode] = useState15("buy");
  const [selectedAsset, setSelectedAsset] = useState15(null);
  const [amountInput, setAmountInput] = useState15("100");
  const [watchlistItems, setWatchlistItems] = useState15(watchlist);
  const totalValue = investments.reduce((acc, i) => acc + (i.value || 0), 0);
  const handleOpenBuy = (asset = investments[0]) => {
    setSelectedAsset(asset);
    setModalMode("buy");
    setIsModalOpen(true);
  };
  const handleOpenSell = (asset = investments[0]) => {
    setSelectedAsset(asset);
    setModalMode("sell");
    setIsModalOpen(true);
  };
  const handleTradeSubmit = (e) => {
    e.preventDefault();
    const amt = parseFloat(amountInput);
    if (!selectedAsset || isNaN(amt) || amt <= 0) return;
    if (modalMode === "buy") {
      buyInvestment(selectedAsset.id, amt);
    } else {
      sellInvestment(selectedAsset.id, amt);
    }
    setIsModalOpen(false);
    setAmountInput("100");
  };
  const handleRemoveWatchlist = (symbol) => {
    setWatchlistItems(watchlistItems.filter((item) => item.symbol !== symbol));
    showToast(`Removed ${symbol} from watchlist`);
  };
  const handleAddWatchlist = (e) => {
    e.preventDefault();
    const symbol = prompt("Enter Ticker Symbol to add to Watchlist (e.g. AMD, AMZN):");
    if (!symbol) return;
    const cleanSym = symbol.toUpperCase().trim();
    const newItem = {
      symbol: cleanSym,
      name: `${cleanSym} Asset`,
      price: Math.round((Math.random() * 200 + 50) * 100) / 100,
      trend: "+1.5%",
      isUp: true
    };
    setWatchlistItems([...watchlistItems, newItem]);
    showToast(`Added ${cleanSym} to Watchlist`);
  };
  const formatCurrency2 = (val) => "$" + val.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  return /* @__PURE__ */ React17.createElement("div", { style: { display: "flex", flexDirection: "column", gap: "24px", paddingBottom: "40px" } }, /* @__PURE__ */ React17.createElement("div", null, /* @__PURE__ */ React17.createElement("h2", { style: { fontSize: "1.5rem", fontWeight: 700, marginBottom: "4px" } }, "Investments"), /* @__PURE__ */ React17.createElement("p", { style: { color: "var(--text-muted)", fontSize: "0.9rem" } }, "Your portfolio, allocations, holdings, and market pulse.")), /* @__PURE__ */ React17.createElement("div", { style: { display: "flex", flexWrap: "wrap", gap: "24px" } }, /* @__PURE__ */ React17.createElement("div", { style: { flex: "1 1 400px", display: "flex", flexDirection: "column", gap: "24px" } }, /* @__PURE__ */ React17.createElement("div", { className: "card", style: { padding: "24px", flex: 1 } }, /* @__PURE__ */ React17.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "8px" } }, /* @__PURE__ */ React17.createElement("h3", { style: { fontSize: "1.1rem", fontWeight: 600 } }, "Investments"), /* @__PURE__ */ React17.createElement("div", { style: { background: "var(--badge-green-bg)", color: "var(--badge-green-text)", padding: "4px 10px", borderRadius: "99px", fontSize: "0.8rem", fontWeight: 600 } }, "+0.31% today")), /* @__PURE__ */ React17.createElement("p", { style: { color: "var(--text-muted)", fontSize: "0.85rem", marginBottom: "24px" } }, "Total portfolio value"), /* @__PURE__ */ React17.createElement("h1", { style: { fontSize: "2.5rem", fontWeight: 700, letterSpacing: "-0.03em", color: "var(--text-main)", marginBottom: "4px" } }, formatCurrency2(totalValue)), /* @__PURE__ */ React17.createElement("div", { style: { fontSize: "0.9rem", color: "var(--text-muted)", marginBottom: "24px" } }, "+$99.10 today"), /* @__PURE__ */ React17.createElement("div", { style: { display: "flex", gap: "12px", marginBottom: "32px" } }, /* @__PURE__ */ React17.createElement("button", { className: "btn-primary", style: { flex: 1, padding: "12px", fontSize: "0.95rem" }, onClick: () => handleOpenBuy(investments[0]) }, "Buy"), /* @__PURE__ */ React17.createElement(
    "button",
    {
      style: { flex: 1, padding: "12px", fontSize: "0.95rem", background: "transparent", border: "1px solid var(--border-color)", borderRadius: "99px", color: "var(--text-main)", fontWeight: 600, cursor: "pointer" },
      onClick: () => handleOpenSell(investments[0])
    },
    "Sell"
  )), /* @__PURE__ */ React17.createElement("div", { style: { height: "8px", width: "100%", display: "flex", borderRadius: "99px", overflow: "hidden", marginBottom: "24px" } }, investments.map((inv) => /* @__PURE__ */ React17.createElement("div", { key: inv.id, style: { width: `${inv.pctShare}%`, background: inv.color, height: "100%" } }))), /* @__PURE__ */ React17.createElement("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "32px" } }, investments.map((inv) => /* @__PURE__ */ React17.createElement("div", { key: inv.id, style: { display: "flex", justifyContent: "space-between", alignItems: "center" } }, /* @__PURE__ */ React17.createElement("div", { style: { display: "flex", alignItems: "center", gap: "8px", fontSize: "0.85rem", color: "var(--text-muted)" } }, /* @__PURE__ */ React17.createElement("div", { style: { width: "6px", height: "6px", borderRadius: "50%", background: inv.color } }), inv.symbol), /* @__PURE__ */ React17.createElement("div", { style: { fontSize: "0.85rem", fontWeight: 500, color: "var(--text-muted)" } }, inv.pctShare, "%")))), /* @__PURE__ */ React17.createElement("div", { style: { borderTop: "1px solid var(--border-color)", paddingTop: "24px", display: "flex", flexDirection: "column", gap: "20px" } }, investments.map((inv) => /* @__PURE__ */ React17.createElement("div", { key: inv.id, style: { display: "flex", justifyContent: "space-between", alignItems: "center" } }, /* @__PURE__ */ React17.createElement("div", null, /* @__PURE__ */ React17.createElement("div", { style: { fontSize: "0.95rem", fontWeight: 600, color: "var(--text-main)" } }, inv.symbol), /* @__PURE__ */ React17.createElement("div", { style: { fontSize: "0.85rem", color: "var(--text-muted)" } }, inv.name)), /* @__PURE__ */ React17.createElement("div", { style: { textAlign: "right" } }, /* @__PURE__ */ React17.createElement("div", { style: { fontSize: "0.95rem", fontWeight: 600, color: "var(--text-main)" } }, formatCurrency2(inv.value)), /* @__PURE__ */ React17.createElement("div", { style: { fontSize: "0.85rem", color: inv.isPositive ? "#10b981" : "#ef4444", display: "flex", alignItems: "center", justifyContent: "flex-end", gap: "4px" } }, /* @__PURE__ */ React17.createElement("i", { className: inv.isPositive ? "ph ph-trend-up" : "ph ph-trend-down" }), " ", inv.returnPct))))))), /* @__PURE__ */ React17.createElement("div", { style: { flex: "2 1 600px", display: "flex", flexDirection: "column", gap: "24px" } }, /* @__PURE__ */ React17.createElement("div", { className: "card", style: { padding: "24px" } }, /* @__PURE__ */ React17.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "24px" } }, /* @__PURE__ */ React17.createElement("div", null, /* @__PURE__ */ React17.createElement("h3", { style: { fontSize: "1.1rem", fontWeight: 600, marginBottom: "4px" } }, "All holdings"), /* @__PURE__ */ React17.createElement("p", { style: { color: "var(--text-muted)", fontSize: "0.85rem" } }, investments.length, " positions \xB7 ", formatCurrency2(totalValue), " market value")), /* @__PURE__ */ React17.createElement(
    "button",
    {
      className: "btn-primary",
      style: { padding: "8px 16px", fontSize: "0.85rem", width: "auto" },
      onClick: () => handleOpenBuy(investments[0])
    },
    "+ Buy"
  )), /* @__PURE__ */ React17.createElement("div", { style: { display: "flex", flexDirection: "column" } }, investments.map((inv, idx) => /* @__PURE__ */ React17.createElement("div", { key: inv.id, style: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "16px 0",
    borderBottom: idx !== investments.length - 1 ? "1px solid var(--border-color)" : "none"
  } }, /* @__PURE__ */ React17.createElement("div", { style: { display: "flex", alignItems: "center", gap: "16px" } }, /* @__PURE__ */ React17.createElement("div", { style: { width: "40px", height: "40px", borderRadius: "50%", background: `${inv.color}15`, color: inv.color, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: "0.85rem" } }, inv.symbol.substring(0, 2)), /* @__PURE__ */ React17.createElement("div", null, /* @__PURE__ */ React17.createElement("div", { style: { fontSize: "0.95rem", fontWeight: 600, color: "var(--text-main)", marginBottom: "2px" } }, inv.symbol), /* @__PURE__ */ React17.createElement("div", { style: { fontSize: "0.85rem", color: "var(--text-muted)" } }, inv.name))), /* @__PURE__ */ React17.createElement("div", { style: { display: "flex", alignItems: "center", gap: "24px" } }, /* @__PURE__ */ React17.createElement("div", { style: { textAlign: "right" } }, /* @__PURE__ */ React17.createElement("div", { style: { fontSize: "0.95rem", fontWeight: 600, color: "var(--text-main)", marginBottom: "2px" } }, formatCurrency2(inv.value)), /* @__PURE__ */ React17.createElement("div", { style: { fontSize: "0.85rem", color: inv.isPositive ? "#10b981" : "#ef4444", display: "flex", alignItems: "center", justifyContent: "flex-end", gap: "4px" } }, /* @__PURE__ */ React17.createElement("i", { className: inv.isPositive ? "ph ph-trend-up" : "ph ph-trend-down" }), " ", inv.returnPct)), /* @__PURE__ */ React17.createElement(
    "button",
    {
      style: { padding: "6px 12px", fontSize: "0.85rem", background: "transparent", border: "1px solid var(--border-color)", borderRadius: "8px", color: "var(--text-main)", fontWeight: 500, cursor: "pointer" },
      onClick: () => handleOpenSell(inv)
    },
    "Sell"
  )))))), /* @__PURE__ */ React17.createElement("div", { className: "card", style: { padding: "24px" } }, /* @__PURE__ */ React17.createElement("h3", { style: { fontSize: "1.1rem", fontWeight: 600, marginBottom: "4px" } }, "Allocation breakdown"), /* @__PURE__ */ React17.createElement("p", { style: { color: "var(--text-muted)", fontSize: "0.85rem", marginBottom: "24px" } }, "Share of total market value"), /* @__PURE__ */ React17.createElement("div", { style: { display: "flex", flexDirection: "column", gap: "24px" } }, investments.map((inv) => /* @__PURE__ */ React17.createElement("div", { key: inv.id, style: { display: "flex", flexDirection: "column", gap: "8px" } }, /* @__PURE__ */ React17.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center" } }, /* @__PURE__ */ React17.createElement("div", { style: { fontSize: "0.9rem", fontWeight: 600, color: "var(--text-main)" } }, inv.symbol), /* @__PURE__ */ React17.createElement("div", { style: { fontSize: "0.85rem", color: "var(--text-muted)" } }, inv.pctShare, "%")), /* @__PURE__ */ React17.createElement("div", { style: { height: "6px", width: "100%", background: "var(--hover-bg)", borderRadius: "99px", overflow: "hidden" } }, /* @__PURE__ */ React17.createElement("div", { style: { height: "100%", width: `${inv.pctShare}%`, background: inv.color, borderRadius: "99px" } })))))), /* @__PURE__ */ React17.createElement("div", { style: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "24px" } }, /* @__PURE__ */ React17.createElement("div", { className: "card", style: { padding: "24px" } }, /* @__PURE__ */ React17.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "24px" } }, /* @__PURE__ */ React17.createElement("div", null, /* @__PURE__ */ React17.createElement("h3", { style: { fontSize: "1.1rem", fontWeight: 600, marginBottom: "4px" } }, "Watchlist"), /* @__PURE__ */ React17.createElement("p", { style: { color: "var(--text-muted)", fontSize: "0.85rem" } }, "Following \xB7 live prices")), /* @__PURE__ */ React17.createElement("button", { onClick: handleAddWatchlist, style: { background: "none", border: "none", fontSize: "0.85rem", fontWeight: 500, color: "var(--accent-blue)", cursor: "pointer" } }, "+ Add")), /* @__PURE__ */ React17.createElement("div", { style: { display: "flex", flexDirection: "column" } }, watchlistItems.map((item, idx) => /* @__PURE__ */ React17.createElement("div", { key: item.symbol, style: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "16px 0",
    borderBottom: idx !== watchlistItems.length - 1 ? "1px solid var(--border-color)" : "none"
  } }, /* @__PURE__ */ React17.createElement("div", null, /* @__PURE__ */ React17.createElement("div", { style: { fontSize: "0.95rem", fontWeight: 600, color: "var(--text-main)" } }, item.symbol), /* @__PURE__ */ React17.createElement("div", { style: { fontSize: "0.8rem", color: "var(--text-muted)" } }, item.name)), /* @__PURE__ */ React17.createElement("div", { style: { display: "flex", alignItems: "center", gap: "16px" } }, /* @__PURE__ */ React17.createElement("div", { style: { textAlign: "right" } }, /* @__PURE__ */ React17.createElement("div", { style: { fontSize: "0.95rem", fontWeight: 600, color: "var(--text-main)" } }, "$", item.price.toFixed(2)), /* @__PURE__ */ React17.createElement("div", { style: { fontSize: "0.8rem", color: item.isUp ? "#10b981" : "#ef4444" } }, item.trend)), /* @__PURE__ */ React17.createElement(
    "button",
    {
      style: { padding: "4px 10px", fontSize: "0.75rem", background: "transparent", border: "1px solid var(--border-color)", borderRadius: "99px", color: "var(--text-main)", cursor: "pointer" },
      onClick: () => handleOpenBuy({ id: "inv-1", symbol: item.symbol, name: item.name, currentPrice: item.price })
    },
    "Buy"
  ), /* @__PURE__ */ React17.createElement(
    "button",
    {
      style: { background: "none", border: "none", color: "var(--text-subtle)", cursor: "pointer", display: "flex" },
      onClick: () => handleRemoveWatchlist(item.symbol),
      title: "Remove from watchlist"
    },
    /* @__PURE__ */ React17.createElement("i", { className: "ph ph-x" })
  )))))), /* @__PURE__ */ React17.createElement("div", { className: "card", style: { padding: "24px" } }, /* @__PURE__ */ React17.createElement("h3", { style: { fontSize: "1.1rem", fontWeight: 600, marginBottom: "24px", display: "flex", alignItems: "center", gap: "8px" } }, /* @__PURE__ */ React17.createElement("i", { className: "ph ph-newspaper", style: { color: "var(--accent-blue)" } }), " Market news"), /* @__PURE__ */ React17.createElement("div", { style: { display: "flex", flexDirection: "column", gap: "20px" } }, news.map((item, idx) => /* @__PURE__ */ React17.createElement("div", { key: idx, style: { display: "flex", flexDirection: "column", gap: "4px" } }, /* @__PURE__ */ React17.createElement("div", { style: { display: "flex", alignItems: "center", gap: "8px", fontSize: "0.75rem", color: "var(--text-muted)", letterSpacing: "0.05em" } }, /* @__PURE__ */ React17.createElement("span", { style: { fontWeight: 600 } }, item.source), /* @__PURE__ */ React17.createElement("span", null, "\xB7"), /* @__PURE__ */ React17.createElement("span", null, item.time)), /* @__PURE__ */ React17.createElement("div", { style: { fontSize: "0.95rem", fontWeight: 500, color: "var(--text-main)", lineHeight: 1.4 } }, item.title)))))))), /* @__PURE__ */ React17.createElement(
    Modal,
    {
      isOpen: isModalOpen,
      onClose: () => setIsModalOpen(false),
      title: `${modalMode === "buy" ? "Buy" : "Sell"} ${selectedAsset ? selectedAsset.symbol : "Asset"}`,
      subtitle: `Execute instant ${modalMode === "buy" ? "buying" : "selling"} transaction at market price`,
      icon: modalMode === "buy" ? "ph-trend-up" : "ph-trend-down",
      size: "md"
    },
    /* @__PURE__ */ React17.createElement("form", { onSubmit: handleTradeSubmit, style: { display: "flex", flexDirection: "column", gap: "14px" } }, /* @__PURE__ */ React17.createElement("div", { className: "form-group" }, /* @__PURE__ */ React17.createElement("label", { className: "form-label" }, modalMode === "buy" ? "Purchase" : "Sell", " Amount ($)"), /* @__PURE__ */ React17.createElement(
      "input",
      {
        type: "number",
        step: "0.01",
        className: "form-control",
        value: amountInput,
        onChange: (e) => setAmountInput(e.target.value),
        required: true,
        style: { fontSize: "1.2rem", fontWeight: 700 }
      }
    )), /* @__PURE__ */ React17.createElement(
      "button",
      {
        type: "submit",
        className: "btn btn-primary",
        style: {
          width: "100%",
          padding: "12px",
          borderRadius: "12px",
          fontWeight: 700,
          background: modalMode === "buy" ? "var(--accent-blue)" : "#ef4444",
          borderColor: modalMode === "buy" ? "var(--accent-blue)" : "#ef4444",
          boxShadow: modalMode === "buy" ? "0 4px 16px rgba(37, 99, 235, 0.3)" : "0 4px 16px rgba(239, 68, 68, 0.3)",
          marginTop: "4px"
        }
      },
      /* @__PURE__ */ React17.createElement("i", { className: `ph ${modalMode === "buy" ? "ph-shopping-cart-simple" : "ph-currency-dollar"}` }),
      " Confirm ",
      modalMode === "buy" ? "Purchase" : "Sale",
      " ($",
      amountInput || 0,
      ")"
    ))
  ));
};

// src/features/reports/ReportsPage.jsx
import React18 from "react";
var monthlyStatements = [
  { period: "Dec 2026", income: 8500, expenses: 4200, net: 5300 },
  { period: "Nov 2026", income: 9200, expenses: 4e3, net: 5200 },
  { period: "Oct 2026", income: 8900, expenses: 3800, net: 5100 },
  { period: "Sep 2026", income: 8300, expenses: 3600, net: 4700 },
  { period: "Aug 2026", income: 8600, expenses: 3450, net: 5150 },
  { period: "Jul 2026", income: 8420, expenses: 3240, net: 5180 },
  { period: "Jun 2026", income: 8100, expenses: 3500, net: 4600 },
  { period: "May 2026", income: 7800, expenses: 3300, net: 4500 },
  { period: "Apr 2026", income: 7100, expenses: 3600, net: 3500 },
  { period: "Mar 2026", income: 7200, expenses: 3400, net: 3800 },
  { period: "Feb 2026", income: 6800, expenses: 2900, net: 3900 },
  { period: "Jan 2026", income: 6200, expenses: 3100, net: 3100 }
];
var ReportsPage = () => {
  const { transactions, showToast } = useDb();
  const handleExportStatement = (period) => {
    showToast(`Opening printable PDF statement for ${period}...`);
    setTimeout(() => {
      window.print();
    }, 300);
  };
  const handleExportAll = () => {
    let csvContent = "Period,Income,Expenses,Net\n";
    monthlyStatements.forEach((row) => {
      csvContent += `"${row.period}","$${row.income.toFixed(2)}","$${row.expenses.toFixed(2)}","$${row.net.toFixed(2)}"
`;
    });
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `Finly_Full_Financial_Report_2026.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast("Downloaded full 2026 financial report CSV");
  };
  const handleQuickExport = (type) => {
    if (type.includes("CSV")) {
      handleExportAll();
    } else {
      showToast(`Generating ${type}...`);
      setTimeout(() => {
        window.print();
      }, 300);
    }
  };
  const formatCurrency2 = (val) => "$" + val.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  return /* @__PURE__ */ React18.createElement("div", { style: { display: "flex", flexDirection: "column", gap: "24px", paddingBottom: "40px" } }, /* @__PURE__ */ React18.createElement("div", null, /* @__PURE__ */ React18.createElement("h2", { style: { fontSize: "1.5rem", fontWeight: 700, marginBottom: "4px" } }, "Reports"), /* @__PURE__ */ React18.createElement("p", { style: { color: "var(--text-muted)", fontSize: "0.9rem" } }, "Statements, exports, and year-to-date summaries.")), /* @__PURE__ */ React18.createElement("div", { style: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "20px" } }, /* @__PURE__ */ React18.createElement("div", { className: "card", style: { padding: "20px" } }, /* @__PURE__ */ React18.createElement("div", { style: { display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" } }, /* @__PURE__ */ React18.createElement("div", { style: { width: "8px", height: "8px", borderRadius: "50%", background: "#2563eb" } }), /* @__PURE__ */ React18.createElement("span", { style: { fontSize: "0.8rem", color: "var(--text-muted)" } }, "YTD income")), /* @__PURE__ */ React18.createElement("div", { style: { fontSize: "1.6rem", fontWeight: 700, color: "var(--text-main)" } }, "$96,120.00")), /* @__PURE__ */ React18.createElement("div", { className: "card", style: { padding: "20px" } }, /* @__PURE__ */ React18.createElement("div", { style: { display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" } }, /* @__PURE__ */ React18.createElement("div", { style: { width: "8px", height: "8px", borderRadius: "50%", background: "#ef4444" } }), /* @__PURE__ */ React18.createElement("span", { style: { fontSize: "0.8rem", color: "var(--text-muted)" } }, "YTD expenses")), /* @__PURE__ */ React18.createElement("div", { style: { fontSize: "1.6rem", fontWeight: 700, color: "var(--text-main)" } }, "$42,090.00")), /* @__PURE__ */ React18.createElement("div", { className: "card", style: { padding: "20px" } }, /* @__PURE__ */ React18.createElement("div", { style: { display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" } }, /* @__PURE__ */ React18.createElement("div", { style: { width: "8px", height: "8px", borderRadius: "50%", background: "#10b981" } }), /* @__PURE__ */ React18.createElement("span", { style: { fontSize: "0.8rem", color: "var(--text-muted)" } }, "YTD savings")), /* @__PURE__ */ React18.createElement("div", { style: { fontSize: "1.6rem", fontWeight: 700, color: "var(--text-main)" } }, "$54,030.00")), /* @__PURE__ */ React18.createElement("div", { className: "card", style: { padding: "20px" } }, /* @__PURE__ */ React18.createElement("div", { style: { display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" } }, /* @__PURE__ */ React18.createElement("div", { style: { width: "8px", height: "8px", borderRadius: "50%", background: "#8b5cf6" } }), /* @__PURE__ */ React18.createElement("span", { style: { fontSize: "0.8rem", color: "var(--text-muted)" } }, "Savings rate")), /* @__PURE__ */ React18.createElement("div", { style: { fontSize: "1.6rem", fontWeight: 700, color: "var(--text-main)" } }, "56%"))), /* @__PURE__ */ React18.createElement("div", { style: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "20px" } }, /* @__PURE__ */ React18.createElement(
    "div",
    {
      className: "card",
      style: { padding: "24px", cursor: "pointer", transition: "all 0.2s" },
      onClick: () => handleQuickExport("Full PDF Statement")
    },
    /* @__PURE__ */ React18.createElement("div", { style: { width: "40px", height: "40px", borderRadius: "12px", background: "var(--hover-bg)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "16px" } }, /* @__PURE__ */ React18.createElement("i", { className: "ph ph-file-text", style: { fontSize: "1.2rem", color: "var(--text-main)" } })),
    /* @__PURE__ */ React18.createElement("h4", { style: { fontSize: "1rem", fontWeight: 600, marginBottom: "4px", color: "var(--text-main)" } }, "Full statement"),
    /* @__PURE__ */ React18.createElement("p", { style: { fontSize: "0.85rem", color: "var(--text-muted)" } }, "Every transaction, categorised, PDF.")
  ), /* @__PURE__ */ React18.createElement(
    "div",
    {
      className: "card",
      style: { padding: "24px", cursor: "pointer", transition: "all 0.2s" },
      onClick: () => handleQuickExport("CSV Data Export")
    },
    /* @__PURE__ */ React18.createElement("div", { style: { width: "40px", height: "40px", borderRadius: "12px", background: "var(--hover-bg)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "16px" } }, /* @__PURE__ */ React18.createElement("i", { className: "ph ph-table", style: { fontSize: "1.2rem", color: "var(--text-main)" } })),
    /* @__PURE__ */ React18.createElement("h4", { style: { fontSize: "1rem", fontWeight: 600, marginBottom: "4px", color: "var(--text-main)" } }, "CSV export"),
    /* @__PURE__ */ React18.createElement("p", { style: { fontSize: "0.85rem", color: "var(--text-muted)" } }, "Raw data for Excel, Numbers, or Sheets.")
  ), /* @__PURE__ */ React18.createElement(
    "div",
    {
      className: "card",
      style: { padding: "24px", cursor: "pointer", transition: "all 0.2s" },
      onClick: () => handleQuickExport("Tax Bundle Package")
    },
    /* @__PURE__ */ React18.createElement("div", { style: { width: "40px", height: "40px", borderRadius: "12px", background: "var(--hover-bg)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "16px" } }, /* @__PURE__ */ React18.createElement("i", { className: "ph ph-receipt", style: { fontSize: "1.2rem", color: "var(--text-main)" } })),
    /* @__PURE__ */ React18.createElement("h4", { style: { fontSize: "1rem", fontWeight: 600, marginBottom: "4px", color: "var(--text-main)" } }, "Tax package"),
    /* @__PURE__ */ React18.createElement("p", { style: { fontSize: "0.85rem", color: "var(--text-muted)" } }, "1099s, interest, dividends \u2014 bundled.")
  )), /* @__PURE__ */ React18.createElement("div", { className: "card", style: { padding: "24px" } }, /* @__PURE__ */ React18.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "24px", flexWrap: "wrap", gap: "16px" } }, /* @__PURE__ */ React18.createElement("div", null, /* @__PURE__ */ React18.createElement("h3", { style: { fontSize: "1.1rem", fontWeight: 600, marginBottom: "4px" } }, "Monthly statements"), /* @__PURE__ */ React18.createElement("p", { style: { color: "var(--text-muted)", fontSize: "0.85rem", display: "flex", alignItems: "center", gap: "6px" } }, /* @__PURE__ */ React18.createElement("i", { className: "ph ph-file-text" }), " Automatically generated on the 1st of each month")), /* @__PURE__ */ React18.createElement(
    "button",
    {
      className: "btn-primary",
      style: { width: "auto", padding: "8px 16px", fontSize: "0.85rem", display: "flex", alignItems: "center", gap: "6px" },
      onClick: handleExportAll
    },
    /* @__PURE__ */ React18.createElement("i", { className: "ph ph-download-simple" }),
    " Export all"
  )), /* @__PURE__ */ React18.createElement("div", { className: "table-responsive-wrapper", style: { overflowX: "auto" } }, /* @__PURE__ */ React18.createElement("table", { style: { width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: "0.9rem" } }, /* @__PURE__ */ React18.createElement("thead", null, /* @__PURE__ */ React18.createElement("tr", { style: { borderBottom: "1px solid var(--border-color)", color: "var(--text-subtle)", fontSize: "0.75rem", fontWeight: 600, letterSpacing: "0.05em" } }, /* @__PURE__ */ React18.createElement("th", { style: { padding: "12px 16px", fontWeight: 600 } }, "PERIOD"), /* @__PURE__ */ React18.createElement("th", { style: { padding: "12px 16px", fontWeight: 600 } }, "INCOME"), /* @__PURE__ */ React18.createElement("th", { style: { padding: "12px 16px", fontWeight: 600 } }, "EXPENSES"), /* @__PURE__ */ React18.createElement("th", { style: { padding: "12px 16px", fontWeight: 600 } }, "NET"), /* @__PURE__ */ React18.createElement("th", { style: { padding: "12px 16px", fontWeight: 600, textAlign: "right" } }, "STATEMENT"))), /* @__PURE__ */ React18.createElement("tbody", null, monthlyStatements.map((row, idx) => /* @__PURE__ */ React18.createElement(
    "tr",
    {
      key: row.period,
      style: {
        borderBottom: idx !== monthlyStatements.length - 1 ? "1px solid var(--border-color)" : "none",
        transition: "background 0.15s"
      }
    },
    /* @__PURE__ */ React18.createElement("td", { style: { padding: "16px", fontWeight: 600, color: "var(--text-main)" } }, row.period),
    /* @__PURE__ */ React18.createElement("td", { style: { padding: "16px", color: "var(--text-muted)" } }, formatCurrency2(row.income)),
    /* @__PURE__ */ React18.createElement("td", { style: { padding: "16px", color: "var(--text-muted)" } }, formatCurrency2(row.expenses)),
    /* @__PURE__ */ React18.createElement("td", { style: { padding: "16px", color: "#10b981", fontWeight: 600 } }, "+", formatCurrency2(row.net)),
    /* @__PURE__ */ React18.createElement("td", { style: { padding: "16px", textAlign: "right" } }, /* @__PURE__ */ React18.createElement(
      "button",
      {
        style: {
          background: "none",
          border: "none",
          color: "var(--accent-blue)",
          fontSize: "0.85rem",
          fontWeight: 600,
          cursor: "pointer",
          display: "inline-flex",
          alignItems: "center",
          gap: "4px"
        },
        onClick: () => handleExportStatement(row.period)
      },
      /* @__PURE__ */ React18.createElement("i", { className: "ph ph-file-pdf", style: { fontSize: "1rem" } }),
      " PDF"
    ))
  )))))));
};

// src/features/settings/SettingsPage.jsx
import React19, { useState as useState16 } from "react";
var ToggleSwitch = ({ checked, onChange }) => /* @__PURE__ */ React19.createElement(
  "div",
  {
    onClick: () => onChange(!checked),
    style: {
      width: "44px",
      height: "24px",
      background: checked ? "#10b981" : "var(--border-color)",
      borderRadius: "99px",
      padding: "2px",
      cursor: "pointer",
      transition: "background 0.2s ease",
      display: "flex",
      alignItems: "center",
      justifyContent: checked ? "flex-end" : "flex-start",
      flexShrink: 0
    }
  },
  /* @__PURE__ */ React19.createElement("div", { style: {
    width: "20px",
    height: "20px",
    background: "#ffffff",
    borderRadius: "50%",
    boxShadow: "0 1px 3px rgba(0,0,0,0.2)"
  } })
);
var SettingsPage = () => {
  const { user, logout, toggleBalancePrivacy } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const { saveSettings, showToast } = useDb();
  const [name, setName] = useState16(user ? user.name : "Rahim Ali Fahryan");
  const [email, setEmail] = useState16(user ? user.email : "fahryan.rahim9@gmail.com");
  const [currency, setCurrency] = useState16("USD");
  const [language, setLanguage] = useState16("English (US)");
  const [twoFactor, setTwoFactor] = useState16(true);
  const [txAlerts, setTxAlerts] = useState16(true);
  const [budgetWarnings, setBudgetWarnings] = useState16(true);
  const [weeklyDigest, setWeeklyDigest] = useState16(false);
  const handleSave = async () => {
    await saveSettings({
      currency,
      language,
      notifications: { txAlerts, budgetWarnings, weeklyDigest },
      security: { twoFactor }
    });
    if (user && typeof window !== "undefined") {
      const parts = name.split(" ");
      const initials2 = parts.length > 1 ? parts[0][0].toUpperCase() + parts[parts.length - 1][0].toUpperCase() : "RA";
      const updatedUser = { ...user, name, email, avatarInitials: initials2 };
      sessionStorage.setItem("finly_user", JSON.stringify(updatedUser));
      localStorage.setItem("finly_user", JSON.stringify(updatedUser));
    }
  };
  const handleChangePassword = () => {
    const newPass = prompt("Enter your new password (min 6 characters):");
    if (newPass && newPass.length >= 6) {
      showToast("Password changed successfully");
    } else if (newPass) {
      alert("Password must be at least 6 characters");
    }
  };
  const handleResetData = () => {
    if (confirm("Are you sure you want to reset all demo data to default?")) {
      if (typeof window !== "undefined") {
        indexedDB.deleteDatabase("FinlyDB");
        sessionStorage.clear();
        localStorage.clear();
        window.location.reload();
      }
    }
  };
  const initials = user && user.avatarInitials ? user.avatarInitials : name ? name.split(" ").map((n) => n[0]).join("").substring(0, 2).toUpperCase() : "RA";
  return /* @__PURE__ */ React19.createElement("div", { style: { display: "flex", flexDirection: "column", gap: "24px", paddingBottom: "40px" } }, /* @__PURE__ */ React19.createElement("div", null, /* @__PURE__ */ React19.createElement("h2", { style: { fontSize: "1.5rem", fontWeight: 700, marginBottom: "4px" } }, "Settings"), /* @__PURE__ */ React19.createElement("p", { style: { color: "var(--text-muted)", fontSize: "0.9rem" } }, "Preferences, security, and notifications.")), /* @__PURE__ */ React19.createElement("div", { style: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(380px, 1fr))", gap: "24px" } }, /* @__PURE__ */ React19.createElement("div", { className: "card", style: { padding: "24px" } }, /* @__PURE__ */ React19.createElement("h3", { style: { fontSize: "1.1rem", fontWeight: 600, marginBottom: "2px" } }, "Profile"), /* @__PURE__ */ React19.createElement("p", { style: { color: "var(--text-muted)", fontSize: "0.85rem", marginBottom: "24px" } }, "How Finly addresses you."), /* @__PURE__ */ React19.createElement("div", { style: { display: "flex", alignItems: "center", gap: "16px", marginBottom: "24px" } }, /* @__PURE__ */ React19.createElement("div", { style: {
    width: "48px",
    height: "48px",
    borderRadius: "50%",
    background: "#2563eb",
    color: "#ffffff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: 700,
    fontSize: "1.1rem"
  } }, initials), /* @__PURE__ */ React19.createElement("div", null, /* @__PURE__ */ React19.createElement("div", { style: { fontSize: "1rem", fontWeight: 600, color: "var(--text-main)" } }, name), /* @__PURE__ */ React19.createElement("div", { style: { fontSize: "0.85rem", color: "var(--text-muted)" } }, email))), /* @__PURE__ */ React19.createElement("div", { style: { display: "flex", flexDirection: "column", gap: "16px" } }, /* @__PURE__ */ React19.createElement("div", null, /* @__PURE__ */ React19.createElement("label", { style: { display: "block", fontSize: "0.75rem", fontWeight: 700, color: "var(--text-muted)", marginBottom: "6px", letterSpacing: "0.05em" } }, "DISPLAY NAME"), /* @__PURE__ */ React19.createElement(
    "input",
    {
      type: "text",
      value: name,
      onChange: (e) => setName(e.target.value),
      style: {
        width: "100%",
        padding: "12px 16px",
        borderRadius: "12px",
        border: "1px solid var(--border-color)",
        background: "var(--hover-bg)",
        color: "var(--text-main)",
        fontSize: "0.9rem",
        outline: "none"
      }
    }
  )), /* @__PURE__ */ React19.createElement("div", null, /* @__PURE__ */ React19.createElement("label", { style: { display: "block", fontSize: "0.75rem", fontWeight: 700, color: "var(--text-muted)", marginBottom: "6px", letterSpacing: "0.05em" } }, "EMAIL"), /* @__PURE__ */ React19.createElement(
    "input",
    {
      type: "email",
      value: email,
      onChange: (e) => setEmail(e.target.value),
      style: {
        width: "100%",
        padding: "12px 16px",
        borderRadius: "12px",
        border: "1px solid var(--border-color)",
        background: "var(--hover-bg)",
        color: "var(--text-main)",
        fontSize: "0.9rem",
        outline: "none"
      }
    }
  )))), /* @__PURE__ */ React19.createElement("div", { className: "card", style: { padding: "24px" } }, /* @__PURE__ */ React19.createElement("h3", { style: { fontSize: "1.1rem", fontWeight: 600, marginBottom: "2px" } }, "Preferences"), /* @__PURE__ */ React19.createElement("p", { style: { color: "var(--text-muted)", fontSize: "0.85rem", marginBottom: "24px" } }, "Regional defaults for numbers and dates."), /* @__PURE__ */ React19.createElement("div", { style: { display: "flex", flexDirection: "column", gap: "20px" } }, /* @__PURE__ */ React19.createElement("div", null, /* @__PURE__ */ React19.createElement("label", { style: { display: "block", fontSize: "0.75rem", fontWeight: 700, color: "var(--text-muted)", marginBottom: "8px", letterSpacing: "0.05em" } }, "CURRENCY"), /* @__PURE__ */ React19.createElement("div", { style: { display: "flex", gap: "8px" } }, ["USD", "EUR", "IDR"].map((c) => /* @__PURE__ */ React19.createElement(
    "button",
    {
      key: c,
      onClick: () => setCurrency(c),
      style: {
        padding: "6px 16px",
        borderRadius: "99px",
        border: "none",
        background: currency === c ? "var(--text-main)" : "transparent",
        color: currency === c ? "var(--bg-card)" : "var(--text-muted)",
        fontWeight: 600,
        fontSize: "0.85rem",
        cursor: "pointer",
        boxShadow: currency === c ? "0 1px 3px rgba(0,0,0,0.1)" : "none"
      }
    },
    c
  )))), /* @__PURE__ */ React19.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center" } }, /* @__PURE__ */ React19.createElement("div", null, /* @__PURE__ */ React19.createElement("div", { style: { fontSize: "0.9rem", fontWeight: 600, color: "var(--text-main)" } }, "Dark appearance"), /* @__PURE__ */ React19.createElement("div", { style: { fontSize: "0.8rem", color: "var(--text-muted)" } }, "Switch the whole app to a dark canvas.")), /* @__PURE__ */ React19.createElement(ToggleSwitch, { checked: theme === "dark", onChange: () => toggleTheme() })), /* @__PURE__ */ React19.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center" } }, /* @__PURE__ */ React19.createElement("div", null, /* @__PURE__ */ React19.createElement("div", { style: { fontSize: "0.9rem", fontWeight: 600, color: "var(--text-main)" } }, "Hide balances by default"), /* @__PURE__ */ React19.createElement("div", { style: { fontSize: "0.8rem", color: "var(--text-muted)" } }, "Mask amounts on the balance card.")), /* @__PURE__ */ React19.createElement(ToggleSwitch, { checked: user ? user.isBalanceHidden : false, onChange: toggleBalancePrivacy })), /* @__PURE__ */ React19.createElement("div", null, /* @__PURE__ */ React19.createElement("label", { style: { display: "block", fontSize: "0.75rem", fontWeight: 700, color: "var(--text-muted)", marginBottom: "6px", letterSpacing: "0.05em" } }, "LANGUAGE"), /* @__PURE__ */ React19.createElement(
    "input",
    {
      type: "text",
      value: language,
      onChange: (e) => setLanguage(e.target.value),
      style: {
        width: "100%",
        padding: "12px 16px",
        borderRadius: "12px",
        border: "1px solid var(--border-color)",
        background: "var(--hover-bg)",
        color: "var(--text-main)",
        fontSize: "0.9rem",
        outline: "none"
      }
    }
  )))), /* @__PURE__ */ React19.createElement("div", { className: "card", style: { padding: "24px" } }, /* @__PURE__ */ React19.createElement("h3", { style: { fontSize: "1.1rem", fontWeight: 600, marginBottom: "2px" } }, "Security"), /* @__PURE__ */ React19.createElement("p", { style: { color: "var(--text-muted)", fontSize: "0.85rem", marginBottom: "24px" } }, "Keep your account calm and safe."), /* @__PURE__ */ React19.createElement("div", { style: { display: "flex", flexDirection: "column", gap: "20px" } }, /* @__PURE__ */ React19.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center" } }, /* @__PURE__ */ React19.createElement("div", null, /* @__PURE__ */ React19.createElement("div", { style: { fontSize: "0.9rem", fontWeight: 600, color: "var(--text-main)" } }, "Two-factor authentication"), /* @__PURE__ */ React19.createElement("div", { style: { fontSize: "0.8rem", color: "var(--text-muted)" } }, "Require a 6-digit code on new sign-ins.")), /* @__PURE__ */ React19.createElement(ToggleSwitch, { checked: twoFactor, onChange: setTwoFactor })), /* @__PURE__ */ React19.createElement("div", { style: { display: "flex", flexDirection: "column", gap: "12px", alignItems: "flex-start", marginTop: "8px" } }, /* @__PURE__ */ React19.createElement(
    "button",
    {
      style: {
        padding: "10px 18px",
        borderRadius: "99px",
        border: "none",
        background: "var(--hover-bg)",
        color: "var(--text-main)",
        fontWeight: 600,
        fontSize: "0.85rem",
        cursor: "pointer"
      },
      onClick: handleChangePassword
    },
    "Change password"
  ), /* @__PURE__ */ React19.createElement(
    "button",
    {
      style: {
        padding: "10px 18px",
        borderRadius: "99px",
        border: "none",
        background: "var(--hover-bg)",
        color: "var(--text-main)",
        fontWeight: 600,
        fontSize: "0.85rem",
        cursor: "pointer"
      },
      onClick: logout
    },
    "Sign out"
  )))), /* @__PURE__ */ React19.createElement("div", { className: "card", style: { padding: "24px" } }, /* @__PURE__ */ React19.createElement("h3", { style: { fontSize: "1.1rem", fontWeight: 600, marginBottom: "2px" } }, "Notifications"), /* @__PURE__ */ React19.createElement("p", { style: { color: "var(--text-muted)", fontSize: "0.85rem", marginBottom: "24px" } }, "Choose what reaches you."), /* @__PURE__ */ React19.createElement("div", { style: { display: "flex", flexDirection: "column", gap: "20px" } }, /* @__PURE__ */ React19.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center" } }, /* @__PURE__ */ React19.createElement("div", null, /* @__PURE__ */ React19.createElement("div", { style: { fontSize: "0.9rem", fontWeight: 600, color: "var(--text-main)" } }, "Transaction alerts"), /* @__PURE__ */ React19.createElement("div", { style: { fontSize: "0.8rem", color: "var(--text-muted)" } }, "Push when a card is charged.")), /* @__PURE__ */ React19.createElement(ToggleSwitch, { checked: txAlerts, onChange: setTxAlerts })), /* @__PURE__ */ React19.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center" } }, /* @__PURE__ */ React19.createElement("div", null, /* @__PURE__ */ React19.createElement("div", { style: { fontSize: "0.9rem", fontWeight: 600, color: "var(--text-main)" } }, "Budget warnings"), /* @__PURE__ */ React19.createElement("div", { style: { fontSize: "0.8rem", color: "var(--text-muted)" } }, "Alert at 80% of a category budget.")), /* @__PURE__ */ React19.createElement(ToggleSwitch, { checked: budgetWarnings, onChange: setBudgetWarnings })), /* @__PURE__ */ React19.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center" } }, /* @__PURE__ */ React19.createElement("div", null, /* @__PURE__ */ React19.createElement("div", { style: { fontSize: "0.9rem", fontWeight: 600, color: "var(--text-main)" } }, "Weekly digest"), /* @__PURE__ */ React19.createElement("div", { style: { fontSize: "0.8rem", color: "var(--text-muted)" } }, "A quiet Sunday summary of your week.")), /* @__PURE__ */ React19.createElement(ToggleSwitch, { checked: weeklyDigest, onChange: setWeeklyDigest })), /* @__PURE__ */ React19.createElement("div", { style: { marginTop: "8px" } }, /* @__PURE__ */ React19.createElement(
    "button",
    {
      style: {
        padding: "8px 16px",
        borderRadius: "99px",
        border: "1px solid rgba(239, 68, 68, 0.3)",
        background: "transparent",
        color: "#ef4444",
        fontWeight: 600,
        fontSize: "0.8rem",
        cursor: "pointer"
      },
      onClick: handleResetData
    },
    "Reset demo data"
  ))))), /* @__PURE__ */ React19.createElement("div", { style: { display: "flex", justifyContent: "flex-end", marginTop: "8px" } }, /* @__PURE__ */ React19.createElement(
    "button",
    {
      className: "btn-primary",
      style: { width: "auto", padding: "12px 28px", fontSize: "0.95rem" },
      onClick: handleSave
    },
    "Save changes"
  )));
};

// src/features/auth/LoginPage.jsx
import React20, { useState as useState17 } from "react";
var LoginPage = ({ onNavigateRegister, onLoginSuccess }) => {
  const { login } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";
  const [email, setEmail] = useState17("dummy@gmail.com");
  const [password, setPassword] = useState17("dummy@gmail.com");
  const [remember, setRemember] = useState17(true);
  const [showPassword, setShowPassword] = useState17(false);
  const [isSubmitting, setIsSubmitting] = useState17(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await login(email || "alex@finly.app", remember);
      setTimeout(() => {
        setIsSubmitting(false);
        onLoginSuccess();
      }, 400);
    } catch (err) {
      console.error(err);
      setIsSubmitting(false);
    }
  };
  const handleOAuth = (provider) => {
    login(`${provider.toLowerCase()}user@finly.app`, true);
    onLoginSuccess();
  };
  return /* @__PURE__ */ React20.createElement("div", { className: "auth-outer-container", style: { display: "flex", minHeight: "100vh", width: "100vw", background: isDark ? "#090a0d" : "#141518", overflowX: "hidden" } }, /* @__PURE__ */ React20.createElement(
    "div",
    {
      className: "auth-left-panel",
      style: {
        width: "50%",
        flex: "0 0 50%",
        minHeight: "100vh",
        background: isDark ? "#111319" : "#16171a",
        backgroundImage: isDark ? "radial-gradient(circle at 18% 22%, rgba(37, 99, 235, 0.22) 0%, rgba(17, 19, 25, 0) 65%)" : "radial-gradient(circle at 18% 22%, rgba(30, 58, 138, 0.28) 0%, rgba(22, 23, 26, 0) 65%)",
        padding: "48px 56px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        borderRight: isDark ? "1px solid rgba(255, 255, 255, 0.08)" : "1px solid rgba(255, 255, 255, 0.06)",
        boxSizing: "border-box"
      }
    },
    /* @__PURE__ */ React20.createElement("div", { style: { display: "flex", alignItems: "center", gap: "10px" } }, /* @__PURE__ */ React20.createElement(
      "div",
      {
        className: "logo-icon",
        style: {
          width: "34px",
          height: "34px",
          borderRadius: "9px",
          background: "rgba(255, 255, 255, 0.08)",
          border: "1px solid rgba(255, 255, 255, 0.12)",
          color: "#60a5fa",
          display: "flex",
          alignItems: "center",
          justify: "center",
          fontSize: "1.1rem",
          lineHeight: 1,
          padding: 0
        }
      },
      /* @__PURE__ */ React20.createElement("i", { className: "ph ph-squares-four" })
    ), /* @__PURE__ */ React20.createElement("strong", { style: { color: "#ffffff", fontSize: "1.15rem", fontWeight: 700, letterSpacing: "-0.01em", lineHeight: 1 } }, "Finly")),
    /* @__PURE__ */ React20.createElement("div", { className: "auth-hero-container", style: { margin: "auto 0", padding: "32px 0" } }, /* @__PURE__ */ React20.createElement(
      "h1",
      {
        style: {
          color: "#ffffff",
          fontSize: "2.5rem",
          fontWeight: 700,
          lineHeight: 1.18,
          marginBottom: "16px",
          letterSpacing: "-0.025em"
        }
      },
      "Personal finance,",
      /* @__PURE__ */ React20.createElement("br", null),
      "quietly powerful."
    ), /* @__PURE__ */ React20.createElement(
      "p",
      {
        style: {
          color: "#8e96a3",
          fontSize: "0.92rem",
          lineHeight: 1.55,
          maxWidth: "430px",
          marginBottom: "32px"
        }
      },
      "Balances, spending, cards, budgets and investments \u2014 one calm view that stays out of your way."
    ), /* @__PURE__ */ React20.createElement("div", { style: { display: "flex", flexDirection: "column", gap: "12px", maxWidth: "440px" } }, /* @__PURE__ */ React20.createElement(
      "div",
      {
        className: "card-box",
        style: {
          background: "rgba(255, 255, 255, 0.03)",
          border: "1px solid rgba(255, 255, 255, 0.07)",
          borderRadius: "14px",
          padding: "14px 18px",
          display: "flex",
          alignItems: "center",
          gap: "14px"
        }
      },
      /* @__PURE__ */ React20.createElement("i", { className: "ph ph-trend-up", style: { color: "#38bdf8", fontSize: "1.25rem" } }),
      /* @__PURE__ */ React20.createElement("div", null, /* @__PURE__ */ React20.createElement("strong", { style: { display: "block", color: "#f8fafc", fontSize: "0.88rem", fontWeight: 600, marginBottom: "2px" } }, "Live analytics"), /* @__PURE__ */ React20.createElement("span", { style: { color: "#8e96a3", fontSize: "0.78rem" } }, "Trends and category leaders at a glance."))
    ), /* @__PURE__ */ React20.createElement(
      "div",
      {
        className: "card-box",
        style: {
          background: "rgba(255, 255, 255, 0.03)",
          border: "1px solid rgba(255, 255, 255, 0.07)",
          borderRadius: "14px",
          padding: "14px 18px",
          display: "flex",
          alignItems: "center",
          gap: "14px"
        }
      },
      /* @__PURE__ */ React20.createElement("i", { className: "ph ph-shield-check", style: { color: "#38bdf8", fontSize: "1.25rem" } }),
      /* @__PURE__ */ React20.createElement("div", null, /* @__PURE__ */ React20.createElement("strong", { style: { display: "block", color: "#f8fafc", fontSize: "0.88rem", fontWeight: 600, marginBottom: "2px" } }, "Private by default"), /* @__PURE__ */ React20.createElement("span", { style: { color: "#8e96a3", fontSize: "0.78rem" } }, "Balances hidden until you ask for them."))
    ))),
    /* @__PURE__ */ React20.createElement("div", { style: { color: "#64748b", fontSize: "0.75rem" } }, "\xA9 2026 Finly. Mock data \u2014 for demo purposes only.")
  ), /* @__PURE__ */ React20.createElement(
    "div",
    {
      className: "auth-right-panel",
      style: {
        width: "50%",
        flex: "0 0 50%",
        minHeight: "100vh",
        background: isDark ? "#0c0e12" : "#f4f4f6",
        display: "flex",
        alignItems: "center",
        justify: "center",
        padding: "40px 32px",
        boxSizing: "border-box",
        overflowY: "auto",
        position: "relative",
        transition: "background-color 0.3s ease"
      }
    },
    /* @__PURE__ */ React20.createElement(
      "button",
      {
        onClick: toggleTheme,
        className: "icon-btn",
        title: isDark ? "Switch to Light Mode" : "Switch to Dark Mode",
        style: {
          position: "absolute",
          top: "24px",
          right: "28px",
          width: "40px",
          height: "40px",
          borderRadius: "12px",
          border: isDark ? "1px solid rgba(255, 255, 255, 0.14)" : "1px solid rgba(0, 0, 0, 0.12)",
          background: isDark ? "rgba(255, 255, 255, 0.06)" : "#ffffff",
          color: isDark ? "#fbbf24" : "#0f172a",
          display: "flex",
          alignItems: "center",
          justify: "center",
          fontSize: "1.2rem",
          lineHeight: 1,
          padding: 0,
          cursor: "pointer",
          boxShadow: isDark ? "0 4px 14px rgba(0,0,0,0.3)" : "0 2px 8px rgba(0,0,0,0.06)",
          transition: "all 0.2s cubic-bezier(0.16, 1, 0.3, 1)"
        }
      },
      /* @__PURE__ */ React20.createElement("i", { className: isDark ? "ph ph-sun" : "ph ph-moon" })
    ),
    /* @__PURE__ */ React20.createElement("div", { className: "auth-form-container", style: { width: "100%", maxWidth: "380px" } }, /* @__PURE__ */ React20.createElement("div", { style: { marginBottom: "24px" } }, /* @__PURE__ */ React20.createElement("h2", { style: { color: isDark ? "#f8fafc" : "#0f172a", fontSize: "1.85rem", fontWeight: 700, margin: "0 0 6px 0", letterSpacing: "-0.02em" } }, "Sign in"), /* @__PURE__ */ React20.createElement("p", { style: { color: isDark ? "#94a3b8" : "#64748b", fontSize: "0.82rem", margin: 0 } }, "Use any email and password \u2014 this is a demo.")), /* @__PURE__ */ React20.createElement("form", { onSubmit: handleSubmit }, /* @__PURE__ */ React20.createElement("div", { style: { marginBottom: "16px" } }, /* @__PURE__ */ React20.createElement("label", { style: { display: "block", color: isDark ? "#cbd5e1" : "#334155", fontSize: "0.8rem", fontWeight: 500, marginBottom: "6px" } }, "Email"), /* @__PURE__ */ React20.createElement("div", { style: { position: "relative" } }, /* @__PURE__ */ React20.createElement(
      "i",
      {
        className: "ph ph-envelope",
        style: { position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)", color: isDark ? "#64748b" : "#94a3b8", fontSize: "1.1rem" }
      }
    ), /* @__PURE__ */ React20.createElement(
      "input",
      {
        type: "email",
        placeholder: "dummy@gmail.com",
        value: email,
        onChange: (e) => setEmail(e.target.value),
        required: true,
        style: {
          width: "100%",
          padding: "11px 14px 11px 42px",
          background: isDark ? "#161922" : "#ffffff",
          border: isDark ? "1px solid rgba(255, 255, 255, 0.12)" : "1px solid #e2e8f0",
          borderRadius: "10px",
          color: isDark ? "#f8fafc" : "#0f172a",
          fontSize: "0.88rem",
          outline: "none",
          boxSizing: "border-box",
          transition: "all 0.2s ease"
        }
      }
    ))), /* @__PURE__ */ React20.createElement("div", { style: { marginBottom: "16px" } }, /* @__PURE__ */ React20.createElement("label", { style: { display: "block", color: isDark ? "#cbd5e1" : "#334155", fontSize: "0.8rem", fontWeight: 500, marginBottom: "6px" } }, "Password"), /* @__PURE__ */ React20.createElement("div", { style: { position: "relative" } }, /* @__PURE__ */ React20.createElement(
      "i",
      {
        className: "ph ph-lock-key",
        style: { position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)", color: isDark ? "#64748b" : "#94a3b8", fontSize: "1.1rem" }
      }
    ), /* @__PURE__ */ React20.createElement(
      "input",
      {
        type: showPassword ? "text" : "password",
        placeholder: "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022",
        value: password,
        onChange: (e) => setPassword(e.target.value),
        required: true,
        style: {
          width: "100%",
          padding: "11px 42px 11px 42px",
          background: isDark ? "#161922" : "#ffffff",
          border: isDark ? "1px solid rgba(255, 255, 255, 0.12)" : "1px solid #e2e8f0",
          borderRadius: "10px",
          color: isDark ? "#f8fafc" : "#0f172a",
          fontSize: "0.88rem",
          outline: "none",
          boxSizing: "border-box",
          transition: "all 0.2s ease"
        }
      }
    ), /* @__PURE__ */ React20.createElement(
      "button",
      {
        type: "button",
        onClick: () => setShowPassword(!showPassword),
        style: {
          position: "absolute",
          right: "12px",
          top: "50%",
          transform: "translateY(-50%)",
          border: "none",
          background: "none",
          color: isDark ? "#64748b" : "#94a3b8",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justify: "center"
        }
      },
      /* @__PURE__ */ React20.createElement("i", { className: `ph ${showPassword ? "ph-eye-slash" : "ph-eye"}`, style: { fontSize: "1.1rem" } })
    ))), /* @__PURE__ */ React20.createElement("div", { style: { display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "20px" } }, /* @__PURE__ */ React20.createElement("label", { style: { display: "flex", alignItems: "center", gap: "8px", cursor: "pointer", color: isDark ? "#cbd5e1" : "#334155", fontSize: "0.8rem", fontWeight: 500 } }, /* @__PURE__ */ React20.createElement(
      "input",
      {
        type: "checkbox",
        checked: remember,
        onChange: (e) => setRemember(e.target.checked),
        style: { width: "16px", height: "16px", accentColor: "#2563eb", cursor: "pointer", borderRadius: "4px" }
      }
    ), "Remember me"), /* @__PURE__ */ React20.createElement(
      "a",
      {
        href: "#forgot",
        onClick: (e) => {
          e.preventDefault();
          onLoginSuccess();
        },
        style: { color: isDark ? "#60a5fa" : "#2563eb", fontSize: "0.8rem", fontWeight: 500, textDecoration: "none" }
      },
      "Forgot password?"
    )), /* @__PURE__ */ React20.createElement(
      "button",
      {
        type: "submit",
        disabled: isSubmitting,
        style: {
          width: "100%",
          padding: "12px 16px",
          background: "#2563eb",
          color: "#ffffff",
          border: "none",
          borderRadius: "10px",
          fontWeight: 600,
          fontSize: "0.9rem",
          cursor: isSubmitting ? "not-allowed" : "pointer",
          boxShadow: isDark ? "0 4px 16px rgba(37, 99, 235, 0.4)" : "0 4px 14px rgba(37, 99, 235, 0.25)",
          transition: "all 0.15s ease"
        }
      },
      isSubmitting ? "Signing in..." : "Sign in"
    )), /* @__PURE__ */ React20.createElement("div", { style: { display: "flex", alignItems: "center", margin: "20px 0", color: isDark ? "#64748b" : "#94a3b8", fontSize: "0.68rem", fontWeight: 600, letterSpacing: "0.1em" } }, /* @__PURE__ */ React20.createElement("div", { style: { flex: 1, height: "1px", background: isDark ? "rgba(255, 255, 255, 0.1)" : "#e2e8f0" } }), /* @__PURE__ */ React20.createElement("span", { style: { padding: "0 12px" } }, "O R"), /* @__PURE__ */ React20.createElement("div", { style: { flex: 1, height: "1px", background: isDark ? "rgba(255, 255, 255, 0.1)" : "#e2e8f0" } })), /* @__PURE__ */ React20.createElement("div", { style: { display: "flex", flexDirection: "column", gap: "12px" } }, /* @__PURE__ */ React20.createElement(
      "button",
      {
        type: "button",
        onClick: () => handleOAuth("Apple"),
        style: {
          width: "100%",
          padding: "11px 16px",
          background: isDark ? "#161922" : "#ffffff",
          border: isDark ? "1px solid rgba(255, 255, 255, 0.12)" : "1px solid #e2e8f0",
          borderRadius: "10px",
          color: isDark ? "#f8fafc" : "#0f172a",
          fontWeight: 600,
          fontSize: "0.85rem",
          display: "flex",
          alignItems: "center",
          justify: "center",
          gap: "8px",
          cursor: "pointer",
          transition: "all 0.15s ease"
        }
      },
      /* @__PURE__ */ React20.createElement("i", { className: "ph ph-apple-logo", style: { fontSize: "1.15rem" } }),
      " Continue with Apple"
    ), /* @__PURE__ */ React20.createElement(
      "button",
      {
        type: "button",
        onClick: () => handleOAuth("Google"),
        style: {
          width: "100%",
          padding: "11px 16px",
          background: isDark ? "#161922" : "#ffffff",
          border: isDark ? "1px solid rgba(255, 255, 255, 0.12)" : "1px solid #e2e8f0",
          borderRadius: "10px",
          color: isDark ? "#f8fafc" : "#0f172a",
          fontWeight: 600,
          fontSize: "0.85rem",
          display: "flex",
          alignItems: "center",
          justify: "center",
          gap: "8px",
          cursor: "pointer",
          transition: "all 0.15s ease"
        }
      },
      /* @__PURE__ */ React20.createElement("i", { className: "ph ph-google-logo", style: { fontSize: "1.15rem" } }),
      " Continue with Google"
    )), /* @__PURE__ */ React20.createElement("div", { style: { textAlign: "center", marginTop: "24px", fontSize: "0.82rem", color: isDark ? "#94a3b8" : "#64748b" } }, "New to Finly?", " ", /* @__PURE__ */ React20.createElement(
      "a",
      {
        href: "#register",
        onClick: (e) => {
          e.preventDefault();
          if (onNavigateRegister) {
            onNavigateRegister();
          }
        },
        style: { color: isDark ? "#60a5fa" : "#2563eb", fontWeight: 600, textDecoration: "none", cursor: "pointer" }
      },
      "Create New Account"
    )))
  ));
};

// src/features/auth/RegisterPage.jsx
import React21, { useState as useState18 } from "react";
var RegisterPage = ({ onNavigateLogin, onRegisterSuccess }) => {
  const { register } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";
  const [name, setName] = useState18("Alex Morgan");
  const [email, setEmail] = useState18("you@example.com");
  const [password, setPassword] = useState18("");
  const [confirmPassword, setConfirmPassword] = useState18("");
  const [agreeTerms, setAgreeTerms] = useState18(true);
  const [showPassword, setShowPassword] = useState18(false);
  const [isSubmitting, setIsSubmitting] = useState18(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!agreeTerms) {
      alert("Please agree to the Terms and Privacy Policy to continue.");
      return;
    }
    setIsSubmitting(true);
    try {
      await register(name || "Alex Morgan", email || "you@example.com");
      setTimeout(() => {
        setIsSubmitting(false);
        onRegisterSuccess();
      }, 400);
    } catch (err) {
      console.error(err);
      setIsSubmitting(false);
    }
  };
  const handleOAuth = (provider) => {
    register(`${provider.toLowerCase()}user@example.com`, provider);
    onRegisterSuccess();
  };
  return /* @__PURE__ */ React21.createElement("div", { className: "auth-outer-container", style: { display: "flex", minHeight: "100vh", width: "100vw", background: isDark ? "#090a0d" : "#141518", overflowX: "hidden" } }, /* @__PURE__ */ React21.createElement(
    "div",
    {
      className: "auth-left-panel",
      style: {
        width: "50%",
        flex: "0 0 50%",
        minHeight: "100vh",
        background: isDark ? "#111319" : "#16171a",
        backgroundImage: isDark ? "radial-gradient(circle at 18% 22%, rgba(37, 99, 235, 0.22) 0%, rgba(17, 19, 25, 0) 65%)" : "radial-gradient(circle at 18% 22%, rgba(30, 58, 138, 0.28) 0%, rgba(22, 23, 26, 0) 65%)",
        padding: "48px 56px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        borderRight: isDark ? "1px solid rgba(255, 255, 255, 0.08)" : "1px solid rgba(255, 255, 255, 0.06)",
        boxSizing: "border-box"
      }
    },
    /* @__PURE__ */ React21.createElement("div", { style: { display: "flex", alignItems: "center", gap: "10px" } }, /* @__PURE__ */ React21.createElement(
      "div",
      {
        className: "logo-icon",
        style: {
          width: "34px",
          height: "34px",
          borderRadius: "9px",
          background: "rgba(255, 255, 255, 0.08)",
          border: "1px solid rgba(255, 255, 255, 0.12)",
          color: "#60a5fa",
          display: "flex",
          alignItems: "center",
          justify: "center",
          fontSize: "1.1rem",
          lineHeight: 1,
          padding: 0
        }
      },
      /* @__PURE__ */ React21.createElement("i", { className: "ph ph-squares-four" })
    ), /* @__PURE__ */ React21.createElement("strong", { style: { color: "#ffffff", fontSize: "1.15rem", fontWeight: 700, letterSpacing: "-0.01em", lineHeight: 1 } }, "Finly")),
    /* @__PURE__ */ React21.createElement("div", { className: "auth-hero-container", style: { margin: "auto 0", padding: "32px 0" } }, /* @__PURE__ */ React21.createElement(
      "h1",
      {
        style: {
          color: "#ffffff",
          fontSize: "2.5rem",
          fontWeight: 700,
          lineHeight: 1.18,
          marginBottom: "16px",
          letterSpacing: "-0.025em"
        }
      },
      "Start with a",
      /* @__PURE__ */ React21.createElement("br", null),
      "clearer picture."
    ), /* @__PURE__ */ React21.createElement(
      "p",
      {
        style: {
          color: "#8e96a3",
          fontSize: "0.92rem",
          lineHeight: 1.55,
          maxWidth: "430px",
          marginBottom: "32px"
        }
      },
      "Set up in seconds and see every account, budget and investment in one place \u2014 no spreadsheets required."
    ), /* @__PURE__ */ React21.createElement("div", { style: { display: "flex", flexDirection: "column", gap: "12px", maxWidth: "440px" } }, /* @__PURE__ */ React21.createElement(
      "div",
      {
        className: "card-box",
        style: {
          background: "rgba(255, 255, 255, 0.03)",
          border: "1px solid rgba(255, 255, 255, 0.07)",
          borderRadius: "14px",
          padding: "14px 18px",
          display: "flex",
          alignItems: "center",
          gap: "14px"
        }
      },
      /* @__PURE__ */ React21.createElement("i", { className: "ph ph-cards", style: { color: "#38bdf8", fontSize: "1.25rem" } }),
      /* @__PURE__ */ React21.createElement("div", null, /* @__PURE__ */ React21.createElement("strong", { style: { display: "block", color: "#f8fafc", fontSize: "0.88rem", fontWeight: 600, marginBottom: "2px" } }, "All accounts, one view"), /* @__PURE__ */ React21.createElement("span", { style: { color: "#8e96a3", fontSize: "0.78rem" } }, "Balances and cards side by side."))
    ), /* @__PURE__ */ React21.createElement(
      "div",
      {
        className: "card-box",
        style: {
          background: "rgba(255, 255, 255, 0.03)",
          border: "1px solid rgba(255, 255, 255, 0.07)",
          borderRadius: "14px",
          padding: "14px 18px",
          display: "flex",
          alignItems: "center",
          gap: "14px"
        }
      },
      /* @__PURE__ */ React21.createElement("i", { className: "ph ph-piggy-bank", style: { color: "#38bdf8", fontSize: "1.25rem" } }),
      /* @__PURE__ */ React21.createElement("div", null, /* @__PURE__ */ React21.createElement("strong", { style: { display: "block", color: "#f8fafc", fontSize: "0.88rem", fontWeight: 600, marginBottom: "2px" } }, "Budgets that adapt"), /* @__PURE__ */ React21.createElement("span", { style: { color: "#8e96a3", fontSize: "0.78rem" } }, "Pace tracking so nothing surprises you."))
    ))),
    /* @__PURE__ */ React21.createElement("div", { style: { color: "#64748b", fontSize: "0.75rem" } }, "\xA9 2026 Finly. Mock data \u2014 for demo purposes only.")
  ), /* @__PURE__ */ React21.createElement(
    "div",
    {
      className: "auth-right-panel",
      style: {
        width: "50%",
        flex: "0 0 50%",
        minHeight: "100vh",
        background: isDark ? "#0c0e12" : "#f4f4f6",
        display: "flex",
        alignItems: "center",
        justify: "center",
        padding: "40px 32px",
        boxSizing: "border-box",
        overflowY: "auto",
        position: "relative",
        transition: "background-color 0.3s ease"
      }
    },
    /* @__PURE__ */ React21.createElement(
      "button",
      {
        onClick: toggleTheme,
        className: "icon-btn",
        title: isDark ? "Switch to Light Mode" : "Switch to Dark Mode",
        style: {
          position: "absolute",
          top: "24px",
          right: "28px",
          width: "40px",
          height: "40px",
          borderRadius: "12px",
          border: isDark ? "1px solid rgba(255, 255, 255, 0.14)" : "1px solid rgba(0, 0, 0, 0.12)",
          background: isDark ? "rgba(255, 255, 255, 0.06)" : "#ffffff",
          color: isDark ? "#fbbf24" : "#0f172a",
          display: "flex",
          alignItems: "center",
          justify: "center",
          fontSize: "1.2rem",
          lineHeight: 1,
          padding: 0,
          cursor: "pointer",
          boxShadow: isDark ? "0 4px 14px rgba(0,0,0,0.3)" : "0 2px 8px rgba(0,0,0,0.06)",
          transition: "all 0.2s cubic-bezier(0.16, 1, 0.3, 1)"
        }
      },
      /* @__PURE__ */ React21.createElement("i", { className: isDark ? "ph ph-sun" : "ph ph-moon" })
    ),
    /* @__PURE__ */ React21.createElement("div", { className: "auth-form-container", style: { width: "100%", maxWidth: "380px" } }, /* @__PURE__ */ React21.createElement("div", { style: { marginBottom: "24px" } }, /* @__PURE__ */ React21.createElement("h2", { style: { color: isDark ? "#f8fafc" : "#0f172a", fontSize: "1.85rem", fontWeight: 700, margin: "0 0 6px 0", letterSpacing: "-0.02em" } }, "Create account"), /* @__PURE__ */ React21.createElement("p", { style: { color: isDark ? "#94a3b8" : "#64748b", fontSize: "0.82rem", margin: 0 } }, "No card, no email confirmation \u2014 this is a demo.")), /* @__PURE__ */ React21.createElement("form", { onSubmit: handleSubmit }, /* @__PURE__ */ React21.createElement("div", { style: { marginBottom: "16px" } }, /* @__PURE__ */ React21.createElement("label", { style: { display: "block", color: isDark ? "#cbd5e1" : "#334155", fontSize: "0.8rem", fontWeight: 500, marginBottom: "6px" } }, "Full name"), /* @__PURE__ */ React21.createElement("div", { style: { position: "relative" } }, /* @__PURE__ */ React21.createElement(
      "i",
      {
        className: "ph ph-user",
        style: { position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)", color: isDark ? "#64748b" : "#94a3b8", fontSize: "1.1rem" }
      }
    ), /* @__PURE__ */ React21.createElement(
      "input",
      {
        type: "text",
        placeholder: "Alex Morgan",
        value: name,
        onChange: (e) => setName(e.target.value),
        required: true,
        style: {
          width: "100%",
          padding: "11px 14px 11px 42px",
          background: isDark ? "#161922" : "#ffffff",
          border: isDark ? "1px solid rgba(255, 255, 255, 0.12)" : "1px solid #e2e8f0",
          borderRadius: "10px",
          color: isDark ? "#f8fafc" : "#0f172a",
          fontSize: "0.88rem",
          outline: "none",
          boxSizing: "border-box",
          transition: "all 0.2s ease"
        }
      }
    ))), /* @__PURE__ */ React21.createElement("div", { style: { marginBottom: "16px" } }, /* @__PURE__ */ React21.createElement("label", { style: { display: "block", color: isDark ? "#cbd5e1" : "#334155", fontSize: "0.8rem", fontWeight: 500, marginBottom: "6px" } }, "Email"), /* @__PURE__ */ React21.createElement("div", { style: { position: "relative" } }, /* @__PURE__ */ React21.createElement(
      "i",
      {
        className: "ph ph-envelope",
        style: { position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)", color: isDark ? "#64748b" : "#94a3b8", fontSize: "1.1rem" }
      }
    ), /* @__PURE__ */ React21.createElement(
      "input",
      {
        type: "email",
        placeholder: "you@example.com",
        value: email,
        onChange: (e) => setEmail(e.target.value),
        required: true,
        style: {
          width: "100%",
          padding: "11px 14px 11px 42px",
          background: isDark ? "#161922" : "#ffffff",
          border: isDark ? "1px solid rgba(255, 255, 255, 0.12)" : "1px solid #e2e8f0",
          borderRadius: "10px",
          color: isDark ? "#f8fafc" : "#0f172a",
          fontSize: "0.88rem",
          outline: "none",
          boxSizing: "border-box",
          transition: "all 0.2s ease"
        }
      }
    ))), /* @__PURE__ */ React21.createElement("div", { style: { marginBottom: "16px" } }, /* @__PURE__ */ React21.createElement("label", { style: { display: "block", color: isDark ? "#cbd5e1" : "#334155", fontSize: "0.8rem", fontWeight: 500, marginBottom: "6px" } }, "Password"), /* @__PURE__ */ React21.createElement("div", { style: { position: "relative" } }, /* @__PURE__ */ React21.createElement(
      "i",
      {
        className: "ph ph-lock-key",
        style: { position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)", color: isDark ? "#64748b" : "#94a3b8", fontSize: "1.1rem" }
      }
    ), /* @__PURE__ */ React21.createElement(
      "input",
      {
        type: showPassword ? "text" : "password",
        placeholder: "At least 8 characters",
        value: password,
        onChange: (e) => setPassword(e.target.value),
        required: true,
        style: {
          width: "100%",
          padding: "11px 42px 11px 42px",
          background: isDark ? "#161922" : "#ffffff",
          border: isDark ? "1px solid rgba(255, 255, 255, 0.12)" : "1px solid #e2e8f0",
          borderRadius: "10px",
          color: isDark ? "#f8fafc" : "#0f172a",
          fontSize: "0.88rem",
          outline: "none",
          boxSizing: "border-box",
          transition: "all 0.2s ease"
        }
      }
    ), /* @__PURE__ */ React21.createElement(
      "button",
      {
        type: "button",
        onClick: () => setShowPassword(!showPassword),
        style: {
          position: "absolute",
          right: "12px",
          top: "50%",
          transform: "translateY(-50%)",
          border: "none",
          background: "none",
          color: isDark ? "#64748b" : "#94a3b8",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justify: "center"
        }
      },
      /* @__PURE__ */ React21.createElement("i", { className: `ph ${showPassword ? "ph-eye-slash" : "ph-eye"}`, style: { fontSize: "1.1rem" } })
    ))), /* @__PURE__ */ React21.createElement("div", { style: { marginBottom: "16px" } }, /* @__PURE__ */ React21.createElement("label", { style: { display: "block", color: isDark ? "#cbd5e1" : "#334155", fontSize: "0.8rem", fontWeight: 500, marginBottom: "6px" } }, "Confirm password"), /* @__PURE__ */ React21.createElement("div", { style: { position: "relative" } }, /* @__PURE__ */ React21.createElement(
      "i",
      {
        className: "ph ph-lock-key",
        style: { position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)", color: isDark ? "#64748b" : "#94a3b8", fontSize: "1.1rem" }
      }
    ), /* @__PURE__ */ React21.createElement(
      "input",
      {
        type: "password",
        placeholder: "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022",
        value: confirmPassword,
        onChange: (e) => setConfirmPassword(e.target.value),
        style: {
          width: "100%",
          padding: "11px 14px 11px 42px",
          background: isDark ? "#161922" : "#ffffff",
          border: isDark ? "1px solid rgba(255, 255, 255, 0.12)" : "1px solid #e2e8f0",
          borderRadius: "10px",
          color: isDark ? "#f8fafc" : "#0f172a",
          fontSize: "0.88rem",
          outline: "none",
          boxSizing: "border-box",
          transition: "all 0.2s ease"
        }
      }
    ))), /* @__PURE__ */ React21.createElement("div", { style: { display: "flex", alignItems: "center", gap: "8px", marginBottom: "20px" } }, /* @__PURE__ */ React21.createElement(
      "input",
      {
        type: "checkbox",
        id: "agree-terms",
        checked: agreeTerms,
        onChange: (e) => setAgreeTerms(e.target.checked),
        style: { width: "16px", height: "16px", accentColor: "#2563eb", cursor: "pointer", borderRadius: "4px" }
      }
    ), /* @__PURE__ */ React21.createElement("label", { htmlFor: "agree-terms", style: { color: isDark ? "#cbd5e1" : "#334155", fontSize: "0.8rem", cursor: "pointer" } }, "I agree to the", " ", /* @__PURE__ */ React21.createElement("a", { href: "#terms", onClick: (e) => e.preventDefault(), style: { color: isDark ? "#60a5fa" : "#2563eb", textDecoration: "none" } }, "Terms"), " ", "and", " ", /* @__PURE__ */ React21.createElement("a", { href: "#privacy", onClick: (e) => e.preventDefault(), style: { color: isDark ? "#60a5fa" : "#2563eb", textDecoration: "none" } }, "Privacy Policy"), ".")), /* @__PURE__ */ React21.createElement(
      "button",
      {
        type: "submit",
        disabled: isSubmitting,
        style: {
          width: "100%",
          padding: "12px 16px",
          background: "#2563eb",
          color: "#ffffff",
          border: "none",
          borderRadius: "10px",
          fontWeight: 600,
          fontSize: "0.9rem",
          cursor: isSubmitting ? "not-allowed" : "pointer",
          boxShadow: isDark ? "0 4px 16px rgba(37, 99, 235, 0.4)" : "0 4px 14px rgba(37, 99, 235, 0.25)",
          transition: "all 0.15s ease"
        }
      },
      isSubmitting ? "Creating account..." : "Create account"
    )), /* @__PURE__ */ React21.createElement("div", { style: { display: "flex", alignItems: "center", margin: "20px 0", color: isDark ? "#64748b" : "#94a3b8", fontSize: "0.68rem", fontWeight: 600, letterSpacing: "0.1em" } }, /* @__PURE__ */ React21.createElement("div", { style: { flex: 1, height: "1px", background: isDark ? "rgba(255, 255, 255, 0.1)" : "#e2e8f0" } }), /* @__PURE__ */ React21.createElement("span", { style: { padding: "0 12px" } }, "O R"), /* @__PURE__ */ React21.createElement("div", { style: { flex: 1, height: "1px", background: isDark ? "rgba(255, 255, 255, 0.1)" : "#e2e8f0" } })), /* @__PURE__ */ React21.createElement("div", { style: { display: "flex", flexDirection: "column", gap: "12px" } }, /* @__PURE__ */ React21.createElement(
      "button",
      {
        type: "button",
        onClick: () => handleOAuth("Apple"),
        style: {
          width: "100%",
          padding: "11px 16px",
          background: isDark ? "#161922" : "#ffffff",
          border: isDark ? "1px solid rgba(255, 255, 255, 0.12)" : "1px solid #e2e8f0",
          borderRadius: "10px",
          color: isDark ? "#f8fafc" : "#0f172a",
          fontWeight: 600,
          fontSize: "0.85rem",
          display: "flex",
          alignItems: "center",
          justify: "center",
          gap: "8px",
          cursor: "pointer",
          transition: "all 0.15s ease"
        }
      },
      /* @__PURE__ */ React21.createElement("i", { className: "ph ph-apple-logo", style: { fontSize: "1.15rem" } }),
      " Sign up with Apple"
    ), /* @__PURE__ */ React21.createElement(
      "button",
      {
        type: "button",
        onClick: () => handleOAuth("Google"),
        style: {
          width: "100%",
          padding: "11px 16px",
          background: isDark ? "#161922" : "#ffffff",
          border: isDark ? "1px solid rgba(255, 255, 255, 0.12)" : "1px solid #e2e8f0",
          borderRadius: "10px",
          color: isDark ? "#f8fafc" : "#0f172a",
          fontWeight: 600,
          fontSize: "0.85rem",
          display: "flex",
          alignItems: "center",
          justify: "center",
          gap: "8px",
          cursor: "pointer",
          transition: "all 0.15s ease"
        }
      },
      /* @__PURE__ */ React21.createElement("i", { className: "ph ph-google-logo", style: { fontSize: "1.15rem" } }),
      " Sign up with Google"
    )), /* @__PURE__ */ React21.createElement("div", { style: { textAlign: "center", marginTop: "24px", fontSize: "0.82rem", color: isDark ? "#94a3b8" : "#64748b" } }, "Already have an account?", " ", /* @__PURE__ */ React21.createElement(
      "a",
      {
        href: "#login",
        onClick: (e) => {
          e.preventDefault();
          if (onNavigateLogin) {
            onNavigateLogin();
          }
        },
        style: { color: isDark ? "#60a5fa" : "#2563eb", fontWeight: 600, textDecoration: "none", cursor: "pointer" }
      },
      "Sign in"
    )))
  ));
};

// src/App.jsx
var MainAppContent = () => {
  const { user, loading } = useAuth();
  const [activeTab, setActiveTab] = useState19("dashboard");
  const [authView, setAuthView] = useState19("login");
  const [searchQuery, setSearchQuery] = useState19("");
  if (loading) {
    return /* @__PURE__ */ React22.createElement("div", { style: { display: "flex", alignItems: "center", justifyContent: "center", minHeight: "100vh", background: "var(--bg-app)", color: "var(--text-main)" } }, /* @__PURE__ */ React22.createElement("i", { className: "ph ph-spinner-gap", style: { fontSize: "2rem", animation: "spin 1s linear infinite" } }));
  }
  if (!user) {
    if (authView === "register") {
      return /* @__PURE__ */ React22.createElement(RegisterPage, { onNavigateLogin: () => setAuthView("login"), onRegisterSuccess: () => setActiveTab("dashboard") });
    }
    return /* @__PURE__ */ React22.createElement(LoginPage, { onNavigateRegister: () => setAuthView("register"), onLoginSuccess: () => setActiveTab("dashboard") });
  }
  const renderActiveView = () => {
    switch (activeTab) {
      case "dashboard":
        return /* @__PURE__ */ React22.createElement(DashboardPage, { setActiveTab });
      case "transactions":
        return /* @__PURE__ */ React22.createElement(TransactionsPage, { searchQuery });
      case "analytics":
        return /* @__PURE__ */ React22.createElement(AnalyticsPage, null);
      case "cards":
        return /* @__PURE__ */ React22.createElement(CardsPage, null);
      case "wallet":
        return /* @__PURE__ */ React22.createElement(WalletPage, { setActiveTab });
      case "budgets":
        return /* @__PURE__ */ React22.createElement(BudgetsPage, null);
      case "investments":
        return /* @__PURE__ */ React22.createElement(InvestmentsPage, null);
      case "reports":
        return /* @__PURE__ */ React22.createElement(ReportsPage, null);
      case "settings":
        return /* @__PURE__ */ React22.createElement(SettingsPage, null);
      default:
        return /* @__PURE__ */ React22.createElement(DashboardPage, { setActiveTab });
    }
  };
  return /* @__PURE__ */ React22.createElement(
    Layout,
    {
      activeTab,
      setActiveTab,
      searchQuery,
      setSearchQuery
    },
    /* @__PURE__ */ React22.createElement("div", { key: activeTab, className: "page-transition-wrapper" }, renderActiveView())
  );
};
function App() {
  return /* @__PURE__ */ React22.createElement(MainAppContent, null);
}

// src/main.jsx
var rootElement = document.getElementById("root");
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    /* @__PURE__ */ React23.createElement(Providers, null, /* @__PURE__ */ React23.createElement(App, null))
  );
}
