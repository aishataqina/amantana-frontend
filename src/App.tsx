import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {ThemeProvider} from './shared/theme/ThemeContext';
import {AppNavigator} from './navigation/AppNavigator';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <NavigationContainer>
          <AppNavigator />
        </NavigationContainer>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
