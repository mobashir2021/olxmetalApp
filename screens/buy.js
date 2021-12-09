
import React, {useRef, useState, useEffect} from 'react';
import { StyleSheet, Text, View,TouchableOpacity, Image } from 'react-native';
import { TextInput, Button, Provider, Surface, ThemeProvider, } from "react-native-paper";
import AsyncStorage from '@react-native-async-storage/async-storage';
import COLORS from '../data/colors';
import * as Constant from '../data/constants';


export default function Buy(props) {

    const { navigation, route } = props;


    const storeLastBuyid = async (value) => {
      try {
        await AsyncStorage.setItem('Lastbuyitemid', value);
      } catch (e) {
        // saving error
      }
    }

    const [loaderPending, setLoaderPending] = useState(false);
    // const Sellitemid =  navigation.getParam('Sellitemid', '');
    // const Productname = navigation.getParam('Productname', '');
    // const Productdesc = navigation.getParam('Productdesc', '');
    // const Productimage = navigation.getParam('Productimage', '');
    // const userid = navigation.getParam('userid', '');
    // const category = navigation.getParam('category', '');

    const {Sellitemid, Productname, Productdesc, Productimage, Productprice, userid, category} = route.params;
    console.log(route.params);

    const buysave = async () => {
      const value = await AsyncStorage.getItem('userid');
      

    
    
      
  
       let formdata = new FormData();
      formdata.append('Sellitemid', Sellitemid);
      if(value !== null){
        formdata.append('Buyerid', value);
      }else{

        // navigation.navigate('Signup');
        // return;
        formdata.append('Buyerid', '0');
      }
      //formdata.append('Finalprice',Productprice);
      
      
      
      //
      
      
      setLoaderPending(true);
      fetch(Constant.BASEURL + 'api/Appapi/BuyerPost',{
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        body: formdata
        }).then(response => {
          setLoaderPending(false);
          if(response.status == '200'){
            //alert('Your Ads has been published for Sale');
            response.json().then((dataid) => {
              const myArr = dataid.split("~");
                    var statusvalue = myArr[1];
                    var walletamount = myArr[0];
              if(value !== null) {
                if(statusvalue == "Bought"){
                  alert("Your item has been ordered!");
                  navigation.navigate("chats");
                }else if(statusvalue == "Insufficient wallet"){
                  alert("Kindly Recharge your wallet");
                  navigation.navigate('Recharge');
                }
                alert(dataid);
                
              }else{
                
                storeLastBuyid(dataid);
                navigation.navigate('Login', {valuedata : 'Buy'});
              }
            })
            
          }
          
        }).catch(err => {
          setLoaderPending(false);
          console.log(err);
        });  
    }

    const goback = () => {
      navigation.navigate('Home');
    }

    //console.log(route.params);

  
  return (
    

    <View style={styles.container}>
        <TouchableOpacity style={styles.card}>
            <Image style={styles.cardimage} source={{uri:Productimage}} />
            <Text style={styles.cardtext}>{category}</Text>
            <View
  style={{
    borderBottomColor: 'black',
    borderBottomWidth: 2,
    
  }}
/>
            <View style={{marginTop:10, paddingLeft:40}}>
                <Text style={styles.header}>Name : </Text>
                <Text style={styles.valuedata}>{Productname}</Text>

            </View>

            <View style={{marginTop:10, paddingLeft:40}}>
                <Text style={styles.header}>Price : </Text>
                <Text style={styles.valuedata}>Rs. {Productprice}</Text>
                
            </View>
            <View style={{marginTop:10, paddingLeft:40}}>
                <Text style={styles.header}>Description : </Text>
                <Text style={styles.valuedata}>{Productdesc}</Text>
                
            </View>
            <View style={{flexDirection:"row", marginLeft:70}}>
            <Button mode="contained" style={{backgroundColor:'red'}} onPress={buysave}  style={{marginTop:40}}>
          Buy Now
        </Button>
        <Button mode="contained" style={{backgroundColor:'red', marginLeft: 30}} onPress={goback}  style={{marginTop:40}}>
          Go Back
        </Button>
            </View>
            
        
        
        
        </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 70,
    backgroundColor:'#F5FCFF'
  },
  card:{
    backgroundColor:'#fff',
    marginBottom:10,
    marginLeft:'2%',
    width:'96%',
    shadowColor:'#000',
    shadowOpacity:0.2,
    shadowRadius:1,
    shadowOffset:{
        width:3,
        height: 3
    },

  },
  cardimage:{
      width:'100%',
      height:200,
      resizeMode:'cover'
  },
  cardtext:{
      padding:10,
      fontSize:24,
      fontWeight:'bold'
  },
  header:{
    fontWeight:"bold",
    fontSize:20,
    color:COLORS.green
  },
  valuedata:{
      fontSize:18,
      color:'#000'
  }
});