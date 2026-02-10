import { showToast } from './utils.js';

export function initPWA() {
  // Service worker
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./sw.js').catch(()=>{});
  }

  const installBtn = document.getElementById('installBtn');
  const iosHint = document.getElementById('iosInstallHint');
  let deferredPrompt = null;

  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    if (installBtn) installBtn.classList.remove('d-none');
  });

  if (installBtn) {
    installBtn.addEventListener('click', async () => {
      if (!deferredPrompt) {
        // iOS or browser doesn't support
        if (iosHint) iosHint.classList.remove('d-none');
        showToast('إذا أنت على آيفون: من زر المشاركة → Add to Home Screen 📲', 'info');
        return;
      }

      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice.catch(()=>({outcome:'dismissed'}));
      if (outcome === 'accepted') showToast('تم! انثبتت عندك ✨', 'success');
      deferredPrompt = null;
      installBtn.classList.add('d-none');
    });
  }
}
