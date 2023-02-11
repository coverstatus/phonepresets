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

const AppHeaderControls = ({ brightness, onBrightnessChange, volume, onVolumeChange, silent, style }: any) => {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <View style={{ flexDirection: 'column', padding: 16, backgroundColor: AppColors.primary }}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        {/* <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 8,
            marginRight: 8,
            height: 42,
            width: 42,
            padding: 4,
          }}>
          <Image source={CommonService.getImage(silent ? 's' : 'r')} style={{ height: 28, width: 28 }} />
        </View> */}
        <View
          style={{
            flex: 1,
            flexGrow: 1,
            paddingHorizontal: 16,
            paddingVertical: 8,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#2a203b',
            borderRadius: 8,
            marginLeft: 8,
            marginRight: 4,
          }}>
          <Image
            source={CommonService.getImage('b' + CommonService.getIconNameSuffix(brightness))}
            style={{ height: 32, width: 32, marginRight: 8 }}
          />
          <AppText>{brightness}%</AppText>
        </View>
        <View
          style={{
            flex: 1,
            flexGrow: 1,
            paddingHorizontal: 16,
            paddingVertical: 8,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#2a203b',
            borderRadius: 8,
            marginLeft: 4,
            marginRight: 8,
          }}>
          <Image
            source={CommonService.getImage('v' + CommonService.getIconNameSuffix(volume))}
            style={{ height: 32, width: 32, marginRight: 8 }}
          />
          <AppText>{volume}%</AppText>
        </View>
        {/* <AppIconButton
          icon="cog"
          iconStyle={{ color: AppColors.dark.text }}
          isDarkMode={true}
          style={{
            flexDirection: 'row',
            marginLeft: 8,
          }}
          onPress={() => {}}
        /> */}
      </View>
      <View style={{ flexDirection: 'row' }}>
        <Slider
          style={{ flex: 1 }}
          value={brightness / 100}
          onValueChange={(value: number) => {
            onBrightnessChange(value);
          }}
        />
        <Slider
          style={{ flex: 1 }}
          value={volume / 100}
          onValueChange={(value: number) => {
            onVolumeChange(value);
          }}
        />
      </View>
    </View>
  );
};

export default AppHeaderControls;
