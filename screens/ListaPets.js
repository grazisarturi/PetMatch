import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function ListaPets({ navigation }) {
  // Estado para a lista de pets, para permitir exclusão dinâmica
  const [pets, setPets] = useState([
    { id: 1, nome: 'Fred', imagem: require('../images/fred.jpeg') },
    { id: 2, nome: 'Lili', imagem: require('../images/lili.jpeg') }
  ]);

  const editar = (pet) => {
    Alert.alert('Editar', `Você quer editar ${pet.nome}?`, [
      {
        text: 'Cancelar',
        style: 'cancel'
      },
      {
        text: 'OK',
        onPress: () => {
          // Navegar para o formulário de edição, passando o pet como parâmetro
          navigation.navigate('CadastroAnimal', { pet });
        }
      }
    ]);
  };

  const excluir = (pet) => {
    Alert.alert(
      'Excluir',
      `Tem certeza que deseja excluir ${pet.nome}?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: () => {
            // Remove o pet do estado para atualizar a lista na tela
            setPets((prevPets) => prevPets.filter((p) => p.id !== pet.id));
          }
        }
      ]
    );
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

      <ScrollView contentContainerStyle={styles.listContainer}>
        {pets.map((pet) => (
          <View key={pet.id} style={styles.card}>
            <Image source={pet.imagem} style={styles.image} />

            <View style={styles.center}>
              <Text style={styles.nome}>{pet.nome}</Text>
            </View>

            <View style={styles.botoes}>
              <TouchableOpacity style={styles.botaoEditar} onPress={() => editar(pet)}>
                <Text style={styles.textoEditar}>Editar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.botaoExcluir} onPress={() => excluir(pet)}>
                <Text style={styles.textoExcluir}>Excluir</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}

        <TouchableOpacity
          style={styles.cadastrar}
          onPress={() => navigation.navigate('CadastroAnimal')}
        >
          <Text style={styles.cadastrarTexto}>Cadastrar novo animal</Text>
        </TouchableOpacity>
      </ScrollView>

      <View style={styles.footer}>
        <Ionicons
          name="home-outline"
          size={25}
          color="#fff"
          onPress={() => navigation.navigate('AbrigoDashboard')}
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
  listContainer: {
    padding: 30
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#1a7f37',
    borderRadius: 12,
    padding: 10,
    marginBottom: 20,
    backgroundColor: '#fff'
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 8
  },
  center: {
    flex: 1,
    alignItems: 'center'
  },
  nome: {
    fontSize: 16,
    fontWeight: 'bold'
  },
  botoes: {
    justifyContent: 'center',
    alignItems: 'flex-end',
    gap: 8
  },
  botaoEditar: {
    backgroundColor: '#e6f4ea',
    paddingVertical: 6,
    paddingHorizontal: 17,
    borderRadius: 6,
    borderColor: '#1a7f37',
    borderWidth: 1
  },
  textoEditar: {
    color: '#1a7f37',
    fontWeight: 'bold'
  },
  botaoExcluir: {
    backgroundColor: '#fde8e8',
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 6,
    borderColor: '#e53935',
    borderWidth: 1,
    marginTop: 8
  },
  textoExcluir: {
    color: '#e53935',
    fontWeight: 'bold'
  },
  cadastrar: {
    backgroundColor: '#1a7f37',
    padding: 14,
    borderRadius: 6,
    alignItems: 'center',
    marginTop: 200
  },
  cadastrarTexto: {
    color: '#fff',
    fontWeight: 'bold'
  },
  footer: {
    backgroundColor: '#1a7f37',
    alignItems: 'center',
    padding: 20,
    marginBottom: 10
  }
});
