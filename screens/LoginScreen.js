import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.logo}>PetMatch</Text>
      </View>

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

        <TouchableOpacity style={styles.loginButton}
            onPress={() => navigation.navigate('AbrigoDashboard')}
        >
          <Text style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity>

        <View style={styles.dividerContainer}>
          <View style={styles.line} />
          <Text style={styles.or}>ou</Text>
          <View style={styles.line} />
        </View>

        <TouchableOpacity style={styles.secondaryButton}>
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
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff'
  },
  header: {
    backgroundColor: '#1a7f37',
    paddingVertical: 85,
    justifyContent: 'center',
    alignItems: 'center'
  },
  logo: {
    fontSize: 35,
    fontWeight: 'bold',
    color: '#ffffff'
  },
  form: {
    padding: 20,
    marginTop: 30
  },
  input: {
    backgroundColor: '#f2f2f2',
    borderRadius: 6,
    padding: 12,
    marginBottom: 25
  },
  loginButton: {
    backgroundColor: '#1a7f37',
    padding: 12,
    borderRadius: 6,
    alignItems: 'center',
    marginBottom: 25
  },
  loginButtonText: {
    color: '#fff',
    fontWeight: 'bold'
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 25
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#ccc'
  },
  or: {
    marginHorizontal: 10,
    color: '#888'
  },
  secondaryButton: {
    borderColor: '#1a7f37',
    borderWidth: 1.5,
    padding: 12,
    borderRadius: 6,
    alignItems: 'center',
    marginBottom: 15
  },
  secondaryButtonText: {
    color: '#1a7f37',
    fontWeight: 'bold'
  }
});
