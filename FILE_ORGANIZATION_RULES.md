# File Organization Rules - Flow By Spade

## 🎯 Core Principles

1. **Separation of Concerns**: Each directory has ONE clear purpose
2. **No Orphan Files**: Every file belongs in a logical directory
3. **Predictable Locations**: Anyone should know where to find or add files
4. **Version Control**: Never commit generated/backup files to git
5. **Clean Root**: Minimize files in project root

---

## 📁 Directory Structure & Rules

### `/app/` - Application Screens (Expo Router)
**Purpose**: File-based routing screens ONLY  
**Rules**:
- ✅ Screen components that map to routes (e.g., `home.tsx`, `profile.tsx`)
- ✅ `_layout.tsx` for navigation structure
- ✅ Route-specific files only
- ❌ Reusable components (use `/components/` instead)
- ❌ Business logic (use `/services/` or `/utils/`)
- ❌ Type definitions (use `/types/` or `/data/types/`)

**Naming Convention**: `kebab-case.tsx` (e.g., `study-flow.tsx`)

---

### `/components/` - Reusable UI Components
**Purpose**: Shared, reusable React components  
**Rules**:
- ✅ UI components used in multiple screens
- ✅ One component per file (preferred) or grouped by feature
- ✅ Component-specific styles inline or co-located
- ❌ Screen-level components (those go in `/app/`)
- ❌ Business logic (extract to `/services/` or hooks)

**Structure Options**:
```
/components/
  Button.tsx              # Simple flat structure
  Card.tsx
  /forms/                 # Or grouped by feature
    InputField.tsx
    FormButton.tsx
  /layout/
    Header.tsx
    Footer.tsx
```

**Naming Convention**: `PascalCase.tsx` for component files

---

### `/contexts/` - React Context Providers
**Purpose**: Global state management via React Context  
**Rules**:
- ✅ Context definitions and providers
- ✅ One context per file
- ✅ Export both Context and Provider
- ❌ Component logic unrelated to state
- ❌ API calls (use `/services/`)

**Naming Convention**: `PascalCaseContext.tsx` (e.g., `BeltContext.tsx`)

---

### `/services/` - Business Logic & External Interactions
**Purpose**: API calls, database access, external service wrappers  
**Rules**:
- ✅ Database service wrappers
- ✅ API client code
- ✅ Third-party service integrations
- ✅ Complex business logic extraction
- ❌ UI components
- ❌ React hooks (use `/hooks/`)

**Naming Convention**: `camelCaseService.ts` (e.g., `databaseService.ts`)

---

### `/data/` - Static Data & Configuration
**Purpose**: JSON data, static configurations, database files  
**Rules**:
- ✅ JSON data files (e.g., `bjj-database.json`)
- ✅ Static configuration objects
- ✅ `/data/types/` for data-specific TypeScript types
- ❌ Component code
- ❌ Service logic
- ⚠️ **BACKUP FILES**: Must follow naming pattern and be git-ignored

**Backup Policy**:
- Format: `filename.backup.YYYY-MM-DDTHH-mm-ss-SSSZ.json`
- Keep max 3 most recent backups
- Delete older backups automatically
- Never commit to git (add to `.gitignore`)

**Structure**:
```
/data/
  bjj-database.json                    # Primary data
  foundation-mapping.json              # Config data
  position-copy.json                   # Curated content
  /types/
    database.types.ts                  # Data types
  [Backups are git-ignored]
```

---

### `/scripts/` - Data Transformation & Utilities
**Purpose**: Node.js scripts for data manipulation, one-off tasks  
**Rules**:
- ✅ Database manipulation scripts
- ✅ Content generation tools
- ✅ Migration scripts
- ✅ Development utilities
- ❌ Application runtime code
- ❌ Code used in the app (use `/utils/` or `/services/`)

**Organization**:
```
/scripts/
  /migrations/           # Database migrations (when needed)
    001-add-objectives.js
  /generators/           # Content generators
    generate-descriptions.js
  /utils/                # Script utilities
    backup-helper.js
  
  # OR flat structure with clear prefixes:
  update-position-copy.js
  generate-descriptions.js
  validate-database.js
  rebuild-belt-content.js
```

**Naming Convention**: `kebab-case.js` with action prefix
- `update-*.js` - Updates existing data
- `generate-*.js` - Creates new content
- `validate-*.js` - Validation tools
- `add-*.js` - Adds new entries
- `fix-*.js` - Fixes issues

**Cleanup Rule**: Archive or delete scripts that are no longer used

---

### `/constants/` - Application Constants
**Purpose**: App-wide constant values  
**Rules**:
- ✅ Theme definitions (colors, spacing)
- ✅ Configuration constants
- ✅ Enum-like values
- ❌ Functions or logic
- ❌ Components

**Naming Convention**: `camelCase.ts` (e.g., `theme.ts`, `apiEndpoints.ts`)

---

### `/assets/` - Static Media Files
**Purpose**: Images, fonts, icons, static media  
**Rules**:
- ✅ Images (.png, .jpg, .svg)
- ✅ Fonts (.ttf, .otf)
- ✅ Icons
- ❌ Code files
- ❌ JSON data (use `/data/`)

**Structure**:
```
/assets/
  /images/
    logo.png
    background.jpg
  /icons/
    app-icon.png
  /fonts/
    CustomFont.ttf
```

---

### `/hooks/` - Custom React Hooks (Recommended to Create)
**Purpose**: Reusable React hooks  
**Rules**:
- ✅ Custom hooks following `use*` naming
- ✅ Extracted stateful logic
- ❌ Components
- ❌ Non-hook utilities (use `/utils/`)

**Naming Convention**: `useCamelCase.ts` (e.g., `useBeltLevel.ts`)

