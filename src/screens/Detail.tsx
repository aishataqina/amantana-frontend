// src/screens/Detail.tsx
import React from 'react';
import {View, Text, Image, ScrollView, TouchableOpacity} from 'react-native';
import {DetailScreenProps} from '../types/plant.types';

const cardShadow = {
  shadowColor: '#000',
  shadowOffset: {
    width: 0,
    height: 1,
  },
  shadowOpacity: 0.15,
  shadowRadius: 2.5,
  elevation: 2,
};

const DetailScreen: React.FC<DetailScreenProps> = ({route}) => {
  const {plant} = route.params;

  return (
    <View className="flex-1 bg-[#F0FFF4]">
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

        {/* Manfaat Section */}
        <View className="bg-white rounded-3xl mt-6 p-5" style={cardShadow}>
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
          className="bg-[#2D6A4F] rounded-xl py-4"
          style={cardShadow}
          activeOpacity={0.8}>
          <Text className="text-white text-center font-semibold">
            ♥ Tambahkan ke Favorit
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default DetailScreen;
