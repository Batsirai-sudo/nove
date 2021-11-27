import * as actionTypes from '@actions/actionTypes';
import isArray from 'lodash/isArray';

const initialState = {
  batchOrder: {},
  order: '',
  activeStockTakingID: '',
  deliveries: [],
  writtenStock: [],
  sellCarts: [],
  clientsRequestOrders: [],
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case actionTypes.CREATE_PDF_BATCH_ORDER:
      return {
        ...state,
        batchOrder: action.payload,
      };
    case actionTypes.ACTIVE_STOCK_TAKING:
      return {
        ...state,
        activeStockTakingID: action.payload,
      };
    // Saving to persist storage data
    case actionTypes.STORE_ORDER:
      return {
        ...state,
        order: {
          ...state.order,
          ...action.payload,
        },
      };
    case actionTypes.SAVE_DELIVERY_STOCK:
      const deliveryData = state;
      if (isArray(deliveryData.deliveries)) {
        const index = deliveryData.deliveries
          .map((x) => x.id)
          .indexOf(action.payload.id);

        if (index !== -1) {
          deliveryData.deliveries[index] = {
            saved: true,
            data: action.payload.data,
            component: action.payload.component,
            id: action.payload.id,
          };

          return {
            ...state,
            deliveries: deliveryData.deliveries,
          };
        } else {
          deliveryData.deliveries.push({
            saved: true,
            data: action.payload.data,
            component: action.payload.component,
            id: action.payload.id,
          });
          console.log('outside index --- inside deliveryData', deliveryData);

          return {
            ...state,
            deliveries: deliveryData.deliveries,
          };
        }
      }

      return {
        ...state,
        deliveries: [],
      };

    case actionTypes.WRITE_SHOP_STOCK_SAVE:
      const writtenStockData = state?.writtenStock;

      if (isArray(writtenStockData)) {
        const index2 = writtenStockData
          .map((x) => x.id)
          .indexOf(action.payload.id);

        if (index2 !== -1) {
          writtenStockData[index2] = {
            saved: true,
            data: action.payload.data,
            id: action.payload.id,
            totalItems: action.payload.totalItems,
            totalAmount: action.payload.totalAmount,
          };

          return {
            ...state,
            writtenStock: writtenStockData,
          };
        } else {
          writtenStockData.push({
            saved: true,
            data: action.payload.data,
            id: action.payload.id,
          });

          return {
            ...state,
            writtenStock: writtenStockData,
          };
        }
      }

      return {
        ...state,
        writtenStock: [],
      };

    case actionTypes.INTIALISE_DELIVERY_STOCK:
      return {
        ...state,
        deliveries: [
          {
            saved: false,
            data: [],
            component: '',
            id: '',
          },
        ],
      };

    case actionTypes.ON_SAVE_SHOP_SELL_CART:
      const cartData = state?.sellCarts;

      if (isArray(cartData)) {
        const index3 = cartData.map((x) => x.id).indexOf(action.payload.id);

        if (index3 !== -1) {
          cartData[index3] = {
            saved: true,
            data: action.payload.data,
            id: action.payload.id,
            totalItems: action.payload.totalItems,
            totalAmount: action.payload.totalAmount,
          };

          return {
            ...state,
            sellCarts: cartData,
          };
        } else {
          cartData.push({
            saved: true,
            data: action.payload.data,
            id: action.payload.id,
            totalItems: action.payload.totalItems,
            totalAmount: action.payload.totalAmount,
          });

          return {
            ...state,
            sellCarts: cartData,
          };
        }
      }

      return {
        ...state,
        sellCarts: [],
      };

    // Reseting Store Data
    case actionTypes.RESET_DELIVERY_STOCK:
      const v = state.deliveries.filter((x) => x.id !== action.payload);
      return {
        ...state,
        deliveries: v,
      };
    case actionTypes.RESET_WRITE_SHOP_STOCK:
      const z = state.writtenStock.filter((x) => x.id !== action.payload);
      return {
        ...state,
        writtenStock: z,
      };
    case actionTypes.ON_RESET_SHOP_SELL_CART:
      const p = state.sellCarts.filter((x) => x.id !== action.payload);
      return {
        ...state,
        sellCarts: p,
      };
    case actionTypes.RESET_STORE_ORDER:
      return {
        ...state,
        order: '',
      };

    // Clents request orders save and reset reducer

    case actionTypes.ON_SAVE_CLIENTS_WORKERS_ORDERS:
      const clientsOrders = state;
      if (isArray(clientsOrders.clientsRequestOrders)) {
        const index = clientsOrders.clientsRequestOrders
          .map((x) => x.id)
          .indexOf(action.payload.id);

        if (index !== -1) {
          clientsOrders.clientsRequestOrders[index] = {
            saved: true,
            data: action.payload.data,
            id: action.payload.id,
            totalItems: action.payload.totalItems,
            totalAmount: action.payload.totalAmount,
          };

          return {
            ...state,
            clientsRequestOrders: clientsOrders.clientsRequestOrders,
          };
        } else {
          clientsOrders.clientsRequestOrders.push({
            saved: true,
            data: action.payload.data,
            totalItems: action.payload.totalItems,
            totalAmount: action.payload.totalAmount,
            id: action.payload.id,
          });

          return {
            ...state,
            deliveries: clientsOrders.clientsRequestOrders,
          };
        }
      }

      return {
        ...state,
        clientsRequestOrders: [],
      };
    case actionTypes.RESET_CLIENTS_WORKERS_ORDERS:
      const clientsordersreset = state.clientsRequestOrders.filter(
        (x) => x.id !== action.payload,
      );
      return {
        ...state,
        clientsRequestOrders: clientsordersreset,
      };

    default:
      return state;
  }
};
