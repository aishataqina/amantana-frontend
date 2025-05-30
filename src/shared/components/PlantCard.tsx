import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import {Heart} from 'lucide-react-native';
import {Plant} from '../types/plant.types';
import {useTheme} from '../theme/ThemeContext';
import {getColors} from '../theme/colors';
import {lightShadow, darkShadow} from '../utils/cardShadow';

interface PlantCardProps {
  plant: Plant;
  onPress: (plantId: number) => void;
  width?: number;
  isFavorite?: (id: number) => boolean;
  toggleFavorite?: (id: number) => void;
  style?: any;
  variant?: 'grid' | 'list';
}

const PlantCard: React.FC<PlantCardProps> = ({
  plant,
  onPress,
  width,
  isFavorite,
  toggleFavorite,
  style,
  variant = 'grid',
}) => {
  const {isDarkMode} = useTheme();
  const colors = getColors(isDarkMode);

  const dynamicStyles = {
    card: {
      backgroundColor: colors.card,
    },
    title: {
      color: colors.text,
    },
    subtitle: {
      color: colors.textSecondary,
    },
  };

  const handleFavoritePress = (e: any) => {
    e.stopPropagation();
    if (toggleFavorite) {
      toggleFavorite(plant.id);
    }
  };

  // Menampilkan varian list (horizontal)
  if (variant === 'list') {
    return (
      <TouchableOpacity
        className="mx-4 my-2 rounded-xl overflow-hidden"
        onPress={() => onPress(plant.id)}>
        <View className="flex-row items-center">
          <Image
            source={{uri: plant.image}}
            className="w-[50] h-[50] rounded-xl"
            resizeMode="cover"
          />
          <View className="flex-1 p-3">
            <Text className="font-bold text-base" style={dynamicStyles.title}>
              {plant.name}
            </Text>
            <View className="flex-row items-center mt-1">
              <View
                className={`w-2 h-2 rounded-full mr-2 ${
                  plant.difficulty.toLowerCase() === 'mudah'
                    ? 'bg-green-500'
                    : plant.difficulty.toLowerCase() === 'sedang'
                    ? 'bg-yellow-500'
                    : 'bg-red-500'
                }`}
              />
              <Text className="text-xs" style={dynamicStyles.subtitle}>
                {plant.difficulty}
              </Text>
            </View>
          </View>
          <View className="p-3">
            <View
              className="px-2 py-1 rounded-md"
              style={{
                backgroundColor: isDarkMode
                  ? 'rgba(31, 41, 55, 0.8)'
                  : 'rgba(255, 255, 255, 0.8)',
              }}>
              <Text className="text-xs" style={{color: colors.primary}}>
                {plant.category}
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  }

  // Menampilkan varian grid (default)
  return (
    <TouchableOpacity
      className="m-2 overflow-hidden rounded-3xl"
      style={[
        {width},
        dynamicStyles.card,
        isDarkMode ? darkShadow : lightShadow,
        style,
      ]}
      onPress={() => onPress(plant.id)}>
      {/* Category Badge */}
      <View
        className="absolute top-2 right-2 z-10 px-2 py-1 rounded-xl"
        style={[
          {
            backgroundColor: isDarkMode
              ? 'rgba(31, 41, 55, 0.8)'
              : 'rgba(255, 255, 255, 0.8)',
          },
          lightShadow,
        ]}>
        <Text className="text-xs font-medium" style={{color: colors.primary}}>
          {plant.category}
        </Text>
      </View>

      {/* Image Container */}
      <View
        className="w-full rounded-t-3xl overflow-hidden"
        style={{
          backgroundColor: isDarkMode
            ? 'rgba(31, 41, 55, 0.2)'
            : 'rgba(249, 250, 251, 0.5)',
        }}>
        <Image
          source={{uri: plant.image}}
          className="w-full h-[160px]"
          resizeMode="cover"
        />
      </View>

      {/* Description */}
      <View className="flex-row">
        <View className="p-3 flex-1">
          <Text
            className="text-base font-bold pr-8"
            numberOfLines={1}
            style={dynamicStyles.title}>
            {plant.name}
          </Text>
          <View className="flex-row items-center mt-1">
            <View
              className={`w-2 h-2 rounded-full mr-2 ${
                plant.difficulty.toLowerCase() === 'mudah'
                  ? 'bg-green-500'
                  : plant.difficulty.toLowerCase() === 'sedang'
                  ? 'bg-yellow-500'
                  : 'bg-red-500'
              }`}
            />
            <Text className="text-xs" style={dynamicStyles.subtitle}>
              {plant.difficulty}
            </Text>
          </View>
        </View>
        {isFavorite && toggleFavorite && (
          <TouchableOpacity
            className="absolute top-3 right-2 z-10 p-1 rounded-full"
            style={{
              backgroundColor: isDarkMode
                ? 'rgba(31, 41, 55, 0.8)'
                : 'rgba(255, 255, 255, 0.8)',
            }}
            onPress={handleFavoritePress}>
            {isFavorite(plant.id) ? (
              <Heart size={20} color="#FF0000" fill="#FF0000" />
            ) : (
              <Heart size={20} color={isDarkMode ? '#FFFFFF' : '#000000'} />
            )}
          </TouchableOpacity>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default PlantCard;
