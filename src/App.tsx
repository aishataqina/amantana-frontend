import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {ThemeProvider} from './shared/theme/ThemeContext';
import {AppNavigator} from './navigation/AppNavigator';

const App = () => {
  return (
    <ThemeProvider>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </ThemeProvider>
  );
};

export default App;
