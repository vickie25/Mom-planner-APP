# Mom Planner

A warm, premium planner app for moms built with Expo Router + NativeWind.  
Designed to feel calm, responsive, and intentional with subtle micro-interactions.

## Highlights
- 10-screen app structure with Expo Router
- NativeWind (Tailwind) styling with a warm off-white palette
- Motion system: staggered lists, card lift, button feedback, empty-state breathing
- Contextual haptics (expo-haptics)
- Clean, componentized UI primitives

## Tech Stack
- Expo + React Native
- Expo Router
- NativeWind + TailwindCSS
- TypeScript
- expo-haptics

## Getting Started
Install dependencies:

```
npm install
```

Run the app:

```
npm run start
```

Platform shortcuts:

```
npm run ios
npm run android
npm run web
```

## App Structure
```
app/
  (tabs)/               # Tab screens: home, calendar, tasks, meals, settings
  auth/                 # Sign in / sign up
  components/           # Shared UI + interaction components
  constants/            # Theme tokens
  lib/                  # App context + haptics helpers + mock data
  onboarding.tsx
  grocery.tsx
  family.tsx
```

## Key Screens
- Onboarding
- Sign In / Sign Up
- Home
- Calendar
- Tasks
- Meals
- Settings
- Grocery
- Family

## Design System
Theme tokens live in:
- `app/constants/theme.ts`
- `tailwind.config.js`

The UI uses:
- Soft shadows
- Rounded cards/inputs
- Warm off-white background

## Interaction System
Built-in micro-interactions:
- Cards lift on press and respond to long press
- Buttons scale + fade on press, with a soft pulse on first render
- Lists animate in with staggered fade/slide
- Empty states breathe gently
- Contextual haptics via `app/lib/haptics.ts`

Components you can reuse:
- `Screen` (animated entry + background shapes)
- `Card` (physics-like press feedback)
- `Button` (press + pulse)
- `TextField` (focus glow + label animation + success/error feedback)
- `StaggeredItem` (list entrance)
- `ToggleSwitch` (springy switch)
- `SuccessBurst` (feedback badge)
- `Skeleton` (shimmer loader)

## Styling Setup
NativeWind is configured via:
- `babel.config.js`
- `metro.config.js`
- `global.css`
- `nativewind.d.ts`

## Troubleshooting
- If styles don't apply: restart Metro with cache clear:
  ```
  npm run start -- --clear
  ```
- If fonts look off: ensure the app loads fonts in `app/_layout.tsx`

## Notes
This app is optimized for iOS-quality UX, with subtle motion and haptics.
Contributions should keep interactions purposeful and minimal.
