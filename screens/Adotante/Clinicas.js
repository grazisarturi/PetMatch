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
import Cabecalho2 from '../../components/Cabecalho2';

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
      <Cabecalho2 navigation={navigation} />      

      <Text style={styles.subtitulo}>Carinho em forma de cuidado 🐾</Text>

      <Text style={styles.label}>Nome da Clínica Veterinária / Pet Shop:</Text>
      <View style={styles.selectInput}>
        <TextInput
          placeholder=""
          value={nomeFiltro}
          onChangeText={setNomeFiltro}
          style={styles.textInput}
        />
        <Ionicons name="chevron-down" size={20} color="#1a7f37" />
      </View>

      <Text style={styles.label}>Localização:</Text>
      <View style={styles.selectInput}>
        <TextInput
          placeholder=""
          value={localizacaoFiltro}
          onChangeText={setLocalizacaoFiltro}
          style={styles.textInput}
        />
        <Ionicons name="chevron-down" size={20} color="#1a7f37" />
      </View>

      <TouchableOpacity style={styles.botao}>
        <Text style={styles.botaoTexto}>Aplicar</Text>
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
              <Text style={styles.nome} numberOfLines={1}>{item.nome}</Text>
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
  container: { flex: 1, backgroundColor: '#fff' },
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
    paddingHorizontal: 20,
  },
  label: {
    marginBottom: 5,
    fontWeight: '600',
    marginHorizontal: 16,
  },
  selectInput: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#1a7f37',
    marginHorizontal: 16,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginBottom: 10,
  },
  textInput: {
    flex: 1,
    height: 45,
    paddingVertical: 10,
    fontSize: 14,
  },
  botao: {
    backgroundColor: '#1a7f37',
    marginHorizontal: 100,
    padding: 12,
    borderRadius: 6,
    alignItems: 'center',
    marginBottom: 20,
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
