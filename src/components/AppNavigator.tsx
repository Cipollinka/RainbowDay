import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {RootStackParamList, Screens} from '@/types/navigation';

import Greetings from '@/screens/Greetings';
import AfterGreetings from '@/screens/AfterGreetings';
import Share from '@/screens/Share';
import FindColor from '@/screens/FindColor';
import StartMeditation from '@/screens/StartMeditation';
import Main from '@/screens/Main';
import Calendar from '@/screens/Calendar';
import Meditation from '@/screens/Meditation';

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={Screens.GREETINGS}
        screenOptions={{headerShown: false}}>
        <Stack.Screen name={Screens.GREETINGS} component={Greetings} />
        <Stack.Screen
          name={Screens.AFTER_GREETINGS}
          component={AfterGreetings}
        />
        <Stack.Screen name={Screens.SHARE} component={Share} />
        <Stack.Screen name={Screens.FIND_COLOR} component={FindColor} />
        <Stack.Screen
          name={Screens.START_MEDITATION}
          component={StartMeditation}
        />
        <Stack.Screen name={Screens.MAIN} options={{}} component={Main} />
        <Stack.Screen name={Screens.CALENDAR} component={Calendar} />
        <Stack.Screen name={Screens.MEDITATION} component={Meditation} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
