import { showToast } from './utils.js';

const FAQ = [
  {
    q: 'كيف أسجل؟',
    a: 'بسيطة: ادخل نموذج التسجيل، عبّي بياناتك، حوّل المبلغ، وارفق الإيصال في رسالة تلجرام الجاهزة — وخلاص ✅'
  },
  {
    q: 'كيف أحول؟',
    a: 'بتلقى صفحة بيانات التحويل فيها زر نسخ للايبان والاسم والحساب، وبعدها يرجعك مباشرة لنموذج التسجيل.'
  },
  {
    q: 'هل لازم STEP للجامعة السعودية الإلكترونية؟',
    a: 'بالنسبة للسنة الأولى المشتركة نعم الاختبار مطلوب/مؤثر على معادلة اللغة الإنجليزية، وشرحنا التفاصيل بصفحة (STEP في الجامعة السعودية الإلكترونية).' 
  },
  {
    q: 'كيف أعرف أضعف قسم عندي؟',
    a: 'إذا ما تدري، سوّ لك اختبار تحديد مستوى سريع (20 سؤال) داخل نموذج التسجيل، ويطلع لك تحليل سريع وخطة مذاكرة.'
  },
  {
    q: 'كم مدة الخصم؟',
    a: 'المؤقت عندك في الصفحة يوضح المتبقي، وإذا انتهى ينفتح تمديد تلقائي لفترة محدودة.'
  },
];

function addMsg(container, text, who='bot') {
  const div = document.createElement('div');
  div.className = `msg ${who}`;
  div.textContent = text;
  container.appendChild(div);
  container.scrollTop = container.scrollHeight;
}

export function initAssistant() {
  const fab = document.getElementById('assistantFab');
  const panel = document.getElementById('assistantPanel');
  const close = document.getElementById('assistantClose');
  const msgBox = document.getElementById('assistantMessages');
  const quick = document.getElementById('assistantQuick');

  if (!fab || !panel || !msgBox || !quick) return;

  const open = () => {
    panel.classList.add('open');
    if (!panel.dataset.booted) {
      addMsg(msgBox, 'هلا والله 👋 أنا مساعد أكاديمية عايد. وش تحتاج بالضبط؟');
      FAQ.slice(0,4).forEach(({q}) => {
        const b = document.createElement('button');
        b.type='button';
        b.className='btn btn-sm btn-outline-primary';
        b.textContent=q;
        b.addEventListener('click', ()=>handleQuestion(q));
        quick.appendChild(b);
      });
      panel.dataset.booted = '1';
    }
  };

  const closeIt = () => panel.classList.remove('open');

  const handleQuestion = (qText) => {
    addMsg(msgBox, qText, 'user');
    const hit = FAQ.find(x => x.q === qText);
    setTimeout(() => addMsg(msgBox, hit ? hit.a : 'تمام 👌 ارسل سؤالك بشكل أوضح وأنا معك.'), 250);
  };

  fab.addEventListener('click', () => {
    if (panel.classList.contains('open')) closeIt();
    else open();
  });

  if (close) close.addEventListener('click', closeIt);

  // صيغ مشاركة يوم التأسيس (اختياري)
  const shareBtn = document.getElementById('assistantShare');
  if (shareBtn) {
    shareBtn.addEventListener('click', () => {
      showToast('تلقاها في أسفل الصفحة داخل قسم المشاركة ✨', 'info');
      const sec = document.getElementById('shareSection');
      if (sec) sec.scrollIntoView({behavior:'smooth'});
    });
  }
}
