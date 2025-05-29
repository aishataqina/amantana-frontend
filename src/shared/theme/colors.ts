export const colors = {
  light: {
    primary: '#2D6A4F',
    primaryDark: '#1B4332',
    primaryLight: '#40916C',
    background: '#F8FAF9',
    card: '#FFFFFF',
    text: '#1B2437', 
    textSecondary: '#4B5563',
    textTertiary: '#6B7280',
    border: '#E2E8F0',
    borderLight: '#F1F5F3',
    success: '#10B981',
    warning: '#F59E0B',
    danger: '#EF4444',
    shadow: 'rgba(0, 0, 0, 0.1)',
    overlay: 'rgba(0, 0, 0, 0.5)',
    // Button colors
    buttonPrimary: '#2D6A4F',
    buttonPrimaryText: '#FFFFFF',
    buttonSecondary: '#F1F5F3',
    buttonSecondaryText: '#2D6A4F',
    buttonDisabled: '#E2E8F0',
    buttonDisabledText: '#9CA3AF',
  },
  dark: {
    primary: '#40916C',      // Mengubah ke warna yang lebih soft
    primaryDark: '#2D6A4F',
    primaryLight: '#52B788',
    background: '#0F172A',
    card: '#1E293B',
    text: '#F8FAFC',
    textSecondary: '#CBD5E1',
    textTertiary: '#94A3B8',
    border: '#334155',
    borderLight: '#475569',
    success: '#10B981',
    warning: '#F59E0B',
    danger: '#EF4444',
    shadow: 'rgba(0, 0, 0, 0.3)',
    overlay: 'rgba(0, 0, 0, 0.7)',
    // Button colors
    buttonPrimary: '#40916C',
    buttonPrimaryText: '#FFFFFF',
    buttonSecondary: '#1E293B',
    buttonSecondaryText: '#40916C',
    buttonDisabled: '#334155',
    buttonDisabledText: '#64748B',
  },
};

export type ThemeColors = typeof colors.light;

export const getColors = (isDark: boolean): ThemeColors => {
  return isDark ? colors.dark : colors.light;
};
