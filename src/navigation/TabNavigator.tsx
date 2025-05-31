import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/home/Home';
import FavoritesScreen from '../screens/favorites/Favorites';
import WateringReminder from '../screens/reminders/WateringReminder';
import AddPlant from '../screens/plants/AddPlantScreen';
import {useTheme} from '../shared/theme/ThemeContext';
import {HomeIcon, FavoritesIcon} from '../shared/components/icons/TabIcons';
import {createNavigationConfig} from './navigationConfig';
import ThemeToggle from '../shared/components/ThemeToggle';
import {BellRing, FilePlus2} from 'lucide-react-native';

type TabParamList = {
  HomeTab: undefined;
  Favorites: undefined;
  Reminders: undefined;
  AddPlant: undefined;
};

const Tab = createBottomTabNavigator<TabParamList>();

export const TabNavigator = () => {
  const {isDarkMode} = useTheme();
  const {headerStyle, tabBarStyle, tabBarConfig} =
    createNavigationConfig(isDarkMode);

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: tabBarConfig.activeTintColor,
        tabBarInactiveTintColor: tabBarConfig.inactiveTintColor,
        tabBarStyle: tabBarStyle,
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
          title: 'Amantana',
          tabBarLabel: 'Home',
          tabBarIcon: ({color, size}) => <HomeIcon color={color} size={size} />,
          headerRight: () => (
            <ThemeToggle style={{marginRight: 16, marginBottom: 6}} />
          ),
        }}
      />
      <Tab.Screen
        name="Favorites"
        component={FavoritesScreen}
        options={{
          title: 'Favorit',
          tabBarLabel: 'Favorit',
          tabBarIcon: ({color, size}) => (
            <FavoritesIcon color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="AddPlant"
        component={AddPlant}
        options={{
          title: 'Tambah Tanaman',
          tabBarLabel: 'Tambah',
          tabBarIcon: ({color, size}) => (
            <FilePlus2 color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Reminders"
        component={WateringReminder}
        options={{
          title: 'Pengingat',
          tabBarLabel: 'Pengingat',
          tabBarIcon: ({color, size}) => <BellRing color={color} size={size} />,
        }}
      />
    </Tab.Navigator>
  );
};
