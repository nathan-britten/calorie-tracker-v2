import { GET_FOODS, ADD_FOOD_TO_DB, UPDATE_FOOD_ITEM } from '../actions/types';
import _ from 'lodash';

const INITIAL_STATE = {}

const food =  (state = INITIAL_STATE, action) => {
  switch(action.type) {
    case GET_FOODS:
      return {...state, ...action.payload }
    case ADD_FOOD_TO_DB:
      console.log(action.payload)
      return {...state, [action.payload.id] : action.payload }
    // case DELETE_MEAL: 
    //   return _.omit(state, action.payload.mealid)
    // case RESET_MEALS: 
    //   return INITIAL_STATE
    case UPDATE_FOOD_ITEM:
      return {...state, [action.payload.id] : action.payload }
    default: 
      return state;
  }
}

export default food;