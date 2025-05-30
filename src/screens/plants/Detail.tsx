// src/screens/plants/Detail.tsx
import React, {useEffect} from 'react';
import {View, Text, Image, ScrollView, ActivityIndicator} from 'react-native';
import {DetailScreenProps} from '@/shared/types/navigation.types';
import {darkShadow, lightShadow} from '@/shared/utils/cardShadow';
import {usePlantStore} from '@/shared/store';
import {Droplet, Leaf, Sprout} from 'lucide-react-native';
import {useTheme} from '@/shared/theme/ThemeContext';
import {getColors} from '@/shared/theme/colors';
import {useStyles} from '@/shared/theme/styles';
import {Button} from '@/shared/components/Button';

const DetailScreen: React.FC<DetailScreenProps> = ({route}) => {
  const {plantId} = route.params;
  const {
    getPlantById,
    toggleFavorite,
    isFavorite,
    selectedPlant,
    fetchPlantById,
  } = usePlantStore();
  const {isDarkMode} = useTheme();
  const colors = getColors(isDarkMode);
  const {common, typography} = useStyles();

  // Fetch plant details when component mounts
  useEffect(() => {
    const loadPlant = async () => {
      try {
        await fetchPlantById(parseInt(plantId));
      } catch (error) {
        console.error('Error loading plant:', error);
      }
    };
    loadPlant();
  }, [plantId, fetchPlantById]);

  // Get plant details from store
  const plant = selectedPlant || getPlantById(parseInt(plantId));

  // Cleanup when unmounting
  useEffect(() => {
    return () => {
      usePlantStore.getState().clearSelectedPlant();
    };
  }, []);

  if (!plant) {
    return (
      <View
        className="flex-1 items-center justify-center"
        style={common.container}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text className="mt-4" style={common.textSecondary}>
          Memuat detail tanaman...
        </Text>
      </View>
    );
  }

  return (
    <View className="flex-1" style={common.container}>
      <ScrollView className="flex-1">
        <Image
          source={{uri: plant.image}}
          className="w-screen h-[300px] rounded-b-2xl"
          resizeMode="cover"
          style={lightShadow}
        />

        <View
          className="flex-1 m-5 top-[-56px] rounded-3xl"
          style={[common.card, isDarkMode ? darkShadow : lightShadow]}>
          {/* Plant Name & Category */}
          <View
            className="flex-row gap-3 items-start mt-4 mx-4"
            style={{borderColor: isDarkMode ? colors.border : '#E5E7EB'}}>
            <Sprout size={30} color={isDarkMode ? colors.primary : '#2D6A4F'} />
            <Text
              className="text-2xl font-bold text-wrap"
              style={typography.h3}>
              {plant.name}
            </Text>
          </View>

          {/* Description Section */}
          <View
            className="pb-4 mx-4 border-b"
            style={{borderColor: isDarkMode ? colors.border : '#E5E7EB'}}>
            <Text className="text-justify" style={typography.body2}>
              {plant.description}
            </Text>
          </View>

          {/* Manfaat Section */}
          <View
            className="py-4 mx-4 border-b"
            style={{borderColor: isDarkMode ? colors.border : '#E5E7EB'}}>
            <View className="flex-row items-center mb-2">
              <Leaf size={20} color={isDarkMode ? colors.primary : '#2D6A4F'} />
              <Text
                className="text-base font-semibold px-2"
                style={typography.body1}>
                Manfaat Tanaman
              </Text>
            </View>
            {plant.benefits.map((benefit, index) => (
              <View key={index} className="mb-1">
                <Text className="text-justify" style={typography.body2}>
                  • {benefit}
                </Text>
              </View>
            ))}
          </View>

          {/* Cara Perawatan Section */}
          <View className="p-4">
            <View className="flex-row items-center mb-2">
              <Droplet
                size={20}
                color={isDarkMode ? colors.primary : '#2D6A4F'}
              />
              <Text
                className="text-lg font-semibold px-2"
                style={typography.body1}>
                Cara Perawatan
              </Text>
            </View>
            <View>
              <View className="flex-col">
                <Text className="font-bold mb-1" style={typography.body2}>
                  Penyiraman:
                </Text>
                <Text
                  className="font-normal mb-2 text-justify"
                  style={typography.body2}>
                  {plant.care.watering}
                </Text>
              </View>
              <View className="flex-col">
                <Text className="font-bold mb-1" style={typography.body2}>
                  Cahaya:
                </Text>
                <Text className="font-normal mb-2" style={typography.body2}>
                  {plant.care.sunlight}
                </Text>
              </View>
              <View className="flex-col">
                <Text className="font-bold mb-1" style={typography.body2}>
                  Suhu:
                </Text>
                <Text className="font-normal mb-2" style={typography.body2}>
                  {plant.care.temperature}
                </Text>
              </View>
              <View className="flex-col">
                <Text className="font-bold mb-1" style={typography.body2}>
                  Media Tanam:
                </Text>
                <Text className="font-normal mb-2" style={typography.body2}>
                  {plant.care.soil}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Favorite Button */}
      <View className="px-5 pb-6">
        <Button
          variant={isFavorite(parseInt(plantId)) ? 'secondary' : 'primary'}
          onPress={() => toggleFavorite(parseInt(plantId))}
          fullWidth>
          {isFavorite(parseInt(plantId))
            ? 'Hapus dari Favorit'
            : 'Tambah ke Favorit'}
        </Button>
      </View>
    </View>
  );
};

export default DetailScreen;
