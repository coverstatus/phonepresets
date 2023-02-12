/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { AppState, Image, ScrollView, useColorScheme, View } from 'react-native';
import { AppContext } from '../app.context';
import { AppColors } from '../app.styles';
import { useFocusEffect } from '@react-navigation/native';
import { CommonService } from '../services/common.service';
import AppScreenContainer from '../components/containers/app-screen-container';
import AppHeading from '../components/labels/app-heading';
import { AppConstants } from '../app.constants';
import AppIconButton from '../components/buttons/app-icon-button';
import AppText from '../components/labels/app-text';
import AppSubtext from '../components/labels/app-subtext';
import AppButton from '../components/buttons/app-button';
import { Divider } from 'react-native-paper';
import AppDivider from '../components/others/app-divider';
import VersionInfo from 'react-native-version-info';
import AppHint from '../components/labels/app-hint';
import SystemNavigationBar from 'react-native-system-navigation-bar';
import AppSubheading from '../components/labels/app-subheading';
import { changeIcon, getIcon } from 'react-native-change-icon';
import { Switch } from 'react-native-paper';
import { StorageService } from '../services/storage.service';

const SettingsScreen = ({ navigation }: any) => {
  const isDarkMode = useColorScheme() === 'dark';
  const [state, setState]: any = useContext(AppContext);
  const scrollRef = useRef<any>();

  const [autochangeIcon, setAutochangeIcon] = useState(false);
  const onToggleSwitch = async (value: any) => {
    await StorageService.setData(AppConstants.STORAGE_KEY_AUTOCHANGE_ICON, value);
    setAutochangeIcon(value);
  };

  useFocusEffect(
    useCallback(() => {
      onFocus();
    }, []),
  );

  const onFocus = async () => {
    setAutochangeIcon((await StorageService.getData(AppConstants.STORAGE_KEY_AUTOCHANGE_ICON)) || false);
    scrollRef.current?.scrollTo({ y: 0, animated: false });
  };

  return (
    <AppScreenContainer>
      <ScreenHeader navigation={navigation} />
      <ScrollView style={{ flex: 1 }} ref={scrollRef}>
        <View
          style={{
            flex: 1,
            flexGrow: 1,
            padding: 16,
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
            alignContent: 'stretch',
          }}>
          <View
            style={{
              flex: 1,
              flexGrow: 1,
              flexDirection: 'row',
              alignItems: 'flex-start',
              justifyContent: 'space-between',
            }}>
            <View style={{ flex: 1, flexGrow: 1, flexDirection: 'column', alignItems: 'flex-start', paddingRight: 16 }}>
              <AppText style={{ flex: 1, flexGrow: 1 }}>Automatically change icon when silent</AppText>
              <AppHint style={{ flex: 1, flexGrow: 1, marginTop: 4 }}>
                App needs to be in foreground so that silent mode changes can be detected
              </AppHint>
            </View>
            <Switch
              value={autochangeIcon}
              onValueChange={value => {
                onToggleSwitch(value);
              }}
              color={AppColors.accent}
            />
          </View>
          <AppDivider marginVertical={16}></AppDivider>
          <AppButton
            mode="outlined"
            icon="undo"
            text="Revert to original icon"
            onPress={() => {
              getIcon().then((response: any) => {
                if (response !== 'default') {
                  changeIcon('default');
                }
              });
            }}
          />
        </View>
      </ScrollView>
    </AppScreenContainer>
  );
};

const ScreenHeader = ({ navigation, count }: any) => {
  const isDarkMode = useColorScheme() === 'dark';
  const [state, setState]: any = useContext(AppContext);

  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 64,
        paddingHorizontal: 16,
        backgroundColor: AppColors.primary,
      }}>
      <AppIconButton
        icon="arrow-left"
        iconStyle={{ color: '#FFFFFF' }}
        onPress={() => {
          if (navigation?.goBack) {
            navigation.goBack();
          }
        }}
      />
      <AppHeading style={{ marginLeft: 4, color: '#FFFFFF' }}>Settings (v{VersionInfo.appVersion})</AppHeading>
      <View style={{ flexGrow: 1 }} />
    </View>
  );
};

export default SettingsScreen;
