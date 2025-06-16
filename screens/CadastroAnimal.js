import React, { useState } from 'react';
import {
  View, Text, TextInput, StyleSheet,
  TouchableOpacity, ScrollView, Switch, Alert
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Cabecalho2 from '../components/Cabecalho2';
import { firebase } from '../firebase';

const db = firebase.firestore();

export default function CadastroAnimal({ navigation }) {
  const [nome, setNome] = useState('');
  const [especie, setEspecie] = useState('');
  const [raca, setRaca] = useState('');
  const [idade, setIdade] = useState('');
  const [sexo, setSexo] = useState('');
  const [porte, setPorte] = useState('');
  const [descricao, setDescricao] = useState('');
  const [localizacao, setLocalizacao] = useState('');
  const [castrado, setCastrado] = useState(false);

  const cadastrarAnimal = async () => {
    if (!nome || !especie || !raca || !idade || !sexo || !porte || !localizacao) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      return;
    }

    try {
      const abrigoId = firebase.auth().currentUser.uid;
      
      await db.collection('animais').add({
        nome,
        especie,
        raca,
        idade,
        sexo,
        porte,
        descricao,
        localizacao,
        castrado,
        abrigoId, 
        imagem: 'https://via.placeholder.com/100',
        criadoEm: firebase.firestore.FieldValue.serverTimestamp(),
      });

      Alert.alert('Sucesso', 'Animal cadastrado com sucesso!');
      navigation.navigate('ListaPets');
    } catch (error) {
      console.error('Erro ao cadastrar animal:', error);
      Alert.alert('Erro', 'Não foi possível cadastrar o animal.');
    }
  };

  return (
    <View style={styles.container}>
      <Cabecalho2 navigation={navigation} />
      <ScrollView contentContainerStyle={styles.form}>
        <TouchableOpacity style={styles.fotoBox}>
          <Ionicons name="camera" size={28} color="#888" />
          <Text style={styles.fotoTexto}>Adicionar Foto</Text>
        </TouchableOpacity>

        <TextInput style={styles.input} placeholder="Nome" value={nome} onChangeText={setNome} />
        <TextInput style={styles.input} placeholder="Espécie" value={especie} onChangeText={setEspecie} />
        <TextInput style={styles.input} placeholder="Raça" value={raca} onChangeText={setRaca} />
        <TextInput style={styles.input} placeholder="Idade" value={idade} onChangeText={setIdade} />
        <TextInput style={styles.input} placeholder="Sexo" value={sexo} onChangeText={setSexo} />
        <TextInput style={styles.input} placeholder="Porte" value={porte} onChangeText={setPorte} />
        <TextInput style={styles.input} placeholder="Descrição" value={descricao} onChangeText={setDescricao} multiline />
        <TextInput style={styles.input} placeholder="Localização" value={localizacao} onChangeText={setLocalizacao} />

        <View style={styles.switchContainer}>
          <Text style={styles.switchLabel}>Castrado</Text>
          <Switch value={castrado} onValueChange={setCastrado} />
        </View>

        <TouchableOpacity style={styles.button} onPress={cadastrarAnimal}>
          <Text style={styles.buttonText}>Cadastrar animal</Text>
        </TouchableOpacity>
      </ScrollView>


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
  form: { padding: 20, paddingBottom: 140 },
  fotoBox: {
    backgroundColor: '#ddd',
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginBottom: 20
  },
  fotoTexto: { color: '#555', marginTop: 6 },
  input: {
    backgroundColor: '#e6e6e6',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30
  },
  switchLabel: {
    fontSize: 16,
    fontWeight: '500',
    marginRight: 10
  },
  button: {
    backgroundColor: '#1a7f37',
    paddingVertical: 16,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20
  },
  buttonText: { 
    color: '#fff', 
    fontWeight: 'bold', 
    fontSize: 16 
  },
  footer: {
    backgroundColor: '#1a7f37',
    alignItems: 'center',
    padding: 18,
    position: 'absolute',
    bottom: 0,
    width: '100%',
  }
});