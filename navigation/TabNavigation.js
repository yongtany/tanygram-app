import React from 'react';
import { Image, View, Platform } from 'react-native';
import { createBottomTabNavigator, createStackNavigator } from 'react-navigation';
import Home from '../screens/Tabs/Home';
import Search from '../screens/Tabs/Search';
import Profile from '../screens/Tabs/Profile';
import Notifications from '../screens/Tabs/Notifications';
import MessagesLink from '../components/MessagesLink';
import Detail from '../screens/Detail';
import NavIcon from '../components/NavIcon';
import HomeLink from '../components/HomeLink';
import { stackStyles } from './config';
import styles from '../styles';

const stackFactory = (initialRoute, customConfig) =>
  createStackNavigator({
    InitialRoute: {
      screen: initialRoute,
      navigationOptions: { ...customConfig },
    },
    Detail: {
      screen: Detail,
      navigationOptions: {
        headerTintColor: styles.blackColor,
        title: "Photo"
      }
    }
}, {
  defaultNavigationOptions: {
    headerStyle: { ...stackStyles }
  }
});

export default createBottomTabNavigator({
  Home: {
    screen: stackFactory(Home, {
      headerRight: <MessagesLink />,
      headerLeft: <HomeLink />,
      headerTitle: (
        <Image
          source={require('../assets/logo.png')}
          style={{ height: 35 }}
          resizeMode="contain"
        />
      )
    }), navigationOptions: {
      tabBarIcon: ({ focused }) => (
        <NavIcon
          focused={focused}
          name={Platform.OS === 'ios' ? "ios-home" : "md-home"}
        />
      )
    }
  },
  Search: {
    screen: stackFactory(Search, {
      headerBackTitle: null
    }),
    navigationOptions: {
      tabBarIcon: ({ focused }) => (
        <NavIcon
          focused={focused}
          name={Platform.OS === "ios" ? "ios-search" : "md-search"}
        />
      )
    }
  },
  Add: {
    screen: View,
    navigationOptions: {
      tabBarOnPress: ({ navigation }) =>
        navigation.navigate("PhotoNavigation"),
      tabBarIcon: ({ focused }) => (
        <NavIcon
          focused={focused}
          size={28}
          name={Platform.OS === "ios" ? "ios-add" : "md-add"}
        />
      )
    }
  },
  Notifications: {
    screen: stackFactory(Notifications, {
      title: "Notifications"
    }),
    navigationOptions: {
      tabBarIcon: ({ focused }) => (
        <NavIcon
          focused={focused}
          name={
            Platform.OS === "ios"
              ? focused
                ? "ios-heart"
                : "ios-heart-empty"
              : focused
              ? "md-heart"
              : "md-heart-empty"
          }
        />
      )
    }
  },
  Profile: {
    screen: stackFactory(Profile, {
      title: "Profile"
    }),
    navigationOptions: {
      tabBarIcon: ({ focused }) => (
        <NavIcon
          focused={focused}
          name={Platform.OS === "ios" ? "ios-person" : "md-person"}
        />
      )
    }
  }
},
{
  initialRouteName: "Profile",
  tabBarOptions: {
    showLabel: false,
    style: {
      backgroundColor: "#FAFAFA"
    }
  }
}
);
