import React from 'react';
import {View, TouchableOpacity, StyleSheet, Text, Keyboard} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {HomeScreenProps} from '../types/navigation.types';
import {Search} from 'lucide-react-native';

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
      <View style={styles.searchContainer}>
        <Search size={20} color="#9CA3AF" />
        <Text style={styles.placeholder}>{placeholder}</Text>
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
    backgroundColor: '#F3F4F6',
    borderRadius: 18,
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  placeholder: {
    color: '#9CA3AF',
    marginLeft: 10,
    fontSize: 16,
  },
});

export default SearchBar;
