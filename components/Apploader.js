import React from 'react';
import {View, StyleSheet} from 'react-native';
import LottieView from 'lottie-react-native';
import COLORS from '../data/colors';



const Apploader = () => {
    return (
        <View style={[ StyleSheet.absoluteFillObject, styles.container]}>
            <LottieView style={styles.lottieviewstyle} source={require('../assets/loader.json')} autoPlay loop/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        justifyContent:'center',
        alignItems:'center',
        backgroundColor: 'rgba(0,0,0,0.3)',
        zIndex:1
    },
    lottieviewstyle:{
      width : 100,
      height : 100
    }
})

export default Apploader
