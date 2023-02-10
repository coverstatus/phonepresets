import React from 'react';

export const InitialState = {
  initComplete: false,
  isLoading: false,
  initialRouteName: 'Home',
  alertMessage: { type: '', message: '' },
  subscribed: false,
};

export const AppContext = React.createContext(InitialState);
