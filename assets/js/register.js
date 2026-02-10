import { QUIZ_BANK } from './quiz-bank.js';
import { copyText, getTelegramLink, showToast, randomInt } from './utils.js';

function $(id){ return document.getElementById(id); }

function show(el, yes=true){
  if (!el) return;
  el.classList.toggle('d-none', !yes);
}

function val(id){ const el=$(id); return el ? el.value.trim() : '' }

function checked(id){ const el=$(id); return !!(el && el.checked); }

function getCheckedValues(name){
  return Array.from(document.querySelectorAll(`input[name="${name}"]:checked`)).map(x=>x.value);
}

function buildStudyPlan({ timeline, weak, difficulties, quizResult }) {
  const pieces = [];
  const w = weak || (quizResult?.weakest || 'عام');
  pieces.push(`🎯 تركيزك الأساسي: ${w}`);

  if (difficulties?.length) {
    pieces.push(`⚠️ الصعوبات: ${difficulties.join('، ')}`);
  }

  const add = (...lines)=>pieces.push(...lines);

  switch (timeline) {
    case '<24h':
      add(
        '🕒 عندك أقل من 24 ساعة: لا تتشتت — ركّز على نقاط رفع الدرجة بسرعة',
        '1) 60 دقيقة قواعد أهم 20 قاعدة (الأزمنة + agreement + prepositions).',
        '2) 45 دقيقة قراءة: skimming/scanning + حل 2 passages.',
        '3) 30 دقيقة مفردات: كلمات الربط + academic words.',
        '4) 45 دقيقة محاكاة مصغّرة (20 سؤال) + مراجعة أخطاءك.',
        '✅ داخل الدورة: ادخ̆ل قسم الاستراتيجيات + نموذج واحد كامل الليلة.'
      );
      break;
    case '3days':
      add(
        '📅 خلال 3 أيام: نبغى “قفزة” مركزة',
        'اليوم 1: قواعد + مفردات (2 ساعة) + reading (ساعة).',
        'اليوم 2: listening + reading (2 ساعة) + مراجعة أخطاء.',
        'اليوم 3: نموذج كامل + تحليل + مراجعة مختصرة.'
      );
      break;
    case '1week':
      add(
        '📅 خلال أسبوع: نضبط الأساس + نماذج',
        'يوميًا: 45 دقيقة مفردات + 60 دقيقة قراءة/استماع بالتبادل.',
        '3 أيام في الأسبوع: قواعد مركزة (45 دقيقة).',
        'آخر يومين: نموذجين كاملين + تحليل أخطاء + مراجعة كلمات.'
      );
      break;
    case '2weeks':
      add(
        '📅 خلال أسبوعين: أفضل سيناريو لرفع واضح',
        'الأسبوع الأول: تأسيس قوي (قواعد + مفردات) + reading يومي.',
        'الأسبوع الثاني: نماذج مكثفة + تصحيح + تثبيت نقاط الضعف.',
        'هدفك: 4 نماذج كاملة على الأقل + مراجعة أخطاء.'
      );
      break;
    case '1month':
      add(
        '📅 خلال شهر: خطة ذهبية (تأسيس → تطبيق → نماذج)',
        'الأسبوع 1: قواعد + punctuation + vocabulary basics.',
        'الأسبوع 2: reading strategies + listening routines.',
        'الأسبوع 3: compositional analysis + mixed practice.',
        'الأسبوع 4: 6 نماذج كاملة + تحليل + مراجعة نهائية.'
      );
      break;
    default:
      add(
        '📅 وقتك مفتوح: نبني مستوى قوي ونضبط هدفك بالراحة',
        '3–4 أيام تأسيس أسبوعيًا + نموذج واحد نهاية كل أسبوع.'
      );
  }

  if (quizResult) {
    add(`📊 نتيجتك في اختبار الـ20 سؤال: ${quizResult.score}/20 (تقريبي)`);
    const breakdown = Object.entries(quizResult.bySection)
      .map(([k,v]) => `${k}:${v.correct}/${v.total}`)
      .join(' | ');
    add(`تفصيل سريع: ${breakdown}`);
  }

  return pieces.join('\n');
}

