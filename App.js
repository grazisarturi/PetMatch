import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

//abrigo
import LoginScreen from './screens/LoginScreen';
import AbrigoCadastro from './screens/AbrigoCadastro';
import AbrigoDashboard from './screens/AbrigoDashboard';
import ListaPets from './screens/ListaPets';
import CadastroAnimal from './screens/CadastroAnimal';
import ListaDoacoes from './screens/ListaDoacoes';
import PedidoDoacao from './screens/PedidoDoacao';
import MensagensRecebidas from './screens/MensagensRecebidas';


//adotante
import CadastroAdotante from './screens/Adotante/CadastroAdotante';
import Opcoes from './screens/Adotante/Opcoes';
import TelaInicial from './screens/Adotante/TelaInicial';
import DetalhesAnimal from './screens/Adotante/DetalhesAnimal';
import Chat from './screens/Adotante/Chat';
import PesquisarDoacoes from './screens/Adotante/PesquisarDoacoes';
import Doacoes from './screens/Adotante/Doacoes';
import Clinicas from './screens/Adotante/Clinicas';
import DetalhesClinica from './screens/Adotante/DetalhesClinica';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">

         {/* Telas Abrigo */}
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Abrigo" component={AbrigoCadastro} />
        <Stack.Screen name="AbrigoDashboard" component={AbrigoDashboard} />
        <Stack.Screen name="ListaPets" component={ListaPets} />
        <Stack.Screen name="CadastroAnimal" component={CadastroAnimal} />
        <Stack.Screen name="ListaDoacoes" component={ListaDoacoes} />
        <Stack.Screen name="PedidoDoacao" component={PedidoDoacao} />
        <Stack.Screen name="Mensagens" component={MensagensRecebidas} />

        {/* Telas Adotante */}
        <Stack.Screen name="CadastroAdotante" component={CadastroAdotante} />
        <Stack.Screen name="Opcoes" component={Opcoes} />
        <Stack.Screen name="TelaInicial" component={TelaInicial} />
        <Stack.Screen name="DetalhesAnimal" component={DetalhesAnimal} />
        <Stack.Screen name="Chat" component={Chat} />
        <Stack.Screen name="PesquisarDoacoes" component={PesquisarDoacoes} />
        <Stack.Screen name="Doacoes" component={Doacoes} />
        <Stack.Screen name="Clinicas" component={Clinicas} />
        <Stack.Screen name="DetalhesClinica" component={DetalhesClinica} />

      </Stack.Navigator>
    </NavigationContainer>
    
  );
}
