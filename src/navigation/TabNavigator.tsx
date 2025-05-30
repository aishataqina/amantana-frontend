import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/home/Home';
import FavoritesScreen from '../screens/favorites/Favorites';
import WateringReminder from '../screens/reminders/WateringReminder';
import {useTheme} from '../shared/theme/ThemeContext';
import {
  HomeIcon,
  FavoritesIcon,
  RemindersIcon,
} from '../shared/components/icons/TabIcons';
import {createNavigationConfig} from './navigationConfig';

type TabParamList = {
  HomeTab: undefined;
  Favorites: undefined;
  Reminders: undefined;
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
        }}
      />
      <Tab.Screen
        name="Favorites"
        component={FavoritesScreen}
        options={{
          title: 'Favorit',
          tabBarLabel: 'Favorit',
          tabBarIcon: ({color, size}) => <FavoritesIcon color={color} size={size} />,
        }}
      />
      <Tab.Screen
        name="Reminders"
        component={WateringReminder}
        options={{
          title: 'Pengingat',
          tabBarLabel: 'Pengingat',
          tabBarIcon: ({color, size}) => <RemindersIcon color={color} size={size} />,
        }}
      />
    </Tab.Navigator>
  );
};
