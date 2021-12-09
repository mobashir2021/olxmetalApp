import React, {useState, useEffect} from 'react';
import { Image, StyleSheet, Text, View, Platform } from 'react-native';
import * as FileSystem from 'expo-file-system';

import { TextInput, Button, Provider, Surface, ThemeProvider, } from "react-native-paper";
// import DropDown from "react-native-paper-dropdown";
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {Picker, picker} from '@react-native-picker/picker';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Apploader from '../components/Apploader';
import * as Constant from '../data/constants';



export default function Sell(props) {

  const { navigation } = props;

  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      // do something
      setImage(null);
      setName('');
      setDesc('');
      setPrice('');
    });

    return unsubscribe;
  }, [navigation]);

  const [galleryPermission, setGalleryPermission] = useState(null);
  const [imageUri, setImageUri] = useState(null);
  const [image, setImage] = useState(null);
  
  // const [showDropDown, setShowDropDown] = useState(false);
  const [category, setCategory] = useState('Metal');
  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');
  const [year, setYear] = useState('');
  const [price, setPrice] = useState('');
  const [phone, setPhone] = useState('');
  const [loaderPending, setLoaderPending] = useState(false);

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    //console.log(result);

    if (!result.cancelled) {
      const base64 = await FileSystem.readAsStringAsync(result.uri, { encoding: 'base64' });
      //console.log(base64);
      setImage(result.uri);
    }
  };

  

  const permisionFunction = async () => {
    // here is how you can get the camera permission

    const imagePermission = await ImagePicker.getMediaLibraryPermissionsAsync();
    console.log(imagePermission.status);

    setGalleryPermission(imagePermission.status === 'granted');

    if (imagePermission.status !== 'granted') {
      alert('Permission for media access needed.');
    }
  };

  // useEffect(() => {
  //   permisionFunction();
  // }, []);

  // const categoryList = [
  //   {
  //     label: "Metal",
  //     value: "Metal",
  //   },
  //   {
  //     label: "Copper",
  //     value: "Copper",
  //   },
  //   {
  //     label: "Plastic",
  //     value: "Plastic",
  //   },
  //   {
  //     label: "Steel",
  //     value: "Steel",
  //   },
  //   {
  //     label: "Iron",
  //     value: "Iron",
  //   },
  //   {
  //     label: "Brass",
  //     value: "Brass",
  //   },
  //   {
  //     label: "CottonBox",
  //     value: "CottonBox",
  //   },
  //   {
  //     label: "Other",
  //     value: "Other",
  //   },
  // ];

  const options = {
    title: 'select image', storageOptions: {skipBackup: true, path: 'images'},
    maxWidth: 150, maxHeight: 150, chooseFromLibraryButtonTitle: 'Choose from gallery',
};

  const openCamera = ()=>{
    launchCamera(options, (response) => { // Use launchImageLibrary to open image gallery
      console.log('Response = ', response);
    
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const source = { uri: response.uri };
    
        // You can also display the image using data:
        // const source = { uri: 'data:image/jpeg;base64,' + response.data };
    
        console.log(source)
      }
    });
   };

   const pick = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
      
    });

    //console.log(result.uri);
    if (!result.cancelled) {
      setImageUri(result.uri);
    }
  };

  const storeLastSellitemid = async (value) => {
    try {
      await AsyncStorage.setItem('Lastsellitemid', value);
    } catch (e) {
      // saving error
    }
  }

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('@storage_Key');
      if(value !== null) {
        return value;
      }
    } catch(e) {
      // error reading value
    }
  }

  const uploadData = async () => {
    // navigation.navigate('Login');
    // return;

    const value = await AsyncStorage.getItem('userid');
      

    
    
    if(category == 'Select Category'){
      alert('Kindly Select a category');
      return;
    }
    if(name == ''){
      alert('Kindly enter Name');
      return;
    }
    if(desc == ''){
      alert('Kindly enter description for Selling item');
      return;
    }
    if(price == ''){
      alert('Kindly enter Price for Selling item');
      return;
    }
    if(!image){
      alert('Kindly Choose image for Selling item');
      return;
    }

     let formdata = new FormData();
    formdata.append('Category', category);
    formdata.append('name',name);
    formdata.append('desc',desc);
    formdata.append('price',price);
    if(value !== null){
      formdata.append('userid', value);
    }else{
      formdata.append('userid', '0');
    }
    //
    formdata.append('data', {
        uri: image,
        type: 'image/png',
        name: 'photo'
      });
    
    setLoaderPending(true);
    fetch(Constant.BASEURL + 'api/Appapi/TestDataPost',{
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
            
            
            if(value !== null) {
              alert('Your Ads has been published for Sale');
              
            }else{
              
              storeLastSellitemid(dataid);
              navigation.navigate('Login', {valuedata : 'Sell'});
            }
          })
          
        }
        
      }).catch(err => {
        setLoaderPending(false);
        console.log(err);
      });  
    }

  return (
    
    <>
    <View style={styles.container}>
        <Text>Create Ads</Text>
        {/* <DropDown
              label={"Category"}
              mode={"outlined"}
              visible={showDropDown}
              showDropDown={() => setShowDropDown(true)}
              onDismiss={() => setShowDropDown(false)}
              value={category}
              setValue={setCategory}
              list={categoryList}
            /> */}
            <View
  style={{
  borderWidth: 1,
  borderRadius: 1,
  borderColor:'gray'
}}>
  <Picker style={styles.picker}
                  selectedValue={category}
                  onValueChange={ (itemValue) => setCategory(itemValue)}
          >
            <Picker.Item value="Metal" label="Metal" />
            <Picker.Item value="Copper" label="Copper" />
            <Picker.Item value="Plastic" label="Plastic" />
            <Picker.Item value="Steel" label="Steel" />
            <Picker.Item value="Iron" label="Iron" />
            <Picker.Item value="Brass" label="Brass" />
            <Picker.Item value="CottonBox" label="CottonBox" />
            <Picker.Item value="Other" label="Other" />
            

          </Picker>
</View>
          
        <TextInput 
          label="Ad title"
          value={name}
          mode="outlined"
          onChangeText={text => setName(text)}
        />
        <TextInput 
          label="Describe what are you selling"
          value={desc}
          mode="outlined"
          numberOfLines={3}
          multiline={true}
          onChangeText={text => setDesc(text)}
        />
        {/* <TextInput 
          label="Year of Purchase"
          value={year}
          mode="outlined"
          keyboardType="numeric"
          onChangeText={text => setYear(text)}
        /> */}
        <TextInput 
          label="Price in INR"
          value={price}
          mode="outlined"
          keyboardType="numeric"
          onChangeText={text => setPrice(text)}
        />
        {/* <TextInput 
          label="Your contact Number"
          value={phone}
          mode="outlined"
          keyboardType="numeric"
          onChangeText={text => setPhone(text)}
        /> */}
        {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
        <Button icon="camera" mode="contained" onPress={pickImage} style={{marginTop:10}}>
          Choose Picture
        </Button>
        <Button mode="contained" onPress={uploadData}  style={{marginTop:10}}>
          Post
        </Button>
    </View>
    {loaderPending ? <Apploader  /> : null}
  </>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: -70,
    flex: 1,
    backgroundColor: '#f7f5f0',
    marginHorizontal:30,
    justifyContent:"center"
  },
  picker:{
    width: 300,
                        marginTop: 15,
                        marginBottom:15,
                        borderColor: 'black',
                        borderBottomWidth:1,
                        borderRadius: 10,
                        alignItems: 'center'
  }
});