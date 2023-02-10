/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { Text, useColorScheme } from 'react-native';
import { AppColors } from '../../app.styles';
import { CommonService } from '../../services/common.service';

const AppSubtext = (props: any) => {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <Text
      style={{
        fontSize: 14,
        color: isDarkMode ? AppColors.dark.text : AppColors.light.text,
        opacity: 0.66,
        ...props?.style,
      }}>
      {props.children}
    </Text>
  );
};

export default AppSubtext;
