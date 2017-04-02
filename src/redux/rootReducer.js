import { reducer as form } from 'redux-form';
import { combineReducers } from 'redux';
import client from '../apollo/';

export default combineReducers({
  form,
  apollo: client.reducer(),
});