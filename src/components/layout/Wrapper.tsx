import React from 'react';
import {Image, SafeAreaView, StyleSheet, View} from 'react-native';

interface Props {
  children: React.ReactNode;
  color?: 'green' | 'red' | string;
}

export default function BackgroundWrapper({children, color}: Props) {
  const calcColor = color
    ? styles?.[color]?.backgroundColor
      ? styles?.[color]?.backgroundColor
      : color
    : '#1a1a1a';

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: calcColor,
        position: 'relative',
      }}>
        <Image style={{position:'absolute', width:'100%', height: '100%'}} source={require('../../assets/images/bg.png')}/>
      {children}

      <View
        style={{
          backgroundColor: '#fff',
          height: 40,
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  green: {
    backgroundColor: '#51c34b',
  },
  red: {
    backgroundColor: 'red',
  },
});
