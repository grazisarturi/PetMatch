import React from 'react';
import { View, Text, StyleSheet, Image, FlatList } from 'react-native';

const itensNecessarios = [
  {
    id: '1',
    nome: 'Guia para cães',
    imagem: require('../assets/guia.jpg'),
  },
  {
    id: '2',
    nome: 'Coleiras',
    imagem: require('../assets/coleira.jpg'),
  },
];

export default function DetalhesClinica({ route }) {
  const { clinica } = route.params;

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/clinica.jpg')}
        style={styles.imagem}
        resizeMode="cover"
      />
      <Text style={styles.nome}>{clinica.nome}</Text>
      <Text style={styles.localizacao}>{clinica.localizacao}</Text>

      <Text style={styles.subtitulo}>Itens que a clínica precisa 🐾</Text>

      <FlatList
        data={itensNecessarios}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={styles.lista}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Image source={item.imagem} style={styles.itemImagem} />
            <Text style={styles.itemNome}>{item.nome}</Text>
          </View>
        )}
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
  imagem: {
    width: '100%',
    height: 180,
    borderRadius: 10,
    marginBottom: 16,
  },
  nome: {
    fontSize: 22,
    fontWeight: '700',
    textAlign: 'center',
  },
  localizacao: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 16,
  },
  subtitulo: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
    marginTop: 12,
  },
  lista: {
    alignItems: 'center',
  },
  item: {
    width: 150,
    alignItems: 'center',
    margin: 10,
    backgroundColor: '#f2f2f2',
    padding: 10,
    borderRadius: 10,
  },
  itemImagem: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginBottom: 8,
  },
  itemNome: {
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
  },
});
