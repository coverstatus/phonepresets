/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { AppState, Image, NativeModules, ScrollView, TextInput, useColorScheme, View } from 'react-native';
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
import { changeIcon, getIcon } from 'react-native-change-icon';

import SharedGroupPreferences from 'react-native-shared-group-preferences';
import { useSilentSwitch, VolumeManager } from 'react-native-volume-manager';
import DeviceBrightness from '@adrianso/react-native-device-brightness';

import AppText from '../components/labels/app-text';
import AppHeaderControls from '../components/app-header-controls';
import AppPresetListItem from '../components/app-preset-list-item';
import AppSubtext from '../components/labels/app-subtext';
import AppDivider from '../components/others/app-divider';
import AppHint from '../components/labels/app-hint';
const SharedStorage = NativeModules.SharedStorage;
const group = 'group.phonepresets';

VolumeManager.showNativeVolumeUI({ enabled: false });
VolumeManager.setNativeSilenceCheckInterval(2);

const HomeScreen = ({ navigation }: any) => {
  const isDarkMode = useColorScheme() === 'dark';
  const [state, setState]: any = useContext(AppContext);
  const appState = useRef(AppState.currentState);
  const [appStateVisible, setAppStateVisible] = useState(appState.current);

  const [deviceBrightness, setDeviceBrightness] = useState(0);
  const [deviceVolume, setDeviceVolume] = useState(0);
  const [deviceSilent, setDeviceSilent] = useState<boolean>(false);
  const [autochangeIcon, setAutochangeIcon] = useState(false);
  const [silentIconApplied, setSilentIconApplied] = useState(false);
  const [savedPresets, setSavedPresets] = useState([]);
  const [widgetData, setWidgetData] = useState({
    brightnessIcon: 'b-76-100',
    brightnessValue: '100%',
    volumeIcon: 'v-76-100',
    volumeValue: '100%',
    silentIcon: 'r',
    silentValue: 'Ringer',
  });

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

    const volumeListener = VolumeManager.addVolumeListener(result => {
      loadCurrentSettings(AppConstants.TYPE_VOLUME, result.volume);
    });

    const silentListener = VolumeManager.addSilentListener(async status => {
      loadCurrentSettings(AppConstants.TYPE_SILENT, status.isMuted ? 1 : 0);
      const isAutochangeIconEnabled = (await StorageService.getData(AppConstants.STORAGE_KEY_AUTOCHANGE_ICON)) || false;
      setAutochangeIcon(isAutochangeIconEnabled);
      if (isAutochangeIconEnabled) {
        if (status.isMuted) {
          getIcon().then((response: any) => {
            if (response !== 'silent') {
              changeIcon('silent');
              setSilentIconApplied(true);
            }
          });
        } else {
          getIcon().then((response: any) => {
            if (response !== 'default') {
              changeIcon('default');
              setSilentIconApplied(false);
            }
          });
        }
      }
    });

    return () => {
      volumeListener.remove();
      silentListener.remove();
      subscription.remove();
    };
  }, []);

  const onFocus = async () => {
    const brightness = await DeviceBrightness.getBrightnessLevel();
    loadCurrentSettings(AppConstants.TYPE_BRIGHTNESS, brightness);
    const volume = (await VolumeManager.getVolume('music')) as number;
    loadCurrentSettings(AppConstants.TYPE_VOLUME, volume);
    const saved = await CommonService.getPresets();
    setSavedPresets(saved);
    const isAutochangeIconEnabled = (await StorageService.getData(AppConstants.STORAGE_KEY_AUTOCHANGE_ICON)) || false;
    setAutochangeIcon(isAutochangeIconEnabled);

    getIcon().then((response: any) => {
      if (response === 'silent') {
        setSilentIconApplied(true);
      } else {
        setSilentIconApplied(false);
      }
    });
  };

  const loadCurrentSettings = (type: string, value: number) => {
    if (type === AppConstants.TYPE_BRIGHTNESS) {
      setDeviceBrightness(Number(value.toFixed(2)));
      setWidgetData((currentState: any) => {
        const dataForWidget = {
          ...currentState,
          brightnessIcon: 'b' + CommonService.getIconNameSuffix(Number((value * 100).toFixed(0))),
          brightnessValue: (value * 100).toFixed(0) + '%',
        };
        sendDataToWidget(dataForWidget);
        return dataForWidget;
      });
    } else if (type === AppConstants.TYPE_VOLUME) {
      setDeviceVolume(Number(value.toFixed(2)));
      setWidgetData((currentState: any) => {
        const dataForWidget = {
          ...currentState,
          volumeIcon: 'v' + CommonService.getIconNameSuffix(Number((value * 100).toFixed(0))),
          volumeValue: (value * 100).toFixed(0) + '%',
        };
        sendDataToWidget(dataForWidget);
        return dataForWidget;
      });
    } else if (type === AppConstants.TYPE_SILENT) {
      setDeviceSilent(value ? true : false);
      setWidgetData((currentState: any) => {
        const dataForWidget = {
          ...currentState,
          silentIcon: value ? 's' : 'r',
          silentValue: value ? 'Silent' : 'Ringer',
        };
        sendDataToWidget(dataForWidget);
        return dataForWidget;
      });
    }
  };

  const sendDataToWidget = async (data: any) => {
    try {
      if (CommonService.isIos()) {
        await SharedGroupPreferences.setItem('widgetKey', data, group);
      } else {
        SharedStorage.set(JSON.stringify(data));
      }
    } catch (error) {
      console.log(JSON.stringify(error));
    }
  };

  return (
    <AppScreenContainer>
      <ScreenHeader navigation={navigation} />
      <View style={{ flex: 1, flexGrow: 1 }}>
        {deviceSilent && (
          <View
            style={{
              flexDirection: 'row',
              paddingHorizontal: 16,
              paddingVertical: 8,
              backgroundColor: '#e74242',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <MaterialCommunityIcons color={AppColors.dark.text} name={'bell-off'} size={22} />
              <AppText style={{ fontWeight: '600', marginLeft: 8 }}>SILENT MODE</AppText>
            </View>
            {!autochangeIcon && !silentIconApplied && (
              <AppButton
                icon="chevron-right-circle"
                mode="outlined"
                text="Show on App Icon"
                iconOnRight={true}
                style={{ marginBottom: 2 }}
                isHighlighted={false}
                onPress={() => {
                  getIcon().then((response: any) => {
                    if (response !== 'silent') {
                      changeIcon('silent');
                      setSilentIconApplied(true);
                    }
                  });
                }}></AppButton>
            )}
          </View>
        )}
        <AppHint style={{ paddingHorizontal: 16, marginTop: 24, marginBottom: -4, marginLeft: 2 }}>
          CURRENT SETTINGS
        </AppHint>
        <AppHeaderControls
          brightness={Number((deviceBrightness * 100).toFixed(0))}
          volume={Number((deviceVolume * 100).toFixed(0))}
          silent={deviceSilent ? true : false}
          onBrightnessChange={(value: number) => {
            DeviceBrightness.setBrightnessLevel(value);
            setDeviceBrightness(Number(value.toFixed(2)));
            setWidgetData((currentState: any) => {
              const dataForWidget = {
                ...currentState,
                brightnessIcon: 'b' + CommonService.getIconNameSuffix(Number((value * 100).toFixed(0))),
                brightnessValue: (value * 100).toFixed(0) + '%',
              };
              sendDataToWidget(dataForWidget);
              return dataForWidget;
            });
          }}
          onVolumeChange={async (value: number) => {
            await VolumeManager.setVolume(value);
            setDeviceVolume(Number(value.toFixed(2)));
            setWidgetData((currentState: any) => {
              const dataForWidget = {
                ...currentState,
                volumeIcon: 'v' + CommonService.getIconNameSuffix(Number((value * 100).toFixed(0))),
                volumeValue: (value * 100).toFixed(0) + '%',
              };
              sendDataToWidget(dataForWidget);
              return dataForWidget;
            });
          }}
          onSave={async () => {
            await CommonService.addPreset(
              widgetData.brightnessIcon,
              widgetData.brightnessValue,
              widgetData.volumeIcon,
              widgetData.volumeValue,
              widgetData.silentIcon,
              widgetData.silentValue,
            );
            console.log(widgetData);
            const saved = await CommonService.getPresets();
            setSavedPresets(saved);
          }}
        />
        <AppHint style={{ paddingHorizontal: 16, marginTop: 16, marginBottom: 12, marginLeft: 2 }}>
          SAVED PRESETS ({savedPresets?.length || 0})
        </AppHint>
        {savedPresets?.length ? (
          <ScrollView style={{ flex: 1, flexGrow: 1 }}>
            <View style={{ paddingHorizontal: 16, paddingBottom: 16 }}>
              <View style={{ flexDirection: 'column' }}>
                {savedPresets.map((item: any, index: number) => (
                  <View key={item.id}>
                    <AppPresetListItem
                      presetItem={item}
                      onPress={async () => {
                        const brightness = Number(item.brightnessValue.replace('%', '')) / 100;
                        const volume = Number(item.volumeValue.replace('%', '')) / 100;

                        DeviceBrightness.setBrightnessLevel(brightness);
                        setDeviceBrightness(Number(brightness.toFixed(2)));

                        await VolumeManager.setVolume(volume);
                        setDeviceVolume(Number(volume.toFixed(2)));

                        setWidgetData((currentState: any) => {
                          const dataForWidget = {
                            ...currentState,
                            brightnessIcon:
                              'b' + CommonService.getIconNameSuffix(Number((brightness * 100).toFixed(0))),
                            brightnessValue: item.brightnessValue,
                            volumeIcon: 'v' + CommonService.getIconNameSuffix(Number((volume * 100).toFixed(0))),
                            volumeValue: item.volumeValue,
                          };
                          sendDataToWidget(dataForWidget);
                          return dataForWidget;
                        });
                      }}
                      active={
                        deviceBrightness === Number(Number(item.brightnessValue.replace('%', '')).toFixed(0)) / 100 &&
                        deviceVolume === Number(Number(item.volumeValue.replace('%', '')).toFixed(0)) / 100
                      }
                    />
                  </View>
                ))}
              </View>
            </View>
          </ScrollView>
        ) : (
          <View style={{ flex: 1, flexGrow: 1, justifyContent: 'center', alignItems: 'center', opacity: 0.8 }}>
            <AppText>No preset added yet</AppText>
            <AppSubtext style={{ textAlign: 'center', maxWidth: 280, marginTop: 4 }}>
              Tap "Save" to add current settings as a preset.
            </AppSubtext>
          </View>
        )}
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
        paddingHorizontal: 16,
        paddingTop: 8,
        paddingBottom: 8,
        backgroundColor: AppColors.primary,
      }}>
      {/* <Image source={require('../assets/images/logo.png')} style={{ height: 42, width: 42, marginRight: 8 }} /> */}
      <AppHeading style={{ color: AppColors.dark.text, marginLeft: 2 }}>Phone Presets</AppHeading>
      <View style={{ flexGrow: 1 }} />
      <AppIconButton
        icon="cog"
        iconStyle={{ color: AppColors.dark.text }}
        isDarkMode={true}
        style={{
          flexDirection: 'row',
        }}
        onPress={() => {
          navigation.navigate('Settings');
        }}
      />
    </View>
  );
};

export default HomeScreen;
