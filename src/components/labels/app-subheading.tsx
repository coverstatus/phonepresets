/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, useColorScheme, View } from 'react-native';
import { AppColors } from '../../app.styles';

const AppSubheading = (props: any) => {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <Text
      style={{
        fontSize: 12,
        fontWeight: '500',
        color: AppColors.accent,
        ...props?.style,
      }}>
      {props.children}
    </Text>
  );
};

export default AppSubheading;
