/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { AppState, Image, NativeModules, ScrollView, TextInput, useColorScheme, Vibration, View } from 'react-native';
import { AppContext } from '../app.context';
import { AppColors } from '../app.styles';
import { useFocusEffect } from '@react-navigation/native';
import { CommonService } from '../services/common.service';
import AppScreenContainer from '../components/containers/app-screen-container';
import AppHeading from '../components/labels/app-heading';
import { AppConstants } from '../app.constants';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AppButton from '../components/buttons/app-button';
import { StorageService } from '../services/storage.service';
import AppIconButton from '../components/buttons/app-icon-button';
import { changeIcon, getIcon } from 'react-native-change-icon';

import SharedGroupPreferences from 'react-native-shared-group-preferences';
import { VolumeManager } from 'react-native-volume-manager';
import DeviceBrightness from '@adrianso/react-native-device-brightness';

import AppText from '../components/labels/app-text';
import AppHeaderControls from '../components/app-header-controls';
import AppPresetListItem from '../components/app-preset-list-item';
import AppSubtext from '../components/labels/app-subtext';
import AppDivider from '../components/others/app-divider';
import AppHint from '../components/labels/app-hint';
import ConfirmDialog from '../components/others/confirm-dialog';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';

const SharedStorage = NativeModules.SharedStorage;
const group = 'group.phonepresets';

VolumeManager.showNativeVolumeUI({ enabled: false });
VolumeManager.setNativeSilenceCheckInterval(1);

const options = {
  enableVibrateFallback: true,
  ignoreAndroidSystemSettings: false,
};

