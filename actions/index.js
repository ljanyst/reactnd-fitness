
export const RECEIVE_ENTRIES = 'RECEIVE_ENTRIES';
export const ADD_ENTRY = 'ADD_ENTRY';

//------------------------------------------------------------------------------
// Receive entries
//------------------------------------------------------------------------------
export function receiveEntries(entries) {
  return {
    type: RECEIVE_ENTRIES,
    entries
  };
}

//------------------------------------------------------------------------------
// Add entry
//------------------------------------------------------------------------------
export function addEntry(entry) {
  return {
    type: ADD_ENTRY,
    entry
  };
}
