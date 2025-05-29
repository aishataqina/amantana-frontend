import React, {useState} from 'react';
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
  const [loading, _setLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const {plants, isFavorite, toggleFavorite} = usePlantStore();
  const {isDarkMode} = useTheme();
  const colors = getColors(isDarkMode);
  const {common} = useStyles();

  // Get unique categories
  const categories = ['all', ...new Set(plants.map(plant => plant.category))];

  // Filter tanaman berdasarkan kategori yang dipilih
  const filteredPlants =
    selectedCategory === 'all'
      ? plants
      : plants.filter(
          plant =>
            plant.category.toLowerCase() === selectedCategory.toLowerCase(),
        );

  const handleItemPress = (plantId: string) => {
    const plant = plants.find(p => p.id === plantId);
    if (plant) {
      navigation.navigate('Detail', {plantId: plant.id});
    }
  };

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
          className="py-4 px-4 h-18 fixed"
          style={{borderBottomColor: colors.border}}>
          {categories.map(category => (
            <Button
              key={category}
              variant={selectedCategory === category ? 'primary' : 'secondary'}
              size="small"
              onPress={() => setSelectedCategory(category)}
              style={{marginRight: 8, minWidth: 80}}>
              {category === 'all' ? 'Semua' : category}
            </Button>
          ))}
        </ScrollView>
      </View>

      {/* Plant Grid */}
      {loading ? (
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      ) : (
        <FlatList
          data={filteredPlants}
          numColumns={2}
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <PlantCard
              plant={item}
              onPress={handleItemPress}
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
            flexGrow: filteredPlants.length === 0 ? 1 : undefined,
          }}
        />
      )}
    </View>
  );
};

export default AllPlants;
