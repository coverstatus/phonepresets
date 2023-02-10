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
import AboutScreen from './screens/about';

// COMMON
import { AppColors, AppStyles } from './app.styles';
import { InitialState, AppContext } from './app.context';
import { StorageService } from './services/storage.service';
import { AppConstants } from './app.constants';
import PurchaseScreen from './screens/purchase';
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
    SystemNavigationBar.setNavigationColor(isDarkMode ? AppColors.dark.background : AppColors.light.background);
  }, []);

  useEffect(() => {
    // (async () => {
    //   try {
    //     CommonService.showLoader(setState);
    //     await initConnection();
    //     setState((currentState: any) => {
    //       return { ...currentState, connected: true };
    //     });
    //     if (!CommonService.isIos()) {
    //       await flushFailedPurchasesCachedAsPendingAndroid();
    //     } else {
    //       /**
    //        * WARNING This line should not be included in production code
    //        * This call will call finishTransaction in all pending purchases
    //        * on every launch, effectively consuming purchases that you might
    //        * not have verified the receipt or given the consumer their product
    //        *
    //        * TL;DR you will no longer receive any updates from Apple on
    //        * every launch for pending purchases
    //        */
    //       if (!CommonService.isProduction()) {
    //         await clearTransactionIOS();
    //       }
    //     }
    //     CommonService.checkPurchases(state, setState);
    //   } catch (error) {
    //     console.log(error);
    //   }
    // })();

    // const purchaseUpdateSubscription: any = purchaseUpdatedListener(async purchase => {
    //   console.log('purchaseUpdatedListener');
    //   // console.log(JSON.stringify(purchase));
    //   if (CommonService.isValidPurchase(purchase)) {
    //     try {
    //       CommonService.showLoader(setState);
    //       console.log('running acknowledgeResult');
    //       const acknowledgeResult = await finishTransaction({ purchase });
    //       console.log('finishTransaction acknowledgeResult', acknowledgeResult);
    //       if (acknowledgeResult) {
    //         setState((currentState: any) => {
    //           return { ...currentState, subscribed: true };
    //         });
    //         await StorageService.setData(AppConstants.STORAGE_KEY_IS_SUBSCRIBED, true);
    //       } else {
    //         setState((currentState: any) => {
    //           return { ...currentState, subscribed: false };
    //         });
    //         await StorageService.setData(AppConstants.STORAGE_KEY_IS_SUBSCRIBED, false);
    //       }
    //       CommonService.hideLoader(setState);
    //     } catch (error) {
    //       setState((currentState: any) => {
    //         return { ...currentState, subscribed: false };
    //       });
    //       await StorageService.setData(AppConstants.STORAGE_KEY_IS_SUBSCRIBED, false);
    //       CommonService.hideLoader(setState);
    //       CommonService.showAlertMessage(setState, 'error', 'Failed to finish transaction');
    //       console.log('finishTransaction error');
    //       console.log(error);
    //     }
    //   } else {
    //     setState((currentState: any) => {
    //       return { ...currentState, subscribed: false };
    //     });
    //     await StorageService.setData(AppConstants.STORAGE_KEY_IS_SUBSCRIBED, false);
    //   }
    // });

    // const purchaseErrorSubscription: any = purchaseErrorListener(error => {
    //   CommonService.hideLoader(setState);
    //   CommonService.showAlertMessage(setState, 'error', 'Error in completing purchase');
    //   console.log('purchaseErrorListener error');
    //   console.log(error);
    // });

    return () => {
      // if (purchaseUpdateSubscription) {
      //   purchaseUpdateSubscription.remove();
      // }
      // if (purchaseErrorSubscription) {
      //   purchaseErrorSubscription.remove();
      // }
      // endConnection();
    };
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: isDarkMode ? AppColors.dark.background : AppColors.light.background }}>
      <PaperProvider theme={theme}>
        <AppContext.Provider value={[state, setState] as any}>
          <MyStatusBar
            animated={true}
            backgroundColor={isDarkMode ? AppColors.dark.background : AppColors.light.background}
            barStyle={isDarkMode ? 'light-content' : 'dark-content'}
          />
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
              <Stack.Screen name="About" component={AboutScreen} options={{ headerShown: false }} />
              <Stack.Screen name="Purchase" component={PurchaseScreen} options={{ headerShown: false }} />
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
