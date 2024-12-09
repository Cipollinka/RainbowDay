import React, { useEffect } from 'react';
import BackgroundWrapper from '@/components/layout/Wrapper';
import CustomText from '@/components/ui/Text';
import {Image, View} from 'react-native';
import BottomBlock from '@/components/layout/BottomBlock';
import Title from '@/components/layout/Title';
import Button from '@/components/ui/Button';
import {useNavigation} from '@react-navigation/native';
import {Screens, UseNavigationProp} from '@/types/navigation';
import { useUserStore } from '@/stores/userStore';

export default function Share() {
  const nav = useNavigation<UseNavigationProp>();
  const setIsAlreadyGreeted = useUserStore(state => state.setIsAlreadyGreeted);

  useEffect(() => {
    setIsAlreadyGreeted(true);
  }, []);

  return (
    <BackgroundWrapper color="green">
      <View
        style={{
          width: '100%',
          marginTop: 'auto',
          paddingTop: 17,
          height: 369,
        }}>
        <Image
          source={require('@/assets/images/share.jpg')}
          style={{
            width: '100%', // height: 260,
            maxWidth: 430,
            height: 369,
          }}
          // resizeMode="cover"
        />
      </View>

      <BottomBlock style={{alignItems: 'center', marginTop: 0, paddingTop: 40}}>
        <View>
          <Title text="Share the Colors of Your Day" selected="Share" />
        </View>

        <CustomText align="center" mt={16}>
          Inspire others by sharing your color mood on social media. Make the
          world a little brighter together!
        </CustomText>

        <View
          style={{
            width: '80%',
            marginHorizontal: 'auto',
            marginTop: 40,
            marginBottom: 80,
          }}>
          <Button
            title="Start now!"
            onPress={() => nav.replace(Screens.FIND_COLOR)}
          />
        </View>
      </BottomBlock>
    </BackgroundWrapper>
  );
}
