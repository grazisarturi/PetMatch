import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Switch,
  Alert
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

  const handleCadastrar = async () => {
    if (!nome || !especie || !idade || !localizacao) {
      Alert.alert('Erro', 'Preencha todos os campos obrigatórios!');
      return;
    }

    try {
      await db.collection('animais').add({
        nome,
        especie,
        raca,
        idade,
        sexo,
        porte,
        descricao,
        localizacao,
        castrado
      });

      Alert.alert('Sucesso', 'Animal cadastrado com sucesso!');
      navigation.navigate('AbrigoDashboard'); // ou outra tela que preferir
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
          <Ionicons name="camera-outline" size={32} color="#666" />
          <Text style={styles.fotoText}>Adicionar Foto</Text>
        </TouchableOpacity>

        <View style={styles.row}>
          <TextInput
            style={styles.input}
            placeholder="Nome"
            value={nome}
            onChangeText={setNome}
          />
          <TextInput
            style={styles.input}
            placeholder="Espécie"
            value={especie}
            onChangeText={setEspecie}
          />
        </View>

        <View style={styles.row}>
          <TextInput
            style={styles.input}
            placeholder="Raça"
            value={raca}
            onChangeText={setRaca}
          />
          <TextInput
            style={styles.input}
            placeholder="Idade"
            value={idade}
            onChangeText={setIdade}
          />
        </View>

        <View style={styles.row}>
          <TextInput
            style={styles.input}
            placeholder="Sexo"
            value={sexo}
            onChangeText={setSexo}
          />
          <TextInput
            style={styles.input}
            placeholder="Porte"
            value={porte}
            onChangeText={setPorte}
          />
        </View>

        <TextInput
          style={styles.inputFull}
          placeholder="Descrição"
          multiline
          value={descricao}
          onChangeText={setDescricao}
        />

        <TextInput
          style={styles.inputFull}
          placeholder="Localização"
          value={localizacao}
          onChangeText={setLocalizacao}
        />

        <View style={styles.switchContainer}>
          <Text style={styles.switchLabel}>Castrado</Text>
          <Switch value={castrado} onValueChange={setCastrado} />
        </View>

        <TouchableOpacity style={styles.botaoCadastrar} onPress={handleCadastrar}>
          <Text style={styles.botaoTexto}>Cadastrar animal</Text>
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
  form: { padding: 20 },
  fotoBox: {
    height: 100,
    backgroundColor: '#e6e6e6',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 25
  },
  fotoText: { color: '#666', marginTop: 5 },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12
  },
  input: {
    backgroundColor: '#f2f2f2',
    borderRadius: 6,
    padding: 12,
    flex: 1,
    marginRight: 8
  },
  inputFull: {
    backgroundColor: '#f2f2f2',
    borderRadius: 6,
    padding: 12,
    marginBottom: 12
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20
  },
  switchLabel: {
    marginRight: 10,
    fontSize: 16
  },
  botaoCadastrar: {
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
