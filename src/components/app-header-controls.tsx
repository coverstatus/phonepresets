/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react';
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
  initialBrightness,
  onBrightnessChange,
  onBrightnessChangeComplete,
  initialVolume,
  onVolumeChange,
  onVolumeChangeComplete,
  onVolumeChangeStart,
  style,
  onSave,
}: any) => {
  // const isDarkMode = useColorScheme() === 'dark';
  const isDarkMode = true;

  const [currentBrightness, setCurrentBrightness] = useState(0);
  const [currentVolume, setCurrentVolume] = useState(0);

  useEffect(() => {
    setCurrentBrightness(initialBrightness);
  }, [initialBrightness]);

  useEffect(() => {
    setCurrentVolume(initialVolume);
  }, [initialVolume]);

  return (
    <View
      style={{
        flexDirection: 'column',
        padding: 8,
        backgroundColor: AppColors.primary,
        margin: 16,
        borderRadius: 8,
        ...style,
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
            source={CommonService.getImage('b' + CommonService.getIconNameSuffix(currentBrightness * 100))}
            style={{ height: 32, width: 32, marginRight: 8, marginLeft: -4 }}
          />
          <AppText style={{ marginRight: 8, color: AppColors.dark.text }}>
            {(currentBrightness * 100).toFixed(0)}%
          </AppText>
          <Slider
            style={{ flex: 1 }}
            value={currentBrightness}
            minimumTrackTintColor={AppColors.accent}
            onValueChange={(value: number) => {
              value = Number(value.toFixed(2));
              setCurrentBrightness(value);
              onBrightnessChange(value);
            }}
            onSlidingComplete={(value: number) => {
              value = Number(value.toFixed(2));
              onBrightnessChangeComplete(value);
            }}
            step={0.05}
          />
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
            source={CommonService.getImage('v' + CommonService.getIconNameSuffix(currentVolume * 100))}
            style={{ height: 32, width: 32, marginRight: 8, marginLeft: -4 }}
          />
          <AppText style={{ marginRight: 8, color: AppColors.dark.text }}>{(currentVolume * 100).toFixed(0)}%</AppText>
          <Slider
            style={{ flex: 1 }}
            value={currentVolume}
            minimumTrackTintColor={AppColors.accent}
            onValueChange={(value: number) => {
              value = Number(value.toFixed(2));
              setCurrentVolume(value);
              onVolumeChange(value);
            }}
            onSlidingStart={() => {
              onVolumeChangeStart();
            }}
            onSlidingComplete={(value: number) => {
              value = Number(value.toFixed(2));
              onVolumeChangeComplete(value);
            }}
            step={0.05}
          />
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
