# ⚡ Nexora Life AI

A premium mobile-first AI productivity app built with React, TypeScript, Firebase & OpenAI.

## Features
- 🤖 AI Life Coach powered by OpenAI GPT-4o
- ✅ Task management with categories & priorities
- 🎯 Goal tracking with milestones & progress bars
- 🌱 Habit tracking with streaks & heatmaps
- 🔐 Firebase Authentication (email + Google)
- ☁️ Firestore real-time database
- 💾 LocalStorage fallback when offline
- 📱 Mobile-first PWA design

## Getting Started

### 1. Clone the repo
```bash
git clone https://github.com/yourusername/nexora-life-ai.git
cd nexora-life-ai
npm install
```

### 2. Set up Firebase
- Go to [Firebase Console](https://console.firebase.google.com)
- Create a new project
- Enable Authentication (Email/Password + Google)
- Enable Firestore Database
- Copy your config to `.env`

### 3. Set up OpenAI
- Get your API key from [OpenAI Platform](https://platform.openai.com)
- Add it to `.env`

### 4. Configure environment
```bash
cp .env.example .env
# Fill in your keys in .env
```

### 5. Run
```bash
npm start
```

## Project Structure
```
src/
├── components/         # Reusable UI components
│   ├── ui/             # Base components (Button, Card, Input, Modal)
│   ├── layout/         # Layout components (BottomNav, AppShell)
│   ├── auth/           # Auth components
│   ├── home/           # Home screen components
│   ├── tasks/          # Task components
│   ├── goals/          # Goal components
│   ├── habits/         # Habit components
│   ├── coach/          # AI Coach components
│   └── profile/        # Profile components
├── pages/              # Route-level pages
├── hooks/              # Custom React hooks
├── services/           # Firebase, OpenAI, localStorage
├── utils/              # Helper functions
├── contexts/           # React contexts (Auth, App state)
└── styles/             # Global styles & tokens
```

## Deployment
```bash
npm run build
# Deploy /build folder to Vercel, Netlify, or Firebase Hosting
```

## Tech Stack
- React 18 + TypeScript
- React Router v6
- Firebase Auth + Firestore
- OpenAI API (GPT-4o)
- Framer Motion
- Lucide React icons
