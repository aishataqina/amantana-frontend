import React from 'react';
import {
  TouchableOpacity,
  Text,
  TouchableOpacityProps,
  ActivityIndicator,
  View,
  StyleSheet,
  ViewStyle,
  TextStyle,
} from 'react-native';
import {useTheme} from '../theme/ThemeContext';
import {getColors} from '../theme/colors';

export type ButtonVariant = 'primary' | 'secondary';
export type ButtonSize = 'small' | 'regular' | 'large';

interface ButtonProps extends TouchableOpacityProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  fullWidth?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  disabled?: boolean;
}

interface ButtonStyles {
  buttonBase: ViewStyle;
  buttonPrimary: ViewStyle;
  buttonSecondary: ViewStyle;
  buttonDisabled: ViewStyle;
  buttonSmall: ViewStyle;
  buttonLarge: ViewStyle;
  buttonFullWidth: ViewStyle;
  buttonPrimaryText: TextStyle;
  buttonSecondaryText: TextStyle;
  buttonDisabledText: TextStyle;
  buttonSmallText: TextStyle;
  buttonLargeText: TextStyle;
  row: ViewStyle;
  buttonIcon: ViewStyle;
  ml2: ViewStyle;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'regular',
  loading = false,
  fullWidth = false,
  leftIcon,
  rightIcon,
  disabled = false,
  style,
  ...props
}) => {
  const {isDarkMode} = useTheme();
  const colors = getColors(isDarkMode);

  const styles = StyleSheet.create<ButtonStyles>({
    buttonBase: {
      paddingVertical: 12,
      paddingHorizontal: 24,
      borderRadius: 12,
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row',
    },
    buttonPrimary: {
      backgroundColor: colors.buttonPrimary,
    },
    buttonSecondary: {
      backgroundColor: colors.buttonSecondary,
      borderWidth: 1,
      borderColor: colors.buttonPrimary,
    },
    buttonDisabled: {
      backgroundColor: colors.buttonDisabled,
      borderWidth: 0,
    },
    buttonSmall: {
      paddingVertical: 8,
      paddingHorizontal: 16,
      borderRadius: 8,
    },
    buttonLarge: {
      paddingVertical: 16,
      paddingHorizontal: 32,
      borderRadius: 16,
    },
    buttonFullWidth: {
      width: '100%',
    },
    buttonPrimaryText: {
      color: colors.buttonPrimaryText,
      fontSize: 16,
      fontWeight: '600',
    },
    buttonSecondaryText: {
      color: colors.buttonSecondaryText,
      fontSize: 16,
      fontWeight: '600',
    },
    buttonDisabledText: {
      color: colors.buttonDisabledText,
      fontSize: 16,
      fontWeight: '600',
    },
    buttonSmallText: {
      fontSize: 14,
    },
    buttonLargeText: {
      fontSize: 18,
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    buttonIcon: {
      marginRight: 8,
    },
    ml2: {
      marginLeft: 8,
    },
  });

  const getButtonStyle = () => {
    const baseStyles: Array<ViewStyle> = [styles.buttonBase];

    if (disabled) {
      baseStyles.push(styles.buttonDisabled);
    } else if (variant === 'primary') {
      baseStyles.push(styles.buttonPrimary);
    } else if (variant === 'secondary') {
      baseStyles.push(styles.buttonSecondary);
    }

    if (size === 'small') {
      baseStyles.push(styles.buttonSmall);
    } else if (size === 'large') {
      baseStyles.push(styles.buttonLarge);
    }

    if (fullWidth) {
      baseStyles.push(styles.buttonFullWidth);
    }

    if (style) {
      baseStyles.push(style as ViewStyle);
    }

    return baseStyles;
  };

  const getTextStyle = () => {
    const textStyles: Array<TextStyle> = [];

    if (disabled) {
      textStyles.push(styles.buttonDisabledText);
    } else if (variant === 'primary') {
      textStyles.push(styles.buttonPrimaryText);
    } else if (variant === 'secondary') {
      textStyles.push(styles.buttonSecondaryText);
    }

    if (size === 'small') {
      textStyles.push(styles.buttonSmallText);
    } else if (size === 'large') {
      textStyles.push(styles.buttonLargeText);
    }

    return textStyles;
  };

  return (
    <TouchableOpacity
      {...props}
      disabled={disabled || loading}
      style={getButtonStyle()}>
      {loading ? (
        <ActivityIndicator
          color={
            variant === 'primary'
              ? colors.buttonPrimaryText
              : colors.buttonSecondaryText
          }
          size={size === 'small' ? 'small' : 'small'}
        />
      ) : (
        <View style={styles.row}>
          {leftIcon && <View style={styles.buttonIcon}>{leftIcon}</View>}
          <Text style={getTextStyle()}>{children}</Text>
          {rightIcon && (
            <View style={[styles.buttonIcon, styles.ml2]}>{rightIcon}</View>
          )}
        </View>
      )}
    </TouchableOpacity>
  );
};
