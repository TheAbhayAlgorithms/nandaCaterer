# Nanda Caterers - Supabase Admin Setup Guide

This guide details the step-by-step procedure to connect Supabase and activate the private Admin Area for managing menu dishes, categories, gallery photos, and the "Popular" signature flags.

---

## 1. Create a Supabase Project

1. Go to [supabase.com](https://supabase.com) and log in or sign up.
2. Click **New project**.
3. Fill in the project details:
   - **Name**: `nanda-caterers`
   - **Database Password**: Choose a strong password and save it safely.
   - **Region**: Choose **Mumbai (ap-south-1)** or the region closest to Mumbai.
4. Click **Create new project** and wait 1-2 minutes for the database to provision.

---

## 2. Run the SQL Migration

1. In your Supabase dashboard, click **SQL Editor** from the left navigation.
2. Click **New query**.
3. Open the migration file in this project:
   `supabase/migrations/20261028000000_init_admin_schema.sql`
4. Copy the entire contents, paste it into the SQL Editor, and click **Run**.
5. This automatically:
   - Creates `menu_categories`, `menu_items`, and `gallery_images` tables.
   - Configures Row Level Security (RLS) so the public can read visible rows, while all writes require authenticated admin access.
   - Creates the `menu-images` and `gallery` storage buckets with 5 MB file limits and image-only MIME types.

---

## 3. Verify Storage Buckets

1. In Supabase, navigate to **Storage**.
2. Confirm that two public buckets exist:
   - `menu-images` (Public bucket, 5 MB limit)
   - `gallery` (Public bucket, 5 MB limit)
   *(Note: The migration script creates these automatically).*

---

## 4. Create the Admin User Account

1. In Supabase, navigate to **Authentication** -> **Users**.
2. Click **Add user** -> **Create user**.
3. Enter the business owner's email and a secure password:
   - **Email**: e.g. `admin@nandacaterer.com`
   - **Password**: Your secure password
   - Check **Auto Confirm User?** so the account is active immediately without requiring email verification.
4. Click **Create user**.

---

## 5. Configure Environment Variables

### A. Local Development
Create a `.env.local` file in your project root with the following keys from **Project Settings** -> **API**:

```env
# Supabase API (Project URL & Anon Key)
NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOi...

# Secret Service Role Key (Keep private, never commit)
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOi...

# Site URL
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### B. Vercel Production
1. In your [Vercel Dashboard](https://vercel.com), open the `nanda-caterers` project.
2. Navigate to **Settings** -> **Environment Variables**.
3. Add the three keys:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `NEXT_PUBLIC_SITE_URL` = `https://nandacaterer.com`
4. Apply them to **Production**, **Preview**, and **Development** environments.

---

## 6. Seed Existing Data into Supabase

Run the one-time seed script from your terminal:

```bash
npm run seed
```

This reads the existing categories and dishes from `data/menu.ts` and photographs from `data/gallery.ts`, and imports them into your Supabase database with their initial Popular flags and ordering preserved.

---

## 7. Deploy & Access the Admin Portal

1. Push your changes to Git and deploy on Vercel.
2. Navigate to your private admin URL:
   `https://nandacaterer.com/admin`
3. If not signed in, you will be automatically redirected to `/admin/login`.
4. Sign in with the credentials created in Step 4.

---

## 8. Admin Capabilities

- **Menu Manager (`/admin/menu`)**:
  - Add, edit, or delete dishes.
  - Search by dish name.
  - Quick inline toggle for the **Popular ★** badge (instantly updates homepage signature dishes).
  - Hide or show dishes with a single click.
  - Upload dish photos (automatically scaled and compressed to max 1600px WebP).
  - Add or rename categories and reorder dishes.
- **Gallery Manager (`/admin/gallery`)**:
  - Batch upload multiple event photos with real-time progress.
  - Edit captions, alt text, and category filters (Weddings, Corporate, Decor, Food).
  - Hide or show photos.
  - Delete photos (automatically cleans up the image file from storage).
- **Public Data Layer Fallback**:
  - The public site seamlessly reads from Supabase with on-demand cache revalidation upon every save.
  - If the database is ever unreachable or offline, the site safely falls back to the hardcoded data files without any downtime or broken pages.

