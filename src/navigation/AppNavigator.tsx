import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {RootStackParamList} from '../shared/types/navigation.types';
import {useTheme} from '../shared/theme/ThemeContext';
import {createNavigationConfig} from './navigationConfig';
import {TabNavigator} from './TabNavigator';
import DetailScreen from '../screens/plants/Detail';
import SearchResult from '../screens/plants/SearchResult';
import AllPlants from '../screens/plants/AllPlants';
import ThemedStatusBar from '../shared/components/ThemedStatusBar';
import AddPlant from '@/screens/plants/AddPlantScreen';
import {TouchableOpacity} from 'react-native';
import {ArrowLeft} from 'lucide-react-native';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const AppNavigator = () => {
  const {isDarkMode} = useTheme();
  const {headerStyle} = createNavigationConfig(isDarkMode);

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
            options={({navigation}) => ({
              title: 'Detail Tanaman',
              headerShown: true,
              headerStyle: {
                backgroundColor: headerStyle.backgroundColor,
              },
              headerTintColor: headerStyle.headerTintColor,
              headerTitleStyle: {
                ...headerStyle.headerTitleStyle,
                textAlign: 'center',
              },
              headerTitleAlign: 'center',
              headerShadowVisible: headerStyle.headerShadowVisible,
              headerLeft: () => (
                <TouchableOpacity
                  onPress={() => navigation.goBack()}
                  style={{marginLeft: 8}}>
                  <ArrowLeft size={24} color={headerStyle.headerTintColor} />
                </TouchableOpacity>
              ),
            })}
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
          <Stack.Screen
            name="AddPlant"
            component={AddPlant}
            options={{
              title: 'Tambah Tanaman',
              headerStyle: {
                backgroundColor: '#48BB78',
              },
              headerTintColor: '#fff',
              headerTitleStyle: {
                fontWeight: 'bold',
              },
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};
