import {View, StyleSheet} from 'react-native';
import React from 'react';
import CustomText from '@/components/ui/Text';
import Row from '@/components/layout/Row';
import {COLORS_BY_DAY} from '@/constants';
import {useUserStore} from '@/stores/userStore';

interface Props {
  date: Date;
}

export default function DayData({date}: Props) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const dayOfWeek = date.getDay();
  const color = COLORS_BY_DAY[dayOfWeek];
  const calendarHistory = useUserStore(state => state.calendarHistory);
  const currentData = calendarHistory.find(
    data => data.date === date.toISOString(),
  );

  return (
    <View style={styles.dayData}>
      <Row
        style={[
          styles.dateItem,
          {borderBottomWidth: 1, borderColor: '#DCDCDC', paddingBottom: 5},
        ]}>
        <CustomText fs={18}>Color:</CustomText>
        <View
          style={{
            paddingHorizontal: 12,
            paddingVertical: 8,
            borderRadius: 6,
            backgroundColor: color.color,
          }}>
          <CustomText fs={18}>{color.name}</CustomText>
        </View>
      </Row>

      <Row style={styles.dateItem}>
        <CustomText fs={18}>Done tasks:</CustomText>
        <View style={styles.valueContainer}>
          <CustomText fs={18}>{currentData?.doneTasks ?? 0}</CustomText>
        </View>
      </Row>

      <Row style={styles.dateItem}>
        <CustomText fs={18}>Skipped tasks:</CustomText>
        <View style={styles.valueContainer}>
          <CustomText fs={18}>{currentData?.skippedTasks ?? 2}</CustomText>
        </View>
      </Row>
    </View>
  );
}

const styles = StyleSheet.create({
  dayData: {
    borderTopWidth: 1,
    borderColor: '#DCDCDC',
    marginTop: 20,
    gap: 10,
  },
  dateItem: {
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 5,
  },
  valueContainer: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
    backgroundColor: '#EBEBEB',
  },
});
