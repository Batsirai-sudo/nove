import * as actionTypes from './actionTypes';

export const onStoreOrder = (data) => {
  return {
    type: actionTypes.STORE_ORDER,
    payload: data,
  };
};
export const onResetStoreOrder = () => {
  return {
    type: actionTypes.RESET_STORE_ORDER,
  };
};

export const updateSettings = (data) => {
  return {
    type: actionTypes.UPDATE_SETTINGS,
    payload: data,
  };
};
