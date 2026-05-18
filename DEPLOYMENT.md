# TechHub Calls & Text - Deployment Guide

## Overview

This project has three deployment targets:

| Component | Platform | URL/Output | Purpose |
|-----------|----------|------------|---------|
| Web App | **Vercel** | https://techub-calls-text.vercel.app | Browser-based calling & messaging |
| Android | **EAS Build** | APK / AAB files | Android app install |
| iOS | **EAS Build** | IPA file | iOS app install |

Source code is hosted on **GitHub**: https://github.com/techengineerworkstation/techub-calls-text-app

---

## 1. GitHub (Source Code)

### How it works
- GitHub stores your source code and version history
- Pushing to `master` triggers automatic Vercel deployments
- All collaborators work from the same repository

### Commands
```bash
# Clone the repo
git clone https://github.com/techengineerworkstation/techub-calls-text-app.git
cd techub-calls-text-app

# Install dependencies
pnpm install

# Make changes, then push
git add .
git commit -m "Your changes"
git push
```

---

## 2. Vercel (Web App)

### How it works
- Vercel connects to your GitHub repo and auto-deploys on every push to `master`
- The Next.js app at `packages/web/` is built and served globally via CDN
- Environment variables are stored in Vercel's dashboard (encrypted)
- Custom domains can be added in Vercel project settings

### Configuration
- **Project**: techub-calls-text
- **Root**: Monorepo root (uses `vercel.json` for build config)
- **Build**: `pnpm turbo build --filter=@telnyx-app/web`
- **Output**: `packages/web/.next`

### Environment Variables (already configured in Vercel)
| Variable | Description |
|----------|-------------|
| `TELNYX_API_KEY` | Your Telnyx API key |
| `TELNYX_PHONE_NUMBER` | +12255137157 |
| `TELNYX_SIP_CONNECTION_ID` | techengineerworkstation |
| `NEXT_PUBLIC_APP_URL` | https://techub-calls-text.vercel.app |

### Manual deployment
```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy to production
vercel deploy --prod
```

### Webhook URL
Configure this in your Telnyx portal:
```
https://techub-calls-text.vercel.app/api/telnyx/webhook
```

---

## 3. Expo / EAS (Mobile Apps)

### How it works
- **Expo** is a React Native framework for building cross-platform mobile apps
- **EAS Build** (Expo Application Services) compiles your app in the cloud
- You get downloadable APK/AAB (Android) and IPA (iOS) files
- No need for Android Studio or Xcode on your machine

### Setup

#### Step 1: Create an Expo account
```bash
# Install EAS CLI (already installed)
npm i -g eas-cli

# Login to Expo
eas login
# Enter your Expo username and password
# (Create account at https://expo.dev if you don't have one)
```

#### Step 2: Configure the project
```bash
cd packages/mobile

# Link to your Expo project (creates the project on expo.dev)
eas build:configure
```

#### Step 3: Build Android APK (for testing/ sideloading)
```bash
cd packages/mobile

# Build APK (preview profile - direct install)
eas build --platform android --profile preview
```
This produces a `.apk` file you can download and install directly on Android devices.

#### Step 4: Build Android AAB (for Google Play Store)
```bash
# Build AAB (production profile - for Play Store)
eas build --platform android --profile production
```
This produces a `.aab` file for Google Play Store submission.

#### Step 5: Build iOS IPA
```bash
# Build IPA (requires Apple Developer account - $99/year)
eas build --platform ios --profile production
```
This produces an `.ipa` file for TestFlight or App Store submission.

### Build Profiles (defined in eas.json)

| Profile | Android Output | Use Case |
|---------|---------------|----------|
| `development` | APK | Development with dev client |
| `preview` | APK | Testing, sideloading, direct install |
| `production` | AAB | App Store / Play Store submission |

### Downloading Builds
After a build completes:
1. Go to https://expo.dev/accounts/[your-username]/projects/techub-calls-text/builds
2. Click on the build
3. Download the APK/AAB/IPA file
4. Or scan the QR code on an Android device to install directly

### Submitting to App Stores

#### Google Play Store
```bash
# Submit AAB to Google Play
eas submit --platform android
```
Requires a Google Play Developer account ($25 one-time).

#### Apple App Store
```bash
# Submit IPA to App Store
eas submit --platform ios
```
Requires an Apple Developer account ($99/year).

---

## Local Development

### Web App
```bash
# From repo root
pnpm dev
# Opens at http://localhost:3000
```

### Mobile App
```bash
cd packages/mobile

# Start Expo dev server
npx expo start

# Then scan QR code with Expo Go app (Android/iOS)
# Or press 'a' for Android emulator, 'i' for iOS simulator
```

---

## Architecture

```
techub-calls-text-app/
├── packages/
│   ├── shared/          # Shared types and constants
│   ├── web/             # Next.js web app (deployed to Vercel)
│   └── mobile/          # Expo React Native app (built with EAS)
├── vercel.json          # Vercel build configuration
├── turbo.json           # Turborepo pipeline config
└── pnpm-workspace.yaml  # Monorepo workspace definition
```

### How the mobile app connects to Telnyx
The mobile app calls the same Vercel-hosted API routes:
- `POST /api/telnyx/call` - initiate calls
- `POST /api/telnyx/sms` - send messages
- Webhooks from Telnyx hit the Vercel endpoint

The API key stays server-side on Vercel - never exposed to mobile clients.
