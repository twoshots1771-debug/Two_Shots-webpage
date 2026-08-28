# Two Shots Studio

هذه نسخة مستقلة من موقع **Two Shots**، جاهزة للرفع إلى GitHub واستخدامها مع GitHub Pages.

## التشغيل محلياً

ثبّت Node.js (إصدار 20 أو أحدث)، ثم نفّذ الأوامر التالية من داخل مجلد المشروع:

```bash
pnpm install
pnpm dev
```

## النشر باستخدام GitHub Pages

ارفع محتوى هذا المجلد إلى مستودع GitHub جديد. ملف النشر التلقائي موجود بالفعل في المسار `.github/workflows/deploy.yml`.

بعد الرفع، افتح تبويب **Settings** في المستودع ثم **Pages**، واختر **GitHub Actions** كمصدر للنشر. سيبني GitHub الموقع وينشره تلقائياً عند كل تحديث على فرع `main`، وستجد الرابط في تبويب **Actions** أو **Settings → Pages**.

## ملاحظة عن الأصول

جميع الصور المطلوبة موجودة داخل `client/public/manus-storage/`، لذلك لا تحتاج إلى أي روابط خارجية للأصول البصرية عند النشر على GitHub Pages.
