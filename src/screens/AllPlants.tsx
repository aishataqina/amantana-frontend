import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {usePlantStore} from '../shared/store';
import {AllPlantsScreenProps} from '../shared/types/navigation.types';
import {cardShadow} from '../shared/utils/styles';

const AllPlants: React.FC = () => {
  const navigation = useNavigation<AllPlantsScreenProps['navigation']>();
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState('all'); // 'all', 'indoor', 'outdoor', etc.
  const {plants} = usePlantStore();

  // Filter tanaman berdasarkan kategori jika ada filter yang aktif
  const filteredPlants =
    filter === 'all'
      ? plants
      : plants.filter(
          plant => plant.category.toLowerCase() === filter.toLowerCase(),
        );

  const handleItemPress = (plantId: string) => {
    const plant = plants.find(p => p.id === plantId);
    if (plant) {
      navigation.navigate('Detail', {plantId: plant.id});
    }
  };

  return (
    <View className="flex-1 bg-gray-50">
      {/* Plant Grid */}
      {loading ? (
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color="#77DD77" />
        </View>
      ) : (
        <FlatList
          data={filteredPlants}
          numColumns={2}
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <TouchableOpacity
              className="bg-white m-2 overflow-hidden rounded-xl flex-1"
              style={cardShadow}
              onPress={() => handleItemPress(item.id)}>
              <View>
                <Image
                  source={{uri: item.image}}
                  className="w-full h-[140px]"
                  resizeMode="cover"
                />
                <View className="absolute top-2 right-2 bg-white/80 px-2 py-1 rounded-md">
                  <Text className="text-xs text-green-700">
                    {item.category}
                  </Text>
                </View>
                <View className="p-3">
                  <Text className="font-bold text-base" numberOfLines={1}>
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
              </View>
            </TouchableOpacity>
          )}
          columnWrapperStyle={{
            justifyContent: 'space-between',
            paddingHorizontal: 12,
          }}
          ListEmptyComponent={
            <View className="flex-1 justify-center items-center p-8">
              <Text className="text-gray-500 text-center mt-4">
                — Tidak ada tanaman ditemukan —
              </Text>
            </View>
          }
          contentContainerStyle={{
            paddingVertical: 10,
            flexGrow: filteredPlants.length === 0 ? 1 : undefined,
          }}
        />
      )}
    </View>
  );
};

export default AllPlants;
