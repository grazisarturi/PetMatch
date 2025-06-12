import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground, KeyboardAvoidingView, Platform, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { firebase } from '../firebase';
import Cabecalho2 from '../components/Cabecalho2';

const getConversationId = (uid1, uid2) => {
  return uid1 < uid2 ? `${uid1}_${uid2}` : `${uid2}_${uid1}`;
};

export default function ChatScreen({ route, navigation }) {
  const { otherUserId, otherUserName } = route.params;
  const currentUser = firebase.auth().currentUser;

  const [mensagem, setMensagem] = useState('');
  const [mensagens, setMensagens] = useState([]);
  
  const conversationId = getConversationId(currentUser.uid, otherUserId);

  useEffect(() => {
    const unsubscribe = firebase.firestore()
      .collection('conversas')
      .doc(conversationId)
      .collection('mensagens')
      .orderBy('criadoEm', 'desc') // CORRIGIDO: Ordem alterada para 'desc'
      .onSnapshot(snapshot => {
        const msgs = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setMensagens(msgs);
      });

    return () => unsubscribe();
  }, [conversationId]);

  const enviarMensagem = async () => {
    if (!mensagem.trim()) return;

    const messageData = {
      texto: mensagem,
      de: currentUser.uid,
      para: otherUserId,
      criadoEm: firebase.firestore.FieldValue.serverTimestamp(),
    };

    try {
      await firebase.firestore()
        .collection('conversas')
        .doc(conversationId)
        .collection('mensagens')
        .add(messageData);

      await firebase.firestore().collection('conversas').doc(conversationId).set({
        lastMessage: messageData,
        participantes: [currentUser.uid, otherUserId],
        nomesParticipantes: {
            [currentUser.uid]: currentUser.displayName || currentUser.email,
            [otherUserId]: otherUserName,
        }
      }, { merge: true });

      setMensagem('');
    } catch (error) {
      console.error("Erro ao enviar mensagem:", error);
    }
  };

  const renderItem = useCallback(({ item }) => (
    <View
      style={[
        styles.mensagem,
        item.de === currentUser.uid ? styles.enviada : styles.recebida
      ]}
    >
      <Text style={item.de === currentUser.uid ? styles.textoEnviado : styles.textoRecebido}>
        {item.texto}
      </Text>
    </View>
  ), [currentUser.uid]);

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
    >
      <Cabecalho2 navigation={navigation}/>
      <View style={styles.topInfo}>
        <Text style={styles.abrigoNome}>{otherUserName}</Text>
      </View>

      <ImageBackground
        source={require('../images/bg-patinhas.png')}
        style={styles.chatBackground}
      >
        <FlatList
          data={mensagens}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={{ padding: 15 }}
          inverted 
        />
      </ImageBackground>

      <View style={styles.areaInput}>
        <TextInput
          style={styles.input}
          placeholder="Escreva..."
          value={mensagem}
          onChangeText={setMensagem}
        />
        <TouchableOpacity onPress={enviarMensagem} style={styles.botaoEnviar}>
          <Ionicons name="send" size={20} color="#fff" />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  topInfo: { flexDirection: 'row', alignItems: 'center', padding: 12, justifyContent: 'center', borderBottomWidth: 1, borderBottomColor: '#eee' },
  abrigoNome: { fontWeight: 'bold', fontSize: 16, color: '#333' },
  chatBackground: { flex: 1, resizeMode: 'cover' },
  mensagem: { paddingVertical: 8, paddingHorizontal: 12, marginVertical: 4, maxWidth: '80%', borderRadius: 18 },
  enviada: { alignSelf: 'flex-end', backgroundColor: '#1a7f37', marginRight: 10 },
  recebida: { alignSelf: 'flex-start', backgroundColor: '#e5e5ea', marginLeft: 10 },
  textoEnviado: { color: '#fff' },
  textoRecebido: { color: '#000' },
  areaInput: { flexDirection: 'row', alignItems: 'center', padding: 10, backgroundColor: '#fff', borderTopWidth: 1, borderTopColor: '#ddd' },
  input: {
    flex: 1,
    backgroundColor: '#f2f2f2',
    borderRadius: 25,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginRight: 10,
  },
  botaoEnviar: {
    backgroundColor: '#1a7f37',
    borderRadius: 25,
    padding: 12,
  },
});