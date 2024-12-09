import React from 'react';
import {Text, StyleSheet, TextStyle, StyleProp} from 'react-native';

const fonts = {
  Montserrat: {
    regular: 'Montserrat-Regular',
    bold: 'Montserrat-Bold',
    semibold: 'Montserrat-SemiBold',
  },
  Fredoka: {
    regular: 'Fredoka-Regular',
    bold: 'Fredoka-Bold',
    semibold: 'Fredoka-SemiBold',
  },
};

const CustomText = ({
  style,
  fw = 'regular',
  fs = 16,
  ff = 'Montserrat',
  align = 'left',
  mt,
  color,
  ...props
}: {
  style?: StyleProp<TextStyle>;
  fw?: 'regular' | 'bold' | 'semibold';
  fs?: number;
  ff?: 'Montserrat' | 'Fredoka';
  align?: 'left' | 'center' | 'right' | 'justify';
  mt?: number;
  color?: string;
  children: React.ReactNode;
}) => {
  return (
    <Text
      style={[
        styles.text,
        style,
        {
          fontFamily: fonts[ff][fw],
          fontSize: fs || 16,
          textAlign: align,
          marginTop: mt || 0,
          color: color || styles.text.color,
        },
      ]}
      {...props}
    />
  );
};

const styles = StyleSheet.create({
  text: {
    color: '#000',
  },
});

export default CustomText;
