import React, {useEffect} from 'react';
import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import {Flower2, Apple, Pill, Wheat, LeafyGreen} from 'lucide-react-native';
import {useTheme} from '../theme/ThemeContext';
import {getColors} from '../theme/colors';
import {useStyles} from '../theme/styles';
import {CategoryCount} from '../types/category.types';
import {useCategoryStore} from '../store/categoryStore';
import {usePlantStore} from '../store/plantStore';

const windowWidth = Dimensions.get('window').width;

const ICONS: {[key: string]: React.ComponentType<any>} = {
  flower: Flower2,
  apple: Apple,
  pill: Pill,
  wheat: Wheat,
  leafy: LeafyGreen,
};

interface CategoryCardProps {
  onCategoryPress?: (category: CategoryCount) => void;
}

export const CategoryCard: React.FC<CategoryCardProps> = () => {
  const {isDarkMode} = useTheme();
  const colors = getColors(isDarkMode);
  const {typography} = useStyles();
  const {getCategories, categories} = useCategoryStore();
  const {isLoading} = usePlantStore();

  useEffect(() => {
    if (!isLoading) {
      getCategories();
    }
  }, [getCategories, isLoading]);

  const renderCategoryItem = (category: CategoryCount) => {
    const IconComponent = ICONS[category.icon] || Flower2;

    return (
      <View
        key={category.slug}
        className="items-center justify-center mr-4 bg-opacity-10"
        style={{
          backgroundColor: isDarkMode ? colors.card : colors.borderLight,
          padding: 16,
          borderRadius: 12,
          width: (windowWidth - 64) / 3,
        }}>
        <IconComponent size={24} color={colors.primary} />
        <Text
          className="text-sm mt-2 font-medium text-center"
          style={{color: colors.text}}>
          {category.name}
        </Text>
        <Text className="text-xs mt-1" style={{color: colors.textSecondary}}>
          {category.count} tanaman
        </Text>
      </View>
    );
  };

  if (isLoading) {
    return (
      <View className="py-8 justify-center items-center">
        <ActivityIndicator size="small" color={colors.primary} />
      </View>
    );
  }

  return (
    <View className="px-4 pt-6">
      <Text className="text-lg font-bold mb-4" style={typography.h4}>
        Kategori Tanaman
      </Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="pb-2">
        {categories.map(category => renderCategoryItem(category))}
      </ScrollView>
    </View>
  );
};
