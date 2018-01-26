import React from 'react';
import classes from './Backdrop.css';

export default props =>
  // eslint-disable-next-line
  (props.show ? <div className={classes.Backdrop} onClick={props.clicked} /> : null);
