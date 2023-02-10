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
  getToken: () => {
    const data = new Date().toLocaleString('en', { timeZone: 'America/New_York' });
    return CryptoJS.AES.encrypt(data, AppConstants.ENCRYPTION_KEY).toString();
  },
  isProduction: () => {
    return !__DEV__;
  },
};
