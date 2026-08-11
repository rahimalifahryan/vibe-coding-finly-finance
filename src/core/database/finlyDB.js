/* ==========================================
   FINLY INDEXEDDB DATABASE ENGINE
   ========================================== */

const DB_NAME = 'FinlyDB';
const DB_VERSION = 1;

export const INITIAL_USER = {
  id: 'usr_1',
  name: 'Alex Morgan',
  email: 'alex@finly.app',
  role: 'Financial Analyst',
  avatarInitials: 'AM',
  balance: 24568.32,
  isBalanceHidden: false,
};

export const INITIAL_TRANSACTIONS = [
  { id: 'tx_1', merchant: 'Apple Store &mdash; iPhone 15 Pro', category: 'Shopping', date: 'Oct 24, 2026', status: 'Completed', amount: 1199.00, type: 'debit', icon: 'ph-tag' },
  { id: 'tx_2', merchant: 'Stripe Direct Deposit', category: 'Income', date: 'Oct 22, 2026', status: 'Completed', amount: 4850.00, type: 'credit', icon: 'ph-bank' },
  { id: 'tx_3', merchant: 'Whole Foods Market', category: 'Food', date: 'Oct 21, 2026', status: 'Completed', amount: 142.80, type: 'debit', icon: 'ph-shopping-bag' },
  { id: 'tx_4', merchant: 'ConEd Electrical Utility', category: 'Bills', date: 'Oct 19, 2026', status: 'Pending', amount: 89.50, type: 'debit', icon: 'ph-lightning' },
  { id: 'tx_5', merchant: 'Netflix Premium Subscription', category: 'Entertainment', date: 'Oct 15, 2026', status: 'Completed', amount: 19.99, type: 'debit', icon: 'ph-film-strip' },
  { id: 'tx_6', merchant: 'Uber Technologies', category: 'Transport', date: 'Oct 12, 2026', status: 'Completed', amount: 34.50, type: 'debit', icon: 'ph-arrow-up-right' },
  { id: 'tx_7', merchant: 'Freelance Design Payout', category: 'Income', date: 'Oct 10, 2026', status: 'Completed', amount: 1250.00, type: 'credit', icon: 'ph-bank' },
  { id: 'tx_8', merchant: 'Starbucks Coffee', category: 'Food', date: 'Oct 08, 2026', status: 'Failed', amount: 8.75, type: 'debit', icon: 'ph-shopping-bag' }
];

export const INITIAL_CARDS = [
  { id: 'card-1', number: '0818 4920 1192 2514', holder: 'ALEX MORGAN', expires: '08/28', balance: 14250.00, isFrozen: false, monthlyLimit: 5000.00, brand: 'visa', bg: 'linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%)' },
  { id: 'card-2', number: '4021 9902 8412 8830', holder: 'ALEX MORGAN', expires: '11/27', balance: 10318.32, isFrozen: false, monthlyLimit: 7500.00, brand: 'mastercard', bg: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)' }
];

export const INITIAL_BILLS = [
  { id: 'bill-1', title: 'Adobe Creative Cloud', price: '$54.99', dueDate: 'Due in 3 days', status: 'Unpaid', category: 'Software', icon: 'ph-layout' },
  { id: 'bill-2', title: 'AWS Cloud Hosting Services', price: '$210.40', dueDate: 'Due in 5 days', status: 'Unpaid', category: 'Infrastructure', icon: 'ph-cloud' },
  { id: 'bill-3', title: 'Spotify Family Subscription', price: '$16.99', dueDate: 'Due in 12 days', status: 'Unpaid', category: 'Entertainment', icon: 'ph-music-notes' }
];

export const INITIAL_GOALS = [
  { id: 'goal-1', title: 'New Car Fund', current: 12500, target: 30000, category: 'Savings' },
  { id: 'goal-2', title: 'Emergency Reserve', current: 18000, target: 20000, category: 'Emergency' },
  { id: 'goal-3', title: 'Vacation to Japan', current: 4500, target: 6000, category: 'Travel' }
];

export const INITIAL_BUDGETS = [
  { id: 'bgt-1', category: 'Food & Dining', spent: 620, target: 800, color: '#3b82f6' },
  { id: 'bgt-2', category: 'Shopping & Retail', spent: 1199, target: 1200, color: '#f59e0b' },
  { id: 'bgt-3', category: 'Bills & Utilities', spent: 480, target: 600, color: '#10b981' },
  { id: 'bgt-4', category: 'Entertainment', spent: 185, target: 300, color: '#8b5cf6' }
];

