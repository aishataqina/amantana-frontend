// src/screens/Home.tsx
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

type HomeScreenProps = {
  navigation: NativeStackNavigationProp<any>;
};

const HomeScreen: React.FC<HomeScreenProps> = ({navigation}) => {
  return (
    <ScrollView style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Selamat Datang</Text>
        <Text style={styles.headerSubtitle}>di Aplikasi Kita</Text>
      </View>

      {/* Menu Section */}
      <View style={styles.menuContainer}>
        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => navigation.navigate('Detail')}>
          <Text style={styles.menuText}>Ke Halaman Detail</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuText}>Menu 2</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuText}>Menu 3</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuText}>Menu 4</Text>
        </TouchableOpacity>
      </View>

      {/* Content Section */}
      <View style={styles.content}>
        <TouchableOpacity
          style={styles.detailButton}
          onPress={() => navigation.navigate('Detail')}>
          <Text style={styles.detailButtonText}>Lihat Detail</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    padding: 20,
    backgroundColor: '#f8f8f8',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000000',
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#666666',
    marginTop: 5,
  },
  menuContainer: {
    padding: 15,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  menuItem: {
    width: '48%',
    backgroundColor: '#f0f0f0',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  menuText: {
    fontSize: 16,
    color: '#333333',
    textAlign: 'center',
  },
  content: {
    padding: 20,
    alignItems: 'center',
  },
  detailButton: {
    backgroundColor: '#FFC0CB',
    padding: 15,
    borderRadius: 8,
    width: '100%',
    marginTop: 20,
  },
  detailButtonText: {
    color: '#000000',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default HomeScreen;
