import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';

// Define the param list untuk Stack Navigator
export type RootStackParamList = {
  Home: undefined;
  Detail: { plantId: string };
};

// Define the param list untuk Tab Navigator
export type TabParamList = {
  HomeTab: undefined;
  Favorites: undefined;
};

// Navigation props untuk Stack Navigator
export type HomeScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Home'
>;

export type DetailScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Detail'
>;

// Navigation props untuk Tab Navigator
export type HomeTabNavigationProp = BottomTabNavigationProp<
  TabParamList,
  'HomeTab'
>;

export type FavoritesTabNavigationProp = BottomTabNavigationProp<
  TabParamList,
  'Favorites'
>;

// Route props untuk screens
export type DetailScreenRouteProp = RouteProp<RootStackParamList, 'Detail'>;

// Combined props untuk screens
export interface HomeScreenProps {
  navigation: HomeTabNavigationProp;
}

export interface DetailScreenProps {
  navigation: DetailScreenNavigationProp;
  route: DetailScreenRouteProp;
}

export interface FavoritesScreenProps {
  navigation: FavoritesTabNavigationProp;
}
