# Mijikenda AI — Full Starter

Hii package ina:
- `server/` — backend Node.js + Express + OpenAI Responses API + website
- `android/` — Flutter Android client inayotumia backend hiyo hiyo

## 1. Backend + Website

Requirements: Node.js 20+.

```bash
cd server
npm install
copy .env.example .env
```

Kwenye `.env`, weka:
```env
OPENAI_API_KEY=YOUR_SECRET_KEY
OPENAI_MODEL=gpt-5.5
PORT=3000
```

Kisha:
```bash
npm start
```

Fungua:
`http://localhost:3000`

MUHIMU: API key ibaki kwenye `.env` ya server. Usiweke key ndani ya browser au Android app.

## 2. Android

Requirements: Flutter SDK + Android Studio.

```bash
cd android
flutter pub get
flutter run
```

Kwa Android Emulator, `apiBase` kwenye `lib/main.dart` iko `http://10.0.2.2:3000`.
Kwa simu halisi, badilisha hiyo URL iwe backend yako ya HTTPS iliyodeployiwa, kwa mfano:
`https://api.example.com`

## 3. Production architecture

Browser / Android App
        |
        v
Mijikenda AI Backend
        |
        v
OpenAI Responses API
        |
        v
Mijikenda AI answer

Baadaye tunaweza kuongeza PostgreSQL, login, persistent chat history, file upload, web search, voice, admin dashboard na payments.
