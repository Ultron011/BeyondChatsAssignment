# Language Modelling Articles - Frontend

A React frontend application built with Vite, Tailwind CSS, and Shadcn UI to display and compare original articles with AI-enhanced versions.

## Tech Stack

- **React** - UI library
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Shadcn UI** - Beautiful and accessible UI components
- **Axios** - HTTP client for API calls
- **Lucide React** - Icon library

## Getting Started

### Install Dependencies

```bash
npm install
```

### Run Development Server

```bash
npm run dev
```

The app will be available at `http://localhost:5173/`

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
frontend/
├── src/
│   ├── components/
│   │   └── ui/          # Shadcn UI components
│   ├── services/
│   │   └── api.js       # API service for backend communication
│   ├── lib/
│   │   └── utils.js     # Utility functions
│   ├── App.jsx          # Main app component
│   ├── main.jsx         # Entry point
│   └── index.css        # Global styles with Tailwind
├── public/              # Static assets
└── package.json
```

## Configuration

- **Backend API URL**: Update the `API_BASE_URL` in `src/services/api.js` to match your backend server
- **Tailwind Config**: Customize theme in `tailwind.config.js`
- **Path Alias**: The `@` alias points to the `src` directory

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Features

- ✅ Responsive design with Tailwind CSS
- ✅ Professional UI components from Shadcn
- ✅ API service configured for backend communication
- ✅ Dark mode support
- ✅ Modern React with hooks
