
import React, {useState, useEffect} from 'react';
import { StyleSheet, View, SafeAreaView } from 'react-native';
import { TextInput, Button, Provider, Surface, ThemeProvider, } from "react-native-paper";


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



export default function Account(props) {
  const { navigation, route } = props;
  const [userid, setuserid] =  useState("0");
  const [username, setusername] =  useState("");
  const [mobileno, setmobileno] =  useState("");
  const [email, setemail] =  useState("");
  const [city, setcity] =  useState("");
  const [zipcode, setzipcode] =  useState("");

  const removeitem = async (key) =>{
    try {
        await AsyncStorage.removeItem(key);
        return true;
    }
    catch(exception) {
        return false;
    }
}

  const logout = async () => {
    const val1 = await removeitem("userid");
    const val2 = await removeitem("username");
    const val3 = await removeitem("mobileno");
    const val4 = await removeitem("city");
    const val5 = await removeitem("email");
    const val6 = await removeitem("zipcode");

    navigation.navigate("Accountlogin");
  }

  const getuser = async () => {
    const userid = await AsyncStorage.getItem('userid').then((data) => setuserid(data));
    
    const username = await AsyncStorage.getItem('username').then((data) => setusername(data));
    
    const mobileno = await AsyncStorage.getItem('mobileno').then((data) => setmobileno(data));
    
    const email = await AsyncStorage.getItem('email').then((data) => setemail(data));
    
    const city = await AsyncStorage.getItem('city').then((data) => setcity(data));
    
    const zipcode = await AsyncStorage.getItem('zipcode').then((data) => setzipcode(data));
    
    
    
    
  }

  useEffect(() => {
    // You need to restrict it at some point
    // This is just dummy code and should be replaced by actual
    
    getuser();
    
    
  }, []);
  
  
  return (
    <SafeAreaView style={styles.container}>

      <View style={styles.userInfoSection}>
        <View style={{flexDirection:'row', marginTop:40}}>
          <View style={{width:'70%'}}>

          </View>
          <View>
          <Button mode="contained" style={{backgroundColor:'red', marginLeft:10, height:40, width:100, fontSize:6}} onPress={logout}  >
          Logout
        </Button>
          </View>
        </View>
        <View style={{flexDirection: 'row', marginTop: 5}}>
          
          <Avatar.Image 
            source={{
              uri: 'https://api.adorable.io/avatars/80/abott@adorable.png',
            }}
            size={80}
          />
          
          
          <View style={{marginLeft: 10}}>
            <Title style={[styles.title, {
              marginTop:15,
              marginBottom: 5,
            }]}>{username}</Title>
            <Caption style={styles.caption}>@{username}</Caption>
          </View>

          
        </View>
      </View>

      <View style={styles.userInfoSection}>
        <View style={styles.row}>
          <Icon name="map-marker-radius" color="#777777" size={20}/>
          <Text style={{color:"#777777", marginLeft: 20}}>{city}, India</Text>
        </View>
        <View style={styles.row}>
          <Icon name="phone" color="#777777" size={20}/>
          <Text style={{color:"#777777", marginLeft: 20}}>+91-{mobileno}</Text>
        </View>
        <View style={styles.row}>
          <Icon name="email" color="#777777" size={20}/>
          <Text style={{color:"#777777", marginLeft: 20}}>{email}</Text>
        </View>
      </View>

      <View style={styles.infoBoxWrapper}>
          <View style={[styles.infoBox, {
            borderRightColor: '#dddddd',
            borderRightWidth: 1
          }]}>
            <Title>₹140.50</Title>
            <Caption>Wallet</Caption>
          </View>
          <View style={styles.infoBox}>
            <Title>12</Title>
            <Caption>Orders</Caption>
          </View>
      </View>

      <View style={styles.menuWrapper}>
        <TouchableRipple onPress={() => {}}>
          <View style={styles.menuItem}>
            <Icon name="heart-outline" color="#FF6347" size={25}/>
            <Text style={styles.menuItemText}>Your Favorites</Text>
          </View>
        </TouchableRipple>
        <TouchableRipple onPress={() => {}}>
          <View style={styles.menuItem}>
            <Icon name="credit-card" color="#FF6347" size={25}/>
            <Text style={styles.menuItemText}>Payment</Text>
          </View>
        </TouchableRipple>
        <TouchableRipple 
        >
          <View style={styles.menuItem}>
            <Icon name="share-outline" color="#FF6347" size={25}/>
            <Text style={styles.menuItemText}>Tell Your Friends</Text>
          </View>
        </TouchableRipple>
        <TouchableRipple onPress={() => {}}>
          <View style={styles.menuItem}>
            <Icon name="account-check-outline" color="#FF6347" size={25}/>
            <Text style={styles.menuItemText}>Support</Text>
          </View>
        </TouchableRipple>
        <TouchableRipple onPress={() => {}}>
          <View style={styles.menuItem}>
            <MaterialIcons name="settings" color="#FF6347" size={25}/>
            <Text style={styles.menuItemText}>Settings</Text>
          </View>
        </TouchableRipple>
      </View>
    </SafeAreaView>

    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    
  },
  userInfoSection: {
    paddingHorizontal: 30,
    marginBottom: 25,
  },
  title: {
    fontSize: 17,
    fontWeight: 'bold',
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
    fontWeight: '500',
  },
  row: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  infoBoxWrapper: {
    borderBottomColor: '#dddddd',
    borderBottomWidth: 1,
    borderTopColor: '#dddddd',
    borderTopWidth: 1,
    flexDirection: 'row',
    height: 100,
  },
  infoBox: {
    width: '50%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuWrapper: {
    marginTop: 10,
  },
  menuItem: {
    flexDirection: 'row',
    paddingVertical: 15,
    paddingHorizontal: 30,
  },
  menuItemText: {
    color: '#777777',
    marginLeft: 20,
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 26,
  },
});
