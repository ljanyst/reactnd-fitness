
import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { getMetricMetaInfo, timeToString } from '../utils/helpers';
import { submitEntry, removeEntry } from '../utils/api';

import Stepper from './Stepper';
import LabeledSlider from './LabeledSlider';
import DateHeader from './DateHeader';
import TextButton from './TextButton';

//------------------------------------------------------------------------------
// Submit button
//------------------------------------------------------------------------------
function SubmitBtn({onPress}) {
  return (
    <TouchableOpacity
      onPress={onPress}>
      <Text>
        SUBMIT
      </Text>
    </TouchableOpacity>
  );
}

//------------------------------------------------------------------------------
// Add Entry
//------------------------------------------------------------------------------
export default class AddEntry extends Component {
  //----------------------------------------------------------------------------
  // The State
  //----------------------------------------------------------------------------
  state = {
    run: 0,
    bike: 0,
    swim: 0,
    sleep: 0,
    eat: 0
  };

  //----------------------------------------------------------------------------
  // Increment a metric
  //----------------------------------------------------------------------------
  increment = (metric) => {
    const { max, step } = getMetricMetaInfo(metric);
    this.setState((state) => {
      const count = state[metric] + step;
      return {[metric]: count > max ? max : count};
    });
  }

  //----------------------------------------------------------------------------
  // Decrement a metric
  //----------------------------------------------------------------------------
  decrement = (metric) => {
    const { step } = getMetricMetaInfo(metric);
    this.setState((state) => {
      const count = state[metric] - step;
      return {[metric]: count < 0 ? 0 : count};
    });
  }

  //----------------------------------------------------------------------------
  // Slide the metric
  //----------------------------------------------------------------------------
  slide = (metric, newValue) => {
    this.setState({[metric]: newValue});
  }

  //----------------------------------------------------------------------------
  // Submit
  //----------------------------------------------------------------------------
  submit = () => {
    const key = timeToString();
    const entry = this.state;
    this.setState({
      run: 0,
      bike: 0,
      swim: 0,
      sleep: 0,
      eat: 0
    });

    submitEntry({ key, entry});
  }

  //----------------------------------------------------------------------------
  // Reset
  //----------------------------------------------------------------------------
  reset = () => {
    const key = timeToString();

    removeEntry(key);
  }

  //----------------------------------------------------------------------------
  // Render the component
  //----------------------------------------------------------------------------
  render() {
    const metaInfo = getMetricMetaInfo();

    if(this.props.alreadyLogged)
      return (
        <View>
          <Ionicons
            name='ios-happy-outline'
            size={100}
          />
          <Text>
            You already logged your information for today.
          </Text>
          <TextButton onPress={this.reset}>
            Reset
          </TextButton>
        </View>
      );
    return (
      <View>
        <DateHeader date={(new Date()).toLocaleDateString()}/>
        {Object.keys(metaInfo).map((metric) => {
          const { getIcon, type, ...rest } = metaInfo[metric];
          const value = this.state[metric];
          return (
            <View key={metric}>
              {getIcon()}
              {type === 'slider'
                ? <LabeledSlider
                    value={value}
                    onChange={(value) => this.slide(metric, value)}
                    {...rest}
                  />
                : <Stepper
                    value={value}
                    onIncrement={() => this.increment(metric)}
                    onDecrement={() => this.decrement(metric)}
                    {...rest}
                  />
              }
            </View>
          );
        })}
        <SubmitBtn onPress={this.submit}/>
      </View>
    );
  }
}
