/**
 * PetPulse — Auth, RBAC & UX
 * ===========================
 * Roles:  Admin  > Staff  > Client
 *
 * PAGE ACCESS MAP
 * ───────────────
 * dashboard.html    → Admin, Staff
 * records.html      → Admin, Staff
 * applications.html → All logged-in (Client: read-only)
 * matchmaking.html  → All logged-in (Client: read-only)
 * reports.html      → Admin only
 * system-roles.html → Admin only
 * rescues.html      → Public
 * profile.html      → Logged-in users only
 */

/* ─── Smooth page transitions ───────────────────────────── */
(function () {
  // Inject global transition styles once
  if (!document.getElementById('pp-transition-styles')) {
    const s = document.createElement('style');
    s.id = 'pp-transition-styles';
    s.textContent = `
      body { opacity: 0; transition: opacity 0.25s ease; }
      body.pp-ready { opacity: 1; }

      /* Navbar scroll shadow */
      nav { transition: box-shadow 0.3s ease, background-color 0.3s ease; }
      nav.pp-scrolled { box-shadow: 0 4px 20px rgba(0,0,0,0.13); }

      /* Dropdown fade-in */
      .dropdown-content {
        display: block !important;
        opacity: 0;
        pointer-events: none;
        transform: translateY(-6px);
        transition: opacity 0.18s ease, transform 0.18s ease;
      }
      .dropdown:hover .dropdown-content,
      .dropdown.pp-open .dropdown-content {
        opacity: 1;
        pointer-events: auto;
        transform: translateY(0);
      }

      /* Active nav link underline */
      .nav-links a.pp-active {
        opacity: 1;
        border-bottom: 2px solid rgba(255,255,255,0.8);
        padding-bottom: 2px;
      }

      /* Card hover lift (applied via JS to all .card elements) */
      .pp-hoverable {
        transition: transform 0.2s ease, box-shadow 0.2s ease;
      }
      .pp-hoverable:hover {
        transform: translateY(-3px);
        box-shadow: 0 12px 28px rgba(130,178,192,0.22);
      }

      /* Access-denied page fade */
      .pp-denied-wrap {
        animation: ppFadeUp 0.35s ease both;
      }
      @keyframes ppFadeUp {
        from { opacity: 0; transform: translateY(18px); }
        to   { opacity: 1; transform: translateY(0); }
      }

      /* Toast */
      #pp-toast {
        position: fixed;
        bottom: 28px;
        right: 28px;
        background: #2c3e50;
        color: #fff;
        padding: 13px 22px;
        border-radius: 12px;
        font-family: 'Nunito', sans-serif;
        font-weight: 700;
        font-size: 0.9rem;
        box-shadow: 0 6px 24px rgba(0,0,0,0.18);
        opacity: 0;
        transform: translateY(10px);
        transition: opacity 0.25s ease, transform 0.25s ease;
        pointer-events: none;
        z-index: 9999;
      }
      #pp-toast.pp-toast-show {
        opacity: 1;
        transform: translateY(0);
      }
    `;
    document.head.appendChild(s);
  }

  // Fade the page in once DOM + styles are ready
  window.addEventListener('DOMContentLoaded', () => {
    requestAnimationFrame(() => document.body.classList.add('pp-ready'));
  });
})();

/* ─── Role helpers ──────────────────────────────────────── */
const ROLES = { ADMIN: 'Admin', STAFF: 'Staff', CLIENT: 'Client' };

function getRole()        { return localStorage.getItem('profileRole'); }
function getName()        { return localStorage.getItem('profileName') || getRole() || 'User'; }
function isLoggedIn()     { return localStorage.getItem('isLoggedIn') === 'true'; }
function isAdmin()        { return getRole() === ROLES.ADMIN; }
function isStaff()        { return getRole() === ROLES.STAFF; }
function isClient()       { return getRole() === ROLES.CLIENT; }
function isStaffOrAdmin() { return isAdmin() || isStaff(); }

