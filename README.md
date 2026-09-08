# بورتفوليو رندا الزهراني

موقع شخصي بلغتين (عربي RTL / إنجليزي LTR) مع وضع فاتح وداكن.

## التشغيل محليًا

```bash
npm install
npm run dev
```

ثم افتحي الرابط الذي يظهر في الطرفية (عادةً http://localhost:5173).

## البناء والنشر

```bash
npm run build     # ينتج مجلد dist
npm run preview   # معاينة نسخة البناء
```

**Vercel:** اربطي المستودع أو ارفعي المجلد. ملف `vercel.json` يضبط التوجيه للمسارات الداخلية.
**Netlify:** أمر البناء `npm run build` ومجلد النشر `dist`. ملف `public/_redirects` جاهز.

## بنية الملفات

```
src/
  main.jsx        نقطة الدخول والراوتر
  App.jsx         الحالة العامة (اللغة، الوضع) والمسارات
  components.jsx  كل مكوّنات الواجهة
  content.js      النصوص بالعربي والإنجليزي + بيانات المشروعين
  styles.css      نظام التصميم كاملًا
public/
  images/         الأغلفة والشاشات وصور البيتموجي
  cv.pdf          ← ضعي ملف السيرة الذاتية هنا بهذا الاسم
  fonts/          ← ضعي ملفات خط Thmanyah هنا
```

## المسارات

| المسار | الصفحة |
|---|---|
| `/` | الصفحة الرئيسية |
| `/work/mishkat` | دراسة حالة مِشكاة |
| `/work/easypay` | دراسة حالة EasyPay |

## إضافة خط Thmanyah

ضعي ملفات الخط في `public/fonts/`، ثم أضيفي في أعلى `src/styles.css`:

```css
@font-face {
  font-family: "Thmanyah";
  src: url("/fonts/ThmanyahSerifText-Regular.woff2") format("woff2");
  font-weight: 400;
  font-display: swap;
}
@font-face {
  font-family: "Thmanyah";
  src: url("/fonts/ThmanyahSerifText-Medium.woff2") format("woff2");
  font-weight: 500;
  font-display: swap;
}
@font-face {
  font-family: "Thmanyah";
  src: url("/fonts/ThmanyahSerifText-Bold.woff2") format("woff2");
  font-weight: 700;
  font-display: swap;
}
```

العناوين تستدعي `Thmanyah` أصلًا، فبمجرد إضافة الملفات يتغيّر شكلها تلقائيًا.

## تعديل المحتوى

كل النصوص في `src/content.js`:
- `C.ar` و `C.en` — نصوص الأقسام العامة
- `PROJECTS` — محتوى دراستَي الحالة وأسماء الشاشات

لاستبدال أي صورة: احتفظي بنفس اسم الملف في `public/images/` وضعي الصورة الجديدة مكانه.

## تغيير لون الأكسنت

في `src/styles.css` عدّلي `--accent` في `:root` (الوضع الفاتح) وفي `[data-theme="dark"]` (الوضع الداكن).
