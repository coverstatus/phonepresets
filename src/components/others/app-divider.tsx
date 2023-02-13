/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { ScrollView, StatusBar, StyleSheet, Text, useColorScheme, View } from 'react-native';
import { AppColors } from '../../app.styles';
import { CommonService } from '../../services/common.service';

const AppDivider = ({ height, marginVertical, style }: any) => {
  // const isDarkMode = useColorScheme() === 'dark';
  const isDarkMode = true;

  return (
    <View
      style={{
        flex: 1,
        flexGrow: 1,
        backgroundColor: isDarkMode ? AppColors.dark.divider : AppColors.light.divider,
        marginVertical: marginVertical,
        height: height || 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'stretch',
        ...style,
      }}
    />
  );
};

export default AppDivider;