/* ─── Page-level guards ─────────────────────────────────── */
function requireRole(allowedRoles, redirectTo = 'login.html') {
  if (!isLoggedIn()) { _navigate(redirectTo); return false; }
  if (!allowedRoles.includes(getRole())) {
    showAccessDenied(isClient() ? 'rescues.html' : 'dashboard.html');
    return false;
  }
  return true;
}

function requireLogin(redirectTo = 'login.html') {
  if (!isLoggedIn()) { _navigate(redirectTo); return false; }
  return true;
}

/** Fade out then navigate */
function _navigate(url) {
  document.body.style.transition = 'opacity 0.2s ease';
  document.body.style.opacity = '0';
  setTimeout(() => { window.location.href = url; }, 200);
}

function showAccessDenied(redirectTo = 'index.html') {
  document.body.innerHTML = `
    <div class="pp-denied-wrap" style="display:flex;flex-direction:column;align-items:center;
         justify-content:center;min-height:100vh;font-family:'Nunito',sans-serif;
         text-align:center;padding:40px;background:#fff;">
      <div style="font-size:4rem;margin-bottom:20px;">🔒</div>
      <h2 style="color:#2c3e50;margin-bottom:12px;font-size:1.8rem;font-weight:800;">Access Denied</h2>
      <p style="color:#666;max-width:360px;margin-bottom:28px;line-height:1.7;">
        You don't have permission to view this page.<br>
        Your role: <strong>${getRole() || 'Guest'}</strong>
      </p>
      <a href="${redirectTo}"
         style="background:#a8dbd9;color:#2c3e50;padding:12px 28px;border-radius:50px;
                text-decoration:none;font-weight:800;transition:transform 0.2s,box-shadow 0.2s;"
         onmouseover="this.style.transform='translateY(-2px)';this.style.boxShadow='0 6px 16px rgba(0,0,0,0.1)'"
         onmouseout="this.style.transform='';this.style.boxShadow=''">
        ← Go Back
      </a>
    </div>`;
  document.body.style.opacity = '1';
}

/* ─── Element visibility helpers ───────────────────────── */
function showFor(selector, roles) {
  document.querySelectorAll(selector).forEach(el => {
    el.style.display = roles.includes(getRole()) ? '' : 'none';
  });
}
function hideFor(selector, roles) {
  document.querySelectorAll(selector).forEach(el => {
    if (roles.includes(getRole())) el.style.display = 'none';
  });
}
function removeFor(selector, roles) {
  if (roles.includes(getRole()))
    document.querySelectorAll(selector).forEach(el => el.remove());
}

/* ─── Role badge ────────────────────────────────────────── */
function roleBadgeHTML() {
  const map = {
    Admin:  { bg: '#fdecea', color: '#c0392b', emoji: '🛡️' },
    Staff:  { bg: '#d4f0e3', color: '#1a7a4a', emoji: '🏥' },
    Client: { bg: '#e8f4fd', color: '#2980b9', emoji: '🐾' },
  };
  const r = getRole();
  const c = map[r] || { bg: '#f0f0f0', color: '#666', emoji: '👤' };
  return `<span style="background:${c.bg};color:${c.color};padding:3px 10px;
    border-radius:50px;font-size:0.76rem;font-weight:800;margin-left:6px;
    vertical-align:middle;display:inline-block;">${c.emoji} ${r}</span>`;
}

