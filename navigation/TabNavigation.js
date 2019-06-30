import { View } from 'react-native';
import { createBottomTabNavigator } from 'react-navigation';
import Home from '../screens/Home';
import Search from '../screens/Search';
import Profile from '../screens/Profile';
import Notification from '../screens/Notification';

export default createBottomTabNavigator({
  Home,
  Search,
  Add: {
    screen: View,
    navigationOptions: {
      tabBarOnPress: ({navigation}) => navigation.navigate("PhotoNavigation")
    }
  },
  Notification,
  Profile
});
