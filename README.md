# Platinum Drive 🚀

A modern, feature-rich cloud storage platform built with Next.js 15, Prisma, and PostgreSQL. Platinum Drive offers enterprise-grade file management with advanced security features, user management, and comprehensive admin controls.

![Next.js](https://img.shields.io/badge/Next.js-15.5.5-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)
![Prisma](https://img.shields.io/badge/Prisma-6.17.1-2D3748)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Latest-336791)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.0-38B2AC)

## 📋 Table of Contents

- [Features](#features)
- [Technology Stack](#technology-stack)
- [System Architecture](#system-architecture)
- [Installation](#installation)
- [Configuration](#configuration)
- [Database Schema](#database-schema)
- [Security Features](#security-features)
- [Admin Panel](#admin-panel)
- [File Management](#file-management)
- [API Documentation](#api-documentation)
- [Deployment](#deployment)
- [Environment Variables](#environment-variables)
- [Scripts](#scripts)
- [Project Structure](#project-structure)

---

## ✨ Features

### 🔐 Advanced Authentication & Security

- **Multi-Factor Authentication (2FA)**
  - Global admin-controlled 2FA enforcement
  - Time-based OTP (10-minute expiry)
  - Visual countdown timer with resend functionality
  - Session-based 2FA verification

- **Email Verification System**
  - 6-digit verification codes
  - 15-minute code expiry
  - Automatic email dispatch via SMTP
  - Code resend with rate limiting

- **Password Security**
  - Strong password enforcement (uppercase, lowercase, numbers, special characters)
  - Password history tracking (prevents reusing last N passwords)
  - Password expiry policies (configurable days)
  - Secure password hashing with bcrypt

- **Account Security**
  - Login attempt tracking and account lockout
  - Configurable lockout duration
  - Suspicious login alerts
  - Session management with NextAuth.js

### 📁 File Management

- **Upload & Storage**
  - Drag-and-drop file upload
  - Progress tracking with percentage display
  - File type validation with custom policies
  - Per-type file size limits
  - Virus scanning capability (configurable)
  - Automatic thumbnail generation
  - User storage quota management

- **File Organization**
  - Folder creation and nested structures
  - File and folder favorites
  - Recent files tracking
  - Trash/recycle bin with restoration
  - Auto-cleanup for old files
  - File preview generation

- **File Sharing**
  - Secure share links with tokens
  - Password-protected shares
  - Expiration date configuration
  - Share link revocation
  - Download tracking
  - Public/private sharing modes

### 👨‍💼 User Management

- **User Profiles**
  - Customizable profile information
  - Avatar upload with image optimization
  - Login history tracking
  - Session management
  - Preference settings

- **Storage Quotas**
  - Per-user storage limits
  - Admin-configurable quotas
  - Real-time usage tracking
  - Storage analytics with visual charts
  - Quota exceeded notifications

- **Role-Based Access Control (RBAC)**
  - Admin, User, Guest roles
  - Permission-based access
  - Role assignment by admins

### 🎛️ Admin Panel

- **Dashboard Analytics**
  - Total users count
  - Total files uploaded
  - Total storage used with percentage
  - Visual storage chart

- **User Management**
  - View all registered users
  - User status management (Active/Suspended)
  - Role assignment
  - Storage quota modification
  - Account deletion

- **System Settings** (8 Configuration Tabs)
  - General Settings (site name, maintenance mode, language)
  - Security Settings (2FA, password policies, login attempts)
  - Email Settings (SMTP configuration)
  - Upload Settings (file size limits, virus scanning)
  - Storage Settings (quotas, auto-cleanup)
  - Appearance Settings (theme, logo)
  - Notification Settings
  - Advanced Settings

- **File Type Policies**
  - Define allowed file types by MIME type
  - Set per-type size limits
  - Quick-load 16 default types (images, documents, audio, video, archives)

### 🌐 User Interface

- **Modern Design**
  - RTL (Right-to-Left) support for Arabic
  - Dark mode with system preference detection
  - Responsive design for all devices
  - Tab-like navigation with active indicators
  - Live clock and date display in Arabic
  - Toast notifications

---

## 🛠️ Technology Stack

### Frontend
- **Next.js 15.5.5** - React framework with App Router
- **React 19** - UI library
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **Shadcn/ui** - Component library
- **Lucide React** - Icon library

### Backend
- **Next.js API Routes** - Serverless API endpoints
- **NextAuth.js** - Authentication solution
- **Prisma ORM** - Database ORM
- **PostgreSQL** - Relational database
- **Bcryptjs** - Password hashing
- **Nodemailer** - Email sending

---

## 📦 Installation

### Prerequisites

- **Node.js** 20.x or higher
- **PostgreSQL** 14.x or higher
- **npm** or **yarn** package manager

### Step 1: Clone the Repository

```bash
git clone https://github.com/youssef509/Platinum-Drive.git
cd Platinum-Drive
```

### Step 2: Install Dependencies

```bash
npm install
```

### Step 3: Set Up Environment Variables

Create a `.env` file in the root directory:

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/platinum_drive"

# NextAuth
NEXTAUTH_SECRET="your-secret-key-here"
NEXTAUTH_URL="http://localhost:3000"
AUTH_TRUST_HOST="true"

# Email (SMTP)
SMTP_HOST="smtp.gmail.com"
SMTP_PORT="587"
SMTP_USER="your-email@gmail.com"
SMTP_PASSWORD="your-app-password"
SMTP_FROM="noreply@platinumdrive.com"
```

### Step 4: Set Up Database

Run Prisma migrations:

```bash
npx prisma migrate dev
```

Seed the database with default data:

```bash
npx prisma db seed
```

### Step 5: Run Development Server

```bash
npm run dev
```

Visit `http://localhost:3000` in your browser.

---

## ⚙️ Configuration

### System Settings

Navigate to **Admin Panel → System Settings** to configure:

- General settings (site name, maintenance mode)
- Security policies (2FA, password rules)
- Upload limits and file types
- Storage quotas
- Email server settings

### File Type Policies

Go to **Admin Panel → File Types Management** to:

- Add custom file types
- Set per-type size limits
- Load 16 default file types:
  - **Images**: jpg, png, gif, webp (10MB each)
  - **Documents**: pdf, doc, docx, xls, xlsx, txt (50MB each)
  - **Audio**: mp3, wav (50-100MB)
  - **Video**: mp4, mpeg (500MB)
  - **Archives**: zip, rar (500MB)

---

## 🗃️ Database Schema

### Core Tables

**Users** - User accounts with roles and storage quotas
**Files** - Uploaded files with metadata
**Folders** - Folder structure for organization
**Shares** - File sharing with secure tokens
**SystemSettings** - Application configuration
**FileTypePolicy** - File type validation rules
**Notifications** - User notifications
**LoginHistory** - Login attempt tracking
**PasswordHistory** - Password change history
**VerificationCode** - Email verification codes
**TwoFactorCode** - 2FA OTP codes

See `prisma/schema.prisma` for the complete database schema.

---

## 🔒 Security Features

### 1. Authentication Security
- Strong password requirements (8+ chars, uppercase, lowercase, numbers, special chars)
- Account lockout after failed login attempts
- Session management with HTTP-only cookies

### 2. Two-Factor Authentication
- Admin-controlled global enforcement
- Time-based OTP codes (10-minute expiry)
- Email delivery with resend functionality

### 3. Email Verification
- 6-digit verification codes (15-minute expiry)
- Required for new account activation

### 4. Password Policies
- Password expiry enforcement
- Password history (prevents reuse)
- Secure bcrypt hashing

### 5. File Security
- File type validation
- Size limit enforcement
- Virus scanning capability
- Access control per file

---

## 👨‍💼 Admin Panel

### Dashboard
- Overview cards (users, files, storage)
- Visual storage chart

### User Management (`/admin/users-management`)
- View all users
- Suspend/Activate accounts
- Change user roles (Admin/User/Guest)
- Adjust storage quotas
- View login history

### System Settings (`/admin/system-settings`)
8 configuration tabs for complete system control

### File Types Management (`/admin/file-types-management`)
- Manage allowed file types
- Set per-type size limits
- Quick-load default types

---

## 📁 File Management

### Upload
- Multi-file upload support
- Progress tracking
- File validation (type, size)
- Storage quota checking

### File Operations
- View/Preview files
- Rename, move, delete
- Mark as favorite
- Share with secure links

### Folder Management
- Create nested folders
- Move files between folders
- Delete folders with contents

### Trash/Recycle Bin
- Soft delete (30-day retention)
- Restore deleted items
- Permanent deletion

---

## 🔗 API Documentation

### Authentication Endpoints

```http
POST /api/auth/register
POST /api/auth/verify-credentials
POST /api/auth/verify
POST /api/auth/request-2fa
POST /api/auth/verify-2fa
```

### File Endpoints

```http
POST /api/files/upload
GET /api/files
GET /api/files/[id]/download
DELETE /api/files/[id]
POST /api/files/[id]/favorite
```

### Share Endpoints

```http
POST /api/share
GET /api/share/public/[token]
GET /api/share/download/[token]
```

### Admin Endpoints

```http
GET /api/admin/users
PUT /api/admin/users/[id]/status
PUT /api/admin/users/[id]/quota
GET /api/admin/settings
PUT /api/admin/settings/[key]
GET /api/admin/file-types
POST /api/admin/file-types
```

---

## 🚀 Deployment

### Deploy to Google Cloud Run

```bash
# Set project
gcloud config set project YOUR_PROJECT_ID

# Enable APIs
gcloud services enable cloudbuild.googleapis.com
gcloud services enable run.googleapis.com

# Build and push
gcloud builds submit --tag gcr.io/YOUR_PROJECT_ID/platinum-drive

# Deploy
gcloud run deploy platinum-drive \
  --image gcr.io/YOUR_PROJECT_ID/platinum-drive \
  --platform managed \
  --region europe-west1 \
  --allow-unauthenticated \
  --port 8080
```

### Environment Variables for Production

```yaml
env:
- name: DATABASE_URL
  value: your-database-url
- name: NEXTAUTH_SECRET
  value: your-secret
- name: NEXTAUTH_URL
  value: https://your-app-url
- name: AUTH_TRUST_HOST
  value: "true"
- name: NODE_ENV
  value: production
```

---

## 🔧 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `DATABASE_URL` | PostgreSQL connection string | Yes |
| `NEXTAUTH_SECRET` | Secret for NextAuth.js | Yes |
| `NEXTAUTH_URL` | Application URL | Yes |
| `AUTH_TRUST_HOST` | Trust host for NextAuth | Yes |
| `SMTP_HOST` | Email SMTP host | No |
| `SMTP_PORT` | Email SMTP port | No |
| `SMTP_USER` | Email username | No |
| `SMTP_PASSWORD` | Email password | No |

---

## 📜 Scripts

```bash
# Development
npm run dev

# Build
npm run build

# Production
npm start

# Database
npx prisma migrate dev
npx prisma migrate deploy
npx prisma generate
npx prisma studio
npx prisma db seed
```

---

## 📂 Project Structure

```
platinum-drive/
├── prisma/              # Database schema and migrations
├── public/              # Static files
│   └── uploads/         # User uploaded files
├── src/
│   ├── app/            # Next.js App Router
│   │   ├── (auth)/     # Authentication pages
│   │   ├── admin/      # Admin panel
│   │   └── api/        # API routes
│   ├── components/     # React components
│   ├── hooks/          # Custom hooks
│   ├── lib/            # Utilities
│   └── types/          # TypeScript types
├── Dockerfile          # Docker configuration
└── package.json
```

---

## 👨‍💻 Author

**Youssef Ahmed**
- GitHub: [@youssef509](https://github.com/youssef509)
- Email: youssef201.dev@gmail.com

---

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/)
- [Prisma](https://www.prisma.io/)
- [NextAuth.js](https://next-auth.js.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Shadcn/ui](https://ui.shadcn.com/)
- [Google Cloud](https://cloud.google.com/)

---

**Made with ❤️ by Youssef Ahmed**

*Platinum Drive - Your files, your way* ☁️
