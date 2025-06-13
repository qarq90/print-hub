# Print Hub

A modern web app for queueing, uploading, and managing print jobs seamlessly.

[![Vercel](https://img.shields.io/badge/deployed-on-vercel-000000?logo=vercel)](https://print-hub-five.vercel.app/)

## 🚀 Live Demo

Explore the live site: **[https://print-hub-five.vercel.app/](https://print-hub-five.vercel.app/)**

---

## 📌 Features

- Upload & preview PDFs and images before printing.
- Configure print options: single/double side & color (B/W or colored).
- Automatic page count detection for uploaded PDFs.
- Job cost estimation based on pages, copies, color, and sidedness.
- Print queue accessible to users and admins.
- Update, complete, cancel, and view details of every job.
- Theming support with light/dark toggle.

---

## 🔧 Tech Stack

- **Frontend/Backend**: Next.js (App Router)
- **UI Components**: Tailwind CSS, Radix UI, Heroicons, React Icons
- **API**: Supabase (Postgres DB for docs)
- **Pinata**: IPFS storage for uploaded files
- **PDF Handling**: `pdf-lib` to count pages in client uploads
- **Deployment**: Vercel

---

## 🛠️ Local Setup

```bash
git clone https://github.com/<your-repo>/print-hub.git
cd print-hub

# Install dependencies
npm install

# Configure environment
cp .env.example .env
# Add Supabase, Pinata API keys, NEXT_PUBLIC_URL, etc.

npm run dev
# Opens at http://localhost:3000
