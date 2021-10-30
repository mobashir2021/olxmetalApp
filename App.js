import { StatusBar } from 'expo-status-bar';
import React, {useState, useRef} from 'react';
import { StyleSheet, Text, View, Button, Animated, Dimensions } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import BottomtabNavigator from './navigation/BottomtabNavigator'; 
import Home from './screens/home';
import COLORS from "./data/colors";

function getWidth(){
  let width = Dimensions.get('window').width;

  width = width - 120;
  return width/5;
}

export default function App() {
  const tabOffSetvalue = useRef(new Animated.Value(0)).current;
  return (
    
    <NavigationContainer>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />
      <BottomtabNavigator />
      
    </NavigationContainer>

    
    
  );
}


