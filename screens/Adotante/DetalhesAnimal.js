import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';

export default function AnimalDetails({ route }) {
  const { petId } = route.params;

  // Exemplo de dados (em projeto real, puxar de um backend)
  const petData = {
    id: petId,
    nome: 'Lili',
    idade: '12 meses',
    imagem: require('../assets/lili.jpg'),
    localizacao: 'Cascavel - PR',
    porte: 'Médio',
    especie: 'Felix catus (gato)',
    sexo: 'Fêmea',
    raca: 'SRD (sem raça definida)',
    castrado: 'Não',
    descricao:
      'Gatinha de olhos verdes, com pelagem rajada em tons de marrom e cinza. Ela tem um temperamento tranquilo e curioso. É um animal dócil e se dá bem com outros pets.',
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={petData.imagem} style={styles.image} />
      <Text style={styles.name}>{petData.nome}, {petData.idade}</Text>
      <Text style={styles.info}>📍 {petData.localizacao}</Text>
      <Text style={styles.detail}>Porte físico: {petData.porte}</Text>
      <Text style={styles.detail}>Espécie: {petData.especie}</Text>
      <Text style={styles.detail}>Sexo: {petData.sexo}</Text>
      <Text style={styles.detail}>Raça: {petData.raca}</Text>
      <Text style={styles.detail}>Castrado: {petData.castrado}</Text>
      <Text style={styles.description}>{petData.descricao}</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  image: {
    width: 220,
    height: 220,
    borderRadius: 10,
    marginBottom: 20,
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  info: {
    fontSize: 16,
    color: '#555',
    marginBottom: 10,
  },
  detail: {
    fontSize: 16,
    marginBottom: 6,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    marginTop: 20,
    textAlign: 'center',
    lineHeight: 22,
  },
});
