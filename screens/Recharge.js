
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

import RNUpiPayment from 'react-native-upi-payment'



export default function Recharge(props) {
  const { navigation, route } = props;
  const [userid, setuserid] =  useState("0");
  const [username, setusername] =  useState("");
  const [mobileno, setmobileno] =  useState("");
  const [email, setemail] =  useState("");
  const [city, setcity] =  useState("");
  const [zipcode, setzipcode] =  useState("");
  const [walletamount , setwalletamount] = useState("");
  const [usertype, setusertype] = useState("");
  const [text, setText] = React.useState('');
  

  const getuser = async () => {
    const userid = await AsyncStorage.getItem('userid').then((data) => setuserid(data));
    
    const username = await AsyncStorage.getItem('username').then((data) => setusername(data));
    
    const mobileno = await AsyncStorage.getItem('mobileno').then((data) => setmobileno(data));
    
    const email = await AsyncStorage.getItem('email').then((data) => setemail(data));
    
    const city = await AsyncStorage.getItem('city').then((data) => setcity(data));
    
    const zipcode = await AsyncStorage.getItem('zipcode').then((data) => setzipcode(data));

    const walletamount = await AsyncStorage.getItem('walletamount').then((data) => setwalletamount(data));
    
    const usertype = await AsyncStorage.getItem('usertype').then((data) => setusertype(data)); 
  }

  function successCallback(data) {
    alert(data);
    // do whatever with the data
  }
  
  function failureCallback(data) {
    alert(data);
    // do whatever with the data
  }

  const rechargewallet = () => {

    RNUpiPayment.initializePayment({
      vpa: 'mobashshiruzzaman@icici', // or can be john@ybl or mobileNo@upi
      payeeName: 'Mobashshir Uz Zaman',
      amount: '1',
      transactionRef: 'aasf-332-aoei-fn'
    }, successCallback, failureCallback);

    
  }
  

  

  

  useEffect(() => {
    // You need to restrict it at some point
    // This is just dummy code and should be replaced by actual
    
    getuser();
    
    
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
              <Text style={{color: '#4632A1', fontSize:34}}>Enter Recharge amount</Text>
                  <TextInput
                    label="Recharge"
                    value={text}
                    placeholder="₹ "
                    onChangeText={text => setText(text)}
                  />
                  
                  

                  <TouchableOpacity style={styles.loginBtn} onPress={rechargewallet}>
                  <Text style={styles.loginText}>Recharge</Text>
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
