import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView, Switch, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function CadastroAnimal({ navigation }) {
  const [castrado, setCastrado] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#1a7f37" />
        </TouchableOpacity>
        <Text style={styles.logo}>PetMatch</Text>
        <View style={{ width: 24 }} />
      </View>
      <View style={styles.linhaInferior} />

      <ScrollView contentContainerStyle={styles.form}>
        <TouchableOpacity style={styles.fotoBox}>
          <Ionicons name="camera-outline" size={32} color="#666" />
          <Text style={styles.fotoText}>Adicionar Foto</Text>
        </TouchableOpacity>

        <View style={styles.row}>
          <TextInput style={styles.input} placeholder="Nome" />
          <TextInput style={styles.input} placeholder="Espécie" />
        </View>

        <View style={styles.row}>
          <TextInput style={styles.input} placeholder="Raça" />
          <TextInput style={styles.input} placeholder="Idade" />
        </View>

        <View style={styles.row}>
          <TextInput style={styles.input} placeholder="Sexo" />
          <TextInput style={styles.input} placeholder="Porte" />
        </View>

        <TextInput style={styles.inputFull} placeholder="Descrição" multiline />
        <TextInput style={styles.inputFull} placeholder="Localização" />

        <View style={styles.switchContainer}>
          <Text style={styles.switchLabel}>Castrado</Text>
          <Switch value={castrado} onValueChange={setCastrado} />
        </View>

        <TouchableOpacity
          style={styles.botaoCadastrar}
          onPress={() => Alert.alert('Cadastro', 'Animal cadastrado com sucesso!')}
        >
          <Text style={styles.botaoTexto}>Cadastrar animal</Text>
        </TouchableOpacity>
      </ScrollView>

      <View style={styles.footer}>
            <Ionicons name="home-outline" size={25} color="#fff" 
            onPress={() => navigation.navigate('AbrigoDashboard')}/>
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 50,
    paddingHorizontal: 20,
    backgroundColor: '#fff'
  },
  logo: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#1a7f37'
  },
  linhaInferior: {
    height: 4,
    backgroundColor: '#1a7f37',
    width: '100%'
  },
  form: {
    padding: 20
  },
  fotoBox: {
    height: 100,
    backgroundColor: '#e6e6e6',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 25
  },
  fotoText: {
    color: '#666',
    marginTop: 5
  },
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
