import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import Cabecalho1 from '../components/Cabecalho1';
import { firebase } from '../firebase';
const db = firebase.firestore();

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const handleLogin = async () => {
    if (!email || !senha) {
      Alert.alert('Erro', 'Preencha todos os campos!');
      return;
    }

    try {
      const userCredential = await firebase.auth().signInWithEmailAndPassword(email, senha);
      const userId = userCredential.user.uid;

      // Tentar achar o usuário como abrigo
      const abrigoDoc = await db.collection('abrigos').doc(userId).get();
      if (abrigoDoc.exists) {
        navigation.navigate('AbrigoDashboard',{
          cnpj
        });
        return;
      }

      // Se não for abrigo, verificar se é adotante
      const adotanteDoc = await db.collection('adotantes').doc(userId).get();
      if (adotanteDoc.exists) {
        navigation.navigate('Opcoes'); // tela inicial do adotante
        return;
      }

      // Se não for nenhum dos dois
      Alert.alert('Erro', 'Usuário não classificado como abrigo ou adotante.');
    } catch (error) {
      console.log('Erro ao fazer login:', error);
      Alert.alert('Erro', 'Credenciais inválidas.');
    }
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">
      <View style={styles.container}>
        <Cabecalho1 />

        <View style={styles.form}>
          <TextInput
            style={styles.input}
            placeholder="E-mail"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />
          <TextInput
            style={styles.input}
            placeholder="Senha"
            value={senha}
            onChangeText={setSenha}
            secureTextEntry
          />

          <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
            <Text style={styles.loginButtonText}>Login</Text>
          </TouchableOpacity>

          <View style={styles.dividerContainer}>
            <View style={styles.line} />
            <Text style={styles.or}>ou</Text>
            <View style={styles.line} />
          </View>

          <TouchableOpacity
            style={styles.secondaryButton}
            onPress={() => navigation.navigate('CadastroAdotante')}
          >
            <Text style={styles.secondaryButtonText}>Cadastrar como adotante</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.secondaryButton}
            onPress={() => navigation.navigate('Abrigo')}
          >
            <Text style={styles.secondaryButtonText}>Cadastrar como abrigo</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#ffffff' },
  form: {
    padding: 20,
    marginTop: 30,
  },
  input: {
    backgroundColor: '#f2f2f2',
    borderRadius: 6,
    padding: 12,
    marginBottom: 25,
  },
  loginButton: {
    backgroundColor: '#1a7f37',
    padding: 12,
    borderRadius: 6,
    alignItems: 'center',
    marginBottom: 25,
  },
  loginButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 25,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#ccc',
  },
  or: {
    marginHorizontal: 10,
    color: '#888',
  },
  secondaryButton: {
    borderColor: '#1a7f37',
    borderWidth: 1.5,
    padding: 12,
    borderRadius: 6,
    alignItems: 'center',
    marginBottom: 15,
  },
  secondaryButtonText: {
    color: '#1a7f37',
    fontWeight: 'bold',
  },
});
