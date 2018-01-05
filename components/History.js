
import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import UdaciFitnessCalendar from 'udacifitness-calendar';

import { receiveEntries, addEntry } from '../actions';
import { timeToString, getDailyReminderValue } from '../utils/helpers';
import { fetchCalendarResults } from '../utils/api';

//------------------------------------------------------------------------------
// History
//------------------------------------------------------------------------------
class History extends Component {
  //----------------------------------------------------------------------------
  // Mount the component
  //----------------------------------------------------------------------------
  componentDidMount() {
    fetchCalendarResults()
      .then(this.props.receiveEntries)
      .then(({entries}) => {
        if(!entries[timeToString()])
          this.props.addEntry({
            [timeToString()]: getDailyReminderValue()
          });
      });
  }

  //----------------------------------------------------------------------------
  // Render item
  //----------------------------------------------------------------------------
  renderItem = ({today, ...metrics}, formattedDate, key) => (
    <View>
      {
        today
          ? <Text>{JSON.stringify(today)}</Text>
          : <Text>{JSON.stringify(metrics)}</Text>
      }
    </View>
  );

  //----------------------------------------------------------------------------
  // Render empty date
  //----------------------------------------------------------------------------
  renderEmptyDate(formattedDate) {
    return (
      <View>
        <Text>No Data for this day</Text>
      </View>
    );
  }

  //----------------------------------------------------------------------------
  // Render
  //----------------------------------------------------------------------------
  render() {
    return (
      <UdaciFitnessCalendar
        items={this.props.entries}
        renderItem={this.renderItem}
        renderEmptyDate={this.renderEmptyDate}
      />
    );
  }
}

//------------------------------------------------------------------------------
// Connect redux
//------------------------------------------------------------------------------
function mapStateToProps(entries) {
  return {
    entries
  };
}

function mapDispatchToProps(dispatch) {
  return {
    receiveEntries: (entries) => dispatch(receiveEntries(entries)),
    addEntry: (entry) => dispatch(addEntry(entry))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(History);
