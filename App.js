import React from 'react';
import { View, Platform } from 'react-native';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { TabNavigator } from 'react-navigation';
import { FontAwesome, Ionicons } from '@expo/vector-icons';

import entriesReducer from './reducers';
import { purple, white } from './utils/colors';

import AddEntry from './components/AddEntry';
import History from './components/History';

//------------------------------------------------------------------------------
// Tabs
//------------------------------------------------------------------------------
const Tabs = TabNavigator({
  History: {
    screen: History,
    navigationOptions: {
      tabBarLabel: 'History',
      tabBarIcon: ({ tintColor }) => (
        <Ionicons name='ios-bookmarks' size={30} color={tintColor} />
      )
    }
  },
  AddEntry: {
    screen: AddEntry,
    navigationOptions: {
      tabBarLabel: 'Add Entry',
      tabBarIcon: ({ tintColor }) => (
        <FontAwesome name='plus-square' size={30} color={tintColor} />
      )
    }
  }
}, {
  navigationOptions: {
    header: null
  },
  tabBarOptions: {
    activeTintColor: Platform.OS === 'ios' ? purple : white,
    style: {
      height: 56,
      backgroundColor: Platform.OS === 'ios' ? white : purple,
      shadowColor: 'rgba(0, 0, 0, 0.24)',
      shadowOffset: {
        width: 0,
        height: 3
      },
      shadowRadius: 6,
      shadowOpacity: 1
    }
  }
});

//------------------------------------------------------------------------------
// Component
//------------------------------------------------------------------------------
export default class App extends React.Component {
  render() {
    return (
      <Provider store={createStore(entriesReducer)}>
        <View style={{flex: 1}}>
          <Tabs />
        </View>
      </Provider>
    );
  }
}
