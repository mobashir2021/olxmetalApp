import React from 'react';
import { createStackNavigator } from "@react-navigation/stack";
import Myads from "../screens/myads";


const Stack = createStackNavigator();

const MyadsStack = () =>  {
  return (
    <Stack.Navigator 
    screenOptions={{
        headerShown:true,
    }}
    >
      <Stack.Screen name="My Ads" component={Myads} />
      
    </Stack.Navigator>
  );
  }

export default MyadsStack;