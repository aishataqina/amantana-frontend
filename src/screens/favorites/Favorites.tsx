import React from 'react';
import {View, Text, FlatList, TouchableOpacity, Dimensions} from 'react-native';
import type {FavoritesScreenProps} from '@/shared/types/navigation.types';
import {usePlantStore} from '@/shared/store';
import {useTheme} from '@/shared/theme/ThemeContext';
import {getColors} from '@/shared/theme/colors';
import PlantCard from '@/shared/components/PlantCard';
import {useStyles} from '@/shared/theme/styles';

const windowWidth = Dimensions.get('window').width;
const cardWidth = (windowWidth - 48) / 2;

const FavoritesScreen: React.FC<FavoritesScreenProps> = ({navigation}) => {
  // Menggunakan Zustand store
  const {getAllFavorites, setSelectedPlant, isFavorite, toggleFavorite} =
    usePlantStore();
  const {isDarkMode} = useTheme();
  const colors = getColors(isDarkMode);
  const {common, typography} = useStyles();

  // Mengambil semua tanaman favorit
  const favoritePlants = getAllFavorites();

  const handlePlantPress = (plantId: number) => {
    const plant = favoritePlants.find(p => p.id === plantId);
    if (plant) {
      setSelectedPlant(plant);
      // Karena kita berada di dalam tab navigator, kita perlu menggunakan
      // navigate ke parent navigator (Stack) untuk ke Detail
      navigation.getParent()?.navigate('Detail', {plantId: plantId.toString()});
    }
  };

  if (favoritePlants.length === 0) {
    return (
      <View
        className="flex-1 items-center justify-center p-5"
        style={common.container}>
        <Text className="text-lg mb-4" style={common.textSecondary}>
          Belum ada tanaman favorit
        </Text>
        <TouchableOpacity
          className="px-6 py-3 rounded-xl"
          style={[
            common.button,
            {backgroundColor: isDarkMode ? colors.primary : colors.primaryDark},
          ]}
          onPress={() => navigation.getParent()?.navigate('AllPlants')}>
          <Text className="text-white font-semibold" style={common.buttonText}>
            Lihat Semua Tanaman
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View className="flex-1" style={common.container}>
      {/* Header */}
      <View className="flex-row justify-between items-center p-4">
        <Text className="text-xl font-bold" style={typography.h2}>
          Tanaman Favorit
        </Text>
      </View>

      {/* Favorite Plants List */}
      <FlatList
        data={favoritePlants}
        numColumns={2}
        keyExtractor={item => item.id.toString()}
        className="p-3"
        contentContainerStyle={{paddingBottom: 20}}
        renderItem={({item}) => (
          <PlantCard
            plant={item}
            width={cardWidth}
            onPress={() => handlePlantPress(item.id)}
            isFavorite={isFavorite}
            toggleFavorite={toggleFavorite}
          />
        )}
      />
    </View>
  );
};

export default FavoritesScreen;
