// screens/ListaDoacoes.js

import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Cabecalho2 from '../components/Cabecalho2';
import { firebase } from '../firebase';

const db = firebase.firestore();

export default function ListaDoacoes({ navigation }) {
  const [doacoes, setDoacoes] = useState([]);
  const [loading, setLoading] = useState(true);

  // ADICIONADO: Pega o ID do abrigo logado
  const userId = firebase.auth().currentUser?.uid;

  useEffect(() => {
    if (!userId) return;

    const unsubscribe = db.collection('doacoes')
      // CORRIGIDO: Adiciona filtro por ID do abrigo
      .where('abrigoId', '==', userId)
      .onSnapshot(snapshot => {
        const lista = [];
        snapshot.forEach(doc => {
          lista.push({ id: doc.id, ...doc.data() });
        });
        setDoacoes(lista);
        setLoading(false);
      });

    return () => unsubscribe();
  }, [userId]);

  const editar = (doacao) => {
    navigation.navigate('EditarDoacao', { doacao });
  };

  const excluir = (id) => {
    Alert.alert('Excluir', 'Deseja excluir este pedido de doação?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Excluir',
        style: 'destructive',
        onPress: async () => {
          try {
            await db.collection('doacoes').doc(id).delete();
            Alert.alert('Sucesso', 'Pedido excluído!');
          } catch (error) {
            console.error('Erro ao excluir:', error);
            Alert.alert('Erro', 'Erro ao excluir o pedido.');
          }
        }
      }
    ]);
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#1a7f37" style={{flex: 1}} />;
  }

  return (
    <View style={styles.container}>
      <Cabecalho2 navigation={navigation} />

      <ScrollView contentContainerStyle={styles.listContainer}>
        {doacoes.length === 0 ? (
          <Text style={styles.emptyText}>Nenhum pedido de doação cadastrado.</Text>
        ) : (
          doacoes.map((d) => (
            <View key={d.id} style={styles.card}>
              <View style={{ flex: 1 }}>
                <Text style={styles.item}>{d.item}</Text>
                <Text style={styles.info}>Quantidade: {d.quantidade}</Text>
              </View>
              <View style={styles.botoes}>
                <TouchableOpacity style={styles.botaoEditar} onPress={() => editar(d)}>
                  <Text style={styles.textoEditar}>Editar</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.botaoExcluir} onPress={() => excluir(d.id)}>
                  <Text style={styles.textoExcluir}>Excluir</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))
        )}

        <TouchableOpacity
          style={styles.adicionarButton}
          onPress={() => navigation.navigate('PedidoDoacao')}
        >
          <Ionicons name="add" size={20} color="#fff" />
          <Text style={styles.adicionarTexto}>Adicionar novo pedido</Text>
        </TouchableOpacity>
      </ScrollView>

      <View style={styles.footer}>
        <Ionicons name="home-outline" size={24} color="#fff" onPress={() => navigation.navigate('AbrigoDashboard')} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  listContainer: {
    padding: 20
  },
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
    backgroundColor: '#f8f8f8'
  },
  item: {
    fontWeight: 'bold',
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