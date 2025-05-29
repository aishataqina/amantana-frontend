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
    button: {
      paddingVertical: 12,
      paddingHorizontal: 24,
      borderRadius: 12,
      backgroundColor: colors.primary,
      alignItems: 'center',
      justifyContent: 'center',
    },
    buttonText: {
      color: 'white',
      fontSize: 16,
      fontWeight: '600',
    },
    buttonOutline: {
      paddingVertical: 12,
      paddingHorizontal: 24,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: colors.primary,
      backgroundColor: 'transparent',
      alignItems: 'center',
      justifyContent: 'center',
    },
    buttonOutlineText: {
      color: colors.primary,
      fontSize: 16,
      fontWeight: '600',
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
