import { ExpoConfig, ConfigContext } from 'expo/config';

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: 'Flow By Spade',
  slug: 'Flow-By-Spade',
  extra: {
    // For development: set EXPO_PUBLIC_GEMINI_API_KEY in .env
    // For production: implement a backend API (see geminiService.ts)
    geminiApiKey: process.env.EXPO_PUBLIC_GEMINI_API_KEY,
  },
});
