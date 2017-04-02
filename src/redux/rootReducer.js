import { reducer as form } from 'redux-form';
import { combineReducers } from 'redux';
import client from '../apollo/';
import { reducer as auth } from './modules/auth';

export default combineReducers({
  form,
  apollo: client.reducer(),
  auth,
});