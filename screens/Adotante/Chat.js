import React, { useState } from 'react';
import {View,Text,TextInput,TouchableOpacity,StyleSheet,FlatList,ImageBackground,KeyboardAvoidingView,Platform,} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Cabecalho2 from '../../components/Cabecalho2';

export default function Chat({ route, navigation }) {
  const { nomeContato = 'ABRIGO DE ANIMAIS SÃO FRANCISCO DE ASSIS DE CASCAVEL-PR' } = route.params || {};
  const [mensagem, setMensagem] = useState('');
  const [mensagens, setMensagens] = useState([
    { id: '1', texto: 'Olá! Como podemos te ajudar?', tipo: 'recebida' },
  ]);

  const enviarMensagem = () => {
    if (!mensagem.trim()) return;
    const novaMensagem = {
      id: Date.now().toString(),
      texto: mensagem,
      tipo: 'enviada',
    };
    setMensagens([...mensagens, novaMensagem]);
    setMensagem('');
  };

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
        <Text style={styles.abrigoNome}>{nomeContato}</Text>
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
                item.tipo === 'enviada' ? styles.enviada : styles.recebida,
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
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    backgroundColor: '#fff',
    paddingVertical: 40,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1a7f37',
  },
  linhaInferior: {
    height: 4,
    backgroundColor: '#1a7f37',
  },
  topInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
  },
  abrigoFoto: {
    width: 45,
    height: 45,
    marginRight: 10,
  },
  abrigoNome: {
    fontWeight: 'bold',
    fontSize: 12,
    flexShrink: 1,
  },
  chatBackground: {
    flex: 1,
    resizeMode: 'cover',
  },
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
  textoMensagem: {
    color: '#fff',
  },
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
