import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './src/screens/LoginScreen';
import HomeScreen from './src/screens/HomeScreen';

const NativeStack = createNativeStackNavigator();

const App = () => (
  <NavigationContainer>
    <NativeStack.Navigator initialRouteName="Login">
      <NativeStack.Screen name="Login" component={LoginScreen} />
      <NativeStack.Screen name="Home" component={HomeScreen} />
    </NativeStack.Navigator>
  </NavigationContainer>
);

export default App;
