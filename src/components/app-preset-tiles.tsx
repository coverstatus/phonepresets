/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { Image } from 'react-native';
import { ScrollView, StatusBar, StyleSheet, Text, useColorScheme, View } from 'react-native';
import { AppColors } from '../app.styles';
import { CommonService } from '../services/common.service';
import AppSubtext from './labels/app-subtext';
import AppText from './labels/app-text';

const AppPresetTile = ({ active = false, label, brightness, volume, style }: any) => {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <View style={{ flexDirection: 'column', flex: 1, flexGrow: 1, marginBottom: 16 }}>
      <View
        style={{
          flex: 1,
          flexGrow: 1,
          paddingHorizontal: 16,
          paddingVertical: 24,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#2a203b',
          borderWidth: 2,
          borderColor: active ? AppColors.accent : null,
          borderRadius: 8,
          ...style,
        }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View
            style={{
              flex: 1,
              flexGrow: 1,
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#2a203b',
              borderRadius: 8,
              marginRight: 8,
            }}>
            <Image
              source={CommonService.getImage('b' + CommonService.getIconNameSuffix(brightness))}
              style={{ height: 42, width: 42 }}
            />
            <AppSubtext style={{ opacity: 1, marginTop: 8 }}>{brightness}%</AppSubtext>
          </View>
          <View
            style={{
              flex: 1,
              flexGrow: 1,
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#2a203b',
              borderRadius: 8,
              marginLeft: 8,
            }}>
            <Image
              source={CommonService.getImage('v' + CommonService.getIconNameSuffix(volume))}
              style={{ height: 42, width: 42 }}
            />
            <AppSubtext style={{ opacity: 1, marginTop: 8 }}>{volume}%</AppSubtext>
          </View>
        </View>
      </View>
      <AppSubtext style={{ alignSelf: 'center', marginTop: 8, opacity: 1, fontSize: 12 }}>{label}</AppSubtext>
    </View>
  );
};

export default AppPresetTile;
