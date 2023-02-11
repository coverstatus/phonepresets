import { StyleSheet } from 'react-native';

export const AppColors = {
  primary: '#1d1629',
  primaryLight: '#2a203b',
  accent: '#4e357a',
  light: {
    background: '#EEEEEE',
    card: '#FFFFFF',
    text: '#000000',
    hint: '#444444',
    divider: '#CCCCCC',
    ripple: 'rgba(0,0,0,0.2)',
    placeholder: '#888888',
  },
  dark: {
    background: '#000000',
    card: '#181818',
    text: '#FFFFFF',
    hint: '#AAAAAA',
    divider: '#333333',
    ripple: 'rgba(255,255,255,0.2)',
    placeholder: '#888888',
  },
  success: '#388e3c',
  error: '#d32f2f',
  warning: '#ff9800',
  getBackgroundColor: (isDarkMode: boolean) => {
    return isDarkMode ? AppColors.dark.background : AppColors.light.background;
  },
  getCardBackgroundColor: (isDarkMode: boolean) => {
    return isDarkMode ? AppColors.dark.card : AppColors.light.card;
  },
};

export const AppStyles = StyleSheet.create({
  Loader: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    height: '100%',
    width: '100%',
    zIndex: 10000000,
    elevation: 100000000,
  },
  ErrorAlert: {
    borderRadius: 32,
    margin: 16,
    backgroundColor: AppColors.error,
  },
  SuccessAlert: {
    borderRadius: 32,
    margin: 16,
    backgroundColor: AppColors.success,
  },
  DefaultAlert: {
    borderRadius: 32,
    margin: 16,
    backgroundColor: '#444444',
  },
});
