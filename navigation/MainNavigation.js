import { createStackNavigator, createAppContainer } from 'react-navigation';
import TabNavigation from './TabNavigation';
import PhotoNavigation from './PhotoNavigation';
import MessageNavigation from './MessageNavigation';
import { stackStyles } from './config';

const MainNavitation = createStackNavigator(
  {
    PhotoNavigation,
    TabNavigation,
    MessageNavigation
  },
  {
    navigationOptions: {
      headerStyle: { ...stackStyles }
    },
    headerMode: "none",
    mode: "modal"
  }
);

export default createAppContainer(MainNavitation);
