import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import Cabecalho1 from '../../components/Cabecalho1';

export default function CadastroAdotante({ navigation }) {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [cpf, setCpf] = useState('');
  const [senha, setSenha] = useState('');

  const handleCadastro = () => {
    Alert.alert('Cadastro', 'Adotante cadastrado com sucesso!');
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      <Cabecalho1/>

      <ScrollView contentContainerStyle={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Nome"
          value={nome}
          onChangeText={setNome}
        />
        <TextInput
          style={styles.input}
          placeholder="E-mail"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.input}
          placeholder="CPF"
          value={cpf}
          onChangeText={setCpf}
        />
        <TextInput
          style={styles.input}
          placeholder="Senha"
          secureTextEntry
          value={senha}
          onChangeText={setSenha}
        />

        <TouchableOpacity style={styles.cadastrarButton} onPress={() => navigation.navigate('Opcoes')}>
          <Text style={styles.cadastrarButtonText}>Cadastrar</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  form: {
    padding: 20,
  },
  input: {
    backgroundColor: '#f2f2f2',
    borderRadius: 6,
    padding: 12,
    marginBottom: 20,
  },
  cadastrarButton: {
    backgroundColor: '#1a7f37',
    padding: 14,
    borderRadius: 6,
    alignItems: 'center',
    marginTop: 10,
  },
  cadastrarButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
