import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, FlatList, ImageBackground, KeyboardAvoidingView, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { firebase } from '../../firebase';

export default function ChatAbrigo({ route, navigation }) {
  const { userId, nome } = route.params;
  const [mensagem, setMensagem] = useState('');
  const [mensagens, setMensagens] = useState([]);

  useEffect(() => {
    const unsubscribe = firebase.firestore()
      .collection('mensagens')
      .where('userId', '==', userId)
      .orderBy('criadoEm')
      .onSnapshot(snapshot => {
        const msgs = snapshot.docs.map(doc => doc.data());
        setMensagens(msgs);
      });

    return () => unsubscribe();
  }, []);

  const enviarMensagem = async () => {
    if (!mensagem.trim()) return;

    await firebase.firestore().collection('mensagens').add({
      texto: mensagem,
      tipo: 'recebida',
      userId,
      nome: nome || 'Abrigo',
      criadoEm: firebase.firestore.FieldValue.serverTimestamp()
    });

    setMensagem('');
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : undefined} keyboardVerticalOffset={90}>
      <View style={styles.topInfo}>
        <ImageBackground source={require('../../images/abrigo-logo.png')} style={styles.abrigoFoto} imageStyle={{ borderRadius: 50 }} />
        <Text style={styles.abrigoNome}>{nome}</Text>
      </View>

      <ImageBackground source={require('../../images/bg-patinhas.png')} style={styles.chatBackground}>
        <FlatList
          data={mensagens}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={{ padding: 15 }}
          renderItem={({ item }) => (
            <View style={[styles.mensagem, item.tipo === 'enviada' ? styles.recebida : styles.enviada]}>
              <Text style={styles.textoMensagem}>{item.texto}</Text>
            </View>
          )}
        />
      </ImageBackground>

      <View style={styles.areaInput}>
        <TextInput style={styles.input} placeholder="Responder..." value={mensagem} onChangeText={setMensagem} />
        <TouchableOpacity onPress={enviarMensagem} style={styles.botaoEnviar}>
          <Ionicons name="send" size={20} color="#fff" />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
  flex: 1, backgroundColor: '#fff' },
  topInfo: { flexDirection: 'row', alignItems: 'center', padding: 12 },
  abrigoFoto: { width: 45, height: 45, marginRight: 10 },
  abrigoNome: { fontWeight: 'bold', fontSize: 12, flexShrink: 1 },
  chatBackground: { flex: 1, resizeMode: 'cover' },
  mensagem: { padding: 12, marginVertical: 4, maxWidth: '75%', borderRadius: 12 },
  enviada: { alignSelf: 'flex-end', backgroundColor: '#1a7f37', marginRight: 10 },
  recebida: { alignSelf: 'flex-start', backgroundColor: '#a8e6a1', marginLeft: 10 },
  textoMensagem: { color: '#fff' },
  areaInput: { flexDirection: 'row', alignItems: 'center', padding: 10, backgroundColor: '#fff' },
  input: { flex: 1, backgroundColor: '#f2f2f2', borderRadius: 25, paddingHorizontal: 15, marginRight: 10 },
  botaoEnviar: {
  backgroundColor: '#1a7f37',
  borderRadius: 25,
  padding: 10 },
});
