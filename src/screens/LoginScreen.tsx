import AsyncStorage from '@react-native-community/async-storage';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Button, StyleSheet, ImageBackground } from 'react-native';

type Props = {
  navigation: NativeStackNavigationProp<any, any>;
};

const LoginScreen: React.FC<Props> = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleLogin = async () => {
    if (!username || !password) {
      setErrorMessage('Por favor, preencha todos os campos.');
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        setErrorMessage('Erro ao fazer login. Verifique suas credenciais.');
        return;
      }

      const data = await response.json();
      const token = data.token;

      await AsyncStorage.setItem('token', token);

      setErrorMessage(null);
      navigation.navigate('Home');
    } catch (error) {
      setErrorMessage('Erro de conexão. Tente novamente mais tarde.');
    }
  };

  return (
    <ImageBackground
      source={require('../../assets/images/mypicture.png')}
      style={styles.background}
    >
      <View style={styles.container}>
        <Text style={styles.title}>TDSPY APP</Text>
        {errorMessage && <Text style={styles.error}>{errorMessage}</Text>}
        <TextInput
          style={styles.input}
          placeholder="Username"
          placeholderTextColor="#888"
          value={username}
          onChangeText={setUsername}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#888"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={true}
        />
        <TouchableOpacity style={styles.button} onPress=handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover', // Cobre toda a tela
    justifyContent: 'center', // Centraliza o conteúdo verticalmente
    alignItems: 'center', // Centraliza o conteúdo horizontalmente
    width: '100%', // Largura total da tela
    height: '100%', // Altura total da tela
  },
  container: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)', // Fundo branco semitransparente
    padding: 20,
    borderRadius: 10,
    width: '90%', // Proporção da largura da tela
    maxWidth: 400, // Limita o tamanho máximo da largura
    alignItems: 'center', // Centraliza os inputs no container
    shadowColor: '#000', // Cor da sombra
    shadowOffset: {width: 0, height: 4}, // Deslocamento da sombra
    shadowRadius: 8, // Raio da sombra
    elevation: 5, // Sombra para Android
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#FF768B',
    textAlign: 'center',
    marginBottom: 20,
  },
  error: {
    color: 'red',
    textAlign: 'center',
    marginBottom: 15,
  },
  input: {
    width: '100%', // Faz o input ocupar toda a largura disponível
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#FF768B',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 20,
    width: '100%', // Botão ocupa toda a largura disponível
    alignItens: 'center', // Centraliza o texto do botão
  },
  buttonText: {
    color:'#fff',
    fontWeight: '600',
  },
});

export default LoginScreen;
