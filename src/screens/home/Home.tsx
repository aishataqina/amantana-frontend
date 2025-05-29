// src/screens/home/Home.tsx
import React from 'react';
import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {HomeScreenProps} from '../../shared/types/navigation.types';
import {usePlantStore} from '../../shared/store';
import {ChevronRight} from 'lucide-react-native';
import SearchBar from '../../shared/components/SearchBar';
import {Banner} from '../../shared/components/Banner';
import {InfoBanner} from '../../shared/components/InfoBanner';
import {useTheme} from '../../shared/theme/ThemeContext';
import {getColors} from '../../shared/theme/colors';
import ThemeToggle from '../../shared/components/ThemeToggle';
import PlantCard from '../../shared/components/PlantCard';

const windowWidth = Dimensions.get('window').width;
const cardWidth = (windowWidth - 48) / 2;

const HomeScreen: React.FC<HomeScreenProps> = ({navigation}) => {
  const {plants, setSelectedPlant, isFavorite, toggleFavorite} =
    usePlantStore();
  const {isDarkMode} = useTheme();
  const colors = getColors(isDarkMode);

  const handlePlantPress = (plantId: string) => {
    const plant = plants.find(p => p.id === plantId);
    if (plant) {
      setSelectedPlant(plant);
      navigation.getParent()?.navigate('Detail', {plantId: plant.id});
    }
  };

  const handleSeeAllPress = () => {
    navigation.getParent()?.navigate('AllPlants');
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
    seeAllText: {
      color: colors.primary,
    },
  };

  return (
    <ScrollView className="flex-1 py-5" style={dynamicStyles.container}>
      {/* Header + Theme Toggle */}
      <View className="flex-row justify-between items-center px-4 pb-2">
        <Text className="text-2xl font-bold" style={dynamicStyles.title}>
          Amantana
        </Text>
        <ThemeToggle />
      </View>

      {/* Banner utama */}
      <Banner source={require('../../assets/img/banner.jpg')} />

      {/* Search Bar */}
      <SearchBar />

      {/* Grid plant cards */}
      <View className="flex-row justify-between items-center px-4 pt-4 pb-1">
        <Text className="text-lg font-bold" style={dynamicStyles.title}>
          Tanaman Populer
        </Text>
        <TouchableOpacity
          className="flex-row items-center"
          onPress={handleSeeAllPress}>
          <Text className="text-sm mr-1" style={dynamicStyles.seeAllText}>
            Tampilkan lebih banyak
          </Text>
          <ChevronRight size={16} color={colors.primary} />
        </TouchableOpacity>
      </View>

      <ScrollView
        horizontal
        nestedScrollEnabled
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{paddingHorizontal: 12}} // padding kiri/kanan
        className="py-3">
        {plants.slice(0, 5).map(item => (
          <PlantCard
            key={item.id}
            plant={item}
            width={cardWidth}
            onPress={handlePlantPress}
            isFavorite={isFavorite}
            toggleFavorite={toggleFavorite}
          />
        ))}
      </ScrollView>

      {/* Banner tips di bawah */}
      <InfoBanner
        bgColor={isDarkMode ? 'bg-green-900' : 'bg-green-100'}
        iconBgColor={isDarkMode ? 'bg-green-800' : 'bg-green-200'}
        imageSource={require('../../assets/img/banner2.png')}
        title="Tips Perawatan Tanaman"
        description="Siram tanaman secukupnya, tempatkan pada cahaya tidak langsung, dan berikan pupuk alami."
        isDark={isDarkMode}
      />
    </ScrollView>
  );
};

export default HomeScreen;
