import { ADD_MEAL, GET_MEALS, DELETE_MEAL, RESET_MEALS, UPDATE_MEAL_TITLE, ADD_FOOD_TO_MEAL, DELETE_FOOD_FROM_MEAL } from '../actions/types';
import _ from 'lodash';

const INITIAL_STATE = {}

const meals =  (state = INITIAL_STATE, action) => {
  switch(action.type) {
    case GET_MEALS:
      return {...state, ...action.payload }
    case ADD_MEAL:
      return {...state, [action.payload.id] : action.payload }
    case DELETE_MEAL: 
      return _.omit(state, action.payload.mealid)
    case RESET_MEALS: 
      return INITIAL_STATE
    case UPDATE_MEAL_TITLE: 
      return {
        ...state,
        [action.payload.id] : {
          ...state[action.payload.id],  
          title : action.payload.title
        }
      }
    case ADD_FOOD_TO_MEAL:
      return {
        ...state,
        [action.payload.id] : {
          ...state[action.payload.id],
          foodid : action.payload.foodid 
        }
      };
    case DELETE_FOOD_FROM_MEAL:
      console.log(action.payload)
      console.log(state[action.payload.mealid].foodid)
      return {
        ...state,
        [action.payload.mealid] : {
          ...state[action.payload.mealid],
          foodid: [...state[action.payload.mealid].foodid].filter((x, index) => x !== action.payload.foodid)
        }
      }
    default: 
      return state;
  }
}

export default meals;