# Project Reference - Flow By Spade

## 📋 Project Overview
**Project Name:** Flow By Spade  
**Type:** React Native / Expo Mobile Application  
**Framework:** Expo with TypeScript and Expo Router
**Repository:** flow-by-spade  
**Owner:** User-Spade  
**Branch:** Fresh-Design (clean slate branch)

## 🏗️ Architecture & Tech Stack

### Core Technologies
- **Runtime:** React Native with Expo SDK 54.0.23
- **Language:** TypeScript
- **Routing:** Expo Router v6.0.14 (file-based routing)
- **Development:** Expo CLI
- **Package Manager:** npm
- **UI:** React Native with Safe Area Context

### Key Dependencies
- Expo SDK 54.0.23
- Expo Router 6.0.14 (file-based navigation)
- React 19.1.0
- React Native 0.81.5
- TypeScript 5.9.2
- React Native Safe Area Context
- React Native Screens
- React Native SVG (for vector graphics)
- React Native Web (web compatibility)

## 📁 Project Structure (Fresh & Clean)
```
webs-by-spade-mobile/
├── app/                    # Expo Router pages (file-based routing)
│   ├── _layout.tsx        # Root layout with Stack navigation
│   └── index.tsx          # Home screen (clean welcome screen)
├── assets/                # Static assets (images, fonts, icons)
├── .expo/                 # Expo configuration (auto-generated)
├── node_modules/          # Dependencies
├── App.tsx               # Root component (for non-router setup)
├── app.config.ts         # Expo app configuration
├── package.json          # Dependencies and scripts
├── tsconfig.json         # TypeScript configuration
├── PROJECT_INFO.md       # This reference file
└── HOW_TO_RUN.md         # Development instructions
```

## 🚀 Development Setup

### Prerequisites
- Node.js v24.11.1+ (currently installed)
- npm v11.6.2+ (currently installed)
- Expo Go app on mobile device

### Quick Start Commands
```powershell
# Navigate to project
cd "c:\Dev\Flow By Spade\webs-by-spade-mobile"

# Install dependencies
npm install

# Start development server
npx expo start

# Update Expo if needed
npm update expo
```

### Environment Notes
- **OS:** Windows with PowerShell
- **PowerShell Execution Policy:** Set to RemoteSigned for npm scripts
- **Development Directory:** `c:\Dev\Flow By Spade\webs-by-spade-mobile`

## 🎯 Project Goals & Features

### Project Status: FRESH START ✨
**Completed:**
- ✅ Clean project structure with Expo Router
- ✅ TypeScript setup and configuration
- ✅ iOS & Android compatibility via Expo
- ✅ Basic welcome screen
- ✅ Safe area handling
- ✅ Dark theme baseline

### Ready to Build Features:
- [ ] Custom UI components
- [ ] Navigation structure
- [ ] State management
- [ ] API integrations
- [ ] Custom styling system
- [ ] (Add your features here as you plan them)

### Current Development Focus
- Fresh, clean development environment ready
- Awaiting new feature requirements and design decisions
- All old components and data removed for clean slate

## 🧩 Current Components (Fresh Start)

### app/index.tsx
- **Purpose:** Welcome screen with project information
- **Features:** Clean, minimal design with dark theme
- **Dependencies:** React Native Safe Area Context

### app/_layout.tsx
- **Purpose:** Root layout with Expo Router Stack navigation
- **Features:** Header hidden, dark background, status bar configuration
- **Dependencies:** Expo Router

### Assets Ready For:
- Custom components (components/)
- Services (services/)
- Utilities (utils/)
- Types (types/)
- Constants (constants/)
- Hooks (hooks/)

## 🔧 Development Notes

### Common Issues & Solutions
1. **Node.js not found**: Install Node.js from nodejs.org
2. **PowerShell execution policy**: Run `Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser`
3. **Expo version mismatch**: Run `npm update expo`
4. **Port conflicts**: Stop Node processes with `Get-Process -Name node | Stop-Process -Force`

### Development Workflow
1. Start Expo: `npx expo start`
2. Test on device: Scan QR code with Expo Go
3. Test on web: Press `w` in terminal
4. Reload changes: Press `r` or save files for auto-reload
5. Stop server: `Ctrl+C`

## 📱 Testing & Deployment

### Testing Methods
- **Physical Device:** Expo Go app + QR code scan
- **Web Browser:** Press `w` during development
- **Android Emulator:** Press `a` (requires Android Studio)
- **iOS Simulator:** Press `i` (Mac only, requires Xcode)

### Network Requirements
- Phone and computer must be o  n same Wi-Fi network for device testing
- Expo server runs on: `exp://[IP]:8081`
- Web version available at: `http://localhost:8081`

## 🎨 Design & UI Notes
(Add design system information, color schemes, typography, etc.)

## 🔑 API Keys & Configuration
**Environment Setup:**
- `.env.example` file available for reference
- No API keys currently configured (fresh start)
- (Add API configurations as features are implemented)

**Configuration Files:**
- `app.config.ts` - Expo app configuration
- `tsconfig.json` - TypeScript compiler options
- `package.json` - Scripts and dependencies

## 📝 Development History & Decisions
- **2024-11-14:** Initial setup completed, Node.js installed, Expo version updated to 54.0.23
- **2024-11-14:** PROJECT RESET - Cleaned entire project for fresh start
  - Removed all old components, services, and data
  - Kept essential Expo Router structure
  - Created clean welcome screen
  - Updated to Fresh-Design branch
  - Maintained iOS/Android/Web compatibility
- (Add new decisions as project develops)

## 🐛 Known Issues
(Document any known bugs, limitations, or technical debt)

## 📚 Learning Resources
- [Expo Documentation](https://docs.expo.dev/)
- [React Native Documentation](https://reactnative.dev/)
- [TypeScript Documentation](https://www.typescriptlang.org/)

## 💡 Future Improvements
(List planned features, refactoring goals, performance improvements)

---

**Last Updated:** November 14, 2024  
**Project Status:** Fresh Start - Ready for Development  
**Current Branch:** Fresh-Design  
**Current Version:** Clean Slate (v0.0.0)

---

## 📞 Quick Reference for AI Assistant

### Key File Paths (Fresh Structure)
- **Main app entry:** `app/index.tsx` (welcome screen)
- **Root layout:** `app/_layout.tsx` (Expo Router layout)
- **Legacy root:** `App.tsx` (not used with Expo Router)
- **Assets:** `assets/` (images, fonts, icons)
- **Config:** `app.config.ts`, `tsconfig.json`
- **Documentation:** `PROJECT_INFO.md`, `HOW_TO_RUN.md`

### Ready to Create:
- `components/` - Custom UI components
- `services/` - API and external services
- `types/` - TypeScript type definitions
- `utils/` - Helper functions
- `constants/` - App constants
- `hooks/` - Custom React hooks

### Common Tasks
- Start development: `npx expo start`
- Install package: `npm install [package-name]`
- Update dependencies: `npm update`
- Check for errors: Look for red text in terminal output
- View on phone: Scan QR code with Expo Go
- View in browser: Press `w` in terminal

### Important Notes for AI Assistant
- Always use absolute paths when referencing files
- Project uses TypeScript - check for type safety
- Expo SDK version is 54.0.23 (keep updated)
- PowerShell is the terminal environment
- User prefers step-by-step explanations with clear commands