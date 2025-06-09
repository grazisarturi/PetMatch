import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Cabecalho2 from '../components/Cabecalho2';
import { firebase } from '../firebase';

const db = firebase.firestore();

export default function EditarDoacao({ route, navigation }) {
  const { doacao } = route.params;

  const [item, setItem] = useState(doacao.item);
  const [quantidade, setQuantidade] = useState(doacao.quantidade);
  const [abrigo, setAbrigo] = useState(doacao.abrigo);
  const [localizacao, setLocalizacao] = useState(doacao.localizacao || '');
  const [descricao, setDescricao] = useState(doacao.descricao || '');

  const salvarAlteracoes = async () => {
    if (!item || !quantidade || !abrigo) {
      Alert.alert('Erro', 'Preencha todos os campos obrigatórios.');
      return;
    }

    try {
      await db.collection('doacoes').doc(doacao.id).update({
        item,
        quantidade,
        abrigo,
        localizacao,
        descricao,
        atualizadoEm: firebase.firestore.FieldValue.serverTimestamp()
      });

      Alert.alert('Sucesso', 'Doação atualizada com sucesso!');
      navigation.goBack();
    } catch (error) {
      console.error('Erro ao atualizar doação:', error);
      Alert.alert('Erro', 'Não foi possível atualizar a doação.');
    }
  };

  return (
    <View style={styles.container}>
      <Cabecalho2 navigation={navigation} />

      <ScrollView contentContainerStyle={styles.form}>
        <Text style={styles.label}>Item</Text>
        <TextInput style={styles.input} value={item} onChangeText={setItem} />

        <Text style={styles.label}>Quantidade</Text>
        <TextInput style={styles.input} value={quantidade} onChangeText={setQuantidade} />

        <Text style={styles.label}>Abrigo</Text>
        <TextInput style={styles.input} value={abrigo} onChangeText={setAbrigo} />

        <Text style={styles.label}>Localização</Text>
        <TextInput style={styles.input} value={localizacao} onChangeText={setLocalizacao} />

        <Text style={styles.label}>Descrição</Text>
        <TextInput style={[styles.input, { height: 80 }]} multiline value={descricao} onChangeText={setDescricao} />

        <TouchableOpacity style={styles.botao} onPress={salvarAlteracoes}>
          <Text style={styles.botaoTexto}>Salvar Alterações</Text>
        </TouchableOpacity>
      </ScrollView>

      <View style={styles.footer}>
        <Ionicons name="home-outline" size={25} color="#fff" onPress={() => navigation.navigate('AbrigoDashboard')} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  form: {
    padding: 20
  },
  label: {
    fontWeight: 'bold',
    marginBottom: 5
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
