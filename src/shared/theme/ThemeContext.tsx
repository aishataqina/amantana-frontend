import React, {createContext, useContext, useState, useEffect} from 'react';
import {useColorScheme, Appearance} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

type ThemeType = 'light' | 'dark';

interface ThemeContextType {
  theme: ThemeType;
  isDarkMode: boolean;
  toggleTheme: () => void;
  setTheme: (theme: ThemeType) => void;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: 'light',
  isDarkMode: false,
  toggleTheme: () => {},
  setTheme: () => {},
});

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider: React.FC<{children: React.ReactNode}> = ({
  children,
}) => {
  const colorScheme = useColorScheme();
  const [theme, setThemeState] = useState<ThemeType>('light');

  // Load saved theme preference
  useEffect(() => {
    const loadTheme = async () => {
      try {
        const savedTheme = await AsyncStorage.getItem('theme');
        if (savedTheme) {
          setThemeState(savedTheme as ThemeType);
        } else {
          // Use device default if no saved theme
          setThemeState(colorScheme || 'light');
        }
      } catch (error) {
        console.error('Error loading theme', error);
      }
    };

    loadTheme();

    // Listen for system theme changes
    const subscription = Appearance.addChangeListener(({colorScheme}) => {
      if (!AsyncStorage.getItem('theme')) {
        // Only auto change if user hasn't set a preference
        setThemeState((colorScheme as ThemeType) || 'light');
      }
    });

    return () => {
      subscription.remove();
    };
  }, [colorScheme]);

  const toggleTheme = async () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setThemeState(newTheme);
    try {
      await AsyncStorage.setItem('theme', newTheme);
    } catch (error) {
      console.error('Error saving theme', error);
    }
  };

  const setTheme = async (newTheme: ThemeType) => {
    setThemeState(newTheme);
    try {
      await AsyncStorage.setItem('theme', newTheme);
    } catch (error) {
      console.error('Error saving theme', error);
    }
  };

  return (
    <ThemeContext.Provider
      value={{
        theme,
        isDarkMode: theme === 'dark',
        toggleTheme,
        setTheme,
      }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeContext;