/* ─── Navbar renderer ───────────────────────────────────── */
function renderNavbarButton() {
  const authContainer = document.getElementById('navAuthContainer');
  if (!authContainer) return;

  if (isLoggedIn()) {
    const name = getName();

    // Hide Staff Portal dropdown for clients
    const staffPortalNav = document.querySelector('.nav-links .dropdown');
    if (staffPortalNav && isClient()) staffPortalNav.style.display = 'none';

    // Hide System Roles link for non-admins
    const sysRolesLink = document.getElementById('nav-system-roles');
    if (sysRolesLink && !isAdmin()) sysRolesLink.style.display = 'none';

    authContainer.innerHTML = `
      <div class="dropdown" style="display:inline-block;margin-left:0;">
        <a href="#" class="btn btn-accent dropbtn"
           style="color:var(--text-heading);padding:8px 20px;display:flex;
                  align-items:center;gap:8px;border-radius:50px;">
          <span>👤</span> ${name} ${roleBadgeHTML()} ▼
        </a>
        <div class="dropdown-content" style="right:0;left:auto;min-width:190px;">
          <a href="profile.html">Edit Profile</a>
          ${isClient()       ? '<a href="applications.html">My Applications</a>' : ''}
          ${isStaffOrAdmin() ? '<a href="dashboard.html">Dashboard</a>'         : ''}
          ${isAdmin()        ? '<a href="system-roles.html">System Roles</a>'   : ''}
          <a href="#" id="logoutBtn" style="color:#e74c3c;border-top:1px solid #f0f0f0;margin-top:4px;">Log Out</a>
        </div>
      </div>`;

    document.getElementById('logoutBtn').addEventListener('click', function (e) {
      e.preventDefault();
      ['isLoggedIn','profileRole','profileName','profileEmail'].forEach(k => localStorage.removeItem(k));
      _navigate('login.html');
    });
  } else {
    authContainer.innerHTML = `
      <a href="login.html" class="btn btn-accent"
         style="color:var(--text-heading);padding:8px 20px;margin-left:0;border-radius:50px;">
        Log In
      </a>`;
  }
}

/* ─── Role banner greeting ──────────────────────────────── */
function renderRoleBanner(containerId) {
  const el = document.getElementById(containerId);
  if (!el) return;
  const greetings = {
    Admin:  `Welcome back, ${getName()}. You have full admin access.`,
    Staff:  `Welcome back, ${getName()}. Here's what's happening at the shelter today.`,
    Client: `Welcome, ${getName()}! Browse our rescues and track your adoption applications.`,
  };
  el.textContent = greetings[getRole()] || `Welcome, ${getName()}.`;
}

/* ─── Global toast ──────────────────────────────────────── */
function ppToast(msg, duration = 2800) {
  let t = document.getElementById('pp-toast');
  if (!t) {
    t = document.createElement('div');
    t.id = 'pp-toast';
    document.body.appendChild(t);
  }
  t.textContent = msg;
  t.classList.add('pp-toast-show');
  clearTimeout(t._timer);
  t._timer = setTimeout(() => t.classList.remove('pp-toast-show'), duration);
}

/* ─── UX enhancements (run after DOM ready) ─────────────── */
document.addEventListener('DOMContentLoaded', function () {
  renderNavbarButton();
  _highlightActiveNav();
  _scrollNavShadow();
  _hoverableCards();
  _smoothInternalLinks();
});

/** Underline the nav link matching the current page */
function _highlightActiveNav() {
  const current = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links > a').forEach(a => {
    const href = a.getAttribute('href') || '';
    if (href === current || (current === '' && href === 'index.html')) {
      a.classList.add('pp-active');
    }
  });
}

/** Add a shadow to the navbar once the user scrolls */
function _scrollNavShadow() {
  const nav = document.querySelector('nav');
  if (!nav) return;
  const onScroll = () => nav.classList.toggle('pp-scrolled', window.scrollY > 10);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

/** Give .card elements a subtle hover lift */
function _hoverableCards() {
  document.querySelectorAll('.card').forEach(c => c.classList.add('pp-hoverable'));
}

/** Fade out before following internal links (same-origin) */
function _smoothInternalLinks() {
  document.addEventListener('click', function (e) {
    const a = e.target.closest('a');
    if (!a) return;
    const href = a.getAttribute('href');
    if (!href || href.startsWith('#') || href.startsWith('mailto') ||
        href.startsWith('http') || a.target === '_blank') return;
    // Skip logout button (handled separately)
    if (a.id === 'logoutBtn') return;
    e.preventDefault();
    _navigate(href);
  });
}
