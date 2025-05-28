import React from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {FavoritesScreenProps} from '../shared/types/navigation.types';
import {cardShadow} from '../shared/utils/styles';
import {usePlantStore} from '../shared/store';

const windowWidth = Dimensions.get('window').width;
const cardWidth = (windowWidth - 48) / 2;

const FavoritesScreen: React.FC<FavoritesScreenProps> = ({navigation}) => {
  // Menggunakan Zustand store
  const {getAllFavorites, setSelectedPlant, isFavorite, toggleFavorite} =
    usePlantStore();

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

  if (favoritePlants.length === 0) {
    return (
      <View className="flex-1 bg-gray-50 items-center justify-center p-5">
        <Text className="text-gray-500 text-lg mb-4">
          Belum ada tanaman favorit
        </Text>
        <TouchableOpacity
          className="bg-[#2D6A4F] px-6 py-3 rounded-xl"
          onPress={() => navigation.navigate('HomeTab')}>
          <Text className="text-white font-semibold">Lihat Semua Tanaman</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-gray-50">
      {/* Favorite Plants List */}
      <FlatList
        data={favoritePlants}
        numColumns={2}
        keyExtractor={item => item.id}
        className="p-3"
        contentContainerStyle={{paddingBottom: 20}}
        renderItem={({item}) => (
          <TouchableOpacity
            className="bg-white m-2 overflow-hidden rounded-3xl"
            style={[{width: cardWidth}, cardShadow]}
            onPress={() => handlePlantPress(item.id)}>
            {/* Category Badge */}
            <View
              className="absolute top-2 right-2 z-10 bg-white/80 px-2 py-1 rounded-xl"
              style={cardShadow}>
              <Text className="text-xs text-green-700 font-medium">
                {item.category}
              </Text>
            </View>

            {/* Favorite Icon */}
            <TouchableOpacity
              className="absolute top-2 left-2 z-10 bg-white/80 p-1 rounded-full"
              style={cardShadow}
              onPress={e => {
                e.stopPropagation(); // Mencegah event ke parent (card press)
                toggleFavorite(item.id);
              }}>
              <Text className="text-sm">
                {isFavorite(item.id) ? '❤️' : '🤍'}
              </Text>
            </TouchableOpacity>

            {/* Image Container */}
            <View className="w-full bg-gray-50/50 rounded-t-3xl overflow-hidden">
              <Image
                source={{uri: item.image}}
                className="w-full h-[160px]"
                resizeMode="cover"
              />
            </View>

            {/* Content */}
            <View className="py-2 px-3">
              <Text className="text-base font-bold text-gray-800">
                {item.name}
              </Text>

              {/* Difficulty Level */}
              <View className="flex-row items-center mt-1">
                <View
                  className={`w-2 h-2 rounded-full mr-2 ${
                    item.difficulty === 'Mudah'
                      ? 'bg-green-500 rounded-full'
                      : item.difficulty === 'Sedang'
                      ? 'bg-yellow-500 rounded-full'
                      : 'bg-red-500 rounded-full'
                  }`}
                />
                <Text className="text-xs text-gray-500">{item.difficulty}</Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default FavoritesScreen;
