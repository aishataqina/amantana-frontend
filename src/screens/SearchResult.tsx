import React, {useState, useEffect, useCallback} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  TextInput,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {usePlantStore} from '../shared/store';
import {SearchResultScreenProps} from '../shared/types/navigation.types';
import {ArrowLeft, Search, X} from 'lucide-react-native';
import {Plant} from '../shared/types/plant.types';
import {useTheme} from '../shared/theme/ThemeContext';
import {getColors} from '../shared/theme/colors';
import PlantCard from '../shared/components/PlantCard';

interface RouteParams {
  searchQuery: string;
}

const SearchResult: React.FC<{route: {params: RouteParams}}> = ({route}) => {
  const navigation = useNavigation<SearchResultScreenProps['navigation']>();
  const {searchQuery: initialQuery} = route.params;
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [loading, setLoading] = useState(true);
  const [results, setResults] = useState<Plant[]>([]);
  const {plants, isFavorite, toggleFavorite} = usePlantStore();
  const {isDarkMode} = useTheme();
  const colors = getColors(isDarkMode);

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

  // Dynamic styles
  const dynamicStyles = {
    container: {
      backgroundColor: colors.background,
    },
    header: {
      backgroundColor: isDarkMode ? colors.card : colors.borderLight,
    },
    searchContainer: {
      backgroundColor: colors.card,
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
    categoryBadge: {
      backgroundColor: isDarkMode
        ? 'rgba(31, 41, 55, 0.8)'
        : colors.borderLight,
    },
  };

  return (
    <View className="flex-1" style={dynamicStyles.container}>
      {/* Header */}
      <View
        className="flex-row items-center p-3 justify-between"
        style={dynamicStyles.header}>
        <View className="flex-row items-center flex-1">
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            className="mr-3">
            <ArrowLeft size={24} color={colors.text} />
          </TouchableOpacity>
          <View
            className="flex-1 rounded-full px-3 py-1 flex-row items-center"
            style={dynamicStyles.searchContainer}>
            <Search size={20} color={colors.textTertiary} />
            <TextInput
              className="flex-1 ml-2 text-base"
              placeholder="Cari tanaman"
              value={searchQuery}
              onChangeText={handleSearch}
              autoFocus={true}
              style={{color: colors.text}}
              placeholderTextColor={colors.textTertiary}
            />
            {searchQuery ? (
              <TouchableOpacity onPress={() => handleSearch('')}>
                <X size={20} color={colors.textTertiary} />
              </TouchableOpacity>
            ) : null}
          </View>
        </View>
      </View>

      {/* Results */}
      {loading ? (
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      ) : (
        <FlatList
          data={results}
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <PlantCard
              plant={item}
              onPress={handleItemPress}
              variant="list"
              isFavorite={isFavorite}
              toggleFavorite={toggleFavorite}
            />
          )}
          ListEmptyComponent={
            <View className="flex-1 justify-center items-center p-6">
              <Text
                className="text-center mt-4"
                style={{color: colors.textSecondary}}>
                — Tidak ada hasil ditemukan —
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
