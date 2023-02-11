/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { Image } from 'react-native';
import { ScrollView, StatusBar, StyleSheet, Text, useColorScheme, View } from 'react-native';
import { Surface, TouchableRipple } from 'react-native-paper';
import { AppColors } from '../app.styles';
import { CommonService } from '../services/common.service';
import AppSubtext from './labels/app-subtext';
import AppText from './labels/app-text';
import { ProgressBar } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const AppPresetListItem = ({
  active = false,
  presetItem,
  style,
  onPress,
  isDarkMode = useColorScheme() === 'dark',
}: any) => {
  return (
    <Surface
      style={{
        backgroundColor: active
          ? AppColors.primary
          : isDarkMode
          ? AppColors.dark.background
          : AppColors.light.background,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: AppColors.primary,
        marginBottom: 16,
        ...style,
      }}>
      <TouchableRipple
        onPress={onPress}
        borderless={true}
        rippleColor={isDarkMode ? AppColors.dark.ripple : AppColors.light.ripple}
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          paddingVertical: 8,
          paddingHorizontal: 8,
          borderRadius: 8,
        }}>
        <View style={{ flexDirection: 'column', flex: 1, flexGrow: 1 }}>
          <View
            style={{
              flex: 1,
              flexGrow: 1,
              paddingHorizontal: 0,
              flexDirection: 'row',
              alignItems: 'flex-start',
              justifyContent: 'flex-start',
            }}>
            <View
              style={{
                flex: 1,
                flexGrow: 1,
                flexDirection: 'row',
                alignItems: 'stretch',
                justifyContent: 'flex-start',
              }}>
              <View
                style={{
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  justifyContent: 'center',
                  borderTopLeftRadius: 8,
                  borderBottomLeftRadius: 8,
                  backgroundColor: AppColors.primaryLight,
                  padding: 8,
                }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Image source={CommonService.getImage(presetItem.brightnessIcon)} style={{ height: 28, width: 28 }} />
                  <AppSubtext style={{ opacity: 1, marginLeft: 8 }}>{presetItem.brightnessValue}</AppSubtext>
                </View>
                <ProgressBar
                  progress={Number(presetItem.brightnessValue.replace('%', '')) / 100}
                  color={AppColors.accent}
                  style={{
                    backgroundColor: 'rgba(255,255,255,0.5)',
                    width: 100,
                    alignSelf: 'flex-end',
                    height: 8,
                    borderRadius: 8,
                    marginTop: 4,
                  }}
                />
              </View>
              <View
                style={{
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  justifyContent: 'center',
                  borderTopRightRadius: 8,
                  borderBottomRightRadius: 8,
                  backgroundColor: AppColors.primaryLight,
                  padding: 8,
                  marginLeft: 2,
                }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Image source={CommonService.getImage(presetItem.volumeIcon)} style={{ height: 28, width: 28 }} />
                  <AppSubtext style={{ opacity: 1, marginLeft: 8 }}>{presetItem.volumeValue}</AppSubtext>
                </View>
                <ProgressBar
                  progress={Number(presetItem.volumeValue.replace('%', '')) / 100}
                  color={AppColors.accent}
                  style={{
                    backgroundColor: 'rgba(255,255,255,0.5)',
                    width: 100,
                    alignSelf: 'flex-end',
                    height: 8,
                    borderRadius: 8,
                    marginTop: 4,
                  }}
                />
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'flex-end',
                  paddingLeft: 16,
                  flex: 1,
                }}>
                <MaterialCommunityIcons name={'chevron-right'} color={AppColors.dark.hint} size={24} />
              </View>
            </View>
          </View>
        </View>
      </TouchableRipple>
    </Surface>
  );
};

export default AppPresetListItem;
