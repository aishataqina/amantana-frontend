import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  Image as RNImage,
} from 'react-native';
import * as ImagePicker from 'react-native-image-picker';
import {SelectList} from 'react-native-dropdown-select-list';
import {useTheme} from '../theme/ThemeContext';
import {getColors} from '../theme/colors';
import {Image} from 'lucide-react-native';
import {useCategoryStore} from '../store/categoryStore';

interface PlantFormProps {
  onSubmit: (formData: FormData) => void;
}

const PlantForm: React.FC<PlantFormProps> = ({onSubmit}) => {
  const {isDarkMode} = useTheme();
  const colors = getColors(isDarkMode);
  const categories = useCategoryStore(state => state.categories);
  const getCategories = useCategoryStore(state => state.getCategories);

  useEffect(() => {
    getCategories();
  }, [getCategories]);

  const [formState, setFormState] = useState({
    name: '',
    category: '',
    difficulty: '',
    description: '',
    benefits: '',
    care: {
      watering: '',
      sunlight: '',
      temperature: '',
      soil: '',
    },
    image: null as any,
  });

  const difficultyOptions = [
    {key: 'Mudah', value: 'Mudah'},
    {key: 'Sedang', value: 'Sedang'},
    {key: 'Sulit', value: 'Sulit'},
  ];

  const categoryOptions = categories.map(category => ({
    key: category.name,
    value: category.name,
  }));

  const handleImagePick = async () => {
    const options: ImagePicker.ImageLibraryOptions = {
      mediaType: 'photo',
      includeBase64: false,
      maxHeight: 2000,
      maxWidth: 2000,
      selectionLimit: 1,
    };

    ImagePicker.launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.log('ImagePicker Error:', response.errorMessage);
        Alert.alert(
          'Error',
          'Terjadi kesalahan saat memilih gambar. Silakan coba lagi.',
          [{text: 'OK'}],
        );
      } else if (response.assets && response.assets[0]) {
        const selectedImage = response.assets[0];
        setFormState({...formState, image: selectedImage});
      }
    });
  };

  const handleSubmit = () => {
    const formData = new FormData();

    if (formState.image) {
      formData.append('image', {
        uri: formState.image.uri,
        type: formState.image.type,
        name: formState.image.fileName || 'image.jpg',
      });
    }
    console.log(formState.care);
    const benefits: string[] = formState.benefits
      .split(',')
      .map((item: string) => item.trim());
    // console.log(benefits);

    formData.append('name', formState.name);
    formData.append('category', formState.category);
    formData.append('difficulty', formState.difficulty);
    formData.append('description', formState.description);
    formData.append('benefits', JSON.stringify(benefits));
    formData.append('care', JSON.stringify(formState.care));

    // console.log(formData);

    onSubmit(formData);

    // Reset form
    setFormState({
      name: '',
      category: '',
      difficulty: '',
      description: '',
      benefits: '',
      care: {
        watering: '',
        sunlight: '',
        temperature: '',
        soil: '',
      },
      image: null,
    });
  };

  return (
    <ScrollView
      className="flex-1 p-4"
      style={{backgroundColor: colors.background}}>
      <View
        className="p-6 mb-4 rounded-xl"
        style={{backgroundColor: colors.card}}>
        <View
          className="w-full min-h-[200px] border-2 border-dashed rounded-xl items-center justify-center p-6"
          style={{
            borderColor: isDarkMode ? colors.border : '#E2E8F0',
            backgroundColor: isDarkMode ? colors.card : '#F7FAFC',
          }}>
          {formState.image ? (
            <View className="w-full items-center">
              <RNImage
                source={{uri: formState.image.uri}}
                className="w-full h-[200px] rounded-lg mb-4"
                resizeMode="cover"
              />
              <TouchableOpacity
                className="px-6 py-3 rounded-lg"
                style={{backgroundColor: colors.primary}}
                onPress={handleImagePick}>
                <Text className="text-white font-semibold text-base">
                  Ganti Foto
                </Text>
              </TouchableOpacity>
            </View>
          ) : (
            <>
              <Image size={48} color={colors.textSecondary} className="mb-3" />
              <Text
                style={{color: colors.textSecondary}}
                className="text-base mb-4">
                Upload foto tanaman
              </Text>
              <TouchableOpacity
                className="px-6 py-3 rounded-lg"
                style={{backgroundColor: colors.primary}}
                onPress={handleImagePick}>
                <Text className="text-white font-semibold text-base">
                  Pilih Foto
                </Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      </View>

      <View
        className="rounded-xl p-4 mb-4"
        style={{backgroundColor: colors.card}}>
        <Text
          style={{color: colors.text}}
          className="text-base font-medium mb-2">
          Nama Tanaman
        </Text>
        <TextInput
          className="rounded-lg p-3"
          style={{
            backgroundColor: isDarkMode ? colors.card : '#F7FAFC',
            borderWidth: 1,
            borderColor: colors.border,
            color: colors.text,
          }}
          value={formState.name}
          onChangeText={text => setFormState({...formState, name: text})}
          placeholder="Masukkan nama tanaman"
          placeholderTextColor={colors.textSecondary}
        />
      </View>

      <View
        className="rounded-xl p-4 mb-4"
        style={{backgroundColor: colors.card}}>
        <Text
          style={{color: colors.text}}
          className="text-base font-medium mb-2">
          Kategori
        </Text>
        <SelectList
          setSelected={(val: string) =>
            setFormState({...formState, category: val})
          }
          data={categoryOptions}
          save="value"
          placeholder="Pilih kategori"
          boxStyles={{
            borderWidth: 1,
            borderColor: colors.border,
            borderRadius: 8,
            backgroundColor: isDarkMode ? colors.card : '#F7FAFC',
          }}
          inputStyles={{color: colors.text}}
          dropdownTextStyles={{color: colors.text}}
        />
      </View>

      <View
        className="rounded-xl p-4 mb-4"
        style={{backgroundColor: colors.card}}>
        <Text
          style={{color: colors.text}}
          className="text-base font-medium mb-2">
          Tingkat Kesulitan
        </Text>
        <SelectList
          setSelected={(val: string) =>
            setFormState({...formState, difficulty: val})
          }
          data={difficultyOptions}
          save="value"
          placeholder="Pilih tingkat kesulitan"
          boxStyles={{
            borderWidth: 1,
            borderColor: colors.border,
            borderRadius: 8,
            backgroundColor: isDarkMode ? colors.card : '#F7FAFC',
          }}
          inputStyles={{color: colors.text}}
          dropdownTextStyles={{color: colors.text}}
        />
      </View>

      <View
        className="rounded-xl p-4 mb-4"
        style={{backgroundColor: colors.card}}>
        <Text
          style={{color: colors.text}}
          className="text-base font-medium mb-2">
          Deskripsi
        </Text>
        <TextInput
          className="rounded-lg p-3 h-[100px]"
          style={{
            backgroundColor: isDarkMode ? colors.card : '#F7FAFC',
            borderWidth: 1,
            borderColor: colors.border,
            color: colors.text,
          }}
          value={formState.description}
          onChangeText={text => setFormState({...formState, description: text})}
          placeholder="Masukkan deskripsi tanaman"
          placeholderTextColor={colors.textSecondary}
          multiline
          textAlignVertical="top"
        />
      </View>

      <View
        className="rounded-xl p-4 mb-4"
        style={{backgroundColor: colors.card}}>
        <Text
          style={{color: colors.text}}
          className="text-base font-medium mb-2">
          Manfaat
        </Text>
        <TextInput
          className="rounded-lg p-3 h-[100px]"
          style={{
            backgroundColor: isDarkMode ? colors.card : '#F7FAFC',
            borderWidth: 1,
            borderColor: colors.border,
            color: colors.text,
          }}
          value={formState.benefits}
          onChangeText={text => setFormState({...formState, benefits: text})}
          placeholder="Masukkan manfaat tanaman"
          placeholderTextColor={colors.textSecondary}
          multiline
          textAlignVertical="top"
        />
      </View>

      <View
        className="rounded-xl p-4 mb-4"
        style={{backgroundColor: colors.card}}>
        <Text
          style={{color: colors.text}}
          className="text-base font-medium mb-2">
          Cara Perawatan
        </Text>

        <Text
          style={{color: colors.text}}
          className="text-base font-medium mb-2">
          Penyiraman
        </Text>
        <TextInput
          className="rounded-lg p-3 mb-4"
          style={{
            backgroundColor: isDarkMode ? colors.card : '#F7FAFC',
            borderWidth: 1,
            borderColor: colors.border,
            color: colors.text,
          }}
          value={formState.care.watering}
          onChangeText={text =>
            setFormState({
              ...formState,
              care: {...formState.care, watering: text},
            })
          }
          placeholder="Contoh: Siram 2-3 kali seminggu"
          placeholderTextColor={colors.textSecondary}
        />

        <Text
          style={{color: colors.text}}
          className="text-base font-medium mb-2">
          Sinar Matahari
        </Text>
        <TextInput
          className="rounded-lg p-3 mb-4"
          style={{
            backgroundColor: isDarkMode ? colors.card : '#F7FAFC',
            borderWidth: 1,
            borderColor: colors.border,
            color: colors.text,
          }}
          value={formState.care.sunlight}
          onChangeText={text =>
            setFormState({
              ...formState,
              care: {...formState.care, sunlight: text},
            })
          }
          placeholder="Contoh: Sinar matahari langsung"
          placeholderTextColor={colors.textSecondary}
        />

        <Text
          style={{color: colors.text}}
          className="text-base font-medium mb-2">
          Suhu
        </Text>
        <TextInput
          className="rounded-lg p-3 mb-4"
          style={{
            backgroundColor: isDarkMode ? colors.card : '#F7FAFC',
            borderWidth: 1,
            borderColor: colors.border,
            color: colors.text,
          }}
          value={formState.care.temperature}
          onChangeText={text =>
            setFormState({
              ...formState,
              care: {...formState.care, temperature: text},
            })
          }
          placeholder="Contoh: 18-28°C"
          placeholderTextColor={colors.textSecondary}
        />

        <Text
          style={{color: colors.text}}
          className="text-base font-medium mb-2">
          Tanah
        </Text>
        <TextInput
          className="rounded-lg p-3"
          style={{
            backgroundColor: isDarkMode ? colors.card : '#F7FAFC',
            borderWidth: 1,
            borderColor: colors.border,
            color: colors.text,
          }}
          value={formState.care.soil}
          onChangeText={text =>
            setFormState({...formState, care: {...formState.care, soil: text}})
          }
          placeholder="Contoh: Tanah gembur dengan drainase baik"
          placeholderTextColor={colors.textSecondary}
        />
      </View>

      <TouchableOpacity
        className="p-4 rounded-lg items-center mt-6 mb-10"
        style={{backgroundColor: colors.primary}}
        onPress={handleSubmit}>
        <Text className="text-white font-semibold text-lg">Simpan</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default PlantForm;
