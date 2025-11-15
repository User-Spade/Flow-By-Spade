# Project Reference - Webs by Spade Mobile

## 📋 Project Overview
**Project Name:** Webs by Spade  
**Type:** React Native / Expo Mobile Application  
**Framework:** Expo with TypeScript  
**Repository:** webs-by-spade-mobile  
**Owner:** User-Spade  

## 🏗️ Architecture & Tech Stack

### Core Technologies
- **Runtime:** React Native with Expo SDK 54.0.23
- **Language:** TypeScript
- **Development:** Expo CLI
- **Package Manager:** npm

### Key Dependencies
- Expo SDK 54.0.23
- React Native
- TypeScript
- (Add other key dependencies as you discover them)

## 📁 Project Structure
```
webs-by-spade-mobile/
├── app/                    # Main app screens/pages
│   ├── _layout.tsx        # App layout component
│   └── index.tsx          # Main entry screen
├── src/
│   ├── components/        # Reusable UI components
│   │   ├── AIPanel.tsx    # AI-related panel component
│   │   ├── IconComponents.tsx # Icon components
│   │   └── WebGraph.tsx   # Web graph visualization
│   ├── constants/         # App constants
│   │   └── index.ts
│   ├── services/          # External services
│   │   └── geminiService.ts # Google Gemini AI service
│   └── types/             # TypeScript type definitions
│       └── index.ts
├── assets/                # Static assets (images, fonts, etc.)
├── App.tsx               # Root app component
├── app.config.ts         # Expo app configuration
├── package.json          # Dependencies and scripts
└── tsconfig.json         # TypeScript configuration
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

### Core Features (Add/Update as needed)
- [ ] AI Panel Integration (AIPanel.tsx)
- [ ] Web Graph Visualization (WebGraph.tsx)
- [ ] Google Gemini AI Service Integration
- [ ] Icon System (IconComponents.tsx)
- [ ] (Add other features as they're implemented)

### Current Development Focus
- Setting up fresh development environment
- (Update this section as priorities change)

## 🧩 Key Components

### AIPanel.tsx
- Purpose: (Add description of what this component does)
- Dependencies: (List key dependencies)

### WebGraph.tsx  
- Purpose: (Add description of web graph functionality)
- Dependencies: (List key dependencies)

### geminiService.ts
- Purpose: Integration with Google Gemini AI API
- Dependencies: (List API requirements)

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
- Phone and computer must be on same Wi-Fi network for device testing
- Expo server runs on: `exp://[IP]:8081`
- Web version available at: `http://localhost:8081`

## 🎨 Design & UI Notes
(Add design system information, color schemes, typography, etc.)

## 🔑 API Keys & Configuration
(Document any API keys, environment variables, or configuration needed)
- Google Gemini API: (Add setup notes)

## 📝 Development History & Decisions
- **2024-11-14:** Initial setup completed, Node.js installed, Expo version updated to 54.0.23
- (Add other significant decisions or changes)

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
**Project Status:** Active Development  
**Current Version:** Development (no releases yet)

---

## 📞 Quick Reference for AI Assistant

### Key File Paths
- Main app entry: `app/index.tsx`
- Root component: `App.tsx`
- AI service: `src/services/geminiService.ts`
- Components: `src/components/`
- Types: `src/types/index.ts`

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