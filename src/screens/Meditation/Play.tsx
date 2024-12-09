import {View, TouchableOpacity} from 'react-native';
import React from 'react';
import Row from '@/components/layout/Row';
import PlayIcon from '@/assets/icons/play.svg';

interface Props {
  currentColor: string;
  isPaused: boolean;
  onPress: () => void;
}

export default function Play({currentColor, isPaused, onPress}: Props) {
  return (
    <TouchableOpacity onPress={onPress}>
      <View
        style={{
          marginTop: 0,
          width: 75,
          height: 75,
          borderRadius: 9999,
          backgroundColor: currentColor,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        {isPaused ? (
          <View>
            <PlayIcon fill={'#fff'} stroke={'#fff'} width={30} height={30} />
          </View>
        ) : (
          <Row gap={10}>
            <View
              style={{
                borderRadius: 9999,
                width: 6,
                height: 26,
                backgroundColor: '#fff',
              }}
            />
            <View
              style={{
                borderRadius: 9999,
                width: 6,
                height: 26,
                backgroundColor: '#fff',
              }}
            />
          </Row>
        )}
      </View>
    </TouchableOpacity>
  );
}
