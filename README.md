# BeyondChats Articles Platform

A React-based frontend for displaying and comparing original articles with AI-enhanced versions.

## Features
- View article previews on home page
- Compare original and enhanced article versions side-by-side
- Professional design with Inter and Playfair Display fonts
- Responsive layout with Tailwind CSS

## Tech Stack
- **Frontend**: React 18, Vite, Tailwind CSS, Shadcn UI
- **Backend**: Node.js, Express, SQLite
- **Styling**: Tailwind CSS with custom configuration

## Local Development

### Frontend
```bash
cd frontend
npm install
npm run dev
```

### Backend
```bash
cd backend
npm install
node src/server.js
```

## Deployment

Frontend deployed on Vercel
Backend requires deployment on Node.js hosting (Render, Railway, etc.)

## Environment Variables

Create a `.env` file in the frontend directory:
```
VITE_API_URL=your_backend_url
```
