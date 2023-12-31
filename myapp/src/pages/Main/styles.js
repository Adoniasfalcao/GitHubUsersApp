import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  padding: 30px;
`;

export const Form = styled.View`
  flex-direction: row;
  padding-bottom: 20px;
  border-bottom-width: 1px;
  border-color: #eee;
`;
export const Input = styled.TextInput.attrs({placeholderTextColor: '#808080'})`
  flex: 1;
  height: 40px;
  color: #808080;
  background: #eee;
  border-radius: 4px;
  padding: 0 15px;
  border: 1px solid #eee;
`;

export const SubmitButton = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
  background: #7159c1;
  border-radius: 4px;
  margin-left: 10px;
  padding: 0 6px;
  opacity: ${props => (props.loading ? 0.7 : 1)}
`;

export const Label = styled.Text`
  font-size: 12px;
  color: #fff;
`;

export const List = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false,
})`
  margin-top: 20px;
`;

export const User = styled.View`
  align-items: center;
  margin: 0 20px 30px;
`;

export const Avatar = styled.Image`
  width: 64px;
  height: 64px;
  border-radius: 32px;
  background: #eee;
`;

export const Name = styled.Text`
  font-size: 14px;
  color: #333;
  font-weight: bold;
  margin-top: 4px;
  text-align: center;
`;

export const Bio = styled.Text.attrs({numberOfLines: 2})`
  font-size: 13px;
  line-height: 18px;
  color: #999;
  margin-top: 5px;
  text-align: center;
`;

export const ProfileButton = styled.TouchableOpacity`
margin-top: 10px;
align-self: stretch;
border-radius: 4px;
background: #7159c1;
justify-content: center;
align-items: center;
height: 36px;

`;


export const ProfileButtonText = styled.Text`
font-size: 14px;
color: #fff;
text-transform: uppercase;

`;

export const RemoveButton = styled.TouchableOpacity`
margin-top: 16px;
align-self: stretch;
border-radius: 4px;
background: #f53030;
justify-content: center;
align-items: center;
height: 36px;

`;

export const RemoveButtonText = styled.Text`
font-size: 14px;
color: #fff;
text-transform: uppercase;

`;