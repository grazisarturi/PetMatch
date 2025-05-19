import React from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';

const pets = [
  { id: '1', nome: 'Fred', imagem: require('../assets/fred.jpg') },
  { id: '2', nome: 'Lili', imagem: require('../assets/lili.jpg') },
  { id: '3', nome: 'Nala', imagem: require('../assets/nala.jpg') },
  { id: '4', nome: 'Mel', imagem: require('../assets/mel.jpg') },
];

export default function Home({ navigation }) {
  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Image source={item.imagem} style={styles.image} />
      <Text style={styles.name}>{item.nome}</Text>
      <TouchableOpacity onPress={() => navigation.navigate('AnimalDetails', { petId: item.id })}>
        <Text style={styles.link}>Conhecer</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Adote um amor, transforme uma vida!</Text>
      <FlatList
        data={pets}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        numColumns={2}
        contentContainerStyle={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 20,
    fontWeight: 'bold',
  },
  list: {
    justifyContent: 'space-around',
  },
  card: {
    backgroundColor: '#e0f2f1',
    borderRadius: 10,
    padding: 10,
    margin: 10,
    width: '45%',
    alignItems: 'center',
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  link: {
    marginTop: 5,
    color: '#2e7d32',
    fontWeight: '600',
  },
});
