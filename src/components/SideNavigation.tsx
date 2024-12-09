import {View, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import TaskIcon from '@/assets/icons/task.svg';
import CalendarIcon from '@/assets/icons/calendar.svg';
import {useNavigation, useRoute} from '@react-navigation/native';
import {Screens, UseNavigationProp} from '@/types/navigation';

const TASK_DISABLED_SCREENS = [
  Screens.MAIN,
  Screens.GREETINGS,
  Screens.AFTER_GREETINGS,
  Screens.SHARE,
  Screens.FIND_COLOR,
];

const CALENDAR_DISABLED_SCREENS = [
  Screens.CALENDAR,
  Screens.GREETINGS,
  Screens.AFTER_GREETINGS,
  Screens.SHARE,
  Screens.FIND_COLOR,
];

export default function SideNavigation() {
  const nav = useNavigation<UseNavigationProp>();
  const route = useRoute();
  const isTaskShown = !TASK_DISABLED_SCREENS.includes(route.name as Screens);
  const isCalendarShown = !CALENDAR_DISABLED_SCREENS.includes(
    route.name as Screens,
  );

  const handleNavigate = (route: Screens) => {
    nav.replace(route);
  };

  return (
    <View style={styles.container}>
      {isTaskShown && (
        <TouchableOpacity onPress={() => handleNavigate(Screens.MAIN)}>
          <View style={styles.item}>
            <View style={styles.box}>
              <TaskIcon width={24} height={24} />
            </View>
          </View>
        </TouchableOpacity>
      )}

      {isCalendarShown && (
        <TouchableOpacity onPress={() => handleNavigate(Screens.CALENDAR)}>
          <View style={styles.item}>
            <View style={styles.box}>
              <CalendarIcon width={24} height={24} />
            </View>
          </View>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: '83%',
    right: 0,
    bottom: 0,
    zIndex: 100,
    gap: 10,
  },
  item: {
    backgroundColor: '#FFE267',
    borderTopLeftRadius: 9999,
    borderBottomLeftRadius: 9999,
    width: 67,
    height: 50,
    padding: 4,
    flexDirection: 'row',
    alignItems: 'center',
  },
  box: {
    borderRadius: 9999,
    padding: 4,
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: 40,
    height: 40,
  },
});
