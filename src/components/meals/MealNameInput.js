import React, { useState, useEffect } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { updateMealTitle } from '../../actions';


const MealNameInput = (props) => {

  const [inputValue, setInputValue ] = useState('');
  const [debouncedInputValue, setDebouncedInputValue] = useState(inputValue);

  useEffect(() => {
    console.log(props.title)
    if(props.title) {
      setInputValue(props.title)
    }
  }, [props.title])

  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedInputValue(inputValue)
    }, 3000);

    return () => {
      clearTimeout(timerId);
    } 
  }, [inputValue])


  useEffect(() => {
    if(debouncedInputValue && debouncedInputValue === inputValue) {
      props.updateMealTitle(props.id, debouncedInputValue)
    }
  }, [debouncedInputValue])

  const handleOnChange = (value) => {
    setInputValue(value)
  }

  return(
    <input type="text" placeholder={props.mealname} onChange={e => handleOnChange(e.target.value)} value={inputValue}/>
  )
}

export default connect(null, { updateMealTitle })(MealNameInput);