import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
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

  useEffect(() => {
    const buscarAnimal = async () => {
      try {
        const docRef = await db.collection('animais').doc(id).get();
        if (docRef.exists) {
          setAnimal({ id: docRef.id, ...docRef.data() });
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
        <Text style={styles.errorText}>Animal não encontrado.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Cabecalho2 navigation={navigation} />
      <View style={styles.divisor} />

      <ScrollView contentContainerStyle={styles.content}>
        <Image source={{ uri: animal.foto }} style={styles.image} />

        <Text style={styles.nome}>
          {animal.nome}, {animal.idade} {animal.idade == 1 ? 'mês' : 'meses'}
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
      </ScrollView>

{  console.log(animal)}


      <View style={styles.footer}>
        <Ionicons name="home-outline" size={25} color="#fff" onPress={() => navigation.navigate('Opcoes')} />
        <Ionicons name="paw-outline" size={25} color="#fff" onPress={() => navigation.navigate('Chat', {
          abrigoId: animal.abrigoId,
          nomeContato: animal.nome,
        })}/>
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
    resizeMode: 'cover',
    marginBottom: 20,
    borderRadius: 10,
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
  },
  bold: {
    fontWeight: 'bold',
  },
  footer: {
    backgroundColor: '#1a7f37',
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 16,
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
});
