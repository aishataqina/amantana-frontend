// src/screens/home/Home.tsx
import React, {useEffect} from 'react';
import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import {HomeScreenProps} from '../../shared/types/navigation.types';
import {usePlantStore} from '../../shared/store';
import {ChevronRight} from 'lucide-react-native';
import SearchBar from '../../shared/components/SearchBar';
import {Banner} from '../../shared/components/Banner';
import {InfoBanner} from '../../shared/components/InfoBanner';
import {useTheme} from '../../shared/theme/ThemeContext';
import {getColors} from '../../shared/theme/colors';
import PlantCard from '../../shared/components/PlantCard';
import {useStyles} from '../../shared/theme/styles';
import {CategoryCard} from '@/shared/components/CategoryCard';

const windowWidth = Dimensions.get('window').width;
const cardWidth = (windowWidth - 48) / 2;

const HomeScreen: React.FC<HomeScreenProps> = ({navigation}) => {
  const {
    plants,
    setSelectedPlant,
    isFavorite,
    toggleFavorite,
    fetchPlants,
    isLoading,
    error,
  } = usePlantStore();
  const {isDarkMode} = useTheme();
  const colors = getColors(isDarkMode);
  const {common, typography} = useStyles();

  useEffect(() => {
    fetchPlants();
  }, [fetchPlants]);

  const handlePlantPress = (plantId: number) => {
    const plant = plants.find(p => p.id === plantId);
    if (plant) {
      setSelectedPlant(plant);
      navigation.getParent()?.navigate('Detail', {plantId: plantId.toString()});
    }
  };

  const handleSeeAllPress = () => {
    navigation.getParent()?.navigate('AllPlants');
  };

  if (error) {
    return (
      <View
        className="flex-1 justify-center items-center"
        style={common.container}>
        <Text className="text-red-500 mb-4">{error}</Text>
        <TouchableOpacity
          className="bg-primary px-4 py-2 rounded-lg"
          onPress={fetchPlants}>
          <Text className="text-white">Coba Lagi</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView className="flex-1 py-5" style={common.container}>
      {/* Banner utama */}
      <Banner source={require('../../assets/img/banner.jpg')} />

      {/* Search Bar */}
      <SearchBar />

      {/* Kategori Tanaman */}
      <CategoryCard />

      {/* Grid plant cards */}
      <View className="flex-row justify-between items-center px-4 pt-6 pb-1">
        <Text className="text-lg font-bold" style={typography.h4}>
          Tanaman Populer
        </Text>
        <TouchableOpacity
          className="flex-row items-center"
          onPress={handleSeeAllPress}>
          <Text className="text-sm mr-1" style={{color: colors.primary}}>
            Tampilkan lebih banyak
          </Text>
          <ChevronRight size={16} color={colors.primary} />
        </TouchableOpacity>
      </View>

      {isLoading ? (
        <View className="py-8 justify-center items-center">
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      ) : (
        <ScrollView
          horizontal
          nestedScrollEnabled
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{paddingHorizontal: 12}}
          className="py-3">
          {plants && plants.length > 0 ? (
            plants
              .slice(0, 5)
              .map(item => (
                <PlantCard
                  key={item.id}
                  plant={item}
                  width={cardWidth}
                  onPress={handlePlantPress}
                  isFavorite={isFavorite}
                  toggleFavorite={toggleFavorite}
                />
              ))
          ) : (
            <View className="flex-1 justify-center items-center p-8">
              <Text style={{color: colors.textSecondary}}>
                Tidak ada tanaman tersedia
              </Text>
            </View>
          )}
        </ScrollView>
      )}

      {/* Banner tips di bawah */}
      <InfoBanner
        bgColor={isDarkMode ? 'bg-green-900' : 'bg-green-100'}
        iconBgColor={isDarkMode ? 'bg-green-800' : 'bg-green-200'}
        imageSource={require('../../assets/img/banner2.png')}
        title="Tips Perawatan Tanaman"
        description="Siram tanaman secukupnya, tempatkan pada cahaya tidak langsung, dan berikan pupuk alami."
        isDark={isDarkMode}
      />

      <View className="px-4 pt-6 pb-2 mb-8 flex-col gap-4">
        <View>
          <Text className="text-lg font-bold" style={typography.body2}>
            Kamu + Tanaman = Tim yang sempurna!
          </Text>
          <Text className="text-sm" style={typography.caption}>
            🌿 Yuk, ikuti kelas berkebun dan temukan keseruan merawat tanaman
            sendiri!
          </Text>
        </View>

        <View>
          <Banner
            source={require('../../assets/img/banner3.jpg')}
            caption="Pelajari cara membuat taman impianmu! 🌸"
            subcaption="Daftar kelas berkebun sekarang dan mulai petualangan hijaumu hari ini!"
            showCaption={true}
            captionStyle="card"
            containerClassName="m-0"
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default HomeScreen;
