import React from 'react';
import { createStackNavigator } from "@react-navigation/stack";
import Chat from "../screens/chats";


const Stack = createStackNavigator();

const ChatStack = () =>  {
  return (
    <Stack.Navigator 
    screenOptions={{
        headerShown:false,
    }}
    >
      <Stack.Screen name="Chat" component={Chat} />
      
    </Stack.Navigator>
  );
  }

export default ChatStack;