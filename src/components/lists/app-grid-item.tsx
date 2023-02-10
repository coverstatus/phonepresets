/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { useColorScheme, View } from 'react-native';
import { Surface, TouchableRipple } from 'react-native-paper';
import { AppColors } from '../../app.styles';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AppSubtext from '../labels/app-subtext';
import { AppConstants } from '../../app.constants';
import AppText from '../labels/app-text';

const AppGridItem = ({ icon, text, style, onPress }: any) => {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <Surface
      style={{
        backgroundColor: isDarkMode ? AppColors.dark.card : AppColors.light.card,
        borderRadius: AppConstants.BORDER_RADIUS,
      }}
      elevation={0}>
      <TouchableRipple
        onPress={onPress}
        borderless={true}
        rippleColor={isDarkMode ? AppColors.dark.ripple : AppColors.light.ripple}
        style={{
          borderRadius: AppConstants.BORDER_RADIUS,
          elevation: 0,
          height: 104,
          ...style,
        }}>
        <View
          style={{
            flex: 1,
            flexGrow: 1,
            flexDirection: 'column',
            alignItems: 'flex-start',
            justifyContent: 'flex-start',
            paddingTop: 12,
            paddingBottom: 12,
            paddingLeft: 12,
            paddingRight: 8,
          }}>
          <>
            {icon && (
              <MaterialCommunityIcons
                name={icon}
                color={isDarkMode ? AppColors.dark.hint : AppColors.light.hint}
                size={24}
                style={{ marginBottom: 8 }}
              />
            )}
            <AppText
              style={{
                color: isDarkMode ? AppColors.dark.text : AppColors.light.text,
                marginTop: 2,
              }}>
              {text}
            </AppText>
          </>
        </View>
      </TouchableRipple>
    </Surface>
  );
};

export default AppGridItem;
