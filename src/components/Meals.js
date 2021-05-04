import React, { useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { getTodaysMeals, deleteMeal, addFoodItemToDB, addFoodToMeal, deleteFoodItemFromDB } from '../actions';

import Button from './helpercomponents/Button';
import MealNameInput from '../components/meals/MealNameInput';
import FoodItem from '../components/meals/FoodItem';

const Meals = (props) => {

  useEffect(() => {
    const userid = props.userid;
    const date = props.date;
    props.getTodaysMeals(userid, "22/02/21")
  }, [props.userid, props.date])


  const mealCard = useRef();

  const removeMeal = (mealid, index, meal) => {
    props.deleteMeal(mealid, index, meal).then((foodid) => {
        console.log(foodid)
        foodid.forEach((element) => {
          props.deleteFoodItemFromDB(element)
        })
    })
  }
  const editMeal = (mealid) => {

  }

  const renderFoodItems = (meal) => {

    if(!meal) {
      return;
    }
    if(!meal.foodid || meal.foodid.length === 0) {
      addFoodItem(meal.id)
    }
    return meal.foodid.map(food => {
      return <FoodItem foodid={food} key={meal.id+food} mealid={meal.id}/>
   }) 

  }

  const addFoodItem = (mealid) => {
    props.addFoodItemToDB(mealid, props.userid).then((foodid) => {
      props.addFoodToMeal(mealid, foodid)
    })
  }

  const renderMeals = () => {

    if(!props.meals) {
      return;
    }
   return Object.values(props.meals).map((meal, index) => {
      return (
          <div className="card my-2 p-4 position-relative fade show" style={{minWidth: "100%", minHeight: "200px"}} key={meal.id}>
            <Button 
              color="danger" 
              onClick={() => removeMeal(meal.id, index, meal)} 
              text="Remove Meal" 
              styling={{"position":"absolute", "top":"0","right":"0"}}
            />
            <div className="card-title">{"Meal " + (index+1)}</div>
            <MealNameInput mealname={"Meal " + (index+1)} key={meal.id} id={meal.id} title={meal.title} />
            <div className="food-items d-flex flex-column">
              {renderFoodItems(meal)}
            </div>
            <Button 
              color="success" 
              onClick={() => addFoodItem(meal.id, index)} 
              text="Add Food Item" 
              styling={{"position":"absolute", "bottom":"0","right":"0"}}
            />
          </div>
      )
    })
  }

  return (
    <div className="meals col-6" style={{"minHeight": "200px"}}>
      <div className="row justify-content-between">
        {renderMeals()}
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    userid: state.auth.userId,
    meals: state.meals,
    date: state.time.humanreadable
  }
}
export default connect(mapStateToProps, { getTodaysMeals, deleteMeal, addFoodItemToDB, addFoodToMeal, deleteFoodItemFromDB })(Meals);