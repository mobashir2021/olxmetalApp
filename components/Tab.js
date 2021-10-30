import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';


const Tab = ({color, tab, onPress, icon}) => {
    
    return (
        
        <TouchableOpacity style={styles.container} onPress={onPress}>
            {icon && <MaterialIcons name={icon} size={20} color={color} />}
            <Text style={{ color }}>{tab.name}</Text>
        </TouchableOpacity>
    )
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 7,
       
        
    }
})

export default Tab;
