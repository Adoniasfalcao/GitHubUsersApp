import React, {Component} from 'react';
import {Alert, Keyboard, ActivityIndicator} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
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
} from './styles';
import api from '../../services/api';

export default class Main extends Component {
  state = {
    newUser: '',
    users: [],
    loading: false,
  };

  //Adição dos usuários no estado
  async componentDidMount() {
    const users = await AsyncStorage.getItem('users');

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

      this.setState({users: [...users, data], newUser: ''});
      
    } catch (err) {
      Alert.alert(`Usuário não encontrado...`);
      console.tron.log(err);

    } finally {
      Keyboard.dismiss();
      this.setState({loading: false});
    }
  };

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

          <SubmitButton onPress={this.handleAddUser} loading={loading}>
            {loading ? (
              <ActivityIndicator color="#fff" size={42} />
            ) : (
              <Label>Adicionar</Label>
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
            </User>
          )}
        />
      </Container>
    );
  }
}
