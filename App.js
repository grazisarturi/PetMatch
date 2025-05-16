import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from './screens/LoginScreen';
import AbrigoCadastro from './screens/AbrigoCadastro';
import AbrigoDashboard from './screens/AbrigoDashboard';
import ListaPets from './screens/ListaPets';
import CadastroAnimal from './screens/CadastroAnimal';
import ListaDoacoes from './screens/ListaDoacoes';
import PedidoDoacao from './screens/PedidoDoacao';
import MensagensRecebidas from './screens/MensagensRecebidas';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Abrigo" component={AbrigoCadastro} />
        <Stack.Screen name="AbrigoDashboard" component={AbrigoDashboard} />
        <Stack.Screen name="ListaPets" component={ListaPets} />
        <Stack.Screen name="CadastroAnimal" component={CadastroAnimal} />
        <Stack.Screen name="ListaDoacoes" component={ListaDoacoes} />
        <Stack.Screen name="PedidoDoacao" component={PedidoDoacao} />
        <Stack.Screen name="Mensagens" component={MensagensRecebidas} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
