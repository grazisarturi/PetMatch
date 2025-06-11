import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { firebase } from '../../firebase';  // ajuste o caminho conforme seu projeto
import Cabecalho2 from '../../components/Cabecalho2';

export default function Chat({ route, navigation }) {
  // Usuário adotante (logado)
  const userId = firebase.auth().currentUser.uid;
  const nome = firebase.auth().currentUser.email;

  // Pegando o ID do abrigo e nome do contato da rota (passados na navegação)

  console.log('route.params:', route.params);

  let abrigoId = null
  let nameContato = 'Abrigo';

  const [mensagem, setMensagem] = useState('');
  const [mensagens, setMensagens] = useState([]);

  useEffect(() => {
    if (!abrigoId) return;

    // Escuta mensagens entre adotante e abrigo
    const unsubscribe = firebase
      .firestore()
      .collection('mensagens')
      .where('de', 'in', [userId, abrigoId])
      .where('para', 'in', [userId, abrigoId])
      .orderBy('criadoEm')
      .onSnapshot((snapshot) => {
        const msgs = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setMensagens(msgs);
      });

    return () => unsubscribe();
  }, [abrigoId]);

  async function enviarMensagem() {
    if (!mensagem.trim()) return;

    await firebase.firestore().collection('mensagens').add({
      texto: mensagem,
      tipo: 'enviada',
      userId: userId,
      abrigoId: abrigoId,
      nome,
      criadoEm: firebase.firestore.FieldValue.serverTimestamp(),
    });

    setMensagem('');
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={90}
    >
      <Cabecalho2 navigation={navigation} />

      <View style={styles.topInfo}>
        <ImageBackground
          source={require('../../images/abrigo-logo.png')}
          style={styles.abrigoFoto}
          imageStyle={{ borderRadius: 50 }}
        />
        <Text style={styles.abrigoNome}>{'Ana clara'}</Text>
      </View>

      <ImageBackground
        source={require('../../images/bg-patinhas.png')}
        style={styles.chatBackground}
      >
        <FlatList
          data={mensagens}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ padding: 15 }}
          renderItem={({ item }) => (
            <View
              style={[
                styles.mensagem,
                item.de === userId ? styles.enviada : styles.recebida,
              ]}
            >
              <Text style={styles.textoMensagem}>{item.texto}</Text>
            </View>
          )}
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

      <View style={styles.footer}>
        <Ionicons
          name="home-outline"
          size={24}
          color="#fff"
          onPress={() => navigation.navigate('Opcoes')}
        />
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  topInfo: { flexDirection: 'row', alignItems: 'center', padding: 12 },
  abrigoFoto: { width: 45, height: 45, marginRight: 10 },
  abrigoNome: { fontWeight: 'bold', fontSize: 12, flexShrink: 1 },
  chatBackground: { flex: 1, resizeMode: 'cover' },
  mensagem: {
    padding: 12,
    marginVertical: 4,
    maxWidth: '75%',
    borderRadius: 12,
  },
  enviada: {
    alignSelf: 'flex-end',
    backgroundColor: '#1a7f37',
    marginRight: 10,
  },
  recebida: {
    alignSelf: 'flex-start',
    backgroundColor: '#a8e6a1',
    marginLeft: 10,
  },
  textoMensagem: { color: '#fff' },
  areaInput: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#fff',
  },
  input: {
    flex: 1,
    backgroundColor: '#f2f2f2',
    borderRadius: 25,
    paddingHorizontal: 15,
    marginRight: 10,
  },
  botaoEnviar: {
    backgroundColor: '#1a7f37',
    borderRadius: 25,
    padding: 10,
  },
  footer: {
    backgroundColor: '#1a7f37',
    alignItems: 'center',
    padding: 15,
  },
});
