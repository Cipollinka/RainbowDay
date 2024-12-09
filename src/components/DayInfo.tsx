import {View} from 'react-native';
import React from 'react';
import {getDayOfWeek} from '@/utils/getDayOfWeek';
import CustomText from './ui/Text';

interface Props {
  text?: string;
}

export default function DayInfo({text}: Props) {
  const dateString = new Date().toLocaleDateString('en-GB').replace(/\//g, '.');
  const dayOfWeek = getDayOfWeek(new Date());

  return (
    <View
      style={{
        backgroundColor: '#ECECEC',
        paddingVertical: 4,
        paddingHorizontal: text ? 40 : 10,
        borderRadius: 9999,
        marginHorizontal: 'auto',
        marginBlock: 25,
      }}>
      {!text && (
        <CustomText fs={14}>
          {dayOfWeek}, {dateString}
        </CustomText>
      )}

      {text && <CustomText fs={14}>{text}</CustomText>}
    </View>
  );
}
