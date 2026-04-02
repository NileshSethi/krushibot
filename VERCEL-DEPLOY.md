# KrushiBot - Vercel Deployment Guide

## ✅ Pre-Migration Checklist

All changes have been completed! Here's what was done:

### Files Modified:
- ✅ `lib/db.ts` - Changed from MySQL to Supabase
- ✅ `app/api/auth/login/route.ts` - Updated to Supabase queries
- ✅ `app/api/auth/signup/route.ts` - Updated to Supabase queries
- ✅ `.env.local` - Updated with Supabase credentials
- ✅ `package.json` - Replaced mysql2 with @supabase/supabase-js

### Files Created:
- ✅ `supabase-schema.sql` - Database schema for Supabase
- ✅ `MIGRATION-COMPLETE.md` - Complete migration guide
- ✅ `VERCEL-DEPLOY.md` - This file

---

## 🚀 Deploy to Vercel in 5 Steps

### Step 1: Create Database Schema (5 min)

1. Open Supabase Dashboard: https://supabase.com/dashboard
2. Select project: **krgdtfbbhdvfsmawjnnw**
3. Go to: **SQL Editor** → **New Query**
4. Copy paste from: `supabase-schema.sql`
5. Click: **Run**

✅ This creates your `operators` and `otp_tokens` tables.

---

### Step 2: Install Dependencies (2 min)

```bash
npm install
```

This installs the new `@supabase/supabase-js` package.

---

### Step 3: Test Locally (5 min)

```bash
npm run dev
```

Open browser:
- http://localhost:3000
- Try signup and login
- Should connect to Supabase!

---

### Step 4: Push to GitHub (2 min)

```bash
git add .
git commit -m "Migrated to Supabase for Vercel deployment"
git push origin master
```

---

### Step 5: Deploy on Vercel (10 min)

#### 5.1 Create Project on Vercel

1. Go to: https://vercel.com
2. Sign up/Login with GitHub
3. Click: **Add New** → **Project**
4. Import: **krushibot** repository
5. Framework: **Next.js** (auto-detected)
6. Root Directory: `./` (default)
7. **DON'T CLICK DEPLOY YET!**

#### 5.2 Add Environment Variables

In the deployment config, click **Environment Variables** and add:

```
NEXT_PUBLIC_SUPABASE_URL
Value: https://krgdtfbbhdvfsmawjnnw.supabase.co

NEXT_PUBLIC_SUPABASE_ANON_KEY
Value: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtyZ2R0ZmJiaGR2ZnNtYXdqbm53Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzUxNDQwODksImV4cCI6MjA5MDcyMDA4OX0.PeHludXdfE9MUi10BPoDtCb0rJA-sqm5VneM7T0fm8s

SUPABASE_SERVICE_ROLE_KEY
Value: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtyZ2R0ZmJiaGR2ZnNtYXdqbm53Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NTE0NDA4OSwiZXhwIjoyMDkwNzIwMDg5fQ.r-_g85uZU4g0qIHyM-Ig3Bjdf5w2j7_Sg65_DPIsSqk

JWT_SECRET
Value: your_super_secret_jwt_key_please_change_this_nextjs_version

EMAIL_USER
Value: sethinileshsethi@gmail.com

EMAIL_PASS
Value: 12345
```

**Important:** Select **Production**, **Preview**, **Development** for all variables.

#### 5.3 Deploy!

1. Click: **Deploy**
2. Wait 2-3 minutes
3. You'll get a URL: `https://krushibot.vercel.app`

---

## 🎉 Post-Deployment

### Test Your Live Site

Visit: `https://krushibot.vercel.app`

Try:
- ✅ Signup a new user
- ✅ Login
- ✅ Access dashboard

### Automatic Deployments

From now on:
- Every push to `master` → Auto-deploys to production
- Pull requests → Creates preview deployments
- Instant rollback available

---

## 🧹 Optional Cleanup

The `server/` folder is no longer needed. You can delete:

```bash
# Windows Command Prompt
rmdir /s /q server
del package-express.json

# Or manually delete these folders/files
```

---

## 📊 Architecture Overview

### Before:
```
Local MySQL → Express Server → Frontend
```

### After:
```
Supabase (Cloud PostgreSQL) → Next.js API Routes → Frontend
                                      ↓
                                  Vercel (Serverless)
```

---

## 🔧 Common Issues

### Issue: Build fails with "Cannot find module"
**Solution:** Run `npm install` locally first

### Issue: Database connection error
**Solution:** Check environment variables in Vercel Settings

### Issue: Login returns 404
**Solution:** Make sure you ran `supabase-schema.sql` in Supabase

### Issue: "Project paused" in Supabase
**Solution:** Free tier pauses after 7 days inactivity. Just wake it up.

---

## 📈 What You Get

✅ **Global CDN** - Fast loading worldwide
✅ **Auto-scaling** - Handles traffic spikes
✅ **HTTPS** - Free SSL certificate
✅ **Zero config** - Just git push
✅ **Preview deployments** - Test before production
✅ **Analytics** - Built-in Vercel analytics
✅ **Edge functions** - Serverless at the edge

---

## 🎯 Vercel Free Tier Limits

You're well within limits:
- ✅ 100 GB bandwidth/month
- ✅ 100 GB-hours serverless execution
- ✅ Unlimited websites
- ✅ Automatic HTTPS
- ⚠️ 10 second function timeout (fine for your API)

---

## 🌐 Custom Domain (Optional)

Want `www.krushibot.com` instead of `krushibot.vercel.app`?

1. Buy domain (Namecheap, GoDaddy, etc.)
2. In Vercel: Settings → Domains
3. Add domain
4. Update DNS records (Vercel provides instructions)
5. Wait 5-60 minutes for DNS propagation

---

## 📚 Resources

- **Vercel Docs**: https://vercel.com/docs
- **Supabase Docs**: https://supabase.com/docs
- **Next.js Docs**: https://nextjs.org/docs
- **Your Supabase Dashboard**: https://supabase.com/dashboard/project/krgdtfbbhdvfsmawjnnw

---

## ✅ Final Checklist

Before deploying, make sure:
- [x] Database schema created in Supabase
- [x] `npm install` completed successfully
- [x] Tested locally with `npm run dev`
- [x] Code pushed to GitHub
- [x] Environment variables added in Vercel
- [x] Deployment successful
- [ ] Test signup/login on live site
- [ ] Test all features work

---

**You're ready to deploy! 🚀**

Run `npm install` and follow Step 4-5 above!
