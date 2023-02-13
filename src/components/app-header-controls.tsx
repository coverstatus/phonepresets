/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { Image } from 'react-native';
import { ScrollView, StatusBar, StyleSheet, Text, useColorScheme, View } from 'react-native';
import { AppColors } from '../app.styles';
import { CommonService } from '../services/common.service';
import AppIconButton from './buttons/app-icon-button';
import AppSubtext from './labels/app-subtext';
import AppText from './labels/app-text';
import Slider from '@react-native-community/slider';
import AppButton from './buttons/app-button';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const AppHeaderControls = ({
  brightness,
  onBrightnessChange,
  onBrightnessChangeComplete,
  volume,
  onVolumeChange,
  onVolumeChangeComplete,
  silent,
  style,
  onSave,
}: any) => {
  // const isDarkMode = useColorScheme() === 'dark';
  const isDarkMode = true;

  return (
    <View
      style={{
        flexDirection: 'column',
        padding: 8,
        backgroundColor: AppColors.primary,
        margin: 16,
        borderRadius: 8,
      }}>
      <View
        style={{
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 8,
        }}>
        <View
          style={{
            flexGrow: 1,
            paddingHorizontal: 8,
            paddingVertical: 2,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: AppColors.primaryLight,
            borderTopLeftRadius: 8,
            borderTopRightRadius: 8,
            marginBottom: 2,
          }}>
          <Image
            source={CommonService.getImage('b' + CommonService.getIconNameSuffix(brightness))}
            style={{ height: 32, width: 32, marginRight: 8, marginLeft: -4 }}
          />
          <AppText style={{ marginRight: 8, color: AppColors.dark.text }}>{brightness}%</AppText>
          <Slider
            style={{ flex: 1 }}
            value={brightness / 100}
            minimumTrackTintColor={AppColors.accent}
            onValueChange={(value: number) => {
              onBrightnessChange(value);
            }}
            onSlidingComplete={(value: number) => {
              onBrightnessChangeComplete(value);
            }}
            step={0.01}
          />
          {/* <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              paddingLeft: 16,
            }}>
            <MaterialCommunityIcons
              name={'brightness-4'}
              color={isDarkMode ? AppColors.dark.text : 'rgba(255,255,255,0.4)'}
              size={24}
            />
          </View> */}
        </View>
        <View
          style={{
            flexGrow: 1,
            paddingHorizontal: 8,
            paddingVertical: 2,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: AppColors.primaryLight,
            borderBottomLeftRadius: 8,
            borderBottomRightRadius: 8,
          }}>
          <Image
            source={CommonService.getImage('v' + CommonService.getIconNameSuffix(volume))}
            style={{ height: 32, width: 32, marginRight: 8, marginLeft: -4 }}
          />
          <AppText style={{ marginRight: 8, color: AppColors.dark.text }}>{volume}%</AppText>
          <Slider
            style={{ flex: 1 }}
            value={volume / 100}
            minimumTrackTintColor={AppColors.accent}
            onValueChange={(value: number) => {
              onVolumeChange(value);
            }}
            onSlidingComplete={(value: number) => {
              onVolumeChangeComplete(value);
            }}
            step={0.01}
          />
          {/* <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              paddingLeft: 16,
            }}>
            <MaterialCommunityIcons
              name={silent ? 'bell-off' : 'bell-ring'}
              color={silent ? '#e74242' : 'rgba(255,255,255,0.4)'}
              size={24}
            />
          </View> */}
        </View>
        <View
          style={{
            marginTop: 8,
            flexDirection: 'row',
            alignItems: 'center',
            flexGrow: 1,
            justifyContent: 'space-between',
          }}>
          <View style={{ flexGrow: 1 }}>
            <AppButton
              icon="plus-circle"
              mode="contained"
              text="Save as preset"
              style={{ paddingVertical: 2 }}
              isHighlighted={false}
              onPress={() => {
                onSave();
              }}></AppButton>
          </View>
        </View>
      </View>
    </View>
  );
};

export default AppHeaderControls;
