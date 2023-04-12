import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs";
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import CardsEmptyScreen from './src/screens/CardsEmptyScreen';
import PaymentsScreen from './src/screens/PaymentsScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import StartScreen from './src/screens/StartScreen';
import HomeScreen from './src/screens/HomeScreen';
import { Image } from 'react-native';

const isUserLogged = false;
const cardsExist = true;



const navigator = createMaterialBottomTabNavigator({
  Home: {
    screen: HomeScreen,
    navigationOptions: {
      tabBarIcon: () => <Image source={require("./assets/images/icons/home.png")} />
    }
  },
  Payments: {
    screen: cardsExist ? PaymentsScreen : CardsEmptyScreen,
    navigationOptions: {
      tabBarIcon: () => <Image source={require("./assets/images/icons/cards.png")} />
    }
  },
  Profile: {
    screen: ProfileScreen,
    navigationOptions: {
      tabBarIcon: () => <Image source={require("./assets/images/icons/profile.png")} />
    }
  },
}, {
  initialRouteName: "Home",
  barStyle: {
    backgroundColor: '#333333',
    height: 66.01
  }
})


const switchNavigator = createSwitchNavigator({
  Signup: StartScreen,
  navigator
});


export default createAppContainer(switchNavigator);