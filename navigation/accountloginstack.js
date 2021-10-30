import React from 'react';
import { createStackNavigator } from "@react-navigation/stack";

import Accountlogin from '../screens/accountlogin';
import Account from "../screens/account";

import login from '../screens/login';
import signup from '../screens/signup';

const Stack = createStackNavigator();

const AccountLoginStack = () =>  {
  return (
    <Stack.Navigator 
    screenOptions={{
        headerShown:false,
    }}
    >
      <Stack.Screen name="Accountlogin" component={Accountlogin} />
      <Stack.Screen name="Account" component={Account} />
      
      <Stack.Screen name="Login" component={login} />
      <Stack.Screen name="Signup" component={signup} />
      
    </Stack.Navigator>
  );
  }

export default AccountLoginStack;