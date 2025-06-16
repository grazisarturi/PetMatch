import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Cabecalho2 from '../../components/Cabecalho2';
import { firebase } from '../../firebase';

const db = firebase.firestore();

export default function Doacoes({ route, navigation }) {
  const { abrigoId, abrigoNome, abrigoLocalizacao } = route.params;
  const [doacoes, setDoacoes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!abrigoId) {
        setLoading(false);
        return;
    };

    const unsubscribe = db.collection('doacoes')
      .where('abrigoId', '==', abrigoId)
      .onSnapshot(snapshot => {
        const lista = [];
        snapshot.forEach(doc => {
          lista.push({ id: doc.id, ...doc.data() });
        });
        setDoacoes(lista);
        setLoading(false);
      });

    return () => unsubscribe();
  }, [abrigoId]);

  return (
    <View style={styles.container}>
      <Cabecalho2 navigation={navigation} />

      <Image source={require('../../images/capa.jpg')} style={styles.imagemCapa} />
      <Image source={require('../../images/logo.png')} style={styles.logoAbrigo} />
      
      <Text style={styles.nomeAbrigo}>{abrigoNome}</Text>
      <Text style={styles.local}>📍 {abrigoLocalizacao}</Text>

      {loading ? (
        <ActivityIndicator size="large" color="#1a7f37"/>
      ) : (
        <FlatList
            data={doacoes}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
            <View style={styles.card}>
                <Image source={{uri: item.imagem || 'https://images.tcdn.com.br/img/img_prod/749536/racao_three_dogs_orig_para_caes_adultos_racas_pequenas_frango_carne_e_arroz_1kg_1529_1_f1068205628b03126f59cd68c92a9900.jpg'}} style={styles.image} />
                <Text style={styles.name}>{item.item}</Text>
                <Text style={styles.quantity}>Qtd: {item.quantidade}</Text>
                {item.descricao ? (
                <Text style={styles.observacao} numberOfLines={2}>
                    <Text style={{ fontWeight: 'bold' }}>Obs:</Text> {item.descricao}
                </Text>
                ) : null}
            </View>
            )}
            ListEmptyComponent={<Text style={styles.emptyText}>Este abrigo não tem pedidos de doação no momento.</Text>}
            contentContainerStyle={styles.list}
            numColumns={2}
            showsVerticalScrollIndicator={false}
        />
      )}

      <View style={styles.footer}>
        <Ionicons name="home-outline" size={25} color="#fff" onPress={() => navigation.navigate('Opcoes')} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
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
    top: 150, 
    alignSelf: 'center',
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#1a7f37'
  },
  nomeAbrigo: {
    textAlign: 'center',
    marginTop: 60,
    fontWeight: 'bold',
    fontSize: 18
  },
  local: {
    textAlign: 'center',
    fontSize: 12,
    color: '#555',
    marginBottom: 10,
  },
  list: {
    paddingBottom: 80,
    paddingHorizontal: 10
  },
  card: {
    backgroundColor: '#d9fdd3',
    borderRadius: 12,
    padding: 12,
    margin: 8,
    flex: 1, 
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
    marginBottom: 4,
  },
  quantity: {
    fontSize: 13,
    color: '#333'
  },
  observacao: {
    fontSize: 12,
    textAlign: 'center',
    color: '#555',
    marginTop: 4,
  },
  footer: {
    backgroundColor: '#1a7f37',
    alignItems: 'center',
    padding: 20,
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
   emptyText: {
    width: '100%',
    textAlign: 'center',
    marginTop: 50,
    fontSize: 16,
    color: '#888'
  }
});