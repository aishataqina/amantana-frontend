import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

type DetailScreenProps = {
  navigation: NativeStackNavigationProp<any>;
};

const DetailScreen: React.FC<DetailScreenProps> = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Halaman Detail</Text>
      <Text style={styles.description}>
        Ini adalah halaman detail yang bisa diisi dengan konten yang diinginkan
      </Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.goBack()}>
        <Text style={styles.buttonText}>Kembali ke Home</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 20,
  },
  description: {
    fontSize: 16,
    color: '#666666',
    textAlign: 'center',
    marginBottom: 30,
  },
  button: {
    backgroundColor: '#FFC0CB',
    padding: 15,
    borderRadius: 8,
    width: '80%',
  },
  buttonText: {
    color: '#000000',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default DetailScreen;
