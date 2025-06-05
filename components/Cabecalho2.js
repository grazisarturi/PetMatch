import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const Cabecalho2 = ({ navigation }) => {
  return (
    <View>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#1a7f37" />
        </TouchableOpacity>

        <Text style={styles.logo}>PetMatch</Text>

        <View style={{ width: 24 }} />
      </View>

      <View style={styles.linhaInferior} />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#fff', 
    paddingVertical: 30,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 20,
  },
  backButton: {
    padding: 5,
  },
  logo: {
    fontSize: 35,
    fontWeight: 'bold',
    color: '#1a7f37',
  },
  linhaInferior: {
    height: 7,
    backgroundColor: '#1a7f37',
  },
});

export default Cabecalho2;
