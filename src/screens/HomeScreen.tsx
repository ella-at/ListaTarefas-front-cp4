import React from 'react';
import { View, StyleSheet, SafeAreaView, Button } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { NativeBaseProvider } from 'native-base';
import { ProvedorEstadoGlobal } from '../hooks/EstadoGlobal';
import AdicionarTarefa from '../components/AdicionarTarefa';
import ListaTarefas from '../components/ListaTarefas';

// Definimos aqui o tipo para a propriedade navigation
type HomeScreenProps = {
  navigation: NativeStackNavigationProp<any>;
};

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const handleLogout = () => {
    // Ao clicar no botão de logout, navegamos para a tela de login para que o usuário possa fazer login novamente
    navigation.navigate('Login');
  };

  return (
     <NativeBaseProvider>
      <ProvedorEstadoGlobal>
        <SafeAreaView style={styles.container}>
          <View style={styles.header}>
            <Button title="Logout" onPress={handleLogout} />
          </View>
          <View style={styles.content}>
            {/* Componente para adicionar tarefas */}
            <AdicionarTarefa />
            {/* Componente que lista as tarefas */}
            <ListaTarefas />
          </View>
        </SafeAreaView>
      </ProvedorEstadoGlobal>
    </NativeBaseProvider>
  );
};

// Estilos para o layout da tela
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 16,
  },
  header: {
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginBottom: 16,
  },
  content: {
    flex: 1,
    justifyContent: 'space-between',
  },
});

export default HomeScreen;
