import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet, ScrollView,} from 'react-native';
import {MaterialCommunityIcons, FontAwesome5, Ionicons,} from '@expo/vector-icons';
import Cabecalho1 from '../components/Cabecalho1';


export default function AbrigoDashboard({ navigation }) {
  return (
    <View style={styles.container}>
      <Cabecalho1/>

      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.question}>O que está buscando hoje?</Text>

        <TouchableOpacity
          style={styles.card}
          onPress={() => navigation.navigate('ListaPets')}
        >
          <MaterialCommunityIcons name="paw" size={24} color="#000" />
          <Text style={styles.cardText}>Cadastrar pet para adoção</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.card}
          onPress={() => navigation.navigate('ListaDoacoes')}
        >
          <FontAwesome5 name="gift" size={20} color="#000" />
          <Text style={styles.cardText}>Adicionar pedido de doação</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.card}
          onPress={() => navigation.navigate('Mensagens')}
        >
          <Ionicons name="chatbubbles" size={22} color="#000" />
          <Text style={styles.cardText}>Mensagens recebidas</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.logout}
          onPress={() => navigation.navigate('Login')}
        >
          <Ionicons name="log-out-outline" size={20} color="red" />
          <Text style={styles.logoutText}>Sair da conta</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  content: {
    padding: 20,
  },
  question: {
    fontSize: 18,
    marginBottom: 30,
    fontWeight: 'bold',
  },
  card: {
    borderWidth: 1.5,
    borderColor: '#000000',
    borderRadius: 8,
    padding: 30,
    marginBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  cardText: {
    color: '#1a7f37',
    fontWeight: 'bold',
    fontSize: 16,
  },
  logout: {
    flexDirection: 'row',
    marginTop: 30, 
    alignItems: 'center',
  },
  logoutText: {
    color: 'red',
    fontWeight: 'bold',
    marginLeft: 6,
  },
});
