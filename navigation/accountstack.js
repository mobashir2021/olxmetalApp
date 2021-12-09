import React from 'react';
import { createStackNavigator } from "@react-navigation/stack";
import Account from "../screens/account";
import Accountlogin from '../screens/accountlogin';
import login from '../screens/login';
import signup from '../screens/signup';
import * as Constant from '../data/constants';
import loginVendor from '../screens/loginVendor';
import signupVendor from '../screens/signupVendor';
import Choosetype from '../screens/choosetype';
import Recharge from "../screens/Recharge";


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
      <Stack.Screen name="LoginVendor" component={loginVendor} />
      <Stack.Screen name="SignupVendor" component={signupVendor} />
      <Stack.Screen name="Choosetype" component={Choosetype} />
      <Stack.Screen name="Recharge" component={Recharge} />
      
    </Stack.Navigator>
  );
  }

export default AccountStack;