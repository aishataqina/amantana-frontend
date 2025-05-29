// src/screens/plants/Detail.tsx
import React, {useEffect} from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import type {DetailScreenProps} from '@/shared/types/navigation.types';
import {lightShadow} from '@/shared/utils/cardShadow';
import {usePlantStore} from '@/shared/store';
import {Leaf, Sprout} from 'lucide-react-native';
import {useTheme} from '@/shared/theme/ThemeContext';
import {getColors} from '@/shared/theme/colors';

const DetailScreen: React.FC<DetailScreenProps> = ({route}) => {
  const {plantId} = route.params;
  const {getPlantById, toggleFavorite, isFavorite, selectedPlant} =
    usePlantStore();
  const {isDarkMode} = useTheme();
  const colors = getColors(isDarkMode);

  // Get plant details from store
  const plant = selectedPlant || getPlantById(plantId);

  // Cleanup when unmounting
  useEffect(() => {
    return () => {
      usePlantStore.getState().clearSelectedPlant();
    };
  }, []);

  // Dynamic styles
  const dynamicStyles = {
    container: {
      backgroundColor: colors.background,
    },
    card: {
      backgroundColor: colors.card,
    },
    title: {
      color: colors.primaryDark,
    },
    subtitle: {
      color: colors.text,
    },
    border: {
      borderColor: isDarkMode ? colors.border : '#E5E7EB',
    },
    text: {
      color: colors.text,
    },
    textSecondary: {
      color: colors.textSecondary,
    },
    categoryBadge: {
      backgroundColor: isDarkMode ? 'rgba(10, 131, 100, 0.2)' : '#D8F3DC',
    },
    categoryText: {
      color: isDarkMode ? colors.primary : '#2D6A4F',
    },
    iconColor: isDarkMode ? colors.primary : '#2D6A4F',
  };

  if (!plant) {
    return (
      <View
        className="flex-1 items-center justify-center"
        style={dynamicStyles.container}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text className="mt-4" style={dynamicStyles.textSecondary}>
          Memuat detail tanaman...
        </Text>
      </View>
    );
  }

  return (
    <View className="flex-1" style={dynamicStyles.container}>
      <ScrollView className="flex-1">
        {/* Image Container */}
        {/* <View className="mt-4 py-4 rounded-3xl items-center"> */}
        <Image
          source={{uri: plant.image}}
          className="w-screen h-[200px] rounded-b-2xl"
          resizeMode="cover"
          style={lightShadow}
        />
        {/* </View> */}

        <View
          className="flex-1 m-5 top-[-56px] rounded-3xl"
          style={[dynamicStyles.card, lightShadow]}>
          {/* Plant Name & Category */}
          <View
            className="items-center mt-4 pb-4 mx-4 border-b"
            style={dynamicStyles.border}>
            <Text className="text-2xl font-bold" style={dynamicStyles.title}>
              {plant.name}
            </Text>
            <View
              className="px-4 py-1 rounded-full mt-2"
              style={dynamicStyles.categoryBadge}>
              <Text style={dynamicStyles.categoryText}>
                {plant.category} Plant
              </Text>
            </View>
          </View>

          {/* Description Section */}
          <View className="p-4 pb-4 mx-4 border-b" style={dynamicStyles.border}>
            <Text
              className="font-semibold text-justify"
              style={dynamicStyles.subtitle}>
              {plant.description}
            </Text>
          </View>

          {/* Manfaat Section */}
          <View className="p-4 pb-4 mx-4 border-b" style={dynamicStyles.border}>
            <View className="flex-row items-center mb-2">
              <Leaf size={20} color={dynamicStyles.iconColor} />
              <Text
                className="text-lg font-semibold px-2"
                style={dynamicStyles.title}>
                Manfaat
              </Text>
            </View>
            {plant.benefits.map((benefit, index) => (
              <View key={index} className="mb-1">
                <Text className="text-justify" style={dynamicStyles.text}>
                  • {benefit}
                </Text>
              </View>
            ))}
          </View>

          {/* Cara Perawatan Section */}
          <View className="p-4 mx-4">
            <View className="flex-row items-center mb-2">
              <Sprout size={20} color={dynamicStyles.iconColor} />
              <Text
                className="text-lg font-semibold px-2"
                style={dynamicStyles.title}>
                Cara Perawatan
              </Text>
            </View>
            <View>
              <View className="flex-col">
                <Text className="font-bold mb-1" style={dynamicStyles.text}>
                  Penyiraman:
                </Text>
                <Text
                  className="font-normal mb-2 text-justify"
                  style={dynamicStyles.textSecondary}>
                  {plant.care.watering}
                </Text>
              </View>
              <View className="flex-col">
                <Text className="font-bold mb-1" style={dynamicStyles.text}>
                  Cahaya:
                </Text>
                <Text
                  className="font-normal mb-2"
                  style={dynamicStyles.textSecondary}>
                  {plant.care.sunlight}
                </Text>
              </View>
              <View className="flex-col">
                <Text className="font-bold mb-1" style={dynamicStyles.text}>
                  Suhu:
                </Text>
                <Text
                  className="font-normal mb-2"
                  style={dynamicStyles.textSecondary}>
                  {plant.care.temperature}
                </Text>
              </View>
              <View className="flex-col">
                <Text className="font-bold mb-1" style={dynamicStyles.text}>
                  Media Tanam:
                </Text>
                <Text
                  className="font-normal mb-2"
                  style={dynamicStyles.textSecondary}>
                  {plant.care.soil}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Favorite Button */}
      <View className="px-5 pb-6">
        <TouchableOpacity
          className={`rounded-xl py-4`}
          style={[
            lightShadow,
            isFavorite(plant.id)
              ? {
                  backgroundColor: isDarkMode
                    ? 'rgba(10, 131, 100, 0.2)'
                    : '#D8F3DC',
                }
              : {backgroundColor: isDarkMode ? colors.primaryDark : '#2D6A4F'},
          ]}
          activeOpacity={0.8}
          onPress={() => toggleFavorite(plant.id)}>
          <Text
            className="text-center font-semibold"
            style={{
              color: isFavorite(plant.id)
                ? isDarkMode
                  ? colors.primary
                  : '#2D6A4F'
                : 'white',
            }}>
            {isFavorite(plant.id) ? 'Favorit' : 'Tambahkan ke Favorit'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default DetailScreen;
