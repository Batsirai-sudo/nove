import * as actionTypes from '@actions/actionTypes';
const initialState = {
  login: {
    success: false,
  },
  registration: {
    start: false,
    success: false,
    error: false,
  },
  user: {},
  banking: {},
  userid: '',
  error: '',
  fetchloading: false,
  isMessaging: false,
  statistics: {},
  province: '',
  street_address: '',
  town: '',
  isSignedIn: false,
  isAdmin_Client: false,
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case actionTypes.ON_STORE_REGISTRATION_DATA:
      return {
        ...state,
        registration: {
          ...state.registration,
          ...action.payload,
        },
      };
    case actionTypes.ON_LOGIN:
      return {
        ...state,
        user: action.payload,
        isSignedIn: true,
        registration: {
          success: true,
          error: false,
          start: false,
        },
      };
    case actionTypes.ON_LOGOUT:
      return {
        ...state,
        user: {},
      };

    case actionTypes.ON_RESET:
      return {
        ...state,
        login: {
          success: false,
        },
        registration: {},
        user: {},
        banking: {},
        userid: '',
        error: '',
        fetchloading: false,
        isMessaging: false,
        statistics: {},
        province: '',
        street_address: '',
        town: '',
        isSignedIn: false,
        isAdmin_Client: false,
      };
    case actionTypes.REGISTRATION_START:
      return {
        ...state,
        registration: {
          ...state.registration,
          start: true,
          error: false,
          success: false,
        },
      };
    case actionTypes.REGISTRATION_ERROR:
      return {
        ...state,
        registration: {
          ...state.registration,
          error: true,
          success: false,
          start: false,
        },
      };
    case actionTypes.UPDATE_SETTINGS:
      return {
        ...state,
        user: {
          ...state.user,
          ...action.payload,
        },
      };
    default:
      return state;
  }
};
