import { lsGet, lsSet } from './utils.js';

export function initThemeToggle() {
  const btn = document.getElementById('themeToggle');
  const saved = lsGet('theme', window.AYED_CONFIG?.ui?.defaultTheme || 'light');
  applyTheme(saved);

  if (!btn) return;
  btn.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-bs-theme') || 'light';
    const next = current === 'dark' ? 'light' : 'dark';
    applyTheme(next);
    lsSet('theme', next);
  });
}

export function applyTheme(theme) {
  document.documentElement.setAttribute('data-bs-theme', theme === 'dark' ? 'dark' : 'light');
  const icon = document.getElementById('themeIcon');
  if (icon) icon.textContent = (theme === 'dark' ? '🌙' : '☀️');
}
