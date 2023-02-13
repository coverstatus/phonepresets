/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { ScrollView, StatusBar, StyleSheet, Text, useColorScheme, View } from 'react-native';
import { AppColors } from '../../app.styles';
import { CommonService } from '../../services/common.service';

const AppHint = (props: any) => {
  // const isDarkMode = useColorScheme() === 'dark';
  const isDarkMode = true;

  return (
    <Text
      style={{
        fontSize: 12,
        fontWeight: '600',
        color: isDarkMode ? AppColors.dark.text : AppColors.light.text,
        opacity: 0.66,
        ...props?.style,
      }}>
      {props.children}
    </Text>
  );
};

export default AppHint;
