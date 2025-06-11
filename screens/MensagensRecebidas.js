import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { firebase } from '../firebase';

export default function MensagensRecebidas({ navigation }) {
  const [mensagens, setMensagens] = useState([]);
  const abrigoId = firebase.auth().currentUser.uid;

  useEffect(() => {
    const unsubscribe = firebase
      .firestore()
      .collection('mensagens')
      .where('para', '==', abrigoId)
      .onSnapshot((snapshot) => {
        const agrupadas = {};

        snapshot.forEach((doc) => {
          const data = doc.data();
          if (!agrupadas[data.de]) {
            agrupadas[data.de] = {
              ...data,
              id: doc.id,
            };
          }
        });

        setMensagens(Object.values(agrupadas));
      });

    return () => unsubscribe();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#1a7f37" />
        </TouchableOpacity>
        <Text style={styles.title}>Mensagens</Text>
        <View style={{ width: 24 }} />
      </View>
      <View style={styles.linhaInferior} />

      <ScrollView contentContainerStyle={styles.listContainer}>
        {mensagens.map((msg) => (
          <TouchableOpacity
            key={msg.id}
            style={styles.card}
            onPress={() =>
              navigation.navigate('ChatAbrigo', {
                userId: msg.de,
                nome: msg.nome,
              })
            }
          >
            <View style={styles.infoContainer}>
              <Image
                source={require('../images/fred.jpeg')}
                style={styles.imagem}
              />
              <View>
                <Text style={styles.pet}>Pet</Text>
                <Text style={styles.nome}>{msg.nome}</Text>
                <Text>{msg.texto}</Text>
              </View>
            </View>
            <Text style={styles.hora}>
              {msg.criadoEm?.toDate().toLocaleTimeString() || '-'}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <View style={styles.footer}>
        <Ionicons
          name="home-outline"
          size={24}
          color="#fff"
          onPress={() => navigation.navigate('AbrigoDashboard')}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: {
    backgroundColor: '#fff',
    paddingVertical: 30,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 20,
  },
  title: { fontSize: 35, fontWeight: 'bold', color: '#1a7f37' },
  linhaInferior: { height: 7, backgroundColor: '#1a7f37' },
  listContainer: { padding: 20 },
  card: {
    backgroundColor: '#d1f2d1',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
  },
  infoContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 4,
  },
  imagem: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  pet: { fontWeight: 'bold' },
  nome: { color: '#333' },
  hora: {
    textAlign: 'right',
    fontSize: 12,
    color: '#555',
  },
  footer: {
    backgroundColor: '#1a7f37',
    alignItems: 'center',
    padding: 20,
    marginBottom: 10,
  },
});
