
import React, { Component } from 'react';
import { Text, View, ActivityIndicator } from 'react-native';

//------------------------------------------------------------------------------
// Component
//------------------------------------------------------------------------------
class Live extends Component {
  //----------------------------------------------------------------------------
  // State
  //----------------------------------------------------------------------------
  state = {
    coords: null,
    status: null,
    direction: ''
  };

  //----------------------------------------------------------------------------
  // Render
  //----------------------------------------------------------------------------
  render() {
    const { status, coords, direction } = this.state;
    if(status === null)
      return <ActivityIndicator style={{marginTop: 30}}/>;

    if(status === 'denied')
      return (
        <View>
          <Text>Denied</Text>
        </View>
      );

    if(status === 'undetermined')
      return (
        <View>
          <Text>Denied</Text>
        </View>
      );

    return (
      <View>
        <Text>Liv</Text>
        <Text>{JSON.stringify(this.state)}</Text>
      </View>
    );
  }
}

export default Live;
