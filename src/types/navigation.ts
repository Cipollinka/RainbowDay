import {NativeStackNavigationProp} from '@react-navigation/native-stack';

export enum Screens {
  // CREATE_ACCOUNT = 'createAccount',
  GREETINGS = 'greetings',
  AFTER_GREETINGS = 'afterGreetings',
  SHARE = 'share',
  FIND_COLOR = 'findColor',
  START_MEDITATION = 'startMeditation',
  MEDITATION = 'meditation',
  MAIN = 'main',
  CALENDAR = 'calendar',
}

export type RootStackParamList = {
  [Screens.GREETINGS]: undefined;
  [Screens.AFTER_GREETINGS]: undefined;
  [Screens.SHARE]: undefined;
  [Screens.FIND_COLOR]: undefined;
  [Screens.START_MEDITATION]: undefined;
  [Screens.MEDITATION]: undefined;
  [Screens.MAIN]: undefined;
  [Screens.CALENDAR]: undefined;
};

export type ScreenNavigationProp<T extends keyof RootStackParamList> = {
  navigation: NativeStackNavigationProp<RootStackParamList, T>;
};

export type UseNavigationProp = NativeStackNavigationProp<RootStackParamList>;
