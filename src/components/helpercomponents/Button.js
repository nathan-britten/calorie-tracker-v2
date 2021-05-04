import React from 'react';

const Button = (props) => {
  return (
    <div className={`btn btn-${props.color}`} onClick={props.onClick} style={props.styling}>
      {props.text}
    </div>
  )
}

export default Button;