import { lsGet, lsSet, msToParts, nowMs, randomInt, formatCurrency, showToast } from './utils.js';

function daysToMs(days){ return days * 24 * 60 * 60 * 1000; }

export function initDiscountTimer() {
  const el = document.getElementById('discountTimer');
  const priceNowEl = document.getElementById('priceNow');
  const priceOldEl = document.getElementById('priceOld');
  const priceBadgeEl = document.getElementById('discountBadge');
  if (!el || !window.AYED_CONFIG) return;

  const cfg = window.AYED_CONFIG;
  const currency = cfg.pricing.currency || 'ر.س';

  // prices
  if (priceOldEl) priceOldEl.textContent = formatCurrency(cfg.pricing.original, currency);

  function ensureEnd() {
    let end = lsGet('discountEnd', null);
    let cycleIdx = lsGet('discountCycleIdx', 0);

    if (!end) {
      end = nowMs() + daysToMs(cfg.pricing.initialDiscountDays);
      lsSet('discountEnd', end);
      lsSet('discountCycleIdx', 0);
      return { end, cycleIdx: 0 };
    }

    // expired? extend automatically
    if (nowMs() > end) {
      const cycle = cfg.pricing.discountExtensionsCycleDays || [3,7];
      const addDays = cycle[cycleIdx % cycle.length];
      end = nowMs() + daysToMs(addDays);
      cycleIdx = (cycleIdx + 1) % cycle.length;
      lsSet('discountEnd', end);
      lsSet('discountCycleIdx', cycleIdx);

      showToast(`انتهى العرض وفتحنا لك تمديد جديد ${addDays} أيام 🎉`, 'success');
    }

    return { end, cycleIdx };
  }

  function tick() {
    const { end } = ensureEnd();
    const left = end - nowMs();
    const { days, hours, mins, secs } = msToParts(left);

    el.textContent = `${days}ي ${String(hours).padStart(2,'0')}:${String(mins).padStart(2,'0')}:${String(secs).padStart(2,'0')}`;

    if (priceNowEl) priceNowEl.textContent = formatCurrency(cfg.pricing.discounted, currency);
    if (priceBadgeEl) priceBadgeEl.textContent = `خصم يوم التأسيس: ${formatCurrency(cfg.pricing.discounted, currency)}`;

    requestAnimationFrame(()=>{});
  }

  tick();
  setInterval(tick, 1000);
}

export function initSeatsCounter() {
  const el = document.getElementById('seatsCount');
  const bar = document.getElementById('seatsBar');
  if (!el || !window.AYED_CONFIG) return;

  const cfg = window.AYED_CONFIG.seats;
  let seats = lsGet('seatsAvailable', null);
  let nextDecayAt = lsGet('seatsNextDecayAt', null);

  if (typeof seats !== 'number') {
    seats = cfg.initialAvailable;
    lsSet('seatsAvailable', seats);
  }
  if (typeof nextDecayAt !== 'number') {
    nextDecayAt = nowMs() + randomInt(cfg.decayEveryMinutesMin, cfg.decayEveryMinutesMax) * 60 * 1000;
    lsSet('seatsNextDecayAt', nextDecayAt);
  }

  function scheduleNext() {
    nextDecayAt = nowMs() + randomInt(cfg.decayEveryMinutesMin, cfg.decayEveryMinutesMax) * 60 * 1000;
    lsSet('seatsNextDecayAt', nextDecayAt);
  }

  function updateUI() {
    el.textContent = `${seats}`;
    if (bar) {
      const max = Math.max(cfg.initialAvailable, cfg.refillWhenZero + cfg.initialAvailable);
      const pct = Math.max(0, Math.min(100, (seats / max) * 100));
      bar.style.width = `${pct}%`;
    }
  }

  function tick() {
    if (nowMs() > nextDecayAt) {
      const dec = randomInt(1, 2);
      seats = Math.max(cfg.minAvailable, seats - dec);

      if (seats <= 0) {
        seats = cfg.refillWhenZero;
        showToast('المقاعد خلصت وفتحنا دفعة إضافية 🎯', 'success');
      }

      lsSet('seatsAvailable', seats);
      scheduleNext();
    }
    updateUI();
  }

  tick();
  setInterval(tick, 1000);
}
