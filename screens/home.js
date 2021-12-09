
import React, {useRef, useState, useEffect} from 'react';
import { StyleSheet, Text, View, Button, SafeAreaView, TouchableOpacity, FlatList, Dimensions, Image } from 'react-native';

import { AntDesign } from '@expo/vector-icons';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import COLORS from '../data/colors';
import { MaterialIcons } from '@expo/vector-icons';
import Swiper from 'react-native-swiper';
import plants from '../data/plants';
import * as Constant from '../data/constants';


import Apploader from '../components/Apploader';
const width = Dimensions.get("screen").width/2 -30;
export default function Home({navigation}) {

  const [categoryindex, setCategoryIndex] = useState(0);
  const [loaderPending, setLoaderPending] = useState(false);

  const [items, setItems] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [search, setSearch] = useState('');

  React.useEffect(() => {
    // const unsubscribe = navigation.addListener('focus', () => {
    //   // do something
      
    // });

    // return unsubscribe;
    setLoaderPending(true);
    fetch(Constant.BASEURL + 'api/Appapi/GetItems', {
         method: 'GET'
      })
      .then((response) => response.json())
      .then((responseJson) => {
         //console.log(responseJson);
         setItems(responseJson);
         setFilteredData(responseJson);
         setLoaderPending(false);
      })
      .catch((error) => {
        setLoaderPending(false);
         console.error(error);
      });
  }, [navigation]);

  const categories = ['METAL', 'COPPER', 'PLASTIC', 'STEEL', 'IRON', 'BRASS', 'COTTONBOX', 'OTHER'];

  const buynow = (item) => {
    console.log('aa');
    console.log(item);
    navigation.navigate('Buy', {Sellitemid : item.Sellitemid, Productname: item.Productname, 
      Productdesc: item.Productdesc, Productimage: item.Productimage, userid: item.userid,Productprice: item.Productprice,
      category: item.category
      });
  }

  const changecategory = (index) => {

    let cat = categories[index];
    setLoaderPending(true);
    fetch(Constant.BASEURL +'api/Appapi/GetItems?category=' + cat, {
         method: 'GET'
      })
      .then((response) => response.json())
      .then((responseJson) => {
         //console.log(responseJson);
         setItems(responseJson);
         setFilteredData(responseJson);
         setLoaderPending(false);
      })
      .catch((error) => {
        setLoaderPending(false);
         console.error(error);
      });
      setCategoryIndex(index);
  }

  const searchFilter = (text) => {

    if(text) {
      const newData = items.filter((item) => {
        const itemdata = item.Productname ? item.Productname.toUpperCase() : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemdata.indexOf(textData) > -1;
      });
      setFilteredData(newData);
      setSearch(text);
    }else if(text === ''){
      setFilteredData(items);
      setSearch('');
    }
  }

  const CategoryList = () => {
    return (<ScrollView contentContainerStyle={styles.categorycontainer} horizontal={true} > 
      {categories.map((item, index) => (
        <TouchableOpacity key={index}  onPress={() => changecategory(index)}>
          <Text  style={[styles.inputCategory, categoryindex == index && styles.inputCategorySelected]}>{item}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>);
  };

  

  const Card = ({item}) => {
    //console.log(plant)
    return <View style={styles.card}>

      <View style={{height:100, alignItems:'center'}}>
        <Image style={{flex:1, resizeMode:'contain',  width: '100%', height: '100%'}} 
        source={{uri: item.Productimage}} 
        //source={plant.img} 
        
        />
      </View>
      <Text style={{fontWeight:'bold', fontSize:13, marginTop:10, marginLeft: 40}}>
        {item.Productname}
      </Text>
      <View style={{flexDirection:"row", justifyContent:'space-between', marginTop:5,  marginLeft: 40}}>
        <Text style={{fontSize:14, fontWeight:'bold'}}>
            Rs. {item.Productprice}
        </Text>
        
        

      </View>
      <View style={{
          height: 30,
          width:70,
          backgroundColor:COLORS.red,
          borderRadius:5,
          marginLeft:32,
          justifyContent:'center',
          alignItems:'center',
          marginTop:20
        }}>
            <TouchableOpacity onPress={() => buynow(item)}>
              <Text>Buy Now</Text>
            </TouchableOpacity>
        </View>

    </View>
  };
  
  return (
    <>
    <SafeAreaView style={{
      flex: 1,
      paddingHorizontal:20,
      backgroundColor: COLORS.white
    }}>
      <View style={styles.header}>
        <View>
          <Text style={{fontSize:22, marginTop:30,  color:COLORS.red, fontWeight:"bold"}}>Old Scrap Zone</Text>
        </View>
        <View style={{marginTop:10, flexDirection:'row'}}>
          <View style={styles.searchContainer}>
            <AntDesign name="search1" size={24} color="black" style={{marginLeft:20}} />
            <TextInput placeholder="Search" style={styles.inputText}  onChangeText={(text) => searchFilter(text)} />
          </View>
          <View style={styles.sortbtn}>
            <MaterialIcons name="sort" size={30} color={COLORS.white} />
          </View>
        </View>
        <CategoryList />
      </View>
      

      <FlatList numColumns={2} data={filteredData} renderItem={({item}) => <Card item={item} />} style={{marginTop: 10}}
        columnWrapperStyle={{justifyContent:'space-between'}} showsVerticalScrollIndicator={false} 
        keyExtractor={(item, index) => item.Sellitemid}
        contentContainerStyle={{
          marginTop:10, 
          paddingBottom:50
        }}
      />

    </SafeAreaView>
    {loaderPending ? <Apploader  /> : null}
    </>
   
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //backgroundColor: '#8fcbbc',
    backgroundColor: '#f7f5f0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header:{
    marginTop:20,
    
    justifyContent:'space-between'
  },
  searchContainer: {
    height: 40,
    backgroundColor: COLORS.light,
    borderRadius: 10,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  },
  inputText:{
    fontSize:18,
    paddingLeft:10,
    color:COLORS.dark,
    flex:1,

  },
  sortbtn:{
    marginLeft:10,
    marginTop:2,
    height:35,
    width:50,
    backgroundColor: COLORS.red,
    justifyContent:'center',
    alignItems:'center',
    borderRadius:5
  },
  categorycontainer:{
    flexDirection:'row',
    marginTop:30,
    marginBottom:20,
    
    justifyContent:'space-between'
  },
  inputCategory:{
    marginLeft:10,
    fontWeight:'bold',
    color: COLORS.darkgreen,
    fontSize:10
  },
  inputCategorySelected:{
    color: COLORS.red,
    paddingBottom:5,
    fontSize:11,
    fontWeight:'bold',
    borderBottomWidth: 2,
    borderColor:COLORS.red
  },
  card:{
    height:225,
    backgroundColor: COLORS.light,
    width,
    
    marginHorizontal:2,
    borderRadius:10,
    marginBottom:20,
    padding:15
  }
});