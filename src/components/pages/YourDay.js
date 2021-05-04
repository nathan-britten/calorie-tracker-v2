import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { addMeal, getFoods } from '../../actions';

import Meals from '../Meals';
import Button from '../helpercomponents/Button';
import DailyStats from '../DailyStats';
const YourDay = (props) => {

  useEffect(() => {
    props.getFoods(props.userid);
  }, [props.userid, props.food])

  const renderNewMeal = () => {
    props.addMeal(props.userid, "22/02/21")
  }


  return (
    <div className="container mt-3">
      <div className="statscontainer row justify-content-center border border-primary">
        <DailyStats />
      </div>
      <div className="mealscontainer row justify-content-center position-relative">
        <Meals />
        <Button color="success" text="Add Meal" onClick={renderNewMeal} styling={{"position": "absolute", "right" : "0", "bottom" : "0"}} />
      </div>
    </div>
  )
}

const mapStateToProps = (state, ownProps) => {
  return {
    userid: state.auth.userId,
    foods: state.food
  }
}

export default connect(mapStateToProps, { addMeal, getFoods })(YourDay);