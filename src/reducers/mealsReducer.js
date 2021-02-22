import { SIGN_IN, SIGN_OUT } from '../actions/types';

const INITIAL_STATE = {
  meals: {
    '1' : 'Meal One',
    '2' : 'Meal Two',
    '3' : 'Meal Three'
  }
}

const meals =  (state = INITIAL_STATE, action) => {

  switch(action.type) {
    default:
      return state;
  }
}

export default meals;