import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import Cabecalho1 from '../components/Cabecalho1';

export default function AbrigoCadastro({ navigation }) {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [cnpj, setCnpj] = useState('');
  const [telefone, setTelefone] = useState('');
  const [senha, setSenha] = useState('');

  return (
    <View style={styles.container}>
     <Cabecalho1/>

      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Nome do Abrigo"
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
          placeholder="CNPJ"
          value={cnpj}
          onChangeText={setCnpj}
        />
        <TextInput
          style={styles.input}
          placeholder="Telefone"
          value={telefone}
          onChangeText={setTelefone}
        />
        <TextInput
          style={styles.input}
          placeholder="Senha"
          value={senha}
          onChangeText={setSenha}
          secureTextEntry
        />

        <TouchableOpacity
          style={styles.cadastrarButton}
          onPress={() => navigation.navigate('AbrigoDashboard')}
        >
        <Text style={styles.cadastrarButtonText}>Cadastrar</Text>
        </TouchableOpacity>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  form: {
    padding: 20,
    marginTop: 20
  },
  input: {
    backgroundColor: '#f2f2f2',
    borderRadius: 6,
    padding: 12,
    marginBottom: 20
  },
  cadastrarButton: {
    backgroundColor: '#1a7f37',
    padding: 12,
    borderRadius: 6,
    alignItems: 'center'
  },
  cadastrarButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 15
  }
});
