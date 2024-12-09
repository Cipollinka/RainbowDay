import React, { useLayoutEffect } from 'react';
import BackgroundWrapper from '@/components/layout/Wrapper';
import CustomText from '@/components/ui/Text';
import {Image, View} from 'react-native';
import BottomBlock from '@/components/layout/BottomBlock';
import Title from '@/components/layout/Title';
import Button from '@/components/ui/Button';
import {useNavigation} from '@react-navigation/native';
import {Screens, UseNavigationProp} from '@/types/navigation';
import { useUserStore } from '@/stores/userStore';

export default function Greetings() {
  const nav = useNavigation<UseNavigationProp>();
  const isAlreadyGreeted = useUserStore(state => state.isAlreadyGreeted);
  const calendarHistory = useUserStore(state => state.calendarHistory);

  useLayoutEffect(() => {
    if(!isAlreadyGreeted) {return;}
    console.log('calendarHistory', calendarHistory);

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const date = today.toISOString();
    const history = calendarHistory.find(item => item.date === date);
    if (!history) {
      nav.replace(Screens.FIND_COLOR);
    } else {
      nav.replace(Screens.MAIN);
    }
  }, [calendarHistory, isAlreadyGreeted]);

  return (
    <BackgroundWrapper color="green">
      <View style={{width: '100%'}}>
        <Image
          source={require('@/assets/images/greetings.png')}
          style={{
            width: '100%',
            height: 390,
            maxWidth: 430,
            marginHorizontal: 'auto',
            marginTop: '15%',
          }}
        />
      </View>

      <BottomBlock style={{alignItems: 'center'}}>
        <Title text="A New Color Every Day" />
        <Title text="A New Mood Every Day!" selected="Mood" />

        <CustomText align="center" mt={16} color="#656565">
          Every day brings a fresh color and a new mood. Discover the power of
          colors and how they can make your day brighter and more inspiring!
        </CustomText>

        <View
          style={{
            width: '80%',
            marginHorizontal: 'auto',
            marginTop: 50,
            marginBottom: 70,
          }}>
          <Button
            title="Next"
            onPress={() => nav.replace(Screens.AFTER_GREETINGS)}
          />
        </View>
      </BottomBlock>
    </BackgroundWrapper>
  );
}
