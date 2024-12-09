import React from 'react';
import BackgroundWrapper from '@/components/layout/Wrapper';
import CustomText from '@/components/ui/Text';
import {Image, View} from 'react-native';
import BottomBlock from '@/components/layout/BottomBlock';
import Title from '@/components/layout/Title';
import Button from '@/components/ui/Button';
import {useNavigation} from '@react-navigation/native';
import {Screens, UseNavigationProp} from '@/types/navigation';

export default function AfterGreetings() {
  const nav = useNavigation<UseNavigationProp>();

  return (
    <BackgroundWrapper color="green">
      <View style={{width: '100%'}}>
        <Image
          source={require('@/assets/images/afterGreetings.png')}
          style={{
            width: 264,
            height: 260,
            maxWidth: 264,
            marginHorizontal: 'auto',
            marginTop: '20%',
          }}
        />
      </View>

      <BottomBlock style={{alignItems: 'center', paddingTop: 40}}>
        <Title text="A Daily Color to Inspire You" selected="Color" />

        <CustomText align="center" mt={16} color="#656565">
          Unlock a new color every day and tune into its mood. Each color has a
          unique meaning—blue for calmness, red for energy. Let colors inspire
          your day!
        </CustomText>

        <View
          style={{
            width: '80%',
            marginHorizontal: 'auto',
            marginTop: 40,
            marginBottom: 70,
          }}>
          <Button title="Next" onPress={() => nav.navigate(Screens.SHARE)} />
        </View>
      </BottomBlock>
    </BackgroundWrapper>
  );
}
