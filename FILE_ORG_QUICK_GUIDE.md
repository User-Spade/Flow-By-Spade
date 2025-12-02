# Quick File Organization Guide

## 🎯 Where Does My File Go?

### I'm creating a...

| What I'm Making | Where It Goes | Example |
|----------------|---------------|---------|
| **New screen/page** | `/app/` | `app/settings.tsx` |
| **Reusable button/card** | `/components/` | `components/TechniqueCard.tsx` |
| **API or database code** | `/services/` | `services/apiClient.ts` |
| **Global state (Context)** | `/contexts/` | `contexts/ThemeContext.tsx` |
| **BJJ data JSON** | `/data/` | `data/techniques.json` |
| **One-time script** | `/scripts/` | `scripts/update-data.js` |
| **Color/spacing values** | `/constants/` | `constants/theme.ts` |
| **Custom React hook** | `/hooks/` | `hooks/usePosition.ts` |
| **Helper function** | `/utils/` | `utils/formatDate.ts` |
| **TypeScript types** | `/types/` or `/data/types/` | `types/app.types.ts` |

## 🚫 Common Mistakes to Avoid

❌ **DON'T put components in `/app/`** → Only screens that are routes  
❌ **DON'T put business logic in components** → Extract to `/services/`  
❌ **DON'T leave backup files in root** → Auto-managed in `/data/`  
❌ **DON'T create random directories** → Use existing structure  
❌ **DON'T commit `.backup.*` files** → Already in `.gitignore`

## 📝 Naming Quick Reference

| Type | Convention | Example |
|------|-----------|---------|
| React Components | `PascalCase.tsx` | `TechniqueCard.tsx` |
| Screens in `/app/` | `kebab-case.tsx` | `study-flow.tsx` |
| Services | `camelCase.ts` | `databaseService.ts` |
| Contexts | `PascalCaseContext.tsx` | `BeltContext.tsx` |
| Hooks | `useCamelCase.ts` | `useBeltLevel.ts` |
| Scripts | `kebab-case.js` | `update-content.js` |
| JSON Data | `kebab-case.json` | `bjj-database.json` |

## 🔧 Essential Commands

```bash
# Run cleanup tool (removes old backups, checks violations)
npm run cleanup

# Before committing (auto-runs cleanup)
npm run precommit

# Validate data structure
npm run validate:data

# Update belt content (cumulative now!)
npm run curate:belts
```

## 🤖 For AI Assistants

**Before creating ANY file:**
1. ✅ Check `FILE_ORGANIZATION_RULES.md` for correct location
2. ✅ Use proper naming convention
3. ✅ Never create orphan files in root
4. ✅ Create backups when modifying data files

**Backup Policy:**
- Format: `filename.backup.YYYY-MM-DDTHH-mm-ss-SSSZ.json`
- Keep max 3 per file
- Cleanup script handles removal
- Git automatically ignores them

**Red Flags:**
- Files in root that shouldn't be there
- Components in `/app/` that aren't screens
- More than 3 backups of same file
- Business logic in UI components

## 📚 Full Documentation

For complete rules, see:
- **[FILE_ORGANIZATION_RULES.md](./FILE_ORGANIZATION_RULES.md)** - Detailed rules & guidelines
- **[PROJECT_INFO.md](./PROJECT_INFO.md)** - Project structure & technical info

---

**Last Updated**: December 1, 2025  
**Status**: Active enforcement via AI assistants
