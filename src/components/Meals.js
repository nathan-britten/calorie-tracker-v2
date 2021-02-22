import React from 'react';
import { connect } from 'react-redux';


const Meals = () => {

  let meals = [{'id': '1', 'title': 'meal 1'},{'id': '2', 'title': 'meal 2'},{'id': '3', 'title': 'meal 3'}]

  const renderMeals = () => {
    return meals.map(el => {
      console.log(el)
    })
  }

  return (
    <div className="meals">
      {renderMeals()}
    </div>
  )
}

const mapStateToProps = (state) => {
  console.log(state)
  return {
    meals: ['meal 1','meal 2','meal 3']
  }
}
export default connect(mapStateToProps)(Meals);