import React, {useEffect, useState} from 'react';
import BackgroundWrapper from '@/components/layout/Wrapper';
import {Animated, StyleSheet, View} from 'react-native';
import BottomBlock from '@/components/layout/BottomBlock';
import Title from '@/components/layout/Title';
import {useUserStore} from '@/stores/userStore';
import DayInfo from '@/components/DayInfo';
import SideNavigation from '@/components/SideNavigation';
import CustomText from '@/components/ui/Text';
import PlayButton from './Play';
import Sound from 'react-native-sound';

const hexToRgb = (hex: string) => {
  let r = 0,
    g = 0,
    b = 0;

  // 3 digits
  if (hex.length === 4) {
    r = parseInt(hex[1] + hex[1], 16);
    g = parseInt(hex[2] + hex[2], 16);
    b = parseInt(hex[3] + hex[3], 16);
  }
  // 6 digits
  else if (hex.length === 7) {
    r = parseInt(hex[1] + hex[2], 16);
    g = parseInt(hex[3] + hex[4], 16);
    b = parseInt(hex[5] + hex[6], 16);
  }

  return `rgba(${r}, ${g}, ${b}, ${0.5})`;
};

export default function Meditation() {
  const currentColor = useUserStore(state => state.currentColor);
  const [isPaused, setIsPaused] = useState(true);
  const [sound, setSound] = useState<Sound | null>(null);
  const [progress, setProgress] = useState(new Animated.Value(0));
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [bars, setBars] = useState(Array(30).fill(0)); // 30 bars representing track sections

  // Create a random height for each column to simulate the wave
  const generateBars = () => {
    return Array.from({length: 55}, () => Math.random() * 30 + 10); // Random heights between 10 and 110
  };

  useEffect(() => {
    setBars(generateBars());
    // Load sound when component mounts
    const soundInstance = new Sound(
      'meditation.mp3',
      Sound.MAIN_BUNDLE,
      error => {
        if (error) {
          console.log('Failed to load the sound', error);
          return;
        }
        setDuration(soundInstance.getDuration()); // Get duration in milliseconds
        setSound(soundInstance);
      },
    );

    return () => {
      // Release the sound resource when component unmounts
      if (soundInstance) {
        soundInstance.release();
      }
    };
  }, []);

  useEffect(() => {
    let timer;
    if (!isPaused) {
      timer = setInterval(() => {
        if (sound && !isPaused) {
          sound.getCurrentTime(seconds => {
            setCurrentTime(seconds); // Update current time
            setProgress(new Animated.Value(seconds / duration)); // Update progress bar
          });
        }
      }, 1000);
    } else if (timer) {
      clearInterval(timer);
    }

    return () => clearInterval(timer);
  }, [isPaused, sound, duration]);

  const playPauseSound = () => {
    if (!sound) return;

    if (!isPaused) {
      sound.pause();
      setIsPaused(true);
    } else {
      sound.play(success => {
        if (success) {
          console.log('Successfully finished playing');
          setIsPaused(true);
          setCurrentTime(0);
          Animated.timing(progress).stop();
          progress.setValue(0); // Reset progress bar
        } else {
          console.log('Playback failed');
        }
      });
      setIsPaused(false);
    }
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes < 10 ? '0' : ''}${minutes}:${
      remainingSeconds < 10 ? '0' : ''
    }${remainingSeconds}`;
  };

  return (
    <BackgroundWrapper color={currentColor}>
      <SideNavigation />

      <BottomBlock style={{alignItems: 'center', paddingTop: 0}}>
        <DayInfo text="Meditation" />

        <View
          style={{
            width: 208,
            height: 114,
            borderRadius: 9999,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: currentColor,
          }}>
          <CustomText fs={38} ff="Fredoka" color="#fff" fw="bold">
            {formatTime(currentTime)}
          </CustomText>
        </View>

        <View style={{marginTop: 20, width: 200, marginLeft: 10}}>
          <Title text="Relax and turn on the sound" />
        </View>

        <View style={styles.trackLineContainer}>
          {bars.map((height, index) => (
            <View
              key={index}
              style={[
                styles.trackColumn,
                {
                  height: height,
                  backgroundColor:
                    index / bars.length < progress._value // Check if this column is in the progress range
                      ? '#FF5733' // Progress color (orange)
                      : hexToRgb(currentColor), // Default column color (yellow)
                },
              ]}
            />
          ))}
        </View>

        <PlayButton
          currentColor={currentColor}
          isPaused={isPaused}
          onPress={playPauseSound}
        />

        <View style={{marginBottom: '80%'}} />
      </BottomBlock>
    </BackgroundWrapper>
  );
}

const styles = StyleSheet.create({
  trackLineContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: 100,
    backgroundColor: '#fff', // White background for track line
    borderRadius: 5,
    overflow: 'hidden',
    marginBottom: 20,
    marginTop: 20,
  },
  trackColumn: {
    width: 4,
    marginHorizontal: 1,
    borderRadius: 999,
  },
});