---

### `/utils/` or `/lib/` - Pure Utility Functions (Recommended to Create)
**Purpose**: Pure helper functions, formatters, validators  
**Rules**:
- ✅ Pure functions (no side effects)
- ✅ Formatters, parsers, validators
- ✅ Math/calculation helpers
- ❌ React components or hooks
- ❌ API calls (use `/services/`)

**Naming Convention**: `camelCase.ts` (e.g., `formatDate.ts`, `validators.ts`)

---

### `/types/` - Global TypeScript Types (Optional)
**Purpose**: Shared TypeScript type definitions  
**Rules**:
- ✅ Shared interfaces and types
- ✅ Global type definitions
- ❌ Component-specific types (keep co-located)
- ❌ Data-specific types (use `/data/types/`)

**Note**: Small projects can skip this; use inline types or `/data/types/`

---

## 🚫 Root Directory - Keep Minimal

**Allowed Root Files**:
- `package.json`, `package-lock.json` - Dependencies
- `tsconfig.json` - TypeScript config
- `app.json`, `app.config.ts` - Expo config
- `.gitignore` - Git exclusions
- `App.tsx`, `index.ts` - Expo entry points
- `README.md` - Project overview
- `PROJECT_INFO.md` - Detailed project reference
- `FILE_ORGANIZATION_RULES.md` - This file
- `.env`, `.env.example` - Environment variables

**Prohibited in Root**:
- ❌ Backup files (must be in `/data/` and git-ignored)
- ❌ Test/temp files (create `/tmp/` and git-ignore it)
- ❌ Component files
- ❌ Utility scripts (use `/scripts/`)
- ❌ Random JSON files (categorize them)

---

## 🧹 Cleanup & Maintenance Rules

### Automatic Cleanup (AI Should Enforce)
1. **Before any commit**: Check for backup files in root and move to `/data/`
2. **Weekly**: Review `/scripts/` for unused files and archive
3. **Monthly**: Check for orphaned backups (keep max 3 recent)
4. **On data updates**: Create timestamped backup before modification

### Git Ignore Strategy
Update `.gitignore` to include:
```gitignore
# Data backups
/data/*.backup.*.json
/tmp/
tmp_*.json

# OS files
.DS_Store
Thumbs.db

# IDE
.vscode/
.idea/

# Expo
.expo/
dist/

# Dependencies
node_modules/

# Environment
.env
.env.local
```

---

## 📋 File Naming Conventions Summary

| Type | Convention | Example |
|------|------------|---------|
| React Components | PascalCase | `Button.tsx`, `UserCard.tsx` |
| Screens (app/) | kebab-case | `study-flow.tsx`, `home.tsx` |
| Services | camelCase + Service | `databaseService.ts` |
| Contexts | PascalCase + Context | `BeltContext.tsx` |
| Hooks | use + PascalCase | `useBeltLevel.ts` |
| Utils | camelCase | `formatDate.ts` |
| Constants | camelCase | `theme.ts`, `colors.ts` |
| Scripts | kebab-case + prefix | `update-content.js` |
| Types | PascalCase or camelCase | `database.types.ts` |
| JSON Data | kebab-case | `bjj-database.json` |

---

## 🤖 AI Assistant Instructions

### When Creating New Files
1. **Determine file type** from user request
2. **Check this guide** for correct directory
3. **Follow naming convention** for that type
4. **Never create orphan files** in root or wrong directories
5. **Ask for clarification** if unsure where file belongs

### When Modifying Data
1. **Always create backup** with timestamp format
2. **Move old backups** to proper location if found
3. **Limit to 3 recent backups** per file
4. **Never commit backups** to git

### When Adding Scripts
1. **Use descriptive action prefix** (`update-`, `generate-`, `fix-`)
2. **Check if similar script exists** to avoid duplication
3. **Add to package.json scripts** if commonly used
4. **Document script purpose** at top of file

### When Refactoring
1. **Extract reusable components** to `/components/`
2. **Move business logic** to `/services/`
3. **Create hooks** for reusable stateful logic
4. **Consolidate utilities** in `/utils/`

### Red Flags to Catch
- ❌ Backup files in project root
- ❌ Components in `/app/` that aren't screens
- ❌ Business logic in components
- ❌ API calls in components (should be in services)
- ❌ More than 3 backups of same file
- ❌ Scripts in root directory
- ❌ Hardcoded values that should be constants

---

## 🎓 Decision Matrix: Where Does This File Go?

**Is it a screen with a route?** → `/app/`  
**Is it a reusable UI component?** → `/components/`  
**Is it global state management?** → `/contexts/`  
**Does it interact with external services/data?** → `/services/`  
**Is it static JSON or config data?** → `/data/`  
**Is it a data manipulation script?** → `/scripts/`  
**Is it a constant value?** → `/constants/`  
**Is it an image/font/icon?** → `/assets/`  
**Is it a custom React hook?** → `/hooks/`  
**Is it a pure utility function?** → `/utils/`  
**Is it a TypeScript type?** → `/types/` or `/data/types/`

**Still unsure?** Ask the user for clarification!

---

## ✅ Compliance Checklist

Use this before commits:

- [ ] No orphan files in root directory
- [ ] All components in correct directories
- [ ] Backup files timestamped and git-ignored
- [ ] Scripts have descriptive names with action prefixes
- [ ] No business logic in UI components
- [ ] Constants extracted from components
- [ ] TypeScript types organized properly
- [ ] File naming conventions followed
- [ ] Max 3 backups per data file
- [ ] `.gitignore` updated for new patterns

---

**Last Updated**: December 1, 2025  
**Enforced By**: All AI assistants working on this project  
**Review Schedule**: Monthly or when structure feels messy
