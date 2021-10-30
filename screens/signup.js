import React, {useState, useEffect} from 'react';
import { Text, ScrollView, StyleSheet, ImageBackground, Dimensions, View, TextInput, TouchableOpacity } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CommonActions } from '@react-navigation/native';
import Apploader from '../components/Apploader';

function signup(props) {
  const { navigation, route } = props;

  const {valuedata} = route.params;
    const [username, setuserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [mobileno, setMobileno] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [pincode, setPincode] = useState('');
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

  const storelogininfo = async (userid, username, email, mobileno, city, zipcode) => {
    try {
      await AsyncStorage.setItem('userid', userid);
      await AsyncStorage.setItem('username', username);
      await AsyncStorage.setItem('email', email);
      await AsyncStorage.setItem('mobileno', mobileno);
      await AsyncStorage.setItem('city', city);
      await AsyncStorage.setItem('zipcode', zipcode);
    } catch (e) {
      // saving error
    }
  }

    const signupdata = async () => {

      const lastsellitemid = await AsyncStorage.getItem('Lastsellitemid');
      const lastbuyitemid = await AsyncStorage.getItem('Lastbuyitemid');
        
        if(username == ''){
          alert('Kindly Enter Username');
          return;
        }
        if(email == ''){
          alert('Kindly enter Email');
          return;
        }
        if(password == ''){
          alert('Kindly enter password');
          return;
        }
        if(mobileno == ''){
          alert('Kindly enter Mobile No');
          return;
        }
        if(city == ''){
            alert('Kindly enter city');
            return;
          }
          if(pincode == ''){
            alert('Kindly enter pincode');
            return;
          }
        let formdata = new FormData();
        formdata.append('username', username);
        formdata.append('email',email);
        formdata.append('password',password);
        formdata.append('mobileno',mobileno);
        formdata.append('city', city);
        formdata.append('pincode', pincode);
        formdata.append('valuedata', valuedata)
        if(lastsellitemid !== null){
          formdata.append('lastsellitemid', lastsellitemid);
        }else{
          formdata.append('lastsellitemid', "0");
          
        }
        

        if(lastbuyitemid !== null){
          formdata.append('lastbuyitemid', lastbuyitemid);

        }else{
          formdata.append('lastbuyitemid', "0");
        }
        
        setLoaderPending(true);
        fetch('http://f740-103-252-25-34.ngrok.io/api/Appapi/Signup',{
          method: 'POST',
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          body: formdata
          }).then(response => {
            response.json().then((datareturn) =>{
              setLoaderPending(false);
              if(response.status == 200){
                if(datareturn == "Mobileno already exists"){
                  alert("Mobileno already exists! Kindly enter another mobileno");
                }else if(datareturn == "Username already exists"){
                  alert("Username already exists! Kindly enter another Username");
                }else if(datareturn == "Email already exists"){
                  alert("Email already exists! Kindly enter another email");
                }else{
                  if(lastsellitemid !== null){
                    removeitem('Lastsellitemid');
                  }
                  const myArr = datareturn.split("~");
                    storelogininfo(myArr[0], myArr[1], myArr[2], myArr[3], myArr[4], myArr[5]);
                    if(valuedata == "sell"){
                      alert("Registered Successfully! Your Ads has been published for Sale");
                    
                      navigation.navigate('Sell');
                    }else if(valuedata == "buy"){
                      alert("Registered Successfully! Your Item has been Ordered");
                    
                      navigation.navigate('Home');
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
                style={{height: Dimensions.get('window').height / 3.8, }}
            >
                <View style={styles.brandView}>
                <Entypo name="location-pin" size={70} color="white" />
                <Text style={styles.brandViewText}>Signup</Text>

                </View>
            </ImageBackground>
            <View style={styles.bottomView}>
                <View style={{padding:40}}>
                    {/* <Text style={{color: '#4632A1', fontSize:24}}>Signup</Text> */}
                    <Text style={{color:'black'}}>Already have an account
                    <TouchableOpacity onPress={() => navigation.navigate('Login', {valuedata: valuedata})}>
                    <Text style={{color:'red', fontStyle:'italic'}}> {'  '}Login Now</Text>
                    </TouchableOpacity>
                    </Text>
                    <View style={styles.inputView}>
                    <TextInput  
                        style={styles.inputText}
                        placeholder="Enter Username" 
                        placeholderTextColor="#fff"
                        onChangeText={text => setuserName(text)}/>

                    </View>
                    <View style={styles.inputView}>
                    <TextInput  
                        style={styles.inputText}
                        placeholder="Enter Email" 
                        placeholderTextColor="#fff"
                        onChangeText={text => setEmail(text)}/>

                    </View>
                    <View style={styles.inputView}>
                    <TextInput  
                        style={styles.inputText}
                        placeholder="Enter Password" 
                        placeholderTextColor="#fff"
                        secureTextEntry={true}
                        onChangeText={text => setPassword(text)}/>

                    </View>

                    <View style={styles.inputView}>
                    <TextInput  
                        style={styles.inputText}
                        placeholder="Enter Mobile number" 
                        placeholderTextColor="#fff"
                        onChangeText={text => setMobileno(text)}/>

                    </View>
                    
                    <View style={styles.inputView}>
                    <TextInput  
                        style={styles.inputText}
                        placeholder="Enter City" 
                        placeholderTextColor="#fff"
                        onChangeText={text => setCity(text)}/>

                    </View>
                    <View style={styles.inputView}>
                    <TextInput  
                        style={styles.inputText}
                        placeholder="Enter Pincode" 
                        placeholderTextColor="#fff"
                        onChangeText={text => setPincode(text)}/>

                    </View>

                    <TouchableOpacity style={styles.loginBtn} onPress={signupdata}>
                    <Text style={styles.loginText}>Sign Up</Text>
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
        width:"100%",
        backgroundColor:"#465881",
        borderRadius:25,
        height:50,
        marginBottom:0,
        justifyContent:"center",
        padding:20,
        marginTop:4
      },
    inputText:{
        height:50,
        color:"white"
      },
      loginBtn:{
        width:"100%",
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

export default signup;
