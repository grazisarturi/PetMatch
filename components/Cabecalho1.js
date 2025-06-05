import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Cabecalho1 = () => {
  return (
    <View style={styles.header}>
      <Text style={styles.logo}>PetMatch</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#1a7f37',
    paddingVertical: 85,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    fontSize: 35,
    fontWeight: 'bold',
    color: '#ffffff',
  },
});

export default Cabecalho1;
