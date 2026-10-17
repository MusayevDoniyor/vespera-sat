# 🌌 VESPERA — Digital SAT Autonomous AI Mastery Platform

> **"From Absolute Zero to 1600"**  
> Maxsus ravishda ingliz tili yuqori bo'lgan (IELTS 7.5 / Reading 9), ammo matematikadan 0 darajadan boshlayotgan talaba uchun qurilgan Digital SAT super-platformasi.

---

## ⚡ Asosiy Imkoniyatlar (Core Features)

1. **Zero-to-Hero Math Engine:**
   - Har bir matematik masala **3 qavatli tushuntirish** bilan berilgan:
     - 🇺🇿 **1-qavat:** O'zbekcha sodda hayotiy analogiya (Tarozi usuli, yo'l xaritasi, sodda mantiq).
     - 🇬🇧 **2-qavat:** Official CollegeBoard English Formula & KaTeX LaTeX yechimi.
     - ⚡ **3-qavat:** Desmos 10s Hack (Qo'lda hisoblamasdan grafik orqali 10 soniyada yechish siri).
2. **Desmos Split-Screen Simulator:**
   - Masalalar yonida to'g'ridan-to'g'ri o'rnatilgan rasmiy Desmos Graphing Calculator.
   - SAT presetlari (Linear, Parabola Vertex, Circle, Regression `~`).
3. **IELTS 7.5+ Verbal Accelerator:**
   - Oddiy o'qish emas — faqat SATga xos tuzoqlar: *Rhetorical Synthesis*, *Transitions*, *Boundaries & Semicolons*.
4. **AI Error Log & Spaced Repetition:**
   - Xato qilingan masalalar avtomatik ravishda 24h, 72h va 7 kunlik oraliqda qayta eslatiladi (Ebbinghaus unutilish egri chizig'i).
5. **Bluebook Exam Simulator:**
   - 100% rasmiy Bluebook ko'rinishi: Taymer, savollar matritsasi, Strikethrough, Mark for Review va 1600 ballik shkala.
6. **Local PostgreSQL Integratsiyasi:**
   - Barcha progress va xatolar kompyuteringizdagi local PostgreSQL (`kaizo:2009@localhost:5432/vespera`) bazasida to'liq saqlanadi.

---

## 🛠 Ishga Tushirish (Quick Start)

Dastur hozirda kompyuteringizda ishga tushirilgan va quyidagi manzilda ochiq:

👉 **[http://localhost:3000](http://localhost:3000)**

Serverni qayta yoqish uchun:
```bash
cd C:\vespera
npm run dev
```

Bazani qayta seed qilish uchun:
```bash
node scripts/seed-pg.mjs
```
