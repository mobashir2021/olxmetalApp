import React from 'react';
import { createStackNavigator } from "@react-navigation/stack";
import Sell from "../screens/sell";
import signup from '../screens/signup';
import login from '../screens/login';
import { CommonActions } from '@react-navigation/native';
import signupVendor from '../screens/signupVendor';
import loginVendor from '../screens/loginVendor';


const Stack = createStackNavigator();

const SellStack = () =>  {
  return (
    <Stack.Navigator 
    screenOptions={{
        headerShown:false,
    }}
    >
      <Stack.Screen name="Sell" component={Sell} />
      <Stack.Screen name="Signup" component={signup} />
      <Stack.Screen name="Login" component={login} />
      
    </Stack.Navigator>
  );
  }

export default SellStack;