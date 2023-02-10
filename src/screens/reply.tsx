/* eslint-disable react-hooks/exhaustive-deps */
import { useFocusEffect } from '@react-navigation/native';
import React, { useContext, useCallback } from 'react';
import { Keyboard, TouchableWithoutFeedback, useColorScheme, View } from 'react-native';
import { AppContext } from '../app.context';
import AppScreenContainer from '../components/containers/app-screen-container';

const ReplyScreen = ({ navigation }: any) => {
  const isDarkMode = useColorScheme() === 'dark';
  const [state, setState]: any = useContext(AppContext);

  useFocusEffect(
    useCallback(() => {
      onFocus();
    }, []),
  );

  const onFocus = async () => {};

  return (
    <AppScreenContainer>
      <TouchableWithoutFeedback
        onPress={() => {
          Keyboard.dismiss();
        }}>
        <View
          style={{ paddingHorizontal: 16, paddingVertical: 16, flexDirection: 'column', flex: 1, flexGrow: 1 }}></View>
      </TouchableWithoutFeedback>
    </AppScreenContainer>
  );
};

export default ReplyScreen;
