/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { View, useColorScheme } from 'react-native';
import { AppColors } from '../../app.styles';

const AppCardContainer = (props: any) => {
  // const isDarkMode = useColorScheme() === 'dark';
  const isDarkMode = true;

  return (
    <View
      style={{
        flexGrow: 1,
        backgroundColor: isDarkMode ? AppColors.dark.card : AppColors.light.card,
        ...props?.style,
      }}>
      {props.children}
    </View>
  );
};

export default AppCardContainer;
