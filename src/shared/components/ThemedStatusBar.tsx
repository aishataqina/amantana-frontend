import React from 'react';
import {StatusBar} from 'react-native';
import {useTheme} from '../theme/ThemeContext';

const ThemedStatusBar: React.FC = () => {
  const {isDarkMode} = useTheme();

  return (
    <StatusBar
      barStyle={isDarkMode ? 'light-content' : 'dark-content'}
      backgroundColor="transparent"
      translucent
    />
  );
};

export default ThemedStatusBar;
