// screens/Adotante/TelaInicial.js

import React, { useState, useRef, useEffect } from 'react';
import {
  View, Text, StyleSheet, FlatList, Image, TouchableOpacity, Animated,
  Dimensions, TextInput, ScrollView, ActivityIndicator
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import { firebase } from '../../firebase';

const { width } = Dimensions.get('window');
const db = firebase.firestore();

export default function Home({ navigation }) {
  const [showFilters, setShowFilters] = useState(false);
  const slideAnim = useRef(new Animated.Value(-width)).current;

  // Estados dos filtros
  const [idade, setIdade] = useState('');
  const [localizacao, setLocalizacao] = useState('');
  const [especie, setEspecie] = useState('');
  const [sexo, setSexo] = useState('');
  const [porte, setPorte] = useState('');

  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);

  const toggleFilters = () => {
    Animated.timing(slideAnim, {
      toValue: showFilters ? -width : 0,
      duration: 300,
      useNativeDriver: false,
    }).start(() => setShowFilters(!showFilters));
  };

  // CORRIGIDO: Função para buscar pets com filtros
  const fetchPets = async () => {
    setLoading(true);
    try {
      let query = db.collection('animais');

      if (idade) query = query.where('idade', '==', idade);
      if (localizacao) query = query.where('localizacao', '>=', localizacao).where('localizacao', '<=', localizacao + '\uf8ff');
      if (especie) query = query.where('especie', '==', especie);
      if (sexo) query = query.where('sexo', '==', sexo);
      if (porte) query = query.where('porte', '==', porte);

      const snapshot = await query.get();
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setPets(data);
    } catch (error) {
      console.error('Erro ao buscar animais:', error);
      Alert.alert("Erro", "Ocorreu um erro ao aplicar os filtros. O Firebase pode exigir a criação de índices compostos para esta consulta. Verifique o console de erro do seu app.");
    } finally {
      setLoading(false);
    }
  };
  
  // Busca inicial sem filtros
  useEffect(() => {
    fetchPets();
  }, []);

  const handleApplyFilters = () => {
    fetchPets();
    toggleFilters(); // Fecha o painel após aplicar
  };

  const clearFilters = () => {
    setIdade('');
    setLocalizacao('');
    setEspecie('');
    setSexo('');
    setPorte('');
    // A busca será refeita sem filtros no próximo passo
    fetchPets();
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.card}
      onPress={() => navigation.navigate('DetalhesAnimal', { id: item.id })}
    >
      <Image
        source={{ uri: item.imagem || 'https://cdn-icons-png.flaticon.com/512/616/616408.png' }}
        style={styles.image}
      />
      <Text style={styles.name}>{item.nome}</Text>
      <Text style={styles.link}>Conhecer</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.appName}>PetMatch</Text>
      </View>

      <Text style={styles.title}>Adote um amor, transforme uma vida!</Text>

      {loading ? (
        <ActivityIndicator size="large" color="#1a7f37" />
      ) : (
        <FlatList
          data={pets}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          numColumns={2}
          contentContainerStyle={styles.list}
          ListEmptyComponent={<Text style={styles.emptyText}>Nenhum pet encontrado com esses filtros.</Text>}
        />
      )}

      <View style={styles.footer}>
        <TouchableOpacity onPress={toggleFilters}>
          <Ionicons name="filter" size={24} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Opcoes')}>
          <Ionicons name="home-outline" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      <Animated.View style={[styles.filterPanel, { left: slideAnim }]}>
        <ScrollView contentContainerStyle={styles.scroll}>
          <Text style={styles.filterTitle}>Filtros Avançados</Text>

          <Text style={styles.label}>Idade:</Text>
          <TextInput style={styles.input} placeholder="Ex: 2 anos" value={idade} onChangeText={setIdade} />

          <Text style={styles.label}>Localização:</Text>
          <TextInput style={styles.input} placeholder="Cidade" value={localizacao} onChangeText={setLocalizacao} />

          <Text style={styles.label}>Espécie:</Text>
          <Picker selectedValue={especie} onValueChange={setEspecie} style={styles.picker}>
            <Picker.Item label="Qualquer" value="" />
            <Picker.Item label="Cão" value="Cachorro" />
            <Picker.Item label="Gato" value="Gato" />
          </Picker>

          <Text style={styles.label}>Sexo:</Text>
          <Picker selectedValue={sexo} onValueChange={setSexo} style={styles.picker}>
            <Picker.Item label="Qualquer" value="" />
            <Picker.Item label="Macho" value="Macho" />
            <Picker.Item label="Fêmea" value="Fêmea" />
          </Picker>

          <Text style={styles.label}>Porte:</Text>
          <Picker selectedValue={porte} onValueChange={setPorte} style={styles.picker}>
            <Picker.Item label="Qualquer" value="" />
            <Picker.Item label="Pequeno" value="Pequeno" />
            <Picker.Item label="Médio" value="Médio" />
            <Picker.Item label="Grande" value="Grande" />
          </Picker>
          
          {/* CORRIGIDO: Botões de Ação */}
          <TouchableOpacity style={styles.applyButton} onPress={handleApplyFilters}>
            <Text style={styles.applyText}>APLICAR FILTROS</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.clearButton} onPress={clearFilters}>
            <Text style={styles.clearText}>LIMPAR FILTROS</Text>
          </TouchableOpacity>
        </ScrollView>
      </Animated.View>
    </View>
  );
}

// ESTILOS (Adicionado clearButton e emptyText)
const styles = StyleSheet.create({
 container: { flex: 1, backgroundColor: '#fff', paddingTop: 40 },
  header: {
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    marginBottom: 10,
  },
  appName: {
    fontSize: 35,
    fontWeight: 'bold',
    color: '#1a7f37',
    textAlign: 'center',
    width: '100%',
  },
  title: {
    marginTop: 10,
    fontSize: 18,
    textAlign: 'center',
    fontWeight: 'bold',
    backgroundColor: '#1a7f37',
    color: '#fff',
    paddingVertical: 12,
  },
  list: {
    padding: 10,
    paddingBottom: 100,
  },
  card: {
    backgroundColor: '#b8f0b0',
    borderRadius: 10,
    padding: 10,
    margin: 10,
    flex: 1/2, // Usa flex para ocupar metade do espaço
    alignItems: 'center',
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 8,
  },
  name: {
    marginVertical: 8,
    fontWeight: 'bold',
  },
  link: {
    color: '#1a7f37',
    fontWeight: 'bold',
    textDecorationLine: 'underline'
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    height: 60,
    backgroundColor: '#1a7f37',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  filterPanel: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: width * 0.85,
    backgroundColor: '#f2f2f2',
    padding: 20,
    zIndex: 10,
    elevation: 10,
    borderRightWidth: 1,
    borderRightColor: '#ccc'
  },
  scroll: {
    paddingBottom: 100,
  },
  filterTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center'
  },
  label: {
    fontWeight: 'bold',
    marginTop: 15,
    fontSize: 14,
    color: '#333'
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 10,
    marginTop: 5,
    borderWidth: 1,
    borderColor: '#ccc'
  },
  picker: {
    backgroundColor: '#fff',
    marginTop: 5,
    borderWidth: 1,
    borderColor: '#ccc'
  },
  applyButton: {
    marginTop: 30,
    backgroundColor: '#1a7f37',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  applyText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  clearButton: {
    marginTop: 10,
    backgroundColor: '#aaa',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  clearText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 50,
    fontSize: 16,
    color: '#888'
  }
});