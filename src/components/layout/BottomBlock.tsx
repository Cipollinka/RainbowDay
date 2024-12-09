import {StyleProp, View, ViewStyle} from 'react-native';
import React from 'react';

interface Props {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

export default function BottomBlock({children, style}: Props) {
  return (
    <View
      style={[
        {
          padding: 16,
          backgroundColor: '#fff',
          borderTopLeftRadius: 24,
          borderTopRightRadius: 24,
          marginTop: 'auto',
        },
        style,
      ]}>
      {children}
    </View>
  );
}
