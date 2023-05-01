import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { Image } from 'expo-image';

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
        backgroundColor: '#333',
        height: 66.01
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: "Home",
          tabBarIcon: () => <Image style={styles.icon} source={require("./assets/images/icons/home.svg")} />
        }} />

      <Tab.Screen
        name="Payments"
        component={cards.length || payments.length ? PaymentsScreen : () => PaymentsEmptyScreen(setCards)}
        options={{
          title: "Payments",
          tabBarIcon: () => <Image style={styles.icon} source={require("./assets/images/icons/cards.svg")} />
        }} />

      <Tab.Screen
        name="Profile"
        component={token ? ProfileScreen : () => UnAuthProfileScreen(setToken)}
        options={{
          title: "Profile",
          tabBarIcon: () => <Image style={styles.icon} source={require("./assets/images/icons/profile.svg")} />
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  icon: { width: 24, height: 24 }
})


const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}> 
        {/* <Stack.Screen name="Welcome" component={StartScreen} /> */}
        <Stack.Screen name="Main" component={BottomNavigationTabs} /> 
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App