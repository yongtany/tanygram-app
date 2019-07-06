import React from 'react';
import styled from 'styled-components';
import { withNavigation } from 'react-navigation';
import NavIcon from './NavIcon';

const Container = styled.TouchableOpacity`
  padding-left: 20px;
`;
const Text =  styled.Text``;

export default withNavigation(({ navigation }) => (
  <Container onPress={() => navigation.navigate("Home")}>
    <NavIcon
      name={"logo-instagram"}
      size={36}
    />
  </Container>
));
