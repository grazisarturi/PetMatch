import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Picker, // ou use @react-native-picker/picker no Expo
} from 'react-native';

export default function PesquisarDoacoes({ navigation }) {
  const [localizacao, setLocalizacao] = useState('');
  const [abrigoSelecionado, setAbrigoSelecionado] = useState('');

  const abrigos = [
    {
      id: '1',
      nome: 'ABRIGO DE ANIMAIS SÃO FRANCISCO DE ASSIS DE CASCAVEL - PR',
      local: 'Rua Paraná, 1340 – Bairro São Cristóvão, Cascavel - PR',
    },
    {
      id: '2',
      nome: 'Lar dos Peludos',
      local: 'Rua das Flores, 123 – Cascavel - PR',
    },
  ];

  const aplicarFiltro = () => {
    // Aqui você pode filtrar por localização ou nome do abrigo
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Pequenas gestos, grandes patinhas felizes 🐾</Text>

      <TextInput
        style={styles.input}
        placeholder="Nome do abrigo"
        value={abrigoSelecionado}
        onChangeText={setAbrigoSelecionado}
      />

      <TextInput
        style={styles.input}
        placeholder="Localização"
        value={localizacao}
        onChangeText={setLocalizacao}
      />

      <TouchableOpacity style={styles.botao} onPress={aplicarFiltro}>
        <Text style={styles.botaoTexto}>APLICAR</Text>
      </TouchableOpacity>

      <FlatList
        data={abrigos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.item}
            onPress={() =>
              navigation.navigate('TelaDoacoes', { abrigo: item })
            }
          >
            <Text style={styles.nomeAbrigo}>{item.nome}</Text>
            <Text style={styles.local}>{item.local}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  titulo: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 12,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
  botao: {
    backgroundColor: '#4CAF50',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
  },
  botaoTexto: {
    color: '#fff',
    fontWeight: 'bold',
  },
  item: {
    backgroundColor: '#f0f0f0',
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
  },
  nomeAbrigo: {
    fontWeight: 'bold',
  },
  local: {
    fontSize: 12,
    color: '#555',
  },
});
