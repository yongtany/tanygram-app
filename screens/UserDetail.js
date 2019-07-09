import React from "react";
import { ScrollView } from 'react-native';
import { useQuery } from 'react-apollo-hooks';
import { gql } from 'apollo-boost';
import { USER_FRAGMENT } from "../fragments";
import Loader from '../components/Loader';
import UserProfile from '../components/UserProfile';

const GET_USER = gql`
  query seeUser($username: String!) {
    seeUser(username: $username) {
      ...UserParts
    }
  }
  ${USER_FRAGMENT}
`;

export default ({ navigation }) => {
  const { loading, data } = useQuery(GET_USER, {
    variables: { username: navigation.getParam("username") }
  });

  return (
    <ScrollView>
      {loading
        ? <Loader />
        : data && data.seeUser && <UserProfile {...data.seeUser} /> }
    </ScrollView>
  )
}
