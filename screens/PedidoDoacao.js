import React, { useState, useEffect } from 'react';
import {
  View, Text, TextInput, StyleSheet, TouchableOpacity,
  ScrollView, Alert, ActivityIndicator
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Cabecalho2 from '../components/Cabecalho2';
import { firebase } from '../firebase';

const db = firebase.firestore();

export default function PedidoDoacao({ navigation }) {
  const [item, setItem] = useState('');
  const [quantidade, setQuantidade] = useState('');
  const [descricao, setDescricao] = useState('');
  const [abrigo, setAbrigo] = useState('');
  const [localizacao, setLocalizacao] = useState('');
  const [abrigoInfo, setAbrigoInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const userId = firebase.auth().currentUser?.uid;

  useEffect(() => {
    if (userId) {
      db.collection('abrigos').doc(userId).get()
        .then(doc => {
          if (doc.exists) {
            const data = doc.data();
            setAbrigoInfo(data);
            setAbrigo(data.nome || '');
            setLocalizacao(data.localizacao || '');
          }
        })
        .finally(() => setIsLoading(false));
    } else {
      setIsLoading(false);
    }
  }, [userId]);

  const handlePedido = async () => {
    if (isLoading) return;

    if (!item || !quantidade || !abrigo) {
      Alert.alert('Erro', 'Preencha os campos obrigatórios.');
      return;
    }

    if (!userId) {
      Alert.alert('Erro', 'Usuário não autenticado.');
      return;
    }

    setIsLoading(true);

    try {
      await db.collection('doacoes').add({
        item,
        quantidade,
        descricao,
        abrigo,
        abrigoId: userId,
        localizacao,
        criadoEm: firebase.firestore.FieldValue.serverTimestamp(),
      });

      Alert.alert('Sucesso', 'Pedido de doação criado com sucesso!');
      navigation.goBack();

    } catch (error) {
      console.error("Erro ao criar pedido:", error);
      Alert.alert('Erro', 'Erro ao criar pedido de doação.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Cabecalho2 navigation={navigation} />

      <ScrollView contentContainerStyle={styles.form}>
        <Text style={styles.title}>Criar Pedido de Doação</Text>

        <Text style={styles.label}>Item</Text>
        <TextInput style={styles.input} value={item} onChangeText={setItem} />

        <Text style={styles.label}>Quantidade</Text>
        <TextInput style={styles.input} value={quantidade} onChangeText={setQuantidade} />

        <Text style={styles.label}>Abrigo</Text>
        <TextInput style={styles.input} value={abrigo} onChangeText={setAbrigo} />

        <Text style={styles.label}>Localização</Text>
        <TextInput style={styles.input} value={localizacao} onChangeText={setLocalizacao} />

        <Text style={styles.label}>Descrição</Text>
        <TextInput
          style={[styles.input, { height: 80 }]}
          multiline
          value={descricao}
          onChangeText={setDescricao}
        />

        <TouchableOpacity
          style={[styles.botao, isLoading && styles.botaoDesabilitado]}
          onPress={handlePedido}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.botaoTexto}>Adicionar Pedido</Text>
          )}
        </TouchableOpacity>
      </ScrollView>

      <View style={styles.footer}>
        <Ionicons name="home-outline" size={25} color="#fff"
          onPress={() => navigation.navigate('AbrigoDashboard')} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  form: { padding: 20 },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333'
  },
  label: {
    fontWeight: 'bold',
    marginBottom: 5,
    fontSize: 14,
  },
  input: {
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 6,
    padding: 12,
    marginBottom: 15
  },
  botao: {
    backgroundColor: '#1a7f37',
    padding: 14,
    borderRadius: 6,
    alignItems: 'center',
    marginTop: 10
  },
  botaoDesabilitado: {
    backgroundColor: '#999'
  },
  botaoTexto: {
    color: '#fff',
    fontWeight: 'bold'
  },
  footer: {
    backgroundColor: '#1a7f37',
    alignItems: 'center',
    padding: 20,
    marginBottom: 10
  }
});
