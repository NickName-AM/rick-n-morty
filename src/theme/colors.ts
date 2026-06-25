// src/theme/colors.ts
// Single source of color truth for all eight phases.
// All UI components import from here — never hardcode hex values elsewhere.

export const colors = {
  // Backgrounds
  background: '#0D1117',     // Root dark background (app background)
  surface: '#161B22',        // Card surfaces, slightly lighter
  card: '#1F2937',           // Elevated card layer (character cards)

  // Text
  textPrimary: '#F9FAFB',    // Primary text (names, headings)
  textSecondary: '#9CA3AF',  // Secondary text (species, subtitle)

  // Accent
  accent: '#10B981',         // Primary accent (alive badge, highlights)

  // Status badges
  statusAlive: '#10B981',    // Green — Alive
  statusDead: '#EF4444',     // Red — Dead
  statusUnknown: '#6B7280',  // Gray — unknown

  // UI
  border: '#374151',         // Card borders, dividers
  tabBar: '#161B22',         // Bottom tab bar background
  tabBarActive: '#10B981',   // Active tab icon/label
  tabBarInactive: '#6B7280', // Inactive tab icon/label
  inputBackground: '#1F2937',// Search bar, input fields
  placeholder: '#374151',    // Image placeholder, skeleton base
} as const;

export type Colors = typeof colors;
