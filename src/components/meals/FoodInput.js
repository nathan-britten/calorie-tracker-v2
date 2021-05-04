import React, { useState, useEffect, useRef } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { updateFoodItem, addFoodItemToDB, addFoodToMeal, fetchResults } from '../../actions';


const MealNameInput = (props) => {

  const [inputValue, setInputValue ] = useState('');
  const [debouncedInputValue, setDebouncedInputValue] = useState(inputValue);
  const [results, setResults] = useState([]);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [userHasTyped, setUserHasTyped] = useState(false);
  const prevDebouncedInputValue = usePrevious(debouncedInputValue)
  const prevInputValue = usePrevious(inputValue);

  const firstUpdate = useRef(true);
  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedInputValue(inputValue)
    }, 500);

    return () => {
      clearTimeout(timerId);
    }
  }, [inputValue])

  useEffect(() => {
    if(props.food[props.id].name === undefined) {
      setInputValue('')
    } else {
      setInputValue(props.food[props.id].name)
    }
  }, [props.id])

  function usePrevious(value) {
    const ref = useRef();
    useEffect(() => {
      ref.current = value;
    });
    return ref.current;
  }

  useEffect(() => {

    if(results.length == 0) {
      setShowSearchResults(false)
    }

  },[results])

  useEffect(() => {

   console.log(showSearchResults)

  },[showSearchResults])

  useEffect(() => {

    if(debouncedInputValue && debouncedInputValue === inputValue) {

      if(userHasTyped) {
        console.log('i ran')
          props.fetchResults(debouncedInputValue).then((data) => {
            setResults(data)
          })
        }             
    }
  }, [debouncedInputValue])
  
  const handleOnChange = (value) => {
    setInputValue(value)
  }

  const handleFoodItemClick = ({food}) => {

    let obj = {
      name: food.label,
      calories: food.nutrients.ENERC_KCAL,
      carbs: food.nutrients.CHOCDF,
      protein: food.nutrients.PROCNT,
      fat: food.nutrients.FAT,
      fibre: food.nutrients.FIBTG
    }
    props.updateFoodItem(props.id, obj, props.userid)
    setInputValue(food.label)
    setShowSearchResults(false);
    
    setResults([])
  }

  const handleKeyDown = () => {
    console.log('hello')
    setShowSearchResults(true);
    setUserHasTyped(true)
  }

  const renderResults = (results = []) => {
    return results.map(({food}, index) => {
      return (
        <div className="results-item my-1 border border-secondary rounded p-3" key={food.foodId+food.label} onClick={() => handleFoodItemClick({food})}>
          <div className="info-container">
            <p className="label text-center h6">{food.label}</p>
            <div className="firstrow d-flex justify-content-between">
              <p className="cals">{ food.nutrients.ENERC_KCAL ? "Cals" + food.nutrients.ENERC_KCAL.toFixed(0) : ''}</p>
              <p className="carbs">{food.nutrients.CHOCDF ? "Carbs" + food.nutrients.CHOCDF.toFixed(1) : '' }</p>
              <p className="protein">{food.nutrients.PROCNT ? "Protein" + food.nutrients.PROCNT.toFixed(1) : ''  }</p>
            </div>
            <div className="secondrow d-flex justify-content-around">
              <p className="fat m-0">{ food.nutrients.FAT ? "Fat" + food.nutrients.FAT.toFixed(1) : ''}</p>
              <p className="fibre m-0">{ food.nutrients.FIBTG ? "Fibre" + food.nutrients.FIBTG.toFixed(1) : ''}</p>
            </div>
          </div>
        </div>
      )
    })
  }

  return(
    <div className="position-relative">
      <input type="text" onChange={e => handleOnChange(e.target.value)}  value={inputValue} onKeyDown={() => handleKeyDown()} placeholder={"Enter a food to search our database"}/>
      <div className={!showSearchResults || results.length === 0 ? 'results d-none' : 'results d-block p-3 position-absolute w-100'}>
        {renderResults(results)}
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {

  return {
    food: state.food,
    userid: state.auth.userId,
    results: state.results
  }
  
}

export default connect(mapStateToProps, { updateFoodItem, addFoodItemToDB, addFoodToMeal, fetchResults })(MealNameInput);