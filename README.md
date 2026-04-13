# PromptShorts AI

Full-stack web app for generating YouTube Shorts-ready vertical videos from prompts.

## Stack
- Frontend: React + Tailwind + Vite
- Backend: Node.js + Express
- Database: MongoDB + Mongoose
- Auth: JWT
- Payments: Razorpay (with mock fallback)

## Features
- Signup/Login with JWT
- Protected dashboard
- Prompt templates (Motivation, Money tips, Facts, Story, Horror, Village life)
- AI video generation workflow (Replicate/Runway/Stable Video Diffusion with env switch)
- Text-to-speech (ElevenLabs/Google TTS fallback)
- Auto captions (big bold shorts style metadata)
- Trending-style background music attachment
- Download MP4 preview URL
- Credit system:
  - Free: 3 videos/day
  - Paid: ₹299/month unlimited
- Optional YouTube upload stub endpoint

## Project structure
- `backend/` Express API server
- `frontend/` React web app

## Run locally
### 1) Backend
```bash
cd backend
cp .env.example .env
npm install
npm run dev
```

### 2) Frontend
```bash
cd frontend
cp .env.example .env
npm install
npm run dev
```

## API summary
- `POST /api/auth/signup`
- `POST /api/auth/login`
- `GET /api/auth/profile`
- `GET /api/videos/templates`
- `POST /api/videos/generate`
- `GET /api/videos`
- `POST /api/payments/create-order`
- `POST /api/payments/verify`

## Notes
When provider API keys are not set, the app returns mock media URLs so you can test end-to-end flow without paid keys.
