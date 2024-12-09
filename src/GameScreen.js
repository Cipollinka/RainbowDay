import React from 'react';
import AppNavigator from '@/components/AppNavigator';
import {SafeAreaProvider} from 'react-native-safe-area-context';

export default function GameScreen() {
  return (<SafeAreaProvider>
    <AppNavigator />
  </SafeAreaProvider>);
}
