import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { firebase } from '../firebase';

export default function MensagensRecebidas({ navigation }) {
  const [conversas, setConversas] = useState([]);
  const currentUser = firebase.auth().currentUser;

  useEffect(() => {
    if (!currentUser) return;

    const unsubscribe = firebase
      .firestore()
      .collection('conversas')
      .where('participantes', 'array-contains', currentUser.uid)
      .onSnapshot((snapshot) => {
        const conversasData = snapshot.docs.map(doc => {
          const data = doc.data();
          const otherUserId = data.participantes.find(p => p !== currentUser.uid);
          const otherUserName = data.nomesParticipantes[otherUserId] || 'Usuário'; 
          const otherUserPhotoUrl = data.avatares ? data.avatares[otherUserId] : null;
          
          return {
            id: doc.id,
            lastMessage: data.lastMessage?.texto || 'Nenhuma mensagem ainda',
            criadoEm: data.lastMessage?.criadoEm,
            otherUserId,
            otherUserName,
            otherUserPhotoUrl,
          };
        });
        setConversas(conversasData);
      });

    return () => unsubscribe();
  }, [currentUser]);

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
        {conversas.length === 0 ? (
          <Text style={styles.emptyText}>Nenhuma conversa iniciada.</Text>
        ) : (
          conversas.map((conv) => {
            const avatarUrl = conv.otherUserPhotoUrl 
              || `https://ui-avatars.com/api/?name=${encodeURIComponent(conv.otherUserName)}&background=random&color=fff&rounded=true&size=64`;

            return (
              <TouchableOpacity
                key={conv.id}
                style={styles.card}
                onPress={() =>
                  navigation.navigate('ChatScreen', {
                    otherUserId: conv.otherUserId,
                    otherUserName: conv.otherUserName,
                    otherUserPhotoUrl: conv.otherUserPhotoUrl,
                  })
                }
              >
                <View style={styles.infoContainer}>
                  <Image
                    source={{ uri: avatarUrl }}
                    style={styles.imagem}
                  />
                  <View>
                    <Text style={styles.nome}>{conv.otherUserName}</Text>
                    <Text numberOfLines={1}>{conv.lastMessage}</Text>
                  </View>
                </View>
                <Text style={styles.hora}>
                  {conv.criadoEm?.toDate().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) || ''}
                </Text>
              </TouchableOpacity>
            )
          })
        )}
      </ScrollView>

      <View style={styles.footer}>
        <Ionicons
          name="home-outline"
          size={24}
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
      backgroundColor: '#fff',
      paddingVertical: 30,
      justifyContent: 'space-between',
      alignItems: 'center',
      flexDirection: 'row',
      paddingHorizontal: 20,
    },
    title: { fontSize: 35, fontWeight: 'bold', color: '#1a7f37' },
    linhaInferior: { height: 7, backgroundColor: '#1a7f37' },
    listContainer: { padding: 20 },
    card: {
      backgroundColor: '#d1f2d1',
      borderRadius: 8,
      padding: 12,
      marginBottom: 12,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    infoContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 12,
      flex: 1
    },
    imagem: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: '#ccc'
    },
    nome: { color: '#333', fontWeight: 'bold' },
    hora: {
      textAlign: 'right',
      fontSize: 12,
      color: '#555',
    },
    footer: {
      backgroundColor: '#1a7f37',
      alignItems: 'center',
      padding: 20,
      marginBottom: 10,
    },
    emptyText: {
      textAlign: 'center',
      marginTop: 50,
      fontSize: 16,
      color: '#888'
    }
});