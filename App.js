// App.js

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// COMUM
import LoginScreen from './screens/LoginScreen';
import ChatScreen from './screens/ChatScreen'; // IMPORTADO: Tela de chat unificada

// ABRIGO
import AbrigoCadastro from './screens/AbrigoCadastro';
import AbrigoDashboard from './screens/AbrigoDashboard';
import ListaPets from './screens/ListaPets';
import CadastroAnimal from './screens/CadastroAnimal';
import EditarAnimal from './screens/EditarAnimal';
import ListaDoacoes from './screens/ListaDoacoes';
import PedidoDoacao from './screens/PedidoDoacao';
import EditarDoacao from './screens/EditarDoacao';
import MensagensRecebidas from './screens/MensagensRecebidas';

// ADOTANTE
import CadastroAdotante from './screens/Adotante/CadastroAdotante';
import Opcoes from './screens/Adotante/Opcoes';
import TelaInicial from './screens/Adotante/TelaInicial';
import DetalhesAnimal from './screens/Adotante/DetalhesAnimal';
import PesquisarDoacoes from './screens/Adotante/PesquisarDoacoes';
import Doacoes from './screens/Adotante/Doacoes';
import Clinicas from './screens/Adotante/Clinicas';
import DetalhesClinica from './screens/Adotante/DetalhesClinica';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">

        {/* Telas Comuns */}
        <Stack.Screen name="Login" component={LoginScreen} options={{headerShown: false}} />
        <Stack.Screen name="ChatScreen" component={ChatScreen} options={{headerShown: false}} />

        {/* Telas Abrigo */}
        <Stack.Screen name="Abrigo" component={AbrigoCadastro} options={{headerShown: false}} />
        <Stack.Screen name="AbrigoDashboard" component={AbrigoDashboard} options={{headerShown: false}} />
        <Stack.Screen name="ListaPets" component={ListaPets} options={{headerShown: false}} />
        <Stack.Screen name="CadastroAnimal" component={CadastroAnimal} options={{headerShown: false}} />
        <Stack.Screen name="EditarAnimal" component={EditarAnimal} options={{ headerShown: false }} />
        <Stack.Screen name="ListaDoacoes" component={ListaDoacoes} options={{headerShown: false}} />
        <Stack.Screen name="PedidoDoacao" component={PedidoDoacao} options={{headerShown: false}} />
        <Stack.Screen name="EditarDoacao" component={EditarDoacao} options={{ headerShown: false }} />
        <Stack.Screen name="Mensagens" component={MensagensRecebidas} options={{headerShown: false}} />
        
        {/* Telas Adotante */}
        <Stack.Screen name="CadastroAdotante" component={CadastroAdotante}options={{headerShown: false}} />
        <Stack.Screen name="Opcoes" component={Opcoes} options={{headerShown: false}} />
        <Stack.Screen name="TelaInicial" component={TelaInicial} options={{headerShown: false}} />
        <Stack.Screen name="DetalhesAnimal" component={DetalhesAnimal} options={{headerShown: false}} />
        <Stack.Screen name="PesquisarDoacoes" component={PesquisarDoacoes} options={{headerShown: false}} />
        <Stack.Screen name="Doacoes" component={Doacoes} options={{headerShown: false}} />
        <Stack.Screen name="Clinicas" component={Clinicas} options={{headerShown: false}} />
        <Stack.Screen name="DetalhesClinica" component={DetalhesClinica} options={{headerShown: false}} />
        
      </Stack.Navigator>
    </NavigationContainer>
  );
}