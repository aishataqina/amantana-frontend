// src/screens/Home.tsx
import React from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {plants} from '../data/plants';
import {HomeScreenProps} from '../types/plant.types';
import {ScrollView} from 'react-native-gesture-handler';

const windowWidth = Dimensions.get('window').width;
const cardWidth = (windowWidth - 48) / 2;

const cardShadow = {
  shadowColor: '#000',
  shadowOffset: {
    width: 0,
    height: 1,
  },
  shadowOpacity: 0.15,
  shadowRadius: 2.5,
  elevation: 2,
};

const HomeScreen: React.FC<HomeScreenProps> = ({navigation}) => {
  return (
    <ScrollView>
      <View className="flex-1 bg-gray-50">
        <FlatList
          data={plants}
          numColumns={2}
          keyExtractor={item => item.id}
          className="p-3"
          renderItem={({item}) => (
            <TouchableOpacity
              className="bg-white m-2 overflow-hidden rounded-3xl"
              style={[{width: cardWidth}, cardShadow]}
              onPress={() => navigation.navigate('Detail', {plant: item})}>
              {/* Category Badge */}
              <View
                className="absolute top-2 right-2 z-10 bg-white/80 px-2 py-1 rounded-xl"
                style={cardShadow}>
                <Text className="text-xs text-green-700 font-medium">
                  {item.category}
                </Text>
              </View>

              {/* Image Container */}
              <View className="w-full bg-gray-50/50 rounded-t-3xl overflow-hidden">
                <Image
                  source={{uri: item.image}}
                  className="w-full h-[160px]"
                  resizeMode="cover"
                />
              </View>

              {/* Content */}
              <View className="py-2 px-3">
                <Text className="text-base font-bold text-gray-800">
                  {item.name}
                </Text>

                {/* Difficulty Level */}
                <View className="flex-row items-center mt-1">
                  <View
                    className={`w-2 h-2 rounded-full mr-2 ${
                      item.difficulty === 'Mudah'
                        ? 'bg-green-500 rounded-full'
                        : item.difficulty === 'Sedang'
                        ? 'bg-yellow-500 rounded-full'
                        : 'bg-red-500 rounded-full'
                    }`}
                  />
                  <Text className="text-xs text-gray-500">
                    {item.difficulty}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
    </ScrollView>
  );
};

export default HomeScreen;
