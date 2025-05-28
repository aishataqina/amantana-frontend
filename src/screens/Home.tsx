// src/screens/Home.tsx
import React from 'react';
import {
  ScrollView,
  View,
  Text,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {HomeScreenProps} from '../shared/types/navigation.types';
import {cardShadow} from '../shared/utils/styles';
import {usePlantStore} from '../shared/store';
import {Heart, ChevronRight} from 'lucide-react-native';
import SearchBar from '../shared/components/SearchBar';
import {Banner} from '../shared/components/Banner';
import {InfoBanner} from '../shared/components/InfoBanner';

const windowWidth = Dimensions.get('window').width;
const cardWidth = (windowWidth - 48) / 2;

const HomeScreen: React.FC<HomeScreenProps> = ({navigation}) => {
  const {plants, setSelectedPlant, isFavorite, toggleFavorite} =
    usePlantStore();

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

  return (
    <ScrollView className="flex-1 bg-gray-50 py-5">
      {/* Banner utama */}
      <Banner source={require('../assets/img/banner.jpg')} />

      {/* Search Bar */}
      <SearchBar />

      {/* Grid plant cards */}
      <View className="flex-row justify-between items-center px-4 pt-4 pb-1">
        <Text className="text-lg font-bold text-gray-800">Tanaman Populer</Text>
        <TouchableOpacity
          className="flex-row items-center"
          onPress={handleSeeAllPress}>
          <Text className="text-sm text-green-700 mr-1">
            Tampilkan lebih banyak
          </Text>
          <ChevronRight size={16} color="#15803D" />
        </TouchableOpacity>
      </View>

      <ScrollView
        horizontal
        nestedScrollEnabled
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{paddingHorizontal: 12}} // padding kiri/kanan
        className="py-3">
        {plants.slice(0, 5).map(item => (
          <TouchableOpacity
            key={item.id}
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

            {/* Image Container */}
            <View className="w-full bg-gray-50/50 rounded-t-3xl overflow-hidden">
              <Image
                source={{uri: item.image}}
                className="w-full h-[160px]"
                resizeMode="cover"
              />
            </View>

            {/* Description */}
            <View className="flex-row">
              <View className="py-2 px-3 flex-1">
                <Text
                  className="text-base font-bold text-gray-800 pr-8"
                  numberOfLines={1}>
                  {item.name}
                </Text>
                <View className="flex-row items-center mt-1">
                  <View
                    className={`w-2 h-2 rounded-full mr-2 ${
                      item.difficulty === 'Mudah'
                        ? 'bg-green-500'
                        : item.difficulty === 'Sedang'
                        ? 'bg-yellow-500'
                        : 'bg-red-500'
                    }`}
                  />
                  <Text className="text-xs text-gray-500">
                    {item.difficulty}
                  </Text>
                </View>
              </View>
              <TouchableOpacity
                className="absolute top-2 right-2 z-10 bg-white/80 p-1 rounded-full"
                onPress={e => {
                  e.stopPropagation();
                  toggleFavorite(item.id);
                }}>
                {isFavorite(item.id) ? (
                  <Heart size={20} color="#FF0000" fill="#FF0000" />
                ) : (
                  <Heart size={20} />
                )}
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Banner tips di bawah */}
      <InfoBanner
        bgColor="bg-green-100"
        iconBgColor="bg-green-100"
        imageSource={require('../assets/img/banner2.png')}
        title="Tips Perawatan Tanaman"
        description="Siram tanaman secukupnya, tempatkan pada cahaya tidak langsung, dan berikan pupuk alami."
      />
    </ScrollView>
  );
};

export default HomeScreen;
