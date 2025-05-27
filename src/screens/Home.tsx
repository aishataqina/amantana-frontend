// src/screens/Home.tsx
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {plants} from '../data/plants';
import {HomeScreenProps} from '../types/plant.types';

const HomeScreen: React.FC<HomeScreenProps> = ({navigation}) => {
  return (
    <View style={styles.container}>
      {/* <Text style={styles.header}>Tanaman Hias</Text> */}
      <FlatList
        data={plants}
        numColumns={2}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate('Detail', {plant: item})}>
            <Image
              source={{uri: item.image}}
              style={styles.image}
              resizeMode="cover"
            />
            <View style={styles.cardContent}>
              <Text
                // style={styles.plantName}
                className="font-bold text-purple-400">
                {item.name}
              </Text>
            </View>
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const windowWidth = Dimensions.get('window').width;
const cardWidth = (windowWidth - 45) / 2;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    padding: 15,
    color: '#2D3436',
  },
  listContainer: {
    padding: 8,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    margin: 7.5,
    width: cardWidth,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  image: {
    width: '100%',
    height: 150,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  cardContent: {
    padding: 10,
  },
  plantName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2D3436',
    textAlign: 'center',
  },
});

export default HomeScreen;
