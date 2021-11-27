import * as actionTypes from './actionTypes';

export const onCreateBatchOrderPdf = (data) => {
  return {
    type: actionTypes.CREATE_PDF_BATCH_ORDER,
    payload: data,
  };
};

export const updateSettings = (data) => {
  return {
    type: actionTypes.UPDATE_SETTINGS,
    payload: data,
  };
};
export const OnSavePOSCart = (data) => {
  return {
    type: actionTypes.ON_SAVE_SHOP_SELL_CART,
    payload: data,
  };
};
export const OnResetPOSCart = (id) => {
  return {
    type: actionTypes.ON_RESET_SHOP_SELL_CART,
    payload: id,
  };
};
export const activateStockTakingActive = (id) => {
  return {
    type: actionTypes.ACTIVE_STOCK_TAKING,
    payload: id,
  };
};

// saveDeliveryStock  saved and resets

export const saveDeliveryStock = (data) => {
  return {
    type: actionTypes.SAVE_DELIVERY_STOCK,
    payload: data,
  };
};

export const initialiseDeliveryStock = (data) => {
  return {
    type: actionTypes.INTIALISE_DELIVERY_STOCK,
  };
};
export const resetDeliveryStock = (id) => {
  return {
    type: actionTypes.RESET_DELIVERY_STOCK,
    payload: id,
  };
};

// shop stock orders saved and resets
export const onSaveShopStockOrder = (data) => {
  return {
    type: actionTypes.WRITE_SHOP_STOCK_SAVE,
    payload: data,
  };
};
export const onResetShopStockOrder = (id) => {
  return {
    type: actionTypes.RESET_WRITE_SHOP_STOCK,
    payload: id,
  };
};

// Orders written by clients and workers to be saved  and resets here

export const saveClientsRequestOrders = (data) => {
  return {
    type: actionTypes.ON_SAVE_CLIENTS_WORKERS_ORDERS,
    payload: data,
  };
};

export const resetClientsRequestOrders = (id) => {
  return {
    type: actionTypes.RESET_CLIENTS_WORKERS_ORDERS,
    payload: id,
  };
};
