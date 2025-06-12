import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, ActivityIndicator, TouchableOpacity } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { firebase } from '../../firebase';
import Cabecalho2 from '../../components/Cabecalho2';

const db = firebase.firestore();

export default function DetalhesAnimal() {
  const route = useRoute();
  const navigation = useNavigation();
  const { id } = route.params;

  const [animal, setAnimal] = useState(null);
  const [loading, setLoading] = useState(true);
  const [abrigoInfo, setAbrigoInfo] = useState(null);

  useEffect(() => {
    const buscarAnimal = async () => {
      try {
        const docRef = await db.collection('animais').doc(id).get();
        if (docRef.exists) {
          const animalData = { id: docRef.id, ...docRef.data() };
          setAnimal(animalData);
          if (animalData.abrigoId) {
            const abrigoDoc = await db.collection('abrigos').doc(animalData.abrigoId).get();
            if (abrigoDoc.exists) {
              setAbrigoInfo(abrigoDoc.data());
            }
          }
        }
      } catch (error) {
        console.error('Erro ao buscar animal:', error);
      } finally {
        setLoading(false);
      }
    };
    buscarAnimal();
  }, [id]);

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#1a7f37" />
      </View>
    );
  }

  if (!animal) {
    return (
      <View style={styles.container}>
          <Cabecalho2 navigation={navigation} />
        <Text style={styles.errorText}>Animal não encontrado.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Cabecalho2 navigation={navigation} />
      <View style={styles.divisor} />

      <ScrollView contentContainerStyle={styles.content}>
        <Image
          source={{ uri: 'https://cdn-icons-png.flaticon.com/512/616/616408.png' }}
          style={styles.image}
        />

        <Text style={styles.nome}>
          {animal.nome}, {animal.idade}
        </Text>

        <View style={styles.localBox}>
          <Ionicons name="location-outline" size={16} color="#666" />
          <Text style={styles.localText}>{animal.localizacao}</Text>
        </View>

        <Text style={styles.info}><Text style={styles.bold}>Porte físico:</Text> {animal.porte}</Text>
        <Text style={styles.info}><Text style={styles.bold}>Espécie:</Text> {animal.especie}</Text>
        <Text style={styles.info}><Text style={styles.bold}>Sexo:</Text> {animal.sexo}</Text>
        <Text style={styles.info}><Text style={styles.bold}>Raça:</Text> {animal.raca}</Text>
        <Text style={styles.info}><Text style={styles.bold}>Castrado:</Text> {animal.castrado ? 'Sim' : 'Não'}</Text>
        <Text style={styles.info}><Text style={styles.bold}>Descrição:</Text> {animal.descricao}</Text>

        {abrigoInfo && <Text style={styles.info}><Text style={styles.bold}>Abrigo:</Text> {abrigoInfo.nome}</Text>}
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity onPress={() => navigation.navigate('Opcoes')}>
            <Ionicons name="home-outline" size={30} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('ChatScreen', {
          otherUserId: animal.abrigoId,
          otherUserName: abrigoInfo?.nome || 'Abrigo',
        })}>
            <Ionicons name="paw" size={30} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  content: {
    padding: 20,
    paddingBottom: 100, 
    alignItems: 'center',
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 18,
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },
  divisor: {
    height: 4,
    backgroundColor: '#1a7f37',
  },
  image: {
    width: '100%',
    height: 260,
    resizeMode: 'contain', 
    marginBottom: 20,
    borderRadius: 10,
    backgroundColor: '#f0f0f0', 
  },
  nome: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 6,
  },
  localBox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  localText: {
    color: '#666',
    marginLeft: 5,
  },
  info: {
    fontSize: 16,
    marginBottom: 6,
    color: '#333',
    alignSelf: 'flex-start',
    width: '100%',
  },
  bold: {
    fontWeight: 'bold',
  },
  footer: {
    backgroundColor: '#1a7f37',
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 12,
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
});