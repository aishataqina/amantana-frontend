// App.tsx
import './global.css';
import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {Text, View} from 'react-native';
import HomeScreen from './src/screens/Home';
import DetailScreen from './src/screens/Detail';
import FavoritesScreen from './src/screens/Favorites';
import {RootStackParamList} from './src/shared/types/navigation.types';

// Header style
const headerStyle = {
  backgroundColor: '#77DD77',
  headerTintColor: '#000000',
  headerTitleStyle: {
    fontWeight: 'bold' as const,
  },
  headerTitleAlign: 'center' as const,
  headerShadowVisible: false,
};

// Tab Icons
const HomeIcon = ({focused}: {focused: boolean}) => (
  <View className={`p-1 rounded-full ${focused ? 'bg-[#D8F3DC]' : ''}`}>
    <Text style={{fontSize: 20}}>🏡</Text>
  </View>
);

const FavoritesIcon = ({focused}: {focused: boolean}) => (
  <View className={`p-1 rounded-full ${focused ? 'bg-[#D8F3DC]' : ''}`}>
    <Text style={{fontSize: 20}}>❤️</Text>
  </View>
);

// Define types untuk nested navigation
type TabParamList = {
  HomeTab: undefined;
  Favorites: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<TabParamList>();

// Tab Navigator
const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#2D6A4F',
        tabBarInactiveTintColor: '#757575',
        tabBarStyle: {
          height: 60,
          paddingBottom: 10,
          paddingTop: 5,
        },
        headerStyle: {
          backgroundColor: headerStyle.backgroundColor,
        },
        headerTintColor: headerStyle.headerTintColor,
        headerTitleStyle: headerStyle.headerTitleStyle,
        headerTitleAlign: headerStyle.headerTitleAlign,
        headerShadowVisible: headerStyle.headerShadowVisible,
      }}>
      <Tab.Screen
        name="HomeTab"
        component={HomeScreen}
        options={{
          title: 'Beranda',
          tabBarLabel: 'Beranda',
          tabBarIcon: HomeIcon,
        }}
      />
      <Tab.Screen
        name="Favorites"
        component={FavoritesScreen}
        options={{
          title: 'Favorit',
          tabBarLabel: 'Favorit',
          tabBarIcon: FavoritesIcon,
        }}
      />
    </Tab.Navigator>
  );
};

const App: React.FC = () => {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <SafeAreaProvider>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
            }}>
            <Stack.Screen name="Home" component={TabNavigator} />
            <Stack.Screen
              name="Detail"
              component={DetailScreen}
              options={{
                title: 'Detail Tanaman',
                headerShown: true,
                headerStyle: {
                  backgroundColor: headerStyle.backgroundColor,
                },
                headerTintColor: headerStyle.headerTintColor,
                headerTitleStyle: headerStyle.headerTitleStyle,
                headerTitleAlign: headerStyle.headerTitleAlign,
                headerShadowVisible: headerStyle.headerShadowVisible,
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
};

export default App;
