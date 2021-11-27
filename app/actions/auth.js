import * as actionTypes from './actionTypes';

export const onStoreRegistrationData = (data) => {
  return {
    type: actionTypes.ON_STORE_REGISTRATION_DATA,
    payload: data,
  };
};

export const onLogin = (data) => {
  return {
    type: actionTypes.ON_LOGIN,
    payload: data,
  };
};
export const onLogout = () => {
  return {
    type: actionTypes.ON_LOGOUT,
  };
};

export const onReset = () => {
  return {
    type: actionTypes.ON_RESET,
  };
};

export const startRegistration = () => {
  return {
    type: actionTypes.REGISTRATION_START,
  };
};

export const errorRegistration = () => {
  return {
    type: actionTypes.REGISTRATION_ERROR,
  };
};
