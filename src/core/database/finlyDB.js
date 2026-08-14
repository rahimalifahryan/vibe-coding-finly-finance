/* ==========================================
   FINLY INDEXEDDB DATABASE ENGINE
   ========================================== */

const DB_NAME = 'FinlyDB';
const DB_VERSION = 1;

export const INITIAL_USER = {
  id: 'usr_1',
  name: 'Alex Morgan',
  email: 'alex@finly.app',
  role: 'Pro Member',
  avatarInitials: 'AM',
  balance: 24568.32,
  isBalanceHidden: false,
};

export const INITIAL_TRANSACTIONS = [
  { id: 'tx_1', merchant: 'Apple Store', category: 'Shopping', date: 'Jul 19, 2026', status: 'Completed', amount: 1290.00, type: 'debit', icon: 'ph-apple-logo' },
  { id: 'tx_2', merchant: 'Whole Foods', category: 'Food', date: 'Jul 18, 2026', status: 'Completed', amount: 84.32, type: 'debit', icon: 'ph-shopping-bag' },
  { id: 'tx_3', merchant: 'Salary &mdash; Acme Inc', category: 'Income', date: 'Jul 16, 2026', status: 'Completed', amount: 8420.50, type: 'credit', icon: 'ph-bank' },
  { id: 'tx_4', merchant: 'Netflix', category: 'Entertainment', date: 'Jul 17, 2026', status: 'Completed', amount: 15.99, type: 'debit', icon: 'ph-film-strip' },
  { id: 'tx_5', merchant: 'Uber', category: 'Transportation', date: 'Jul 17, 2026', status: 'Pending', amount: 22.40, type: 'debit', icon: 'ph-car' },
  { id: 'tx_6', merchant: 'Con Edison', category: 'Bills', date: 'Jul 16, 2026', status: 'Completed', amount: 142.00, type: 'debit', icon: 'ph-lightning' },
  { id: 'tx_7', merchant: 'Spotify', category: 'Entertainment', date: 'Jul 15, 2026', status: 'Failed', amount: 8.99, type: 'debit', icon: 'ph-music-notes' },
  { id: 'tx_8', merchant: 'CVS Pharmacy', category: 'Healthcare', date: 'Jul 14, 2026', status: 'Completed', amount: 38.50, type: 'debit', icon: 'ph-first-aid-kit' }
];

export const INITIAL_CARDS = [
  { id: 'card-1', number: '0818 7183 0713 2514', holder: 'Alex Morgan', expires: '08/28', balance: 12480.50, isFrozen: false, monthlyLimit: 15000.00, brand: 'visa', bg: '#14171f' },
  { id: 'card-2', number: '4021 9902 8412 8830', holder: 'Alex Morgan', expires: '04/27', balance: 4820.10, isFrozen: false, monthlyLimit: 10000.00, brand: 'mastercard', bg: 'linear-gradient(135deg, #1d4ed8 0%, #3b82f6 100%)' }
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
  { id: 'bgt-1', category: 'Food', spent: 780.00, target: 800.00, color: '#3b82f6' },
  { id: 'bgt-2', category: 'Shopping', spent: 1400.00, target: 1200.00, color: '#ef4444', isOver: true, overAmount: 200.00 },
  { id: 'bgt-3', category: 'Entertainment', spent: 435.00, target: 500.00, color: '#3b82f6' },
  { id: 'bgt-4', category: 'Travel', spent: 320.00, target: 800.00, color: '#3b82f6' },
  { id: 'bgt-5', category: 'Bills', spent: 952.00, target: 900.00, color: '#3b82f6' }
];

export const INITIAL_INVESTMENTS = [
  { id: 'inv-1', name: 'Apple Inc.', symbol: 'AAPL', holdings: 70.0, currentPrice: 178.28, value: 12480.00, returnPct: '+1.2%', isPositive: true, pctShare: 38, color: '#f97316' },
  { id: 'inv-2', name: 'Microsoft', symbol: 'MSFT', holdings: 21.0, currentPrice: 411.42, value: 8640.00, returnPct: '+0.8%', isPositive: true, pctShare: 26, color: '#a855f7' },
  { id: 'inv-3', name: 'Bitcoin', symbol: 'BTC', holdings: 0.10, currentPrice: 64200.00, value: 6420.00, returnPct: '-2.1%', isPositive: false, pctShare: 20, color: '#06b6d4' },
  { id: 'inv-4', name: 'Vanguard S&P 500', symbol: 'VOO', holdings: 12.7, currentPrice: 412.60, value: 5240.00, returnPct: '+0.4%', isPositive: true, pctShare: 16, color: '#3b82f6' }
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
