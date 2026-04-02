# ✅ Migration Complete: MySQL → Supabase

## What Was Changed

### 1. **Database Connection** (`lib/db.ts`)
- ❌ Removed: `mysql2` connection pool
- ✅ Added: Supabase client using `@supabase/supabase-js`

### 2. **Environment Variables** (`.env.local`)
- ❌ Removed: `DB_HOST`, `DB_USER`, `DB_PASSWORD`, `DB_NAME`
- ✅ Added: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`

### 3. **Package Dependencies** (`package.json`)
- ❌ Removed: `mysql2`
- ✅ Added: `@supabase/supabase-js`

### 4. **API Routes Updated**
- ✅ `app/api/auth/login/route.ts` - MySQL queries → Supabase
- ✅ `app/api/auth/signup/route.ts` - MySQL queries → Supabase
- ✅ `app/api/auth/logout/route.ts` - Already compatible (no DB calls)

---

## 🚀 Next Steps

### Step 1: Create Database Schema in Supabase

1. Go to: https://supabase.com/dashboard
2. Select your project: **krgdtfbbhdvfsmawjnnw**
3. Click: **SQL Editor** (left sidebar)
4. Click: **New Query**
5. Copy and paste content from `supabase-schema.sql`
6. Click: **Run** (or press Ctrl+Enter)

This will create:
- `operators` table
- `otp_tokens` table
- Indexes for performance
- Row Level Security policies

### Step 2: Install Dependencies

```bash
npm install
```

This will install the new `@supabase/supabase-js` package.

### Step 3: Test Locally

```bash
npm run dev
```

Then test:
- ✅ Signup: http://localhost:3000/signup
- ✅ Login: http://localhost:3000/login
- ✅ Dashboard: http://localhost:3000/dashboard

### Step 4: Optional - Remove Express Server

The `server/` folder is now obsolete since all API routes are in Next.js.

You can safely delete:
- `server/` folder
- `package-express.json`

**Command:**
```bash
# On Windows
rmdir /s server
del package-express.json
```

---

## 📤 Deploy to Vercel

### Option 1: Via Vercel Dashboard

1. Push code to GitHub:
   ```bash
   git add .
   git commit -m "Migrated to Supabase"
   git push origin master
   ```

2. Go to: https://vercel.com
3. Click: **Add New** → **Project**
4. Select: **krushibot** repository
5. Click: **Deploy**

6. **Add Environment Variables** in Vercel:
   - Go to: Settings → Environment Variables
   - Add these:
     ```
     NEXT_PUBLIC_SUPABASE_URL=https://krgdtfbbhdvfsmawjnnw.supabase.co
     NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtyZ2R0ZmJiaGR2ZnNtYXdqbm53Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzUxNDQwODksImV4cCI6MjA5MDcyMDA4OX0.PeHludXdfE9MUi10BPoDtCb0rJA-sqm5VneM7T0fm8s
     SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtyZ2R0ZmJiaGR2ZnNtYXdqbm53Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NTE0NDA4OSwiZXhwIjoyMDkwNzIwMDg5fQ.r-_g85uZU4g0qIHyM-Ig3Bjdf5w2j7_Sg65_DPIsSqk
     JWT_SECRET=your_super_secret_jwt_key_please_change_this_nextjs_version
     EMAIL_USER=sethinileshsethi@gmail.com
     EMAIL_PASS=12345
     ```

7. Redeploy

### Option 2: Via Vercel CLI

```bash
npm i -g vercel
vercel login
vercel --prod
```

---

## 🔍 Verify Migration

### Check Database Connection
```bash
# In Supabase Dashboard → Table Editor
# You should see: operators, otp_tokens tables
```

### Test API Endpoints
```bash
# Test signup
curl -X POST http://localhost:3000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"operator_id":"OP-TEST","email":"test@test.com","password":"test123"}'

# Test login
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"operator_id":"OP-TEST","password":"test123"}'
```

---

## 📊 What Changed in Code

### Before (MySQL):
```typescript
const [rows] = await pool.execute('SELECT * FROM operators WHERE operator_id = ?', [id]);
const user = rows[0];
```

### After (Supabase):
```typescript
const { data: user, error } = await supabase
  .from('operators')
  .select('*')
  .eq('operator_id', id)
  .single();
```

---

## ⚠️ Important Notes

1. **Keep `.env.local` secret** - Never commit to GitHub
2. **Use different secrets in production** - Change JWT_SECRET
3. **Email password** - Should be Gmail App Password (not regular password)
4. **Vercel limits** - 10 second function timeout (should be fine for your use case)

---

## 🎉 Benefits of This Migration

✅ No local database setup needed
✅ Automatic backups
✅ Built-in authentication (can replace custom JWT later)
✅ Real-time capabilities
✅ Auto-scaling
✅ Free SSL/HTTPS
✅ Global CDN via Vercel
✅ Automatic deployments on git push

---

## 🆘 Troubleshooting

### Build Error: "Cannot find module '@supabase/supabase-js'"
```bash
npm install
```

### 500 Error in Production
- Check environment variables are set in Vercel
- Check database schema is created in Supabase

### "User not found" on login
- Check operators table has data
- Check Row Level Security policies allow service_role access

### Database connection timeout
- Check Supabase project is not paused (free tier pauses after inactivity)

---

## 📞 Support

If you encounter issues:
1. Check Vercel deployment logs
2. Check Supabase logs (Dashboard → Logs)
3. Check browser console for errors

---

**Migration completed successfully! 🎉**
