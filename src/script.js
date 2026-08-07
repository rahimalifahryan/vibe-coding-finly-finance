document.addEventListener('DOMContentLoaded', () => {

  /* ==========================================
     0. PAGE TRANSITION & NAVIGATION ENGINE
     ========================================== */
  let progressBar = document.getElementById('page-progress-bar');
  if (!progressBar) {
    progressBar = document.createElement('div');
    progressBar.id = 'page-progress-bar';
    progressBar.className = 'page-progress-bar';
    document.body.appendChild(progressBar);
  }

  // Trigger page entrance animation
  document.body.classList.add('page-entering');
  progressBar.style.width = '35%';
  progressBar.classList.add('active');
  setTimeout(() => {
    progressBar.style.width = '100%';
    setTimeout(() => {
      progressBar.classList.remove('active');
      setTimeout(() => { progressBar.style.width = '0%'; }, 300);
    }, 200);
  }, 100);

  function navigateTo(url) {
    if (!url || url === '#') return;
    progressBar.classList.add('active');
    progressBar.style.width = '70%';

    document.body.classList.remove('page-entering');
    document.body.classList.add('page-exiting');

    setTimeout(() => {
      progressBar.style.width = '100%';
      window.location.href = url;
    }, 240);
  }

  // Intercept all internal HTML links for smooth page exit transitions
  document.addEventListener('click', (e) => {
    const anchor = e.target.closest('a');
    if (!anchor) return;

    const href = anchor.getAttribute('href');
    const target = anchor.getAttribute('target');

    if (href && href.endsWith('.html') && target !== '_blank') {
      e.preventDefault();
      navigateTo(href);
    }
  });

  // Handle Tab navigation in sidebar with smooth view transition
  const sidebarNavItems = document.querySelectorAll('.sidebar .nav-item');
  const mainBody = document.querySelector('.dashboard-body');

  sidebarNavItems.forEach(item => {
    const link = item.querySelector('a');
    if (link && link.id === 'sidebar-logout') return; // Handled separately

    item.addEventListener('click', (e) => {
      const href = link ? link.getAttribute('href') : null;
      if (href && href !== '#' && href.endsWith('.html')) return;

      e.preventDefault();
      sidebarNavItems.forEach(i => i.classList.remove('active'));
      item.classList.add('active');

      if (mainBody) {
        mainBody.classList.remove('tab-content-animating');
        void mainBody.offsetWidth; // Force reflow
        mainBody.classList.add('tab-content-animating');
      }
    });
  });

  /* ==========================================
     GLOBAL BALANCE & PRIVACY STATE
     ========================================== */
  let numericBalance = 24568.32;
  let isBalanceHidden = false;

  const totalBalanceText = document.getElementById('total-balance-text');
  const togglePrivacyBtn = document.getElementById('toggle-privacy-btn');

  function renderBalance() {
    if (!totalBalanceText) return;
    if (isBalanceHidden) {
      totalBalanceText.textContent = '••••••••';
    } else {
      totalBalanceText.textContent = `$${numericBalance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    }
  }

  if (togglePrivacyBtn) {
    togglePrivacyBtn.addEventListener('click', () => {
      isBalanceHidden = !isBalanceHidden;
      const icon = togglePrivacyBtn.querySelector('i');
      if (icon) {
        icon.className = isBalanceHidden ? 'ph ph-eye-slash' : 'ph ph-eye';
      }
      renderBalance();
    });
  }

  /* ==========================================
     1. THEME SWITCHER (DARK / LIGHT MODE)
     ========================================== */
  const themeToggleBtn = document.getElementById('theme-toggle');
  const htmlTag = document.documentElement;

  const savedTheme = localStorage.getItem('finly-theme') || 'light';
  htmlTag.setAttribute('data-theme', savedTheme);
  updateThemeIcon(savedTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = htmlTag.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      htmlTag.setAttribute('data-theme', newTheme);
      localStorage.setItem('finly-theme', newTheme);
      updateThemeIcon(newTheme);
      showToast(`Switched to ${newTheme} mode`);
    });
  }

  function updateThemeIcon(theme) {
    if (!themeToggleBtn) return;
    const icon = themeToggleBtn.querySelector('i');
    if (icon) {
      icon.className = theme === 'dark' ? 'ph ph-sun' : 'ph ph-moon';
    }
  }

  /* ==========================================
     2. DYNAMIC TRANSACTIONS LOGIC & HELPERS
     ========================================== */
  const txTableBody = document.querySelector('#transactions-table tbody');
  const txCountBadge = document.getElementById('tx-count');

  function addTransactionRow(merchant, category, date, status, amount, isPositive = false) {
    if (!txTableBody) return;

    const tr = document.createElement('tr');
    tr.setAttribute('data-status', status);

    const formattedAmount = `${isPositive ? '+' : '-'}$${Math.abs(amount).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    const statusClass = status === 'Completed' ? 'status-completed' : (status === 'Pending' ? 'status-pending' : 'status-failed');
    
    let iconClass = 'ph-arrow-up-right';
    if (category === 'Food') iconClass = 'ph-shopping-bag';
    if (category === 'Income' || isPositive) iconClass = 'ph-bank';
    if (category === 'Bills') iconClass = 'ph-lightning';
    if (category === 'Shopping') iconClass = 'ph-tag';
    if (category === 'Entertainment') iconClass = 'ph-film-strip';

    tr.innerHTML = `
      <td>
        <div class="tx-merchant">
          <div class="merchant-icon"><i class="ph ${iconClass}"></i></div>
          ${merchant}
        </div>
      </td>
      <td>${category}</td>
      <td>${date}</td>
      <td><span class="status-badge ${statusClass}">${status}</span></td>
      <td class="tx-amount ${isPositive ? 'positive' : ''}">${formattedAmount}</td>
      <td><i class="ph ph-dots-three" style="cursor:pointer"></i></td>
    `;

    txTableBody.prepend(tr);
    filterTransactions();
  }

  /* ==========================================
     3. TRANSACTIONS SEARCH & STATUS FILTERING
     ========================================== */
  const searchInput = document.getElementById('global-search');
  const statusPillsContainer = document.getElementById('status-filter-pills');
  const txTable = document.getElementById('transactions-table');

  let activeStatusFilter = 'all';
  let activeSearchQuery = '';

  if (statusPillsContainer) {
    statusPillsContainer.addEventListener('click', (e) => {
      const pill = e.target.closest('.pill-btn');
      if (!pill) return;

      statusPillsContainer.querySelectorAll('.pill-btn').forEach(btn => btn.classList.remove('active'));
      pill.classList.add('active');
      activeStatusFilter = pill.getAttribute('data-status');
      filterTransactions();
    });
  }

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      activeSearchQuery = e.target.value.toLowerCase().trim();
      filterTransactions();
    });
  }

  function filterTransactions() {
    if (!txTable) return;
    const rows = txTable.querySelectorAll('tbody tr');
    let visibleCount = 0;

    rows.forEach(row => {
      const rowStatus = row.getAttribute('data-status');
      const rowText = row.textContent.toLowerCase();

      const matchesStatus = (activeStatusFilter === 'all' || rowStatus === activeStatusFilter);
      const matchesSearch = (!activeSearchQuery || rowText.includes(activeSearchQuery));

      if (matchesStatus && matchesSearch) {
        row.style.display = '';
        visibleCount++;
      } else {
        row.style.display = 'none';
      }
    });

    if (txCountBadge) {
      txCountBadge.textContent = `${visibleCount} result${visibleCount === 1 ? '' : 's'}`;
    }
  }

  /* ==========================================
     4. CSV EXPORT FUNCTIONALITY
     ========================================== */
  const exportCsvBtn = document.getElementById('export-csv-btn');
  if (exportCsvBtn) {
    exportCsvBtn.addEventListener('click', () => {
      if (!txTable) return;
      const rows = Array.from(txTable.querySelectorAll('tr')).filter(r => r.style.display !== 'none');
      
      let csvContent = 'Merchant,Category,Date,Status,Amount\n';

      rows.forEach((row, index) => {
        if (index === 0) return; // skip header
        const cols = row.querySelectorAll('td');
        if (cols.length >= 5) {
          const merchant = cols[0].innerText.replace(/\n/g, ' ').trim();
          const category = cols[1].innerText.trim();
          const date = cols[2].innerText.trim();
          const status = cols[3].innerText.trim();
          const amount = cols[4].innerText.trim();

          csvContent += `"${merchant}","${category}","${date}","${status}","${amount}"\n`;
        }
      });

      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.setAttribute('href', url);
      link.setAttribute('download', `Finly_Transactions_${new Date().toISOString().slice(0,10)}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      showToast('Exported CSV transaction report');
    });
  }

  /* ==========================================
     5. TOP UP MODAL & FUNCTIONALITY
     ========================================== */
  const topupModal = document.getElementById('topup-modal');
  const btnHeroTopup = document.getElementById('btn-topup');
  const btnCloseTopup = document.getElementById('btn-close-topup');
  const topupForm = document.getElementById('topup-form');
  const topupAmountInput = document.getElementById('topup-amount-input');
  const amountChips = document.querySelectorAll('.amount-chip');

  if (btnHeroTopup && topupModal) {
    btnHeroTopup.addEventListener('click', () => topupModal.classList.add('active'));
  }
  if (btnCloseTopup && topupModal) {
    btnCloseTopup.addEventListener('click', () => topupModal.classList.remove('active'));
  }
  if (topupModal) {
    topupModal.addEventListener('click', (e) => {
      if (e.target === topupModal) topupModal.classList.remove('active');
    });
  }

  amountChips.forEach(chip => {
    chip.addEventListener('click', () => {
      amountChips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      if (topupAmountInput) {
        topupAmountInput.value = chip.getAttribute('data-amount');
      }
    });
  });

  if (topupForm) {
    topupForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const amount = parseFloat(topupAmountInput.value);
      if (isNaN(amount) || amount <= 0) return;

      numericBalance += amount;
      renderBalance();

      addTransactionRow('Top Up &mdash; Account Deposit', 'Income', 'Today', 'Completed', amount, true);

      topupModal.classList.remove('active');
      showToast(`Successfully topped up +$${amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}!`);
    });
  }

  /* ==========================================
     6. SEND / TRANSFER MODAL & FUNCTIONALITY
     ========================================== */
  const sendModal = document.getElementById('send-modal');
  const btnHeroSend = document.getElementById('btn-send');
  const btnHeroTransfer = document.getElementById('btn-transfer');
  const btnCloseSend = document.getElementById('btn-close-send');
  const sendForm = document.getElementById('send-form');

  function openSendModal() {
    if (sendModal) sendModal.classList.add('active');
  }
  if (btnHeroSend) btnHeroSend.addEventListener('click', openSendModal);
  if (btnHeroTransfer) btnHeroTransfer.addEventListener('click', openSendModal);
  if (btnCloseSend && sendModal) {
    btnCloseSend.addEventListener('click', () => sendModal.classList.remove('active'));
  }
  if (sendModal) {
    sendModal.addEventListener('click', (e) => {
      if (e.target === sendModal) sendModal.classList.remove('active');
    });
  }

  if (sendForm) {
    sendForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const recipient = document.getElementById('send-recipient-input').value;
      const amount = parseFloat(document.getElementById('send-amount-input').value);
      const category = document.getElementById('send-category-select').value;

      if (isNaN(amount) || amount <= 0) return;

      numericBalance -= amount;
      renderBalance();

      addTransactionRow(recipient, category, 'Today', 'Completed', amount, false);

      sendModal.classList.remove('active');
      sendForm.reset();
      showToast(`Sent $${amount.toLocaleString('en-US', { minimumFractionDigits: 2 })} to ${recipient}`);
    });
  }

  /* ==========================================
     7. DYNAMIC ADD CARD FUNCTIONALITY
     ========================================== */
  const addCardModal = document.getElementById('add-card-modal');
  const btnOpenAddCard = document.getElementById('btn-open-add-card');
  const btnHeroAddCard = document.getElementById('btn-addcard');
  const btnCloseModal = document.getElementById('btn-close-modal');
  const addCardForm = document.getElementById('add-card-form');
  const cardsListContainer = document.getElementById('cards-list-container');

  function openAddCardModal() {
    if (addCardModal) addCardModal.classList.add('active');
  }
  function closeAddCardModal() {
    if (addCardModal) addCardModal.classList.remove('active');
  }

  if (btnOpenAddCard) btnOpenAddCard.addEventListener('click', openAddCardModal);
  if (btnHeroAddCard) btnHeroAddCard.addEventListener('click', openAddCardModal);
  if (btnCloseModal && addCardModal) btnCloseModal.addEventListener('click', closeAddCardModal);
  if (addCardModal) {
    addCardModal.addEventListener('click', (e) => {
      if (e.target === addCardModal) closeAddCardModal();
    });
  }

  if (addCardForm) {
    addCardForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const holder = document.getElementById('card-holder-input').value || 'ALEX MORGAN';
      const num = document.getElementById('card-num-input').value || '4021 9902 8412 0000';
      const exp = document.getElementById('card-exp-input').value || '12/28';

      if (cardsListContainer) {
        const cardDiv = document.createElement('div');
        cardDiv.className = 'credit-card card-dark';
        cardDiv.style.background = '#1e3a8a';
        cardDiv.style.border = '1px solid rgba(255, 255, 255, 0.12)';
        cardDiv.innerHTML = `
          <div class="card-top">
            <div>
              <span class="card-label">BALANCE</span>
              <div class="card-balance-val">$2,500.00</div>
            </div>
            <div class="card-top-icons">
              <i class="ph ph-wifi-high"></i>
              <i class="ph ph-dots-three-vertical"></i>
            </div>
          </div>
          <div class="card-num">${num}</div>
          <div class="card-bottom">
            <div class="card-holder">
              <span class="card-label">CARDHOLDER</span>
              <div class="card-holder-name">${holder.toUpperCase()}</div>
            </div>
            <div>
              <span class="card-label">EXPIRES</span>
              <div class="card-exp-val">${exp}</div>
            </div>
            <div class="card-brand">
              <svg class="card-logo visa-logo" width="56" height="18" viewBox="0 0 120 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M21.5 1L11.5 27.6L7.1 4.1C6.7 2.2 5.1 0.9 3.2 0.7C1.9 0.5 0.1 0.4 0 0.4L0.1 1.2C1.6 1.5 4.3 2.2 5.9 3.1C6.9 3.7 7.2 4.4 7.5 5.7L14.7 37.8H24.8L40.2 1H30.3L21.5 1ZM57.4 1L50.4 37.8H60.2L67.2 1H57.4ZM78.5 10.9C78.4 6.7 72.6 6.5 72.8 4.6C72.9 4 73.5 3.3 74.8 3.1C75.4 3 77.2 2.9 79.1 3.9L80.5 0.7C79.4 0.3 78 0 76.2 0C72.1 0 69.2 2.2 69.2 5.3C69.1 7.6 71.2 8.8 72.8 9.6C74.4 10.4 75 10.9 75 11.6C75 12.7 73.7 13.1 72.5 13.2C70.4 13.2 69.2 12.6 68.2 12.2L66.8 15.6C68 16.1 70.1 16.5 72.3 16.5C76.7 16.5 79.5 14.4 79.6 11.1Z M96.6 1H88.7C86.9 1 85.3 2.1 84.7 3.7L71.8 37.8H81.7L83.7 32.3H95.8L96.9 37.8H105.6L96.6 1ZM86.5 19.4L90.7 7.8L94.2 19.4H86.5Z" fill="white"/>
              </svg>
            </div>
          </div>
        `;
        cardsListContainer.appendChild(cardDiv);
      }

      closeAddCardModal();
      addCardForm.reset();
      showToast('New card added successfully!');
    });
  }

  /* ==========================================
     8. QUICK TRANSFER FORM HANDLER
     ========================================== */
  const quickTransferForm = document.getElementById('quick-transfer-form');
  const avatarItems = document.querySelectorAll('.avatar-item');
  let selectedRecipient = 'Sarah';

  avatarItems.forEach(item => {
    item.addEventListener('click', () => {
      avatarItems.forEach(a => a.classList.remove('active'));
      item.classList.add('active');
      const nameEl = item.querySelector('.avatar-name');
      if (nameEl) selectedRecipient = nameEl.textContent;
    });
  });

  if (quickTransferForm) {
    quickTransferForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const amountInput = document.getElementById('transfer-amount');
      const noteInput = document.getElementById('transfer-note');
      
      const amount = parseFloat(amountInput ? amountInput.value : '0');
      const note = noteInput ? noteInput.value : 'Quick Transfer';

      if (isNaN(amount) || amount <= 0) return;

      numericBalance -= amount;
      renderBalance();

      addTransactionRow(selectedRecipient, 'Transfer', 'Today', 'Completed', amount, false);
      showToast(`Transferred $${amount.toLocaleString('en-US', { minimumFractionDigits: 2 })} to ${selectedRecipient}`);
    });
  }

  const btnSaveDraft = document.getElementById('btn-save-draft');
  if (btnSaveDraft) {
    btnSaveDraft.addEventListener('click', () => {
      const amountInput = document.getElementById('transfer-amount');
      const val = amountInput && amountInput.value ? `$${amountInput.value}` : 'transfer';
      showToast(`Saved draft ${val} for ${selectedRecipient}`);
    });
  }

  /* ==========================================
     8.1. UPCOMING BILLS PAY HANDLER
     ========================================== */
  document.addEventListener('click', (e) => {
    const payBtn = e.target.closest('.btn-pay');
    if (payBtn) {
      const billItem = payBtn.closest('.bill-item');
      const titleEl = billItem ? billItem.querySelector('h4') : null;
      const priceEl = billItem ? billItem.querySelector('.bill-price') : null;
      const billName = titleEl ? titleEl.textContent.trim() : 'Bill';
      const priceText = priceEl ? priceEl.textContent.trim() : '$0.00';

      payBtn.disabled = true;
      payBtn.textContent = 'Paid';
      payBtn.style.background = '#10b981';
      payBtn.style.cursor = 'default';

      showToast(`Paid ${billName} (${priceText})`);
    }

    const goalActBtn = e.target.closest('.btn-goal-act');
    if (goalActBtn) {
      const goalName = goalActBtn.getAttribute('data-goal') || 'Savings Goal';
      const isAdd = goalActBtn.classList.contains('add-funds-btn');
      showToast(`${isAdd ? 'Added $100.00 to' : 'Removed $100.00 from'} ${goalName}`);
    }
  });

  const btnAddGoal = document.getElementById('btn-add-goal');
  if (btnAddGoal) {
    btnAddGoal.addEventListener('click', () => {
      showToast('Created new savings goal');
    });
  }

  /* ==========================================
     9. FINANCIAL ANALYTICS TIME RANGE TABS
     ========================================== */
  const analyticsTabs = document.querySelectorAll('.analytics-tabs .tab-btn');
  analyticsTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      analyticsTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const range = tab.getAttribute('data-range');
      showToast(`Showing ${range} financial analytics`);
    });
  });

  /* ==========================================
     10. INVESTMENTS BUY / SELL TABS
     ========================================== */
  const investTabs = document.querySelectorAll('.invest-actions .btn-invest-tab');
  investTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      investTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const action = tab.textContent.trim();
      showToast(`Investment ${action} order window opened`);
    });
  });

  /* ==========================================
     11. AUTHENTICATION & SESSION MANAGEMENT
     ========================================== */
  function setSessionUser(userData, remember = false) {
    const dataStr = JSON.stringify(userData);
    sessionStorage.setItem('finly_logged_in', 'true');
    sessionStorage.setItem('finly_user', dataStr);
    if (remember) {
      localStorage.setItem('finly_logged_in', 'true');
      localStorage.setItem('finly_user', dataStr);
    } else {
      localStorage.removeItem('finly_logged_in');
      localStorage.removeItem('finly_user');
    }
  }

  function getSessionUser() {
    const raw = sessionStorage.getItem('finly_user') || localStorage.getItem('finly_user');
    if (!raw) return null;
    try {
      return JSON.parse(raw);
    } catch (e) {
      return null;
    }
  }

  function logoutUser() {
    sessionStorage.removeItem('finly_logged_in');
    sessionStorage.removeItem('finly_user');
    localStorage.removeItem('finly_logged_in');
    localStorage.removeItem('finly_user');
    navigateTo('index.html');
  }

  const signinForm = document.getElementById('signin-form');
  const signupForm = document.getElementById('signup-form');

  if (signinForm) {
    signinForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const emailInput = document.getElementById('email');
      const rememberCheckbox = document.getElementById('remember-me');
      const email = emailInput ? emailInput.value : 'alex@finly.app';
      const remember = rememberCheckbox ? rememberCheckbox.checked : false;

      let name = 'Alex Morgan';
      if (email && email.includes('@')) {
        const handle = email.split('@')[0];
        name = handle.split(/[._-]/).map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
      }

      const submitBtn = signinForm.querySelector('button[type="submit"]');
      if (submitBtn) {
        submitBtn.innerHTML = `<i class="ph ph-spinner-gap" style="animation:spin 1s linear infinite;font-size:1.2rem"></i> Signing in...`;
        submitBtn.disabled = true;
        submitBtn.style.opacity = '0.9';
      }

      setSessionUser({ email, name }, remember);

      setTimeout(() => {
        navigateTo('dashboard.html');
      }, 400);
    });
  }

  if (signupForm) {
    signupForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const nameInput = document.getElementById('name');
      const emailInput = document.getElementById('email');
      const name = nameInput && nameInput.value ? nameInput.value : 'Alex Morgan';
      const email = emailInput && emailInput.value ? emailInput.value : 'alex@finly.app';

      const submitBtn = signupForm.querySelector('button[type="submit"]');
      if (submitBtn) {
        submitBtn.innerHTML = `<i class="ph ph-spinner-gap" style="animation:spin 1s linear infinite;font-size:1.2rem"></i> Creating account...`;
        submitBtn.disabled = true;
        submitBtn.style.opacity = '0.9';
      }

      setSessionUser({ email, name }, true);

      setTimeout(() => {
        navigateTo('dashboard.html');
      }, 400);
    });
  }

  const oauthButtons = document.querySelectorAll('.btn-oauth');
  oauthButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const provider = btn.textContent.includes('Apple') ? 'Apple' : 'Google';
      setSessionUser({ email: `user@${provider.toLowerCase()}.com`, name: `${provider} User` }, true);
      setTimeout(() => {
        navigateTo('dashboard.html');
      }, 400);
    });
  });

  const logoutBtn = document.getElementById('logout-btn');
  const sidebarLogout = document.getElementById('sidebar-logout');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', (e) => {
      e.preventDefault();
      logoutUser();
    });
  }
  if (sidebarLogout) {
    sidebarLogout.addEventListener('click', (e) => {
      e.preventDefault();
      logoutUser();
    });
  }

  // Update dynamic user greeting and avatar initials consistently across all pages
  const user = getSessionUser() || { name: 'RAHIM ALI FAHRYAN', email: 'rahim@finly.com' };
  if (user) {
    const greetingHeader = document.querySelector('.header-greeting h1');
    if (greetingHeader && greetingHeader.textContent.includes('Good morning')) {
      const firstName = user.name ? user.name.split(' ')[0] : 'Rahim';
      greetingHeader.textContent = `Good morning, ${firstName}`;
    }
    const avatarBadges = document.querySelectorAll('.avatar-badge');
    avatarBadges.forEach(avatarBadge => {
      if (user.name) {
        const parts = user.name.trim().split(' ');
        let initials = parts[0].charAt(0).toUpperCase();
        if (parts.length > 1) {
          initials += parts[parts.length - 1].charAt(0).toUpperCase();
        }
        avatarBadge.textContent = initials;
        avatarBadge.title = user.name;
      }
    });
  }

  const togglePasswordBtn = document.getElementById('toggle-password');
  const passwordInput = document.getElementById('password');
  if (togglePasswordBtn && passwordInput) {
    togglePasswordBtn.addEventListener('click', () => {
      const isPassword = passwordInput.type === 'password';
      passwordInput.type = isPassword ? 'text' : 'password';
      const icon = togglePasswordBtn.querySelector('i');
      if (icon) {
        icon.className = isPassword ? 'ph ph-eye-slash' : 'ph ph-eye';
      }
    });
  }

  /* ==========================================
     TOAST UTILITY
     ========================================== */
  function showToast(message) {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `<i class="ph ph-check-circle" style="color:#10b981;font-size:1.25rem"></i> <span>${message}</span>`;
    
    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
      toast.style.transition = 'all 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, 3200);
  }

  /* ==========================================
     CARDS PAGE INTERACTION HANDLERS
     ========================================== */
  // 1. Freeze Card Toggle
  document.querySelectorAll('.btn-freeze').forEach(btn => {
    btn.addEventListener('click', () => {
      const cardId = btn.getAttribute('data-card-id');
      const statusSpan = document.getElementById(`status-${cardId}`);
      const btnSpan = btn.querySelector('span');
      const isFrozen = btn.classList.contains('active-frozen');

      if (isFrozen) {
        btn.classList.remove('active-frozen');
        if (btnSpan) btnSpan.textContent = 'Freeze';
        if (statusSpan) {
          statusSpan.className = 'badge-status status-active';
          statusSpan.innerHTML = '<i class="ph ph-check-circle"></i> Active';
        }
        showToast(`Card ${cardId === 'card-1' ? '0818...2514' : '4021...8830'} is now unfrozen.`);
      } else {
        btn.classList.add('active-frozen');
        if (btnSpan) btnSpan.textContent = 'Unfreeze';
        if (statusSpan) {
          statusSpan.className = 'badge-status status-frozen';
          statusSpan.innerHTML = '<i class="ph ph-snowflake"></i> Frozen';
        }
        showToast(`Card ${cardId === 'card-1' ? '0818...2514' : '4021...8830'} has been frozen.`);
      }
    });
  });

  // 2. Lock PIN Handler
  document.querySelectorAll('.btn-lock-pin').forEach(btn => {
    btn.addEventListener('click', () => {
      const cardId = btn.getAttribute('data-card-id');
      showToast(`PIN security locked for Card ${cardId === 'card-1' ? '0818...2514' : '4021...8830'}.`);
    });
  });

  // 3. Limits Modal Handler
  const limitsModal = document.getElementById('modal-card-limits');
  const limitsForm = document.getElementById('form-card-limits');
  const limitsTargetCardInput = document.getElementById('limits-target-card');
  const inputMonthlyLimit = document.getElementById('input-monthly-limit');

  document.querySelectorAll('.btn-limits').forEach(btn => {
    btn.addEventListener('click', () => {
      const cardId = btn.getAttribute('data-card-id');
      if (limitsTargetCardInput) limitsTargetCardInput.value = cardId;
      const currentLimitEl = document.getElementById(`limit-${cardId}`);
      if (inputMonthlyLimit && currentLimitEl) {
        const val = currentLimitEl.textContent.replace(/[^0-9.]/g, '');
        inputMonthlyLimit.value = val;
      }
      if (limitsModal) limitsModal.style.display = 'flex';
    });
  });

  if (limitsForm) {
    limitsForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const cardId = limitsTargetCardInput ? limitsTargetCardInput.value : '';
      const newLimit = parseFloat(inputMonthlyLimit ? inputMonthlyLimit.value : '0');
      const currentLimitEl = document.getElementById(`limit-${cardId}`);
      if (currentLimitEl) {
        currentLimitEl.textContent = `$${newLimit.toLocaleString('en-US', { minimumFractionDigits: 2 })}`;
      }
      if (limitsModal) limitsModal.style.display = 'none';
      showToast(`Monthly limit updated to $${newLimit.toLocaleString('en-US', { minimumFractionDigits: 2 })}.`);
    });
  }

  // 4. Remove Card Handler
  document.querySelectorAll('.btn-remove-card').forEach(btn => {
    btn.addEventListener('click', () => {
      const cardId = btn.getAttribute('data-card-id');
      const box = document.getElementById(`box-${cardId}`);
      if (confirm('Are you sure you want to remove this card?')) {
        if (box) {
          box.style.transition = 'all 0.3s ease';
          box.style.opacity = '0';
          box.style.transform = 'scale(0.95)';
          setTimeout(() => box.remove(), 300);
        }
        showToast('Card successfully removed.');
      }
    });
  });

  // 5. Request New Card Modal Handler
  const requestCardBtn = document.getElementById('btn-request-card');
  const requestCardModal = document.getElementById('modal-request-card');
  const requestCardForm = document.getElementById('form-request-card');

  if (requestCardBtn && requestCardModal) {
    requestCardBtn.addEventListener('click', () => {
      requestCardModal.style.display = 'flex';
    });
  }

  if (requestCardForm) {
    requestCardForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const cardTypeSelect = document.getElementById('req-card-type');
      const cardType = cardTypeSelect ? cardTypeSelect.value : 'Card';
      if (requestCardModal) requestCardModal.style.display = 'none';
      showToast(`New ${cardType} requested successfully!`);
    });
  }

  // Close modals on close buttons or backdrop click
  document.querySelectorAll('.close-modal-btn, .modal-backdrop').forEach(el => {
    el.addEventListener('click', (e) => {
      if (e.target === el || e.target.closest('.close-modal-btn')) {
        const modal = el.closest('.modal-backdrop') || el;
        if (modal) modal.style.display = 'none';
      }
    });
  });

  /* ==========================================
     TRANSACTIONS PAGE INTERACTION HANDLERS
     ========================================== */
  const txPageTableBody = document.getElementById('tx-table-body');
  const txSearchInput = document.getElementById('tx-search-input');
  const txStatusFilters = document.querySelectorAll('#tx-status-filters .pill-btn');
  const btnShowMoreTx = document.getElementById('btn-show-more-tx');
  const btnExportCsv = document.getElementById('btn-export-csv');
  const txResultsCount = document.getElementById('tx-results-count');

  let currentFilter = 'all';

  function filterTransactions() {
    if (!txPageTableBody) return;
    const rows = txPageTableBody.querySelectorAll('tr.tx-row');
    const searchTerm = txSearchInput ? txSearchInput.value.toLowerCase().trim() : '';
    let visibleCount = 0;

    rows.forEach(row => {
      const isExtra = row.classList.contains('extra-row');
      const isHiddenExtra = isExtra && row.style.display === 'none' && !row.dataset.expanded;
      const status = row.getAttribute('data-status');
      const merchant = (row.getAttribute('data-merchant') || '').toLowerCase();
      const category = (row.getAttribute('data-category') || '').toLowerCase();

      const matchesStatus = currentFilter === 'all' || status === currentFilter;
      const matchesSearch = !searchTerm || merchant.includes(searchTerm) || category.includes(searchTerm);

      if (matchesStatus && matchesSearch && !isHiddenExtra) {
        row.style.display = 'table-row';
        visibleCount++;
      } else {
        row.style.display = 'none';
      }
    });

    if (txResultsCount) {
      txResultsCount.textContent = `${visibleCount} results`;
    }
  }

  if (txSearchInput) {
    txSearchInput.addEventListener('input', filterTransactions);
  }

  txStatusFilters.forEach(btn => {
    btn.addEventListener('click', () => {
      txStatusFilters.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentFilter = btn.getAttribute('data-filter');
      filterTransactions();
    });
  });

  if (btnShowMoreTx) {
    btnShowMoreTx.addEventListener('click', () => {
      const hiddenRows = document.querySelectorAll('.extra-row');
      hiddenRows.forEach(row => {
        row.dataset.expanded = 'true';
        row.style.display = 'table-row';
      });
      btnShowMoreTx.style.display = 'none';
      filterTransactions();
      showToast('All 16 transactions loaded.');
    });
  }

  if (btnExportCsv) {
    btnExportCsv.addEventListener('click', () => {
      let csvContent = "data:text/csv;charset=utf-8,MERCHANT,CATEGORY,DATE,STATUS,AMOUNT\n";
      const rows = document.querySelectorAll('tr.tx-row');
      rows.forEach(row => {
        const merchant = row.getAttribute('data-merchant');
        const category = row.getAttribute('data-category');
        const date = row.cells[2] ? row.cells[2].textContent : '';
        const status = row.getAttribute('data-status');
        const amount = row.cells[4] ? row.cells[4].textContent : '';
        csvContent += `"${merchant}","${category}","${date}","${status}","${amount}"\n`;
      });
      const encodedUri = encodeURI(csvContent);
      const link = document.createElement('a');
      link.setAttribute('href', encodedUri);
      link.setAttribute('download', 'finly_transactions.csv');
      document.body.appendChild(link);
      link.click();
      link.remove();
      showToast('Transactions exported to CSV successfully!');
    });
  }

  /* ==========================================
     INVESTMENTS PAGE INTERACTION HANDLERS
     ========================================== */
  const modalTrade = document.getElementById('modal-trade');
  const formTrade = document.getElementById('form-trade');
  const tradeModalTitle = document.getElementById('trade-modal-title');
  const btnSubmitTrade = document.getElementById('btn-submit-trade');
  let currentTradeType = 'Buy';

  document.querySelectorAll('.btn-trade-buy').forEach(btn => {
    btn.addEventListener('click', () => {
      currentTradeType = 'Buy';
      if (tradeModalTitle) tradeModalTitle.textContent = 'Buy Asset';
      if (btnSubmitTrade) btnSubmitTrade.textContent = 'Confirm Buy Order';
      if (modalTrade) modalTrade.style.display = 'flex';
    });
  });

  document.querySelectorAll('.btn-trade-sell').forEach(btn => {
    btn.addEventListener('click', () => {
      currentTradeType = 'Sell';
      if (tradeModalTitle) tradeModalTitle.textContent = 'Sell Asset';
      if (btnSubmitTrade) btnSubmitTrade.textContent = 'Confirm Sell Order';
      if (modalTrade) modalTrade.style.display = 'flex';
    });
  });

  if (formTrade) {
    formTrade.addEventListener('submit', (e) => {
      e.preventDefault();
      const symbolSelect = document.getElementById('trade-symbol');
      const sharesInput = document.getElementById('trade-shares');
      const symbol = symbolSelect ? symbolSelect.value : 'AAPL';
      const shares = sharesInput ? sharesInput.value : '1';
      if (modalTrade) modalTrade.style.display = 'none';
      showToast(`${currentTradeType} order executed: ${shares} units of ${symbol}!`);
    });
  }

  // Watchlist remove handler
  document.querySelectorAll('.btn-remove-watchlist').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const item = e.target.closest('.watchlist-item');
      if (item) {
        item.style.transition = 'all 0.3s ease';
        item.style.opacity = '0';
        item.style.transform = 'scale(0.95)';
        setTimeout(() => item.remove(), 300);
        showToast('Asset removed from watchlist.');
      }
    });
  });

  // Watchlist add handler
  const btnAddWatchlist = document.getElementById('btn-add-watchlist');
  if (btnAddWatchlist) {
    btnAddWatchlist.addEventListener('click', () => {
      showToast('Symbol search modal opened. Type any ticker (e.g. AMD, META).');
    });
  }

  // News Category Filters Handler
  const newsCategoryBtns = document.querySelectorAll('#news-category-filters .pill-btn');
  const newsArticles = document.querySelectorAll('.news-article-item');

  newsCategoryBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      newsCategoryBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const category = btn.getAttribute('data-category');

      newsArticles.forEach(article => {
        const articleCat = article.getAttribute('data-category');
        if (category === 'all' || articleCat === category) {
          article.style.display = 'flex';
        } else {
          article.style.display = 'none';
        }
      });
    });
  });

  // News article modal reader handler
  const modalNews = document.getElementById('modal-news');
  const newsModalTitle = document.getElementById('news-modal-title');
  const newsModalSummary = document.getElementById('news-modal-summary');
  const newsModalSource = document.getElementById('news-modal-source');
  const newsModalTime = document.getElementById('news-modal-time');
  const newsModalTicker = document.getElementById('news-modal-ticker');

  document.querySelectorAll('.news-article-item').forEach(item => {
    item.addEventListener('click', () => {
      const title = item.getAttribute('data-title');
      const source = item.getAttribute('data-source');
      const time = item.getAttribute('data-time');
      const ticker = item.getAttribute('data-ticker');
      const summary = item.getAttribute('data-summary');

      if (newsModalTitle) newsModalTitle.textContent = title;
      if (newsModalSource) newsModalSource.textContent = source;
      if (newsModalTime) newsModalTime.textContent = time;
      if (newsModalTicker) newsModalTicker.textContent = ticker;
      if (newsModalSummary) newsModalSummary.textContent = summary;

      if (modalNews) modalNews.style.display = 'flex';
    });
  });

  /* ==========================================
     REPORTS PAGE INTERACTION HANDLERS
     ========================================== */
  document.addEventListener('click', (e) => {
    const pdfLink = e.target.closest('.btn-pdf-link');
    if (pdfLink) {
      e.preventDefault();
      const period = pdfLink.getAttribute('data-period') || 'Statement';
      showToast(`Downloading PDF statement for ${period}...`);
    }

    const exportAllBtn = e.target.closest('#btn-export-all-reports');
    if (exportAllBtn) {
      e.preventDefault();
      showToast('Generating & downloading 2026 complete statements bundle (ZIP/PDF)...');
    }

    const actionCard = e.target.closest('.report-action-card');
    if (actionCard) {
      const type = actionCard.getAttribute('data-report-type') || 'Report';
      showToast(`Generating ${type} download...`);
    }
  });

  /* ==========================================
     SETTINGS PAGE INTERACTION HANDLERS
     ========================================== */
  const currencyPills = document.querySelectorAll('.currency-pill');
  currencyPills.forEach(pill => {
    pill.addEventListener('click', () => {
      currencyPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      showToast(`Currency changed to ${pill.textContent.trim()}`);
    });
  });

  const settingsDarkToggle = document.getElementById('settings-dark-toggle');
  if (settingsDarkToggle) {
    const isDark = htmlTag.getAttribute('data-theme') === 'dark';
    settingsDarkToggle.checked = isDark;

    settingsDarkToggle.addEventListener('change', () => {
      const newTheme = settingsDarkToggle.checked ? 'dark' : 'light';
      htmlTag.setAttribute('data-theme', newTheme);
      localStorage.setItem('finly-theme', newTheme);
      updateThemeIcon(newTheme);
      showToast(`Switched to ${newTheme} mode`);
    });
  }

  const btnSaveSettings = document.getElementById('btn-save-settings');
  if (btnSaveSettings) {
    btnSaveSettings.addEventListener('click', () => {
      const nameVal = document.getElementById('settings-display-name')?.value || 'Rahim Ali Fahryan';
      const emailVal = document.getElementById('settings-email')?.value || 'fahryan.rahim9@gmail.com';
      
      setSessionUser({ name: nameVal, email: emailVal }, true);
      showToast('Settings saved successfully!');
    });
  }

  const btnChangePassword = document.getElementById('btn-change-password');
  if (btnChangePassword) {
    btnChangePassword.addEventListener('click', () => {
      showToast('Password reset link sent to your email.');
    });
  }

  const btnResetDemoData = document.getElementById('btn-reset-demo-data');
  if (btnResetDemoData) {
    btnResetDemoData.addEventListener('click', () => {
      showToast('Demo data reset to default settings.');
    });
  }

  // Initial render
  renderBalance();
});

