import React from 'react';
import { createStackNavigator } from "@react-navigation/stack";
import Account from "../screens/account";
import Accountlogin from '../screens/accountlogin';
import login from '../screens/login';
import signup from '../screens/signup';


const Stack = createStackNavigator();

const AccountStack = () =>  {
  return (
    <Stack.Navigator 
    screenOptions={{
        headerShown:false,
    }}
    >
      <Stack.Screen name="Account" component={Account} />
      <Stack.Screen name="Accountlogin" component={Accountlogin} />
      <Stack.Screen name="Login" component={login} />
      <Stack.Screen name="Signup" component={signup} />
      
    </Stack.Navigator>
  );
  }

export default AccountStack;