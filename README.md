# Цифровая клиника (Digital Clinic) MiniApp

Medical mini-app for Freedom SuperApp Kazakhstan. Provides online doctor consultations, AI analysis tools, sick leave management, and consultation history.

**Built with:** React 18 + Vite + Tailwind CSS  
**Repository:** github.com/karinasekk-lab/digital_clinic  
**Status:** v1 Approved (Stakeholder meeting 02.06.2026)

---

## ✨ Features

### Core Services (v1)
- 🏥 **Врач онлайн** — Online doctor in 3 minutes
- 🔬 **Понять мои анализы** — AI test analysis  
- 💊 **Что за лекарство?** — Drug explanation
- 📄 **Больничный онлайн** — Official sick leave (ЭЛН)
- 📋 **История обращений** — Consultation history with prescriptions

### Advanced Features
- 👨‍⚕️ Doctor search with specialty filters & sorting
- 🧠 Symptom-guided doctor selection (AI matching)
- 💬 Support chat modal (5 min response time)
- 📊 Consultation detail view with exportable prescriptions
- 🔄 Two versions: v1 (compact) ↔ v2 (full catalog)

---

## 🚀 Quick Start

### Development
```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # Production build
npm run preview  # Test production locally
```

### Deploy to Vercel
```bash
# 1. Push to main
git push origin main

# 2. Go to https://vercel.com/new
# 3. Import github.com/karinasekk-lab/digital_clinic
# 4. Deploy

# Live at: https://digital-clinic-<hash>.vercel.app
```

**See [DEPLOY_VERCEL.md](./DEPLOY_VERCEL.md) for full deployment guide.**

---

## 📱 Project Structure

```
src/
  App.jsx          — All 19 screens + components
  index.css        — Design tokens, animations, utilities
  main.jsx         — React entry point
public/
  icon.png         — App icon
index.html         — Proper meta tags + Google Fonts CDN
vercel.json        — Vercel SPA config
```

**App.jsx Highlights:**
- 19 screens (0-18) for complete user journeys
- Glassmorphism design + gradient rings
- Responsive SVG illustrations
- 3000+ lines, modular components

**CSS System:**
- Tailwind v3 + CSS custom properties
- Dark theme: `--bg-base`, `--bg-elevated`, `--bg-overlay`
- Accent: `--green-500` (#00B956)
- Animations: screenIn, cardUp (d1-d4), fadeInUp, pulse-ring

---

## 🎯 Version Strategy

### Version 1: Compact ✅ (Production)
- Clean, focused interface
- 4 main tabs + support chat
- Simplified language
- Compact profile bar
- User-tested and approved

### Version 2: Full Catalog (Demo Only)
- Shows complete roadmap ("territoria" claim)
- 4 service categories: Consultations, AI, Documents, Health Companion
- 20+ services (3 available, rest "Coming Soon")
- Toggle in header: `v1` ↔ `v2`

⚠️ **Version 2 is for internal stakeholder demos ONLY.** Not shown to Freedom until design approved.

---

## 📊 Screens at a Glance

| # | Name | Purpose |
|---|------|---------|
| 0 | Splash | Loading animation |
| 1 | Main (v1/v2) | Home with symptoms, services, or full catalog |
| 2 | Doctors | Searchable doctor list + specialty filters |
| 3 | Symptom Flow | AI-guided doctor selection |
| 5 | Video Call | Live consultation |
| 7 | Analyze Tests | AI test explanation |
| 11 | Drug Details | Drug information + alternatives |
| 12 | Sick Leave | Больничный form |
| 16 | Freedom Shell | SuperApp navigation |
| 17-18 | History | Consultations + prescriptions with export |

---

## 🔧 Key Implementation Details

### Consultation History (Screen 17-18)
- **Tab 1: Обращения** — All doctor visits as list
- **Tab 2: Выписки** — Prescriptions with quick actions
- Expandable conclusion with diagnosis, recommendations, meds, follow-up
- Export: 
  - 🏥 Show in pharmacy (links to drug details)
  - ⬇️ Download as .txt file

### Doctor Filtering (Screen 2)
- Search by name/specialty
- Horizontal chip filters (Все, Терапевт, Педиатр, ЛОР, etc.)
- Sort options: online first, rating, price, experience
- Online status with wait time display

### Support Chat (Header)
- Accessible from any screen
- Modal with "Мы ответим в течение 5 минут"
- Shows availability hours

---

## 🧪 Testing

### Checklist Before Deploy
- [ ] v1 and v2 both load correctly
- [ ] Doctor filters by specialty work
- [ ] Consultation history shows both tabs
- [ ] Chat modal opens/closes
- [ ] Export buttons render properly
- [ ] Navigation doesn't break
- [ ] Mobile responsive (390px viewport)

### Tested User Journeys
1. **Айгерим** (mum, pediatrician): ✅ 8.5/10
2. **Бакыт** (senior, test analysis): ✅ 7/10
3. **Нурлан** (busy, sick leave): ✅ 8/10

---

## 📋 Stakeholder Fixes Applied

### v1 Implementation (Meeting 02.06.2026)
- ✅ FIX 1: Compact profile bar
- ✅ FIX 2: Doctor specialty filters  
- ✅ FIX 3: Rename symptoms properly
- ✅ FIX 4: Add psychology service + grid layout
- ✅ FIX 5: Remove pharmacy tab (4 main tabs only)
- ✅ FIX 6: Support chat modal in header
- ✅ FIX 7: Simplified language throughout

---

## 🔒 Privacy & Strategy

**Internal Only:**
- Not shown to Alexey Lee (Freedom) until design approved
- v1 ready for medical team testing
- v2 shows full feature roadmap for stakeholders
- Current phase: Stakeholder demos + user research

---

## 📞 Contact

- **CEO:** Кайыржан  
- **Director:** Виктор  
- **Methodologist:** Лаура (language, UX guidance)  
- **Finance:** Тогжан  
- **Repo:** github.com/karinasekk-lab/digital_clinic
