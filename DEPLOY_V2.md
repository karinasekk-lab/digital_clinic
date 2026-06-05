# 🚀 Deploy v2 to Vercel

## Option 1: Via Vercel Dashboard (Recommended)

### Step 1: Go to Vercel
```
https://vercel.com/new
```

### Step 2: Import Repository
- Click "Import Git Repository"
- Select `github.com/karinasekk-lab/digital_clinic`
- Wait for repository to load

### Step 3: Configure for v2
- **Framework:** Vite (auto-detected)
- **Root Directory:** `v2` ← **Important!**
- **Build Command:** `npm run build` (auto-filled)
- **Output Directory:** `dist` (auto-filled)
- **Environment:** Leave empty (no env vars needed)

### Step 4: Project Settings
- **Project Name:** `digital-clinic-v2`
- **Team:** Select your team

### Step 5: Deploy
- Click "Deploy"
- Wait 2-3 minutes for build to complete
- You'll get: **`https://digital-clinic-v2.vercel.app`**

---

## Option 2: Via Vercel CLI (If you have token)

```bash
# Generate Vercel token at: https://vercel.com/account/tokens
export VERCEL_TOKEN="your_token_here"

# Deploy v2
cd v2
vercel --prod --token $VERCEL_TOKEN
```

---

## Option 3: GitHub Actions (Automated)

Create `.github/workflows/deploy-v2.yml`:

```yaml
name: Deploy v2 to Vercel

on:
  push:
    branches: [main]
    paths:
      - 'v2/**'
      - '.github/workflows/deploy-v2.yml'

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: vercel/actions/build@v5
        with:
          token: ${{ secrets.VERCEL_TOKEN }}
      - uses: vercel/actions/deploy-production@v5
        with:
          token: ${{ secrets.VERCEL_TOKEN }}
          project-name: digital-clinic-v2
          working-directory: v2
```

Then add `VERCEL_TOKEN` to GitHub Secrets.

---

## Verification

After deployment, test:
1. ✅ Visit `https://digital-clinic-v2.vercel.app`
2. ✅ Check that 7 colored service sections load
3. ✅ Verify status badges (active/soon)
4. ✅ Check stats bar: "35 сервисов · 8 доступно · 27 скоро"
5. ✅ Test buttons (active items clickable, "soon" items disabled)

---

## Troubleshooting

| Problem | Solution |
|---------|----------|
| Build fails | Check `v2/` folder has `package.json` and `src/App.jsx` |
| 404 errors | Ensure `v2/vercel.json` has correct rewrites |
| Fonts not loading | Check Google Fonts CDN in `v2/index.html` |
| Dependencies issue | Delete `v2/node_modules` and `v2/package-lock.json`, run `npm ci` |

---

## URLs

- **v1 (after deploying):** `https://digital-clinic-v1.vercel.app`
- **v2 (after deploying):** `https://digital-clinic-v2.vercel.app`
- **Master (optional):** `https://digital-clinic.vercel.app` (redirects to v1 & v2)

Both always accessible, independent, never conflict! 🎉
