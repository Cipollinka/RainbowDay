import React, {useEffect} from 'react';
import BackgroundWrapper from '@/components/layout/Wrapper';
import CustomText from '@/components/ui/Text';
import {View} from 'react-native';
import BottomBlock from '@/components/layout/BottomBlock';
import Title from '@/components/layout/Title';
import Button from '@/components/ui/Button';
import {useNavigation} from '@react-navigation/native';
import {Screens, UseNavigationProp} from '@/types/navigation';
import QuestionIcon from '@/assets/icons/question.svg';
import {useUserStore} from '@/stores/userStore';
import colors from '@/constants/colors.json';

export default function FindColor() {
  const nav = useNavigation<UseNavigationProp>();
  const setCurrentColor = useUserStore(state => state.setCurrentColor);

  useEffect(() => {
    const today = new Date();
    const dayOfWeek = today.getDay();
    const colorData = colors[dayOfWeek];
    setCurrentColor(colorData.color);
  }, [setCurrentColor]);

  return (
    <BackgroundWrapper color="green">
      <BottomBlock style={{alignItems: 'center', paddingTop: 60}}>
        <View
          style={{
            backgroundColor: '#dedede',
            borderRadius: 9999,
            width: 114,
            height: 114,
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 40,
          }}>
          <QuestionIcon width={76} height={76} />
        </View>

        <Title text="Let's find out what color is chosen for you today?" />

        <CustomText
          align="center"
          mt={24}
          color="#656565"
          style={{maxWidth: 236}}>
          Click on the button below to open the color
        </CustomText>

        <View
          style={{
            width: '80%',
            marginHorizontal: 'auto',
            marginTop: 40,
            marginBottom: 200,
          }}>
          <Button
            title="Start now!"
            onPress={() => nav.replace(Screens.MAIN)}
          />
        </View>
      </BottomBlock>
    </BackgroundWrapper>
  );
}