function pickRandomQuestions(bank, count=20) {
  const copy = bank.slice();
  // shuffle
  for (let i=copy.length-1;i>0;i--) {
    const j = Math.floor(Math.random()*(i+1));
    [copy[i],copy[j]] = [copy[j],copy[i]];
  }
  return copy.slice(0, Math.min(count, copy.length));
}

function computeQuizResult(questions, answers) {
  let score = 0;
  const bySection = {};
  questions.forEach((q, idx) => {
    const sec = q.section;
    if (!bySection[sec]) bySection[sec] = { correct:0, total:0 };
    bySection[sec].total += 1;
    const a = answers[idx];
    if (a === q.answer) {
      score += 1;
      bySection[sec].correct += 1;
    }
  });

  // weakest section by ratio
  let weakest = null;
  let worstRatio = 999;
  Object.entries(bySection).forEach(([sec, stat]) => {
    const r = stat.total ? stat.correct/stat.total : 1;
    if (r < worstRatio) {
      worstRatio = r;
      weakest = sec;
    }
  });

  const names = {
    grammar: 'القواعد (Structure)',
    vocab: 'المفردات',
    reading: 'القراءة (Reading)',
    listening: 'الاستماع (Listening)',
    writing: 'تحليل كتابي (CA)'
  };

  return {
    score,
    weakest: names[weakest] || weakest,
    bySection: {
      'Grammar': bySection.grammar || {correct:0,total:0},
      'Vocab': bySection.vocab || {correct:0,total:0},
      'Reading': bySection.reading || {correct:0,total:0},
      'Listening': bySection.listening || {correct:0,total:0},
      'CA': bySection.writing || {correct:0,total:0}
    }
  };
}

