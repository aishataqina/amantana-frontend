// src/screens/Detail.tsx
import React, {useEffect} from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {DetailScreenProps} from '../shared/types/navigation.types';
import {cardShadow} from '../shared/utils/styles';
import {usePlantStore} from '../shared/store';

const DetailScreen: React.FC<DetailScreenProps> = ({route}) => {
  const {plantId} = route.params;
  const {getPlantById, toggleFavorite, isFavorite, selectedPlant} =
    usePlantStore();

  // Get plant details from store
  const plant = selectedPlant || getPlantById(plantId);

  // Cleanup when unmounting
  useEffect(() => {
    return () => {
      usePlantStore.getState().clearSelectedPlant();
    };
  }, []);

  if (!plant) {
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator size="large" color="#2D6A4F" />
        <Text className="mt-4 text-gray-600">Memuat detail tanaman...</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-gray-50">
      <ScrollView className="flex-1 px-5">
        {/* Image Container */}
        <View className="mt-4 py-4 rounded-3xl items-center">
          <Image
            source={{uri: plant.image}}
            className="w-[200px] h-[200px] rounded-2xl"
            resizeMode="cover"
            style={cardShadow}
          />
        </View>

        {/* Plant Name & Category */}
        <View className="items-center mt-6">
          <Text className="text-[#2D6A4F] text-2xl font-bold">
            {plant.name}
          </Text>
          <View className="bg-[#D8F3DC] px-4 py-1 rounded-full mt-2">
            <Text className="text-[#2D6A4F]">{plant.category} Plant</Text>
          </View>
        </View>

        {/* Description Section */}
        <View className="bg-white rounded-3xl mt-6 p-5" style={cardShadow}>
          <View className="flex-row items-center mb-3">
            <Text className="text-[#2D6A4F] text-lg font-semibold">
              📝 Deskripsi
            </Text>
          </View>
          <Text className="text-gray-700">{plant.description}</Text>
        </View>

        {/* Manfaat Section */}
        <View className="bg-white rounded-3xl mt-4 p-5" style={cardShadow}>
          <View className="flex-row items-center mb-3">
            <Text className="text-[#2D6A4F] text-lg font-semibold">
              🌿 Manfaat
            </Text>
          </View>
          {plant.benefits.map((benefit, index) => (
            <View key={index} className="mb-2">
              <Text className="text-gray-700">• {benefit}</Text>
            </View>
          ))}
        </View>

        {/* Cara Perawatan Section */}
        <View className="bg-white rounded-3xl mt-4 mb-6 p-5" style={cardShadow}>
          <View className="flex-row items-center mb-3">
            <Text className="text-[#2D6A4F] text-lg font-semibold">
              🪴 Cara Perawatan
            </Text>
          </View>
          <View>
            <View className="flex-col">
              <Text className="text-gray-700 font-bold mb-1">Penyiraman:</Text>
              <Text className="text-gray-700 font-normal mb-2">
                {plant.care.watering}
              </Text>
            </View>
            <View className="flex-col">
              <Text className="text-gray-700 font-bold mb-1">Cahaya:</Text>
              <Text className="text-gray-700 font-normal mb-2">
                {plant.care.sunlight}
              </Text>
            </View>
            <View className="flex-col">
              <Text className="text-gray-700 font-bold mb-1">Suhu:</Text>
              <Text className="text-gray-700 font-normal mb-2">
                {plant.care.temperature}
              </Text>
            </View>
            <View className="flex-col">
              <Text className="text-gray-700 font-bold mb-1">Media Tanam:</Text>
              <Text className="text-gray-700 font-normal mb-2">
                {plant.care.soil}
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Favorite Button */}
      <View className="px-5 pb-6">
        <TouchableOpacity
          className={`rounded-xl py-4 ${
            isFavorite(plant.id) ? 'bg-[#D8F3DC]' : 'bg-[#2D6A4F]'
          }`}
          style={cardShadow}
          activeOpacity={0.8}
          onPress={() => toggleFavorite(plant.id)}>
          <Text
            className={`text-center font-semibold ${
              isFavorite(plant.id) ? 'text-[#2D6A4F]' : 'text-white'
            }`}>
            {isFavorite(plant.id) ? '❤️ Favorit' : '🤍 Tambahkan ke Favorit'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default DetailScreen;
