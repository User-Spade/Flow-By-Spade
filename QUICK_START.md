# Quick Start Guide - Webs by Spade Mobile

## ✅ What's Ready

Your React Native Expo app is fully set up and running! The Expo development server is currently active at:
- **Local**: exp://192.168.1.202:8081
- **QR Code**: Displayed in your terminal

## 🚀 How to Test Right Now

### Option 1: Use Your Phone (Easiest)
1. Install **Expo Go** app:
   - iOS: App Store → Search "Expo Go"
   - Android: Play Store → Search "Expo Go"

2. Open Expo Go and scan the QR code shown in your terminal

3. Your app will load on your phone!

### Option 2: Use Emulator/Simulator
In the terminal where Expo is running, press:
- **`a`** = Open in Android emulator (if installed)
- **`i`** = Open in iOS simulator (macOS only, if installed)
- **`w`** = Open in web browser

### Option 3: Stop and Restart Later
```powershell
# Stop the current server (in the terminal)
Ctrl+C

# Start again later
cd "c:\Code\WEBS BY SPADE\webs-by-spade-mobile"
npm.cmd start
```

## 📱 App Features

1. **Web View**: Browse BJJ techniques by position groups
2. **Library View**: List of all techniques
3. **AI Assistant**: Tap any technique to open the AI panel
   - Get move suggestions
   - Analyze technique sequences
   - Build training paths

## ⚙️ Optional: Enable AI Features

The app works without AI, but to enable Gemini AI suggestions:

1. Get a Gemini API key: https://makersuite.google.com/app/apikey

2. Create a `.env` file:
   ```powershell
   cd "c:\Code\WEBS BY SPADE\webs-by-spade-mobile"
   cp .env.example .env
   notepad .env
   ```

3. Add your key:
   ```
   EXPO_PUBLIC_GEMINI_API_KEY=your_actual_key_here
   ```

4. Restart Expo:
   ```powershell
   npm.cmd start
   ```

## 🏪 Publishing to App Stores

### Install EAS CLI
```powershell
npm.cmd install -g eas-cli
```

### Configure and Build
```powershell
cd "c:\Code\WEBS BY SPADE\webs-by-spade-mobile"

# Login to Expo account (create one if needed)
eas login

# Configure EAS for your project
eas build:configure

# Build for iOS
eas build --platform ios

# Build for Android
eas build --platform android
```

### Submit to Stores
```powershell
# Submit to Apple App Store
eas submit --platform ios

# Submit to Google Play Store
eas submit --platform android
```

## 📝 Before Submitting to Stores

1. **Update Bundle Identifiers** in `app.json`:
   - Change `com.yourcompany.websbyspade` to your own
   - iOS: `expo.ios.bundleIdentifier`
   - Android: `expo.android.package`

2. **Replace App Icons** in `assets/` folder:
   - `icon.png` (1024×1024)
   - `adaptive-icon.png` (1024×1024)
   - `splash-icon.png`

3. **Implement Backend API** for production:
   - Move Gemini API calls to your own server
   - Never ship API keys in the mobile app
   - See `src/services/geminiService.ts` for security notes

## 🆚 Web App vs Mobile App

Both apps are now available:

**Web App** (`Webs-By-Spade/`):
- Run: `npm.cmd run dev`
- URL: http://localhost:3000
- Best for: Desktop testing, web deployment

**Mobile App** (`webs-by-spade-mobile/`):
- Run: `npm.cmd start`
- Best for: iOS/Android stores, native mobile experience

## 🐛 Troubleshooting

**Package version warnings?**
They're just warnings. The app works fine. To fix:
```powershell
npx expo install --fix
```

**"Cannot find module" errors?**
```powershell
npm install
npx expo start --clear
```

**App crashes on device?**
- Check the terminal for Metro bundler errors
- Shake the device → Enable Remote Debugging

**Need help?**
- Expo Docs: https://docs.expo.dev
- React Native Docs: https://reactnative.dev

## 🎯 Next Steps

1. **Test on your phone** using Expo Go
2. **Customize the app** (colors, icons, data)
3. **Add more techniques** in `src/constants/index.ts`
4. **Build a backend API** for production AI features
5. **Create your Expo account** at https://expo.dev
6. **Build and submit** to app stores using EAS

---

**Your app is live and ready to test!** 🎉

Just scan the QR code in your terminal with Expo Go to see it on your phone.
