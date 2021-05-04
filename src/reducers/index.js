import { combineReducers } from 'redux';
import authReducer from './authReducer';
import mealsReducer from './mealsReducer';
import dateReducer from './dateReducer';
import foodReducer from './foodReducer';
import edamamReducer from './edamamReducer';

export default combineReducers({
  auth: authReducer,
  meals: mealsReducer,
  time: dateReducer,
  food: foodReducer,
  results: edamamReducer
})