import { ExpoConfig } from "expo/config";

const config: ExpoConfig = {
  name: "TechHub Calls & Text",
  slug: "techub-calls-text",
  owner: "techengineerworkstation",
  version: "1.0.0",
  orientation: "portrait",
  icon: "./assets/icon.png",
  userInterfaceStyle: "light",
  scheme: "techub-calls-text",
  splash: {
    image: "./assets/splash-icon.png",
    resizeMode: "contain",
    backgroundColor: "#0D9488",
  },
  assetBundlePatterns: ["**/*"],
  ios: {
    supportsTablet: true,
    bundleIdentifier: "com.techub.callstext",
    infoPlist: {
      NSMicrophoneUsageDescription:
        "This app needs microphone access for phone calls",
      NSCameraUsageDescription:
        "This app needs camera access for video calls",
      ITSAppUsesNonExemptEncryption: false,
    },
  },
  android: {
    adaptiveIcon: {
      foregroundImage: "./assets/adaptive-icon.png",
      backgroundColor: "#0D9488",
    },
    package: "com.techub.callstext",
    permissions: [
      "android.permission.RECORD_AUDIO",
      "android.permission.CAMERA",
    ],
  },
  plugins: ["expo-router", "expo-font"],
  experiments: {
    typedRoutes: true,
  },
  extra: {
    API_URL: process.env.EXPO_PUBLIC_API_URL || "https://techub-calls-text.vercel.app",
    eas: {
      projectId: "82139172-58b0-4657-acd7-56bccef546b3",
    },
  },
};

export default config;
