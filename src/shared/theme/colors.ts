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
    buttonSecondary: '#FFFFFF',
    buttonDisabled: '#E2E8F0',
    buttonPrimaryText: '#FFFFFF',
    buttonSecondaryText: '#2D6A4F',
    buttonDisabledText: '#6B7280',
  },
  dark: {
    primary: '#4ADE80',
    primaryDark: '#10B981',
    primaryLight: '#86EFAC',
    background: '#111827',
    card: '#1F2937',
    text: '#F9FAFB',
    textSecondary: '#D1D5DB',
    textTertiary: '#9CA3AF',
    border: '#374151',
    borderLight: '#374151',
    success: '#10B981',
    warning: '#F59E0B',
    danger: '#EF4444',
    shadow: 'rgba(0, 0, 0, 0.3)',
    overlay: 'rgba(0, 0, 0, 0.7)',
    // Button colors
    buttonPrimary: '#4ADE80',
    buttonSecondary: '#1F2937',
    buttonDisabled: '#374151',
    buttonPrimaryText: '#111827',
    buttonSecondaryText: '#4ADE80',
    buttonDisabledText: '#6B7280',
  },
};

export type ThemeColors = typeof colors.light;

export const getColors = (isDark: boolean): ThemeColors => {
  return isDark ? colors.dark : colors.light;
};
