import React from 'react';
import {TouchableOpacity} from 'react-native';
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
      className="w-10 h-10 rounded-full items-center justify-center"
      style={[
        {
          backgroundColor: isDarkMode ? colors.border : colors.borderLight,
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

export default ThemeToggle;
