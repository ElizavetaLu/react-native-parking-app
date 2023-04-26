import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { useCallback, useEffect, useState } from 'react';
import { Image } from 'react-native';

import UnAuthProfileScreen from './src/screens/UnAuthProfileScreen';
import PaymentsEmptyScreen from './src/screens/PaymentsEmptyScreen';
import PaymentsScreen from './src/screens/PaymentsScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import StartScreen from './src/screens/StartScreen';
import HomeScreen from './src/screens/HomeScreen';

import { updateCards, updatePayments } from './src/helpers';



const Tab = createMaterialBottomTabNavigator();

const BottomNavigationTabs = () => {

  const [token, setToken] = useState(null);

  useEffect(() => {
    AsyncStorage.getItem("token")
      .then(res => setToken(res))
      .catch(err => console.log(err))
  }, [])


  const [cards, setCards] = useState([]);
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    updateCards(setCards);
    updatePayments(setPayments);
  }, [])

  return (
    <Tab.Navigator
      barStyle={{
        backgroundColor: '#333333',
        height: 66.01
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: "Home",
          tabBarIcon: () => <Image source={require("./assets/images/icons/home.png")} />
        }} />
      <Tab.Screen
        name="Payments"
        component={cards.length || payments.length ? PaymentsScreen : () => PaymentsEmptyScreen(setCards)}
        options={{
          title: "Payments",
          tabBarIcon: () => <Image source={require("./assets/images/icons/cards.png")} />
        }} />
      <Tab.Screen
        name="Profile"
        component={token ? ProfileScreen : () => UnAuthProfileScreen(setToken)}
        options={{
          title: "Profile",
          tabBarIcon: () => <Image source={require("./assets/images/icons/profile.png")} />
        }}
      />
    </Tab.Navigator>
  );
}



const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Start" component={StartScreen} />
        <Stack.Screen name="Main" component={BottomNavigationTabs} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App