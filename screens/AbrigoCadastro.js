import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import Cabecalho1 from '../components/Cabecalho1';
import { firebase } from '../firebase';
const db = firebase.firestore();

export default function AbrigoCadastro({ navigation }) {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [cnpj, setCnpj] = useState('');
  const [telefone, setTelefone] = useState('');
  const [senha, setSenha] = useState('');
  const [loading, setLoading] = useState(false);

  
  const formatCnpj = (value) => {
    return value
      .replace(/\D/g, '')
      .replace(/(\d{2})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1/$2')
      .replace(/(\d{4})(\d)/, '$1-$2')
      .slice(0, 18);
  };

  const cadastrarAbrigo = async () => {
    if (!nome || !email || !cnpj || !telefone || !senha) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      return;
    }

    setLoading(true);

    try {
      const userCredential = await firebase.auth().createUserWithEmailAndPassword(email, senha);
      const userId = userCredential.user.uid;

      await db.collection('abrigos').doc(userId).set({
        nome,
        email,
        cnpj,
        telefone,
        criadoEm: firebase.firestore.FieldValue.serverTimestamp(),
      });

      Alert.alert('Sucesso', 'Abrigo cadastrado com sucesso!');
      
      navigation.navigate('Login');
    } catch (error) {
      console.error('Erro no cadastro de abrigo:', error);
      let errorMessage = 'Não foi possível cadastrar. Tente novamente.';
      if (error.code === 'auth/email-already-in-use') {
        errorMessage = 'Este e-mail já está em uso.';
      } else if (error.code === 'auth/invalid-email') {
        errorMessage = 'O formato do e-mail é inválido.';
      }
      Alert.alert('Erro', errorMessage);
    } finally {
      setLoading(false);
    }
  };


  return (
    <View style={styles.container}>
      <Cabecalho1 />

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
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="CNPJ"
          value={cnpj}
          onChangeText={(text) => setCnpj(formatCnpj(text))}
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          placeholder="Telefone"
          value={telefone}
          onChangeText={setTelefone}
          keyboardType="phone-pad"
        />
        <TextInput
          style={styles.input}
          placeholder="Senha (mínimo 6 caracteres)"
          value={senha}
          onChangeText={setSenha}
          secureTextEntry
        />

        <TouchableOpacity style={styles.cadastrarButton} onPress={cadastrarAbrigo} disabled={loading}>
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.cadastrarButtonText}>Cadastrar</Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  form: {
    padding: 20,
    marginTop: 20,
  },
  input: {
    backgroundColor: '#f2f2f2',
    borderRadius: 6,
    padding: 12,
    marginBottom: 20,
  },
  cadastrarButton: {
    backgroundColor: '#1a7f37',
    padding: 12,
    borderRadius: 6,
    alignItems: 'center',
  },
  cadastrarButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 15,
  },
});