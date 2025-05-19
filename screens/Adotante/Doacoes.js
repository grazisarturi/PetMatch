import React from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';

const doacoes = [
  {
    id: '1',
    nome: 'Ração para cães',
    imagem: require('../assets/racao-caes.jpg'),
  },
  {
    id: '2',
    nome: 'Ração para gatos',
    imagem: require('../assets/racao-gatos.jpg'),
  },
  {
    id: '3',
    nome: 'Mantas',
    imagem: require('../assets/mantas.jpg'),
  },
  {
    id: '4',
    nome: 'Vermífugo para cães',
    imagem: require('../assets/vermifugo.jpg'),
  },
];

export default function Doacoes() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Doações disponíveis para o abrigo São Francisco 🐾
      </Text>

      <FlatList
        data={doacoes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.card}>
            <Image source={item.imagem} style={styles.image} />
            <Text style={styles.name}>{item.nome}</Text>
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.list}
        numColumns={2}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
    textAlign: 'center',
  },
  list: {
    alignItems: 'center',
  },
  card: {
    backgroundColor: '#f2f2f2',
    borderRadius: 12,
    padding: 12,
    margin: 8,
    width: 150,
    alignItems: 'center',
  },
  image: {
    width: 90,
    height: 90,
    borderRadius: 8,
    marginBottom: 8,
  },
  name: {
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
  },
});
