import React, { useEffect } from 'react';
import {connect} from 'react-redux'

import { deleteFoodItemFromMeal, deleteFoodItemFromDB } from '../../actions';

import FoodInput from './FoodInput';
import Button from '../helpercomponents/Button';

const FoodItem = (props) => {


  const renderItems = (foodid) => {
    if(foodid) {
      return <FoodInput id={foodid} mealid={props.mealid}/>
    } else {
      return <FoodInput mealid={props.mealid}/>
    }
  }

  const deleteFoodItem = (mealid, foodid) => {
    props.deleteFoodItemFromMeal(mealid, foodid).then(() => props.deleteFoodItemFromDB(foodid))
  }
  return (
    
    <div className="food-item py-1 d-flex">
      {renderItems(props.foodid)}
      {"FOOD" + props.foodid}
      <Button color="danger" text="Delete Food" onClick={() => deleteFoodItem(props.mealid, props.foodid)} />
    </div>
  )
}

export default connect(null, { deleteFoodItemFromMeal, deleteFoodItemFromDB })(FoodItem);