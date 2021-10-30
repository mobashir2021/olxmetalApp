import React, {useState} from 'react';
import {StyleSheet, View, Text, Dimensions } from 'react-native';
import Tab from "./Tab";

const {width} = Dimensions.get('screen');

const TabBar = ({state, navigation}) => {
    const [selected , setSelected] = useState('Home');
    const {routes} = state;
    const renderColor = currentTab => (currentTab === selected ? 'red' : 'black');

    const handlePress = (activeTab, index) => {
        
        if(state.index !== index){
            setSelected(activeTab);
            navigation.navigate(activeTab);
        }
        
    }

    return (
        <View style={styles.wrapper}>
            <View style={styles.container}>
                {
                    routes.map((route, index) => (<Tab 
                        tab={route} 
                         icon={route.params.icon} 
                         onPress={ () => handlePress(route.name, index)} 
                         color={renderColor(route.name)} 
                        key={route.key} />
                        ))
                }
            </View>
            
        </View>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        position: 'absolute',
        bottom: 20,
        width,
        height: 50,
        
        alignItems: 'center',
        justifyContent: 'center'
    },
    container:{
        flexDirection:'row',
        backgroundColor: '#fff',
        width: 335,
        justifyContent:'space-between',
        borderRadius: 15,
        shadowColor:'#7F5DF0',
        shadowOffset:{
            width:0,
            height:10
        },
        shadowOpacity:0.5,
        shadowRadius:3.5,
        elevation:15
    },
    shadow:{
        shadowColor:'#7F5DF0',
        shadowOffset:{
            width:0,
            height:10
        },
        shadowOpacity:0.25,
        shadowRadius:3.5,
        elevation:5
    }
})

export default TabBar;
