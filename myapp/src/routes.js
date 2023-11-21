import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Main from './pages/Main/main';
import User from './pages/User/user';

//Criação das rotas
const Stack = createNativeStackNavigator();

//Navegação nos componentes
export default function Routes() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Usuários">
        <Stack.Screen
          name="Main"
          component={Main}
          options={{
            title: 'Usuários',
            headerTitleAlign: 'center',
            headerBackTitle: false,
            headerStyle: {
              backgroundColor: '#7159c1',
            },
            headerTintColor: '#FFF',
          }}
        />
        <Stack.Screen
          name="User"
          component={User}
          options={{
            title: 'Usuários',
            headerTitleAlign: 'center',
            headerBackTitle: false,
            headerStyle: {
              backgroundColor: '#7159c1',
            },
            headerTintColor: '#FFF',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
