import {StyleSheet} from 'react-native';
import {ThemeColors} from '../colors';

export const createCommonStyles = (colors: ThemeColors, isDarkMode: boolean) =>
  StyleSheet.create({
    // Container styles
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    contentContainer: {
      padding: 16,
    },

    // Card styles
    card: {
      backgroundColor: colors.card,
      borderRadius: 12,
      padding: 16,
      marginBottom: 12,
    },
    cardShadow: {
      shadowColor: isDarkMode ? '#000' : '#2D6A4F',
      shadowOffset: {width: 0, height: 2},
      shadowOpacity: isDarkMode ? 0.25 : 0.15,
      shadowRadius: 3.84,
      elevation: 5,
    },

    // Typography
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      color: colors.text,
      marginBottom: 8,
    },
    subtitle: {
      fontSize: 16,
      color: colors.textSecondary,
      marginBottom: 4,
    },
    text: {
      fontSize: 14,
      color: colors.text,
    },
    textSecondary: {
      fontSize: 14,
      color: colors.textSecondary,
    },

    // Badge/Category styles
    badge: {
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: 20,
      backgroundColor: isDarkMode ? 'rgba(10, 131, 100, 0.2)' : '#D8F3DC',
    },
    badgeText: {
      color: isDarkMode ? colors.primary : '#2D6A4F',
      fontSize: 12,
      fontWeight: '600',
    },

    // Header styles
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 16,
      paddingVertical: 12,
      backgroundColor: colors.card,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },

    // Button styles
    buttonBase: {
      paddingVertical: 12,
      paddingHorizontal: 24,
      borderRadius: 12,
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row',
    },
    // Primary Button
    buttonPrimary: {
      backgroundColor: colors.buttonPrimary,
    },
    buttonPrimaryText: {
      color: colors.buttonPrimaryText,
      fontSize: 16,
      fontWeight: '600',
    },
    // Secondary Button
    buttonSecondary: {
      backgroundColor: colors.buttonSecondary,
      borderWidth: 1,
      borderColor: colors.buttonPrimary,
    },
    buttonSecondaryText: {
      color: colors.buttonSecondaryText,
      fontSize: 16,
      fontWeight: '600',
    },
    // Disabled Button
    buttonDisabled: {
      backgroundColor: colors.buttonDisabled,
      borderWidth: 0,
    },
    buttonDisabledText: {
      color: colors.buttonDisabledText,
      fontSize: 16,
      fontWeight: '600',
    },
    // Small Button
    buttonSmall: {
      paddingVertical: 8,
      paddingHorizontal: 16,
      borderRadius: 8,
    },
    buttonSmallText: {
      fontSize: 14,
    },
    // Large Button
    buttonLarge: {
      paddingVertical: 16,
      paddingHorizontal: 32,
      borderRadius: 16,
    },
    buttonLargeText: {
      fontSize: 18,
    },
    // Icon Button
    buttonIcon: {
      marginRight: 8,
    },
    // Full Width Button
    buttonFullWidth: {
      width: '100%',
    },

    // List styles
    listContainer: {
      paddingHorizontal: 16,
    },
    listSeparator: {
      height: 1,
      backgroundColor: colors.border,
      marginVertical: 8,
    },

    // Input styles
    input: {
      backgroundColor: colors.card,
      borderRadius: 12,
      paddingHorizontal: 16,
      paddingVertical: 12,
      color: colors.text,
      borderWidth: 1,
      borderColor: colors.border,
    },
    inputFocused: {
      borderColor: colors.primary,
    },

    // Loading state
    loadingContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    
    // Empty state
    emptyContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 24,
    },
    emptyText: {
      color: colors.textSecondary,
      textAlign: 'center',
      marginTop: 12,
    },
  });