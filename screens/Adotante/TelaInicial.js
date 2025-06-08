import React, { useState, useRef, useEffect } from 'react';
import {
  View, Text, StyleSheet, FlatList, Image, TouchableOpacity, Animated,
  Dimensions, TextInput, ScrollView
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import { firebase } from '../../firebase';

const { width } = Dimensions.get('window');

export default function Home({ navigation }) {
  const [showFilters, setShowFilters] = useState(false);
  const slideAnim = useRef(new Animated.Value(-width)).current;

  const [idade, setIdade] = useState('');
  const [localizacao, setLocalizacao] = useState('');
  const [especie, setEspecie] = useState('');
  const [sexo, setSexo] = useState('');
  const [porte, setPorte] = useState('');

  const [pets, setPets] = useState([]);

  const toggleFilters = () => {
    Animated.timing(slideAnim, {
      toValue: showFilters ? -width : 0,
      duration: 300,
      useNativeDriver: false,
    }).start(() => setShowFilters(!showFilters));
  };

  useEffect(() => {
    const fetchPets = async () => {
      try {
        const snapshot = await firebase.firestore().collection('animais').get();
        const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setPets(data);
      } catch (error) {
        console.error('Erro ao buscar animais:', error);
      }
    };
    fetchPets();
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Image
        source={{ uri: 'https://cdn-icons-png.flaticon.com/512/616/616408.png' }}
        style={styles.image}
      />

      <Text style={styles.name}>{item.nome}</Text>
      <TouchableOpacity onPress={() => navigation.navigate('DetalhesAnimal', { petId: item.id })}>
        <Text style={styles.link}>Conhecer</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#1a7f37" />
        </TouchableOpacity>
        <Text style={styles.appName}>PetMatch</Text>
      </View>

      <Text style={styles.title}>Adote um amor, transforme uma vida!</Text>

      <FlatList
        data={pets}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        numColumns={2}
        contentContainerStyle={styles.list}
      />

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

          <Text style={styles.label}>Idade Aproximada:</Text>
          <TextInput style={styles.input} placeholder="Ex: 1 ano" value={idade} onChangeText={setIdade} />

          <Text style={styles.label}>Localização:</Text>
          <TextInput style={styles.input} placeholder="Cidade" value={localizacao} onChangeText={setLocalizacao} />

          <Text style={styles.label}>Espécie:</Text>
          <Picker selectedValue={especie} onValueChange={(value) => setEspecie(value)} style={styles.picker}>
            <Picker.Item label="Selecione..." value="" />
            <Picker.Item label="Cão" value="Cachorro" />
            <Picker.Item label="Gato" value="Gato" />
            <Picker.Item label="Outro" value="Outro" />
          </Picker>

          <Text style={styles.label}>Sexo:</Text>
          <Picker selectedValue={sexo} onValueChange={(value) => setSexo(value)} style={styles.picker}>
            <Picker.Item label="Selecione..." value="" />
            <Picker.Item label="Macho" value="Macho" />
            <Picker.Item label="Fêmea" value="Fêmea" />
          </Picker>

          <Text style={styles.label}>Porte:</Text>
          <Picker selectedValue={porte} onValueChange={(value) => setPorte(value)} style={styles.picker}>
            <Picker.Item label="Selecione..." value="" />
            <Picker.Item label="Pequeno" value="Pequeno" />
            <Picker.Item label="Médio" value="Médio" />
            <Picker.Item label="Grande" value="Grande" />
          </Picker>

          <TouchableOpacity style={styles.applyButton} onPress={toggleFilters}>
            <Text style={styles.applyText}>APLICAR</Text>
          </TouchableOpacity>
        </ScrollView>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', paddingTop: 40 },
  header: {
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    marginBottom: 10,
  },
  backButton: {
    position: 'absolute',
    left: 20,
    zIndex: 1,
  },
  appName: {
    fontSize: 35,
    fontWeight: 'bold',
    color: '#1a7f37',
    textAlign: 'center',
    width: '100%',
  },
  title: {
    marginTop: 30,
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
    width: '43%',
    alignItems: 'center',
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 8,
  },
  name: {
    marginVertical: 5,
    fontWeight: 'bold',
  },
  link: {
    color: '#1a7f37',
    fontWeight: 'bold',
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
    backgroundColor: '#b8f0b0',
    padding: 20,
    zIndex: 10,
    elevation: 10,
  },
  scroll: {
    paddingBottom: 100,
  },
  filterTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  label: {
    fontWeight: 'bold',
    marginTop: 10,
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 10,
    marginTop: 5,
  },
  picker: {
    backgroundColor: '#fff',
    borderRadius: 8,
    marginTop: 5,
  },
  applyButton: {
    marginTop: 20,
    backgroundColor: '#1a7f37',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  applyText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
