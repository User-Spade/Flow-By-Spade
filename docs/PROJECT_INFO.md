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

## 📁 Project Structure

> **📋 For detailed file organization rules, see [FILE_ORGANIZATION_RULES.md](./FILE_ORGANIZATION_RULES.md)**

```
Flow-By-Spade/
├── app/                          # Expo Router screens (file-based routing)
│   ├── _layout.tsx              # Root layout with navigation
│   ├── index.tsx                # Home/entry screen
│   ├── home.tsx                 # Main home screen
│   ├── library.tsx              # BJJ library/catalog
│   ├── profile.tsx              # User profile
│   ├── study-flow.tsx           # Study mode
│   └── free-flow.tsx            # Free practice mode
│
├── components/                   # Reusable UI components (to be created)
│
├── contexts/                     # React Context providers
│   └── BeltContext.tsx          # Belt level state management
│
├── services/                     # Business logic & data access
│   └── databaseService.ts       # BJJ database queries
│
├── data/                         # Static data & JSON files
│   ├── bjj-database.json        # Main BJJ position/technique data
│   ├── foundation-mapping.json  # Foundation categorization
│   ├── position-copy.json       # Curated position descriptions
│   └── types/                   # Data-specific TypeScript types
│       └── database.types.ts    # BJJ data structure types
│
├── scripts/                      # Data manipulation & utility scripts
│   ├── update-position-copy.js  # Merge curated content
│   ├── rebuild-belt-content.js  # Generate cumulative belt content
│   ├── generate-descriptions.js # AI description generator
│   ├── validate-database.js     # Data validation tool
│   └── [40+ data update scripts]
│
├── constants/                    # App-wide constants
│   └── theme.ts                 # Theme colors & styling
│
├── assets/                       # Images, fonts, icons
│
├── .gitignore                   # Git exclusions (backups ignored)
├── app.config.ts                # Expo configuration
├── package.json                 # Dependencies & npm scripts
├── tsconfig.json                # TypeScript configuration
├── PROJECT_INFO.md              # This file (project reference)
└── FILE_ORGANIZATION_RULES.md   # File structure guidelines (AI enforced)
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

### ⚠️ MANDATORY: Follow File Organization Rules
**Before any file operation, consult**: `FILE_ORGANIZATION_RULES.md`

This document defines:
- Where every file type belongs
- Naming conventions for all files
- Backup file policies
- Cleanup and maintenance rules
- AI assistant enforcement checklist

### Key File Paths
- **Screens:** `app/*.tsx` (route-based screens only)
- **Components:** `components/*.tsx` (reusable UI - to be expanded)
- **Services:** `services/*.ts` (business logic & data access)
- **Data:** `data/*.json` (database & static data)
- **Scripts:** `scripts/*.js` (data manipulation tools)
- **Contexts:** `contexts/*Context.tsx` (global state)
- **Constants:** `constants/*.ts` (theme, config values)
- **Types:** `data/types/*.ts` (TypeScript definitions)
- **Config:** `app.config.ts`, `tsconfig.json`
- **Documentation:** `PROJECT_INFO.md`, `FILE_ORGANIZATION_RULES.md`

### File Creation Rules (AI Must Follow)
1. **Check `FILE_ORGANIZATION_RULES.md`** for correct directory
2. **Follow naming conventions** (PascalCase for components, kebab-case for screens, etc.)
3. **Never create files in root** unless explicitly allowed
4. **Create timestamped backups** before modifying data files
5. **Keep max 3 backups** per file (auto-cleanup old ones)
6. **Verify `.gitignore`** excludes backup files

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