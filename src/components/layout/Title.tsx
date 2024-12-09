import React from 'react';
import CustomText from '../ui/Text';
import {StyleSheet, View} from 'react-native';

interface Props {
  text: string;
  selected?: string;
}

export default function Title({text, selected}: Props) {
  const [before, selectedText, after] = text.split(
    new RegExp(`(${selected})`, 'i'),
  );
  return (
    <View style={{flexDirection: 'row', alignItems: 'center'}}>
      {before && (
        <CustomText fw="bold" fs={26} ff="Fredoka" align="center">
          {before}
        </CustomText>
      )}
      {selectedText ? (
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <CustomText fw="bold" fs={26} ff="Fredoka" style={styles.selected}>
            {selectedText}
          </CustomText>
        </View>
      ) : null}

      {after && (
        <CustomText fw="bold" fs={26} ff="Fredoka">
          {after}
        </CustomText>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  selected: {
    backgroundColor: '#51c34b',
    color: '#333',
    borderRadius: 10,
    paddingHorizontal: 4,
  },
});
