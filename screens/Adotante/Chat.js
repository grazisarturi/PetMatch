import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

export default function Chat({ route }) {
  const { nomeContato = 'Abrigo de Animais' } = route.params || {};
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
      keyboardVerticalOffset={80}
    >
      <View style={styles.header}>
        <Text style={styles.nomeContato}>{nomeContato}</Text>
      </View>

      <FlatList
        style={styles.chat}
        data={mensagens}
        keyExtractor={(item) => item.id}
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

      <View style={styles.areaInput}>
        <TextInput
          style={styles.input}
          placeholder="Digite sua mensagem..."
          value={mensagem}
          onChangeText={setMensagem}
        />
        <TouchableOpacity onPress={enviarMensagem} style={styles.botaoEnviar}>
          <Text style={styles.textoBotao}>Enviar</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f6f6f6',
  },
  header: {
    padding: 15,
    backgroundColor: '#4CAF50',
  },
  nomeContato: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  chat: {
    flex: 1,
    padding: 10,
  },
  mensagem: {
    padding: 10,
    marginVertical: 6,
    maxWidth: '75%',
    borderRadius: 12,
  },
  enviada: {
    alignSelf: 'flex-end',
    backgroundColor: '#DFF0D8',
  },
  recebida: {
    alignSelf: 'flex-start',
    backgroundColor: '#e0e0e0',
  },
  textoMensagem: {
    fontSize: 15,
  },
  areaInput: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 25,
    paddingHorizontal: 15,
    marginRight: 10,
  },
  botaoEnviar: {
    backgroundColor: '#4CAF50',
    borderRadius: 25,
    paddingVertical: 10,
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  textoBotao: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
