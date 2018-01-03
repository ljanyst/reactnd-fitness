
import React, { Component } from 'react';
import { View, Text } from 'react-native';

import { getMetricMetaInfo } from '../utils/helpers';

import Stepper from './Stepper';
import Slider from './Slider';

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
  // Render the component
  //----------------------------------------------------------------------------
  render() {
    const metaInfo = getMetricMetaInfo();
    return (
      <View>
        {Object.keys(metaInfo).map((metric) => {
          const { getIcon, type, ...rest } = metaInfo[metric];
          const value = this.state[metric];
          return (
            <View key={metric}>
              {getIcon()}
              {type === 'slider'
                ? <Slider
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
      </View>
    );
  }
}
