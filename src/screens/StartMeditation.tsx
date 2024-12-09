import React, { useLayoutEffect, useState } from 'react';
import BackgroundWrapper from '@/components/layout/Wrapper';
import CustomText from '@/components/ui/Text';
import {View} from 'react-native';
import BottomBlock from '@/components/layout/BottomBlock';
import Title from '@/components/layout/Title';
import Button from '@/components/ui/Button';
import {useNavigation} from '@react-navigation/native';
import {Screens, UseNavigationProp} from '@/types/navigation';
import CurrentColor from '@/components/CurrentColor';
import {useUserStore} from '@/stores/userStore';
import DayInfo from '@/components/DayInfo';
import SideNavigation from '@/components/SideNavigation';

const getTodayDateString = () => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return today.toISOString().split('T')[0];
};

export default function StartMeditation() {
  const nav = useNavigation<UseNavigationProp>();
  const currentColor = useUserStore(state => state.currentColor);
  const [isAlreadyListened, setIsAlreadyListened] = useState(false);

  const meditationListenedDays = useUserStore(state => state.meditationListenedDays);
  const setMeditationListenedDays = useUserStore(state => state.setMeditationListenedDays);

  useLayoutEffect(() => {
    const todayDateString = getTodayDateString();
    if (meditationListenedDays.includes(todayDateString)) {
      setIsAlreadyListened(true);
    }
  }, [meditationListenedDays]);

  const handleStartMeditation = () => {
    const todayDateString = getTodayDateString();
    if (!meditationListenedDays.includes(todayDateString)) {
      setMeditationListenedDays([...meditationListenedDays, todayDateString]);
    }
    nav.navigate(Screens.MEDITATION);
  };

  return (
    <BackgroundWrapper color={currentColor}>
      <SideNavigation />
      <BottomBlock style={{alignItems: 'center', paddingTop: 0}}>
        <DayInfo />

        <CurrentColor />

        <View style={{marginTop: 20}}>
          <Title text={'Well done, completed all tasks for today'} />
        </View>
     {!isAlreadyListened &&  <>
        <CustomText align="center" mt={16} color="#656565">
          your reward -
        </CustomText>
        <CustomText align="center" color="#656565">
          15-minute meditation
        </CustomText>
      </>}

      {isAlreadyListened && <>

      <CustomText align="center" mt={16} color="#656565">
      You have already listened to the meditation, would you like to listen again?
        </CustomText>

        </>}

        <CustomText align="center" mt={12} color="#656565">
          Come back tomorrow for more!
        </CustomText>

        <View
          style={{
            width: '80%',
            marginHorizontal: 'auto',
            marginTop: 30,
            marginBottom: '80%',
          }}>
          <Button
            title={isAlreadyListened ? 'Listen again' : 'Start Meditation'}
            onPress={handleStartMeditation}
          />
        </View>
      </BottomBlock>
    </BackgroundWrapper>
  );
}
