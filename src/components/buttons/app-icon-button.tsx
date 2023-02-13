/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { useColorScheme, View } from 'react-native';
import { TouchableRipple } from 'react-native-paper';
import { AppColors } from '../../app.styles';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { CommonService } from '../../services/common.service';

const AppIconButton = ({ icon, style, disabled, backgroundColor, onPress, iconSize = 24, iconStyle }: any) => {
  // const isDarkMode = useColorScheme() === 'dark';
  const isDarkMode = true;

  return (
    <TouchableRipple
      onPress={onPress}
      disabled={disabled}
      borderless={true}
      rippleColor={isDarkMode ? AppColors.dark.ripple : AppColors.light.ripple}
      style={{
        borderRadius: 256,
        ...style,
      }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          height: 42,
          width: 42,
        }}>
        <MaterialCommunityIcons
          name={icon}
          color={isDarkMode ? AppColors.dark.text : AppColors.light.text}
          size={iconSize}
          style={iconStyle}
        />
      </View>
    </TouchableRipple>
  );
};

export default AppIconButton;
