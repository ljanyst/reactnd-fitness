
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';

import { white } from '../utils/colors';
import { addEntry } from '../actions';
import { removeEntry } from '../utils/api';
import { timeToString, getDailyReminderValue } from '../utils/helpers';

import MetricCard from './MetricCard';
import TextButton from './TextButton';

//------------------------------------------------------------------------------
// Styles
//------------------------------------------------------------------------------
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: white,
    padding: 15
  }
});

//------------------------------------------------------------------------------
// Component
//------------------------------------------------------------------------------
class EntryDetail extends Component {
  //----------------------------------------------------------------------------
  // Navigation options
  //----------------------------------------------------------------------------
  static navigationOptions = ({ navigation }) => {
    const { entryId } = navigation.state.params;
    const year = entryId.slice(0, 4);
    const month = entryId.slice(5, 7);
    const day = entryId.slice(8);
    return {
      title: `${day}/${month}/${year}`
    };
  };

  //----------------------------------------------------------------------------
  // Reset
  //----------------------------------------------------------------------------
  reset = () => {
    const { remove, navigation, entryId } = this.props;
    remove();
    navigation.goBack();
    removeEntry(entryId);
  };

  //----------------------------------------------------------------------------
  // Should update
  //----------------------------------------------------------------------------
  shouldComponentUpdate(nextProps) {
    return nextProps.metrics && !nextProps.metrics.today;
  }

  //----------------------------------------------------------------------------
  // Render the component
  //----------------------------------------------------------------------------
  render() {
    return (
      <View style={styles.container}>
        <MetricCard metrics={this.props.metrics} />
        <TextButton onPress={this.reset} style={{margin: 20}}>
          RESET
        </TextButton>

      </View>
    );
  }
}

//------------------------------------------------------------------------------
// Redux connection
//------------------------------------------------------------------------------
function mapStateToProps(state, { navigation }) {
  const { entryId } = navigation.state.params;
  return {
    entryId,
    metrics: state[entryId]
  };
}

function mapDispatchToProps(dispatch, {navigation}) {
  const { entryId } = navigation.state.params;
  return {
    remove: () => dispatch(addEntry({
      [entryId]: timeToString() === entryId ? getDailyReminderValue() : null
    }))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(EntryDetail);
