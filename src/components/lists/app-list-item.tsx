/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useContext, useEffect } from 'react';
import { ScrollView, Share, TextInput, useColorScheme, View } from 'react-native';
import { TouchableRipple } from 'react-native-paper';
import { AppColors } from '../../app.styles';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AppSubtext from '../labels/app-subtext';
import { AppConstants } from '../../app.constants';
import AppText from '../labels/app-text';
import { CommonService } from '../../services/common.service';
import AppIconButton from '../buttons/app-icon-button';
import AppCardContainer from '../containers/app-card-container';
import { AppContext } from '../../app.context';
import Clipboard from '@react-native-clipboard/clipboard';
import AppSubheading from '../labels/app-subheading';

const AppListItem = ({ item, style, onRemove }: any) => {
  // const isDarkMode = useColorScheme() === 'dark';
  const isDarkMode = true;
  const [state, setState]: any = useContext(AppContext);

  useEffect(() => {});

  return (
    <View
      style={{
        flex: 1,
        flexGrow: 1,
        flexDirection: 'row',
        ...style,
      }}>
      <View style={{ flex: 1, flexGrow: 1 }}>
        <View
          style={{
            flex: 1,
            flexGrow: 1,
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: 4,
            alignItems: 'center',
          }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <AppIconButton icon={item.icon} iconSize={20} iconStyle={{ opacity: 0.8 }} />
            <AppText>{item.category}</AppText>
          </View>
          <AppSubheading style={{}}>{CommonService.getTimeFromNow(item.created)}</AppSubheading>
        </View>
        <AppCardContainer
          style={{
            flexDirection: 'column',
            flex: 1,
            flexGrow: 1,
            paddingHorizontal: 8,
            paddingVertical: 8,
            borderRadius: AppConstants.BORDER_RADIUS,
            marginBottom: 8,
          }}>
          <ScrollView style={{ minHeight: 60, maxHeight: 60 }}>
            {CommonService.isIos() ? (
              <TextInput
                multiline={true}
                value={item.prompt}
                scrollEnabled={false}
                editable={false}
                style={{
                  color: isDarkMode ? AppColors.dark.text : AppColors.light.text,
                  flex: 1,
                  flexGrow: 1,
                  paddingRight: 8,
                  fontSize: 14,
                }}
              />
            ) : (
              <AppText style={{ fontSize: 14, paddingRight: 8 }}>{item.prompt}</AppText>
            )}
          </ScrollView>
        </AppCardContainer>
        <AppCardContainer
          style={{
            flexDirection: 'column',
            flex: 1,
            flexGrow: 1,
            paddingHorizontal: 8,
            paddingVertical: 8,
            borderRadius: AppConstants.BORDER_RADIUS,
          }}>
          <ScrollView style={{ minHeight: 120, maxHeight: 120 }}>
            {CommonService.isIos() ? (
              <TextInput
                multiline={true}
                value={item.response}
                scrollEnabled={false}
                editable={false}
                style={{
                  color: isDarkMode ? AppColors.dark.text : AppColors.light.text,
                  flex: 1,
                  flexGrow: 1,
                  paddingRight: 8,
                  fontSize: 14,
                }}
              />
            ) : (
              <AppText style={{ fontSize: 14, paddingRight: 8 }} selectable={true}>
                {item.response}
              </AppText>
            )}
          </ScrollView>
        </AppCardContainer>
        <View style={{ flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'flex-end', marginTop: 8 }}>
          <AppIconButton
            icon="bookmark-remove"
            iconSize={24}
            onPress={() => {
              onRemove(item);
            }}
          />
          <View style={{ flex: 1, flexGrow: 1 }}></View>
          <AppIconButton
            icon="content-copy"
            iconSize={20}
            style={{ marginRight: 8 }}
            onPress={() => {
              Clipboard.setString(item.response);
              CommonService.showAlertMessage(setState, '', 'Copied to clipboard');
            }}
          />
          <AppIconButton
            icon="share"
            iconSize={24}
            onPress={async () => {
              try {
                await Share.share({
                  message: item.response,
                });
              } catch (error) {
                console.log(error);
              }
            }}
          />
        </View>
      </View>
    </View>
  );
};

export default AppListItem;
