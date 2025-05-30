import React, {useState, useEffect} from 'react';
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
  const {
    plants,
    isLoading,
    error,
    isFavorite,
    toggleFavorite,
    fetchPlants,
    fetchPlantsByCategory,
  } = usePlantStore();
  const {isDarkMode} = useTheme();
  const colors = getColors(isDarkMode);
  const {common} = useStyles();

  // Debug logs
  console.log('Plants data:', plants);
  console.log('Loading state:', isLoading);
  console.log('Error state:', error);

  // Get unique categories
  const categories = [
    'all',
    ...(plants && plants.length > 0
      ? [...new Set(plants.map(plant => plant.category))]
      : []),
  ];

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

  // Handle category change
  const handleCategoryChange = async (category: string) => {
    setSelectedCategory(category);
    try {
      if (category === 'all') {
        await fetchPlants();
      } else {
        await fetchPlantsByCategory(category);
      }
    } catch (err) {
      console.error('Error changing category:', err);
    }
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
      <View className="flex-row items-center justify-between p-3">
        <TouchableOpacity onPress={() => navigation.goBack()} className="mr-3">
          <ArrowLeft size={24} color={colors.text} />
        </TouchableOpacity>
        {/* Categories */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="py-2 px-4 h-18 fixed"
          style={{borderBottomColor: colors.border}}>
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
          data={plants || []}
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
            flexGrow: !plants || plants.length === 0 ? 1 : undefined,
          }}
        />
      )}
    </View>
  );
};

export default AllPlants;
