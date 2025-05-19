import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, FlatList, TouchableOpacity } from 'react-native';

const clinicas = [
  {
    id: '1',
    nome: 'Clínica Veterinária Amor de Alguém',
    localizacao: 'Cascavel - PR',
  },
  {
    id: '2',
    nome: 'Clínica Pet Saúde',
    localizacao: 'Toledo - PR',
  },
  {
    id: '3',
    nome: 'Clínica Animal Cuidado & Vida',
    localizacao: 'Cascavel - PR',
  },
];

export default function Clinicas({ navigation }) {
  const [nomeFiltro, setNomeFiltro] = useState('');
  const [localizacaoFiltro, setLocalizacaoFiltro] = useState('');

  const aplicarFiltros = () => {
    return clinicas.filter((clinica) => {
      const nomeMatch = clinica.nome.toLowerCase().includes(nomeFiltro.toLowerCase());
      const localMatch = clinica.localizacao.toLowerCase().includes(localizacaoFiltro.toLowerCase());
      return nomeMatch && localMatch;
    });
  };

  const clinicasFiltradas = aplicarFiltros();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Clínicas Parceiras 🏥</Text>

      <TextInput
        placeholder="Nome da clínica"
        value={nomeFiltro}
        onChangeText={setNomeFiltro}
        style={styles.input}
      />
      <TextInput
        placeholder="Localização"
        value={localizacaoFiltro}
        onChangeText={setLocalizacaoFiltro}
        style={styles.input}
      />

      <FlatList
        data={clinicasFiltradas}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate('DetalhesClinica', { clinica: item })}
          >
            <Text style={styles.nome}>{item.nome}</Text>
            <Text style={styles.local}>{item.localizacao}</Text>
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 16,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  list: {
    paddingTop: 10,
  },
  card: {
    backgroundColor: '#f1f1f1',
    padding: 15,
    borderRadius: 12,
    marginBottom: 12,
  },
  nome: {
    fontSize: 16,
    fontWeight: '600',
  },
  local: {
    fontSize: 14,
    color: '#555',
  },
});
