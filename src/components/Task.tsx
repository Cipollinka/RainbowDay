import {View, TouchableOpacity} from 'react-native';
import React from 'react';
import Row from './layout/Row';
import {useUserStore} from '@/stores/userStore';
import CustomText from './ui/Text';
import Button from './ui/Button';
import ShareIcon from '@/assets/icons/share.svg';
import CheckmarkIcon from '@/assets/icons/checkmark.svg';

interface Props {
  isDone: boolean;
  onPress: () => void;
  isDisabled: boolean;
  onShare: (title: string, text: string) => void;
  title: string;
  text: string;
}

export default function Task({
  isDone,
  onPress,
  onShare,
  text,
  title,
  isDisabled,
}: Props) {
  const currentColor = useUserStore(state => state.currentColor);

  return (
    <View
      style={{
        borderRadius: 16,
        marginTop: 12,
        alignItems: 'center',
        backgroundColor: '#EFEFEF',
        width: '90%',
        borderWidth: 1,
        borderColor: '#DCDCDC',
        padding: 24,
        opacity: isDisabled ? 0.5 : 1,
      }}>
      <Row gap={5}>
        <View
          style={{
            width: 22,
            height: 22,
            borderRadius: 9999,
            backgroundColor: currentColor,
          }}
        />
        <CustomText fw="bold">{title}</CustomText>
      </Row>

      <CustomText align="center" mt={16}>
        {text}
      </CustomText>

      <Row gap={10} mt={16} style={{position: 'relative'}}>
        {isDone && (
          <View style={{position: 'absolute', top: 10, left: 60, zIndex: 10}}>
            <CheckmarkIcon width={24} height={24} style={{zIndex: 20}} />
          </View>
        )}
        <Button
          disabled={isDisabled}
          title={isDisabled ? 'Waiting' : isDone ? 'Done' : 'Done, next task'}
          onPress={() => onPress()}
          variant={isDone ? 'done' : 'default'}
          style={{
            paddingVertical: 12,
            paddingHorizontal: 35,
            borderRadius: 50,
            width: isDone ? 182 : 202,
            marginLeft: isDone ? 20 : 0,
          }}
        />

        <TouchableOpacity
          disabled={isDisabled}
          onPress={() => onShare(title, text)}>
          <View
            style={{
              width: 40,
              height: 40,
              borderRadius: 9999,
              backgroundColor: '#fff',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <ShareIcon width={24} height={24} />
          </View>
        </TouchableOpacity>
      </Row>
    </View>
  );
}
