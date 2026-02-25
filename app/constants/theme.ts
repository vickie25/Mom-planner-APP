export const theme = {
  colors: {
    background: '#FAFAF8',
    surface: '#FFFFFF',
    surfaceDark: '#1F1C19',
    primary: '#1F1C19',
    secondary: '#6E665E',
    accent: '#E0A96D',
    accentSoft: '#F5E7D3',
    accentRose: '#E9C5B9',
    border: '#E6E1D9',
    borderDark: '#D7D0C6',
    highlight: '#F7F0E5',
    error: '#C2413B',
    success: '#3C7A5A',
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
  },
  radius: {
    card: 16,
    button: 24,
    input: 12,
    chip: 20,
  },
  typography: {
    hero: {
      fontSize: 34,
      lineHeight: 42,
      fontFamily: 'Sora-Bold',
      letterSpacing: -0.3,
    },
    h1: {
      fontSize: 28,
      lineHeight: 36,
      fontFamily: 'Sora-Bold',
      letterSpacing: -0.2,
    },
    h2: {
      fontSize: 22,
      lineHeight: 28,
      fontFamily: 'Sora-SemiBold',
      letterSpacing: -0.1,
    },
    h3: {
      fontSize: 18,
      lineHeight: 24,
      fontFamily: 'Sora-SemiBold',
      letterSpacing: -0.05,
    },
    body: {
      fontSize: 16,
      lineHeight: 24,
      fontFamily: 'Sora-Regular',
      letterSpacing: 0,
    },
    bodySmall: {
      fontSize: 14,
      lineHeight: 20,
      fontFamily: 'Sora-Regular',
      letterSpacing: 0,
    },
    caption: {
      fontSize: 12,
      lineHeight: 16,
      fontFamily: 'Sora-Regular',
      letterSpacing: 0,
    },
  },
  shadow: {
    sm: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.05,
      shadowRadius: 2,
      elevation: 1,
    },
    md: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.08,
      shadowRadius: 4,
      elevation: 2,
    },
  },
};

export type Theme = typeof theme;
