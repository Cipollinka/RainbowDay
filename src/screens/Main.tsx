import React, {useEffect, useState} from 'react';
import BackgroundWrapper from '@/components/layout/Wrapper';
import CustomText from '@/components/ui/Text';
import {Share, View} from 'react-native';
import BottomBlock from '@/components/layout/BottomBlock';
import Title from '@/components/layout/Title';
import {useNavigation} from '@react-navigation/native';
import {Screens, UseNavigationProp} from '@/types/navigation';
import CurrentColor from '@/components/CurrentColor';
import {useUserStore} from '@/stores/userStore';
import DayInfo from '@/components/DayInfo';
import Task from '@/components/Task';
import {COLORS} from '@/constants';
import SideNavigation from '@/components/SideNavigation';
import colors from '@/constants/colors.json';
import {ColorData} from '@/types';

function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const today = new Date();
today.setHours(0, 0, 0, 0);

export default function Main() {
  const nav = useNavigation<UseNavigationProp>();
  const currentColor = useUserStore(state => state.currentColor);
  const setCurrentColor = useUserStore(state => state.setCurrentColor);

  const [currentColorData, setCurrentColorData] = useState<ColorData | null>(
    null,
  );

  const calendarHistory = useUserStore(state => state.calendarHistory);
  const todayData = calendarHistory.find(
    data => data.date === today.toISOString(),
  );
  console.log('todayData', todayData);

  const isFirstTaskDone = todayData?.doneTasks
    ? todayData?.doneTasks >= 1
    : false;
  const isSecondTaskDone = todayData?.doneTasks
    ? todayData?.doneTasks >= 2
    : false;

  // const isFirstTaskDone = useUserStore(state => state.isFirstTaskDone);
  // const isSecondTaskDone = useUserStore(state => state.isSecondTaskDone);

  // const setIsFirstTaskDone = useUserStore(state => state.setIsFirstTaskDone);
  // const setIsSecondTaskDone = useUserStore(state => state.setIsSecondTaskDone);

  const setCalendarHistory = useUserStore(state => state.setCalendarHistory);

  const handleShare = async () => {
    // @ts-ignore
    const currentColorText = COLORS[currentColor];
    const colorTitle = `My color is ${currentColorText}!`;
    await Share.share({
      title: colorTitle,
      message: `${colorTitle}\n\n${currentColorData?.description}`,
    });
  };

  useEffect(() => {
    setCurrentColor('');
    const dayOfWeek = today.getDay();
    const colorData = colors[dayOfWeek];
    setCurrentColorData(colorData);
    setCurrentColor(colorData.color);
  }, [today, colors]);

  useEffect(() => {
    console.log('isFirstTaskDone', isFirstTaskDone);
    console.log('isSecondTaskDone', isSecondTaskDone);

    if (isFirstTaskDone && isSecondTaskDone) {
      handleStartMeditation();
    }
  }, [isFirstTaskDone, isSecondTaskDone]);

  const handleStartMeditation = async () => {
    await sleep(1500);
    nav.replace(Screens.START_MEDITATION);
  };

  const handleTaskDone = (isFirst: boolean) => {
    if (isFirst) {
      // setIsFirstTaskDone(true);
      setCalendarHistory(today.toISOString(), [
        {date: today.toISOString(), doneTasks: 1, skippedTasks: 1},
      ]);
    } else {
      console.log('here');

      // setIsSecondTaskDone(true);
      setCalendarHistory(today.toISOString(), [
        {date: today.toISOString(), doneTasks: 2, skippedTasks: 0},
      ]);
    }
  };

  return (
    <BackgroundWrapper color={currentColor}>
      <SideNavigation />

      <BottomBlock style={{alignItems: 'center', paddingTop: 0}}>
        <DayInfo />

        <CurrentColor />

        <View style={{marginTop: 20}}>
          <Title text={currentColorData?.meaning || ''} />
        </View>

        <CustomText
          align="center"
          mt={16}
          color="#656565"
          style={{maxWidth: 320, marginBottom: 12}}>
          {currentColorData?.description}
        </CustomText>

        <Task
          isDone={isFirstTaskDone}
          onPress={() => handleTaskDone(true)}
          title="Daily task #1"
          text={currentColorData?.tasks[0] || ''}
          isDisabled={false}
          onShare={handleShare}
        />

        <Task
          isDone={isSecondTaskDone}
          onPress={() => handleTaskDone(false)}
          title="Daily task #2"
          text={currentColorData?.tasks[1] || ''}
          isDisabled={!isFirstTaskDone}
          onShare={() => {}}
        />

        <View style={{marginBottom: '80%'}} />
      </BottomBlock>
    </BackgroundWrapper>
  );
}
