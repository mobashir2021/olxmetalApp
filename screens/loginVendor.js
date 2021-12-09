import React, {useState, useEffect} from 'react';
import { Text, ScrollView, StyleSheet, ImageBackground, Dimensions, View, TextInput, TouchableOpacity } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Apploader from '../components/Apploader';
import * as Constant from '../data/constants';

function loginVendor(props) {
  const { navigation, route } = props;
  

  const {valuedata} = route.params;
  
    const [username, setuserName] = useState('');
    const [password, setPassword] = useState('');
    const [loaderPending, setLoaderPending] = useState(false);

    const removeitem = async (key) =>{
        try {
            await AsyncStorage.removeItem(key);
            return true;
        }
        catch(exception) {
            return false;
        }
    }

    const storelogininfo = async (userid, username, email, mobileno, city, zipcode, walletamount, usertype) => {
      try {
        await AsyncStorage.setItem('userid', userid);
        await AsyncStorage.setItem('username', username);
        await AsyncStorage.setItem('email', email);
        await AsyncStorage.setItem('mobileno', mobileno);
        await AsyncStorage.setItem('city', city);
        await AsyncStorage.setItem('zipcode', zipcode);
        await AsyncStorage.setItem('walletamount', walletamount);
        await AsyncStorage.setItem('usertype', usertype);

      } catch (e) {
        // saving error
      }
    }

    const logindata = async () => {

        //const lastsellitemid = await AsyncStorage.getItem('Lastsellitemid');
        const lastbuyitemid = await AsyncStorage.getItem('Lastbuyitemid');

        const lastsellitemid = 0;
        //alert(lastbuyitemid);
          
          if(username == ''){
            alert('Kindly Enter Username');
            return;
          }
          
          if(password == ''){
            alert('Kindly enter password');
            return;
          }
          
          let formdata = new FormData();
          formdata.append('username', username);
          
          formdata.append('password',password);
          formdata.append('valuedata', valuedata);
          // if(lastsellitemid !== null){
          //   formdata.append('lastsellitemid', lastsellitemid);
          // }else{
          //   formdata.append('lastsellitemid', "0");
            
          // }
          formdata.append('lastsellitemid', "0");
          if(lastbuyitemid !== null){
            formdata.append('lastbuyitemid', lastbuyitemid);

          }else{
            formdata.append('lastbuyitemid', "0");
          }
          
          setLoaderPending(true);
          fetch(Constant.BASEURL + 'api/Appapi/Login',{
            method: 'POST',
            headers: {
              'Content-Type': 'multipart/form-data',
            },
            body: formdata
            }).then(response => {
              response.json().then((datareturn) =>{
                setLoaderPending(false);
                if(response.status == 200){
                  if(datareturn == "Wrong Credentials"){
                    alert("Wrong Username/Email or Password!");
                  }else{
                    // if(lastsellitemid !== null){
                    //   removeitem('Lastsellitemid');
                    // }

                    if(lastbuyitemid !== null){
                        removeitem('Lastbuyitemid');
                    }
                    //alert(datareturn);
                    const myArr = datareturn.split("~");
                    var statusvalue = myArr[8];
                    storelogininfo(myArr[0], myArr[1], myArr[2], myArr[3], myArr[4], myArr[5], myArr[6], myArr[7]);
                    if(statusvalue == "Bought"){
                      alert("Login Successfully! The item has been ordered");
                    
                      navigation.navigate('Myorders');
                    }else if(statusvalue == "Insufficient wallet"){
                      alert("Login Successfully! Kindly recharge your wallet to buy this item");
                    
                      navigation.navigate('Recharge');
                    }else if(statusvalue == "Normal"){
                        navigation.navigate('Account');
                    }
                    
                  }
                }
                
              })
              
            }).catch(err => {
              setLoaderPending(false);
              alert(err);
            });  
          }

    return (
      <>
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
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
                    <Text style={{color: '#4632A1', fontSize:34}}>Welcome</Text>
                    <Text>Don't have an account
                        <TouchableOpacity onPress={() => navigation.navigate('Signup', {valuedata: "1"})}>
                        <Text style={{color:'red', fontStyle:'italic'}}> {'  '}Register Now</Text>
                        </TouchableOpacity>



                        
                    </Text>
                    <View style={styles.inputView}>
                    <TextInput  
                        style={styles.inputText}
                        placeholder="Enter Email/Username" 
                        placeholderTextColor="#fff"
                        onChangeText={text => setuserName(text)}/>

                    </View>
                    <View style={styles.inputView}>
                    <TextInput  
                        style={styles.inputText}
                        placeholder="Enter Password" 
                        placeholderTextColor="#fff"
                        secureTextEntry={true}
                        onChangeText={text => setPassword(text)}/>

                    </View>

                    <TouchableOpacity style={styles.loginBtn} onPress={logindata}>
                    <Text style={styles.loginText}>LOGIN</Text>
                    </TouchableOpacity>
                </View>

            </View>

        </ScrollView>
        {loaderPending ? <Apploader  /> : null}
        </>
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

export default loginVendor;
