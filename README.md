# Drawing Guide for Kids

> **Step-by-step visual drawing guide for children (ages 4-9)**
> Built with **React Native + Expo** and **Clean Architecture**

[![Expo SDK 56](https://img.shields.io/badge/Expo-SDK%2056-blue?style=flat)](https://docs.expo.dev/versions/latest/) [![React Native](https://img.shields.io/badge/React%20Native-0.74-blue.svg?style=flat)](https://reactnative.dev/) [![TypeScript](https://img.shields.io/badge/TypeScript-5.1-blue.svg?style=flat)](https://www.typescriptlang.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## 📚 Overview

**Drawing Guide for Kids** is a mobile app that teaches children to draw step-by-step on **physical paper** (not digital canvas).
Kids follow guided visual steps (e.g., fish body → tail → eyes), then upload photos of their hand-drawn work to a journal.

| Feature | Description |
|---------|-------------|
| **Step-by-Step Layers** | Interactive SVG guide using `react-native-pager-view` + `react-native-svg` |
| **Target Age** | 4–9 years (big buttons, bright colors, minimal text) |
| **Architecture** | Clean Architecture + Presentational/Container separation |
| **Persistence** | `AsyncStorage` for uploaded drawings journal |
| **Photo Upload** | `expo-image-picker` to capture kids' artwork |

## 🛠️ Tech Stack

### Core

| Component | Choice |
|-----------|--------|
| Framework | React Native (Expo Managed Workflow, SDK 56) |
| Language | TypeScript (Strict Mode) |
| Navigation | Expo Router (file-based) |
| UI/Styling | StyleSheet only (no external UI libs) |
| State | React useState/useCallback + AsyncStorage |

### Key Libraries

| Library | Purpose |
|---------|---------|
| `react-native-pager-view` | Horizontal step slider |
| `react-native-svg` | Render SVG path layers per step |
| `expo-image-picker` | Photo upload from gallery/camera |
| `@react-native-async-storage/async-storage` | Store uploaded image URIs locally |

## 📂 Project Structure

```
drawing-guide-kids/
├── app/                          # Expo Router file-based routes
│   ├── _layout.tsx               # Root layout (Stack)
│   ├── index.tsx                 # Home screen (drawing grid)
│   ├── drawing/
│   │   └── [id].tsx              # Step-by-step drawing viewer
│   └── journal/
│       └── index.tsx             # Uploaded artworks gallery
├── constants/
│   └── mockData.json             # Drawing data (SVG paths per step)
├── src/
│   ├── domain/
│   │   ├── models/
│   │   │   └── drawing.ts        # DrawingObject, DrawingStep interfaces
│   │   ├── repositories/
│   │   │   └── drawingRepository.mock.ts
│   │   └── usecases/
│   │       └── journal/
│   │           └── uploadKarya.ts
│   └── presentation/
│       ├── components/
│       │   └── drawingViewer/
│       │       ├── DrawingViewer.container.tsx    # Logic + data
│       │       ├── DrawingViewer.presentational.tsx # Pure UI
│       │       └── DrawingViewer.styles.ts
│       └── hooks/
│           └── useJournalUpload.ts                 # Image pick + save
├── package.json
└── tsconfig.json
```

## ▶️ Getting Started

### Prerequisites

- Node.js 20+
- Yarn or npm
- Android phone with **Expo Go** (latest) or **Expo Dev Client**
- (Optional) Expo Dev Client for SDK 56: `npx expo install expo-dev-client`

### Install & Run

```bash
git clone git@github.com:goonerzdevops/drawing-guide-kids.git
cd drawing-guide-kids
npm install

# Start Metro bundler (clears cache)
npx expo start --clear

# Run on Android device/emulator
npm run android

# Or open in Web browser
npm run web
```

### Debug on Android Phone

1. Enable **Developer Options** → **USB Debugging** on phone
2. Install **Expo Go** from Play Store
3. Scan QR code from terminal
4. To debug JS: shake device → **Debug Remote JS** → Chrome DevTools Console

> ⚠️ If Expo Go says "Project incompatible", install `expo-dev-client` and run `npx expo run:android` instead.

## 🎨 SVG Data Guide

SVG assets are embedded in **`constants/mockData.json`** as raw path data (`d` attribute only — no full SVG tags).

### Data Format

```json
{
  "drawings": [
    {
      "id": "ikan",
      "name": "Ikan",
      "icon": "🐟",
      "steps": [
        {
          "step": 1,
          "part_name": "Badan",
          "svg_path": "M 20 50 C 20 30 80 30 80 50 C 80 70 20 70 20 50 Z"
        }
      ]
    }
  ]
}
```

### How to Add a New Drawing

1. Create your shape in **Inkscape** or **Figma**
2. Export as SVG
3. Extract the `d="..."` attribute from `<path>`
4. Add a new entry in `constants/mockData.json`:

```json
{
  "id": "anjing",
  "name": "Anjing",
  "icon": "🐕",
  "steps": [
    { "step": 1, "part_name": "Kepala", "svg_path": "M ..." },
    { "step": 2, "part_name": "Telinga", "svg_path": "M ..." }
  ]
}
```

5. Add it to the Home grid via `app/index.tsx`

> 💡 **Tip**: Use "Simplify Path" in Inkscape for child-friendly, smooth curves.

### How to Convert SVG Tags to Path Data

If your SVG has shapes like `<ellipse>`, `<circle>`, `<polygon>`, convert them:

| SVG Tag | Path Equivalent |
|---------|-----------------|
| `<circle cx="50" cy="50" r="10"/>` | `M 50 40 A 10 10 0 1 0 50 60 A 10 10 0 1 0 50 40` |
| `<ellipse cx="50" cy="50" rx="30" ry="20"/>` | `M 50 30 C 50 10 80 10 80 50 C 80 90 50 90 50 70 Z` |
| `<polygon points="25,50 5,30 5,70"/>` | `M 25 50 L 5 30 L 5 70 Z` |

## 🧩 Architecture

This project follows **Clean Architecture** with strict separation:

| Layer | Folder | Responsibility |
|-------|--------|----------------|
| **Domain** | `src/domain/models/` | TypeScript interfaces (DrawingObject, DrawingStep) |
| **Data** | `src/domain/repositories/` | Data access (mockData.json reader) |
| **Use Cases** | `src/domain/usecases/` | Business logic (upload image, save URI) |
| **Presentation** | `src/presentation/components/` | UI components |
| **Presentational** | `*.presentational.tsx` | Pure rendering (SVG, styles) — no logic |
| **Container** | `*.container.tsx` | Logic + state + data fetching |
| **Routes** | `app/` | Expo Router file-based navigation |

### Component Pattern

```
Container (logic) → Presentational (UI)
     ↓                       ↓
  useState              Props only
  AsyncStorage          SVG rendering
  ImagePicker           Styles
```

## 🎨 Customization

### Change Drawing Colors

Edit in `DrawingViewer.styles.ts`:

```ts
stroke: '#FF4500',  // Orange outline for kid-friendly look
strokeWidth: 3,     // Thicker lines for small fingers to follow
```

### Change Button Sizes

Minimum 48x48 touch target (per child UX rules):

```ts
button: {
  minWidth: 48,
  minHeight: 48,
  padding: 12,
}
```

### Add More Drawings

1. Add JSON to `constants/mockData.json`
2. The Home grid auto-renders all entries from `mockData.json`

## 🚨 Troubleshooting

| Issue | Solution |
|-------|----------|
| Expo Go: "Project incompatible" | Run `npx expo install expo-dev-client` then `npx expo run:android` |
| Blank screen / "Open App.tsx" | Run `npx expo start --clear`, rescan QR |
| AsyncStorage not saving | Ensure `@react-native-async-storage/async-storage` is installed |
| SVG not rendering | Check `svg_path` format — must be raw `d` attribute data only |
| TypeScript errors | Run `npx tsc --noEmit` to check |

## 📦 Build for Release

```bash
# Install EAS CLI
npm install -g eas-cli

# Configure EAS
eas build:configure

# Build Android APK/AAB
eas build --platform android --profile production

# Build iOS IPA (macOS only)
eas build --platform ios --profile production
```

## 📜 License

MIT — use freely, build on!

## 📧 Contact

- 👨‍💻 [@goonerzdevops](https://github.com/goonerzdevops)
- 🐛 [Open an issue](https://github.com/goonerzdevops/drawing-guide-kids/issues)
