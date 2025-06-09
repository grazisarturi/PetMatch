import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Cabecalho2 from '../../components/Cabecalho2';
import { firebase } from '../../firebase';

const db = firebase.firestore();

export default function PesquisarDoacoes({ navigation }) {
  const [localizacao, setLocalizacao] = useState('');
  const [abrigoSelecionado, setAbrigoSelecionado] = useState('');
  const [todasDoacoes, setTodasDoacoes] = useState([]);
  const [filtradas, setFiltradas] = useState([]);

  useEffect(() => {
    const unsubscribe = db.collection('doacoes').onSnapshot(snapshot => {
      const lista = [];
      snapshot.forEach(doc => {
        lista.push({ id: doc.id, ...doc.data() });
      });
      setTodasDoacoes(lista);
      setFiltradas(lista); // mostra tudo inicialmente
    });

    return () => unsubscribe();
  }, []);

  const aplicarFiltro = () => {
    const resultado = todasDoacoes.filter((d) => {
      const abrigoMatch =
        abrigoSelecionado.trim() === '' ||
        (d.abrigo && d.abrigo.toLowerCase().includes(abrigoSelecionado.toLowerCase()));
      const localMatch =
        localizacao.trim() === '' ||
        (d.localizacao && d.localizacao.toLowerCase().includes(localizacao.toLowerCase()));
      return abrigoMatch && localMatch;
    });
    setFiltradas(resultado);
  };

  const limparFiltro = () => {
    setAbrigoSelecionado('');
    setLocalizacao('');
    setFiltradas(todasDoacoes);
  };

  return (
    <View style={styles.container}>
      <Cabecalho2 navigation={navigation} />
      <View style={styles.linhaInferior} />
      <Text style={styles.titulo}>Pequenos gestos, grandes patinhas felizes 🐾</Text>

      <Text style={styles.label}>Nome do abrigo:</Text>
      <View style={styles.selectInput}>
        <TextInput value={abrigoSelecionado} onChangeText={setAbrigoSelecionado} style={styles.textInput} />
        <Ionicons name="chevron-down" size={20} color="#1a7f37" />
      </View>

      <Text style={styles.label}>Localização:</Text>
      <View style={styles.selectInput}>
        <TextInput value={localizacao} onChangeText={setLocalizacao} style={styles.textInput} />
        <Ionicons name="chevron-down" size={20} color="#1a7f37" />
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
        data={filtradas}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 80 }}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate('Doacoes', { abrigo: item })}
          >
            <Image source={require('../../images/logo.png')} style={styles.img} />
            <View style={styles.cardContent}>
              <Text style={styles.nomeAbrigo} numberOfLines={1}>{item.abrigo}</Text>
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
  },
  botao: {
    backgroundColor: '#1a7f37',
    padding: 12,
    borderRadius: 6,
    alignItems: 'center',
    minWidth: 100,
  },
  botaoLimpar: {
    backgroundColor: '#ccc',
    padding: 12,
    borderRadius: 6,
    alignItems: 'center',
    minWidth: 100,
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
    fontSize: 12,
    marginBottom: 2,
  },
  local: {
    fontSize: 11,
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
});
