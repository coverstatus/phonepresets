/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useRef, useState } from 'react';
import { Linking, Platform, ScrollView, useColorScheme, View } from 'react-native';
import { AppContext } from '../app.context';
import { AppColors } from '../app.styles';
import { CommonService } from '../services/common.service';
import AppScreenContainer from '../components/containers/app-screen-container';
import AppHeading from '../components/labels/app-heading';
import { AppConstants } from '../app.constants';
import AppIconButton from '../components/buttons/app-icon-button';
import AppSubtext from '../components/labels/app-subtext';
import AppText from '../components/labels/app-text';
import AppSubheading from '../components/labels/app-subheading';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AppHint from '../components/labels/app-hint';
import AppCardContainer from '../components/containers/app-card-container';
import AppButton from '../components/buttons/app-button';
import AppDivider from '../components/others/app-divider';
import { Image } from 'react-native';
import VersionInfo from 'react-native-version-info';
import { TouchableRipple } from 'react-native-paper';

const PurchaseScreen = ({ navigation }: any) => {
  const isDarkMode = useColorScheme() === 'dark';
  const [state, setState]: any = useContext(AppContext);
  const scrollRef = useRef<any>();

  const [subscriptions, setSubscriptions] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const skus: any = Platform.select({
    ios: ['com.twitterai.monthly'],
    android: ['com.twitterai.monthly'],
  });

  useEffect(() => {
    onFocus();
  }, []);

  const onFocus = async () => {
    CommonService.showLoader(setState);
  };

  return (
    <AppScreenContainer>
      <ScreenHeader navigation={navigation} />
      <ScrollView style={{ flex: 1 }} ref={scrollRef}>
        <View style={{ paddingHorizontal: 16 }}>
          {/* {!state.subscribed && ( */}
          <AppText style={{ marginTop: 16, textAlign: 'center', marginBottom: 24 }}>
            Subscribe now to generate tweets!
          </AppText>
          {/* )} */}
          {subscriptions?.length ? (
            <>
              {subscriptions.map((sub: any) => (
                <View key={sub.productId}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginTop: -32,
                    }}>
                    <Image
                      source={require('../assets/images/logo.png')}
                      style={{ height: 128, width: 128, marginBottom: 0 }}
                    />
                  </View>

                  <AppCardContainer
                    style={{
                      padding: 12,
                      alignItems: 'stretch',
                      justifyContent: 'center',
                      borderRadius: AppConstants.BORDER_RADIUS,
                      marginBottom: 8,
                    }}>
                    <View
                      style={{
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginVertical: 12,
                      }}>
                      {state.subscribed && (
                        <View
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginBottom: 16,
                          }}>
                          <MaterialCommunityIcons name={'check-decagram'} color={AppColors.success} size={56} />
                        </View>
                      )}
                      <AppSubheading style={{ fontSize: 18 }}>Pro Version</AppSubheading>
                    </View>
                    <AppDivider style={{ marginHorizontal: 32 }} />
                  </AppCardContainer>
                  {!state.subscribed && (
                    <View style={{ flexDirection: 'column' }}>
                      <AppButton
                        mode="contained"
                        text={'Subscribe'}
                        icon="chevron-right"
                        iconOnRight={true}
                        style={{
                          flexDirection: 'row',
                          height: 36,
                        }}
                        isHighlighted={false}
                        onPress={() => {}}
                      />
                      <AppButton
                        mode="outline"
                        icon="restore"
                        text={'Restore Purchases'}
                        style={{
                          flexDirection: 'row',
                          height: 36,
                          marginTop: 8,
                        }}
                        isHighlighted={true}
                        onPress={() => {}}
                      />
                    </View>
                  )}
                </View>
              ))}
              <AppHint style={{ marginTop: 16 }}>
                Automatically renews unless cancelled at least 24 hours before the end of the current subscription
                period. Cancel your subscription through the account settings on the App Store.
              </AppHint>
              <AppDivider marginVertical={16} />
              {CommonService.isIos() && (
                <View style={{ flexDirection: 'column' }}>
                  <TouchableRipple
                    borderless={true}
                    rippleColor={isDarkMode ? AppColors.dark.ripple : AppColors.light.ripple}
                    style={{ alignSelf: 'flex-start' }}
                    onPress={() => {
                      Linking.openURL('https://privacy-terms.vercel.app/twitterai');
                    }}>
                    <AppSubtext style={{ textDecorationLine: 'underline', textDecorationStyle: 'solid' }}>
                      Privacy Policy
                    </AppSubtext>
                  </TouchableRipple>
                  <TouchableRipple
                    borderless={true}
                    rippleColor={isDarkMode ? AppColors.dark.ripple : AppColors.light.ripple}
                    style={{ marginTop: 8, alignSelf: 'flex-start' }}
                    onPress={() => {
                      Linking.openURL('https://www.apple.com/legal/internet-services/itunes/dev/stdeula/');
                    }}>
                    <AppSubtext style={{ textDecorationLine: 'underline', textDecorationStyle: 'solid' }}>
                      Terms of Use (EULA)
                    </AppSubtext>
                  </TouchableRipple>
                  <AppDivider marginVertical={16} />
                </View>
              )}
              <AppHint>Tweet Writer (AI) v{VersionInfo.appVersion}</AppHint>
            </>
          ) : (
            <>
              {!isLoading && (
                <View>
                  <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
                    <MaterialCommunityIcons name={'alert-circle'} size={24} style={{ marginRight: 8 }} />
                    <AppText>Failed to get subscriptions</AppText>
                  </View>
                  <AppSubtext>
                    This may be due to a problem with your device, or subscription service on{' '}
                    {CommonService.isIos() ? 'App Store' : 'Play Store'} is unavailable at the moment. Please try again
                    in sometime.
                  </AppSubtext>
                </View>
              )}
            </>
          )}
        </View>
      </ScrollView>
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
      <View style={{ flexGrow: 1 }} />
      <AppIconButton
        icon="close"
        onPress={() => {
          if (navigation?.goBack) {
            navigation.goBack();
          }
        }}
      />
    </View>
  );
};

export default PurchaseScreen;
