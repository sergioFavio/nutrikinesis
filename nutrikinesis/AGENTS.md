# AGENTS.md — FitCalc Architecture Guide

## Project Overview

FitCalc is a fitness and nutrition web app built with TanStack Start and deployed on Netlify. It has three functional tabs managed by local React state in the root route component.

## Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | TanStack Start |
| Frontend | React 19, TanStack Router v1 |
| Build | Vite 7 |
| Styling | Tailwind CSS 4 |
| AI / Pose | MediaPipe Tasks Vision (pose_landmarker_lite) |
| Language | TypeScript 5 (strict mode) |
| Deployment | Netlify |

## Directory Structure

```
src/
  routes/
    __root.tsx              # HTML shell, global metadata, lang="es"
    index.tsx               # Tab switcher (calories | exercise | nutrition), shared state
  components/
    CalorieCalculator.tsx   # Mifflin-St Jeor BMR/TDEE/IMC calculator
    ExerciseMonitor.tsx     # MediaPipe pose detection + rep counting
    NutritionPlan.tsx       # Meal plan generator based on daily calories
  styles.css                # Tailwind v4 + fade-in keyframe
netlify.toml                # Build config + COOP/COEP headers for SharedArrayBuffer
```

## Key Architectural Decisions

### State sharing between tabs
`dailyCalories` lives in `index.tsx` and flows down via props. `CalorieCalculator` calls `onCaloriesCalculated(target)` on submit; `NutritionPlan` renders from it.

### MediaPipe integration
`ExerciseMonitor` lazily creates a `PoseLandmarker` on first camera start. The WASM runtime is loaded from jsDelivr CDN and the lite model from Google Storage. The landmarker instance is kept in a ref and reused across exercise changes. A `requestAnimationFrame` loop runs detection on each video frame.

### Rep counting state machine
A `repCountedRef` boolean tracks whether the pose entered a "good" state. Transition from `good → non-good` increments the rep counter. This avoids double-counting.

### Cross-Origin Isolation
`netlify.toml` sets `Cross-Origin-Opener-Policy: same-origin` and `Cross-Origin-Embedder-Policy: require-corp` globally — required for MediaPipe WASM's use of `SharedArrayBuffer`.

## Coding Conventions

- TypeScript strict mode
- Default exports for components, inline interfaces for props
- Tailwind v4 utility classes only, no CSS Modules
- No global state library — props and `useState`
- Refs cleaned up in `useEffect` teardown to prevent camera/model leaks
- App language is Spanish (UI text, labels, nutritional content)

## Development Commands

```bash
npm run dev     # Start dev server on port 3000
npm run build   # Production build → dist/client
```
