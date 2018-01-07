
import React, { Component } from 'react';
import {
  View, Text, TouchableOpacity, Platform, StyleSheet
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';

import {
  getMetricMetaInfo, timeToString, getDailyReminderValue,
  clearLocalNotification, setLocalNotification
} from '../utils/helpers';
import { submitEntry, removeEntry } from '../utils/api';
import { addEntry } from '../actions';
import { white, purple } from '../utils/colors';

import Stepper from './Stepper';
import LabeledSlider from './LabeledSlider';
import DateHeader from './DateHeader';
import TextButton from './TextButton';

//------------------------------------------------------------------------------
// Styles
//------------------------------------------------------------------------------
const styles = StyleSheet.create({
  //----------------------------------------------------------------------------
  // Container
  //----------------------------------------------------------------------------
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: white    
  },

  //----------------------------------------------------------------------------
  // Row
  //----------------------------------------------------------------------------
  row: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center'
  },

  //----------------------------------------------------------------------------
  // IOS submit button
  //----------------------------------------------------------------------------
  iosSubmitBtn: {
    backgroundColor: purple,
    padding: 10,
    borderRadius: 7,
    height: 45,
    marginLeft: 40,
    marginRight: 40
  },

  //----------------------------------------------------------------------------
  // Android submit button
  //----------------------------------------------------------------------------
  androidSubmitBtn: {
    backgroundColor: purple,
    padding: 10,
    paddingLeft: 30,
    paddingRight: 30,
    height: 45,
    borderRadius: 2,
    alignSelf: 'flex-end',
    justifyContent: 'center',
    alignItems: 'center'
  },

  //----------------------------------------------------------------------------
  // Submit button text
  //----------------------------------------------------------------------------
  submitBtnText: {
    color: white,
    fontSize: 22,
    textAlign: 'center'
  },

  //----------------------------------------------------------------------------
  // Center
  //----------------------------------------------------------------------------
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 30,
    marginLeft: 30
  }
});

//------------------------------------------------------------------------------
// Submit button
//------------------------------------------------------------------------------
function SubmitBtn({onPress}) {
  return (
    <TouchableOpacity
      style={
        Platform.OS === 'ios'
          ? styles.iosSubmitBtn
          : styles.androidSubmitBtn
      }
      onPress={onPress}>
      <Text style={styles.submitBtnText}>
        SUBMIT
      </Text>
    </TouchableOpacity>
  );
}

//------------------------------------------------------------------------------
// Add Entry
//------------------------------------------------------------------------------
class AddEntry extends Component {
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

    this.props.addEntry({
      [key]: entry
    });

    this.setState({
      run: 0,
      bike: 0,
      swim: 0,
      sleep: 0,
      eat: 0
    });

    submitEntry({ key, entry});
    this.toHome();

    clearLocalNotification().
      then(setLocalNotification);
  }

  //----------------------------------------------------------------------------
  // Reset
  //----------------------------------------------------------------------------
  reset = () => {
    const key = timeToString();

    this.props.addEntry({
      [key]: getDailyReminderValue()
    });

    removeEntry(key);
  }

  //----------------------------------------------------------------------------
  // To home
  //----------------------------------------------------------------------------
  toHome = () => {
    this.props.navigation.dispatch(NavigationActions.back({
      key: 'AddEntry'
    }));
  }

  //----------------------------------------------------------------------------
  // Render the component
  //----------------------------------------------------------------------------
  render() {
    const metaInfo = getMetricMetaInfo();

    if(this.props.alreadyLogged)
      return (
        <View style={styles.center}>
          <Ionicons
            name={
              Platform.OS === 'ios'
                ? 'ios-happy-outline'
                : 'md-happy'
            }
            size={100}
          />
          <Text>
            You already logged your information for today.
          </Text>
          <TextButton onPress={this.reset} style={{padding: 10}}>
            Reset
          </TextButton>
        </View>
      );
    return (
      <View style={styles.container}>
        <DateHeader date={(new Date()).toLocaleDateString()}/>
        {Object.keys(metaInfo).map((metric) => {
          const { getIcon, type, ...rest } = metaInfo[metric];
          const value = this.state[metric];
          return (
            <View key={metric} style={styles.row}>
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

//------------------------------------------------------------------------------
// Connect redux
//------------------------------------------------------------------------------
function mapStateToProps(state) {
  const key = timeToString();
  return {
    alreadyLogged: state[key] && typeof state[key].today === 'undefined'
  };
}

function mapDispatchToProps(dispatch) {
  return {
    addEntry: (entry) => dispatch(addEntry(entry))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AddEntry);
