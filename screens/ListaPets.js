import React, { useEffect, useState } from 'react';
import {
  View, Text, StyleSheet, Image,
  TouchableOpacity, ScrollView, Alert, ActivityIndicator
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { firebase } from '../firebase';
import { useIsFocused } from '@react-navigation/native';
import Cabecalho2 from '../components/Cabecalho2';

const db = firebase.firestore();

export default function ListaPets({ navigation }) {
  const [animais, setAnimais] = useState([]);
  const [loading, setLoading] = useState(true); 
  const isFocused = useIsFocused();
  
  const userId = firebase.auth().currentUser?.uid;

  useEffect(() => {
    if (isFocused && userId) { 
      const unsubscribe = db.collection('animais')
        .where('abrigoId', '==', userId)
        .onSnapshot(snapshot => {
          const lista = [];
          snapshot.forEach(doc => {
            lista.push({ id: doc.id, ...doc.data() });
          });
          setAnimais(lista);
          setLoading(false); 
        });
      return () => unsubscribe();
    } else {
      setLoading(false);
    }
  }, [isFocused, userId]);

  const excluirAnimal = (id) => {
    Alert.alert(
      'Confirmar exclusão',
      'Tem certeza que deseja excluir este animal?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Excluir',
          onPress: async () => {
            try {
              await db.collection('animais').doc(id).delete();
              Alert.alert('Sucesso', 'Animal excluído.');
            } catch (error) {
              Alert.alert('Erro', 'Não foi possível excluir o animal.');
            }
          },
          style: 'destructive',
        },
      ]
    );
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#1a7f37" style={{flex: 1}}/>
  }

  return (
    <View style={styles.container}>
      <Cabecalho2 navigation={navigation} />

      <ScrollView contentContainerStyle={styles.listContainer}>
        {animais.length === 0 ? (
          <Text style={styles.emptyText}>Nenhum animal cadastrado ainda.</Text>
        ) : (
          animais.map((item) => (
            <View key={item.id} style={styles.card}>
              <Image
                source={{ uri: item.imagem || 'https://via.placeholder.com/80' }}
                style={styles.image}
              />
              <View style={{ flex: 1 }}>
                <Text style={styles.nome}>{item.nome}</Text>
                <Text style={styles.info}>{item.raca}</Text>
                <Text style={styles.info}>{item.idade}</Text>
              </View>
              <View style={styles.botoes}>
                <TouchableOpacity style={styles.botaoEditar} onPress={() => navigation.navigate('EditarAnimal', { animal: item })}>
                  <Text style={styles.textoEditar}>Editar</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.botaoExcluir} onPress={() => excluirAnimal(item.id)}>
                  <Text style={styles.textoExcluir}>Excluir</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))
        )}

        <TouchableOpacity
          style={styles.adicionarButton}
          onPress={() => navigation.navigate('CadastroAnimal')}
        >
          <Ionicons name="add" size={20} color="#fff" />
          <Text style={styles.adicionarTexto}>Cadastrar novo animal</Text>
        </TouchableOpacity>
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
  listContainer: {
    padding: 20,
    paddingBottom: 100,
  },
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
    backgroundColor: '#f8f8f8',
    gap: 12
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 10,
  },
  nome: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 2
  },
  info: {
    color: '#333',
    marginBottom: 2
  },
  botoes: {
    justifyContent: 'center',
    alignItems: 'flex-end',
    gap: 8
  },
  botaoEditar: {
    backgroundColor: '#e6f4ea',
    paddingVertical: 4,
    paddingHorizontal: 13,
    borderRadius: 6,
    borderColor: '#1a7f37',
    borderWidth: 1
  },
  textoEditar: {
    color: '#1a7f37',
    fontWeight: 'bold'
  },
  botaoExcluir: {
    backgroundColor: '#fde8e8',
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 6,
    borderColor: '#e53935',
    borderWidth: 1
  },
  textoExcluir: {
    color: '#e53935',
    fontWeight: 'bold'
  },
  adicionarButton: {
    flexDirection: 'row',
    backgroundColor: '#1a7f37',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginTop: 20
  },
  adicionarTexto: {
    color: '#fff',
    fontWeight: 'bold'
  },
  footer: {
    backgroundColor: '#1a7f37',
    alignItems: 'center',
    padding: 20,
    marginBottom: 10
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 50,
    fontSize: 16,
    color: '#888'
  }
});