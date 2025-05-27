// src/screens/Detail.tsx
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  Dimensions,
} from 'react-native';
import {DetailScreenProps} from '../types/plant.types';

const DetailScreen: React.FC<DetailScreenProps> = ({route}) => {
  const {plant} = route.params;

  return (
    <ScrollView style={styles.container}>
      <Image
        source={{uri: plant.image}}
        style={styles.image}
        resizeMode="cover"
      />

      <View style={styles.content}>
        <Text style={styles.title}>{plant.name}</Text>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Deskripsi</Text>
          <Text style={styles.description}>{plant.description}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Manfaat</Text>
          {plant.benefits.map((benefit, index) => (
            <View key={index} style={styles.benefitItem}>
              <Text style={styles.bullet}>•</Text>
              <Text style={styles.benefitText}>{benefit}</Text>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Cara Perawatan</Text>

          <View style={styles.careItem}>
            <Text style={styles.careTitle}>Penyiraman:</Text>
            <Text style={styles.careText}>{plant.care.watering}</Text>
          </View>

          <View style={styles.careItem}>
            <Text style={styles.careTitle}>Cahaya:</Text>
            <Text style={styles.careText}>{plant.care.sunlight}</Text>
          </View>

          <View style={styles.careItem}>
            <Text style={styles.careTitle}>Suhu:</Text>
            <Text style={styles.careText}>{plant.care.temperature}</Text>
          </View>

          <View style={styles.careItem}>
            <Text style={styles.careTitle}>Media Tanam:</Text>
            <Text style={styles.careText}>{plant.care.soil}</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  image: {
    width: Dimensions.get('window').width - 32,
    height: 200,
    borderRadius: 24,
    marginHorizontal: 16,
    marginTop: 16,
    marginBottom: 8,
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2D3436',
    marginBottom: 20,
  },
  section: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2D3436',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: '#636E72',
    lineHeight: 24,
  },
  benefitItem: {
    flexDirection: 'row',
    marginBottom: 8,
    paddingLeft: 5,
  },
  bullet: {
    fontSize: 16,
    marginRight: 10,
    color: '#00B894',
  },
  benefitText: {
    fontSize: 16,
    color: '#636E72',
    flex: 1,
  },
  careItem: {
    marginBottom: 12,
  },
  careTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2D3436',
    marginBottom: 4,
  },
  careText: {
    fontSize: 16,
    color: '#636E72',
  },
});

export default DetailScreen;
