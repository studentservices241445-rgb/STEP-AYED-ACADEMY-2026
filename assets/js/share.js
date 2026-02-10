import { copyText, showToast } from './utils.js';

export function initShareButtons() {
  const btn = document.getElementById('shareBtn');
  if (!btn) return;

  btn.addEventListener('click', async () => {
    const title = document.title;
    const url = location.href;
    const text = (window.AYED_CONFIG ?
      `خصم يوم التأسيس على ${window.AYED_CONFIG.course.name} — سجل من هنا 👇` :
      'سجل الآن 👇');

    if (navigator.share) {
      try {
        await navigator.share({ title, text, url });
        return;
      } catch {
        // ignore
      }
    }

    const ok = await copyText(url);
    if (ok) showToast('تم نسخ رابط الصفحة ✅', 'success');
    else showToast('ما قدرنا ننسخ الرابط… انسخه يدويًا من شريط العنوان 🙏', 'warning');
  });
}

export function getFoundingDayShareCopy() {
  const cfg = window.AYED_CONFIG;
  const url = location.origin + location.pathname.replace(/\/[^\/]*$/, '/') + 'index.html';
  const course = cfg?.course?.name || 'الدورة المكثفة';
  const price = cfg?.pricing?.discounted ?? 299;
  return {
    x: `🎉 خصم يوم التأسيس على ${course}\nالسعر الآن: ${price} ر.س بدل السعر القديم\nسجّل هنا: ${url}\n#أكاديمية_عايد #يوم_التأسيس #STEP2026`,
    whatsapp: `🎉 خصم يوم التأسيس على ${course}\nالسعر الآن: ${price} ر.س\nرابط التسجيل: ${url}`,
    telegram: `🎉 خصم يوم التأسيس على ${course}\nالسعر الآن: ${price} ر.س\nرابط التسجيل: ${url}`
  };
}
