import React, { useEffect, useState } from 'react';
import {
  View, Text, StyleSheet, Image, FlatList,
  TouchableOpacity, Alert
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { firebase } from '../firebase';
import { useIsFocused } from '@react-navigation/native';
import Cabecalho2 from '../components/Cabecalho2';

const db = firebase.firestore();

export default function ListaPets({ navigation }) {
  const [animais, setAnimais] = useState([]);
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      const unsubscribe = db.collection('animais').onSnapshot(snapshot => {
        const lista = [];
        snapshot.forEach(doc => {
          lista.push({ id: doc.id, ...doc.data() });
        });
        setAnimais(lista);
      });
      return () => unsubscribe();
    }
  }, [isFocused]);

  const excluirAnimal = (id) => {
    Alert.alert(
      'Confirmar exclusão',
      'Tem certeza que deseja excluir este animal?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Excluir',
          onPress: async () => {
            await db.collection('animais').doc(id).delete();
          },
          style: 'destructive',
        },
      ]
    );
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Image
        source={{ uri: item.imagem || 'https://via.placeholder.com/80' }}
        style={styles.image}
      />

      <View style={styles.info}>
        <Text style={styles.nome}>{item.nome}</Text>
        <TouchableOpacity
          style={styles.botaoEditar}
          onPress={() => navigation.navigate('EditarAnimal', { animal: item })}
        >
          <Text style={styles.textoEditar}>Editar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.botaoExcluir}
          onPress={() => excluirAnimal(item.id)}
        >
          <Text style={styles.textoExcluir}>Excluir</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Cabecalho2 navigation={navigation} />

      <FlatList
        data={animais}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
        ListFooterComponent={(
          <>
            <TouchableOpacity
              style={styles.botaoCadastrar}
              onPress={() => navigation.navigate('CadastroAnimal')}
            >
              <Text style={styles.botaoCadastrarTexto}>Cadastrar novo animal</Text>
            </TouchableOpacity>
            <View style={{ height: 100 }} />
          </>
        )}
      />

      <View style={styles.footer}>
        <Ionicons
          name="home-outline"
          size={25}
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 40,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  logo: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#1a7f37',
  },
  linhaInferior: {
    height: 4,
    backgroundColor: '#1a7f37',
    width: '100%',
    marginBottom: 10,
  },
  list: {
    paddingHorizontal: 20,
    paddingBottom: 80,
  },
  card: {
    borderWidth: 1.5,
    borderColor: '#1a7f37',
    borderRadius: 12,
    padding: 8,
    marginBottom: 16,
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 10,
  },
  info: {
    flex: 1,
    justifyContent: 'center',
  },
  nome: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 10
  },
  botaoEditar: {
    backgroundColor: '#d4f5dd',
    paddingVertical: 4,
    paddingHorizontal: 14,
    borderRadius: 6,
    marginBottom: 6,
    alignSelf: 'flex-start',
  },
  botaoExcluir: {
    backgroundColor: '#ffd9d9',
    paddingVertical: 4,
    paddingHorizontal: 14,
    borderRadius: 6,
    alignSelf: 'flex-start',
  },
  textoEditar: {
    color: '#1a7f37',
    fontWeight: 'bold',
  },
  textoExcluir: {
    color: '#d11a2a',
    fontWeight: 'bold',
  },
  botaoCadastrar: {
    backgroundColor: '#1a7f37',
    marginHorizontal: 40,
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 15,
  },
  botaoCadastrarTexto: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 15,
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
