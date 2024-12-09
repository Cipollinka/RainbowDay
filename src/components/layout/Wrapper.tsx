import React from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';

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
