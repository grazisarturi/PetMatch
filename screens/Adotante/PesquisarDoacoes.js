// screens/Adotante/PesquisarDoacoes.js

import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  ActivityIndicator
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Cabecalho2 from '../../components/Cabecalho2';
import { firebase } from '../../firebase';

const db = firebase.firestore();

export default function PesquisarDoacoes({ navigation }) {
  const [localizacaoFiltro, setLocalizacaoFiltro] = useState('');
  const [abrigoFiltro, setAbrigoFiltro] = useState('');

  const [todosAbrigos, setTodosAbrigos] = useState([]);
  const [abrigosFiltrados, setAbrigosFiltrados] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Busca todos os pedidos de doação para encontrar os abrigos únicos
    const unsubscribe = db.collection('doacoes').onSnapshot(snapshot => {
      const abrigosMap = new Map();
      snapshot.forEach(doc => {
        const data = doc.data();
        // Usamos o ID do abrigo para garantir que cada abrigo apareça apenas uma vez
        if (data.abrigoId && !abrigosMap.has(data.abrigoId)) {
          abrigosMap.set(data.abrigoId, {
            id: data.abrigoId,
            nome: data.abrigo,
            localizacao: data.localizacao
          });
        }
      });
      
      const listaUnicaDeAbrigos = Array.from(abrigosMap.values());
      setTodosAbrigos(listaUnicaDeAbrigos);
      setAbrigosFiltrados(listaUnicaDeAbrigos);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const aplicarFiltro = () => {
    let resultado = todosAbrigos;

    if (abrigoFiltro.trim() !== '') {
        resultado = resultado.filter(abrigo => 
            abrigo.nome.toLowerCase().includes(abrigoFiltro.toLowerCase())
        );
    }
    if (localizacaoFiltro.trim() !== '') {
        resultado = resultado.filter(abrigo => 
            abrigo.localizacao.toLowerCase().includes(localizacaoFiltro.toLowerCase())
        );
    }
    setAbrigosFiltrados(resultado);
  };

  const limparFiltro = () => {
    setAbrigoFiltro('');
    setLocalizacaoFiltro('');
    setAbrigosFiltrados(todosAbrigos);
  };

  if (loading) {
      return <ActivityIndicator size="large" color="#1a7f37" style={{flex: 1}}/>
  }

  return (
    <View style={styles.container}>
      <Cabecalho2 navigation={navigation} />
      <View style={styles.linhaInferior} />
      <Text style={styles.titulo}>Pequenos gestos, grandes patinhas felizes 🐾</Text>

      <Text style={styles.label}>Nome do abrigo:</Text>
      <View style={styles.selectInput}>
        <TextInput value={abrigoFiltro} onChangeText={setAbrigoFiltro} style={styles.textInput} placeholder="Digite o nome do abrigo" />
      </View>

      <Text style={styles.label}>Localização:</Text>
      <View style={styles.selectInput}>
        <TextInput value={localizacaoFiltro} onChangeText={setLocalizacaoFiltro} style={styles.textInput} placeholder="Digite a cidade ou bairro" />
      </View>

      <View style={styles.botoesContainer}>
        <TouchableOpacity style={styles.botao} onPress={aplicarFiltro}>
          <Text style={styles.botaoTexto}>Aplicar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.botaoLimpar} onPress={limparFiltro}>
          <Text style={styles.botaoTexto}>Limpar</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={abrigosFiltrados}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 80 }}
        ListEmptyComponent={<Text style={styles.emptyText}>Nenhum abrigo encontrado.</Text>}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            // CORRIGIDO: Passa o ID e o Nome do abrigo para a próxima tela
            onPress={() => navigation.navigate('Doacoes', { 
                abrigoId: item.id,
                abrigoNome: item.nome,
                abrigoLocalizacao: item.localizacao
            })}
          >
            <Image source={require('../../images/logo.png')} style={styles.img} />
            <View style={styles.cardContent}>
              <Text style={styles.nomeAbrigo} numberOfLines={1}>{item.nome}</Text>
              <Text style={styles.local}>{item.localizacao}</Text>
            </View>
          </TouchableOpacity>
        )}
      />

      <View style={styles.footer}>
        <Ionicons name="home-outline" size={25} color="#fff" onPress={() => navigation.navigate('Opcoes')} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  linhaInferior: {
    height: 4,
    backgroundColor: '#1a7f37',
    width: '100%',
  },
  titulo: {
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
    paddingHorizontal: 20,
  },
  label: {
    marginLeft: 20,
    marginBottom: 5,
    fontWeight: 'bold',
  },
  selectInput: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#1a7f37',
    marginHorizontal: 20,
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
    justifyContent: 'center',
    gap: 10,
    marginBottom: 20,
    marginHorizontal: 20,
  },
  botao: {
    flex: 1,
    backgroundColor: '#1a7f37',
    padding: 12,
    borderRadius: 6,
    alignItems: 'center',
  },
  botaoLimpar: {
    flex: 1,
    backgroundColor: '#ccc',
    padding: 12,
    borderRadius: 6,
    alignItems: 'center',
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
    borderColor: '#2e7d32',
  },
  img: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  cardContent: {
    flex: 1,
    flexShrink: 1,
  },
  nomeAbrigo: {
    fontWeight: 'bold',
    fontSize: 14,
    marginBottom: 2,
  },
  local: {
    fontSize: 12,
    color: '#2e7d32',
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    padding: 16,
    backgroundColor: '#1a7f37',
    alignItems: 'center',
  },
  emptyText: {
      textAlign: 'center',
      marginTop: 30,
      color: '#777'
  }
});