export const INITIAL_INVESTMENTS = [
  { id: 'inv-1', name: 'Apple Inc.', symbol: 'AAPL', holdings: 24.5, currentPrice: 178.40, value: 4370.80, returnPct: '+14.2%', isPositive: true },
  { id: 'inv-2', name: 'Tesla Motors', symbol: 'TSLA', holdings: 12.0, currentPrice: 215.10, value: 2581.20, returnPct: '-3.8%', isPositive: false },
  { id: 'inv-3', name: 'Vanguard S&P 500 Index', symbol: 'VOO', holdings: 18.2, currentPrice: 412.30, value: 7503.86, returnPct: '+8.9%', isPositive: true },
  { id: 'inv-4', name: 'Bitcoin', symbol: 'BTC', holdings: 0.18, currentPrice: 62450.00, value: 11241.00, returnPct: '+32.4%', isPositive: true }
];

export const INITIAL_SETTINGS = {
  theme: 'light',
  currency: 'USD',
  notifications: { email: true, push: true, sms: false, marketing: false },
  security: { twoFactor: true, biometric: false }
};

class FinlyDatabase {
  constructor() {
    this.db = null;
  }

  async init() {
    if (typeof window === 'undefined' || typeof indexedDB === 'undefined') {
      return null;
    }
    if (this.db) return this.db;

    return new Promise((resolve, reject) => {
      const request = indexedDB.open(DB_NAME, DB_VERSION);

      request.onupgradeneeded = (e) => {
        const db = e.target.result;

        if (!db.objectStoreNames.contains('user')) db.createObjectStore('user', { keyPath: 'id' });
        if (!db.objectStoreNames.contains('transactions')) db.createObjectStore('transactions', { keyPath: 'id' });
        if (!db.objectStoreNames.contains('cards')) db.createObjectStore('cards', { keyPath: 'id' });
        if (!db.objectStoreNames.contains('bills')) db.createObjectStore('bills', { keyPath: 'id' });
        if (!db.objectStoreNames.contains('goals')) db.createObjectStore('goals', { keyPath: 'id' });
        if (!db.objectStoreNames.contains('budgets')) db.createObjectStore('budgets', { keyPath: 'id' });
        if (!db.objectStoreNames.contains('investments')) db.createObjectStore('investments', { keyPath: 'id' });
        if (!db.objectStoreNames.contains('settings')) db.createObjectStore('settings', { keyPath: 'id' });
      };

      request.onsuccess = async (e) => {
        this.db = e.target.result;
        await this.seedIfEmpty();
        resolve(this.db);
      };

      request.onerror = (e) => {
        console.error('IndexedDB Error:', e.target.error);
        reject(e.target.error);
      };
    });
  }

  async seedIfEmpty() {
    const user = await this.get('user', 'usr_1');
    if (!user) {
      await this.put('user', INITIAL_USER);
      for (const item of INITIAL_TRANSACTIONS) await this.put('transactions', item);
      for (const item of INITIAL_CARDS) await this.put('cards', item);
      for (const item of INITIAL_BILLS) await this.put('bills', item);
      for (const item of INITIAL_GOALS) await this.put('goals', item);
      for (const item of INITIAL_BUDGETS) await this.put('budgets', item);
      for (const item of INITIAL_INVESTMENTS) await this.put('investments', item);
      await this.put('settings', { id: 'app_settings', ...INITIAL_SETTINGS });
    }
  }

  async getAll(storeName) {
    if (typeof window === 'undefined') return [];
    const db = await this.init();
    if (!db) return [];
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction(storeName, 'readonly');
      const store = transaction.objectStore(storeName);
      const req = store.getAll();
      req.onsuccess = () => resolve(req.result || []);
      req.onerror = () => reject(req.error);
    });
  }

  async get(storeName, key) {
    if (typeof window === 'undefined') return null;
    const db = await this.init();
    if (!db) return null;
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction(storeName, 'readonly');
      const store = transaction.objectStore(storeName);
      const req = store.get(key);
      req.onsuccess = () => resolve(req.result);
      req.onerror = () => reject(req.error);
    });
  }

  async put(storeName, value) {
    if (typeof window === 'undefined') return null;
    const db = await this.init();
    if (!db) return null;
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction(storeName, 'readwrite');
      const store = transaction.objectStore(storeName);
      const req = store.put(value);
      req.onsuccess = () => resolve(req.result);
      req.onerror = () => reject(req.error);
    });
  }

  async delete(storeName, key) {
    if (typeof window === 'undefined') return null;
    const db = await this.init();
    if (!db) return null;
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction(storeName, 'readwrite');
      const store = transaction.objectStore(storeName);
      const req = store.delete(key);
      req.onsuccess = () => resolve(req.result);
      req.onerror = () => reject(req.error);
    });
  }
}

export const finlyDB = new FinlyDatabase();
