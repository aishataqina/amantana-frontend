export const colors = {
  light: {
    primary: '#77DD77',
    primaryDark: '#2D6A4F',
    primaryLight: '#A7F3A7',
    background: '#F9FAFB',
    card: '#FFFFFF',
    text: '#111827',
    textSecondary: '#6B7280',
    textTertiary: '#9CA3AF',
    border: '#E5E7EB',
    borderLight: '#F3F4F6',
    success: '#10B981',
    warning: '#F59E0B',
    danger: '#EF4444',
    shadow: 'rgba(0, 0, 0, 0.1)',
    overlay: 'rgba(0, 0, 0, 0.5)',
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
  },
};

export type ThemeColors = typeof colors.light;

export const getColors = (isDark: boolean): ThemeColors => {
  return isDark ? colors.dark : colors.light;
}; 