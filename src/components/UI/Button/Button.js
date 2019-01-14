import React from 'react';
import classes from './Button.css';

export default props => (
  <button
    className={[classes.Button, classes[props.btnType]].join(' ')}
    onClick={props.clicked}
    disabled={props.disabled}
  >
    {props.children}
  </button>
);
