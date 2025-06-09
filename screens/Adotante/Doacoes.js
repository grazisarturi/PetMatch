// screens/Adotante/Doacoes.js
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Cabecalho2 from '../../components/Cabecalho2';
import { firebase } from '../../firebase';

const db = firebase.firestore();

export default function Doacoes({ route, navigation }) {
  const { abrigo } = route.params;
  const [doacoes, setDoacoes] = useState([]);

  useEffect(() => {
    const unsubscribe = db.collection('doacoes')
      .where('abrigo', '==', abrigo.abrigo || abrigo.nome)
      .onSnapshot(snapshot => {
        const lista = [];
        snapshot.forEach(doc => {
          lista.push({ id: doc.id, ...doc.data() });
        });
        setDoacoes(lista);
      });

    return () => unsubscribe();
  }, []);

  return (
    <View style={styles.container}>
      <Cabecalho2 navigation={navigation} />

      <Image source={require('../../images/capa.jpg')} style={styles.imagemCapa} />
      <Image source={require('../../images/logo.png')} style={styles.logoAbrigo} />
      <Text style={styles.nomeAbrigo}>{abrigo.abrigo || abrigo.nome}</Text>
      <Text style={styles.local}>📍 {abrigo.localizacao}</Text>

      <FlatList
        data={doacoes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={require('../../images/racao-caes.jpg')} style={styles.image} />
            <Text style={styles.name}>{item.item}</Text>
            {item.descricao ? (
              <Text style={styles.observacao}>
                <Text style={{ fontWeight: 'bold' }}>Observação:</Text> {item.descricao}
              </Text>
            ) : null}
          </View>
        )}
        contentContainerStyle={styles.list}
        numColumns={2}
        showsVerticalScrollIndicator={false}
      />

      <View style={styles.footer}>
        <Ionicons name="home-outline" size={25} color="#fff" onPress={() => navigation.navigate('Opcoes')} />
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
    marginTop: 70,
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
