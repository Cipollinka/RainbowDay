import {View} from 'react-native';
import React from 'react';
import {useUserStore} from '@/stores/userStore';

export default function CurrentColor() {
  const currentColor = useUserStore(state => state.currentColor);
  return (
    <View
      style={{
        width: 114,
        height: 114,
        borderRadius: 9999,
        backgroundColor: currentColor,
      }}
    />
  );
}
