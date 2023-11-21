import React, {Component} from 'react';
import {Alert, Keyboard, ActivityIndicator} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  Container,
  Form,
  Input,
  SubmitButton,
  Label,
  List,
  User,
  Name,
  Avatar,
  Bio,
  ProfileButton,
  ProfileButtonText,
  RemoveButton,
  RemoveButtonText,
} from './styles';
import api from '../../services/api';

export default class Main extends Component {
  state = {
    newUser: '',
    users: [],
    loading: false,
  };

  //Adição dos usuários no estado: Surge quando o componente for montado
  async componentDidMount() {
    const users = await AsyncStorage.getItem('users');
    const keys = await AsyncStorage.getAllKeys()
    console.tron.log(keys)
    if (users) {
      this.setState({users: JSON.parse(users)});
    }
  }

  //Adição dos usuários no AsyncStorage
  componentDidUpdate(_, prevState) {
    const {users} = this.state;
    if (prevState.users !== this.state.users) {
      AsyncStorage.setItem('users', JSON.stringify(users));
    }
  }

  //Navegação de páginas de usuários
  handleNavigate = user => {
    const {navigation} = this.props;
    navigation.navigate('User', {user});
  };

  //Adicionar usuários
  handleAddUser = async () => {
    const {newUser, users} = this.state;
    this.setState({loading: true});

    try {
      const response = await api.get(`/users/${newUser}`);
      const data = {
        name: response.data.name,
        login: response.data.login,
        bio: response.data.bio,
        avatar: response.data.avatar_url,
      };

      //Verifica se há um usuário repetido
      if (users.find(user => user.login === data.login)) {
        Alert.alert(
          `Erro ao adicionar usuário`,
          `Usuário já adicionado, tente novamente`,
          [
            {
              text: 'Conferir',
            },
          ],
        );
        return;
      }

      this.setState({users: [...users, data], newUser: ''});
    } catch (err) {
      Alert.alert(
        `Erro ao adicionar usuário`,
        `Confira o usuário pesquisado e tente novamente`,
        [
          {
            text: 'Conferir',
          },
        ],
      );
      console.tron.log(err);
    } finally {
      Keyboard.dismiss();
      this.setState({loading: false});
    }
  };

  handleRemoveUser = (login) => {
    this.setState(prevState => ({
      users: prevState.users.filter(user => user.login !== login)
    }))
  }
  render() {
    const {users, newUser, loading} = this.state;

    return (
      <Container>
        <Form>
          <Input
            placeholder="Digite o nome de um usuário"
            value={newUser}
            onChangeText={text => {
              this.setState({newUser: text});
            }}
            returnKeyType="send"
            onSubmitEditing={this.handleAddUser}
          />

          <SubmitButton onPress={this.handleAddUser}>
            {loading ? (
              <ActivityIndicator color="#fff" size={40} />
            ) : (
              <Icon name="user-plus" size={36} />
            )}
          </SubmitButton>
        </Form>

        <List
          data={users}
          keyExtractor={user => user.login}
          renderItem={({item}) => (
            <User>
              <Avatar source={{uri: item.avatar}} />
              <Name>{item.name}</Name>
              <Bio>{item.bio}</Bio>

              <ProfileButton onPress={() => this.handleNavigate(item)}>
                <ProfileButtonText>Ver perfil</ProfileButtonText>
              </ProfileButton>
              <RemoveButton
                onPress={() => this.handleRemoveUser(item.login)}>
                <RemoveButtonText>
                  Remover usuário <Icon name="trash-o" size={16} />
                </RemoveButtonText>
              </RemoveButton>
            </User>
          )}
          ListEmptyComponent={<Name style={{marginTop:320}}>Não há usuários adicionados</Name>}
        />
      </Container>
    );
  }
}
