import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function DetalhesAnimal({ route, navigation }) {
  const { petId } = route.params;

  const petData = {
    id: petId,
    nome: 'Lili',
    idade: '12 meses',
    imagem: require('../../images/lili.jpeg'),
    localizacao: 'R. Paranaguá, 1149 - Bairro São Cristóvão, Cascavel - PR',
    porte: 'médio',
    especie: 'felis catus (felino)',
    sexo: 'fêmea',
    raca: 'SDR (sem raça definida)',
    castrado: 'Não',
    descricao:
      'Gatinha de olhos verdes, com pelagem rajada em tons de marrom e cinza. Ela tem um temperamento tranquilo e curioso. É um animal dócil e se dá bem com outros pets.',
  };

  return (
    <View style={styles.container}>
      {/* Cabeçalho */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#1a7f37" />
        </TouchableOpacity>
        <Text style={styles.logo}>PetMatch</Text>
        <View style={{ width: 24 }} />
      </View>
      <View style={styles.linhaInferior} />

      {/* Conteúdo */}
      <ScrollView contentContainerStyle={styles.content}>
        <Image source={petData.imagem} style={styles.image} />
        

        <Text style={styles.name}>{petData.nome}, {petData.idade}</Text>
        <View style={styles.row}>
          <Ionicons name="location-outline" size={16} />
          <Text style={styles.location}>{petData.localizacao}</Text>
        </View>

        <Text style={styles.detail}><Text style={styles.bold}>Porte físico:</Text> {petData.porte}</Text>
        <Text style={styles.detail}><Text style={styles.bold}>Espécie:</Text> {petData.especie}</Text>
        <Text style={styles.detail}><Text style={styles.bold}>Sexo:</Text> {petData.sexo}</Text>
        <Text style={styles.detail}><Text style={styles.bold}>Raça:</Text> {petData.raca}</Text>
        <Text style={styles.detail}><Text style={styles.bold}>Castrado:</Text> {petData.castrado}</Text>

        <Text style={styles.detail}><Text style={styles.bold}>Descrição:</Text> {petData.descricao}</Text>
      </ScrollView>

      {/* Rodapé */}
        <View style={styles.footer}>
          <TouchableOpacity onPress={() => navigation.navigate('Opcoes')}>
            <Ionicons name="home-outline" size={26} color="#fff" />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate('Chat')}
            style={styles.adotarBtn}
          >
            <Ionicons name="heart-outline" size={20} color="#fff" style={{ marginRight: 5}} />
            <Text style={styles.adotar}>Adotar</Text>
          </TouchableOpacity>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: {
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  logo: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1a7f37'
  },
  linhaInferior: {
    height: 4,
    backgroundColor: '#1a7f37',
    width: '100%'
  },
  content: {
    padding: 20
  },
  image: {
    width: '100%',
    height: 240,
    borderRadius: 6,
    marginBottom: 20
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 8
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12
  },
  location: {
    marginLeft: 6,
    fontSize: 14,
    color: '#555'
  },
  detail: {
    fontSize: 16,
    marginBottom: 6
  },
  bold: {
    fontWeight: 'bold'
  },
  footer: {
    backgroundColor: '#1a7f37',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 30,
    paddingVertical: 16,
    alignItems: 'center'
  },
  adotar: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold'
  },

    adotarBtn: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  adotar: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold'
  }

});
