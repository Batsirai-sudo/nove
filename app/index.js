import React from 'react';
import {store, persistor} from './store';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import NavContainer from './navigation';
import {LogBox} from 'react-native';
import {ModalPortal} from 'react-native-modals';
import codePush from 'react-native-code-push';

LogBox.ignoreLogs(['Animated: `useNativeDriver`']);

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavContainer />
        <ModalPortal />
      </PersistGate>
    </Provider>
  );
};
let codePushOptions = {checkFrequency: codePush.CheckFrequency.ON_APP_START};

export default codePush(codePushOptions)(App);
