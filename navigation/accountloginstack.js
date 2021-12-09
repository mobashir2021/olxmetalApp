import React from 'react';
import { createStackNavigator } from "@react-navigation/stack";

import Accountlogin from '../screens/accountlogin';
import Account from "../screens/account";

import login from '../screens/login';
import signup from '../screens/signup';
import loginVendor from '../screens/loginVendor';
import signupVendor from '../screens/signupVendor';
import Choosetype from '../screens/choosetype';
import Choosetypesignup from '../screens/choosetypesignup';
import Recharge from '../screens/Recharge';

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
      <Stack.Screen name="LoginVendor" component={loginVendor} />
      <Stack.Screen name="SignupVendor" component={signupVendor} />
      <Stack.Screen name="Choosetype" component={Choosetype} />
      <Stack.Screen name="ChoosetypeSignup" component={Choosetypesignup} />
      <Stack.Screen name="Recharge" component={Recharge} />

      
    </Stack.Navigator>
  );
  }

export default AccountLoginStack;