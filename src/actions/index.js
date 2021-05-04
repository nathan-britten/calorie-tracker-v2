import history from '../history';
import meals from '../apis/meals';
import edamam from '../apis/edamamapi';

import { ADD_MEAL, GET_MEALS, RESET_MEALS, SIGN_IN, SIGN_OUT, GET_HUMAN_READABLE, DELETE_MEAL, UPDATE_MEAL_TITLE, GET_FOODS, UPDATE_FOOD_ITEM, ADD_FOOD_TO_DB, ADD_FOOD_TO_MEAL, DELETE_FOOD_FROM_DB, DELETE_FOOD_FROM_MEAL, FETCH_EDAMAM_RESULTS } from './types';


///////////////////////////////// AUTH //////////////////////////////////

export const signIn = (userId) => {
  return {
    type:  SIGN_IN,
    payload: userId
  }
}

export const signOut = () => {
  return {
    type: SIGN_OUT
  }
}

///////////////////////////////// MEALS //////////////////////////////////


export const addMeal = (userid, date) => async (dispatch) => {
  const response = await meals.post('/meals', {userid, date, foodid: []});
  dispatch({
    type: ADD_MEAL,
    payload: response.data
  })
}

export const deleteMeal = (mealid, index, meal) => async dispatch => {

  await meals.delete(`/meals/${mealid}`);



  dispatch({
    type: DELETE_MEAL,
    payload: {
      mealid,
      index
    }
  })

  return meal.foodid;
}

export const getTodaysMeals = (userid, date) => async (dispatch) => {
  console.log(userid, date)
  let data;
  if(userid) {
    const response = await meals.get(`/meals?userid=${userid}`);
    let result = []
    data = response.data.filter((el) => {
      return el.date === date;
    })
    for(let item of data) {
      result[item.id] = item
    }

    dispatch({
      type: GET_MEALS,
      payload: result
    })
  } else {
    console.log('me')
    data = []

    dispatch({
      type: RESET_MEALS,
      payload: data
    })
  }
}

export const updateMealTitle = (mealid, title) => async dispatch => {
  const response = await meals.patch(`/meals/${mealid}`, {'title': title});
  dispatch({
    type: UPDATE_MEAL_TITLE,
    payload: response.data
  })
}

export const addFoodToMeal = (mealid, foodid) => async dispatch => {
  if(!mealid) {
    return;
  }

  const response = await meals.get(`/meals/${mealid}`);

  let currentFoodItems = response.data.foodid;
  currentFoodItems.push(foodid)

  const response_two = await meals.patch(`/meals/${mealid}`, {"foodid" : currentFoodItems});

  dispatch({
    type: ADD_FOOD_TO_MEAL,
    payload: response_two.data
  })


}
///////////////////////////////// FOOD //////////////////////////////////

export const getFoods = (userid) => async dispatch => {

  const response = await meals.get(`/food`)
  let result = []
  let data = response.data.filter((el) => {
    return el.userid === userid
  } )

  for(let item of data) {
    result[item.id] = item
  }

  dispatch({
    type: GET_FOODS,
    payload: result
  })
}

export const updateFoodItem = (foodid, foodinformation, userid) => async dispatch => {
  

  const response = await meals.patch(`/food/${foodid}`, foodinformation);

  dispatch({
    type: UPDATE_FOOD_ITEM,
    payload: response.data
  })
}

export const addFoodItemToDB = (mealid, userid, name) => async (dispatch) => {
  //add food to DB
  const response = await meals.post('/food', {userid, "title" : name});
  dispatch({
    type: ADD_FOOD_TO_DB,
    payload: response.data
  })

  //add food to meal 

  return response.data.id;
}

export const deleteFoodItemFromDB = (foodid) => async (dispatch) => {
  const response = await meals.delete(`/food/${foodid}`);
  console.log('doingit')
  dispatch({
    type: DELETE_FOOD_FROM_DB,
    payload: response.data
  })

}

export const deleteFoodItemFromMeal = (mealid, foodid, userid) => async (dispatch) => {
  const response = await meals.get(`/meals/${mealid}`);

  let newFoodIdArray = [];
  console.log(response.data.foodid)
  response.data.foodid.forEach((el, index) => {
    if(el !== foodid) {
      newFoodIdArray.push(el)
    }
  }) 

  const response_two = await meals.patch(`/meals/${mealid}`, {"foodid" : newFoodIdArray })
  dispatch({
    type: DELETE_FOOD_FROM_MEAL,
    payload: {
      "mealid":mealid,
      "foodid": foodid
    }
  })
}

///////////////////////////////// EDAMAN API //////////////////////////////////




export const fetchResults = (searchterm) => async (dispatch) => {
  const appID = "e495ad1a";
  const appKey = "413befb8ccf97e6260e4e0c770c8075d";

  if(searchterm.length < 2) {
    return;
  }
 
  const response = await edamam.get(`parser?ingr=${searchterm}&app_id=${appID}&app_key=${appKey}`,   {
    headers: {
      'Access-Control-Allow-Origin' : "*"
    }
  })
  // dispatch({
  //   type: FETCH_EDAMAM_RESULTS,
  //   payload: response.data.hints
  // })

  return response.data.hints;
}


///////////////////////////////// MISC //////////////////////////////////

export const getHumandReadableTime = () => {
  return {
    type: GET_HUMAN_READABLE
  }
}
 