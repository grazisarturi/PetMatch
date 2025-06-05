import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function MensagensRecebidas({ navigation }) {
  const mensagens = [
    {
      id: 1,
      pet: 'Fred',
      nome: 'João Silva',
      mensagem: 'Olá, gostaria de saber mais sobre ela ...',
      hora: 'Hoje, 14:32',
      imagem: require('../images/fred.jpeg')
    },
    {
      id: 2,
      pet: 'Lili',
      nome: 'Maria Oliveira',
      mensagem: 'Ela ainda está disponível?',
      hora: 'Ontem, 10:20',
      imagem: require('../images/lili.jpeg')
    },
    {
      id: 3,
      pet: 'Mel',
      nome: 'Beatriz Azevedo',
      mensagem: 'Boa tarde, tenho interesse na adoção.',
      hora: 'Hoje, 15:08',
      imagem: require('../images/mel.jpg')
    }
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#1a7f37" />
        </TouchableOpacity>
        <Text style={styles.title}>Mensagens</Text>
        <View style={{ width: 24 }} />
      </View>
      <View style={styles.linhaInferior} />

      <ScrollView contentContainerStyle={styles.listContainer}>
        {mensagens.map((msg) => (
          <TouchableOpacity
            key={msg.id}
            style={styles.card}
            onPress={() => {
              alert(`Abrir conversa com ${msg.nome}`);
            }}
          >
            <View style={styles.infoContainer}>
              <Image source={msg.imagem} style={styles.imagem} />
              <View>
                <Text style={styles.pet}>{msg.pet}</Text>
                <Text style={styles.nome}>{msg.nome}</Text>
                <Text>{msg.mensagem}</Text>
              </View>
            </View>
            <Text style={styles.hora}>{msg.hora}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <View style={styles.footer}>
        <Ionicons name="home-outline" size={24} color="#fff" onPress={() => navigation.navigate('AbrigoDashboard')} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: {
    backgroundColor: '#fff', 
    paddingVertical: 30,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 35,
    fontWeight: 'bold',
    color: '#1a7f37',
  },
  linhaInferior: {
    height: 7,
    backgroundColor: '#1a7f37',
  },
  listContainer: {
    padding: 20
  },
  card: {
    backgroundColor: '#d1f2d1',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12
  },
  infoContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 4
  },
  imagem: {
    width: 40,
    height: 40,
    borderRadius: 20
  },
  pet: {
    fontWeight: 'bold'
  },
  nome: {
    color: '#333'
  },
  hora: {
    textAlign: 'right',
    fontSize: 12,
    color: '#555'
  },
  footer: {
    backgroundColor: '#1a7f37',
    alignItems: 'center',
    padding: 20,
    marginBottom: 10
  }
});
