
import React, {useRef, useState, useEffect} from 'react';
import { StyleSheet, Text, View, Button, Dimensions, FlatList, Animated , StatusBar, useWindowDimensions, Image } from 'react-native';

import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Apploader from '../components/Apploader';


const {width, height} = Dimensions.get('screen');

const initialLayout = { width: Dimensions.get('window').width };

export default function Myads(props) {

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
      fetch('http://f740-103-252-25-34.ngrok.io/api/Appapi/GetAds?userid=1', {
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

  const FirstRoute = () => (
    <View style={styles.firstContainer} >
      {/* <View style={{height:100}}>
          <Image style={{resizeMode:'contain'}} 
          source={{uri: 'https://upload.wikimedia.org/wikipedia/commons/f/f0/Everest_North_Face_toward_Base_Camp_Tibet_Luca_Galuzzi_2006_edit_1.jpg'}} 
          //source={plant.img} 
          
          />
        </View> */}
  
        <View>
          <Text style={{fontWeight:'bold', fontSize:13}} >
            You haven't listed anything yet
          </Text>
        </View>
        <View>
          <Button title="Post" color="red" style={{width:70, height:40}} />
        </View>
  
    </View>
  );
  
  const AdRoute = () => (
    <View style={styles.firstContainer} >
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
  
  
  const SecondRoute = () => (
    <View style={styles.secondContainer} >
      <View>
          <Text style={{fontWeight:'bold', fontSize:13}} >
            You haven't picked any favorite
          </Text>
        </View>
        <View>
          <Button title="Choose Now" color="red" style={{width:70, height:40}} />
        </View>
    </View>
  );

  

  const renderScene = SceneMap(isuserid ? {
    first: AdRoute,
    second: SecondRoute,
  } : {
    first: FirstRoute,
    second: SecondRoute,
  });

  

  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'first', title: 'ADS' },
    { key: 'second', title: 'FAVORITE' },
  ]);

  
  return (
    <>
    <TabView
      navigationState={{ index, routes }}
      renderTabBar={props => (
        <TabBar
          {...props}
          renderLabel={({ route, color }) => (
            <Text style={{ color: 'black', margin: 8 }}>
              {route.title}
            </Text>
          )}
          style={{backgroundColor: 'white'}}
        />
      )}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={initialLayout}
      style={styles.container}
    />
    {loaderPending ? <Apploader  /> : null}
    </>

    // <View style={styles.container}>
    //     <Text>My Ads Screen</Text>
    // </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: StatusBar.currentHeight
  },
  firstContainer:{
    flex: 1, 
    backgroundColor: '#fff',
    marginTop:10
  },
  secondContainer:{
    flex: 1, 
    backgroundColor: '#fff',
    justifyContent:'center',
    alignItems:'center'
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