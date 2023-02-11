import { AppConstants } from '../app.constants';
import { StorageService } from './storage.service';
import moment from 'moment';
import { Dimensions, Share } from 'react-native';
import { Platform } from 'react-native';
import CryptoJS from 'react-native-crypto-js';

export const CommonService = {
  showLoader: (setState: any) => {
    setState((currentState: any) => {
      return { ...currentState, isLoading: true };
    });
  },
  hideLoader: (setState: any) => {
    setState((currentState: any) => {
      return { ...currentState, isLoading: false };
    });
  },
  showAlertMessage: (setState: any, type: string, message: string) => {
    setState((currentState: any) => {
      return { ...currentState, alertMessage: { type: type, message: message } };
    });
  },
  handleAPIError: (setState: any, error: any) => {
    console.log(error);
    CommonService.hideLoader(setState);
    if (error.response) {
      if (error.response?.status === 401) {
        CommonService.showAlertMessage(setState, 'error', 'Unautorized request. Try again.');
      } else if (error.response?.status === 403) {
        CommonService.showAlertMessage(setState, 'error', 'Your account has been disabled. Please contact us.');
      } else if (error.response?.status >= 500) {
        CommonService.showAlertMessage(setState, 'error', 'Internal server error. Try again.');
      } else {
        CommonService.showAlertMessage(setState, 'error', error.response?.data?.error);
      }
    } else {
      CommonService.showAlertMessage(setState, 'error', 'Network error. Try again.');
    }
  },
  getWindowSize: () => {
    const width = Dimensions.get('window').width;
    const height = Dimensions.get('window').height;
    return { width, height };
  },
  getTimeFromNow: (timestamp: string): string => {
    return moment.utc(timestamp).local().startOf('seconds').fromNow();
  },
  getTime: (timestamp: string): string => {
    return moment.utc(timestamp).local().format('MMM DD, YYYY HH:mm');
  },
  isIos: () => Platform.OS === 'ios',
  getTextColorBasedOnBgColor(bgColor: string, opacity?: number): string {
    var color = bgColor.charAt(0) === '#' ? bgColor.substring(1, 7) : bgColor;
    var r = parseInt(color.substring(0, 2), 16);
    var g = parseInt(color.substring(2, 4), 16);
    var b = parseInt(color.substring(4, 6), 16);
    var uicolors = [r / 255, g / 255, b / 255];
    var c = uicolors.map(col => {
      if (col <= 0.03928) {
        return col / 12.92;
      }
      return Math.pow((col + 0.055) / 1.055, 2.4);
    });
    var L = 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2];
    return L > 0.179 ? `rgba(0,0,0,${opacity || 1})` : `rgba(255,255,255,${opacity || 1})`;
  },
  isProduction: () => {
    return !__DEV__;
  },
  getIconNameSuffix: (value: number) => {
    if (value > 75) {
      return '-76-100';
    } else if (value > 50 && value <= 75) {
      return '-51-75';
    } else if (value > 25 && value <= 50) {
      return '-26-50';
    } else if (value > 0 && value <= 25) {
      return '-1-25';
    }
    return '-0';
  },
  getImage: (key: string): any => {
    const images: any = {
      'b-76-100': require('../assets/images/b-76-100.png'),
      'b-51-75': require('../assets/images/b-51-75.png'),
      'b-26-50': require('../assets/images/b-26-50.png'),
      'b-1-25': require('../assets/images/b-1-25.png'),
      'b-0': require('../assets/images/b-0.png'),
      'v-76-100': require('../assets/images/v-76-100.png'),
      'v-51-75': require('../assets/images/v-51-75.png'),
      'v-26-50': require('../assets/images/v-26-50.png'),
      'v-1-25': require('../assets/images/v-1-25.png'),
      'v-0': require('../assets/images/v-0.png'),
      s: require('../assets/images/s.png'),
      r: require('../assets/images/r.png'),
    };
    return images[key];
  },
  getPresets: async () => {
    const data = await StorageService.getData(AppConstants.STORAGE_KEY_PRESETS);
    return data?.length ? data : [];
  },
  addPreset: async (
    brightnessIcon: string,
    brightnessValue: string,
    volumeIcon: string,
    volumeValue: string,
    silentIcon: string,
    silentValue: string,
  ) => {
    let data = await StorageService.getData(AppConstants.STORAGE_KEY_PRESETS);
    if (!data || !data.length) {
      data = [];
    }
    data.push({
      id: Date.now(),
      brightnessIcon,
      brightnessValue,
      volumeIcon,
      volumeValue,
      silentIcon,
      silentValue,
    });

    await StorageService.setData(AppConstants.STORAGE_KEY_PRESETS, data);
  },
  removePreset: async (id: number) => {
    const data = await StorageService.getData(AppConstants.STORAGE_KEY_PRESETS);
    const index = data.findIndex((x: any) => x.id === id);
    data.splice(index, 1);
    await StorageService.setData(AppConstants.STORAGE_KEY_PRESETS, data);
  },
};
