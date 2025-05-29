export * from './common';
export * from './spacing';
export * from './typography';

// Hook untuk menggunakan styles
import {useTheme} from '../ThemeContext';
import {getColors} from '../colors';
import {createCommonStyles} from './common';
import {createTypographyStyles} from './typography';

export const useStyles = () => {
  const {isDarkMode} = useTheme();
  const colors = getColors(isDarkMode);

  return {
    colors,
    isDarkMode,
    common: createCommonStyles(colors, isDarkMode),
    typography: createTypographyStyles(colors),
  };
}; 