# Webs by Spade - Mobile (React Native + Expo)

A Brazilian Jiu-Jitsu (BJJ) technique visualization and AI-powered training assistant mobile app built with React Native and Expo.

## 🚀 Features

- **Technique Web View**: Browse BJJ techniques organized by position groups
- **Technique Library**: Comprehensive list of techniques with categories
- **AI Assistant**: Get personalized move suggestions and path analysis powered by Google Gemini
- **Current Path Tracking**: Build and analyze sequences of techniques
- **Cross-Platform**: Runs on iOS, Android, and Web

## 📱 Installation & Setup

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Expo CLI (`npm install -g expo-cli`)
- For iOS: macOS with Xcode
- For Android: Android Studio and Android SDK
- Or use Expo Go app on your phone for quick testing

### 1. Install Dependencies

```powershell
cd "c:\Code\WEBS BY SPADE\webs-by-spade-mobile"
npm install
```

### 2. Configure API Key (Optional for AI Features)

⚠️ **IMPORTANT SECURITY NOTE**: For production apps, **NEVER** include API keys in the client bundle.

For development/demo:
1. Create a `.env` file in the project root:
   ```
   EXPO_PUBLIC_GEMINI_API_KEY=your_api_key_here
   ```

For production:
- Implement a backend API (Node.js, Python, etc.)
- Store API keys securely on the server
- Have your mobile app call your backend, not Gemini directly
- See `src/services/geminiService.ts` for detailed security notes

### 3. Run the App

**Development Server**:
```powershell
npm start
```

This will start the Expo development server. You can then:
- Press `a` to open in Android emulator
- Press `i` to open in iOS simulator (macOS only)
- Press `w` to open in web browser
- Scan the QR code with Expo Go app on your phone

**Platform-Specific Commands**:
```powershell
# Android
npm run android

# iOS (macOS only)
npm run ios

# Web
npm run web
```

## 📦 Building for App Stores

### Using Expo Application Services (EAS)

1. **Install EAS CLI**:
   ```powershell
   npm install -g eas-cli
   ```

2. **Login to Expo**:
   ```powershell
   eas login
   ```

3. **Configure EAS**:
   ```powershell
   eas build:configure
   ```

4. **Build for iOS**:
   ```powershell
   eas build --platform ios
   ```

5. **Build for Android**:
   ```powershell
   eas build --platform android
   ```

6. **Submit to Stores**:
   ```powershell
   eas submit --platform ios
   eas submit --platform android
   ```

### Local Builds (Advanced)

For iOS:
```powershell
npx expo run:ios --configuration Release
```

For Android:
```powershell
npx expo run:android --variant release
```

## 🏗️ Project Structure

```
webs-by-spade-mobile/
├── app/                    # Expo Router screens
│   ├── _layout.tsx         # Root layout
│   └── index.tsx           # Main screen
├── src/
│   ├── components/         # React Native components
│   │   ├── AIPanel.tsx
│   │   ├── WebGraph.tsx
│   │   └── IconComponents.tsx
│   ├── constants/          # App constants and data
│   │   └── index.ts
│   ├── services/           # API services
│   │   └── geminiService.ts
│   └── types/              # TypeScript types
│       └── index.ts
├── assets/                 # Images, fonts, etc.
├── app.json               # Expo configuration
├── app.config.ts          # Dynamic configuration
├── package.json
└── tsconfig.json
```

## 🔧 Key Technologies

- **React Native**: Cross-platform mobile framework
- **Expo**: Development platform and toolchain
- **Expo Router**: File-based routing
- **TypeScript**: Type-safe JavaScript
- **React Native SVG**: Vector graphics
- **Google Gemini AI**: AI-powered suggestions

## 🎨 Customization

### Bundle Identifiers

Before submitting to stores, update in `app.json`:
- iOS: `expo.ios.bundleIdentifier`
- Android: `expo.android.package`

Change from `com.yourcompany.websbyspade` to your own.

### App Name & Icons

- Update `expo.name` in `app.json`
- Replace icons in `assets/` folder:
  - `icon.png` (1024x1024)
  - `adaptive-icon.png` (Android, 1024x1024)
  - `splash-icon.png` (Splash screen)

## 📝 Migration Notes from Web App

This React Native app was migrated from the Vite/React web app:

### ✅ What Was Kept
- Business logic and state management
- TypeScript types and interfaces
- Constants and data (techniques, connections)
- AI service logic (with security improvements)

### 🔄 What Was Changed
- Web components → React Native components
- DOM/CSS → React Native StyleSheet
- Web graph visualization → Simplified mobile-friendly list view
- Navigation → Expo Router
- Icons → React Native SVG components

### ⚠️ Security Improvements
- Added warnings about API key storage
- Recommended backend API for production
- Environment-based configuration

## 🐛 Troubleshooting

**"Cannot find module" errors**:
```powershell
npm install
npx expo start --clear
```

**iOS build issues**:
- Make sure Xcode is installed and up to date
- Run `pod install` in the `ios/` folder (if using bare workflow)

**Android build issues**:
- Ensure Android SDK and tools are installed
- Check `ANDROID_HOME` environment variable

**Expo Go compatibility**:
- Some native modules require custom dev client
- Use `eas build` or `npx expo run:android/ios` for full features

## 📚 Learn More

- [Expo Documentation](https://docs.expo.dev/)
- [React Native Documentation](https://reactnative.dev/)
- [Expo Router Documentation](https://docs.expo.dev/router/introduction/)
- [EAS Build & Submit](https://docs.expo.dev/build/introduction/)

## 📄 License

ISC
