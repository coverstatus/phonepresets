/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { Text, useColorScheme } from 'react-native';
import { AppColors } from '../../app.styles';
import { CommonService } from '../../services/common.service';

const AppHeading = (props: any) => {
  // const isDarkMode = useColorScheme() === 'dark';
  const isDarkMode = true;

  return (
    <Text
      style={{
        fontSize: 18,
        fontWeight: '500',
        color: isDarkMode ? AppColors.dark.text : AppColors.light.text,
        marginTop: CommonService.isIos() ? 0 : -4,
        ...props?.style,
      }}>
      {props.children}
    </Text>
  );
};

export default AppHeading;
