import React from 'react';
import { createStackNavigator } from "@react-navigation/stack";
import Home from "../screens/home";
import Buy from '../screens/buy';
import signup from '../screens/signup';
import login from '../screens/login';


const Stack = createStackNavigator();

const HomeStack = () =>  {
  return (
    <Stack.Navigator 
    screenOptions={{
        headerShown:false,
    }}
    >
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Buy" component={Buy} />
      <Stack.Screen name="Signup" component={signup} />
      <Stack.Screen name="Login" component={login} />
      
    </Stack.Navigator>
  );
  }

export default HomeStack;