import React from 'react';
import { View } from 'react-native';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import entriesReducer from './reducers';

import AddEntry from './components/AddEntry';

export default class App extends React.Component {
  render() {
    return (
      <Provider store={createStore(entriesReducer)}>
        <View>
          <AddEntry />
        </View>
      </Provider>
    );
  }
}
