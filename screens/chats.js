
import React, {useRef, useState, useEffect} from 'react';
import { StyleSheet, Text, View, Button, SafeAreaView, TouchableOpacity, FlatList, Dimensions, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Apploader from '../components/Apploader';
import * as Constant from '../data/constants';

export default function Chat(props) {

  const { navigation, route } = props;
  const [items, setItems] = useState([]);
  const [isuserid, setisuserid] = useState(false);
  const [userid, setuserid] = useState('0');
  const [loaderPending, setLoaderPending] = useState(false);

  React.useEffect( () => {
    // const unsubscribe = navigation.addListener('focus', () => {
    //   // do something
      
    // });

    async function fetchUser() {
      const value = await AsyncStorage.getItem('userid');
      if(value !== null){
        setuserid(value);
        setisuserid(true);
      }else{
        setuserid('0');
        setisuserid(false);

      }
      setLoaderPending(true);
      fetch(Constant.BASEURL + 'api/Appapi/GetOrders?userid=userid' , {
         method: 'GET'
      })
      .then((response) => response.json())
      .then((responseJson) => {
         console.log(responseJson);
         setItems(responseJson);
         setLoaderPending(false);

      })
      .catch((error) => {
        setLoaderPending(false);
         console.error(error);
      });
    }

    fetchUser();

    
    

    // return unsubscribe;
    
  }, [navigation]);

  if(isuserid){
    return (
      
    
  
      <View style={styles.container1}>
          <FlatList  data={items} 
        
        keyExtractor={(item, index) => item.Sellitemid}
        renderItem={({item}) => {
          return <View style={{flexDirection:"row", padding:20, borderBottomWidth:1, borderBottomColor:'gray'}}>
            <Image source={{uri: item.Productimage}} style={{width:70, height:70, borderRadius:70}} />
            <View style={{marginLeft:50}}>
              <Text style={styles.insidetext}><Text style={styles.header}>Category   : </Text>{item.category}</Text>
              <Text style={styles.insidetext}><Text style={styles.header}>Ads Name : </Text>{item.Productname}</Text>
              <Text style={styles.insidetext}><Text style={styles.header}>Price          :</Text>Rs. {item.Productprice}</Text>
              <Text style={styles.insidetext}><Text style={styles.header}>Status        :</Text>{item.Status}</Text>
            </View>
          </View>
        }} 
      />
      </View>
    );
  }else{
    return (
    
  
      <View style={styles.container}>
          <Text>Login to View your Orders</Text>
      </View>
    );
  }
  
  // return (
    
  
  //   <View style={styles.container}>
  //       <Text>Chat Screen</Text>
  //   </View>
  // );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f5f0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container1: {
    flex: 1,
    backgroundColor: '#f7f5f0',
    marginTop:100
  },
  header:{
    fontWeight:'bold',
    fontSize: 15,
    color:'gray'
  },
  insidetext:{
    color:"red",
    fontSize:14
  }
});