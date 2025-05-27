// App.tsx
import './global.css';
import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import HomeScreen from './src/screens/Home';
import DetailScreen from './src/screens/Detail';

const Stack = createNativeStackNavigator();

const App: React.FC = () => {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <SafeAreaProvider>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="Home"
              component={HomeScreen}
              options={{
                title: 'Beranda',
                headerStyle: {
                  backgroundColor: '#77DD77',
                },
                headerTintColor: '#000000',
                headerTitleStyle: {
                  fontWeight: 'bold',
                },
                headerTitleAlign: 'center',
                headerShadowVisible: false,
              }}
            />
            <Stack.Screen
              name="Detail"
              component={DetailScreen as any}
              options={{
                title: 'Detail',
                headerStyle: {
                  backgroundColor: '#77DD77',
                },
                headerTintColor: '#000000',
                headerTitleStyle: {
                  fontWeight: 'bold',
                },
                headerTitleAlign: 'center',
                headerShadowVisible: false,
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
};

export default App;
