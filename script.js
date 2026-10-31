/* ========================================
   Amex Bank — Application Script
   ======================================== */

(function () {
  'use strict';

  // ---------- AUTH ----------
  const VALID_USER = 'Geraldfoss29';
  const VALID_PASS = 'EricaGeraldfoss1';
  const AUTH_KEY = 'amex_bank_auth';

  function isAuthenticated() {
    return sessionStorage.getItem(AUTH_KEY) === 'true' || localStorage.getItem(AUTH_KEY) === 'true';
  }

  function setAuth(remember) {
    if (remember) {
      localStorage.setItem(AUTH_KEY, 'true');
    } else {
      sessionStorage.setItem(AUTH_KEY, 'true');
    }
  }

  function clearAuth() {
    sessionStorage.removeItem(AUTH_KEY);
    localStorage.removeItem(AUTH_KEY);
  }

  // ---------- LOGIN PAGE ----------
  const loginForm = document.getElementById('loginForm');
  if (loginForm) {
    // Redirect if already logged in
    if (isAuthenticated()) {
      window.location.href = 'dashboard.html';
    }

    // Toggle password visibility
    const toggleBtn = document.getElementById('togglePassword');
    const passwordInput = document.getElementById('password');
    if (toggleBtn && passwordInput) {
      toggleBtn.addEventListener('click', function () {
        const isPassword = passwordInput.type === 'password';
        passwordInput.type = isPassword ? 'text' : 'password';
        const icon = toggleBtn.querySelector('i');
        icon.classList.toggle('fa-eye', !isPassword);
        icon.classList.toggle('fa-eye-slash', isPassword);
      });
    }

    // Forgot password
    const forgotLink = document.getElementById('forgotPassword');
    if (forgotLink) {
      forgotLink.addEventListener('click', function (e) {
        e.preventDefault();
        alert('Please contact Amex Bank Support at 1-800-AMEX-HELP to reset your password.');
      });
    }

    // Login submit
    loginForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const username = document.getElementById('username').value.trim();
      const password = document.getElementById('password').value;
      const remember = document.getElementById('rememberMe').checked;
      const errorEl = document.getElementById('loginError');
      const btn = document.getElementById('loginBtn');

      errorEl.style.display = 'none';

      // Simple loading state
      btn.classList.add('loading');
      btn.querySelector('.btn-text').textContent = 'Signing In...';

      setTimeout(function () {
        if (username === VALID_USER && password === VALID_PASS) {
          setAuth(remember);
          window.location.href = 'dashboard.html';
        } else {
          btn.classList.remove('loading');
          btn.querySelector('.btn-text').textContent = 'Sign In';
          errorEl.style.display = 'flex';
          passwordInput.value = '';
          passwordInput.focus();
        }
      }, 600);
    });
  }

  // ---------- DASHBOARD ----------
  const sidebar = document.getElementById('sidebar');
  if (sidebar) {
    // Protect dashboard
    if (!isAuthenticated()) {
      window.location.href = 'index.html';
      return;
    }

    // Navigation
    const navItems = document.querySelectorAll('.nav-item');
    const sections = document.querySelectorAll('.section');
    const viewBtns = document.querySelectorAll('[data-section]');

    function showSection(sectionId) {
      sections.forEach(function (s) {
        s.classList.toggle('active', s.id === sectionId);
      });
      navItems.forEach(function (item) {
        item.classList.toggle('active', item.dataset.section === sectionId);
      });
      // Close mobile sidebar
      sidebar.classList.remove('open');
      const overlay = document.getElementById('sidebarOverlay');
      if (overlay) overlay.classList.remove('active');
      // Scroll to top
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    navItems.forEach(function (item) {
      item.addEventListener('click', function (e) {
        e.preventDefault();
        showSection(item.dataset.section);
      });
    });

    viewBtns.forEach(function (btn) {
      if (!btn.classList.contains('nav-item')) {
        btn.addEventListener('click', function (e) {
          e.preventDefault();
          const section = btn.dataset.section;
          if (section) showSection(section);
        });
      }
    });

    // Mobile menu
    const menuToggle = document.getElementById('menuToggle');
    const closeSidebar = document.getElementById('closeSidebar');
    const overlay = document.getElementById('sidebarOverlay');

    if (menuToggle) {
      menuToggle.addEventListener('click', function () {
        sidebar.classList.add('open');
        if (overlay) overlay.classList.add('active');
      });
    }

    if (closeSidebar) {
      closeSidebar.addEventListener('click', function () {
        sidebar.classList.remove('open');
        if (overlay) overlay.classList.remove('active');
      });
    }

    if (overlay) {
      overlay.addEventListener('click', function () {
        sidebar.classList.remove('open');
        overlay.classList.remove('active');
      });
    }

    // Logout
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
      logoutBtn.addEventListener('click', function () {
        clearAuth();
        window.location.href = 'index.html';
      });
    }

    // Transaction search & filter
    const txSearch = document.getElementById('txSearch');
    const txFilter = document.getElementById('txFilter');
    const table = document.getElementById('transactionsTable');

    function filterTransactions() {
      if (!table) return;
      const query = (txSearch ? txSearch.value : '').toLowerCase();
      const account = txFilter ? txFilter.value : 'all';
      const rows = table.querySelectorAll('tbody tr');

      rows.forEach(function (row) {
        const text = row.textContent.toLowerCase();
        const rowAccount = row.dataset.account || '';
        const matchesSearch = !query || text.includes(query);
        const matchesAccount = account === 'all' || rowAccount === account;
        row.style.display = matchesSearch && matchesAccount ? '' : 'none';
      });
    }

    if (txSearch) txSearch.addEventListener('input', filterTransactions);
    if (txFilter) txFilter.addEventListener('change', filterTransactions);

    // Dark mode toggle
    const darkToggle = document.getElementById('darkModeToggle');
    if (darkToggle) {
      // Restore preference
      if (localStorage.getItem('amex_dark') === 'true') {
        document.body.classList.add('dark-mode');
        darkToggle.checked = true;
      }
      darkToggle.addEventListener('change', function () {
        document.body.classList.toggle('dark-mode', darkToggle.checked);
        localStorage.setItem('amex_dark', darkToggle.checked ? 'true' : 'false');
      });
    }
  }
})();
