/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useCallback } from 'react';
import { ActivityIndicator, Linking, SafeAreaView, StatusBar, useColorScheme, View } from 'react-native';
import { LogBox } from 'react-native';

// LIBRARIES
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { DefaultTheme, Provider as PaperProvider, Snackbar } from 'react-native-paper';
import SystemNavigationBar from 'react-native-system-navigation-bar';

// SCREENS
import HomeScreen from './screens/home';
import SettingsScreen from './screens/settings';

// COMMON
import { AppColors, AppStyles } from './app.styles';
import { InitialState, AppContext } from './app.context';
import { StorageService } from './services/storage.service';
import { AppConstants } from './app.constants';
import { CommonService } from './services/common.service';

// THEME
const theme = {
  ...DefaultTheme,
  roundness: 3,
  colors: {
    ...DefaultTheme.colors,
    primary: AppColors.primary,
    accent: AppColors.accent,
  },
};

LogBox.ignoreLogs(['new NativeEventEmitter']);

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const [state, setState] = useState(InitialState);
  const Stack = createNativeStackNavigator();

  useEffect(() => {
    SystemNavigationBar.setNavigationColor(AppColors.primary);
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: isDarkMode ? AppColors.dark.background : AppColors.light.background }}>
      <PaperProvider theme={theme}>
        <AppContext.Provider value={[state, setState] as any}>
          <MyStatusBar animated={true} backgroundColor={AppColors.primary} barStyle={'light-content'} />
          <NavigationContainer>
            <Stack.Navigator
              screenOptions={{
                headerTintColor: isDarkMode ? AppColors.light.background : AppColors.dark.background,
                headerStyle: {
                  backgroundColor: isDarkMode ? AppColors.dark.background : AppColors.light.background,
                },
                headerShadowVisible: false,
              }}>
              <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
              <Stack.Screen name="Settings" component={SettingsScreen} options={{ headerShown: false }} />
            </Stack.Navigator>
          </NavigationContainer>
          {state.isLoading ? (
            <View
              style={{
                ...AppStyles.Loader,
                backgroundColor: isDarkMode ? 'rgba(0, 0, 0, 0.8)' : 'rgba(255, 255, 255, 0.8)',
              }}>
              <ActivityIndicator
                animating={true}
                color={!isDarkMode ? 'rgba(0, 0, 0, 0.8)' : 'rgba(255, 255, 255, 0.8)'}
                size="large"
              />
            </View>
          ) : null}
          <Snackbar
            visible={state.alertMessage.message ? true : false}
            style={
              state.alertMessage.type === 'error'
                ? AppStyles.ErrorAlert
                : state.alertMessage.type === 'success'
                ? AppStyles.SuccessAlert
                : AppStyles.DefaultAlert
            }
            action={{
              label: 'OK',
              labelStyle: { color: '#FFFFFF' },
              onPress: () => {
                setState((currentState: any) => {
                  return { ...currentState, alertMessage: { type: '', message: '' } };
                });
              },
            }}
            duration={4000}
            onDismiss={() => {
              setState((currentState: any) => {
                return { ...currentState, alertMessage: { type: '', message: '' } };
              });
            }}>
            {state.alertMessage.message}
          </Snackbar>
        </AppContext.Provider>
      </PaperProvider>
    </View>
  );
};

const MyStatusBar = ({ backgroundColor, ...props }: any) => (
  <View style={{ height: StatusBar.currentHeight, backgroundColor }}>
    <SafeAreaView>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </SafeAreaView>
  </View>
);

export default App;
