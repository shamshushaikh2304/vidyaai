# AryaLearn — Replit Integration Guide

## File Map

Paste each file into your Replit project at the path shown:

| File | Replit path |
|------|-------------|
| Login.tsx | `src/pages/Login.tsx` |
| BoardSelection.tsx | `src/pages/BoardSelection.tsx` |
| ClassSelection.tsx | `src/pages/ClassSelection.tsx` |
| Payment.tsx | `src/pages/Payment.tsx` |
| Dashboard.tsx | `src/pages/Dashboard.tsx` |
| index.css | `src/index.css` (replace existing) |
| tailwind.config.js | `tailwind.config.js` (replace existing) |

## Your existing files stay the same:
- `src/main.tsx` ✅
- `src/App.tsx` ✅
- `src/contexts/FlowContext.tsx` ✅
- `src/components/AppShell.tsx` ✅

## Add Anthropic API key

In Replit → Secrets tab, add:
```
VITE_ANTHROPIC_API_KEY = sk-ant-...
```

Then in `src/pages/Dashboard.tsx`, the fetch call already hits the Anthropic API directly.
For production, proxy this through your own backend so the key isn't exposed.

## Install missing packages (if needed)

```bash
npm install wouter @tanstack/react-query lucide-react
```

## Razorpay (Payment.tsx)

The Payment page has a commented-out Razorpay block. To activate:
1. `npm install razorpay`
2. Add `VITE_RAZORPAY_KEY` to Replit Secrets
3. Uncomment the block in `src/pages/Payment.tsx`
4. Add a `/api/create-order` backend route

## Flow

Login → BoardSelection → ClassSelection → Payment → Dashboard (AI Tutor)
