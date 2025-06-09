import React from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Cabecalho2 from '../components/Cabecalho2';

export default function PedidoDoacao({ navigation }) {
  return (
    <View style={styles.container}>
      <Cabecalho2 navigation={navigation} />

      <ScrollView contentContainerStyle={styles.form}>
        <TouchableOpacity style={styles.fotoBox}>
            <Ionicons name="camera-outline" size={32} />
            <Text style={styles.fotoText}>Adicionar Foto</Text>
        </TouchableOpacity>

        <View style={styles.inputGroup}>
            <Text style={styles.label}>Item</Text>
            <TextInput style={styles.input} />
        </View>

        <View style={styles.inputGroup}>
            <Text style={styles.label}>Quantidade</Text>
            <TextInput style={styles.input}/>
        </View>

        <View style={styles.inputGroup}>
            <Text style={styles.label}>Abrigo</Text>
            <TextInput style={styles.input} />
        </View>

        <View style={styles.inputGroup}>
            <Text style={styles.label}>Localização</Text>
            <TextInput style={styles.input} />
        </View>

        <View style={styles.inputGroup}>
            <Text style={styles.label}>Descrição</Text>
            <TextInput style={[styles.input, { height: 80 }]} multiline />
        </View>

        <TouchableOpacity
            style={styles.botao}
            onPress={() => Alert.alert('Pedido', 'Pedido de doação enviado com sucesso!')}
        >
            <Text style={styles.botaoTexto}>Adicionar</Text>
        </TouchableOpacity>
    </ScrollView>

      <View style={styles.footer}>
            <Ionicons name="home-outline" size={25} color="#fff" 
            onPress={() => navigation.navigate('AbrigoDashboard')}/>
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  form: {
    padding: 20
  },
  fotoBox: {
    height: 100,
    width: 150,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 25,
    marginLeft: 110
  },
  fotoText: {
    color: '#666',
    marginTop: 5
  },
  input: {
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 6,
    padding: 12,
    marginBottom: 15
  },
  botao: {
    backgroundColor: '#1a7f37',
    padding: 14,
    borderRadius: 6,
    alignItems: 'center',
    marginTop: 10
  },
  botaoTexto: {
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
