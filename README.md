# ML Platform Landing Page - PyrunAI

A modern, animated landing page for an ML platform built with React + Vite. Features a scroll-driven canvas animation, dark/light theme toggle, and a working contact form via EmailJS.

## Tech Stack

- React 19 + Vite
- React Router DOM
- CSS Modules
- EmailJS (`@emailjs/browser`)

## Getting Started

```bash
npm install
npm run dev
```

## Environment Variables

Create a `.env` file in the root with your EmailJS credentials:

```
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
```

You can copy from `.env.example` and fill in real values.

For Vercel deployments, add the same three variables in Project Settings -> Environment Variables, then redeploy.

Sign up at [emailjs.com](https://www.emailjs.com) to get these values. Your template should include the variables `{{from_name}}`, `{{from_email}}`, `{{company}}`, and `{{message}}`.

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start dev server |
| `npm run build` | Production build |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |
