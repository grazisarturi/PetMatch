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
import Cabecalho2 from '../../components/Cabecalho2';

export default function DetalhesClinica({ route, navigation }) {
  const { clinica } = route.params;

  return (
    <View style={styles.container}>
      <Cabecalho2 navigation={navigation} />

      <View style={styles.clinicaImagemContainer}>
        <Image
          source={{ uri: clinica.capaUrl || 'https://via.placeholder.com/400x200.png?text=Capa+da+Clínica' }}
          style={styles.imagemClinica}
        />
        <Image
          source={{ uri: clinica.logoUrl || 'https://via.placeholder.com/100x100.png?text=Logo' }}
          style={styles.logoSobreImagem}
        />
      </View>

      <Text style={styles.nome}>{clinica.nome}</Text>
      <Text style={styles.localizacao}>📍 {clinica.localizacao}</Text>

      <View style={styles.categorias}>
        <Ionicons name="paw-outline" size={22} color="#fff" />
        <Ionicons name="medkit-outline" size={22} color="#fff" />
        <Ionicons name="shirt-outline" size={22} color="#fff" />
        <Ionicons name="fitness-outline" size={22} color="#fff" />
      </View>

      <FlatList
        data={clinica.itens || []}
        keyExtractor={(_, index) => index.toString()}
        numColumns={2}
        contentContainerStyle={styles.lista}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Image
              source={{ uri: item.imagemUrl || 'https://via.placeholder.com/80x80.png?text=Item' }}
              style={styles.itemImagem}
            />
            <Text style={styles.itemNome}>{item.nome}</Text>
          </View>
        )}
      />

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
    backgroundColor: '#fff'
  },
  nome: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 40,
    textAlign: 'center',
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
