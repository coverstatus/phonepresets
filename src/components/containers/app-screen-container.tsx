/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { SafeAreaView, useColorScheme } from 'react-native';
import { AppColors } from '../../app.styles';

const AppScreenContainer = (props: any) => {
  // const isDarkMode = useColorScheme() === 'dark';
  const isDarkMode = true;

  return (
    <SafeAreaView
      style={{
        flex: 1,
        flexGrow: 1,
        backgroundColor: isDarkMode ? AppColors.dark.background : AppColors.light.background,
        ...props?.style,
      }}>
      {props.children}
    </SafeAreaView>
  );
};

export default AppScreenContainer;
