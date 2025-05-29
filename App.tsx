// App.tsx
import './global.css';
import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {View} from 'react-native';
import HomeScreen from './src/screens/home/Home';
import DetailScreen from './src/screens/plants/Detail';
import FavoritesScreen from './src/screens/favorites/Favorites';
import SearchResult from './src/screens/plants/SearchResult';
import AllPlants from './src/screens/plants/AllPlants';
import WateringReminder from './src/screens/reminders/WateringReminder';
import {RootStackParamList} from './src/shared/types/navigation.types';
import {Heart, Home, Droplets} from 'lucide-react-native';
import {ThemeProvider, useTheme} from './src/shared/theme/ThemeContext';
import ThemedStatusBar from './src/shared/components/ThemedStatusBar';
import {getColors} from './src/shared/theme/colors';

// Define types untuk nested navigation
type TabParamList = {
  HomeTab: undefined;
  Favorites: undefined;
  Reminders: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<TabParamList>();

// Tab Icons
const HomeIcon = ({focused}: {focused: boolean}) => {
  const {isDarkMode} = useTheme();
  const colors = getColors(isDarkMode);

  return (
    <View>
      <Home
        size={20}
        color={focused ? colors.primaryDark : colors.textTertiary}
        fill={focused ? colors.primaryDark : colors.textTertiary}
      />
    </View>
  );
};

const FavoritesIcon = ({focused}: {focused: boolean}) => {
  const {isDarkMode} = useTheme();
  const colors = getColors(isDarkMode);

  return (
    <View>
      <Heart
        size={20}
        color={focused ? colors.primaryDark : colors.textTertiary}
        fill={focused ? colors.primaryDark : colors.textTertiary}
      />
    </View>
  );
};

const RemindersIcon = ({focused}: {focused: boolean}) => {
  const {isDarkMode} = useTheme();
  const colors = getColors(isDarkMode);

  return (
    <View>
      <Droplets
        size={20}
        color={focused ? colors.primaryDark : colors.textTertiary}
        fill={focused ? colors.primaryDark : colors.textTertiary}
      />
    </View>
  );
};

// Tab Navigator
const TabNavigator = () => {
  const {isDarkMode} = useTheme();
  const colors = getColors(isDarkMode);

  const headerStyle = {
    backgroundColor: colors.primary,
    headerTintColor: colors.text,
    headerTitleStyle: {
      fontWeight: 'bold' as const,
    },
    headerTitleAlign: 'center' as const,
    headerShadowVisible: false,
  };

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: colors.primaryDark,
        tabBarInactiveTintColor: colors.textTertiary,
        tabBarStyle: {
          height: 60,
          paddingBottom: 10,
          paddingTop: 5,
          backgroundColor: colors.card,
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
      <Tab.Screen
        name="Reminders"
        component={WateringReminder}
        options={{
          title: 'Pengingat',
          tabBarLabel: 'Pengingat',
          tabBarIcon: RemindersIcon,
        }}
      />
    </Tab.Navigator>
  );
};

// Main App Component
const MainApp = () => {
  const {isDarkMode} = useTheme();
  const colors = getColors(isDarkMode);

  const headerStyle = {
    backgroundColor: colors.primary,
    headerTintColor: colors.text,
    headerTitleStyle: {
      fontWeight: 'bold' as const,
    },
    headerTitleAlign: 'center' as const,
    headerShadowVisible: false,
  };

  return (
    <>
      <ThemedStatusBar />
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
          <Stack.Screen
            name="SearchResult"
            component={SearchResult}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="AllPlants"
            component={AllPlants}
            options={{
              headerShown: false,
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};

const App: React.FC = () => {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <SafeAreaProvider>
        <ThemeProvider>
          <MainApp />
        </ThemeProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
};

export default App;
