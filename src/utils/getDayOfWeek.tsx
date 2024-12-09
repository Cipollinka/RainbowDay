export const getDayOfWeek = (date: Date) => {
  const day = date.getDay();
  const daysOfWeek = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];

  return daysOfWeek[day];
};