export function initRegisterForm() {
  const form = $('registerForm');
  if (!form || !window.AYED_CONFIG) return;

  const testedYes = $('testedYes');
  const testedNo = $('testedNo');
  const testedBox = $('testedBox');

  const bookedYes = $('bookedYes');
  const bookedNo = $('bookedNo');
  const bookedBox = $('bookedBox');

  const weakSelect = $('weakSection');
  const quizCta = $('quizCta');
  const quizSummary = $('quizSummary');
  const planBox = $('planBox');
  const planText = $('planText');

  let quizQuestions = [];
  let quizAnswers = [];
  let quizResult = null;

  function updateConditional() {
    show(testedBox, testedYes && testedYes.checked);
    show(bookedBox, bookedYes && bookedYes.checked);

    const weak = weakSelect?.value;
    const needsQuiz = weak === 'auto';
    show(quizCta, needsQuiz);
    if (!needsQuiz) {
      quizResult = null;
      if (quizSummary) quizSummary.innerHTML = '';
    }
  }

  testedYes?.addEventListener('change', updateConditional);
  testedNo?.addEventListener('change', updateConditional);
  bookedYes?.addEventListener('change', updateConditional);
  bookedNo?.addEventListener('change', updateConditional);
  weakSelect?.addEventListener('change', updateConditional);
  updateConditional();

  // Quiz modal
  const quizModalEl = $('quizModal');
  const quizTitle = $('quizTitle');
  const quizBody = $('quizBody');
  const quizNext = $('quizNext');
  const quizPrev = $('quizPrev');
  const quizFinish = $('quizFinish');
  let qi = 0;

  function renderQuestion() {
    const q = quizQuestions[qi];
    if (!q) return;
    quizTitle.textContent = `اختبار سريع (سؤال ${qi+1} من ${quizQuestions.length})`;

    const chosen = quizAnswers[qi];
    quizBody.innerHTML = `
      <div class="mb-2 small text-secondary">${q.prompt}</div>
      <div class="fs-5 fw-semibold mb-3">${q.stem}</div>
      <div class="list-group">
        ${q.options.map((op, idx) => `
          <label class="list-group-item d-flex gap-2 align-items-start">
            <input class="form-check-input mt-1" type="radio" name="q${qi}" value="${idx}" ${chosen===idx?'checked':''}>
            <span>${op}</span>
          </label>
        `).join('')}
      </div>
    `;

    quizPrev.disabled = qi === 0;
    quizNext.classList.toggle('d-none', qi === quizQuestions.length-1);
    quizFinish.classList.toggle('d-none', qi !== quizQuestions.length-1);

    quizBody.querySelectorAll(`input[name="q${qi}"]`).forEach((r) => {
      r.addEventListener('change', () => {
        quizAnswers[qi] = Number(r.value);
      });
    });
  }

  function openQuiz() {
    quizQuestions = pickRandomQuestions(QUIZ_BANK, 20);
    quizAnswers = Array(quizQuestions.length).fill(null);
    qi = 0;
    renderQuestion();

    const modal = bootstrap.Modal.getOrCreateInstance(quizModalEl, { backdrop:'static' });
    modal.show();
  }

  quizCta?.addEventListener('click', openQuiz);

  quizNext?.addEventListener('click', () => {
    if (quizAnswers[qi] === null) {
      showToast('اختَر إجابة قبل تكمل 🙏', 'warning');
      return;
    }
    qi += 1;
    renderQuestion();
  });

  quizPrev?.addEventListener('click', () => {
    qi = Math.max(0, qi-1);
    renderQuestion();
  });

  quizFinish?.addEventListener('click', () => {
    if (quizAnswers[qi] === null) {
      showToast('اختَر إجابة قبل ما تنهي 🙏', 'warning');
      return;
    }

    quizResult = computeQuizResult(quizQuestions, quizAnswers);

    // show summary
    if (quizSummary) {
      quizSummary.innerHTML = `
        <div class="alert alert-success mb-0">
          <div class="fw-bold mb-1">تم ✅</div>
          <div>نتيجتك التقريبية: <b>${quizResult.score}/20</b></div>
          <div>أضعف محور (تقريبي): <b>${quizResult.weakest}</b></div>
        </div>
      `;
    }

    // close modal
    bootstrap.Modal.getInstance(quizModalEl)?.hide();

    // auto generate plan preview
    const timeline = val('timeline');
    const difficulties = getCheckedValues('difficulties');
    const plan = buildStudyPlan({ timeline, weak: quizResult.weakest, difficulties, quizResult });

    show(planBox, true);
    planText.value = plan;
    showToast('طلعنا لك خطة مذاكرة سريعة ✨ تقدر تنسخها أو نخليها تنرسل مع رسالة الاشتراك', 'success');
  });

  // Generate plan button
  $('buildPlanBtn')?.addEventListener('click', () => {
    const weak = val('weakSection');
    const timeline = val('timeline');
    const difficulties = getCheckedValues('difficulties');

    const weakLabel = {
      grammar:'القواعد (Structure)',
      vocab:'المفردات',
      reading:'القراءة (Reading)',
      listening:'الاستماع (Listening)',
      writing:'تحليل كتابي (CA)',
    }[weak] || (weak==='auto' ? (quizResult?.weakest || '') : weak);

    const plan = buildStudyPlan({ timeline, weak: weakLabel, difficulties, quizResult });
    show(planBox, true);
    planText.value = plan;
    showToast('تم تجهيز الخطة ✅', 'success');
  });

  // Receipt preview
  const receipt = $('receipt');
  const receiptInfo = $('receiptInfo');
  receipt?.addEventListener('change', () => {
    const f = receipt.files && receipt.files[0];
    if (!f) {
      receiptInfo.textContent = 'ما تم اختيار ملف.';
      return;
    }
    receiptInfo.textContent = `تم اختيار: ${f.name}`;
  });

  // Build Telegram message
  function buildMessage() {
    const cfg = window.AYED_CONFIG;

    const name = val('fullName');
    const phone = val('phone');
    const email = val('email');
    const university = val('university');

    const tested = (testedYes && testedYes.checked) ? 'نعم' : 'لا';
    const prevScore = val('prevScore');
    const targetScore = val('targetScore');

    const booked = (bookedYes && bookedYes.checked) ? 'نعم' : 'لا';
    const timeline = val('timeline');
    const timelineLabel = {
      '<24h':'أقل من 24 ساعة',
      '3days':'خلال 3 أيام',
      '1week':'خلال أسبوع',
      '2weeks':'خلال أسبوعين',
      '1month':'خلال شهر',
      'more':'أكثر من شهر / غير محدد'
    }[timeline] || 'غير محدد';

    const weak = val('weakSection');
    const weakLabel = {
      grammar:'القواعد (Structure)',
      vocab:'المفردات',
      reading:'القراءة (Reading)',
      listening:'الاستماع (Listening)',
      writing:'تحليل كتابي (CA)',
      auto:'خلّ الموقع يحدد'
    }[weak] || weak;

    const diffs = getCheckedValues('difficulties');
    const diffsLine = diffs.length ? diffs.join('، ') : '—';

    const plan = val('planText');

    const f = receipt?.files && receipt.files[0];
    const receiptName = f ? f.name : 'سأرفقه الآن/لاحقًا';

    const price = cfg.pricing.discounted;

    const lines = [
      `السلام عليكم، أبغى تأكيد اشتراكي في: ${cfg.course.name}`,
      '',
      `الاسم: ${name}`,
      `الجوال: ${phone}`,
      `الإيميل: ${email}`,
      `الجامعة/الجهة: ${university}`,
      '',
      `هل اختبرت STEP سابقًا؟ ${tested}`,
      tested === 'نعم' ? `درجتي السابقة: ${prevScore || '—'}` : null,
      `الدرجة المستهدفة: ${targetScore || '—'}`,
      `واجهت صعوبة في: ${diffsLine}`,
      '',
      `هل حجزت موعد اختبارك؟ ${booked}`,
      booked === 'نعم' ? `باقي على الاختبار: ${timelineLabel}` : null,
      `أضعف قسم عندي: ${weakLabel}${quizResult ? ` (نتيجة 20 سؤال: ${quizResult.score}/20، أضعف محور: ${quizResult.weakest})` : ''}`,
      '',
      `الخطة المقترحة (مختصر):\n${plan || '—'}`,
      '',
      `تم التحويل: نعم`,
      `قيمة التحويل: ${price} ر.س (خصم يوم التأسيس)`,
      `اسم ملف الإيصال: ${receiptName}`,
      '',
      `ملاحظة: الموقع ثابت، لذلك راح أرفق الإيصال هنا في نفس المحادثة 👍`,
    ].filter(Boolean);

    return lines.join('\n');
  }

  const copyMsgBtn = $('copyMsgBtn');
  const openTgBtn = $('openTgBtn');

  async function validate() {
    // Basic validation
    const required = ['fullName','phone','email'];
    for (const id of required) {
      if (!val(id)) {
        showToast('فضلاً عبّي البيانات الأساسية كاملة 🙏', 'warning');
        $(id)?.focus();
        return false;
      }
    }

    // agreements
    if (!checked('agreeTerms') || !checked('agreeRefund') || !checked('agreeUndertaking')) {
      showToast('لازم توافق على التعهدات وسياسة الاسترجاع قبل التأكيد ✅', 'warning');
      return false;
    }

    // if tested yes then prevScore recommended
    if (testedYes && testedYes.checked && !val('prevScore')) {
      showToast('اختر درجتك السابقة (لو متذكر) عشان نبني خطة أدق 🙏', 'info');
    }

    // if booked yes then timeline required
    if (bookedYes && bookedYes.checked && !val('timeline')) {
      showToast('حدد كم باقي على اختبارك 🙏', 'warning');
      $('timeline')?.focus();
      return false;
    }

    // if weak auto but quiz not done
    if (val('weakSection') === 'auto' && !quizResult) {
      showToast('اخترت "خل الموقع يحدد" — سو اختبار الـ20 سؤال أول 👍', 'warning');
      return false;
    }

    // plan is optional, but recommended
    return true;
  }

  copyMsgBtn?.addEventListener('click', async () => {
    if (!(await validate())) return;
    const msg = buildMessage();
    const ok = await copyText(msg);
    showToast(ok ? 'تم نسخ رسالة الاشتراك ✅' : 'ما قدرنا ننسخ الرسالة…', ok ? 'success' : 'warning');
  });

  openTgBtn?.addEventListener('click', async () => {
    if (!(await validate())) return;
    const msg = buildMessage();
    const link = getTelegramLink(window.AYED_CONFIG.academy.telegramUsername, msg);

    // Best-effort: open Telegram
    window.open(link, '_blank');

    // also auto-copy
    copyText(msg).then(()=>{});

    // go to success page
    setTimeout(() => {
      window.location.href = 'success.html';
    }, 600);
  });

  // scroll helper
  $('goBankBtn')?.addEventListener('click', () => {
    window.location.href = window.AYED_CONFIG.links.bankTransfer;
  });
}

// Auto-init
document.addEventListener('DOMContentLoaded', () => {
  try { initRegisterForm(); } catch(e) { console.error(e); }
});
