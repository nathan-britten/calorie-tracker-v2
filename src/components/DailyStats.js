import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

const DailyStats = (props) => {

  const [totalCalories, setTotalCalories] = useState('');
  const [totalFat, setTotalFat] = useState('');
  const [totalProtein, setTotalProtein] = useState('');
  const [totalCarbs, setTotalCarbs] = useState('');

  useEffect(() => {
    getTotals()
  }, [props.meals])
  
  const getTotals = () => {
    let fat = 0;
    let protein = 0;
    let carbs = 0;
    let calories = 0;
    if(!props.meals) return;
    props.meals.forEach((meal, index) => {
      meal.foodid.forEach((food, index) => {
        if(props.food[food].calories) {
          calories += props.food[food].calories
        }
        if(props.food[food].carbs) {
          carbs += props.food[food].carbs
        }
        if(props.food[food].fat) {
          fat += props.food[food].fat
        }
        if(props.food[food].protein) {
          protein += props.food[food].protein
        }
      })
    })
    setTotalFat(fat.toFixed(1))
    setTotalProtein(protein.toFixed(1))
    setTotalCarbs(carbs.toFixed(1))
    setTotalCalories(calories.toFixed(1))

  }


  
  return (
    <React.Fragment>
      <div className="col-12 col-md-3">
        <p>Calories</p> 
        {totalCalories}
      </div>
      <div className="col-12 col-md-9">
        <div className="d-flex justify-content-around">
          <div className="d-flex flex-column">
            <p>Protein</p>
            {totalProtein}
          </div>
          <div className="d-flex flex-column">
            <p>Carbs</p>
            {totalCarbs}
          </div>
          <div className="d-flex flex-column">
            <p>Fat</p>
            {totalFat}
          </div>
        </div> 
      </div>
    </React.Fragment>

  )
}

const mapStateToProps = state => {
  return {
    meals: Object.values(state.meals),
    food: state.food
  }

}

export default connect(mapStateToProps)(DailyStats);