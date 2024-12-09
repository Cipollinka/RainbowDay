import React, {useState} from 'react';
import BackgroundWrapper from '@/components/layout/Wrapper';
import {View} from 'react-native';
import BottomBlock from '@/components/layout/BottomBlock';
import Title from '@/components/layout/Title';
import {useUserStore} from '@/stores/userStore';
import SideNavigation from '@/components/SideNavigation';
import DateTimePicker from '@react-native-community/datetimepicker';
import DayData from './DayData';

export default function Calendar() {
  const currentColor = useUserStore(state => state.currentColor);
  const [date, setDate] = useState(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return today;
  });

  return (
    <BackgroundWrapper color={currentColor}>
      <SideNavigation />

      <BottomBlock style={{alignItems: 'center', paddingTop: 0}}>
        <View style={{marginTop: 20}}>
          <Title text="Color Calendar" />
        </View>

        <DateTimePicker
          value={date}
          onChange={(_, nextDate) => {
            if (nextDate) {
              nextDate.setHours(0, 0, 0, 0);
              setDate(nextDate);
            }
          }}
          mode="date"
          display="inline"
          style={{width: '100%', height: 400}}
        />

        <DayData date={date} />

        <View style={{marginBottom: '80%'}} />
      </BottomBlock>
    </BackgroundWrapper>
  );
}
