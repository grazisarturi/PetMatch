import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const doacoes = [
  {
    id: '1',
    nome: 'Ração para cães',
    observacao: 'Marca é opcional, apenas optamos por rações que não sejam coloridas.',
    imagem: require('../../images/racao-caes.jpg'),
  },
  {
    id: '2',
    nome: 'Ração para gatos',
    observacao: 'Marca é opcional, apenas optamos por rações que não sejam coloridas.',
    imagem: require('../../images/racao-gatos.jpg'),
  },
  {
    id: '3',
    nome: 'Mantinhas',
    observacao: '',
    imagem: require('../../images/mantas.jpg'),
  },
  {
    id: '4',
    nome: 'Vermífugo para cães',
    observacao: '',
    imagem: require('../../images/vermifugo.jpg'),
  },
];

export default function Doacoes({ navigation }) {
  return (
    <View style={styles.container}>
      {/* Topo */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#1a7f37" />
        </TouchableOpacity>
        <Text style={styles.logo}>PetMatch</Text>
        <View style={{ width: 24 }} />
      </View>
      <View style={styles.linhaInferior} />

      {/* Imagem e informações do abrigo */}
      <Image
        source={require('../../images/abrigo-capa.jpg')}
        style={styles.imagemCapa}
      />
      <Image
        source={require('../../images/abrigo-logo.png')}
        style={styles.logoAbrigo}
      />
      <Text style={styles.nomeAbrigo}>
        ABRIGO DE ANIMAIS SÃO FRANCISCO DE ASSIS DE CASCAVEL-PR
      </Text>
      <Text style={styles.local}>
        📍 R. Paranaguá, 1149 - Bairro São Cristóvão, Cascavel - PR
      </Text>

      {/* Lista de doações */}
      <FlatList
        data={doacoes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={item.imagem} style={styles.image} />
            <Text style={styles.name}>{item.nome}</Text>
            {item.observacao ? (
              <Text style={styles.observacao}>
                <Text style={{ fontWeight: 'bold' }}>Observação:</Text> {item.observacao}
              </Text>
            ) : null}
          </View>
        )}
        contentContainerStyle={styles.list}
        numColumns={2}
        showsVerticalScrollIndicator={false}
      />

      {/* Rodapé */}
      <View style={styles.footer}>
        <Ionicons
          name="home-outline"
          size={25}
          color="#fff"
          onPress={() => navigation.navigate('Opcoes')}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 50,
    paddingHorizontal: 20,
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
  imagemCapa: {
    width: '100%',
    height: 130,
    resizeMode: 'cover',
  },
  logoAbrigo: {
    width: 80,
    height: 80,
    borderRadius: 50,
    position: 'absolute',
    top: 230,
    alignSelf: 'center',
    backgroundColor: '#fff',
    borderWidth: 1,
  },
  nomeAbrigo: {
    textAlign: 'center',
    marginTop: 40,
    fontWeight: 'bold',
  },
  local: {
    textAlign: 'center',
    fontSize: 12,
    color: '#555',
    marginBottom: 10,
  },
  list: {
    paddingBottom: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    backgroundColor: '#d9fdd3',
    borderRadius: 12,
    padding: 12,
    margin: 8,
    width: 150,
    alignItems: 'center',
    borderColor: '#1a7f37',
    borderWidth: 1.5,
  },
  image: {
    width: 90,
    height: 90,
    borderRadius: 8,
    marginBottom: 8,
  },
  name: {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 6,
  },
  observacao: {
    fontSize: 12,
    textAlign: 'center',
    color: '#333',
  },
  footer: {
    backgroundColor: '#1a7f37',
    alignItems: 'center',
    padding: 20,
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
});
