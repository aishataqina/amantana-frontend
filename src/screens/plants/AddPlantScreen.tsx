import React from 'react';
import {SafeAreaView, Alert} from 'react-native';
import PlantForm from '../../shared/components/PlantForm';
import {useTheme} from '../../shared/theme/ThemeContext';
import {getColors} from '../../shared/theme/colors';
import {usePlantStore} from '../../shared/store';
import api from '../../shared/services/api.config';

const AddPlantScreen: React.FC = () => {
  const {isDarkMode} = useTheme();
  const colors = getColors(isDarkMode);
  const fetchPlants = usePlantStore(state => state.fetchPlants);

  const handleSubmit = async (formData: FormData) => {
    try {
      const response = await api.post('/plants', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 201 || response.status === 200) {
        Alert.alert('Sukses', 'Tanaman berhasil ditambahkan');
        // Refresh daftar tanaman
        await fetchPlants();
      } else {
        throw new Error('Gagal menambahkan tanaman');
      }
    } catch (error) {
      console.error('Error:', error);
      Alert.alert(
        'Error',
        'Terjadi kesalahan saat menambahkan tanaman. Silakan coba lagi.',
      );
    }
  };

  return (
    <SafeAreaView
      className="flex-1"
      style={{backgroundColor: colors.background}}>
      <PlantForm onSubmit={handleSubmit} />
    </SafeAreaView>
  );
};

export default AddPlantScreen;
