# 📱 Book Exchange Hub - Mobile App

Android mobile application for the Book Exchange Hub inventory management system.

## 🚀 Features

- 📚 View book inventory in real-time
- 🔄 Pull-to-refresh functionality
- 📍 Display shelf locations and availability
- ⚡ Optimized build configuration for production
- 🎨 Clean, modern UI
- 🔌 RESTful API integration

## 📋 Prerequisites

- **Node.js**: >= 20.x
- **Java**: JDK 17+
- **Android Studio**: Latest version
- **Android SDK**: API 24+ minimum, API 36 target
- **Backend**: Main API server running

## 🛠️ Installation

```bash
cd mobile
npm install
cp .env.example .env
```

Edit `.env` for your environment:
- Emulator: `http://10.0.2.2:3000/api`
- Device: `http://YOUR_IP:3000/api`

## 🏃 Running

```bash
npm start          # Start Metro
npm run android    # Build and run
```

## 🏗️ Build Optimizations

- ✅ Hermes Engine enabled
- ✅ ProGuard minification
- ✅ Resource shrinking
- ✅ APK splitting per architecture
- ✅ Gradle parallelization
- ✅ Build caching
- ✅ New Architecture enabled

## 📦 Production Builds

```bash
cd android
./gradlew assembleRelease    # APKs
./gradlew bundleRelease       # AAB for Play Store
```

## 📂 Structure

```
mobile/
├── android/           # Native Android
├── src/
│   ├── config/       # API config
│   ├── services/     # API service
│   ├── screens/      # UI screens
│   └── components/   # Reusable components
└── App.tsx           # Root component
```

## 🐛 Troubleshooting

```bash
# Clear Metro cache
npx react-native start --reset-cache

# Clean build
cd android && ./gradlew clean
```

## 📄 License

ISC License

---

Made with ❤️ for book lovers
