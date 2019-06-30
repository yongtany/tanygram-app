import { View } from 'react-native';
import { createBottomTabNavigator, createAppContainer } from 'react-navigation';
import Home from '../screens/Home';
import Search from '../screens/Search';
import Profile from '../screens/Profile';
import Notification from '../screens/Notification';

const TabNavigation = createBottomTabNavigator({
  Home,
  Search,
  Add: {
    screen: View,
    navigationOptions: {
      tabBarOnPress: () => {
        console.log("Add");
      }
    }
  },
  Notification,
  Profile
});

export default createAppContainer(TabNavigation)
