
import { AsyncStorage } from 'react-native';
import { CALENDAR_STORAGE_KEY, formatCalendarResults } from './_calendar';

//------------------------------------------------------------------------------
// Fetch calendar results
//------------------------------------------------------------------------------
export function fetchCalendarResults() {
  return AsyncStorage.getItem(CALENDAR_STORAGE_KEY)
    .then(formatCalendarResults);
}

//------------------------------------------------------------------------------
// Submit entry
//------------------------------------------------------------------------------
export function submitEntry({ entry, key }) {
  return AsyncStorage.mergeItem(
    CALENDAR_STORAGE_KEY,
    JSON.stringify({[key]: entry}));
}

//------------------------------------------------------------------------------
// Remove entry
//------------------------------------------------------------------------------
export function removeEntry(key) {
  return AsyncStorage.getItem(CALENDAR_STORAGE_KEY)
    .then((results) => {
      const data = JSON.parse(results);
      delete data[key];
      AsyncStorage.setItem(
        CALENDAR_STORAGE_KEY,
        JSON.stringify(data));
    });
}