const HomeScreen = ({ navigation }: any) => {
  const isDarkMode = useColorScheme() === 'dark';
  const [state, setState]: any = useContext(AppContext);
  const appState = useRef(AppState.currentState);
  const [appStateVisible, setAppStateVisible] = useState(appState.current);

  const [initialBrightness, setInitialBrightness] = useState(0);
  const [currentBrightness, setCurrentBrightness] = useState(0);

  const [initialVolume, setInitialVolume] = useState(0);
  const [currentVolume, setCurrentVolume] = useState(0);

  const [currentSilent, setCurrentSilent] = useState<boolean>(false);
  const [widgetData, setWidgetData] = useState({
    brightnessIcon: 'b-76-100',
    brightnessValue: '100%',
    volumeIcon: 'v-76-100',
    volumeValue: '100%',
    silentIcon: 'r',
    silentValue: 'Ringer',
  });

  const [autochangeIcon, setAutochangeIcon] = useState(false);
  const [silentIconApplied, setSilentIconApplied] = useState(false);
  const [savedPresets, setSavedPresets] = useState([]);
  const [currentPreset, setCurrentPreset] = useState(0);
  const [confirmVisible, setConfirmVisible] = useState(false);

  const isVolumeChangingViaSlider = useRef(false);

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
      onVolumeChange(Number(result.volume.toFixed(2)));
    });

    const silentListener = VolumeManager.addSilentListener(async status => {
      onSilentSwitchChange(status.isMuted);
    });

    return () => {
      volumeListener.remove();
      silentListener.remove();
      subscription.remove();
    };
  }, []);

  const onFocus = async () => {
    const brightness = Number((await DeviceBrightness.getBrightnessLevel()).toFixed(2));
    setInitialBrightness(brightness);
    setCurrentBrightness(brightness);

    const volume = Number(((await VolumeManager.getVolume('music')) as number).toFixed(2));
    setInitialVolume(volume);
    setCurrentVolume(volume);

    setWidgetData((currentState: any) => {
      const dataForWidget = {
        ...currentState,
        brightnessIcon: 'b' + CommonService.getIconNameSuffix(Number((brightness * 100).toFixed(0))),
        brightnessValue: (brightness * 100).toFixed(0) + '%',
        volumeIcon: 'v' + CommonService.getIconNameSuffix(Number((volume * 100).toFixed(0))),
        volumeValue: (volume * 100).toFixed(0) + '%',
      };
      sendDataToWidget(dataForWidget);
      return dataForWidget;
    });

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

  const onVolumeChange = (value: number) => {
    if (isVolumeChangingViaSlider.current === false) {
      setInitialVolume(value);
      setCurrentVolume(value);
    }
    setWidgetData((currentState: any) => {
      const dataForWidget = {
        ...currentState,
        volumeIcon: 'v' + CommonService.getIconNameSuffix(Number((value * 100).toFixed(0))),
        volumeValue: (value * 100).toFixed(0) + '%',
      };
      sendDataToWidget(dataForWidget);
      return dataForWidget;
    });
  };

  const onSilentSwitchChange = async (value: boolean) => {
    setCurrentSilent(value);
    setWidgetData((currentState: any) => {
      const dataForWidget = {
        ...currentState,
        silentIcon: value ? 's' : 'r',
        silentValue: value ? 'Silent' : 'Ringer',
      };
      sendDataToWidget(dataForWidget);
      return dataForWidget;
    });
    const isAutochangeIconEnabled = (await StorageService.getData(AppConstants.STORAGE_KEY_AUTOCHANGE_ICON)) || false;
    setAutochangeIcon(isAutochangeIconEnabled);
    if (isAutochangeIconEnabled) {
      if (value) {
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
        {currentSilent && (
          <View
            style={{
              flexDirection: 'row',
              padding: 8,
              marginHorizontal: 16,
              marginTop: 16,
              marginBottom: 8,
              backgroundColor: AppColors.primary,
              alignItems: 'center',
              justifyContent: !autochangeIcon && !silentIconApplied ? 'space-between' : 'center',
              borderRadius: 8,
              height: 52,
            }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', paddingLeft: 8 }}>
              <MaterialCommunityIcons color={'#e74242'} name={'bell-off'} size={22} />
              <AppText style={{ marginLeft: 8, fontSize: 14 }}>SILENT MODE</AppText>
            </View>
            {!autochangeIcon && !silentIconApplied && (
              <AppButton
                icon="chevron-right-circle"
                mode="contained"
                text="Show on App Icon"
                iconOnRight={true}
                style={{}}
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
          initialBrightness={initialBrightness}
          initialVolume={initialVolume}
          onBrightnessChange={async (value: number) => {
            DeviceBrightness.setBrightnessLevel(value);
          }}
          onBrightnessChangeComplete={(value: number) => {
            setCurrentBrightness(value);
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
            VolumeManager.setVolume(value);
          }}
          onVolumeChangeStart={() => {
            isVolumeChangingViaSlider.current = true;
          }}
          onVolumeChangeComplete={(value: number) => {
            isVolumeChangingViaSlider.current = false;
            setCurrentVolume(value);
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
            const saved = await CommonService.getPresets();
            setSavedPresets(saved);
          }}
        />

        <ConfirmDialog
          title="Confirm Deletion"
          description={'Are you sure you want to delete this preset?'}
          onConfirm={async () => {
            await CommonService.removePreset(currentPreset);
            const saved = await CommonService.getPresets();
            setSavedPresets(saved);
          }}
          visible={confirmVisible}
          setVisible={setConfirmVisible}
        />

        <AppHint style={{ paddingHorizontal: 16, marginTop: 16, marginBottom: 12, marginLeft: 2 }}>
          SAVED PRESETS ({savedPresets?.length || 0})
        </AppHint>
        {savedPresets?.length ? (
          <ScrollView style={{ flex: 1, flexGrow: 1 }}>
            <View style={{ paddingHorizontal: 16, paddingBottom: 16 }}>
              <View style={{ flexDirection: 'column' }}>
                {savedPresets.map((item: any, index: number) => (
                  <View key={item.id} style={{ flexDirection: 'column' }}>
                    <AppPresetListItem
                      presetItem={item}
                      onPress={async () => {
                        const brightness = Number(item.brightnessValue.replace('%', '')) / 100;
                        const volume = Number(item.volumeValue.replace('%', '')) / 100;

                        await DeviceBrightness.setBrightnessLevel(brightness);
                        setInitialBrightness(brightness);
                        setCurrentBrightness(brightness);

                        await VolumeManager.setVolume(volume);
                        setInitialVolume(volume);
                        setCurrentVolume(volume);

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
                      onLongPress={() => {
                        ReactNativeHapticFeedback.trigger('impactMedium', options);
                        setCurrentPreset(item.id);
                        setConfirmVisible(true);
                      }}
                      active={
                        currentBrightness * 100 === Number(Number(item.brightnessValue.replace('%', '')).toFixed(0)) &&
                        currentVolume * 100 === Number(Number(item.volumeValue.replace('%', '')).toFixed(0))
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
