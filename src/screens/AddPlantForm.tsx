import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  StyleSheet,
  Platform,
} from 'react-native';
import * as ImagePicker from 'react-native-image-picker';
import { SafeAreaView } from 'react-native-safe-area-context';

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

    ImagePicker.launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorMessage) {
        console.log('ImagePicker Error: ', response.errorMessage);
      } else if (response.assets && response.assets[0]) {
        setFormData({ ...formData, image: response.assets[0] });
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
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Text style={styles.title}>Tambah Tanaman Baru</Text>

        {/* Image Picker */}
        <TouchableOpacity style={styles.imagePickerButton} onPress={handleImagePick}>
          {imagePreview ? (
            <Image source={{ uri: imagePreview }} style={styles.imagePreview} />
          ) : (
            <Text>Pilih Gambar</Text>
          )}
        </TouchableOpacity>

        {/* Name Input */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Nama Tanaman</Text>
          <TextInput
            style={styles.input}
            value={formData.name}
            onChangeText={(text) => setFormData({ ...formData, name: text })}
            placeholder="Masukkan nama tanaman"
          />
        </View>

        {/* Category Input */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Kategori</Text>
          <TextInput
            style={styles.input}
            value={formData.category}
            onChangeText={(text) => setFormData({ ...formData, category: text })}
            placeholder="Masukkan kategori tanaman"
          />
        </View>

        {/* Difficulty Input */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Tingkat Kesulitan</Text>
          <TextInput
            style={styles.input}
            value={formData.difficulty}
            onChangeText={(text) => setFormData({ ...formData, difficulty: text })}
            placeholder="Mudah/Sedang/Sulit"
          />
        </View>

        {/* Description Input */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Deskripsi</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            value={formData.description}
            onChangeText={(text) => setFormData({ ...formData, description: text })}
            placeholder="Masukkan deskripsi tanaman"
            multiline
            numberOfLines={4}
          />
        </View>

        {/* Benefits Input */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Manfaat</Text>
          <View style={styles.benefitsContainer}>
            <TextInput
              style={styles.input}
              value={benefitInput}
              onChangeText={setBenefitInput}
              placeholder="Tambah manfaat"
            />
            <TouchableOpacity style={styles.addButton} onPress={addBenefit}>
              <Text style={styles.addButtonText}>+</Text>
            </TouchableOpacity>
          </View>
          {formData.benefits.map((benefit, index) => (
            <Text key={index} style={styles.benefitItem}>• {benefit}</Text>
          ))}
        </View>

        {/* Care Inputs */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Perawatan</Text>
          <TextInput
            style={styles.input}
            value={formData.care.watering}
            onChangeText={(text) => setFormData({
              ...formData,
              care: { ...formData.care, watering: text }
            })}
            placeholder="Penyiraman"
          />
          <TextInput
            style={styles.input}
            value={formData.care.sunlight}
            onChangeText={(text) => setFormData({
              ...formData,
              care: { ...formData.care, sunlight: text }
            })}
            placeholder="Pencahayaan"
          />
          <TextInput
            style={styles.input}
            value={formData.care.temperature}
            onChangeText={(text) => setFormData({
              ...formData,
              care: { ...formData.care, temperature: text }
            })}
            placeholder="Suhu"
          />
        </View>

        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Simpan</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  inputContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    fontWeight: '500',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  imagePickerButton: {
    height: 200,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    marginBottom: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imagePreview: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
  },
  benefitsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  addButton: {
    backgroundColor: '#007AFF',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 24,
  },
  benefitItem: {
    fontSize: 16,
    marginTop: 8,
  },
  submitButton: {
    backgroundColor: '#007AFF',
    padding: 16,
    borderRadius: 8,
    marginTop: 20,
    marginBottom: 40,
  },
  submitButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default AddPlantForm; 