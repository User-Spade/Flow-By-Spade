# Flow By Spade

A comprehensive Brazilian Jiu-Jitsu learning app built with React Native and Expo.

## 📱 About

Flow By Spade helps BJJ practitioners learn and progress through structured, belt-specific content. The app features:

- **Library Mode**: Explore positions, techniques, and transitions by belt level
- **Study Flow**: Structured learning paths
- **Free Flow**: Open practice mode
- **Profile**: Track your belt progression

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start the development server
npm start

# Or use specific platforms
npm run ios       # iOS simulator (Mac only)
npm run android   # Android emulator
npm run web       # Web browser
```

Then scan the QR code with Expo Go (iOS/Android) or press `w` for web.

## 📁 Project Organization

This project follows strict file organization rules for maintainability. 

**Quick Reference:**
- 📖 **[FILE_ORG_QUICK_GUIDE.md](./FILE_ORG_QUICK_GUIDE.md)** - Quick lookup table
- 📋 **[FILE_ORGANIZATION_RULES.md](./FILE_ORGANIZATION_RULES.md)** - Complete guidelines
- 📚 **[PROJECT_INFO.md](./PROJECT_INFO.md)** - Technical reference

### Key Directories

```
├── app/            # Screens (Expo Router file-based routing)
├── components/     # Reusable UI components
├── contexts/       # React Context providers
├── services/       # Business logic & data access
├── data/           # JSON data & types
├── scripts/        # Data manipulation utilities
├── constants/      # App-wide constants (theme, etc.)
└── assets/         # Images, fonts, icons
```

## 🛠️ Useful Commands

```bash
# Project maintenance
npm run cleanup            # Clean old backups & check organization
npm run precommit          # Run before git commit

# Data management
npm run validate:data      # Validate BJJ database structure
npm run curate:belts       # Rebuild cumulative belt content
npm run update:copy        # Merge curated position descriptions

# Development
npm start                  # Start Expo dev server
```

## 🧹 File Management

The project includes automatic file organization enforcement:

1. **Backup Management**: Data file backups are automatically managed (max 3 kept)
2. **Organization Rules**: AI assistants follow `FILE_ORGANIZATION_RULES.md`
3. **Cleanup Tool**: Run `npm run cleanup` to maintain organization

**For AI Assistants**: Always consult `FILE_ORGANIZATION_RULES.md` before creating files.

## 📊 Data Structure

BJJ content is organized in:
- `data/bjj-database.json` - Positions, techniques, transitions
- `data/foundation-mapping.json` - Positional categories
- `data/position-copy.json` - Curated descriptions

Belt content is now **cumulative**: each belt includes all previous belt content plus new material.

## 🎨 Tech Stack

- **Framework**: React Native with Expo SDK 54
- **Language**: TypeScript
- **Routing**: Expo Router (file-based)
- **State**: React Context
- **Styling**: React Native StyleSheet

## 📖 Documentation

- **Quick File Guide**: [FILE_ORG_QUICK_GUIDE.md](./FILE_ORG_QUICK_GUIDE.md)
- **Organization Rules**: [FILE_ORGANIZATION_RULES.md](./FILE_ORGANIZATION_RULES.md)
- **Project Info**: [PROJECT_INFO.md](./PROJECT_INFO.md)

## 🤝 Contributing

When contributing:
1. Follow file organization rules in `FILE_ORGANIZATION_RULES.md`
2. Run `npm run cleanup` before committing
3. Ensure TypeScript types are properly defined
4. Test on multiple platforms when possible

## 📝 License

[Add your license here]

---

**Repository**: Flow-By-Spade  
**Branch**: DataBase-V1.1  
**Last Updated**: December 1, 2025
