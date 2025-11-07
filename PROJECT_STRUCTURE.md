# Project Structure & Organization

## 📁 Main Folder: `webs-by-spade-mobile/`

This is your **ONE codebase** that runs on:
- ✅ iOS (App Store)
- ✅ Android (Google Play)
- ✅ Web (browsers)

---

## 🗂️ File Organization

### 📱 App Code (`app/`)
Main screens and navigation using Expo Router:
```
app/
├── _layout.tsx          # Root layout with navigation setup
└── index.tsx            # Main home screen (Web/Library views)
```

### 🧩 Components (`src/components/`)
Reusable React Native components:
```
src/components/
├── AIPanel.tsx          # AI assistant panel (suggestions & analysis)
├── WebGraph.tsx         # Technique visualization (mobile-friendly list)
└── IconComponents.tsx   # SVG icons (Map, Book, Brain, X, Plus, Trash)
```

### 📊 Data & Logic (`src/`)
```
src/
├── constants/
│   └── index.ts         # BJJ techniques data & connections
├── services/
│   └── geminiService.ts # AI integration (Gemini API)
└── types/
    └── index.ts         # TypeScript type definitions
```

### ⚙️ Configuration Files
```
app.json                 # Expo app configuration
app.config.ts            # Dynamic configuration (API keys)
package.json             # Dependencies and scripts
tsconfig.json            # TypeScript settings
.gitignore              # Files to exclude from git
```

### 📝 Documentation
```
README.md               # Full project documentation
HOW_TO_RUN.md          # Quick start guide (verified steps)
QUICK_START.md         # Testing & deployment guide
.env.example           # Example environment variables
```

### 🖼️ Assets (`assets/`)
App icons, splash screens, and images:
```
assets/
├── icon.png            # App icon (1024x1024)
├── adaptive-icon.png   # Android adaptive icon
├── splash-icon.png     # Splash screen image
└── favicon.png         # Web favicon
```

### 🔧 Build & Cache (Auto-Generated)
```
.expo/                  # Expo build cache (don't edit)
node_modules/           # Dependencies (don't edit)
.git/                   # Git version control
```

---

## 🌐 Web vs Mobile: Why One Project Works

### React Native Web Magic
Your mobile app runs on web because of `react-native-web`:
- React Native components → Web DOM elements
- StyleSheet → CSS
- Platform-specific code when needed

### Same Features Everywhere
| Feature | Mobile (iOS/Android) | Web Browser |
|---------|---------------------|-------------|
| Technique browsing | ✅ | ✅ |
| AI suggestions | ✅ | ✅ |
| Path building | ✅ | ✅ |
| Live reload | ✅ | ✅ |

---

## 🗑️ Cleaned Up Files

### Removed (Unnecessary)
- ❌ `App.tsx` - Old template file (using `app/index.tsx` instead)
- ❌ `index.ts` - Old entry point (Expo Router uses `app/` directory)

### About the Old Web Project
The original `Webs-By-Spade/` folder (Vite version) is **no longer needed** because:
- ✅ Mobile app includes all the same features
- ✅ Mobile app runs on web via `react-native-web`
- ✅ Single codebase = easier maintenance

**You can safely delete or archive** the old `Webs-By-Spade/` folder.

---

## 🚀 Running Your App

### On Mobile (iOS/Android)
```powershell
cd "c:\Code\WEBS BY SPADE\webs-by-spade-mobile"
npx.cmd expo start
# Scan QR code with Expo Go app
```

### On Web Browser
```powershell
cd "c:\Code\WEBS BY SPADE\webs-by-spade-mobile"
npx.cmd expo start
# Press 'w' to open in browser
```

**Same command, different platforms!** 🎉

---

## 📦 Key Dependencies

### Core Framework
- `expo` - Development platform
- `expo-router` - File-based routing
- `react-native` - Cross-platform framework
- `react-native-web` - Web support

### UI & Graphics
- `react-native-svg` - Vector graphics (icons, graphs)
- `react-native-safe-area-context` - Safe areas on mobile
- `react-native-screens` - Native screen components
- `@react-native-picker/picker` - Belt rank selector

### AI Integration
- `@google/genai` - Gemini AI API client

---

## 🎨 Adding New Features

### Add a new technique
Edit: `src/constants/index.ts`
```typescript
export const TECHNIQUES: Technique[] = [
  { id: '18', name: 'New Move', description: '...', ... },
  // ...
];
```

### Add a new screen
Create: `app/new-screen.tsx`
```typescript
export default function NewScreen() {
  return <View><Text>New Screen</Text></View>;
}
```
Automatically accessible at `/new-screen`!

### Modify styles
All `StyleSheet.create({...})` objects in components

### Add new icons
Edit: `src/components/IconComponents.tsx`

---

## 🔐 Environment Variables

For development with AI features:
```bash
# Create .env file
EXPO_PUBLIC_GEMINI_API_KEY=your_key_here
```

⚠️ **Production**: Move API calls to a backend server (see `src/services/geminiService.ts` for security notes)

---

## 📱 Publishing to Stores

### iOS App Store
```powershell
eas build --platform ios
eas submit --platform ios
```

### Google Play Store
```powershell
eas build --platform android
eas submit --platform android
```

### Web Deployment
Build for web hosting:
```powershell
npx expo export --platform web
```
Deploy the `dist/` folder to any static hosting (Vercel, Netlify, etc.)

---

## ✅ Clean & Organized!

Your project is now:
- 🗂️ Well-organized with clear structure
- 🧹 Free of unnecessary files
- 📱 Ready for mobile (iOS/Android)
- 🌐 Ready for web
- 📦 Single codebase for everything!
