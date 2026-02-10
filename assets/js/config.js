/*
  إعدادات الموقع (عدّلها حسب احتياجك)
  - هذا الموقع ثابت (Static) ومناسب لـ GitHub Pages.
  - أي بيانات حساسة (مثل الآيبان) خليها هنا عشان تعدّلها بسهولة.
*/

window.AYED_CONFIG = {
  academy: {
    name: 'أكاديمية عايد الرسمية',
    brandName: 'A Y E D',
    telegramUsername: 'Ayed_Academy_2026',
    telegramGroupUrl: 'https://t.me/Academy_Ayed_2026',
  },

  course: {
    name: 'الدورة المكثفة لاختبار STEP 2026',
    shortName: 'STEP مكثف 2026',
    year: '2026',
    category: 'STEP',
  },

  pricing: {
    currency: 'ر.س',
    original: 449,
    discounted: 299,
    // يبدأ الخصم 7 أيام
    initialDiscountDays: 7,
    // عند انتهاء الخصم: أضف 3 أيام، ثم 7 أيام، ثم 3، ثم 7…
    discountExtensionsCycleDays: [3, 7],
  },

  seats: {
    // مقاعد “تفاعلية” (مؤشر تسويقي) — تقدّر تغيّر الأرقام
    initialAvailable: 37,
    minAvailable: 0,
    refillWhenZero: 20,
    // كل كم دقيقة ينقص رقم (تقريباً)
    decayEveryMinutesMin: 20,
    decayEveryMinutesMax: 55,
  },

  bankTransfer: {
    // ⚠️ عبّي البيانات الرسمية هنا
    bankName: '—',
    accountName: '—',
    iban: '—',
    accountNumber: '—',
    purpose: 'اشتراك الدورة المكثفة STEP 2026',
    notes: [
      'بعد التحويل صوّر/احفظ الإيصال وارفقه لنا في تلجرام مع رسالة الاشتراك.',
      'إذا حولت من بنك مختلف، أحياناً يظهر الإيصال بعد دقائق — لا تشيل هم.',
    ],
  },

  links: {
    register: 'register.html',
    bankTransfer: 'bank-transfer.html',
    seuStep: 'seu-step.html',
    courseContent: 'course.html',
  },

  ui: {
    defaultTheme: 'light', // light | dark
    enableToasts: true,
  }
};
