import React, { createContext, useContext } from 'react';
import { Api } from './api';

const ApiContext = createContext({});

export const ApiProvider = ({ host, ...rest }) => {
  return <ApiContext.Provider {...rest} value={new Api(host)} />;
};

export const useApi = () => {
  const context = useContext(ApiContext);
  if (context === undefined) {
    throw new Error('useApi error');
  }
  return context;
};
