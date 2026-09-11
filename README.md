# 🌸 Cute Little Crochet — Boutique Storefront & Order Portal

> 🌐 **Live Website:** [https://cutelittlecrochet.netlify.app/](https://cutelittlecrochet.netlify.app/)

A mobile-first boutique storefront and management portal for **Cute Little Crochet**, tailored specifically for selling handmade crochet creations across India with **zero monthly hosting fees**, **direct WhatsApp & UPI ordering**, and **free Supabase cloud database & photo storage**.

---

## ✨ Key Features

1. **Warm, Boutique Aesthetic:** Designed with cozy pastel tones, responsive product cards, category filters (*Plushies*, *Bags & Totes*, *Wearables*, *Accessories*, *Home Decor*), and badges (*Ready to Ship*, *Made to Order*, *Sold Out*).
2. **Frictionless Indian Order Flow (WhatsApp & UPI):**
   - Zero forced account signups for customers (maximum conversion).
   - Customers can click **"Order"** on any item or build a shopping bag and hit **"Place Order on WhatsApp"**.
   - Generates a pre-formatted WhatsApp message with items, delivery pincode, and subtotal.
   - Seller confirms availability, shares their verified UPI ID / QR code (GPay, PhonePe, Paytm), and collects payment directly.
3. **Production Cloud Database & CDN Storage (Supabase):**
   - When you upload a new piece from your phone, **every customer across India sees it immediately**.
   - Photos uploaded from your device are hosted on a fast global CDN (`crochet-photos` bucket).
   - Real **Email & Password Authentication** protects your database from unauthorized edits.
4. **Built-in Owner Dashboard:**
   - **Upload photos** directly from your phone/computer or paste picture URLs.
   - Add new crochet items with prices in ₹ (INR), descriptions, dimensions, and yarn specifications.
   - **Edit existing creations:** Update prices, discount strike-throughs, descriptions, or replace photos with 1 click.
   - One-click status toggling: mark creations as *Sold Out* or *Ready to Ship*.
   - Update your WhatsApp business contact number, UPI ID, and announcement bar.
   - One-click **Export Catalog (JSON)** and **Import** for offline backups.
5. **Zero-Breakage Graceful Fallback:**
   - Works immediately out-of-the-box in **Demo Mode** (using sample creations and browser storage) even before you connect your cloud database!

---

## ⚡ 3-Minute Supabase Setup (Make It Live Across India)

To connect your **\$0/month** free Supabase cloud database:

### Step 1: Create a Free Supabase Project
1. Go to [supabase.com](https://supabase.com) and click **"Start your project"** (Sign in with GitHub or email).
2. Click **"New Project"**, name it `cute-little-crochet`, set a database password, and pick region **"South Asia (Mumbai)"**.
3. Wait ~1 minute while Supabase prepares your project.

### Step 2: Run the One-Click Database Setup Script
1. In your Supabase project dashboard, click the **SQL Editor** tab (icon `>_` on the left sidebar).
2. Click **"New query"**.
3. Open the file `setup_supabase.sql` in this folder, copy all contents, paste into the editor, and click **"Run"**.
   *(This automatically creates your `products` table, sets up security rules so only you can edit, creates the public photo storage bucket `crochet-photos`, and inserts the 8 starter creations!)*

### Step 3: Create Your Owner Account
1. In the Supabase sidebar, click **Authentication** $\rightarrow$ **Users**.
2. Click **"Add user"** $\rightarrow$ **"Create user"**.
3. Enter your email (e.g. `you@cutelittlecrochet.in`) and a secure password.
4. Toggle **"Auto Confirm User?"** to **ON**, then click **"Create user"**.

### Step 4: Connect Your Website
1. In Supabase, go to **Project Settings** (gear icon) $\rightarrow$ **API**.
2. Copy your **Project URL** and **anon public key**.
3. Open `config.js` and paste them:
   ```javascript
   const APP_CONFIG = {
     SUPABASE_URL: 'https://yourprojectid.supabase.co',
     SUPABASE_ANON_KEY: 'eyJhbGciOiJIUzI1NiIsInR5cCI6...'
   };
   ```
   *(Or alternatively: open the website, go to **Owner Dashboard** $\rightarrow$ **Shop Settings**, paste them, and click **"Save & Connect Cloud DB"**!)*

That's it! Your store is now connected to a live cloud database and photo storage.

---

## 🚀 How to Run Locally

1. Open the project folder:
   ```
   C:\Users\jofra\.gemini\antigravity\scratch\cute-little-crochet
   ```
2. Double-click `index.html` (or right-click $\rightarrow$ **Open with** $\rightarrow$ **Chrome** / **Edge**).
3. The store will open immediately.

---

## 🛠️ Owner Admin Guide

1. Click the **Shield Icon** in the top navigation bar or **"Owner Dashboard"** in the footer.
2. If Supabase is connected: Log in with your **Owner Email & Password**.
   *(If running in Demo Mode: use the demo PIN **`1234`**).*
3. **To add a new creation:**
   - Go to **"Add New Creation"**.
   - Select a photo from your phone or computer.
   - Enter title, category, price in ₹, and description.
   - Click **"Publish to Storefront"** — the photo is uploaded to Supabase Storage and the item is live!
4. **To edit an existing creation:**
   - In **"Manage Catalog"**, click **"Edit"** on any row.
   - Update details or choose a new photo to replace the current one.
   - Click **"Save Changes"**.
5. **To update contact and UPI details:**
   - Go to **"Shop Settings & UPI"**.
   - Set your **WhatsApp Business Number** with country code `91` (e.g. `918197477497`).
   - Set your **UPI ID** (e.g. `yourname@okhdfcbank` or `phonepe`).
   - Click **"Save Settings"**.

---

## 🌐 How to Deploy Online (100% Free)

You can launch this website to the world in under 2 minutes:

### Option 1: Netlify Drop (Recommended — 30 Seconds)
1. Go to [app.netlify.com/drop](https://app.netlify.com/drop).
2. Drag and drop the `cute-little-crochet` folder into the browser window.
3. Your site is instantly live with HTTPS and global CDN.
4. Add your custom domain (e.g., `cutelittlecrochet.in`) under *Domain Management*.

### Option 2: Cloudflare Pages
1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com/) $\rightarrow$ **Workers & Pages** $\rightarrow$ **Create application** $\rightarrow$ **Pages**.
2. Connect your GitHub repository or upload the folder.
3. Enjoy 100% free hosting with unlimited bandwidth.

---

## 💡 Scaling Up Later: Adding Online Payment Gateways

When your order volume grows and you want automated card/net-banking gateways:
- Sign up for **Razorpay** or **Cashfree** with your Indian business bank account or Sole Proprietorship.
- Razorpay's Standard Checkout script can be embedded directly into this codebase to accept Credit/Debit cards and instant UPI intents without changing your store layout.
