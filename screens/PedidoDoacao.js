// screens/PedidoDoacao.js

import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView, Alert, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Cabecalho2 from '../components/Cabecalho2';
import { firebase } from '../firebase';

const db = firebase.firestore();

export default function PedidoDoacao({ navigation }) {
  const [item, setItem] = useState('');
  const [quantidade, setQuantidade] = useState('');
  const [descricao, setDescricao] = useState('');
  const [abrigoInfo, setAbrigoInfo] = useState(null);
  
  // ADICIONADO: Estado de carregamento para controlar o botão
  const [isLoading, setIsLoading] = useState(true);
  
  const userId = firebase.auth().currentUser?.uid;

  useEffect(() => {
    if (userId) {
      db.collection('abrigos').doc(userId).get()
        .then(doc => {
          if (doc.exists) {
            setAbrigoInfo(doc.data());
          }
        })
        .finally(() => {
          // ATUALIZADO: Libera o carregamento (e o botão) quando a busca termina
          setIsLoading(false);
        });
    } else {
        setIsLoading(false);
    }
  }, [userId]);
  
  const handlePedido = async () => {
    // ATUALIZADO: Bloqueia a função se estiver carregando
    if (isLoading) return;

    if (!item || !quantidade) {
      Alert.alert('Erro', 'Os campos "Item" e "Quantidade" são obrigatórios.');
      return;
    }

    if (!userId || !abrigoInfo) {
      Alert.alert('Erro', 'Não foi possível identificar o abrigo. Tente novamente.');
      return;
    }
    
    setIsLoading(true); // Bloqueia o botão novamente para evitar cliques duplos

    try {
      await db.collection('doacoes').add({
        item,
        quantidade,
        descricao,
        abrigoId: userId,
        abrigo: abrigoInfo.nome,
        // CORRIGIDO: Garante que a localização seja salva (se existir no perfil do abrigo)
        localizacao: abrigoInfo.localizacao || 'Não informada',
        criadoEm: firebase.firestore.FieldValue.serverTimestamp(),
      });
      
      Alert.alert('Sucesso', 'Pedido de doação enviado com sucesso!');
      navigation.goBack();
      
    } catch(error) {
      console.error("Erro ao criar pedido:", error);
      Alert.alert('Erro', 'Ocorreu um erro ao criar o pedido de doação.');
    } finally {
      setIsLoading(false); // Libera o botão
    }
  }

  return (
    <View style={styles.container}>
      <Cabecalho2 navigation={navigation} />

      <ScrollView contentContainerStyle={styles.form}>
        <Text style={styles.title}>Criar Pedido de Doação</Text>
        
        <View style={styles.inputGroup}>
            <Text style={styles.label}>Item*</Text>
            <TextInput style={styles.input} value={item} onChangeText={setItem} placeholder="Ex: Ração para filhotes"/>
        </View>

        <View style={styles.inputGroup}>
            <Text style={styles.label}>Quantidade*</Text>
            <TextInput style={styles.input} value={quantidade} onChangeText={setQuantidade} placeholder="Ex: 10kg"/>
        </View>

        <View style={styles.inputGroup}>
            <Text style={styles.label}>Descrição (Opcional)</Text>
            <TextInput style={[styles.input, { height: 80 }]} multiline value={descricao} onChangeText={setDescricao} placeholder="Alguma observação sobre o item?"/>
        </View>

        {/* ATUALIZADO: O botão agora usa o estado de isLoading */}
        <TouchableOpacity
            style={[styles.botao, isLoading && styles.botaoDesabilitado]} // Aplica estilo de desabilitado
            onPress={handlePedido}
            disabled={isLoading} // Desabilita o botão enquanto carrega
        >
            {isLoading ? (
                <ActivityIndicator color="#fff" />
            ) : (
                <Text style={styles.botaoTexto}>Adicionar Pedido</Text>
            )}
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
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333'
  },
  inputGroup: {
    marginBottom: 15
  },
  label: {
    fontWeight: 'bold',
    marginBottom: 5,
    fontSize: 14,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    padding: 12,
  },
  botao: {
    backgroundColor: '#1a7f37',
    padding: 14,
    borderRadius: 6,
    alignItems: 'center',
    marginTop: 10
  },
  // ADICIONADO: Estilo para o botão desabilitado
  botaoDesabilitado: {
    backgroundColor: '#999'
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