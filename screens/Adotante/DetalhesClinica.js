import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const itensNecessarios = [
  {
    id: '1',
    nome: 'Ração para gatos',
    descricao: '10% de desconto',
    imagem: require('../../images/racao-gatos.jpg'),
  },
  {
    id: '2',
    nome: 'Ração para cães',
    imagem: require('../../images/racao-caes.jpg'),
  },
];

export default function DetalhesClinica({ route, navigation }) {
  const { clinica } = route.params;

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

      {/* Imagem da clínica */}
      <View style={styles.clinicaImagemContainer}>
        <Image
          source={require('../../images/capa-clinica.jpg')}
          style={styles.imagemClinica}
        />
        <Image
          source={require('../../images/clinica1.png')}
          style={styles.logoSobreImagem}
        />
      </View>

      {/* Nome e local */}
      <Text style={styles.nome}>{clinica.nome}</Text>
      <Text style={styles.localizacao}>📍 {clinica.localizacao}</Text>

      {/* Categorias (barra icônica) */}
      <View style={styles.categorias}>
        <Ionicons name="paw-outline" size={22} color="#fff" />
        <Ionicons name="medkit-outline" size={22} color="#fff" />
        <Ionicons name="shirt-outline" size={22} color="#fff" />
        <Ionicons name="fitness-outline" size={22} color="#fff" />
      </View>

      {/* Lista de itens */}
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
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 50,
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
  clinicaImagemContainer: {
    position: 'relative',
    alignItems: 'center',
  },
  imagemClinica: {
    width: '100%',
    height: 160,
  },
  logoSobreImagem: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderColor: '#fff',
    borderWidth: 2,
    position: 'absolute',
    bottom: -30,
  },
  nome: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 40,
    textAlign: 'center',
  },
  descricao: {
    fontSize: 12,
    textAlign: 'center',
    color: '#333',
  },
  localizacao: {
    fontSize: 12,
    textAlign: 'center',
    color: '#4d4d4d',
    marginBottom: 10,
  },
  categorias: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#1a7f37',
    paddingVertical: 10,
    marginBottom: 10,
  },
  lista: {
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  item: {
    flex: 1,
    backgroundColor: '#b8f0b0',
    margin: 8,
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  itemImagem: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginBottom: 8,
  },
  itemNome: {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
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
