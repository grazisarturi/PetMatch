import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function PesquisarDoacoes({ navigation }) {
  const [localizacao, setLocalizacao] = useState('');
  const [abrigoSelecionado, setAbrigoSelecionado] = useState('');

  const abrigos = [
    {
      id: '1',
      nome: 'ABRIGO DE ANIMAIS SÃO FRANCISCO DE ASSIS DE CASCAVEL-PR',
      local: 'R. Paranaguá, 1149 - Bairro São Cristóvão, Cascavel - PR',
      imagem: require('../../images/abrigo-logo.png'),
    },
    {
      id: '2',
      nome: 'ABRIGO DE ANIMAIS SÃO FRANCISCO DE ASSIS DE CASCAVEL-PR',
      local: 'R. Paranaguá, 1149 - Bairro São Cristóvão, Cascavel - PR',
      imagem: require('../../images/abrigo-logo.png'),
    },
  ];

  const aplicarFiltro = () => {

  };

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

      <Text style={styles.titulo}>Pequenos gestos, grandes patinhas felizes 🐾</Text>

      <Text style={styles.label}>Nome do abrigo:</Text>
      <View style={styles.selectInput}>
        <TextInput
          placeholder=""
          style={{ flex: 1 }}
          value={abrigoSelecionado}
          onChangeText={setAbrigoSelecionado}
        />
        <Ionicons name="chevron-down" size={20} color="#1a7f37" />
      </View>

      <Text style={styles.label}>Localização:</Text>
      <View style={styles.selectInput}>
        <TextInput
          placeholder=""
          style={{ flex: 1 }}
          value={localizacao}
          onChangeText={setLocalizacao}
        />
        <Ionicons name="chevron-down" size={20} color="#1a7f37" />
      </View>

      <TouchableOpacity style={styles.botao} onPress={aplicarFiltro}>
        <Text style={styles.botaoTexto}>Aplicar</Text>
      </TouchableOpacity>

      {/* Lista de abrigos */}
      <FlatList
        data={abrigos}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 80 }}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate('Doacoes', { abrigo: item })}
          >
            <Image source={item.imagem} style={styles.img} />
            <View>
              <Text style={styles.nomeAbrigo}>{item.nome}</Text>
              <Text style={styles.local}>{item.local}</Text>
            </View>
          </TouchableOpacity>
        )}
      />

      {/* Footer */}
      <View style={styles.footer}>
        <Ionicons name="home-outline" size={25} color="#fff" onPress={() => navigation.navigate('Opcoes')} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
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
  titulo: {
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
    paddingHorizontal: 20
  },
  label: {
    marginLeft: 20,
    marginBottom: 5,
    fontWeight: 'bold'
  },
  selectInput: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#1a7f37',
    marginHorizontal: 20,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginBottom: 10
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
  card: {
    flexDirection: 'row',
    backgroundColor: '#d4f8cd',
    marginHorizontal: 16,
    marginBottom: 12,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#2e7d32'
  },
  img: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10
  },
  nomeAbrigo: {
    fontWeight: 'bold',
    fontSize: 12,
    marginBottom: 2
  },
  local: {
    fontSize: 11,
    color: '#2e7d32'
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    padding: 16,
    backgroundColor: '#1a7f37',
    alignItems: 'center',
  }
});
