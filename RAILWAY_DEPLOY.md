# 🚀 Digital Clinic — Railway Deployment

## Статус
✅ GitHub репо: https://github.com/karinasekk-lab/digital_clinic
✅ Код запушен в `main` branch

## Деплой на Railway (2 минуты)

1. **Перейди на Railway**: https://railway.app
2. **New Project** → **Deploy from GitHub repo**
3. **Authenticate with GitHub** (если нужно)
4. **Find repo**: `digital_clinic`
5. **Deploy** — Railway автоматически:
   - Прочитает `railway.json`
   - Запустит `npm install && npm run build`
   - Создаст production build в `/dist`
   - Поднимет сервер на `npm run preview`

## После деплоя
- Получишь URL типа: `https://digital-clinic-production.up.railway.app`
- App будет live 🎉

## Если нужна своя domain
Railway → Project Settings → Domains → Add Custom Domain

---

**Notes:**
- railway.json содержит конфиг для build и deploy
- package.json имеет `preview` скрипт для production server
- `.gitignore` исключает `node_modules`, `dist`, `.env`

