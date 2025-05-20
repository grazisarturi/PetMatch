import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const clinicas = [
  {
    id: '1',
    nome: 'CLÍNICA VETERINÁRIA AMOR DE ALGUÉM',
    localizacao: 'R. Castro Alves, 362 - Centro, Dois Vizinhos - PR',
    imagem: require('../../images/clinica1.png'),
  },
  {
    id: '2',
    nome: 'CLÍNICA VETERINÁRIA AMOR DE ALGUÉM',
    localizacao: 'R. Castro Alves, 362 - Centro, Dois Vizinhos - PR',
    imagem: require('../../images/clinica1.png'),
  },
  {
    id: '3',
    nome: 'CLÍNICA VETERINÁRIA AMOR DE ALGUÉM',
    localizacao: 'R. Castro Alves, 362 - Centro, Dois Vizinhos - PR',
    imagem: require('../../images/clinica1.png'),
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
      {/* Cabeçalho */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#1a7f37" />
        </TouchableOpacity>
        <Text style={styles.logo}>PetMatch</Text>
        <View style={{ width: 24 }} />
      </View>
      <View style={styles.linhaInferior} />

      <Text style={styles.subtitulo}>Carinho em forma de cuidado 🐾</Text>

      <Text style={styles.label}>Nome do Clínica Veterinária/ Pet Shop:</Text>
      <TextInput
        placeholder=""
        value={nomeFiltro}
        onChangeText={setNomeFiltro}
        style={styles.input}
      />
      <Text style={styles.label}>Localização:</Text>
      <TextInput
        placeholder=""
        value={localizacaoFiltro}
        onChangeText={setLocalizacaoFiltro}
        style={styles.input}
      />

      <TouchableOpacity style={styles.botao}>
        <Text style={styles.botaoTexto}>APLICAR</Text>
      </TouchableOpacity>

      <FlatList
        data={clinicasFiltradas}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate('DetalhesClinica', { clinica: item })}
          >
            <Image source={item.imagem} style={styles.logoClinica} />
            <View style={{ flex: 1 }}>
              <Text style={styles.nome}>{item.nome}</Text>
              <Text style={styles.local}>📍 {item.localizacao}</Text>
            </View>
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.list}
      />

      {/* Rodapé */}
      <View style={styles.footer}>
        <Ionicons
          name="home-outline"
          size={25}
          color="#fff"
          onPress={() => navigation.navigate('Opcoes')}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff'},
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 50,
    marginHorizontal: 16,
  },
  logo: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#1a7f37',
  },
  linhaInferior: {
    height: 4,
    backgroundColor: '#1a7f37',
    width: '100%',
    marginBottom: 10,
  },
  subtitulo: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 14,
    marginBottom: 20,
  },
  label: {
    marginBottom: 5,
    fontWeight: '600',
    marginHorizontal: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#1a7f37',
    backgroundColor: '#b8f0b0',
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
    marginHorizontal: 16,
  },
  botao: {
    backgroundColor: '#1a7f37',
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
    marginHorizontal: 16,
  },
  botaoTexto: {
    color: '#fff',
    fontWeight: 'bold',
  },
  list: {
    paddingBottom: 100,
  },
  card: {
    backgroundColor: '#d9fdd3',
    borderRadius: 12,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#1a7f37',
    marginHorizontal: 16,
  },
  logoClinica: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderColor: '#ccc',
    borderWidth: 1,
  },
  nome: {
    fontWeight: 'bold',
    fontSize: 14,
    flexShrink: 1,
  },
  local: {
    fontSize: 12,
    color: '#4d4d4d',
  },
  footer: {
    backgroundColor: '#1a7f37',
    alignItems: 'center',
    padding: 20,
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
});
