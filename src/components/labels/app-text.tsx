/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, useColorScheme, View } from 'react-native';
import { AppColors } from '../../app.styles';
import { CommonService } from '../../services/common.service';

const AppText = (props: any) => {
  // const isDarkMode = useColorScheme() === 'dark';
  const isDarkMode = true;

  return (
    <Text
      style={{
        fontSize: 16,
        color: isDarkMode ? AppColors.dark.text : AppColors.light.text,
        opacity: 1,
        ...props?.style,
      }}
      selectable={props?.selectable ? true : false}>
      {props.children}
    </Text>
  );
};

export default AppText;
