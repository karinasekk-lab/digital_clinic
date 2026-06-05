# 📱 Цифровая клиника · Dual Version Architecture

Two completely independent React applications for medical services platform.

**Repository Structure:**
```
digital-clinic/
├── v1/                    ← Version 1 (frozen, basic)
│   ├── src/App.jsx        ← Current working version
│   ├── src/index.css
│   ├── src/main.jsx
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   └── vercel.json
│
├── v2/                    ← Version 2 (full catalog)
│   ├── src/App.jsx        ← Full services catalog
│   ├── src/index.css
│   ├── src/main.jsx
│   ├── src/data/services.js
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   └── vercel.json
│
└── README_DUAL.md         ← This file
```

---

## 🎯 Two Independent Deployments

### **Version 1: Базовая (Basic)**
- **URL:** `https://digital-clinic-v1.vercel.app`
- **Features:** 19 screens, 7 core services
- **Status:** Frozen (no more changes)
- **For:** Internal team, stakeholders
- **Screens:** Doctor search, symptoms, consultation history, sick leave

### **Version 2: Полный каталог (Full Catalog)**
- **URL:** `https://digital-clinic-v2.vercel.app`
- **Features:** Service catalog with 35 services (8 active, 27 coming soon)
- **Status:** Active development
- **For:** Stakeholder demos, roadmap showcase
- **Design:** 7 colored sections, status badges (active/soon/new)

---

## 📁 How They Work

Each folder (`v1/`, `v2/`) is a **completely independent** React application:
- ✅ Separate `package.json` (different dependencies versions possible)
- ✅ Separate build process
- ✅ Separate Vercel deployment
- ✅ No shared code, no dependencies between them
- ✅ Can be updated independently
- ✅ Different URLs always available

**They will NEVER conflict or break each other.**

---

## 🚀 How to Deploy

### **Deploy v1 to Vercel**
```bash
cd v1
npm install
npm run build
vercel --prod
# or use Vercel dashboard → Import Git → select v1/ folder
```

### **Deploy v2 to Vercel**
```bash
cd v2
npm install
npm run build
vercel --prod
# or use Vercel dashboard → Import Git → select v2/ folder
```

### **Result URLs**
- v1: `https://digital-clinic-v1.vercel.app`
- v2: `https://digital-clinic-v2.vercel.app`

Both always accessible, neither affects the other.

---

## 📋 What's in Each Version

### **V1 Features**
- 🏥 Врач онлайн (Online doctor)
- 🔬 Понять мои анализы (Analyze tests)
- 💊 Что за лекарство (Drug lookup)
- 📄 Больничный онлайн (Sick leave)
- 👨‍⚕️ Doctor search with specialty filters
- 💬 Support chat
- 📋 Consultation history
- 🔄 v1 ↔ v2 toggle button (in header)

### **V2 Features**
- **Full Service Catalog:** 35 services organized in 7 sections
  - 🟢 Consultations (8 items)
  - 🔵 AI Tools (6 items)
  - 🟠 Documents (5 items)
  - 🟣 Checkups (4 items)
  - 🟣 School Medicine (3 items)
  - 🟠 Travel Medicine (3 items)
  - 🟣 Companion Services (3 items)
- Status badges: ✅ Active (green), 🔜 Soon (gray), NEW (red)
- Clean, organized UI
- Perfect for "territory" demonstration to stakeholders

---

## 🔧 Development

### **Work on v1**
```bash
cd v1
npm install
npm run dev        # http://localhost:5173
npm run build
```

### **Work on v2**
```bash
cd v2
npm install
npm run dev        # http://localhost:5174 (or next available port)
npm run build
```

### **Build Both**
```bash
# From root
cd v1 && npm ci && npm run build && cd ../v2 && npm ci && npm run build
```

---

## 📊 Comparison

| Feature | v1 | v2 |
|---------|----|----|
| **Screens** | 19 | 1 (Catalog only) |
| **Services shown** | 7 (functional) | 35 (8 active, 27 roadmap) |
| **Doctor search** | ✅ Yes | ❌ No |
| **Symptom flow** | ✅ Yes | ❌ No |
| **History** | ✅ Yes | ❌ No |
| **Catalog view** | Toggle (v1 button) | Always shown |
| **Status badges** | ❌ No | ✅ Yes (active/soon) |
| **Use case** | Production demo | Roadmap showcase |
| **Audience** | Team, users | Stakeholders |

---

## 🎨 Design Consistency

Both versions use:
- ✅ Same dark theme: `#0A0E1A`, `#1E2235`
- ✅ Same accent: `#00B956` (green)
- ✅ Same fonts: Inter via Google Fonts CDN
- ✅ Same tailwind config (Tailwind v3)
- ✅ Same favicon: Green cross SVG
- ✅ Responsive 390px primary viewport

---

## ⚠️ Important Notes

### **v1 is FROZEN**
- No more changes to v1/
- All stakeholder feedback applied
- All user testing passed
- Ready for production use

### **v2 is DEMO**
- Shows full capability/roadmap
- "Territory" claim for stakeholders
- Services marked as "Coming Soon"
- Can be updated anytime

### **Neither breaks the other**
- v1 at `v1.domain` always works
- v2 at `v2.domain` always works
- Independent URLs, separate deployments
- Vercel handles them separately

---

## 🔗 Deployment Checklist

### **Before deploying v1**
- [ ] Code in `v1/` folder
- [ ] `npm install` works
- [ ] `npm run build` succeeds
- [ ] No build errors
- [ ] `vercel.json` present
- [ ] `index.html` has correct title

### **Before deploying v2**
- [ ] Code in `v2/` folder
- [ ] `npm install` works
- [ ] `npm run build` succeeds
- [ ] Service catalog displays
- [ ] Status badges work
- [ ] `vercel.json` present
- [ ] `index.html` has correct title

### **After both deployed**
- [ ] v1 accessible at `v1.digital-clinic.vercel.app`
- [ ] v2 accessible at `v2.digital-clinic.vercel.app`
- [ ] Share links with stakeholders
- [ ] Both always available

---

## 🆘 Troubleshooting

| Problem | Solution |
|---------|----------|
| `npm install` fails in v1 | Delete `node_modules`, run `npm ci` |
| `npm install` fails in v2 | Delete `node_modules`, run `npm ci` |
| Build fails | Check `npm run build` locally first |
| Port conflict (dev) | v2 auto-uses next port (5174+) |
| Vercel shows 404 | Ensure `rewrites` in `vercel.json` correct |
| Fonts not loading | Check Google Fonts CDN in `index.html` |

---

## 📞 Support

- **v1 Issues:** Check `v1/` folder and git history
- **v2 Issues:** Check `v2/src/` and `v2/src/data/services.js`
- **Both:** Make sure you're in correct folder before `npm` commands
- **Deployment:** Each has separate `vercel.json`

---

## 🎉 Summary

**You now have two independent, non-conflicting React apps:**
1. ✅ **v1:** Fully functional, frozen, production-ready
2. ✅ **v2:** Full catalog, stakeholder demo, expandable

**Both deploy separately, always accessible, never break each other.**

Deploy with confidence! 🚀
