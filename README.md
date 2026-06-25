# Rick & Morty Explorer

A React Native app built with Expo and TypeScript that browses characters from the [Rick and Morty API](https://rickandmortyapi.com/). Users can explore characters on a home screen, search and filter a full character list, and view detailed profiles with episode history.

## API

**Rick and Morty API** ([https://rickandmortyapi.com/](https://rickandmortyapi.com/))

This API is free, public, and does not require an API key. It provides character and episode data with pagination, name search, and status filtering.


### Nice to Haves

- **Navigation**: React Navigation with bottom tabs (Home, Search, Saved, Profile) and nested stack navigators for character detail
- **State management**: Zustand for filter state (status and search query), TanStack Query for server state
- **Styling**: Custom dark theme with Inter font, consistent color tokens, and polished card layouts

## Features

- **Home**: Featured character hero card, horizontal popular characters row, status filter tabs, and search bar navigation
- **Character list**: Infinite scroll through 800+ characters, debounced name search, status filters, and total count display
- **Character detail**: Large avatar, full metadata (species, gender, origin, location, type), and scrollable episode list
- **Loading and errors**: Themed skeleton screens and recoverable error cards on every data-fetching screen

## Tech Stack

- [Expo](https://expo.dev/) ~54
- [React Native](https://reactnative.dev/) 0.81
- [TypeScript](https://www.typescriptlang.org/) ~5.9
- [React Navigation](https://reactnavigation.org/) 7 (bottom tabs + native stack)
- [TanStack Query](https://tanstack.com/query) 5
- [Zustand](https://zustand-demo.pmnd.rs/) 5
- [expo-image](https://docs.expo.dev/versions/latest/sdk/image/) for optimized image loading

## Prerequisites

- [Node.js](https://nodejs.org/) 18 or later
- npm (included with Node.js)
- [Expo Go](https://expo.dev/go) on a physical device, or Xcode (iOS) / Android Studio (Android) for simulators

## Setup

Clone the repository and install dependencies:

```bash
git clone https://github.com/NickName-AM/rick-n-morty
cd rick-n-morty
npm install
```

No environment variables or API keys are required.

## Running the App

Start the Expo development server:

```bash
npm start
```

From the Expo CLI menu you can:

- Press `i` to open the iOS simulator
- Press `a` to open the Android emulator
- Scan the QR code with Expo Go on a physical device

You can also run platform-specific commands directly:

```bash
npm run ios
npm run android
```


