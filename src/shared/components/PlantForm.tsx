import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import * as ImagePicker from 'react-native-image-picker';
import {SelectList} from 'react-native-dropdown-select-list';
import {useTheme} from '../theme/ThemeContext';
import {getColors} from '../theme/colors';
interface PlantFormProps {
  onSubmit: (formData: FormData) => void;
}

const PlantForm: React.FC<PlantFormProps> = ({onSubmit}) => {
  const {isDarkMode} = useTheme();
  const colors = getColors(isDarkMode);

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

  const [imageFileName, setImageFileName] = useState<string>('');

  const difficultyOptions = [
    {key: 'Mudah', value: 'Mudah'},
    {key: 'Sedang', value: 'Sedang'},
    {key: 'Sulit', value: 'Sulit'},
  ];

  const categoryOptions = [
    {key: 'Tanaman Obat', value: 'Tanaman Obat'},
    {key: 'Tanaman Hias', value: 'Tanaman Hias'},
    {key: 'Tanaman Buah', value: 'Tanaman Buah'},
  ];

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
        setImageFileName(selectedImage.fileName || 'image.jpg');
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
    setImageFileName('');
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.formGroup}>
        <Text style={[styles.label, {color: colors.text}]}>Foto Tanaman</Text>
        <TouchableOpacity style={styles.imageButton} onPress={handleImagePick}>
          <Text style={styles.imageButtonText}>
            {imageFileName || 'Pilih Gambar'}
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.formGroup}>
        <Text style={[styles.label, {color: colors.text}]}>Nama Tanaman</Text>
        <TextInput
          style={[styles.input, {color: colors.text}]}
          value={formState.name}
          onChangeText={text => setFormState({...formState, name: text})}
          placeholder="Masukkan nama tanaman"
          placeholderTextColor={colors.textSecondary}
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={[styles.label, {color: colors.text}]}>Kategori</Text>
        <SelectList
          setSelected={(val: string) =>
            setFormState({...formState, category: val})
          }
          data={categoryOptions}
          save="value"
          placeholder="Pilih kategori"
          boxStyles={styles.dropdown}
          inputStyles={{color: colors.text}}
          dropdownTextStyles={{color: colors.text}}
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={[styles.label, {color: colors.text}]}>
          Tingkat Kesulitan
        </Text>
        <SelectList
          setSelected={(val: string) =>
            setFormState({...formState, difficulty: val})
          }
          data={difficultyOptions}
          save="value"
          placeholder="Pilih tingkat kesulitan"
          boxStyles={styles.dropdown}
          inputStyles={{color: colors.text}}
          dropdownTextStyles={{color: colors.text}}
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={[styles.label, {color: colors.text}]}>Deskripsi</Text>
        <TextInput
          style={[styles.input, styles.textArea, {color: colors.text}]}
          value={formState.description}
          onChangeText={text => setFormState({...formState, description: text})}
          placeholder="Masukkan deskripsi tanaman"
          placeholderTextColor={colors.textSecondary}
          multiline
          numberOfLines={4}
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={[styles.label, {color: colors.text}]}>Manfaat</Text>
        <TextInput
          style={[styles.input, styles.textArea, {color: colors.text}]}
          value={formState.benefits}
          onChangeText={text => setFormState({...formState, benefits: text})}
          placeholder="Masukkan manfaat tanaman"
          placeholderTextColor={colors.textSecondary}
          multiline
          numberOfLines={4}
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={[styles.label, {color: colors.text}]}>Cara Perawatan</Text>

        <Text style={[styles.label, {color: colors.text}]}>Penyiraman</Text>
        <TextInput
          style={[styles.input, {color: colors.text}]}
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

        <Text style={[styles.label, {color: colors.text}]}>Sinar Matahari</Text>
        <TextInput
          style={[styles.input, {color: colors.text}]}
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

        <Text style={[styles.label, {color: colors.text}]}>Suhu</Text>
        <TextInput
          style={[styles.input, {color: colors.text}]}
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

        <Text style={[styles.label, {color: colors.text}]}>Tanah</Text>
        <TextInput
          style={[styles.input, {color: colors.text}]}
          value={formState.care.soil}
          onChangeText={text =>
            setFormState({...formState, care: {...formState.care, soil: text}})
          }
          placeholder="Contoh: Tanah gembur dengan drainase baik"
          placeholderTextColor={colors.textSecondary}
        />
      </View>

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Simpan</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
  },
  formGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    fontWeight: '500',
  },
  input: {
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#F7FAFC',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  dropdown: {
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 8,
    backgroundColor: '#F7FAFC',
  },
  imageButton: {
    backgroundColor: '#EDF2F7',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  imageButtonText: {
    color: '#4A5568',
    fontSize: 16,
  },
  submitButton: {
    backgroundColor: '#48BB78',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 24,
    marginBottom: 40,
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default PlantForm;
