# Drawing Guide for Kids

> **Step-by-step visual drawing guide for children (ages 4-9)**
> Built with **React Native + Expo (SDK 54)** and **Clean Architecture**

[![Expo SDK 54](https://img.shields.io/badge/Expo-SDK%2054-blue?style=flat)](https://docs.expo.dev/versions/v54.0.0/) [![React Native](https://img.shields.io/badge/React%20Native-0.73-blue.svg?style=flat)](https://reactnative.dev/) [![TypeScript](https://img.shields.io/badge/TypeScript-5.1-blue.svg?style=flat)](https://www.typescriptlang.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## 📚 Overview
**Drawing Guide for Kids** is a mobile app that teaches children to draw step-by-step on **physical paper** (not digital canvas).
Kids follow guided visual steps (e.g., fish body → tail → eyes), upload photos of their hand-drawn work, and track progress in a journal.

| Feature | Description |
|--------|-------------|
| **Step-by-Step Layers** | Interactive guide using `react-native-pager-view` and `react-native-svg` |
| **Target Age** | 4–9 years (child-friendly UI — big buttons, bright colors, minimal text) |
| **Architecture** | Clean Architecture + Dumb/Presentational Components |
| **Persistence** | `AsyncStorage` for uploaded drawings |
| **Photo Upload** | `expo-image-picker` to capture kids' artwork |

## 🛠️ Tech Stack

### Core

| Component | Choice |
|-----------|--------|
| Framework | React Native (Expo Managed Workflow, **SDK 54**) |
| Language | TypeScript (Strict Mode) |
| Navigation | Expo Router (file-based) |
| UI/Styling | StyleSheet only (no external UI libs) |

### Key Libraries

| Library | Version | Purpose |
|-------|--------|-------|
| `expo` | **^54.0.0** | Cross-platform runtime |
| `react-native` | 0.73 | UI rendering |
| `react-native-pager-view` | ^8.0.1 | Horizontal step slider |
| `react-native-svg` | ^15.15.4 | SVG path rendering |
| `expo-image-picker` | ^54.0.0 | Photo upload from gallery/camera |
| `@react-native-async-storage/async-storage` | ^2.2.0 | Local storage of image URIs |

## 📂 Project Structure

```
drawing-guide-kids/
├── app/                          # Expo Router file-based routes
│   ├── _layout.tsx               # Root layout (Stack)
│   ├── index.tsx                 # Home screen (drawing grid)
│   ├── drawing/
│   │   └── [id].tsx               # Step-by-step drawing viewer
│   └── journal/
│       └── index.tsx             # Uploaded works gallery
├── constants/
│   └── mockData.json             # SVG path data for all drawings
├── src/
│   ├── domain/
│   │   ├── models/
│   │   │   └── drawing.ts        # DrawingObject, DrawingStep interfaces
│   │   └── repositories/
│   │       └── drawingRepository.mock.ts
│   └── presentation/            # Clean Architecture UI layer
│       ├── components/
│       │   └── drawingViewer/   # Step-by-step viewer
│       │       ├── DrawingViewer.container.tsx
│       │       ├── DrawingViewer.presentational.tsx
│       │       └── DrawingViewer.styles.ts
│       └── hooks/
│           └── useJournalUpload.ts
├── package.json                  # Dependencies
├── tsconfig.json                # TypeScript config (strict mode)
└── README.md
```

## ▶️ Getting Started

### Prerequisites

- Node.js 20+ 
- Yarn or npm
- Android phone with **Expo Go (latest)** — or **Expo Dev Client** (if SDK requirements mismatch)

### Install & Run

```bash
# Clone via SSH
 git clone git@github.com:goonerzdevops/drawing-guide-kids.git
 cd drawing-guide-kids

# Install Expo SDK 54
 yarn add expo@^54.0.0
 yarn install

# Start Metro (clear cache)
 npx expo start --clear

# Run on Android
 npx expo run:android

# Run in web browser
 npm run web
```

> ⚠️ If Expo Go shows **"Project incompatible"**, update Expo Go from Play Store, **or** use `
npx expo run:android
` (dev build).

### Debug on Phone

1. Install **Expo Go** from Play Store
2. Scan QR from terminal `npm start`
3. Shake phone → **Debug Remote JS** → Chrome DevTools Console

## 🎨 SVG Data Guide

SVGs are **raw path strings** (`d` attribute only) embedded directly in `constants/mockData.json`.

### Sample Data

```json
{
  "drawings": [
    {
      "id": "ikan",
      "name": "Ikan",
      "icon": "🐟",
      "steps": [
        { "step": 1, "part_name": "Body", "svg_path": "M20,50C20,30,80,30,80,50C80,70,20,70,20,50Z" },
        { "step": 2, "part_name": "Tail", "svg_path": "M25,50L5,30L5,70Z" },
        ...
      ]
    }
  ]
}
```

### How to Add a New Drawing

1. Draw shape in Inkscape/Figma
2. Export as SVG
3. Extract **only the `d="..."`** attribute
4. Add JSON entry:

```json
{ "id": "pingvin", "name": "Pinguin", "icon": "🐧", "steps": [{ ... }] }
```

> 💡 **Path Simplification**: Keep paths **minimal** for kid-friendly sketching — use Inkscape’s *Simplify Path*.

## 🧠 Clean Architecture

| Layer | What Lives Here | Example |
|--------|----------------|---------|
| **Domain** | Business logic & interfaces | `models/DrawingObject.ts` |
| **Data** | Mock repositories | `repositories/drawingRepository.mock.ts` |
| **Presentation** | React components + hooks | `components/DrawingViewer.container.tsx` |

> ✅ **Dumb/Presentational**: SVG rendering + UI/styles
> ❌ **Container**: Logic + state (AsyncStorage, step change)

## 🔐 Security

- **AsyncStorage** keys follow format `drawing_guide:v1:ikan` (versioned)
- **Photo upload**: only accepts image/* MIME types (`expo-image-picker`
  uses Android/iOS permission prompts)
- **Child-safe**: minimal text, no animations, large buttons

## 🛠️ Troubleshooting

| Issue | Solution |
|-------|----------|
| **"Project incompatible"** Expo Go | Run `yarn add expo@^54.0.0` then `npx expo run:android` |
| **Blank screen** | `npx expo start --clear` rescan QR |
| **SVG not rendering** | Check `svg_path` format — must be raw `d` data only |
| **AsyncStorage fails** | Clear app cache in Android settings

## 📦 Build for Release

```bash
# Configure EAS
echo -e "expo\"\nandroid\"\ny" | eas build:configure

# Build Android APK/AAB
eas build --platform android --profile production
```

> ℹ️ Production builds use **Expo SDK 54** — ensure Play Store target matches.

## 📜 License

MIT — use, share, build on!

## 📧 Contact

- GitHub: [@goonerzdevops](https://github.com/goonerzdevops)
- Issues: [github.com/goonerzdevops/drawing-guide-kids/issues](https://github.com/goonerzdevops/drawing-guide-kids/issues)