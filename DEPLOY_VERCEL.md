# Deployment to Vercel

## Quick Setup

### 1. **Prerequisites**
```bash
# Ensure you have Node.js 18+ and npm installed
node --version  # Should be v18 or higher
npm --version   # Should be v9 or higher
```

### 2. **Install Vercel CLI (optional, for local testing)**
```bash
npm install -g vercel
```

### 3. **Build the app locally to verify**
```bash
npm run build
# Output should be in ./dist directory
```

### 4. **Deploy via GitHub (Recommended)**

The app is configured to auto-deploy from GitHub:

**Step 1:** Go to https://vercel.com/new  
**Step 2:** Click "Import Git Repository"  
**Step 3:** Select `github.com/karinasekk-lab/digital_clinic`  
**Step 4:** Leave all settings default (Vercel auto-detects Vite)  
**Step 5:** Click "Deploy"  

**That's it!** Your app will be live at `https://digital-clinic-<hash>.vercel.app`

### 5. **Custom Domain (Optional)**
```
Go to Project Settings → Domains
Add your custom domain
Follow DNS instructions
```

### 6. **Environment Variables (if needed)**
In Vercel dashboard:
- Go to Settings → Environment Variables
- Add any .env variables
- Redeploy

---

## Build Details

The app is a **Vite SPA** (Single Page App) configured as:

```json
{
  "buildCommand": "npm ci && npm run build",
  "outputDirectory": "dist",
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

This is in `vercel.json` — Vercel reads this automatically.

---

## Testing Before Deploy

### Local Preview
```bash
npm run preview
# Opens http://localhost:4173
# Test all screens, v1 ↔ v2 toggle, support chat
```

### Checklist
- [ ] Screen 1 (Main) — both v1 and v2 versions
- [ ] Screen 2 (Doctors) — filters by specialty  
- [ ] Screen 3 (Symptoms) — all 7 symptoms + "Другое"
- [ ] Screen 17 (History) — both "Обращения" and "Выписки" tabs
- [ ] Screen 18 (Consultation Detail) — chat + export buttons
- [ ] v1 ↔ v2 toggle in header — works smoothly
- [ ] Support chat modal — opens/closes properly
- [ ] Bottom nav — only 4 tabs (no pharmacy)
- [ ] No console errors

---

## Post-Deploy

1. **Share public URL:** `https://digital-clinic-<hash>.vercel.app`
2. **Monitor:** Dashboard shows logs, deployment status
3. **Rollback:** Click "Deployments" → select previous version
4. **Updates:** Push to `main` branch → auto-redeploys

---

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Build fails | Check npm build locally: `npm run build` |
| 404 on routes | Vercel rewrites are in `vercel.json` (should work) |
| Fonts not loading | Google Fonts loaded from CDN in `index.html` |
| Old version cached | Hard refresh: Cmd+Shift+R (Mac) or Ctrl+Shift+R (Win) |

---

## Version Control

- Main branch: `main`
- All deployments from `main` are auto-deployed
- Test new features on separate branch, merge to `main` when ready

**Current Deployment:**
- Repository: `github.com/karinasekk-lab/digital_clinic`
- Branch: `main`
- Auto-deploy: ✅ Enabled
