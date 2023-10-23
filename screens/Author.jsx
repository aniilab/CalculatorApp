import React from 'react';
import { Text } from 'react-native';
import {View, Image } from 'react-native';

const AuthorScreen = () => {

  return (
    <View
    style={{alignItems:'center', paddingTop:40}}
    >
        <Image source={require('../assets/myava.jpg')}
        style={{width: 200, height: 200, borderRadius:20}} />
        <View
        style={{alignItems:'center'}}
        >
        <Text style={{fontSize:24, margin:10, color: '#003337', fontWeight:'bold'}}>Alina Bedenko</Text>
        <Text >TTP41</Text>
        <Text >alinabedenko@knu.ua</Text>
        </View>
    </View>
  );
};

export default AuthorScreen;
