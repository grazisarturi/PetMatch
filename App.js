import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from './screens/LoginScreen';
import AbrigoCadastro from './screens/AbrigoCadastro';
import AbrigoDashboard from './screens/AbrigoDashboard';
import ListaPets from './screens/ListaPets';
import ChatScreen from './screens/ChatScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Abrigo" component={AbrigoCadastro} />
        <Stack.Screen name="AbrigoDashboard" component={AbrigoDashboard} />
        <Stack.Screen name="ListaPets" component={ListaPets} />
        <Stack.Screen name="Chat" component={ChatScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
