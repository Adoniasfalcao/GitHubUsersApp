import React, {useState, useEffect} from 'react';
import {ActivityIndicator, Alert} from 'react-native';
import api from '../../services/api';
import {
  Container,
  Avatar,
  Name,
  Bio,
  Header,
  Stars,
  Starred,
  OwnerAvatar,
  Info,
  Title,
  Author,
} from './styles';

export default function User({navigation}) {
  const [stars, setStars] = useState();
  const [loading, setLoading] = useState(true);
  const user = navigation.getState().routes[1].params.user;

  //Função para pegar as stars
  const getStarsInfo = async () => {
    try {
      const response = await api.get(`/users/${user.login}/starred`);
      setStars(response.data);

    } catch (err) {

      if (err.response?.status === 404) {
        Alert.alert(`Não foi possível buscar repositórios marcados como favorito`);
      }
      console.tron.log(err)

    } finally {
      setLoading(false);
    }
  };

  //Pegar os dados de repositórios starred
  useEffect(() => {
    navigation.setOptions({
      title: navigation.getState().routes[1].params.user.login,
    });

    getStarsInfo();

  }, []);

  return (
    <Container>
      <Header>
        <Avatar source={{uri: user.avatar}} />
        <Name>{user.name}</Name>
        <Bio>{user.bio}</Bio>
      </Header>
      
      {/* Loading*/}
      {loading ? (
        <ActivityIndicator color="#7159c1" size={54} style={{marginTop: 180}} />
      ) : (
        <Stars
          data={stars}
          keyExtractor={star => String(star.id)}
          renderItem={({item}) => (
            <Starred>
              <OwnerAvatar source={{uri: item.owner.avatar_url}} />
              <Info>
                <Title>{item.name}</Title>
                <Author>{item.owner.login}</Author>
              </Info>
            </Starred>
           
          )}
          ListEmptyComponent={<Name>Não há repositórios salvos como favorito...</Name>}
        />
      )}
    </Container>
  );
}
