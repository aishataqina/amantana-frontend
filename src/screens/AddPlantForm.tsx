import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import * as ImagePicker from 'react-native-image-picker';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useTheme} from '@/shared/theme/ThemeContext';
import {getColors} from '@/shared/theme/colors';

interface PlantFormData {
  image: any;
  name: string;
  category: string;
  difficulty: string;
  description: string;
  benefits: string[];
  care: {
    watering: string;
    sunlight: string;
    temperature: string;
  };
}

const AddPlantForm = () => {
  const {isDarkMode} = useTheme();
  const colors = getColors(isDarkMode);
  const [formData, setFormData] = useState<PlantFormData>({
    image: null,
    name: '',
    category: '',
    difficulty: '',
    description: '',
    benefits: [],
    care: {
      watering: '',
      sunlight: '',
      temperature: '',
    },
  });

  const [benefitInput, setBenefitInput] = useState('');
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleImagePick = () => {
    const options: ImagePicker.ImageLibraryOptions = {
      mediaType: 'photo',
      quality: 1,
    };

    ImagePicker.launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorMessage) {
        console.log('ImagePicker Error: ', response.errorMessage);
      } else if (response.assets && response.assets[0]) {
        setFormData({...formData, image: response.assets[0]});
        setImagePreview(response.assets[0].uri || null);
      }
    });
  };

  const addBenefit = () => {
    if (benefitInput.trim()) {
      setFormData({
        ...formData,
        benefits: [...formData.benefits, benefitInput.trim()],
      });
      setBenefitInput('');
    }
  };

  const handleSubmit = async () => {
    try {
      const formDataToSend = new FormData();

      // Append image
      if (formData.image) {
        formDataToSend.append('image', {
          uri: formData.image.uri,
          type: formData.image.type,
          name: formData.image.fileName || 'image.jpg',
        });
      }

      // Append other fields
      formDataToSend.append('name', formData.name);
      formDataToSend.append('category', formData.category);
      formDataToSend.append('difficulty', formData.difficulty);
      formDataToSend.append('description', formData.description);
      formDataToSend.append('benefits', JSON.stringify(formData.benefits));
      formDataToSend.append('care', JSON.stringify(formData.care));

      // Send to your API endpoint
      const response = await fetch('YOUR_API_ENDPOINT', {
        method: 'POST',
        body: formDataToSend,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      const result = await response.json();
      console.log('Success:', result);
      // Handle success (e.g., show success message, navigate back)
    } catch (error) {
      console.error('Error:', error);
      // Handle error (e.g., show error message)
    }
  };

  return (
    <SafeAreaView
      className="flex-1"
      style={{backgroundColor: colors.background}}>
      <ScrollView className="p-4">
        <Text
          className="text-2xl font-bold mb-5 text-center"
          style={{color: colors.text}}>
          Tambah Tanaman Baru
        </Text>

        {/* Image Picker */}
        <TouchableOpacity
          className="h-[200px] border rounded-lg mb-4 justify-center items-center"
          style={{borderColor: colors.border}}
          onPress={handleImagePick}>
          {imagePreview ? (
            <Image
              source={{uri: imagePreview}}
              className="w-full h-full rounded-lg"
            />
          ) : (
            <Text style={{color: colors.textSecondary}}>Pilih Gambar</Text>
          )}
        </TouchableOpacity>

        {/* Name Input */}
        <View className="mb-4">
          <Text
            className="text-base font-medium mb-2"
            style={{color: colors.text}}>
            Nama Tanaman
          </Text>
          <TextInput
            className="border rounded-lg p-3 text-base"
            style={{
              borderColor: colors.border,
              backgroundColor: isDarkMode ? colors.card : '#F7FAFC',
              color: colors.text,
            }}
            value={formData.name}
            onChangeText={text => setFormData({...formData, name: text})}
            placeholder="Masukkan nama tanaman"
            placeholderTextColor={colors.textSecondary}
          />
        </View>

        {/* Category Input */}
        <View className="mb-4">
          <Text
            className="text-base font-medium mb-2"
            style={{color: colors.text}}>
            Kategori
          </Text>
          <TextInput
            className="border rounded-lg p-3 text-base"
            style={{
              borderColor: colors.border,
              backgroundColor: isDarkMode ? colors.card : '#F7FAFC',
              color: colors.text,
            }}
            value={formData.category}
            onChangeText={text => setFormData({...formData, category: text})}
            placeholder="Masukkan kategori tanaman"
            placeholderTextColor={colors.textSecondary}
          />
        </View>

        {/* Difficulty Input */}
        <View className="mb-4">
          <Text
            className="text-base font-medium mb-2"
            style={{color: colors.text}}>
            Tingkat Kesulitan
          </Text>
          <TextInput
            className="border rounded-lg p-3 text-base"
            style={{
              borderColor: colors.border,
              backgroundColor: isDarkMode ? colors.card : '#F7FAFC',
              color: colors.text,
            }}
            value={formData.difficulty}
            onChangeText={text => setFormData({...formData, difficulty: text})}
            placeholder="Mudah/Sedang/Sulit"
            placeholderTextColor={colors.textSecondary}
          />
        </View>

        {/* Description Input */}
        <View className="mb-4">
          <Text
            className="text-base font-medium mb-2"
            style={{color: colors.text}}>
            Deskripsi
          </Text>
          <TextInput
            className="border rounded-lg p-3 text-base h-[100px]"
            style={{
              borderColor: colors.border,
              backgroundColor: isDarkMode ? colors.card : '#F7FAFC',
              color: colors.text,
              textAlignVertical: 'top',
            }}
            value={formData.description}
            onChangeText={text => setFormData({...formData, description: text})}
            placeholder="Masukkan deskripsi tanaman"
            placeholderTextColor={colors.textSecondary}
            multiline
            numberOfLines={4}
          />
        </View>

        {/* Benefits Input */}
        <View className="mb-4">
          <Text
            className="text-base font-medium mb-2"
            style={{color: colors.text}}>
            Manfaat
          </Text>
          <View className="flex-row items-center">
            <TextInput
              className="flex-1 border rounded-lg p-3 text-base"
              style={{
                borderColor: colors.border,
                backgroundColor: isDarkMode ? colors.card : '#F7FAFC',
                color: colors.text,
              }}
              value={benefitInput}
              onChangeText={setBenefitInput}
              placeholder="Tambah manfaat"
              placeholderTextColor={colors.textSecondary}
            />
            <TouchableOpacity
              className="w-10 h-10 rounded-full justify-center items-center ml-2"
              style={{backgroundColor: colors.primary}}
              onPress={addBenefit}>
              <Text className="text-white text-2xl">+</Text>
            </TouchableOpacity>
          </View>
          {formData.benefits.map((benefit, index) => (
            <Text
              key={index}
              className="text-base mt-2"
              style={{color: colors.text}}>
              • {benefit}
            </Text>
          ))}
        </View>

        {/* Care Inputs */}
        <View className="mb-4">
          <Text
            className="text-base font-medium mb-2"
            style={{color: colors.text}}>
            Perawatan
          </Text>
          <TextInput
            className="border rounded-lg p-3 text-base mb-2"
            style={{
              borderColor: colors.border,
              backgroundColor: isDarkMode ? colors.card : '#F7FAFC',
              color: colors.text,
            }}
            value={formData.care.watering}
            onChangeText={text =>
              setFormData({
                ...formData,
                care: {...formData.care, watering: text},
              })
            }
            placeholder="Penyiraman"
            placeholderTextColor={colors.textSecondary}
          />
          <TextInput
            className="border rounded-lg p-3 text-base mb-2"
            style={{
              borderColor: colors.border,
              backgroundColor: isDarkMode ? colors.card : '#F7FAFC',
              color: colors.text,
            }}
            value={formData.care.sunlight}
            onChangeText={text =>
              setFormData({
                ...formData,
                care: {...formData.care, sunlight: text},
              })
            }
            placeholder="Pencahayaan"
            placeholderTextColor={colors.textSecondary}
          />
          <TextInput
            className="border rounded-lg p-3 text-base"
            style={{
              borderColor: colors.border,
              backgroundColor: isDarkMode ? colors.card : '#F7FAFC',
              color: colors.text,
            }}
            value={formData.care.temperature}
            onChangeText={text =>
              setFormData({
                ...formData,
                care: {...formData.care, temperature: text},
              })
            }
            placeholder="Suhu"
            placeholderTextColor={colors.textSecondary}
          />
        </View>

        <TouchableOpacity
          className="p-3 rounded-lg items-center mt-2"
          style={{backgroundColor: colors.primary}}
          onPress={handleSubmit}>
          <Text className="text-white font-bold">
            Test Notifikasi (5 detik)
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AddPlantForm;
