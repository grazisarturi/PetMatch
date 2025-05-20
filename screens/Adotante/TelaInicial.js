import React from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';

const pets = [
  {
    id: '1',
    nome: 'Fred',
    cidade: 'Maringá, PR',
    descricao: 'Macho, 5 meses.',
    imagem: require('../../images/fred.jpeg'),
  },
  {
    id: '2',
    nome: 'Lili',
    cidade: 'Cascavel, PR',
    descricao: 'Fêmea, 1 ano.',
    imagem: require('../../images/lili.jpeg'),
  },
  {
    id: '3',
    nome: 'Nala',
    cidade: 'Dois Vizinhos, PR',
    descricao: 'Fêmea, 2 meses.',
    imagem: require('../../images/nala.jpg'),
  },
  {
    id: '4',
    nome: 'Mel',
    cidade: 'Campo Mourão, PR',
    descricao: 'Fêmea, 7 meses.',
    imagem: require('../../images/mel.jpg'),
  },
];

export default function TelaInicial({ navigation }) {
  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Image source={item.imagem} style={styles.image} />
      <View style={styles.cardTextContainer}>
        <Text style={styles.petName}>{item.nome}</Text>
        <Text style={styles.petDesc}>{item.descricao}</Text>
        <Text style={styles.petCity}>{item.cidade}</Text>
      </View>
      <TouchableOpacity
        style={styles.botaoConhecer}
        onPress={() => navigation.navigate('DetalhesAnimal', { petId: item.id })}
      >
        <Text style={styles.botaoTexto}>Conhecer</Text>
        <Ionicons name="paw" size={16} color="#000" style={{ marginLeft: 5 }} />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Cabeçalho */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={{ padding: 10 }}>
          <Ionicons name="arrow-back" size={22} color="#1a7f37" />
        </TouchableOpacity>
        <Text style={styles.logo}>PetMatch</Text>
        <View style={{ width: 22 }} />
      </View>

      <View style={styles.linhaInferior} />

      {/* Banner */}
      <View style={styles.banner}>
        <Text style={styles.bannerText}>Adote um amor,{"\n"}Transforme uma vida!</Text>
      </View>

      {/* Lista */}
      <FlatList
        data={pets}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        numColumns={2}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
      />

      {/* Rodapé com filtros e home */}
      <View style={styles.footer}>
        <TouchableOpacity onPress={() => navigation.navigate('Filtros')}>
          <Ionicons name="options" size={25} color="#fff" />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Opcoes')}>
          <Ionicons name="home-outline" size={25} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: {
    backgroundColor: '#fff',
    paddingTop: 50,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logo: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#1a7f37',
  },
  linhaInferior: {
    height: 4,
    backgroundColor: '#1a7f37',
    width: '100%',
  },
  banner: {
    backgroundColor: '#1a7f37',
    paddingVertical: 20,
    alignItems: 'center',
  },
  bannerText: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  list: {
    padding: 16,
    gap: 10,
    paddingBottom: 80, 
  },
  card: {
    backgroundColor: '#b6e7c9',
    borderRadius: 10,
    margin: 8,
    paddingBottom: 10,
    width: '45%',
    alignItems: 'center',
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 8,
    marginTop: 10,
  },
  cardTextContainer: {
    marginTop: 8,
    alignItems: 'center',
  },
  petName: {
    fontWeight: 'bold',
    fontSize: 14,
    color: '#000',
  },
  petDesc: {
    fontSize: 12,
    color: '#000',
  },
  petCity: {
    fontSize: 12,
    color: '#000',
  },
  botaoConhecer: {
    backgroundColor: '#1a7f37',
    marginTop: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  botaoTexto: {
    color: '#fff',
    fontWeight: 'bold',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#1a7f37',
    paddingVertical: 14,
    paddingBottom: 20,
  },
  footerText: {
    color: '#fff',
    fontSize: 12,
    textAlign: 'center',
    marginTop: 4,
  },
});
