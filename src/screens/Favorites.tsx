import React from 'react';
import {View, Text, FlatList, TouchableOpacity, Dimensions} from 'react-native';
import {FavoritesScreenProps} from '../shared/types/navigation.types';
import {usePlantStore} from '../shared/store';
import {useTheme} from '../shared/theme/ThemeContext';
import {getColors} from '../shared/theme/colors';
import PlantCard from '../shared/components/PlantCard';
// import ThemeToggle from '../shared/components/ThemeToggle';

const windowWidth = Dimensions.get('window').width;
const cardWidth = (windowWidth - 48) / 2;

const FavoritesScreen: React.FC<FavoritesScreenProps> = ({navigation}) => {
  // Menggunakan Zustand store
  const {getAllFavorites, setSelectedPlant, isFavorite, toggleFavorite} =
    usePlantStore();
  const {isDarkMode} = useTheme();
  const colors = getColors(isDarkMode);

  // Mengambil semua tanaman favorit
  const favoritePlants = getAllFavorites();

  const handlePlantPress = (plantId: string) => {
    const plant = favoritePlants.find(p => p.id === plantId);
    if (plant) {
      setSelectedPlant(plant);
      // Karena kita berada di dalam tab navigator, kita perlu menggunakan
      // navigate ke parent navigator (Stack) untuk ke Detail
      navigation.getParent()?.navigate('Detail', {plantId: plant.id});
    }
  };

  // Dynamic styles
  const dynamicStyles = {
    container: {
      backgroundColor: colors.background,
    },
    card: {
      backgroundColor: colors.card,
    },
    title: {
      color: colors.text,
    },
    subtitle: {
      color: colors.textSecondary,
    },
    categoryBadge: {
      backgroundColor: isDarkMode
        ? 'rgba(31, 41, 55, 0.8)'
        : 'rgba(255, 255, 255, 0.8)',
    },
    categoryText: {
      color: colors.primary,
    },
    emptyText: {
      color: colors.textSecondary,
    },
    actionButton: {
      backgroundColor: isDarkMode ? colors.primary : colors.primaryDark,
    },
  };

  if (favoritePlants.length === 0) {
    return (
      <View
        className="flex-1 items-center justify-center p-5"
        style={dynamicStyles.container}>
        <Text className="text-lg mb-4" style={dynamicStyles.emptyText}>
          Belum ada tanaman favorit
        </Text>
        <TouchableOpacity
          className="px-6 py-3 rounded-xl"
          style={dynamicStyles.actionButton}
          onPress={() => navigation.navigate('HomeTab')}>
          <Text className="text-white font-semibold">Lihat Semua Tanaman</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View className="flex-1" style={dynamicStyles.container}>
      {/* Header */}
      <View className="flex-row justify-between items-center p-4">
        <Text className="text-xl font-bold" style={dynamicStyles.title}>
          Tanaman Favorit
        </Text>
      </View>

      {/* Favorite Plants List */}
      <FlatList
        data={favoritePlants}
        numColumns={2}
        keyExtractor={item => item.id}
        className="p-3"
        contentContainerStyle={{paddingBottom: 20}}
        renderItem={({item}) => (
          <PlantCard
            plant={item}
            width={cardWidth}
            onPress={handlePlantPress}
            isFavorite={isFavorite}
            toggleFavorite={toggleFavorite}
          />
        )}
      />
    </View>
  );
};

export default FavoritesScreen;
