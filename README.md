# AYED – STEP Intensive 2026 (Static + GitHub Pages)

موقع ثابت للدورة المكثفة لاختبار STEP 2026، جاهز للنشر على GitHub Pages.

## أهم الملفات
- `index.html` الصفحة الرئيسية
- `course.html` فهرس ومحتوى الدورة
- `seu-step.html` صفحة خاصة بـ STEP في الجامعة السعودية الإلكترونية
- `bank-transfer.html` صفحة بيانات التحويل البنكي (نسخ/لصق)
- `register.html` نموذج التسجيل + اختبار 20 سؤال + رسالة تلجرام جاهزة
- `assets/js/config.js` **أهم ملف**: عدّل الأسعار/الآيبان/الحسابات/الروابط
- `assets/manifest.webmanifest` + `sw.js` لتفعيل PWA

## تشغيل محلياً
افتح `index.html` مباشرة أو استخدم أي سيرفر بسيط.

## نشر على GitHub Pages
1) سوّ Repo جديد
2) ارفع الملفات كلها في Root
3) من Settings → Pages → اختر `Deploy from a branch` ثم `main / root`
4) ادخل الرابط ويشتغل معك.

## تحديث بيانات التحويل البنكي
روح لملف:
`assets/js/config.js` ثم غيّر:
- `bankTransfer.bankName`
- `bankTransfer.accountName`
- `bankTransfer.iban`
- `bankTransfer.accountNumber`

## ملاحظة مهمة
الموقع Static (بدون Backend) لذلك:
- رفع الإيصال داخل الموقع غير محفوظ
- الطالب يرفق الإيصال داخل تلجرام بعد الضغط على زر تأكيد الاشتراك
