/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { useColorScheme, View } from 'react-native';
import { Surface, TouchableRipple } from 'react-native-paper';
import { AppColors } from '../../app.styles';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AppSubtext from '../labels/app-subtext';
import { AppConstants } from '../../app.constants';
import { Image } from 'react-native';

const AppButton = ({
  icon,
  text,
  style,
  disabled,
  onPress,
  mode,
  iconOnRight,
  iconSize = 22,
  isHighlighted = false,
  iconColor,
  imageComponent,
  buttonBackgroundColor,
}: any) => {
  const isDarkMode = useColorScheme() === 'dark';

  const getBackgroundColor = () => {
    switch (mode) {
      case 'contained':
        return disabled ? (isDarkMode ? AppColors.dark.divider : AppColors.light.divider) : AppColors.accent;
      case 'outlined':
        return 'transparent';
      default:
        return 'transparent';
    }
  };

  const getRippleColor = () => {
    switch (mode) {
      case 'contained':
        return isDarkMode ? AppColors.dark.ripple : AppColors.light.ripple;
      case 'outlined':
        return isDarkMode ? AppColors.dark.ripple : AppColors.light.ripple;
      default:
        return isDarkMode ? AppColors.dark.ripple : AppColors.light.ripple;
    }
  };

  const getTextColor = () => {
    if (isHighlighted) {
      return AppColors.accent;
    }
    if (disabled) {
      return isDarkMode ? AppColors.dark.text : AppColors.light.text;
    }
    switch (mode) {
      case 'contained':
        return AppColors.dark.text;
      case 'outlined':
        return isDarkMode ? AppColors.dark.text : AppColors.light.text;
      default:
        return isDarkMode ? AppColors.dark.text : AppColors.light.text;
    }
  };

  return (
    <Surface
      style={{
        backgroundColor: buttonBackgroundColor ? buttonBackgroundColor : getBackgroundColor(),
        borderRadius: AppConstants.BORDER_RADIUS,
      }}
      elevation={mode === 'contained' && !disabled ? 1 : 0}>
      <TouchableRipple
        onPress={onPress}
        disabled={disabled}
        borderless={true}
        rippleColor={getRippleColor()}
        style={{
          flexDirection: 'row',
          borderRadius: AppConstants.BORDER_RADIUS,
          borderWidth: 1,
          borderColor: mode === 'outlined' || isHighlighted ? getTextColor() : 'transparent',
          opacity: disabled ? 0.4 : 1,
          alignItems: 'center',
          justifyContent: 'center',
          ...style,
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            paddingHorizontal: 12,
            paddingTop: 4,
            paddingBottom: 6,
          }}>
          {imageComponent}
          {iconOnRight ? (
            <>
              <AppSubtext
                style={{
                  color: getTextColor(),
                  textTransform: 'uppercase',
                  opacity: 1,
                  fontWeight: '500',
                  paddingLeft: 4,
                  marginTop: 2,
                }}>
                {text}
              </AppSubtext>
              {icon && (
                <MaterialCommunityIcons
                  name={icon}
                  color={iconColor ? iconColor : getTextColor()}
                  size={iconSize}
                  style={{ marginLeft: 8, marginRight: -4, marginTop: 1 }}
                />
              )}
            </>
          ) : (
            <>
              {icon && (
                <MaterialCommunityIcons
                  name={icon}
                  color={iconColor ? iconColor : getTextColor()}
                  size={iconSize}
                  style={{ marginRight: 8, marginTop: 1 }}
                />
              )}
              <AppSubtext
                style={{
                  color: getTextColor(),
                  textTransform: 'uppercase',
                  opacity: 1,
                  fontWeight: '500',
                  marginTop: 2,
                  // marginRight: 24,
                }}>
                {text}
              </AppSubtext>
            </>
          )}
        </View>
      </TouchableRipple>
    </Surface>
  );
};

export default AppButton;
