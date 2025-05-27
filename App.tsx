// App.tsx
import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import HomeScreen from './src/screens/Home';
import DetailScreen from './src/screens/Detail';

const Stack = createNativeStackNavigator();

const App: React.FC = () => {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{
              title: 'Beranda',
              headerStyle: {
                backgroundColor: '#FFC0CB',
              },
              headerTintColor: '#000000',
              headerTitleStyle: {
                fontWeight: 'bold',
              },
              headerShadowVisible: false,
            }}
          />
          <Stack.Screen
            name="Detail"
            component={DetailScreen}
            options={{
              title: 'Detail',
              headerStyle: {
                backgroundColor: '#FFC0CB',
              },
              headerTintColor: '#000000',
              headerTitleStyle: {
                fontWeight: 'bold',
              },
              headerShadowVisible: false,
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default App;
