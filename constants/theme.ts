// Theme constants for Webs by Spade app
export const COLORS = {
  bg: '#222222',
  card: '#2C2C2C', 
  text: '#FFFFFF',
  muted: '#B3B3B3',
  accentPrimary: '#F18805', // amber
  accentSecondary: '#0081A7', // aqua
  mint: '#84DCC6',
} as const;

// Belt levels for the welcome screen
export const BELT_LEVELS = ['White', 'Blue', 'Purple', 'Brown', 'Black'] as const;

export type BeltLevel = typeof BELT_LEVELS[number];