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
import {usePlantStore} from '@/shared/store';
import type {SearchResultScreenProps} from '@/shared/types/navigation.types';
import {ArrowLeft, Search, X, Sprout} from 'lucide-react-native';
import type {Plant} from '@/shared/types/plant.types';
import {useTheme} from '@/shared/theme/ThemeContext';
import {getColors} from '@/shared/theme/colors';
import PlantCard from '@/shared/components/PlantCard';
import {useStyles} from '@/shared/theme/styles';

interface RouteParams {
  searchQuery: string;
}

const SearchResult: React.FC<{route: {params: RouteParams}}> = ({route}) => {
  const navigation = useNavigation<SearchResultScreenProps['navigation']>();
  const {searchQuery: initialQuery} = route.params;
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<Plant[]>([]);
  const [hasSearched, setHasSearched] = useState(false);
  const {plants, isFavorite, toggleFavorite} = usePlantStore();
  const {isDarkMode} = useTheme();
  const colors = getColors(isDarkMode);
  const {common} = useStyles();

  const handleSearch = useCallback(
    (query: string) => {
      setSearchQuery(query);
      if (query.trim() === '') {
        setResults([]);
        setHasSearched(false);
        return;
      }

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
        setHasSearched(true);
        setLoading(false);
      }, 300);
    },
    [plants],
  );

  useEffect(() => {
    if (initialQuery.trim() !== '') {
      handleSearch(initialQuery);
    }
  }, [initialQuery, handleSearch]);

  const handleItemPress = (plantId: string) => {
    const plant = plants.find(p => p.id === plantId);
    if (plant) {
      navigation.navigate('Detail', {plantId: plant.id});
    }
  };

  const renderContent = () => {
    if (loading) {
      return (
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      );
    }

    if (!hasSearched) {
      return (
        <View className="flex-1 justify-center items-center p-6">
          <Sprout size={48} color={colors.textSecondary} />
          <Text
            className="text-center mt-4 text-lg"
            style={{color: colors.textSecondary}}>
            Cari tanaman berdasarkan nama atau kategori
          </Text>
          <Text
            className="text-center mt-2"
            style={{color: colors.textTertiary}}>
            Contoh: "Monstera" atau "Indoor"
          </Text>
        </View>
      );
    }

    if (results.length === 0) {
      return (
        <View className="flex-1 justify-center items-center p-6">
          <Text
            className="text-center mt-4"
            style={{color: colors.textSecondary}}>
            — Tidak ada hasil ditemukan —
          </Text>
        </View>
      );
    }

    return (
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
        contentContainerStyle={{
          paddingVertical: 10,
        }}
      />
    );
  };

  return (
    <View className="flex-1" style={common.container}>
      {/* Header */}
      <View
        className="flex-row items-center px-3 pt-10 pb-3 justify-between"
        style={[
          common.header,
          {backgroundColor: isDarkMode ? colors.card : colors.borderLight},
        ]}>
        <View className="flex-row items-center flex-1">
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            className="mr-3">
            <ArrowLeft size={24} color={colors.text} />
          </TouchableOpacity>
          <View
            className="flex-1 rounded-full px-3  flex-row items-center"
            style={{backgroundColor: colors.card}}>
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
      {renderContent()}
    </View>
  );
};

export default SearchResult;
