import React, {useState, useEffect, useCallback} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
  ActivityIndicator,
  TextInput,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {usePlantStore} from '../shared/store';
import {SearchResultScreenProps} from '../shared/types/navigation.types';
import {ArrowLeft, Search, X} from 'lucide-react-native';
import {Plant} from '../shared/types/plant.types';

interface RouteParams {
  searchQuery: string;
}

const SearchResult: React.FC<{route: {params: RouteParams}}> = ({route}) => {
  const navigation = useNavigation<SearchResultScreenProps['navigation']>();
  const {searchQuery: initialQuery} = route.params;
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [loading, setLoading] = useState(true);
  const [results, setResults] = useState<Plant[]>([]);
  const {plants} = usePlantStore();

  const handleSearch = useCallback(
    (query: string) => {
      setSearchQuery(query);
      // Simulasi pencarian dengan delay
      setLoading(true);
      setTimeout(() => {
        // Filter plants berdasarkan query
        const filteredResults = plants.filter(
          plant =>
            plant.name.toLowerCase().includes(query.toLowerCase()) ||
            plant.category.toLowerCase().includes(query.toLowerCase()),
        );
        setResults(filteredResults);
        setLoading(false);
      }, 300);
    },
    [plants],
  );

  useEffect(() => {
    handleSearch(initialQuery);
  }, [initialQuery, handleSearch]);

  const handleItemPress = (plantId: string) => {
    const plant = plants.find(p => p.id === plantId);
    if (plant) {
      navigation.navigate('Detail', {plantId: plant.id});
    }
  };

  return (
    <View className="flex-1 bg-gray-50">
      {/* Header */}
      <View className="flex-row items-center bg-gray-100 p-3">
        <TouchableOpacity onPress={() => navigation.goBack()} className="mr-3">
          <ArrowLeft size={24} color="#000" />
        </TouchableOpacity>
        <View className="flex-1 bg-white rounded-full px-3 py-1 flex-row items-center">
          <Search size={20} color="#9CA3AF" />
          <TextInput
            className="flex-1 ml-2 text-base"
            placeholder="Cari tanaman"
            value={searchQuery}
            onChangeText={handleSearch}
            autoFocus={true}
          />
          {searchQuery ? (
            <TouchableOpacity onPress={() => handleSearch('')}>
              <X size={20} color="#9CA3AF" />
            </TouchableOpacity>
          ) : null}
        </View>
      </View>

      {/* Filters & Sort */}
      {/* <View className="flex-row justify-between border-b border-gray-200 py-3 px-4">
        <TouchableOpacity className="flex-row items-center">
          <Icon name="options-outline" size={18} color="#555" />
          <Text className="ml-1 text-gray-700 font-medium">Filter</Text>
        </TouchableOpacity>

        <TouchableOpacity className="flex-row items-center">
          <Icon name="swap-vertical-outline" size={18} color="#555" />
          <Text className="ml-1 text-gray-700 font-medium">Urutkan</Text>
        </TouchableOpacity>

        <Text className="text-gray-500 text-sm">{results.length} hasil</Text>
      </View> */}

      {/* Results */}
      {loading ? (
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color="#77DD77" />
        </View>
      ) : (
        <FlatList
          data={results}
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <TouchableOpacity
              className=" mx-4 my-4 rounded-xl overflow-hidden"
              // style={cardShadow}
              onPress={() => handleItemPress(item.id)}>
              <View className="flex-row">
                <Image
                  source={{uri: item.image}}
                  className="w-[80] h-[80] rounded-xl"
                  resizeMode="cover"
                />
                <View className="flex-1 p-3">
                  <Text className="font-bold text-base">{item.name}</Text>
                  {/* <View className="flex-row items-center mt-1">
                    <Icon name="star" size={16} color="#FFD700" />
                    <Text className="ml-1 text-gray-600">
                      {item.rating} • {item.reviews} ulasan
                    </Text>
                  </View>
                  <View className="flex-row items-center mt-1">
                    <Icon name="location-outline" size={14} color="#777" />
                    <Text className="ml-1 text-xs text-gray-500">
                      {item.location}
                    </Text>
                  </View> */}
                </View>
                <View className="p-3">
                  <View className="bg-gray-100 px-2 py-1 rounded-md">
                    <Text className="text-xs text-green-700">
                      {item.category}
                    </Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          )}
          ListEmptyComponent={
            <View className="flex-1 justify-center items-center p-8">
              <Text className="text-gray-500 text-center mt-4">
                — Tidak ada lagi hasil —
              </Text>
            </View>
          }
          contentContainerStyle={{
            paddingVertical: 10,
            flexGrow: results.length === 0 ? 1 : undefined,
          }}
        />
      )}
    </View>
  );
};

export default SearchResult;
