
import React from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet, Platform
} from 'react-native';
import { FontAwesome, Entypo } from '@expo/vector-icons';

import { white, gray, purple } from '../utils/colors';

//------------------------------------------------------------------------------
// Style
//------------------------------------------------------------------------------
const styles = StyleSheet.create({
  //----------------------------------------------------------------------------
  // Row
  //----------------------------------------------------------------------------
  row: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center'
  },

  //----------------------------------------------------------------------------
  // IOS button
  //----------------------------------------------------------------------------
  iosBtn: {
    backgroundColor: white,
    borderColor: purple,
    borderWidth: 1,
    borderRadius: 3,
    padding: 5,
    paddingLeft: 25,
    paddingRight: 25
  },

  //----------------------------------------------------------------------------
  // Android button
  //----------------------------------------------------------------------------
  androidBtn: {
    margin: 5,
    backgroundColor: purple,
    padding: 10,
    borderRadius: 2
  },

  //----------------------------------------------------------------------------
  // Metric counter
  //----------------------------------------------------------------------------
  metricCounter: {
    width: 85,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

//------------------------------------------------------------------------------
// Slider
//------------------------------------------------------------------------------
export default function Slider(props) {
  const { max, unit, step, value, onIncrement, onDecrement } = props;
  return (
    <View style={[styles.row, {justifyContent: 'space-between'}]}>
      <View style={{flexDirection: 'row'}}>
        <TouchableOpacity
          style={[
            Platform.OS === 'ios' ? styles.iosBtn : styles.androidBtn,
            {borderTopRightRadius: 0, borderBottomRightRadius: 0}
          ]}
          onPress={onDecrement}
        >
          <FontAwesome
            name='minus'
            size={30}
            color={Platform.OS === 'ios' ? purple : white}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            Platform.OS === 'ios' ? styles.iosBtn : styles.androidBtn,
            {borderTopLeftRadius: 0, borderBottomLeftRadius: 0}
          ]}
          onPress={onIncrement}
        >
          <FontAwesome
            name='plus'
            size={30}
            color={Platform.OS === 'ios' ? purple : white}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.metricCounter}>
        <Text style={{fontSize: 24, textAlign: 'center'}}>{value}</Text>
        <Text style={{fontSize: 18, color: gray}}>{unit}</Text>
      </View>
    </View>
  );
}
