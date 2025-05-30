import React, {useState, useEffect, useCallback} from 'react';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {usePlantStore} from '../../shared/store';
import {HomeScreenNavigationProp} from '../../shared/types/navigation.types';
import {ArrowLeft} from 'lucide-react-native';
import {useTheme} from '../../shared/theme/ThemeContext';
import {getColors} from '../../shared/theme/colors';
import PlantCard from '../../shared/components/PlantCard';
import {useStyles} from '../../shared/theme/styles';
import {Button} from '@/shared/components/Button';

const AllPlants: React.FC = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [filteredPlants, setFilteredPlants] = useState<any[]>([]);
  const {plants, isLoading, error, isFavorite, toggleFavorite, fetchPlants} =
    usePlantStore();
  const {isDarkMode} = useTheme();
  const colors = getColors(isDarkMode);
  const {common} = useStyles();

  // Debug logs
  console.log('Plants data:', plants);
  console.log('Loading state:', isLoading);
  console.log('Error state:', error);
  console.log('Selected category:', selectedCategory);
  console.log('Filtered plants:', filteredPlants);

  // Get unique categories
  const categories = [
    'all',
    ...(plants && plants.length > 0
      ? [...new Set(plants.map(plant => plant.category))]
      : []),
  ];

  // Filter plants based on category
  const filterPlants = useCallback(() => {
    if (!plants) return [];
    if (selectedCategory === 'all') {
      setFilteredPlants(plants);
    } else {
      const filtered = plants.filter(
        plant => plant.category === selectedCategory,
      );
      setFilteredPlants(filtered);
    }
  }, [plants, selectedCategory]);

  // Fetch plants on mount
  useEffect(() => {
    const loadPlants = async () => {
      try {
        await fetchPlants();
      } catch (err) {
        console.error('Error fetching plants:', err);
      }
    };
    loadPlants();
  }, [fetchPlants]);

  // Update filtered plants when plants or category changes
  useEffect(() => {
    filterPlants();
  }, [filterPlants, plants, selectedCategory]);

  // Handle category change
  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };

  const handleItemPress = (plantId: number) => {
    navigation.navigate('Detail', {plantId: plantId.toString()});
  };

  if (error) {
    return (
      <View
        className="flex-1 justify-center items-center"
        style={common.container}>
        <Text className="text-red-500 mb-4">{error}</Text>
        <Button onPress={fetchPlants}>Coba Lagi</Button>
      </View>
    );
  }

  return (
    <View className="flex-1 py-8" style={common.container}>
      {/* Header */}
      <View className="flex-row items-center justify-between p-3 mr-3">
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <ArrowLeft size={24} color={colors.text} />
        </TouchableOpacity>
        {/* Categories */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="py-2 px-4 h-16 fixed"
          style={{borderBottomColor: colors.border}}
          contentContainerStyle={{paddingRight: 16}}>
          {categories.map(category => (
            <Button
              key={category}
              variant={selectedCategory === category ? 'primary' : 'secondary'}
              size="small"
              onPress={() => handleCategoryChange(category)}
              style={{marginRight: 8, minWidth: 80}}>
              {category === 'all' ? 'Semua' : category}
            </Button>
          ))}
        </ScrollView>
      </View>

      {/* Plant Grid */}
      {isLoading ? (
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      ) : (
        <FlatList
          data={filteredPlants}
          numColumns={2}
          keyExtractor={item => item.id.toString()}
          renderItem={({item}) => (
            <PlantCard
              plant={item}
              onPress={() => handleItemPress(item.id)}
              style={{flex: 1}}
              isFavorite={isFavorite}
              toggleFavorite={toggleFavorite}
            />
          )}
          columnWrapperStyle={{
            justifyContent: 'space-between',
            paddingHorizontal: 12,
          }}
          ListEmptyComponent={
            <View className="flex-1 justify-center items-center p-8">
              <Text
                className="text-center mt-4"
                style={{color: colors.textSecondary}}>
                — Tidak ada tanaman ditemukan —
              </Text>
            </View>
          }
          contentContainerStyle={{
            paddingVertical: 10,
            flexGrow:
              !filteredPlants || filteredPlants.length === 0 ? 1 : undefined,
          }}
        />
      )}
    </View>
  );
};

export default AllPlants;
