import { GET_HUMAN_READABLE } from '../actions/types';

const now = () => {
  let time = Math.round((new Date()).getTime() / 1000);
  return time;
}

const unixTimeConverter = (time) => {
  const milliseconds = time * 1000 // 1575909015000

  const dateObject = new Date(milliseconds)
  var options = {
    day: "2-digit",
    month: "2-digit",
    year: "2-digit"
  };

  const humanDateFormat = dateObject.toLocaleString('en-GB', options) //2019-12-9 10:30:15
  return humanDateFormat;
}

//22-02 - 1614027410
const INITIAL_STATE = {
  unixtime: now(),
  humanreadable: unixTimeConverter(now())
}

const date =  (state = INITIAL_STATE, action) => {

  switch(action.type) {
    case GET_HUMAN_READABLE: 
      return state.humanreadable
    default:
      return state;
  }
}

export default date;