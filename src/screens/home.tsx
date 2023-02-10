/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { AppState, Image, NativeModules, TextInput, useColorScheme, View } from 'react-native';
import { AppContext } from '../app.context';
import { AppColors } from '../app.styles';
import { useFocusEffect } from '@react-navigation/native';
import { CommonService } from '../services/common.service';
import AppScreenContainer from '../components/containers/app-screen-container';
import AppHeading from '../components/labels/app-heading';
import { AppConstants } from '../app.constants';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AppButton from '../components/buttons/app-button';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import CreateScreen from './create';
import ReplyScreen from './reply';
import { StorageService } from '../services/storage.service';
import AppIconButton from '../components/buttons/app-icon-button';

import SharedGroupPreferences from 'react-native-shared-group-preferences';
const SharedStorage = NativeModules.SharedStorage;
const group = 'group.phonepresets';

const HomeScreen = ({ navigation }: any) => {
  const isDarkMode = useColorScheme() === 'dark';
  const [state, setState]: any = useContext(AppContext);
  const appState = useRef(AppState.currentState);
  const [appStateVisible, setAppStateVisible] = useState(appState.current);

  const Tab = createMaterialTopTabNavigator();

  useFocusEffect(
    useCallback(() => {
      onFocus();
    }, []),
  );

  useEffect(() => {
    const subscription = AppState.addEventListener('change', nextAppState => {
      if (appState.current.match(/inactive|background/) && nextAppState === 'active') {
        onFocus();
      }
      appState.current = nextAppState;
      setAppStateVisible(appState.current);
    });

    return () => {
      subscription.remove();
    };
  }, []);

  const onFocus = async () => {};

  const [widgetData, setWidgetData] = useState({
    brightnessIcon: 'b-80-100',
    brightnessValue: '100%',
    volumeIcon: 'v-80-100',
    volumeValue: '100%',
    silentIcon: 'r',
    silentValue: 'Ringer',
  });

  const handleSubmit = async (data: any) => {
    try {
      if (CommonService.isIos()) {
        await SharedGroupPreferences.setItem('widgetKey', data, group);
      } else {
        SharedStorage.set(JSON.stringify(data));
      }
    } catch (error) {
      console.log({ error });
    }
  };

  return (
    <AppScreenContainer>
      <ScreenHeader navigation={navigation} />
      <View style={{ flex: 1, flexGrow: 1, padding: 16 }}>
        <AppIconButton
          icon="cog"
          iconColor={AppColors.success}
          style={{
            height: 36,
          }}
          isHighlighted={true}
          onPress={() => {
            const data = {
              brightnessIcon: 'b-51-75',
              brightnessValue: '75%',
              volumeIcon: 'v-51-75',
              volumeValue: '75%',
              silentIcon: 's',
              silentValue: 'Silent',
            };
            setWidgetData(data);
            handleSubmit(data);
          }}
        />
      </View>
    </AppScreenContainer>
  );
};

const ScreenHeader = ({ navigation }: any) => {
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
      }}>
      <Image source={require('../assets/images/logo.png')} style={{ height: 56, width: 56, marginBottom: 0 }} />
      <AppHeading style={{}}>Phone Presets</AppHeading>
      <View style={{ flexGrow: 1 }} />
      <AppIconButton
        icon="cog"
        iconColor={AppColors.success}
        style={{
          flexDirection: 'row',
          height: 36,
          marginLeft: 8,
        }}
        isHighlighted={true}
        onPress={() => {}}
      />
    </View>
  );
};

export default HomeScreen;
