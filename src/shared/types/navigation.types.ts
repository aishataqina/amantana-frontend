import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';

// Define the param list untuk Stack Navigator
export type RootStackParamList = {
  Home: undefined;
  Detail: { plantId: string };
  SearchResult: { searchQuery: string };
  AllPlants: undefined;
  Reminders: undefined;
};

// Define the param list untuk Tab Navigator
export type TabParamList = {
  HomeTab: undefined;
  Favorites: undefined;
  Reminders: undefined;
};

// Navigation props untuk Stack Navigator
export type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;
export type DetailScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Detail'>;
export type SearchResultScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'SearchResult'>;
export type AllPlantsScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'AllPlants'>;
export type RemindersScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Reminders'>;

// Navigation props untuk Tab Navigator
export type HomeTabNavigationProp = BottomTabNavigationProp<TabParamList, 'HomeTab'>;
export type FavoritesTabNavigationProp = BottomTabNavigationProp<TabParamList, 'Favorites'>;

// Route props untuk screens
export type DetailScreenRouteProp = RouteProp<RootStackParamList, 'Detail'>;
export type SearchResultScreenRouteProp = RouteProp<RootStackParamList, 'SearchResult'>;

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

export interface SearchResultScreenProps {
  navigation: SearchResultScreenNavigationProp;
  route: SearchResultScreenRouteProp;
}
