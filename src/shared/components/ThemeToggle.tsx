import React from 'react';
import {TouchableOpacity, StyleSheet} from 'react-native';
import {useTheme} from '../theme/ThemeContext';
import {Sun, Moon} from 'lucide-react-native';
import {getColors} from '../theme/colors';

interface ThemeToggleProps {
  size?: number;
  style?: any;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({size = 24, style}) => {
  const {isDarkMode, toggleTheme} = useTheme();
  const colors = getColors(isDarkMode);

  return (
    <TouchableOpacity
      style={[
        styles.container,
        {
          backgroundColor: isDarkMode ? colors.card : colors.borderLight,
        },
        style,
      ]}
      onPress={toggleTheme}
      activeOpacity={0.7}>
      {isDarkMode ? (
        <Moon size={size} color={colors.primary} />
      ) : (
        <Sun size={size} color={colors.primary} />
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default ThemeToggle;
