import { AppConstants } from '../app.constants';
import axios from 'axios';
import { CommonService } from './common.service';
import { Platform } from 'react-native';

export const APIService = {
  getData: (prompt: string, temperature: number, max_tokens: number) => {
    const token = CommonService.getToken();
    const url = AppConstants.BASE_URL + 'generate';
    const body = {
      prompt: prompt,
      temperature: temperature,
      max_tokens: max_tokens,
    };
    const headers = {
      [AppConstants.TOKEN_HEADER.KEY]: token,
    };
    return axios.post(url, body, { headers: headers });
  },
};
