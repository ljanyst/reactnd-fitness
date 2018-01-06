
import React, { Component } from 'react';
import {
  View, Text, StyleSheet, Platform, TouchableOpacity
} from 'react-native';
import { connect } from 'react-redux';
import UdaciFitnessCalendar from 'udacifitness-calendar';
import { AppLoading } from 'expo';

import { receiveEntries, addEntry } from '../actions';
import { timeToString, getDailyReminderValue } from '../utils/helpers';
import { fetchCalendarResults } from '../utils/api';
import { white } from '../utils/colors';

import DateHeader from './DateHeader';
import MetricCard from './MetricCard';

//------------------------------------------------------------------------------
// Styles
//------------------------------------------------------------------------------
const styles = StyleSheet.create({
  //----------------------------------------------------------------------------
  // Item
  //----------------------------------------------------------------------------
  item: {
    backgroundColor: white,
    borderRadius: Platform.OS === 'ios' ? 16 : 2,
    padding: 20,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 17,
    justifyContent: 'center',
    shadowRadius: 3,
    shadowOpacity: 0.8,
    shadowColor: 'rgba(0,0,0,0.24)',
    shadowOffset: {
      width: 0,
      height: 3
    }
  },

  //----------------------------------------------------------------------------
  // No data text
  //----------------------------------------------------------------------------
  noDataText: {
    fontSize: 20,
    paddingTop: 20,
    paddingBottom: 20
  }
});

//------------------------------------------------------------------------------
// History
//------------------------------------------------------------------------------
class History extends Component {
  //----------------------------------------------------------------------------
  // The state
  //----------------------------------------------------------------------------
  state = {
    ready: false
  };

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
      })
      .then(() => this.setState({ready: true}));
  }

  //----------------------------------------------------------------------------
  // Render item
  //----------------------------------------------------------------------------
  renderItem = ({today, ...metrics}, formattedDate, key) => (
    <View style={styles.item}>
      {
        today
        ? <View>
            <DateHeader date={formattedDate}/>
            <Text style={styles.noDataText}>
              {today}
            </Text>
          </View>
        : <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate('EntryDetail',
                                             {entryId: key});
            }}
          >
          <MetricCard metrics={metrics} date={formattedDate} />
          </TouchableOpacity>
      }
    </View>
  );

  //----------------------------------------------------------------------------
  // Render empty date
  //----------------------------------------------------------------------------
  renderEmptyDate(formattedDate) {
    return (
      <View style={styles.item}>
        <DateHeader date={formattedDate}/>
        <Text style={styles.noDataText}>
          You didn't log any data on this day.
        </Text>
      </View>
    );
  }

  //----------------------------------------------------------------------------
  // Render
  //----------------------------------------------------------------------------
  render() {
    if(this.state.ready === false)
      return <AppLoading />;

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
