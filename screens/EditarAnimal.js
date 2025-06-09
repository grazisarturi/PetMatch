import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView, Switch, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Cabecalho2 from '../components/Cabecalho2';
import { firebase } from '../firebase';

const db = firebase.firestore();

export default function EditarAnimal({ route, navigation }) {
  const { animal } = route.params;

  const [nome, setNome] = useState(animal.nome);
  const [especie, setEspecie] = useState(animal.especie);
  const [raca, setRaca] = useState(animal.raca);
  const [idade, setIdade] = useState(animal.idade);
  const [sexo, setSexo] = useState(animal.sexo);
  const [porte, setPorte] = useState(animal.porte);
  const [descricao, setDescricao] = useState(animal.descricao);
  const [localizacao, setLocalizacao] = useState(animal.localizacao);
  const [castrado, setCastrado] = useState(animal.castrado || false);

  const salvarAlteracoes = async () => {
    if (!nome || !especie || !raca || !idade || !sexo || !porte || !descricao || !localizacao) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      return;
    }

    try {
      await db.collection('animais').doc(animal.id).update({
        nome,
        especie,
        raca,
        idade,
        sexo,
        porte,
        descricao,
        localizacao,
        castrado,
        atualizadoEm: firebase.firestore.FieldValue.serverTimestamp()
      });

      Alert.alert('Sucesso', 'Animal atualizado com sucesso!');
      navigation.goBack();
    } catch (error) {
      console.error('Erro ao atualizar animal:', error);
      Alert.alert('Erro', 'Erro ao salvar alterações.');
    }
  };

  return (
    <View style={styles.container}>
      <Cabecalho2 navigation={navigation} />

      <ScrollView contentContainerStyle={styles.form}>
        <Text style={styles.label}>Nome</Text>
        <TextInput style={styles.input} value={nome} onChangeText={setNome} />

        <Text style={styles.label}>Espécie</Text>
        <TextInput style={styles.input} value={especie} onChangeText={setEspecie} />

        <Text style={styles.label}>Raça</Text>
        <TextInput style={styles.input} value={raca} onChangeText={setRaca} />

        <Text style={styles.label}>Idade</Text>
        <TextInput style={styles.input} value={idade} onChangeText={setIdade} keyboardType="numeric" />

        <Text style={styles.label}>Sexo</Text>
        <TextInput style={styles.input} value={sexo} onChangeText={setSexo} />

        <Text style={styles.label}>Porte</Text>
        <TextInput style={styles.input} value={porte} onChangeText={setPorte} />

        <Text style={styles.label}>Localização</Text>
        <TextInput style={styles.input} value={localizacao} onChangeText={setLocalizacao} />

        <Text style={styles.label}>Descrição</Text>
        <TextInput style={[styles.input, { height: 80 }]} multiline value={descricao} onChangeText={setDescricao} />

        <View style={styles.switchContainer}>
          <Text style={styles.label}>Castrado</Text>
          <Switch value={castrado} onValueChange={setCastrado} />
        </View>

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
    padding: 20,
  },
  label: {
    fontWeight: 'bold',
    marginBottom: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    padding: 12,
    marginBottom: 15,
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  botao: {
    backgroundColor: '#1a7f37',
    padding: 14,
    borderRadius: 6,
    alignItems: 'center',
  },
  botaoTexto: {
    color: '#fff',
    fontWeight: 'bold',
  },
   footer: {
    backgroundColor: '#1a7f37',
    alignItems: 'center',
    padding: 20,
    marginBottom: 10
  }
});
