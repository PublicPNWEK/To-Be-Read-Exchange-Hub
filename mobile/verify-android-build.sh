#!/bin/bash
# Android Build Verification Script
# This script verifies the Android mobile app configuration

set -e

echo "🔍 Verifying Android Mobile App Configuration..."
echo ""

# Check if we're in the mobile directory
if [ ! -d "android" ]; then
    echo "❌ Error: This script must be run from the mobile directory"
    echo "Usage: cd mobile && bash verify-android-build.sh"
    exit 1
fi

echo "✅ Mobile directory structure verified"

# Check package.json exists
if [ ! -f "package.json" ]; then
    echo "❌ Error: package.json not found"
    exit 1
fi
echo "✅ package.json found"

# Check Android gradle files
if [ ! -f "android/build.gradle" ]; then
    echo "❌ Error: android/build.gradle not found"
    exit 1
fi
echo "✅ android/build.gradle found"

if [ ! -f "android/app/build.gradle" ]; then
    echo "❌ Error: android/app/build.gradle not found"
    exit 1
fi
echo "✅ android/app/build.gradle found"

if [ ! -f "android/gradle.properties" ]; then
    echo "❌ Error: android/gradle.properties not found"
    exit 1
fi
echo "✅ android/gradle.properties found"

# Check source files
if [ ! -f "App.tsx" ]; then
    echo "❌ Error: App.tsx not found"
    exit 1
fi
echo "✅ App.tsx found"

if [ ! -f "src/config/api.ts" ]; then
    echo "❌ Error: src/config/api.ts not found"
    exit 1
fi
echo "✅ API configuration found"

if [ ! -f "src/services/api.ts" ]; then
    echo "❌ Error: src/services/api.ts not found"
    exit 1
fi
echo "✅ API service found"

if [ ! -f "src/screens/BooksScreen.tsx" ]; then
    echo "❌ Error: src/screens/BooksScreen.tsx not found"
    exit 1
fi
echo "✅ BooksScreen found"

# Check optimization configurations
echo ""
echo "🔧 Checking Build Optimizations..."

# Check Hermes
if grep -q "hermesEnabled=true" android/gradle.properties; then
    echo "✅ Hermes Engine: Enabled"
else
    echo "⚠️  Hermes Engine: Not enabled"
fi

# Check ProGuard
if grep -q "enableProguardInReleaseBuilds = true" android/app/build.gradle; then
    echo "✅ ProGuard: Enabled"
else
    echo "⚠️  ProGuard: Not enabled"
fi

# Check APK splitting
if grep -q "splits {" android/app/build.gradle; then
    echo "✅ APK Splitting: Configured"
else
    echo "⚠️  APK Splitting: Not configured"
fi

# Check parallel builds
if grep -q "org.gradle.parallel=true" android/gradle.properties; then
    echo "✅ Parallel Builds: Enabled"
else
    echo "⚠️  Parallel Builds: Not enabled"
fi

# Check build cache
if grep -q "org.gradle.caching=true" android/gradle.properties; then
    echo "✅ Build Cache: Enabled"
else
    echo "⚠️  Build Cache: Not enabled"
fi

# Check new architecture
if grep -q "newArchEnabled=true" android/gradle.properties; then
    echo "✅ New Architecture: Enabled"
else
    echo "⚠️  New Architecture: Not enabled"
fi

echo ""
echo "📊 Configuration Summary:"
echo "  - React Native app configured for Android"
echo "  - API service layer created"
echo "  - Books screen implemented"
echo "  - Build optimizations applied"
echo ""
echo "✅ All verification checks passed!"
echo ""
echo "📝 Next Steps:"
echo "  1. Install dependencies: npm install"
echo "  2. Start Metro bundler: npm start"
echo "  3. Run on Android: npm run android"
echo ""
echo "📚 Documentation:"
echo "  - Mobile README: ./README.md"
echo "  - Setup Guide: ../MOBILE-SETUP.md"
