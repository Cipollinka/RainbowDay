import {CalendarHistory} from '@/types';
import {getPersistStoreOptions} from '@/utils/getPersistStoreOptions';
import {create} from 'zustand';
import {persist} from 'zustand/middleware';

interface State {
  username: string;
  setUsername: (username: string) => void;

  avatar: string;
  setAvatar: (avatar: string) => void;

  isTermsAccepted: boolean;
  setIsTermsAccepted: (isTermsAccepted: boolean) => void;

  isFirstTaskDone: boolean;
  setIsFirstTaskDone: (isFirstTaskDone: boolean) => void;

  isSecondTaskDone: boolean;
  setIsSecondTaskDone: (isSecondTaskDone: boolean) => void;

  currentColor: string;
  setCurrentColor: (currentColor: string) => void;

  calendarHistory: CalendarHistory[];
  setCalendarHistory: (date: string, h: CalendarHistory[]) => void;

  meditationListenedDays: string[];
  setMeditationListenedDays: (meditationListenedDays: string[]) => void;

  isAlreadyGreeted: boolean;
  setIsAlreadyGreeted: (isAlreadyGreeted: boolean) => void;

}

export const useUserStore = create(
  persist<State>(
    (set, get) => ({
      username: '',
      setUsername: (username: string) => set({username}),

      avatar: '',
      setAvatar: (avatar: string) => set({avatar}),

      isTermsAccepted: false,
      setIsTermsAccepted: (isTermsAccepted: boolean) => set({isTermsAccepted}),

      isFirstTaskDone: false,
      setIsFirstTaskDone: (isFirstTaskDone: boolean) => set({isFirstTaskDone}),

      isSecondTaskDone: false,
      setIsSecondTaskDone: (isSecondTaskDone: boolean) =>
        set({isSecondTaskDone}),

      currentColor: '#FE6A60',
      setCurrentColor: (currentColor: string) => set({currentColor}),

      calendarHistory: [],
      setCalendarHistory: (date: string, h: CalendarHistory[]) => {
        const history = [...get().calendarHistory];
        const isExists = history.find(item => item.date === date);
        if (isExists) {
          const index = history.findIndex(item => item.date === date);
          history[index].doneTasks = h[0].doneTasks;
          history[index].skippedTasks = h[0].skippedTasks;
        } else {
          history.push({
            date,
            doneTasks: h[0].doneTasks,
            skippedTasks: h[0].skippedTasks,
          });
        }

        set({calendarHistory: history});
      },

      meditationListenedDays: [],
      setMeditationListenedDays: (meditationListenedDays: string[]) =>
        set({meditationListenedDays}),

      isAlreadyGreeted: false,
      setIsAlreadyGreeted: (isAlreadyGreeted: boolean) =>
        set({isAlreadyGreeted}),
    }),

    getPersistStoreOptions('user'),
  ),
);
