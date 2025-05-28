import React from 'react';
import {View, TouchableOpacity, StyleSheet, Text, Keyboard} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {HomeScreenProps} from '../types/navigation.types';
import {Search} from 'lucide-react-native';
import {useTheme} from '../theme/ThemeContext';
import {getColors} from '../theme/colors';

interface SearchBarProps {
  placeholder?: string;
  containerStyle?: any;
  initialQuery?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({
  placeholder = 'Cari tanaman',
  containerStyle,
  initialQuery = '',
}) => {
  const navigation = useNavigation<HomeScreenProps['navigation']>();
  const {isDarkMode} = useTheme();
  const colors = getColors(isDarkMode);

  const handlePress = () => {
    // Dismiss keyboard if it's open
    Keyboard.dismiss();

    // Navigate to search screen with query
    navigation.getParent()?.navigate('SearchResult', {
      searchQuery: initialQuery,
    });
  };

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={handlePress}
      style={[styles.container, containerStyle]}>
      <View
        style={[
          styles.searchContainer,
          {backgroundColor: isDarkMode ? colors.card : colors.borderLight},
        ]}>
        <Search size={20} color={colors.textTertiary} />
        <Text style={[styles.placeholder, {color: colors.textTertiary}]}>
          {placeholder}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 12,
    marginVertical: 8,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 18,
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  placeholder: {
    marginLeft: 10,
    fontSize: 16,
  },
});

export default SearchBar;
