
import React, {useState, useEffect} from 'react';
import { StyleSheet, View, SafeAreaView, ScrollView, ImageBackground, Dimensions, TouchableOpacity } from 'react-native';
import { TextInput, Button, Provider, Surface, ThemeProvider, RadioButton } from "react-native-paper";
import { Entypo } from '@expo/vector-icons';

import {
  Avatar,
  Title,
  Caption,
  Text,
  TouchableRipple,
} from 'react-native-paper';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { MaterialIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Constant from '../data/constants';



export default function Choosetype(props) {
  const { navigation, route } = props;

  const [checked, setChecked] = React.useState('Vendor');
  

  const logindata = () =>{

    //navigation.navigate('Login', {valuedata : 'Buy'});

    if(checked == "Vendor"){
        navigation.navigate('LoginVendor', {valuedata : 'Normal'});
    }else{
        navigation.navigate('Login', {valuedata : 'Normal'});
    }

  }
  

  

  

  useEffect(() => {
    // You need to restrict it at some point
    // This is just dummy code and should be replaced by actual
    
    //getuser();
    
    
  }, []);
  
  
  return (
    
      <View style={styles.container} showsVerticalScrollIndicator={false}>
          <ImageBackground source={require('../assets/logoone.jpg')}
              style={{height: Dimensions.get('window').height / 2.5, }}
          >
              <View style={styles.brandView}>
              <Entypo name="location-pin" size={70} color="white" />
              <Text style={styles.brandViewText}>Scrap Broker</Text>

              </View>
          </ImageBackground>
          <View style={styles.bottomView}>
              <View style={{padding:40}}>
                  <Text style={{color: '#4632A1', fontSize:34}}>Choose Type</Text>
                  <RadioButton.Item style={styles.radioinput}
                    label="Vendor"
                        value="Vendor"
                        color="black"
                        status={ checked === 'Vendor' ? 'checked' : 'unchecked' }
                        onPress={() => setChecked('Vendor')}
                      />
                      <RadioButton.Item  style={styles.radioinput}
                      label="Customer"
                        value="Customer"
                        color="black"

                        status={ checked === 'Customer' ? 'checked' : 'unchecked' }
                        onPress={() => setChecked('Customer')}
                      /> 

                  <TouchableOpacity style={styles.loginBtn} onPress={logindata}>
                  <Text style={styles.loginText}>NEXT</Text>
                  </TouchableOpacity>
              </View>

          </View>

      </View>
      
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    brandView:{
        flex: 1,
        justifyContent:'center',
        alignItems:'center',
    },
    brandViewText:{
        color:'#fff',
        fontSize:18,
        fontWeight:'bold',
        textTransform:'uppercase'
    },
    bottomView:{
        flex: 1.5,
        backgroundColor: '#fff',
        bottom:50,
        borderTopStartRadius:60,
        borderTopEndRadius:60
    },
    inputView:{
        width:"80%",
        backgroundColor:"#465881",
        borderRadius:25,
        height:50,
        marginBottom:20,
        justifyContent:"center",
        padding:20,
        marginTop:20
      },
    inputText:{
        height:50,
        color:"white"
      },
      loginBtn:{
        width:"80%",
        backgroundColor:"#fb5b5a",
        borderRadius:25,
        height:50,
        alignItems:"center",
        justifyContent:"center",
        marginTop:40,
        marginBottom:10
      },
      loginText:{
          color:"white"
      }
});
