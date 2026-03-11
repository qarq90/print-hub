# Print Hub

Print Hub is a full-stack print shop management system deployed in a college environment, enabling students to queue, upload, and manage print jobs and stationery orders seamlessly.

[![Vercel](https://img.shields.io/badge/deployed-on-vercel-000000?logo=vercel)](https://print-hub-five.vercel.app/)

## 🚀 Live Demo

Explore the live site: **[https://print-hub-five.vercel.app/](https://print-hub-five.vercel.app/)**

# Print Management System

## 📌 Features

### **Document Management**

- Upload & preview PDFs and images before printing
- Automatic page count detection for uploaded PDFs
- Support for multiple file formats

### **Print Configuration**

- Configure print options: single/double side
- Color selection (B/W or colored)
- Copy count adjustment
- Binding options

### **Pricing & Estimation**

- Job cost estimation based on:
    - Page count
    - Number of copies
    - Color selection (B/W or colored)
    - Sidedness (single/double)
    - Binding type
- Real-time cost calculation

### **Stationery & Orders**

- **Stationery items** purchase alongside prints
- **Order system** for bulk stationery supplies
- Integrated order management
- Separate order tracking from print jobs

### **Queue Management**

- Print queue accessible to users and admins
- Status tracking: pending, processing, completed, cancelled
- Priority assignment for urgent jobs

### **Job Operations**

- Update print job details
- Mark jobs as complete
- Cancel pending jobs
- View detailed job information
- Batch operations for multiple jobs

### **User Interface**

- Theming support with light/dark toggle
- Responsive design for all devices
- Intuitive navigation and workflow
- Real-time status updates

### **Access Control**

- Multi-role system: User, Admin, Shopkeeper
- Role-based permissions and views
- Separate dashboards for different user types

## 🔧 Technical Features

- **Admin Panel**: Comprehensive management interface
- **Shopkeeper Portal**: Specialized interface for shop operations
- **User History**: Complete job tracking and history
- **Real-time Updates**: Instant status changes
- **Data Persistence**: Secure storage of all transactions

## 📋 Status

- **Razorpay Payment Gateway**: Cancelled ❌
- **Project Version**: 1.0
- **Completion Date**: 20/09/2025

## 🔧 Tech Stack

- **Frontend/Backend**: Next.js (App Router)
- **UI Components**: Tailwind CSS, Radix UI, Heroicons, React Icons
- **API**: Neon DB
- **Pinata**: IPFS storage for uploaded files
- **PDF Handling**: `pdf-lib` to count pages in client uploads
- **Deployment**: Vercel

## 🛠️ Local Setup

```bash
git clone https://github.com/qarq90/print-hub.git
cd print-hub

# Install dependencies
npm install

# Configure environment
cp .env.example .env
# Add Neon DB URI, Pinata API keys, Clerk API Keys, NEXT_PUBLIC_URL, etc.

npm run dev
# Opens at http://localhost:3000
```
