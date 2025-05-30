import {StyleSheet} from 'react-native';
import { ThemeColors } from '../colors';

export const createTypographyStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    h1: {
      fontSize: 32,
      fontWeight: 'bold',
      color: colors.text,
      // marginBottom: 16,
    },
    h2: {
      fontSize: 24,
      fontWeight: 'bold',
      color: colors.text,
      // marginBottom: 12,
    },
    h3: {
      fontSize: 20,
      fontWeight: '600',
      color: colors.text,
      // marginBottom: 8,
    },
    h4: {
      fontSize: 18,
      fontWeight: '500',
      color: colors.text,
      // marginBottom: 8,
    },
    body1: {
      fontSize: 16,
      color: colors.text,
      lineHeight: 24,
    },
    body2: {
      fontSize: 14,
      color: colors.text,
      lineHeight: 20,
    },
    caption: {
      fontSize: 12,
      color: colors.textSecondary,
      lineHeight: 16,
    },
    button: {
      fontSize: 16,
      fontWeight: '600',
      textTransform: 'none',
    },
  });
