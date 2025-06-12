// screens/Adotante/Clinicas.js

import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TextInput, FlatList, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Cabecalho2 from '../../components/Cabecalho2';
import { firebase } from '../../firebase';

const db = firebase.firestore();

export default function Clinicas({ navigation }) {
  const [todasClinicas, setTodasClinicas] = useState([]); // Guarda a lista original
  const [clinicasFiltradas, setClinicasFiltradas] = useState([]); // Lista para ser exibida
  
  const [nomeFiltro, setNomeFiltro] = useState('');
  const [localizacaoFiltro, setLocalizacaoFiltro] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = db.collection('clinicas').onSnapshot(snapshot => {
      const lista = [];
      snapshot.forEach(doc => {
        lista.push({ id: doc.id, ...doc.data() });
      });
      setTodasClinicas(lista);
      setClinicasFiltradas(lista); // Inicialmente, mostra todas
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // CORRIGIDO: Função que aplica os filtros
  const aplicarFiltros = () => {
    let resultado = todasClinicas;

    if (nomeFiltro.trim() !== '') {
      resultado = resultado.filter((clinica) =>
        clinica.nome?.toLowerCase().includes(nomeFiltro.toLowerCase())
      );
    }

    if (localizacaoFiltro.trim() !== '') {
      resultado = resultado.filter((clinica) =>
        clinica.localizacao?.toLowerCase().includes(localizacaoFiltro.toLowerCase())
      );
    }

    setClinicasFiltradas(resultado);
  };
  
  // ADICIONADO: Função para limpar os filtros
  const limparFiltros = () => {
      setNomeFiltro('');
      setLocalizacaoFiltro('');
      setClinicasFiltradas(todasClinicas); // Volta a exibir a lista completa
  }

  if (loading) {
    return <ActivityIndicator size="large" color="#1a7f37" style={{flex: 1}}/>
  }

  return (
    <View style={styles.container}>
      <Cabecalho2 navigation={navigation} />

      <Text style={styles.subtitulo}>Carinho em forma de cuidado 🐾</Text>

      <Text style={styles.label}>Nome da Clínica Veterinária / Pet Shop:</Text>
      <View style={styles.selectInput}>
        <TextInput
          placeholder="Digite o nome..."
          value={nomeFiltro}
          onChangeText={setNomeFiltro}
          style={styles.textInput}
        />
      </View>

      <Text style={styles.label}>Localização:</Text>
      <View style={styles.selectInput}>
        <TextInput
          placeholder="Digite a cidade ou bairro..."
          value={localizacaoFiltro}
          onChangeText={setLocalizacaoFiltro}
          style={styles.textInput}
        />
      </View>
      
      {/* CORRIGIDO: Botões agora funcionam */}
      <View style={styles.botoesContainer}>
        <TouchableOpacity style={styles.botao} onPress={aplicarFiltros}>
            <Text style={styles.botaoTexto}>Aplicar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.botaoLimpar} onPress={limparFiltros}>
            <Text style={styles.botaoTexto}>Limpar</Text>
        </TouchableOpacity>
      </View>


      <FlatList
        data={clinicasFiltradas}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate('DetalhesClinica', { clinica: item })}
          >
            <Image source={{ uri: item.logoUrl || 'https://via.placeholder.com/40' }} style={styles.logoClinica} />
            <View style={{ flex: 1 }}>
              <Text style={styles.nome} numberOfLines={1}>{item.nome}</Text>
              <Text style={styles.local}>📍 {item.localizacao}</Text>
            </View>
          </TouchableOpacity>
        )}
        ListEmptyComponent={<Text style={styles.emptyText}>Nenhuma clínica encontrada.</Text>}
        contentContainerStyle={styles.list}
      />

      <View style={styles.footer}>
        <Ionicons name="home-outline" size={25} color="#fff" onPress={() => navigation.navigate('Opcoes')} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  subtitulo: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 14,
    marginVertical: 20,
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
  botoesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginHorizontal: 16,
    marginBottom: 20,
  },
  botao: {
    flex: 1,
    backgroundColor: '#1a7f37',
    padding: 12,
    borderRadius: 6,
    alignItems: 'center',
    marginRight: 5,
  },
  botaoLimpar: {
    flex: 1,
    backgroundColor: '#ccc',
    padding: 12,
    borderRadius: 6,
    alignItems: 'center',
    marginLeft: 5,
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
   emptyText: {
    textAlign: 'center',
    marginTop: 50,
    fontSize: 16,
    color: '#888'
  }
});