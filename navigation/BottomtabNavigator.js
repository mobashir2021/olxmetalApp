
import React, { useRef, useEffect,useState } from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity, Animated, Dimensions } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import  Home  from "../screens/home";
import  Chats  from "../screens/chats";
import  Myads  from "../screens/myads";
import  Sell  from "../screens/sell";
import  Account  from "../screens/account";
import TabBar from "../components/TabBar";
import { MaterialIcons } from '@expo/vector-icons';
import login from '../screens/login';
import HomeStack from './homestack';
import SellStack from './sellstack';
import ChatStack from './chatstack';
import Myadsstack from './myadsstack';
import AccountStack from './accountstack';
import Accountlogin from '../screens/accountlogin';
import AccountLoginStack from './accountloginstack';
import AsyncStorage from '@react-native-async-storage/async-storage';

//import { FontAwesome5 } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

const CustomTabBarButton = ({ children, onPress, focused }) => (
    
    <TouchableOpacity
        onPress={onPress}
        style={{
            width:50,
            height:50,
            borderRadius:50,
            marginTop: -30,
            justifyContent:'center',
            alignItems:'center',
            
            backgroundColor:  'red',
            shadowColor:'#7F5DF0',
            shadowOffset:{
                width:0,
                height:10
            },
            shadowOpacity:0.5,
            shadowRadius:3.5,
            elevation:15
        }}
    >
        <View >
            {children}
        </View>
    </TouchableOpacity>
);

function getWidth(){
    let width = Dimensions.get('window').width;
  
    width = width - 120;
    return width/5;
  }

  const getuser = async () => {
    const value = await AsyncStorage.getItem('userid');
    
    if(value !== null){
        return true;
    }else{
        return false;
    }
  }

const BottomtabNavigator = () => {

    const tabOffSetvalue = useRef(new Animated.Value(0)).current;
    const [valuelogin, setValuelogin] =  useState(false);

    useEffect(() => {
        // You need to restrict it at some point
        // This is just dummy code and should be replaced by actual
        
        const getvalue = getuser().then((data) => setValuelogin(data));
        
      }, []);

    return (

        
        <Tab.Navigator screenOptions={{
            tabBarShowLabel:false,
            headerShown:false,
            tabBarStyle:{
                backgroundColor:'white',
                position: 'absolute',
                bottom:10,
                marginHorizontal: 20,
                height:60,
                shadowColor: '#000',
                shadowOpacity:0.06,
                shadowOffset:{
                    width:10,
                    height:10
                },
                borderRadius:5
            }
        }} >
            {

            }
            <Tab.Screen name="HomeStack" component={HomeStack} options={{
                unmountOnBlur: true,
                tabBarIcon:({focused}) =>(
                    <View style={{
                        position:'absolute',
                        top:'15%',
                        alignItems:'center'
                    }}>
                        <MaterialIcons name="home" size={25} color={focused ? 'red': 'black'} />
                        <Text>Home</Text>
                    </View>
                    
                )
            }}  listeners={({navigation, route}) => ({
                tabPress: e => {
                    Animated.spring(tabOffSetvalue, {
                        toValue: 0,
                        useNativeDriver:true
                    }).start();
                }

            })} ></Tab.Screen>
            <Tab.Screen name="ChatStack" component={ChatStack} options={{
                tabBarIcon:({focused}) =>(
                    <View style={{
                        position:'absolute',
                        top:'15%',
                        alignItems:'center'
                    }}>
                        <MaterialIcons name="chat-bubble" size={25} color={focused ? 'red': 'black'} />
                        <Text>My Orders</Text>
                    </View>
                )
            }} listeners={({navigation, route}) => ({
                tabPress: e => {
                    Animated.spring(tabOffSetvalue, {
                        toValue: getWidth(),
                        useNativeDriver:true
                    }).start();
                }

            })} >

            </Tab.Screen>
            <Tab.Screen name="SellStack" component={SellStack} options={{
                unmountOnBlur: true,
                tabBarIcon:({focused}) =>(
                    // <View style={{
                    //     position:'absolute',
                    //     top:'30%'
                    // }}>
                    //     <MaterialIcons name="add-circle-outline" size={25} color={focused ? 'red': 'gray'} />
                    // </View>
                    
                    <MaterialIcons name="add" size={25} color={focused ? 'white': '#ab8380'} 
                        style={focused ? {borderColor: '#ab8380'} : {borderColor : 'red'}}
                    />

                    
                ),
                tabBarButton: (props) => (
                    <CustomTabBarButton {...props} />
                )
            }} >

            </Tab.Screen>
            <Tab.Screen name="MyadsStack" component={Myadsstack} options={{
                tabBarIcon:({focused}) =>(
                    <View style={{
                        position:'absolute',
                        top:'15%',
                        alignItems:'center'
                    }}>
                        <MaterialIcons name="favorite" size={25} color={focused ? 'red': 'black'} />
                        <Text>My Ads</Text>
                    </View>
                )
            }} listeners={({navigation, route}) => ({
                tabPress: e => {
                    Animated.spring(tabOffSetvalue, {
                        toValue: getWidth() * 4,
                        useNativeDriver:true
                    }).start();
                }

            })} >

            </Tab.Screen>
            <Tab.Screen name="AccountStack" component={valuelogin ?  AccountStack : AccountLoginStack} options={{
                unmountOnBlur: true,
                tabBarIcon:({focused}) =>(
                    <View style={{
                        position:'absolute',
                        top:'15%',
                        alignItems:'center'
                    }}>
                        <MaterialIcons name="person" size={25} color={focused ? 'red': 'black'} />
                        <Text>Account</Text>
                    </View>
                )
            }} listeners={({navigation, route}) => ({
                tabPress: e => {
                    Animated.spring(tabOffSetvalue, {
                        toValue: getWidth() * 5,
                        useNativeDriver:true
                    }).start();
                }

            })} >

            </Tab.Screen>
            
        </Tab.Navigator>

        
    
    );  
      
}

export default BottomtabNavigator;



