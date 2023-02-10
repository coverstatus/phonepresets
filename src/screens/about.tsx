/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { AppState, Image, ScrollView, useColorScheme, View } from 'react-native';
import { AppContext } from '../app.context';
import { AppColors } from '../app.styles';
import { useFocusEffect } from '@react-navigation/native';
import { CommonService } from '../services/common.service';
import { APIService } from '../services/api.service';
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

const AboutScreen = ({ navigation }: any) => {
  const isDarkMode = useColorScheme() === 'dark';
  const [state, setState]: any = useContext(AppContext);
  const scrollRef = useRef<any>();

  useFocusEffect(
    useCallback(() => {
      onFocus();
    }, []),
  );

  const onFocus = () => {
    scrollRef.current?.scrollTo({ y: 0, animated: false });
  };

  return (
    <AppScreenContainer>
      <ScreenHeader navigation={navigation} />
      <ScrollView style={{ flex: 1 }} ref={scrollRef}>
        <View style={{ padding: 16, justifyContent: 'flex-start', alignItems: 'flex-start', alignContent: 'stretch' }}>
          <AppText style={{ fontWeight: '500' }}>Pocket AI (version {VersionInfo.appVersion})</AppText>
          <AppSubtext style={{ marginTop: 8 }}>The ultimate AI assistant in your pocket.</AppSubtext>
          <AppDivider marginVertical={16} />
          <AppSubtext>
            Write great content, generate amazing images, get ideas and solve problems with simple instructions.
          </AppSubtext>
          <AppSubtext style={{ marginTop: 8 }}>
            Pocket AI is powered by GPT-3 and ChatGPT, state-of-the-art natural language processing technologies
            developed by OpenAI. This app is not sponsored, endorsed by, or affiliated with OpenAI Inc.
          </AppSubtext>
          <AppSubtext style={{ marginTop: 8 }}>
            ChatGPT has its limitations. It sometimes writes plausible-sounding but incorrect or nonsensical answers. It
            can generate wrong answers for some questions, but answers correctly when the same question is rephrased.
          </AppSubtext>
          <AppSubtext style={{ marginTop: 8 }}>
            Please provide your feedback to aid the ongoing work to improve this system.
          </AppSubtext>
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
      }}>
      <AppIconButton
        icon="arrow-left"
        onPress={() => {
          if (navigation?.goBack) {
            navigation.goBack();
          }
        }}
      />
      <AppHeading style={{ marginLeft: 4 }}>About</AppHeading>
      <View style={{ flexGrow: 1 }} />
    </View>
  );
};

export default AboutScreen;
