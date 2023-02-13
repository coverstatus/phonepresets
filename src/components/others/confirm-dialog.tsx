/* eslint-disable react-native/no-inline-styles */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect } from 'react';
import { Dimensions, useColorScheme, View } from 'react-native';
import { Button, Divider, Dialog, Portal } from 'react-native-paper';
import { AppConstants } from '../../app.constants';
import { AppColors } from '../../app.styles';
import AppButton from '../buttons/app-button';
import AppSubtext from '../labels/app-subtext';
import AppText from '../labels/app-text';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const ConfirmDialog = ({ title, description, visible, setVisible, onConfirm }: any) => {
  // const isDarkMode = useColorScheme() === 'dark';
  const isDarkMode = true;

  useEffect(() => {}, []);

  return (
    <Portal>
      <Dialog
        visible={visible}
        onDismiss={() => {
          setVisible(false);
        }}
        style={{
          backgroundColor: AppColors.getCardBackgroundColor(isDarkMode),
          borderRadius: AppConstants.BORDER_RADIUS,
        }}>
        <Dialog.Content>
          <View style={{ flexDirection: 'column' }}>
            <AppText>{title}</AppText>
            <AppSubtext style={{ marginTop: 8 }}>{description}</AppSubtext>
          </View>
        </Dialog.Content>
        <Dialog.Actions style={{ padding: 16, justifyContent: 'flex-end' }}>
          <View style={{ marginRight: 16 }}>
            <AppButton
              text="NO"
              icon="close"
              iconSize={24}
              onPress={() => {
                setVisible(false);
              }}
            />
          </View>
          <AppButton
            mode="contained"
            text="YES"
            icon="check"
            isHighlighted={false}
            iconSize={24}
            onPress={() => {
              setVisible(false);
              onConfirm();
            }}
          />
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

export default ConfirmDialog;
