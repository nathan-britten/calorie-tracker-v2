import { FETCH_EDAMAM_RESULTS } from '../actions/types';
import _ from 'lodash';

const INITIAL_STATE = {}

const edamamresults =  (state = INITIAL_STATE, action) => {
  switch(action.type) {
    case FETCH_EDAMAM_RESULTS:
      return {...state, ...action.payload }
    default: 
      return state;
  }
}

export default edamamresults;