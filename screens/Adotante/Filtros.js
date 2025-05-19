import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Picker, TouchableOpacity, ScrollView } from 'react-native';

export default function Filters({ navigation }) {
  const [idade, setIdade] = useState('');
  const [localizacao, setLocalizacao] = useState('');
  const [especie, setEspecie] = useState('');
  const [sexo, setSexo] = useState('');
  const [porte, setPorte] = useState('');

  const aplicarFiltros = () => {
    // Lógica para aplicar filtros (fictício por enquanto)
    navigation.navigate('Home'); // pode ser substituído por tela de resultados filtrados
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Filtros Avançados</Text>

      <Text style={styles.label}>Idade Aproximada:</Text>
      <TextInput
        style={styles.input}
        placeholder="Ex: 6 meses, 2 anos"
        value={idade}
        onChangeText={setIdade}
      />

      <Text style={styles.label}>Localização:</Text>
      <TextInput
        style={styles.input}
        placeholder="Cidade, Estado"
        value={localizacao}
        onChangeText={setLocalizacao}
      />

      <Text style={styles.label}>Espécie:</Text>
      <Picker selectedValue={especie} onValueChange={setEspecie} style={styles.picker}>
        <Picker.Item label="Selecione..." value="" />
        <Picker.Item label="Cão" value="cao" />
        <Picker.Item label="Gato" value="gato" />
        <Picker.Item label="Outro" value="outro" />
      </Picker>

      <Text style={styles.label}>Sexo:</Text>
      <Picker selectedValue={sexo} onValueChange={setSexo} style={styles.picker}>
        <Picker.Item label="Selecione..." value="" />
        <Picker.Item label="Macho" value="macho" />
        <Picker.Item label="Fêmea" value="femea" />
      </Picker>

      <Text style={styles.label}>Porte:</Text>
      <Picker selectedValue={porte} onValueChange={setPorte} style={styles.picker}>
        <Picker.Item label="Selecione..." value="" />
        <Picker.Item label="Pequeno" value="pequeno" />
        <Picker.Item label="Médio" value="medio" />
        <Picker.Item label="Grande" value="grande" />
      </Picker>

      <TouchableOpacity style={styles.button} onPress={aplicarFiltros}>
        <Text style={styles.buttonText}>Aplicar</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  label: {
    fontSize: 16,
    marginTop: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginTop: 5,
  },
  picker: {
    marginTop: 5,
    marginBottom: 15,
  },
  button: {
    backgroundColor: '#2e7d32',
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '600',
    fontSize: 16,
  },
});
