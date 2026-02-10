/* Utilities */

const LS_PREFIX = 'ayed_step_intensive_2026__';

export function lsGet(key, fallback=null) {
  try {
    const raw = localStorage.getItem(LS_PREFIX + key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

export function lsSet(key, value) {
  try {
    localStorage.setItem(LS_PREFIX + key, JSON.stringify(value));
  } catch {
    // ignore
  }
}

export async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    // fallback
    try {
      const ta = document.createElement('textarea');
      ta.value = text;
      ta.style.position = 'fixed';
      ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.focus();
      ta.select();
      const ok = document.execCommand('copy');
      document.body.removeChild(ta);
      return ok;
    } catch {
      return false;
    }
  }
}

export function formatCurrency(amount, currency='ر.س') {
  const n = Number(amount);
  if (!Number.isFinite(n)) return String(amount);
  return `${n.toLocaleString('ar-SA')} ${currency}`;
}

export function msToParts(ms) {
  const total = Math.max(0, Math.floor(ms / 1000));
  const days = Math.floor(total / (24*3600));
  const hours = Math.floor((total % (24*3600)) / 3600);
  const mins = Math.floor((total % 3600) / 60);
  const secs = total % 60;
  return { days, hours, mins, secs };
}

export function encodeTelegramText(text) {
  return encodeURIComponent(text);
}

export function getTelegramLink(username, text) {
  const encoded = encodeTelegramText(text);
  return `https://t.me/${username}?text=${encoded}`;
}

export function nowMs() { return Date.now(); }

export function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function ensureEl(id) {
  const el = document.getElementById(id);
  if (!el) throw new Error(`Missing element #${id}`);
  return el;
}

export function showToast(message, type='info') {
  const toastEl = document.getElementById('liveToast');
  const toastBody = document.getElementById('liveToastBody');
  if (!toastEl || !toastBody || !window.bootstrap) return;

  toastBody.textContent = message;
  toastEl.classList.remove('text-bg-success','text-bg-danger','text-bg-warning','text-bg-info');
  const map = {
    success: 'text-bg-success',
    danger: 'text-bg-danger',
    warning: 'text-bg-warning',
    info: 'text-bg-info'
  };
  toastEl.classList.add(map[type] || 'text-bg-info');
  const t = bootstrap.Toast.getOrCreateInstance(toastEl, { delay: 4500 });
  t.show();
}
